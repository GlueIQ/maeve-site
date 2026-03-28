/* ═══════════════════════════════════════════════════
   THE LONG VIEW — Podcast Interstitial
   Trigger-based overlay with 7-day suppression
   ═══════════════════════════════════════════════════ */
(function () {
  const SUPPRESS_KEY = 'tlv_interstitial_suppress';
  const SUPPRESS_DAYS = 7;

  function isSuppressed() {
    const ts = localStorage.getItem(SUPPRESS_KEY);
    if (!ts) return false;
    return Date.now() - parseInt(ts, 10) < SUPPRESS_DAYS * 86400000;
  }
  function suppress() {
    localStorage.setItem(SUPPRESS_KEY, Date.now().toString());
  }

  /* ── Build the interstitial DOM ── */
  function buildInterstitial() {
    const data = window.PODCAST_DATA;
    if (!data) return;

    const featured = data.episodes[0];
    const scrim = document.createElement('div');
    scrim.className = 'podcast-interstitial-scrim';
    scrim.id = 'podcast-scrim';

    const modal = document.createElement('div');
    modal.className = 'podcast-interstitial';
    modal.id = 'podcast-modal';

    // Build avatar colors
    const avatarColors = ['#5C7A6B','#8B6F47','#6B5B7B','#4A7C82','#7B6B5C'];

    modal.innerHTML = `
      <!-- TOP ZONE -->
      <div class="interstitial-top">
        <div class="noise-overlay"></div>
        <button class="interstitial-close" id="interstitial-close" aria-label="Close">✕</button>
        <img src="assets/images/podcast-hosts-together.png" alt="The Long View hosts" class="interstitial-top__portrait">
        <div class="interstitial-top__name">${data.podcastName}</div>
        <p class="interstitial-top__tagline">${data.tagline}</p>
        <span class="interstitial-top__badge">
          <span style="font-size:10px">★</span> 4.9 · ${data.socialProof.appleRatings} Apple ratings
        </span>
      </div>
      <!-- BOTTOM ZONE -->
      <div class="interstitial-bottom">
        <div class="interstitial-bottom__label">Latest Episode · EP ${featured.number}</div>
        <div class="interstitial-bottom__title">${featured.title}</div>
        <div class="interstitial-bottom__meta">
          <span>${featured.date}</span>
          <span>·</span>
          <span>${featured.duration}</span>
        </div>
        <!-- Inline Waveform Player -->
        <div class="waveform-player" id="interstitial-player">
          <div class="waveform-controls">
            <button class="waveform-play-btn" id="interstitial-play" aria-label="Play preview">
              <svg viewBox="0 0 24 24"><polygon points="8,5 19,12 8,19"/></svg>
            </button>
            <div class="waveform" id="interstitial-waveform" style="flex:1;height:40px"></div>
            <span class="waveform-time">${featured.duration}</span>
          </div>
        </div>
        <div class="interstitial-divider"></div>
        <!-- Platform Buttons -->
        <div style="display:flex;flex-direction:column;gap:10px">
          <a href="#" class="platform-btn platform-btn--apple" target="_blank">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            Listen on Apple Podcasts
          </a>
          <a href="#" class="platform-btn platform-btn--youtube" target="_blank">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/></svg>
            Watch on YouTube
          </a>
        </div>
        <a href="podcast.html" class="interstitial-explore">Explore all episodes <span style="font-size:16px">→</span></a>
        <!-- Social Proof Strip -->
        <div class="social-proof-strip">
          <div class="avatar-stack">
            ${avatarColors.map((c,i) => `<div class="avatar-stack__item" style="background:${c};z-index:${5-i}">${['JM','SR','CL','AB','DK'][i]}</div>`).join('')}
          </div>
          <div>
            <div class="social-proof-strip__text">${data.socialProof.listeners.toLocaleString()} listeners</div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(scrim);
    document.body.appendChild(modal);

    // Generate waveform
    const wf = modal.querySelector('#interstitial-waveform');
    for (let i = 0; i < 50; i++) {
      const bar = document.createElement('div');
      bar.className = 'waveform__bar';
      const h = data.waveformFn(i, 'interstitial') * 100;
      bar.style.height = Math.max(12, h) + '%';
      wf.appendChild(bar);
    }

    // Wire close
    const close = () => {
      scrim.classList.remove('visible');
      modal.classList.remove('visible');
      document.body.style.overflow = '';
      suppress();
    };
    scrim.addEventListener('click', close);
    modal.querySelector('#interstitial-close').addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    // Wire play button
    const playBtn = modal.querySelector('#interstitial-play');
    let isPlaying = false;
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      wf.classList.toggle('playing', isPlaying);
      playBtn.innerHTML = isPlaying
        ? '<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" fill="#001a0e"/><rect x="14" y="4" width="4" height="16" fill="#001a0e"/></svg>'
        : '<svg viewBox="0 0 24 24"><polygon points="8,5 19,12 8,19" fill="#001a0e"/></svg>';
      // Simulate progress
      if (isPlaying) {
        const bars = wf.querySelectorAll('.waveform__bar');
        let idx = 0;
        const iv = setInterval(() => {
          if (!isPlaying || idx >= bars.length) { clearInterval(iv); return; }
          bars[idx].classList.add('played');
          idx++;
        }, 400);
        wf._interval = iv;
      } else if (wf._interval) {
        clearInterval(wf._interval);
      }
    });
  }

  /* ── Open logic ── */
  function openInterstitial() {
    const scrim = document.getElementById('podcast-scrim');
    const modal = document.getElementById('podcast-modal');
    if (!scrim || !modal) return;
    document.body.style.overflow = 'hidden';
    scrim.classList.add('visible');
    modal.classList.add('visible');
  }

  /* ── Initialization ── */
  function initAll() {
    buildInterstitial();

    // Listen for custom event triggers
    document.addEventListener('openPodcastInterstitial', () => {
      openInterstitial();
    });

    // Bind any CTA elements with data-podcast-trigger
    document.querySelectorAll('[data-podcast-trigger]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        if (!isSuppressed()) openInterstitial();
        else window.location.href = 'podcast.html';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
