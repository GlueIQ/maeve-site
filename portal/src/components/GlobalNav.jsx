import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const STATIC_SITE_URL = '';

const NAV_LINKS = [
  { label: 'The Long View', href: '/the-long-view.html', external: true },
  { label: 'Tools', href: '/tools.html', external: true },
  { label: 'Community', href: '/community.html', external: true },
  { label: 'For Advisors', href: '/for-advisors.html', external: true },
];

export default function GlobalNav({ onOpenDropdown, dropdownOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(250,249,246,0.92)' : 'var(--linen)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'all 0.3s var(--ease-out)',
      }}>
        {/* Inner container — matches editorial max-w-[1440px] mx-auto px-6 md:px-12 py-5 md:py-6 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '20px 48px',  /* py-5 (20px) px-12 (48px) — matches editorial */
        }}>
          {/* Logo — editorial: font-['Noto_Serif'] text-xl md:text-2xl font-bold tracking-tight uppercase */}
          <a href={`${STATIC_SITE_URL}/`} style={{
            flexShrink: 0,
            fontFamily: 'var(--font-serif)',
            fontSize: '24px',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            textTransform: 'uppercase',
            color: 'var(--forest)',
            textDecoration: 'none',
          }} aria-label="MAEVE">
            <span aria-hidden="true" style={{ position: 'relative' }}>
              M
              <span style={{ position: 'relative', display: 'inline-block' }}>
                &Lambda;
                {/* We use an absolutely positioned span instead of ::after since inline styles don't support pseudo-elements */}
                <span style={{
                  position: 'absolute',
                  top: '52%',
                  left: '17%',
                  width: '66%',
                  height: '0.07em',
                  backgroundColor: 'currentColor',
                  transform: 'rotate(-12deg)',
                  transformOrigin: 'center',
                  borderRadius: '1px'
                }}></span>
              </span>
              EVE
            </span>
          </a>

          {/* Center nav links — editorial: font-['Noto_Serif'] text-lg tracking-tight, space-x-12 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '48px',
            fontFamily: 'var(--font-serif)',
            letterSpacing: '-0.025em',
          }}>
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={`${STATIC_SITE_URL}${link.href}`}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 500,
                  fontSize: '18px',
                  color: 'rgba(26,28,26,0.7)',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  letterSpacing: '-0.025em',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--forest)'}
                onMouseLeave={e => e.target.style.color = 'rgba(26,28,26,0.7)'}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right cluster — editorial: gap-6 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}>
            {/* Login — editorial: font-['Plus_Jakarta_Sans'] text-sm font-medium */}
            <button
              onClick={onOpenDropdown}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--forest)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                opacity: dropdownOpen ? 0.7 : 1,
                transition: 'opacity 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 0.7}
              onMouseLeave={e => { if (!dropdownOpen) e.currentTarget.style.opacity = 1; }}
            >
              Login
            </button>

            {/* Start Here — editorial: bg-primary text-on-primary px-6 py-2 rounded-sm font-label text-xs uppercase tracking-widest */}
            <a
              href="/tools.html"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--linen)',
                background: 'var(--forest)',
                padding: '8px 24px',
                borderRadius: '2px',
                textDecoration: 'none',
                transition: 'opacity 0.5s ease-in-out',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 0.8}
              onMouseLeave={e => e.currentTarget.style.opacity = 1}
            >
              Start Here →
            </a>
          </div>
        </div>

        {/* Bottom border — editorial: bg-[#efeeeb] h-[1px] w-full */}
        <div style={{
          background: '#efeeeb',
          height: '1px',
          width: '100%',
        }} />
      </header>

      {/* Dropdown */}
      {dropdownOpen && <MaeveDropdown onClose={onOpenDropdown} />}
    </>
  );
}

function MaeveDropdown({ onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div
        ref={ref}
        style={{
          position: 'fixed',
          top: 'var(--nav-height)',
          left: 0,
          right: 0,
          zIndex: 45,
          background: 'var(--forest)',
          borderBottom: '2px solid var(--gold)',
          animation: 'dropdownIn 0.35s var(--ease-out) forwards',
          overflow: 'hidden',
        }}
      >
        {/* Noise texture overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '48px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px',
          position: 'relative',
        }}>
          {/* Member Card */}
          <Link
            to="/member"
            onClick={onClose}
            style={{
              display: 'block',
              background: 'var(--cream)',
              borderRadius: 'var(--radius-xl)',
              padding: '32px',
              textDecoration: 'none',
              transition: 'all 0.3s var(--ease-out)',
              border: '1px solid transparent',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--forest)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold)',
                fontFamily: 'var(--font-serif)',
                fontSize: '16px',
                fontWeight: 600,
              }}>SM</div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '11px',
                  color: 'var(--gold)',
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                }}>Member Portal</div>
              </div>
            </div>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '22px',
              color: 'var(--forest)',
              marginBottom: '8px',
              fontWeight: 400,
            }}>Welcome back, Sarah</h3>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              color: 'var(--espresso)',
              opacity: 0.7,
              lineHeight: 1.5,
            }}>Continue your journey through Phase 2: Strategize. You're 62% through.</p>
            <div style={{
              marginTop: '16px',
              height: '3px',
              background: 'var(--sandstone)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: '62%',
                background: 'var(--gold)',
                borderRadius: '2px',
                transition: 'width 1s var(--ease-out)',
              }} />
            </div>
          </Link>

          {/* Advisor Card */}
          <Link
            to="/advisor"
            onClick={onClose}
            style={{
              display: 'block',
              background: 'var(--forest-mid)',
              borderRadius: 'var(--radius-xl)',
              padding: '32px',
              textDecoration: 'none',
              transition: 'all 0.3s var(--ease-out)',
              border: '1px solid var(--gold-medium)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(72,101,84,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--forest)',
                fontFamily: 'var(--font-serif)',
                fontSize: '16px',
                fontWeight: 600,
              }}>DC</div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '11px',
                  color: 'var(--gold)',
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                }}>Advisor Portal</div>
              </div>
            </div>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '22px',
              color: 'var(--linen)',
              marginBottom: '8px',
              fontWeight: 400,
            }}>Advisor Dashboard</h3>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              color: 'rgba(250,249,246,0.7)',
              lineHeight: 1.5,
            }}>3 alerts require attention. 8 active transitions across your practice.</p>
            <div style={{
              marginTop: '16px',
              display: 'flex',
              gap: '8px',
            }}>
              <span style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(225,29,72,0.2)',
                color: '#F87171',
                fontSize: '11px',
                fontWeight: 600,
              }}>2 Urgent</span>
              <span style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--gold-soft)',
                color: 'var(--gold)',
                fontSize: '11px',
                fontWeight: 600,
              }}>1 This Week</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
