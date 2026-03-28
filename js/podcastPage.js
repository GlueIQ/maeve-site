/* ═══════════════════════════════════════════════════
   THE LONG VIEW — Podcast Landing Page Logic
   Populates sections from podcastData.js
   ═══════════════════════════════════════════════════ */
(function () {
  const D = window.PODCAST_DATA;
  if (!D) return;

  const PILLAR_COLORS = {
    'Wealth Transition': { bg: '#e8f0ec', text: '#1a5c3a' },
    'Legal Navigation': { bg: '#e8eaf6', text: '#283593' },
    'Caregiving': { bg: '#fce4ec', text: '#880e4f' },
    'Emotional Intelligence': { bg: '#fff3e0', text: '#bf360c' },
    'Legacy Planning': { bg: '#f3e5f5', text: '#6a1b9a' },
    'Identity & Reinvention': { bg: '#e0f7fa', text: '#00695c' },
  };

  /* ── Section 2: Featured Episode ── */
  function renderFeatured() {
    const ep = D.episodes[0];
    const card = document.getElementById('featured-episode-card');
    if (!card) return;

    card.innerHTML = `
      <div class="flex flex-col lg:flex-row gap-10">
        <div class="flex-1">
          <span class="font-sans text-xs tracking-[0.2em] uppercase text-[#D4C5B0] font-semibold mb-3 block">EP ${ep.number} · ${ep.pillar}</span>
          <h3 class="serif-display text-2xl md:text-3xl text-primary mb-4 leading-tight">${ep.title}</h3>
          <p class="font-sans text-on-surface/70 leading-relaxed mb-6">${ep.description}</p>
          <div class="flex items-center gap-6 text-on-surface/40 font-sans text-sm mb-8">
            <span>${ep.date}</span><span>·</span><span>${ep.duration}</span>
          </div>
          <!-- Player -->
          <div class="waveform-player" id="featured-player">
            <div class="waveform-controls">
              <button class="waveform-play-btn" id="featured-play" aria-label="Play episode">
                <svg viewBox="0 0 24 24"><polygon points="8,5 19,12 8,19"/></svg>
              </button>
              <div class="waveform waveform--large" id="featured-waveform" style="flex:1"></div>
              <span class="waveform-time">${ep.duration}</span>
            </div>
          </div>
          <div class="flex gap-4 mt-6">
            <a href="#" class="font-sans text-sm font-semibold text-primary hover:text-[#D4C5B0] transition-colors">Apple Podcasts ↗</a>
            <a href="#" class="font-sans text-sm font-semibold text-primary hover:text-[#D4C5B0] transition-colors">YouTube ↗</a>
            <a href="#" class="font-sans text-sm font-semibold text-primary hover:text-[#D4C5B0] transition-colors">Spotify ↗</a>
          </div>
        </div>
        <div class="lg:w-80 lg:border-l lg:border-on-surface/8 lg:pl-10">
          <h4 class="font-sans text-xs tracking-[0.2em] uppercase text-on-surface/40 mb-4">Chapter Markers</h4>
          <div class="chapter-markers" id="chapter-markers"></div>
        </div>
      </div>
    `;

    // Generate waveform bars
    const wf = card.querySelector('#featured-waveform');
    for (let i = 0; i < 80; i++) {
      const bar = document.createElement('div');
      bar.className = 'waveform__bar';
      bar.style.height = Math.max(15, D.waveformFn(i, 'featured') * 100) + '%';
      wf.appendChild(bar);
    }

    // Chapter markers
    const cm = card.querySelector('#chapter-markers');
    if (D.chapterMarkers) {
      D.chapterMarkers.forEach(c => {
        cm.innerHTML += `
          <div class="chapter-marker">
            <span class="chapter-marker__time">${c.time}</span>
            <span class="chapter-marker__divider"></span>
            <span>${c.title}</span>
          </div>`;
      });
    }

    // Play button
    const playBtn = card.querySelector('#featured-play');
    let isPlaying = false;
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      wf.classList.toggle('playing', isPlaying);
      playBtn.innerHTML = isPlaying
        ? '<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" fill="#001a0e"/><rect x="14" y="4" width="4" height="16" fill="#001a0e"/></svg>'
        : '<svg viewBox="0 0 24 24"><polygon points="8,5 19,12 8,19" fill="#001a0e"/></svg>';
      if (isPlaying) {
        const bars = wf.querySelectorAll('.waveform__bar');
        let idx = 0;
        const iv = setInterval(() => {
          if (!isPlaying || idx >= bars.length) { clearInterval(iv); return; }
          bars[idx].classList.add('played');
          idx++;
        }, 300);
        wf._iv = iv;
      } else if (wf._iv) clearInterval(wf._iv);
    });
  }

  /* ── Section 3: Episode Library with Filters ── */
  function renderLibrary() {
    const tabs = document.getElementById('filter-tabs');
    const grid = document.getElementById('episode-grid');
    if (!tabs || !grid) return;

    const pillars = ['All', ...new Set(D.episodes.map(e => e.pillar))];
    pillars.forEach(p => {
      const btn = document.createElement('button');
      btn.className = 'filter-tab' + (p === 'All' ? ' active' : '');
      btn.textContent = p;
      btn.addEventListener('click', () => {
        tabs.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        filterEpisodes(p);
      });
      tabs.appendChild(btn);
    });

    // Render all episode cards
    D.episodes.forEach((ep, idx) => {
      const colors = PILLAR_COLORS[ep.pillar] || { bg: '#f0f0f0', text: '#333' };
      const card = document.createElement('div');
      card.className = 'episode-card';
      card.dataset.pillar = ep.pillar;
      card.style.animationDelay = (idx * 0.05) + 's';

      const isMostListened = ep.number === 18;
      card.innerHTML = `
        ${isMostListened ? '<div class="most-listened-badge">Most Listened</div>' : ''}
        <span class="episode-card__number">EP ${ep.number}</span>
        <span class="episode-card__pillar" style="background:${colors.bg};color:${colors.text}">${ep.pillar}</span>
        <h3 class="episode-card__title">${ep.title}</h3>
        <p class="episode-card__desc">${ep.description.length > 120 ? ep.description.substring(0, 120) + '…' : ep.description}</p>
        <div class="episode-card__footer">
          <span class="episode-card__meta-text">${ep.date} · ${ep.duration}</span>
          <div class="episode-card__links">
            <a href="#" class="episode-card__link">Apple</a>
            <a href="#" class="episode-card__link">YouTube</a>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function filterEpisodes(pillar) {
    const grid = document.getElementById('episode-grid');
    const cards = grid.querySelectorAll('.episode-card');
    cards.forEach(card => {
      const match = pillar === 'All' || card.dataset.pillar === pillar;
      if (match) {
        card.classList.remove('episode-card--hidden');
        card.style.display = '';
      } else {
        card.classList.add('episode-card--hidden');
        setTimeout(() => { card.style.display = 'none'; }, 400);
      }
    });
  }

  /* ── Section 4: Hosts ── */
  function renderHosts() {
    const h = D.hosts;
    if (!h) return;
    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
    setTxt('host-a-bio', h[0].bio);
    setTxt('host-a-quote', '"' + h[0].pullQuote + '"');
    setTxt('host-a-cite', '— ' + h[0].name + ', ' + h[0].quoteSource);
    setTxt('host-b-bio', h[1].bio);
    setTxt('host-b-quote', '"' + h[1].pullQuote + '"');
    setTxt('host-b-cite', '— ' + h[1].name + ', ' + h[1].quoteSource);
  }

  /* ── Section 5: Reviews ── */
  function renderReviews() {
    const grid = document.getElementById('reviews-grid');
    if (!grid || !D.reviews) return;
    D.reviews.forEach(r => {
      const card = document.createElement('div');
      card.className = 'review-card';
      card.innerHTML = `
        <div class="review-card__stars">${'★'.repeat(r.stars)}</div>
        <h4 class="review-card__title">${r.title}</h4>
        <p class="review-card__body">"${r.body}"</p>
        <div class="review-card__author">${r.author}</div>
        <div class="review-card__platform">${r.platform}</div>
      `;
      grid.appendChild(card);
    });
  }

  /* ── Section 6: Companion Tools ── */
  function renderTools() {
    const grid = document.getElementById('tools-grid');
    if (!grid || !D.companionTools) return;
    D.companionTools.forEach(t => {
      const card = document.createElement('div');
      card.className = 'tool-card';
      card.innerHTML = `
        <span class="tool-card__ep-tag">${t.episodeTag}</span>
        <h3 class="tool-card__name">${t.name}</h3>
        <p class="tool-card__desc">${t.description}</p>
        ${t.available
          ? `<a href="#" class="tool-card__btn tool-card__btn--available">Download Free →</a>`
          : `<span class="tool-card__btn tool-card__btn--coming">Coming Soon</span>`}
      `;
      grid.appendChild(card);
    });
  }

  /* ── Section 7: Newsletter ── */
  function initNewsletter() {
    const form = document.getElementById('podcast-newsletter-form');
    const btn = document.getElementById('newsletter-btn');
    const container = document.getElementById('newsletter-form-container');
    if (!form || !btn || !container) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      btn.innerHTML = '<span class="spinner"></span> Subscribing…';
      btn.classList.add('podcast-newsletter__btn--loading');
      setTimeout(() => {
        container.innerHTML = `
          <div class="podcast-newsletter__success">
            ✦ You're in. See you every other Tuesday.
          </div>
          <p class="font-sans text-xs text-[#faf9f6]/30 mt-4 text-center">Check your inbox for a welcome note from Margaux &amp; Tessa.</p>
        `;
      }, 1200);
    });
  }

  /* ── Lazy Section Reveal ── */
  function initLazyReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.lazy-section').forEach(el => observer.observe(el));
  }

  /* ── Init All ── */
  function initAll() {
    renderFeatured();
    renderLibrary();
    renderHosts();
    renderReviews();
    renderTools();
    initNewsletter();
    initLazyReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
