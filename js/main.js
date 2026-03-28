/* ═══════════════════════════════════════════════════
   MAEVE — Shared Interactions & Animations
   Strategic Editorial Intelligence
   ═══════════════════════════════════════════════════ */

function initMain() {

  // ── Scroll Reveal (Intersection Observer) ──
  const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  // ── Stat Counter Animation ──
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.getAttribute('data-count');
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const start = performance.now();

        const numericTarget = parseFloat(target.replace(/,/g, ''));
        const hasDecimal = target.includes('.');
        const hasComma = target.includes(',');

        function formatNumber(n) {
          if (hasDecimal) {
            const parts = target.split('.');
            const decimals = parts[1] ? parts[1].length : 0;
            const formatted = n.toFixed(decimals);
            if (hasComma) {
              const [intPart, decPart] = formatted.split('.');
              return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + decPart;
            }
            return formatted;
          }
          const str = Math.round(n).toString();
          if (hasComma) {
            return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
          return str;
        }

        function step(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          const current = ease * numericTarget;
          el.textContent = prefix + formatNumber(current) + suffix;
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = prefix + target + suffix;
          }
        }

        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  // ── Navigation Scroll Behavior ──
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ── Mobile Menu Toggle ──
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Category Filter Pills (for other pages) ──
  const filterPills = document.querySelectorAll('.filter-pill');
  if (filterPills.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const category = pill.getAttribute('data-filter');
        const articles = document.querySelectorAll('[data-category]');
        articles.forEach(article => {
          if (category === 'all' || article.getAttribute('data-category') === category) {
            article.style.display = '';
            article.style.opacity = '0';
            article.style.transform = 'translateY(12px)';
            requestAnimationFrame(() => {
              article.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              article.style.opacity = '1';
              article.style.transform = 'translateY(0)';
            });
          } else {
            article.style.display = 'none';
          }
        });
      });
    });
  }

  // ── Radio Button Interaction (for tools page) ──
  document.querySelectorAll('.radio-option').forEach(option => {
    option.addEventListener('click', () => {
      const group = option.closest('.radio-group');
      if (group) {
        group.querySelectorAll('.radio-option').forEach(o => o.classList.remove('selected'));
      }
      option.classList.add('selected');
    });
  });

  // ── Smooth Page Transitions ──
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#')) {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.25s ease';
        setTimeout(() => {
          window.location.href = href;
        }, 250);
      }
    });
  });

  // Fade in on load
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMain);
} else {
  initMain();
}
