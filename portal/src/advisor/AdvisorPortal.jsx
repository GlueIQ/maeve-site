import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, Bell, BarChart3, Mail, FileBarChart } from 'lucide-react';
import { advisorProfile, advisorAlerts } from '../mockData';

const SIDEBAR_LINKS = [
  { to: '/advisor', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/advisor/clients', icon: Users, label: 'Client Roster' },
  { to: '/advisor/alerts', icon: Bell, label: 'Alert Feed', badge: advisorAlerts.filter(a => a.tier === 'urgent').length },
  { to: '/advisor/benchmarks', icon: BarChart3, label: 'Benchmarks' },
  { to: '/advisor/outreach', icon: Mail, label: 'Outreach Center' },
  { to: '/advisor/report', icon: FileBarChart, label: 'Practice Report' },
];

export default function AdvisorPortal() {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      paddingTop: 'var(--nav-height)',
    }}>
      {/* Sidebar */}
      <aside style={{
        width: 'var(--sidebar-width)',
        background: 'var(--forest-mid)',
        position: 'fixed',
        top: 'var(--nav-height)',
        left: 0,
        bottom: 0,
        zIndex: 30,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
          pointerEvents: 'none',
        }} />

        <nav style={{
          flex: 1,
          padding: '24px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          position: 'relative',
        }}>
          {SIDEBAR_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                textDecoration: 'none',
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--gold)' : 'rgba(250,249,246,0.6)',
                background: isActive ? 'rgba(72,101,84,0.08)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--gold)' : '3px solid transparent',
                transition: 'all 0.2s var(--ease-out)',
                position: 'relative',
              })}
            >
              <link.icon size={18} />
              {link.label}
              {link.badge > 0 && (
                <span style={{
                  position: 'absolute',
                  right: '24px',
                  padding: '1px 7px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--rose)',
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-sans)',
                  lineHeight: '16px',
                }}>{link.badge}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Profile */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          position: 'relative',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--forest)',
            fontFamily: 'var(--font-serif)',
            fontSize: '13px',
            fontWeight: 600,
          }}>{advisorProfile.initials}</div>
          <div>
            <div style={{
              color: 'var(--linen)',
              fontSize: '13px',
              fontWeight: 500,
            }}>{advisorProfile.name}</div>
            <div style={{
              color: 'rgba(250,249,246,0.4)',
              fontSize: '11px',
            }}>{advisorProfile.firm}</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{
        marginLeft: 'var(--sidebar-width)',
        flex: 1,
        padding: '32px 40px',
        background: 'var(--linen)',
        minHeight: '100%',
      }}>
        <Outlet />
      </main>
    </div>
  );
}
