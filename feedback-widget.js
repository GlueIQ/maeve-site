/* ═══════════════════════════════════════════════════
   MAEVE FEEDBACK WIDGET — Standalone Embed Script
   For use on the static site and Management Portal
   ═══════════════════════════════════════════════════
   
   Usage: Add this before </body>:
   <script src="https://mymaeve.com/feedback-widget.js" 
     data-user-id="…" 
     data-user-name="…"
     data-user-email="…"
   ></script>
   
   Or initialize manually:
   window.MaeveFeedback.init({ userId, userName, userEmail });
   
   Beta access is controlled via a hidden toggle below the footer.
   Users must know where to look — there are no visible labels.
*/

(function() {
  'use strict';

  const SUPABASE_URL = 'https://wvkxqjlvgtwdsetsggdp.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2a3hxamx2Z3R3ZHNldHNnZ2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5MjYzODIsImV4cCI6MjA5MDUwMjM4Mn0.9uJPgkA8bUFuosC1jzgF_RIxSR8_jZIYw9vF17fwGXU';
  const STORAGE_TOGGLE_KEY = 'maeve-feedback-beta';
  const STORAGE_USER_KEY = 'maeve-feedback-user';
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

  // ── Beta access check ──
  async function checkBetaAccess(email) {
    const data = await supabaseFetch('feedback_users', {
      params: `?user_email=eq.${encodeURIComponent(email)}&enabled=eq.true&select=user_id,user_name,user_email`,
    });
    if (Array.isArray(data) && data.length > 0) return data[0];
    return null;
  }

  function getStoredUser() {
    try {
      const raw = localStorage.getItem(STORAGE_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  function storeUser(user) {
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
  }

  function clearUser() {
    localStorage.removeItem(STORAGE_USER_KEY);
  }

  // ── Widget UI ──
  function injectStyles() {
    if (document.getElementById('maeve-feedback-styles')) return;
    const style = document.createElement('style');
    style.id = 'maeve-feedback-styles';
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Noto+Serif+Display:wght@400;500&display=swap');
      
      .mfb-widget * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }
      
      /* Beta toggle — sits below the footer */
      .mfb-beta-toggle {
        display: flex; justify-content: center; align-items: center;
        gap: 8px; padding: 16px 0 10px;
        user-select: none;
      }
      .mfb-beta-label {
        font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
        color: rgba(26,28,26,0.25); font-weight: 500;
        cursor: pointer; transition: color 0.3s;
      }
      .mfb-beta-label:hover { color: rgba(26,28,26,0.45); }
      .mfb-beta-label.active { color: #486554; }
      .mfb-beta-switch {
        position: relative; width: 28px; height: 16px;
        background: rgba(26,28,26,0.12); border-radius: 8px;
        cursor: pointer; transition: background 0.3s; border: none; padding: 0;
      }
      .mfb-beta-switch.active { background: #486554; }
      .mfb-beta-switch::after {
        content: ''; position: absolute; top: 2px; left: 2px;
        width: 12px; height: 12px; border-radius: 50%;
        background: white; transition: transform 0.3s;
        box-shadow: 0 1px 2px rgba(0,0,0,0.15);
      }
      .mfb-beta-switch.active::after { transform: translateX(12px); }

      /* Email gate prompt */
      .mfb-gate {
        position: fixed; inset: 0; z-index: 100001;
        display: flex; align-items: center; justify-content: center;
        background: rgba(0,0,0,0.3); animation: mfb-fadeIn 0.2s ease;
      }
      .mfb-gate-card {
        background: #fff; border-radius: 16px; padding: 28px;
        width: 340px; box-shadow: 0 24px 48px rgba(0,0,0,0.15);
        border: 1px solid #efeeeb; animation: mfb-slideUp 0.3s ease;
      }
      .mfb-gate-card h4 {
        font-family: 'Noto Serif Display', serif; font-size: 18px;
        color: #001a0e; margin: 0 0 4px;
      }
      .mfb-gate-card p {
        font-size: 13px; color: rgba(26,28,26,0.5); margin: 0 0 16px;
      }
      .mfb-gate-row { display: flex; gap: 8px; }
      .mfb-gate-cancel {
        padding: 8px 16px; font-size: 13px; font-weight: 500;
        background: #efeeeb; color: #1a1c1a; border: none;
        border-radius: 8px; cursor: pointer;
      }
      .mfb-gate-submit {
        flex: 1; padding: 8px 16px; font-size: 13px; font-weight: 500;
        background: #486554; color: #fff; border: none;
        border-radius: 8px; cursor: pointer;
      }
      .mfb-gate-submit:disabled { opacity: 0.5; cursor: not-allowed; }
      .mfb-gate-error {
        font-size: 12px; color: #E11D48; margin: 8px 0 0; display: none;
      }
      
      .mfb-fab {
        position: fixed; bottom: 24px; right: 24px; z-index: 99998;
        width: 48px; height: 48px; border-radius: 50%; background: #486554;
        color: #fff; border: none; cursor: pointer; display: flex;
        align-items: center; justify-content: center;
        box-shadow: 0 4px 16px rgba(72,101,84,0.25);
        transition: all 0.2s; animation: mfb-fadeIn 0.3s ease;
      }
      .mfb-fab:hover { background: #3a5243; transform: scale(1.05); }
      
      .mfb-backdrop {
        position: fixed; inset: 0; background: rgba(0,0,0,0.3);
        z-index: 99999; animation: mfb-fadeIn 0.2s ease;
      }
      
      .mfb-modal {
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        z-index: 100000;
        width: 420px; max-height: 85vh; background: #fff;
        border-radius: 16px; box-shadow: 0 24px 48px rgba(0,0,0,0.15);
        border: 1px solid #efeeeb; overflow: hidden;
        display: flex; flex-direction: column;
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
      
      .mfb-body { padding: 20px; overflow-y: auto; flex: 1; min-height: 0; }
      
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
      @keyframes mfb-gentle-pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.3; } }
    `;
    document.head.appendChild(style);
  }

  function createWidget(config) {
    // Resolve user identity: stored > config > defaults
    let storedUser = getStoredUser();
    let currentUser = storedUser || {
      userId: config.userId || '',
      userName: config.userName || 'Anonymous',
      userEmail: config.userEmail || '',
    };
    let active = localStorage.getItem(STORAGE_TOGGLE_KEY) === 'true' && !!storedUser;
    let modalOpen = false;
    let gateOpen = false;
    let formState = 'idle';
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

    // Create beta toggle and append after the footer
    const betaToggle = document.createElement('div');
    betaToggle.className = 'mfb-beta-toggle';

    const label = document.createElement('span');
    label.className = `mfb-beta-label ${active ? 'active' : ''}`;
    label.textContent = 'beta';

    const toggleBtn = document.createElement('button');
    toggleBtn.className = `mfb-beta-switch ${active ? 'active' : ''}`;
    toggleBtn.setAttribute('aria-label', 'Toggle beta feedback mode');

    function activateBeta(user) {
      currentUser = user;
      storeUser(user);
      active = true;
      localStorage.setItem(STORAGE_TOGGLE_KEY, 'true');
      toggleBtn.className = 'mfb-beta-switch active';
      label.className = 'mfb-beta-label active';
      gateOpen = false;
      renderOverlay();
    }

    function deactivateBeta() {
      active = false;
      localStorage.setItem(STORAGE_TOGGLE_KEY, 'false');
      clearUser();
      storedUser = null;
      toggleBtn.className = 'mfb-beta-switch';
      label.className = 'mfb-beta-label';
      modalOpen = false;
      resetForm();
      renderOverlay();
    }

    function handleToggle() {
      if (active) {
        deactivateBeta();
      } else {
        // Show email gate
        gateOpen = true;
        renderOverlay();
      }
    }
    label.addEventListener('click', handleToggle);
    toggleBtn.addEventListener('click', handleToggle);

    betaToggle.appendChild(label);
    betaToggle.appendChild(toggleBtn);

    // Insert the toggle after footer or at end of body
    const footer = document.querySelector('footer');
    if (footer && footer.parentNode) {
      footer.parentNode.insertBefore(betaToggle, footer.nextSibling);
    } else {
      const main = document.querySelector('main') || document.body;
      main.appendChild(betaToggle);
    }

    function renderOverlay() {
      root.innerHTML = '';

      // Email gate prompt
      if (gateOpen) {
        const gate = document.createElement('div');
        gate.className = 'mfb-gate';
        gate.onclick = (e) => { if (e.target === gate) { gateOpen = false; renderOverlay(); } };

        const card = document.createElement('div');
        card.className = 'mfb-gate-card';
        card.innerHTML = `
          <h4>Beta Access</h4>
          <p>Enter your email to enable feedback mode.</p>
          <input type="email" placeholder="you@company.com" style="
            width: 100%; padding: 10px 12px; font-size: 14px;
            border: 1px solid #efeeeb; border-radius: 8px;
            margin-bottom: 12px; font-family: 'DM Sans', sans-serif;
            outline: none; transition: border-color 0.2s;
          " />
          <div class="mfb-gate-error">Email not found or not authorized for beta access.</div>
          <div class="mfb-gate-row">
            <button class="mfb-gate-cancel">Cancel</button>
            <button class="mfb-gate-submit">Verify</button>
          </div>
        `;

        const input = card.querySelector('input');
        const errEl = card.querySelector('.mfb-gate-error');
        const submitBtn = card.querySelector('.mfb-gate-submit');
        const cancelBtn = card.querySelector('.mfb-gate-cancel');

        input.addEventListener('focus', () => { input.style.borderColor = '#486554'; });
        input.addEventListener('blur', () => { input.style.borderColor = '#efeeeb'; });

        cancelBtn.onclick = () => { gateOpen = false; renderOverlay(); };

        submitBtn.onclick = async () => {
          const email = input.value.trim().toLowerCase();
          if (!email) { input.style.borderColor = '#E11D48'; return; }
          submitBtn.disabled = true;
          submitBtn.textContent = 'Checking…';
          errEl.style.display = 'none';
          try {
            const user = await checkBetaAccess(email);
            if (user) {
              activateBeta({
                userId: user.user_id,
                userName: user.user_name,
                userEmail: user.user_email,
              });
            } else {
              errEl.style.display = 'block';
              submitBtn.disabled = false;
              submitBtn.textContent = 'Verify';
            }
          } catch {
            errEl.textContent = 'Something went wrong. Try again.';
            errEl.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Verify';
          }
        };

        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitBtn.click(); });

        gate.appendChild(card);
        root.appendChild(gate);
        setTimeout(() => input.focus(), 100);
        return;
      }

      // FAB — only when active and modal is closed
      if (active && !modalOpen) {
        const fab = document.createElement('button');
        fab.className = 'mfb-fab';
        fab.innerHTML = '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/></svg>';
        fab.onclick = () => { modalOpen = true; formState = 'form'; renderOverlay(); };
        root.appendChild(fab);
      }

      // Modal
      if (modalOpen) {
        const backdrop = document.createElement('div');
        backdrop.className = 'mfb-backdrop';
        backdrop.onclick = () => { modalOpen = false; resetForm(); renderOverlay(); };
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

        modal.querySelector('#mfb-close-btn').onclick = () => { modalOpen = false; resetForm(); renderOverlay(); };

        const body = modal.querySelector('#mfb-body');

        if (formState === 'success') {
          body.innerHTML = `
            <div class="mfb-success">
              <div class="mfb-success-icon">✅</div>
              <h4>Thank You!</h4>
              <p>Your feedback has been submitted. The Maeve team will review it shortly.</p>
            </div>
          `;
          setTimeout(() => { modalOpen = false; resetForm(); renderOverlay(); }, 2500);
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
            <div>Submitted by: ${escapeHtml(currentUser.userName)}</div>
          </div>
          
          ${error ? `<div class="mfb-error">${escapeHtml(error)}</div>` : ''}
          
          <button class="mfb-submit" id="mfb-submit" ${formState === 'submitting' ? 'disabled' : ''}>
            ${formState === 'submitting' ? '<div class="mfb-spinner"></div> Submitting…' : 'Submit Feedback'}
          </button>
        `;

        // Event listeners
        body.querySelectorAll('.mfb-type-btn').forEach(btn => {
          btn.onclick = () => { type = btn.dataset.type; renderOverlay(); };
        });
        body.querySelectorAll('.mfb-priority-btn').forEach(btn => {
          btn.onclick = () => { priority = btn.dataset.priority; renderOverlay(); };
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
          renderOverlay();
        };
        body.querySelectorAll('.mfb-file-remove').forEach(btn => {
          btn.onclick = () => { files.splice(parseInt(btn.dataset.index), 1); renderOverlay(); };
        });
        
        body.querySelector('#mfb-submit').onclick = async () => {
          error = '';
          title = body.querySelector('#mfb-title').value;
          description = body.querySelector('#mfb-desc').value;
          
          if (title.length < 5) { error = 'Title must be at least 5 characters.'; renderOverlay(); return; }
          if (description.length < DESC_MIN_LENGTH) { error = `Description must be at least ${DESC_MIN_LENGTH} characters.`; renderOverlay(); return; }
          
          formState = 'submitting';
          renderOverlay();
          
          try {
            const ticket = await createTicket({
              type, priority, title, description,
              page_url: window.location.href,
              page_title: document.title,
              viewport: `${window.innerWidth}x${window.innerHeight}`,
              user_agent: navigator.userAgent,
              submitted_by_id: currentUser.userId,
              submitted_by_name: currentUser.userName,
              submitted_by_email: currentUser.userEmail,
              status: 'inbox',
            });
            
            await logActivity(ticket.id, currentUser.userId, currentUser.userName);
            
            for (const file of files) {
              await uploadToStorage(ticket.id, file);
            }
            
            formState = 'success';
            renderOverlay();
          } catch (err) {
            error = err.message || 'Submission failed. Please try again.';
            formState = 'form';
            renderOverlay();
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

    renderOverlay();
    return { destroy: () => { root.remove(); betaToggle.remove(); } };
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ── Public API ──
  window.MaeveFeedback = {
    init: function(config) {
      injectStyles();
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
