import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, MapPin, CheckSquare, Compass, MessageCircle, FolderOpen, Calendar, Users } from 'lucide-react';
import { memberProfile } from '../mockData';
import MaeveChatPanel from './MaeveChatPanel';

const SIDEBAR_LINKS = [
  { to: '/member', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/member/journey', icon: MapPin, label: 'Transition Journey' },
  { to: '/member/checklist', icon: CheckSquare, label: 'Checklists' },
  { to: '/member/assessment', icon: Compass, label: 'Self-Assessment' },
  { to: '/member/documents', icon: FolderOpen, label: 'Document Vault' },
  { to: '/member/planner', icon: Calendar, label: 'Life Planner' },
  { to: '/member/community', icon: Users, label: 'Community' },
];

export default function MemberPortal() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      paddingTop: 'var(--nav-height)',
    }}>
      {/* Sidebar */}
      <aside style={{
        width: 'var(--sidebar-width)',
        background: 'var(--forest)',
        position: 'fixed',
        top: 'var(--nav-height)',
        left: 0,
        bottom: 0,
        zIndex: 30,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Noise overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
          pointerEvents: 'none',
        }} />

        {/* Navigation */}
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
              })}
            >
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Chat Toggle */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 24px',
            background: chatOpen ? 'var(--gold-soft)' : 'rgba(255,255,255,0.04)',
            border: 'none',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            color: chatOpen ? 'var(--gold)' : 'rgba(250,249,246,0.7)',
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s var(--ease-out)',
            position: 'relative',
          }}
        >
          <MessageCircle size={18} />
          Ask Maeve
          <span style={{
            position: 'absolute',
            right: '24px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--gold)',
            animation: 'goldPulse 2s ease-in-out infinite',
          }} />
        </button>

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
          }}>{memberProfile.initials}</div>
          <div>
            <div style={{
              color: 'var(--linen)',
              fontSize: '13px',
              fontWeight: 500,
            }}>{memberProfile.name}</div>
            <div style={{
              color: 'rgba(250,249,246,0.4)',
              fontSize: '11px',
            }}>{memberProfile.tier}</div>
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
        transition: 'margin-right 0.3s var(--ease-out)',
        marginRight: chatOpen ? 'var(--chat-width)' : '0',
      }}>
        <Outlet />
      </main>

      {/* Chat Panel */}
      {chatOpen && <MaeveChatPanel onClose={() => setChatOpen(false)} />}
    </div>
  );
}
