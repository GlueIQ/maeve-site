/* ═══════════════════════════════════════════════════
   MAEVE FEEDBACK WIDGET — Standalone Embed Script
   For use on the static site and Vite portal
   ═══════════════════════════════════════════════════
   
   Usage: Add this before </body>:
   <script src="https://your-domain/feedback-widget.js" 
     data-supabase-url="…" 
     data-supabase-key="…"
     data-user-id="…"
     data-user-name="…"
     data-user-email="…"
   ></script>
   
   Or initialize manually:
   window.MaeveFeedback.init({ userId, userName, userEmail, supabaseUrl, supabaseKey });
*/

(function() {
  'use strict';

  const SUPABASE_URL = 'https://wvkxqjlvgtwdsetsggdp.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2a3hxamx2Z3R3ZHNldHNnZ2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5MjYzODIsImV4cCI6MjA5MDUwMjM4Mn0.9uJPgkA8bUFuosC1jzgF_RIxSR8_jZIYw9vF17fwGXU';
  const STORAGE_TOGGLE_KEY = 'maeve-feedback-toggle';
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const MAX_ATTACHMENTS = 3;
  const DESC_MIN_LENGTH = 20;

  // ── Supabase REST helpers ──
  function supabaseFetch(table, options = {}) {
    const { method = 'GET', body, params = '', headers: extraHeaders = {} } = options;
    const url = `${SUPABASE_URL}/rest/v1/${table}${params}`;
    const headers = {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: method === 'POST' ? 'return=representation' : '',
      ...extraHeaders,
    };
    return fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    }).then(r => r.json());
  }

  async function checkAccess(userId) {
    const data = await supabaseFetch('feedback_users', {
      params: `?user_id=eq.${encodeURIComponent(userId)}&enabled=eq.true&select=enabled&limit=1`,
    });
    return Array.isArray(data) && data.length > 0;
  }

  async function createTicket(payload) {
    const data = await supabaseFetch('feedback_tickets', {
      method: 'POST',
      body: payload,
    });
    return Array.isArray(data) ? data[0] : data;
  }

  async function uploadToStorage(ticketId, file) {
    const fileName = `${ticketId}/${Date.now()}-${file.name}`;
    const uploadUrl = `${SUPABASE_URL}/storage/v1/object/feedback-attachments/${fileName}`;
    
    await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': file.type,
      },
      body: file,
    });

    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/feedback-attachments/${fileName}`;
    
    await supabaseFetch('feedback_attachments', {
      method: 'POST',
      body: {
        ticket_id: ticketId,
        file_url: publicUrl,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        is_annotated: false,
      },
    });
  }

  async function logActivity(ticketId, userId, userName) {
    await supabaseFetch('feedback_activity_log', {
      method: 'POST',
      body: {
        ticket_id: ticketId,
        actor_id: userId,
        actor_name: userName,
        action: 'created',
        new_value: 'inbox',
      },
    });
  }

  // ── Widget UI ──
  function injectStyles() {
    if (document.getElementById('maeve-feedback-styles')) return;
    const style = document.createElement('style');
    style.id = 'maeve-feedback-styles';
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Noto+Serif+Display:wght@400;500&display=swap');
      
      .mfb-widget * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }
      
      .mfb-toggle {
        position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
        z-index: 99998; display: flex; align-items: center; gap: 8px;
        padding: 8px 16px; border-radius: 999px; font-size: 12px; font-weight: 500;
        cursor: pointer; border: 1px solid #efeeeb; background: #fdfbf7; color: #486554;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: all 0.3s;
      }
      .mfb-toggle.active { background: #486554; color: #fff; border-color: #486554; }
      .mfb-toggle-dot {
        width: 8px; height: 8px; border-radius: 50%; background: rgba(72,101,84,0.3);
      }
      .mfb-toggle.active .mfb-toggle-dot { background: #86efac; animation: mfb-pulse 2s infinite; }
      
      .mfb-fab {
        position: fixed; bottom: 80px; right: 24px; z-index: 99998;
        width: 56px; height: 56px; border-radius: 50%; background: #486554;
        color: #fff; border: none; cursor: pointer; display: flex;
        align-items: center; justify-content: center;
        box-shadow: 0 8px 24px rgba(72,101,84,0.3);
        transition: all 0.2s; animation: mfb-fadeIn 0.3s ease;
      }
      .mfb-fab:hover { background: #3a5243; transform: scale(1.05); }
      
      .mfb-backdrop {
        position: fixed; inset: 0; background: rgba(0,0,0,0.3);
        z-index: 99999; animation: mfb-fadeIn 0.2s ease;
      }
      
      .mfb-modal {
        position: fixed; bottom: 96px; right: 24px; z-index: 100000;
        width: 400px; max-height: calc(100vh - 140px); background: #fff;
        border-radius: 16px; box-shadow: 0 24px 48px rgba(0,0,0,0.15);
        border: 1px solid #efeeeb; overflow: hidden;
        animation: mfb-slideUp 0.3s ease;
      }
      
      .mfb-header {
        padding: 16px 20px; border-bottom: 1px solid #efeeeb; background: #fdfbf7;
        display: flex; justify-content: space-between; align-items: center;
      }
      .mfb-header h3 { font-family: 'Noto Serif Display', serif; font-size: 18px; color: #001a0e; margin: 0; }
      .mfb-header p { font-size: 11px; color: rgba(26,28,26,0.5); margin: 4px 0 0; }
      .mfb-close {
        background: none; border: none; padding: 6px; cursor: pointer;
        color: rgba(26,28,26,0.5); border-radius: 8px; transition: background 0.2s;
      }
      .mfb-close:hover { background: #efeeeb; }
      
      .mfb-body { padding: 20px; overflow-y: auto; max-height: calc(100vh - 260px); }
      
      .mfb-type-row { display: flex; gap: 8px; margin-bottom: 16px; }
      .mfb-type-btn {
        flex: 1; padding: 12px; border-radius: 10px; border: 1px solid #efeeeb;
        background: white; cursor: pointer; text-align: left; transition: all 0.2s;
      }
      .mfb-type-btn.active { border-color: #486554; background: rgba(72,101,84,0.04); }
      .mfb-type-btn-label { font-size: 14px; font-weight: 500; color: #001a0e; }
      .mfb-type-btn-desc { font-size: 11px; color: rgba(26,28,26,0.5); margin-top: 2px; }
      
      .mfb-label {
        font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;
        color: rgba(26,28,26,0.5); margin-bottom: 4px; display: block;
      }
      .mfb-input, .mfb-textarea {
        width: 100%; padding: 8px 12px; font-size: 14px; background: #fdfbf7;
        border: 1px solid #efeeeb; border-radius: 8px; color: #001a0e; outline: none;
        transition: border-color 0.2s;
      }
      .mfb-input:focus, .mfb-textarea:focus { border-color: #486554; }
      .mfb-textarea { resize: none; min-height: 96px; }
      .mfb-input::placeholder, .mfb-textarea::placeholder { color: rgba(26,28,26,0.3); }
      
      .mfb-priority-row { display: flex; gap: 8px; margin-bottom: 16px; }
      .mfb-priority-btn {
        flex: 1; padding: 6px; font-size: 11px; font-weight: 500; text-transform: capitalize;
        border: 1px solid #efeeeb; border-radius: 6px; background: white;
        cursor: pointer; text-align: center; transition: all 0.2s; color: rgba(26,28,26,0.5);
      }
      .mfb-priority-btn.active { border-color: #486554; background: rgba(72,101,84,0.04); color: #001a0e; }
      
      .mfb-actions-row { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
      .mfb-action-btn {
        display: flex; align-items: center; gap: 6px; padding: 8px 12px; font-size: 12px;
        font-weight: 500; color: #486554; background: rgba(72,101,84,0.04);
        border: 1px solid rgba(72,101,84,0.2); border-radius: 8px; cursor: pointer;
        transition: background 0.2s;
      }
      .mfb-action-btn:hover { background: rgba(72,101,84,0.08); }
      .mfb-attached { font-size: 11px; color: #059669; }
      
      .mfb-context {
        background: #fdfbf7; border-radius: 8px; padding: 12px; font-size: 11px;
        color: rgba(26,28,26,0.4); margin-bottom: 16px; line-height: 1.5;
      }
      .mfb-context-title { font-weight: 500; color: rgba(26,28,26,0.5); margin-bottom: 4px; }
      
      .mfb-error {
        padding: 12px; background: rgba(225,29,72,0.05); border: 1px solid rgba(225,29,72,0.2);
        border-radius: 8px; font-size: 12px; color: #E11D48; margin-bottom: 16px;
      }
      
      .mfb-submit {
        width: 100%; padding: 10px; font-size: 14px; font-weight: 500;
        background: #486554; color: #fff; border: none; border-radius: 10px;
        cursor: pointer; transition: background 0.2s; display: flex;
        align-items: center; justify-content: center; gap: 8px;
      }
      .mfb-submit:hover { background: #3a5243; }
      .mfb-submit:disabled { opacity: 0.5; cursor: not-allowed; }
      
      .mfb-success {
        text-align: center; padding: 32px 0;
      }
      .mfb-success-icon { font-size: 48px; margin-bottom: 16px; }
      .mfb-success h4 { font-family: 'Noto Serif Display', serif; font-size: 20px; color: #001a0e; margin: 0 0 8px; }
      .mfb-success p { font-size: 14px; color: rgba(26,28,26,0.6); margin: 0; }
      
      .mfb-spinner {
        width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3);
        border-top-color: #fff; border-radius: 50%; animation: mfb-spin 0.6s linear infinite;
      }
      
      .mfb-file-chips { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px; }
      .mfb-file-chip {
        display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px;
        font-size: 11px; background: #fdfbf7; border: 1px solid #efeeeb;
        border-radius: 999px; color: rgba(26,28,26,0.6);
      }
      .mfb-file-remove { color: #E11D48; cursor: pointer; background: none; border: none; font-size: 12px; }
      
      .mfb-field { margin-bottom: 16px; }
      .mfb-char-count { font-size: 10px; color: rgba(26,28,26,0.3); text-align: right; margin-top: 4px; }
      
      @keyframes mfb-fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes mfb-slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes mfb-spin { to { transform: rotate(360deg); } }
      @keyframes mfb-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    `;
    document.head.appendChild(style);
  }

  function createWidget(config) {
    const { userId, userName, userEmail } = config;
    let active = localStorage.getItem(STORAGE_TOGGLE_KEY) === 'true';
    let modalOpen = false;
    let formState = 'idle'; // idle | form | submitting | success
    let type = 'feedback';
    let priority = 'medium';
    let title = '';
    let description = '';
    let files = [];
    let error = '';

    const root = document.createElement('div');
    root.id = 'maeve-feedback-widget';
    root.className = 'mfb-widget';
    document.body.appendChild(root);

    function render() {
      root.innerHTML = '';

      // Toggle pill
      const toggle = document.createElement('button');
      toggle.className = `mfb-toggle ${active ? 'active' : ''}`;
      toggle.innerHTML = `<span class="mfb-toggle-dot"></span> ${active ? 'Feedback Mode On' : 'Enable Feedback'}`;
      toggle.onclick = () => {
        active = !active;
        localStorage.setItem(STORAGE_TOGGLE_KEY, String(active));
        if (!active) { modalOpen = false; resetForm(); }
        render();
      };
      root.appendChild(toggle);

      // FAB
      if (active && !modalOpen) {
        const fab = document.createElement('button');
        fab.className = 'mfb-fab';
        fab.innerHTML = '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/></svg>';
        fab.onclick = () => { modalOpen = true; formState = 'form'; render(); };
        root.appendChild(fab);
      }

      // Modal
      if (modalOpen) {
        const backdrop = document.createElement('div');
        backdrop.className = 'mfb-backdrop';
        backdrop.onclick = () => { modalOpen = false; resetForm(); render(); };
        root.appendChild(backdrop);

        const modal = document.createElement('div');
        modal.className = 'mfb-modal';

        // Header
        modal.innerHTML = `
          <div class="mfb-header">
            <div>
              <h3>Submit Feedback</h3>
              <p>Help us improve Maeve</p>
            </div>
            <button class="mfb-close" id="mfb-close-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="mfb-body" id="mfb-body"></div>
        `;
        root.appendChild(modal);

        modal.querySelector('#mfb-close-btn').onclick = () => { modalOpen = false; resetForm(); render(); };

        const body = modal.querySelector('#mfb-body');

        if (formState === 'success') {
          body.innerHTML = `
            <div class="mfb-success">
              <div class="mfb-success-icon">✅</div>
              <h4>Thank You!</h4>
              <p>Your feedback has been submitted. The Maeve team will review it shortly.</p>
            </div>
          `;
          setTimeout(() => { modalOpen = false; resetForm(); render(); }, 2500);
          return;
        }

        // Form
        body.innerHTML = `
          <div class="mfb-type-row">
            <button class="mfb-type-btn ${type === 'bug' ? 'active' : ''}" data-type="bug">
              <div class="mfb-type-btn-label">🐛 Bug Report</div>
              <div class="mfb-type-btn-desc">Something is broken</div>
            </button>
            <button class="mfb-type-btn ${type === 'feedback' ? 'active' : ''}" data-type="feedback">
              <div class="mfb-type-btn-label">💡 Feedback</div>
              <div class="mfb-type-btn-desc">Suggestion or idea</div>
            </button>
          </div>
          
          <div class="mfb-field">
            <label class="mfb-label">Title</label>
            <input class="mfb-input" id="mfb-title" placeholder="${type === 'bug' ? 'What went wrong?' : 'What would you improve?'}" value="${escapeHtml(title)}" maxlength="120" required>
          </div>
          
          <div class="mfb-field">
            <label class="mfb-label">Description</label>
            <textarea class="mfb-textarea" id="mfb-desc" placeholder="${type === 'bug' ? 'Steps to reproduce, expected vs actual behavior…' : 'Describe your suggestion in detail…'}" required>${escapeHtml(description)}</textarea>
            <div class="mfb-char-count">${description.length} / ${DESC_MIN_LENGTH} min</div>
          </div>
          
          <div class="mfb-field">
            <label class="mfb-label">Priority</label>
            <div class="mfb-priority-row">
              ${['low', 'medium', 'high', 'critical'].map(p => 
                `<button class="mfb-priority-btn ${priority === p ? 'active' : ''}" data-priority="${p}">${p}</button>`
              ).join('')}
            </div>
          </div>
          
          <div class="mfb-actions-row">
            <button class="mfb-action-btn" id="mfb-attach-btn">📎 Attach Files (${files.length}/${MAX_ATTACHMENTS})</button>
            <input type="file" id="mfb-file-input" accept=".png,.jpg,.jpeg,.gif,.webp" multiple style="display:none">
          </div>
          ${files.length > 0 ? `
            <div class="mfb-file-chips">
              ${files.map((f, i) => `<span class="mfb-file-chip">${escapeHtml(f.name)} <button class="mfb-file-remove" data-index="${i}">×</button></span>`).join('')}
            </div>
          ` : ''}
          
          <div class="mfb-context">
            <div class="mfb-context-title">Auto-captured context:</div>
            <div>Page: ${window.location.pathname}</div>
            <div>Viewport: ${window.innerWidth}×${window.innerHeight}</div>
            <div>Submitted by: ${escapeHtml(userName)}</div>
          </div>
          
          ${error ? `<div class="mfb-error">${escapeHtml(error)}</div>` : ''}
          
          <button class="mfb-submit" id="mfb-submit" ${formState === 'submitting' ? 'disabled' : ''}>
            ${formState === 'submitting' ? '<div class="mfb-spinner"></div> Submitting…' : 'Submit Feedback'}
          </button>
        `;

        // Event listeners
        body.querySelectorAll('.mfb-type-btn').forEach(btn => {
          btn.onclick = () => { type = btn.dataset.type; render(); };
        });
        body.querySelectorAll('.mfb-priority-btn').forEach(btn => {
          btn.onclick = () => { priority = btn.dataset.priority; render(); };
        });
        body.querySelector('#mfb-title').oninput = (e) => { title = e.target.value; };
        body.querySelector('#mfb-desc').oninput = (e) => { description = e.target.value; };
        
        const fileInput = body.querySelector('#mfb-file-input');
        body.querySelector('#mfb-attach-btn').onclick = () => fileInput.click();
        fileInput.onchange = (e) => {
          const newFiles = Array.from(e.target.files).filter(f => 
            f.size <= MAX_FILE_SIZE && ['image/png','image/jpeg','image/gif','image/webp'].includes(f.type)
          );
          files = [...files, ...newFiles].slice(0, MAX_ATTACHMENTS);
          render();
        };
        body.querySelectorAll('.mfb-file-remove').forEach(btn => {
          btn.onclick = () => { files.splice(parseInt(btn.dataset.index), 1); render(); };
        });
        
        body.querySelector('#mfb-submit').onclick = async () => {
          error = '';
          title = body.querySelector('#mfb-title').value;
          description = body.querySelector('#mfb-desc').value;
          
          if (title.length < 5) { error = 'Title must be at least 5 characters.'; render(); return; }
          if (description.length < DESC_MIN_LENGTH) { error = `Description must be at least ${DESC_MIN_LENGTH} characters.`; render(); return; }
          
          formState = 'submitting';
          render();
          
          try {
            const ticket = await createTicket({
              type, priority, title, description,
              page_url: window.location.href,
              page_title: document.title,
              viewport: `${window.innerWidth}x${window.innerHeight}`,
              user_agent: navigator.userAgent,
              submitted_by_id: userId,
              submitted_by_name: userName,
              submitted_by_email: userEmail,
              status: 'inbox',
            });
            
            await logActivity(ticket.id, userId, userName);
            
            for (const file of files) {
              await uploadToStorage(ticket.id, file);
            }
            
            formState = 'success';
            render();
          } catch (err) {
            error = err.message || 'Submission failed. Please try again.';
            formState = 'form';
            render();
          }
        };
      }
    }

    function resetForm() {
      formState = 'idle';
      type = 'feedback';
      priority = 'medium';
      title = '';
      description = '';
      files = [];
      error = '';
    }

    render();
    return { destroy: () => root.remove() };
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ── Public API ──
  window.MaeveFeedback = {
    init: async function(config) {
      injectStyles();
      
      // Check access before rendering
      const hasAccess = await checkAccess(config.userId);
      if (!hasAccess) {
        console.log('[MaeveFeedback] User does not have feedback access.');
        return null;
      }

      return createWidget(config);
    },

    // Auto-init from script attributes
    _autoInit: function() {
      const script = document.querySelector('script[data-user-id]');
      if (!script) return;
      
      this.init({
        userId: script.getAttribute('data-user-id'),
        userName: script.getAttribute('data-user-name') || 'Anonymous',
        userEmail: script.getAttribute('data-user-email') || '',
      });
    },
  };

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.MaeveFeedback._autoInit());
  } else {
    window.MaeveFeedback._autoInit();
  }
})();
