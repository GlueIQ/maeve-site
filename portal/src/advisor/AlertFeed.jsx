import React from 'react';
import { ViewTransition } from '../components/GoldSpinner';
import { advisorAlerts } from '../mockData';
import { AlertTriangle, Clock, Info } from 'lucide-react';

const TIER_CONFIG = {
  urgent: { label: 'Urgent', icon: AlertTriangle, color: 'var(--rose)', bg: 'rgba(225,29,72,0.06)', border: 'rgba(225,29,72,0.2)' },
  'this-week': { label: 'This Week', icon: Clock, color: 'var(--gold)', bg: 'var(--gold-soft)', border: 'var(--gold-medium)' },
  fyi: { label: 'For Your Information', icon: Info, color: 'var(--teal)', bg: 'rgba(0,26,14,0.02)', border: 'rgba(0,26,14,0.08)' },
};

export default function AlertFeed() {
  const grouped = {
    urgent: advisorAlerts.filter(a => a.tier === 'urgent'),
    'this-week': advisorAlerts.filter(a => a.tier === 'this-week'),
    fyi: advisorAlerts.filter(a => a.tier === 'fyi'),
  };

  return (
    <ViewTransition viewKey="alerts">
      <div style={{ maxWidth: '800px' }}>
        <span style={{
          fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '2px',
          textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600,
          display: 'block', marginBottom: '8px',
        }}>Attention Required</span>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 300,
          color: 'var(--forest)', letterSpacing: '-0.02em', marginBottom: '32px',
        }}>Alert Feed</h1>

        {Object.entries(grouped).map(([tier, alerts]) => {
          const config = TIER_CONFIG[tier];
          if (alerts.length === 0) return null;
          return (
            <div key={tier} style={{ marginBottom: '32px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                marginBottom: '12px',
              }}>
                <config.icon size={16} color={config.color} />
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600,
                  color: config.color, textTransform: 'uppercase', letterSpacing: '1px',
                }}>{config.label}</span>
                <span style={{
                  padding: '1px 8px', borderRadius: 'var(--radius-full)',
                  background: config.bg, color: config.color,
                  fontSize: '11px', fontWeight: 700, fontFamily: 'var(--font-sans)',
                }}>{alerts.length}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {alerts.map(alert => (
                  <div key={alert.id} style={{
                    padding: '20px 24px', borderRadius: 'var(--radius-xl)',
                    background: config.bg, border: `1px solid ${config.border}`,
                    cursor: 'pointer', transition: 'all 0.2s var(--ease-out)',
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                  >
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'flex-start', marginBottom: '8px',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-sans)', fontSize: '14px',
                        fontWeight: 600, color: 'var(--forest)',
                      }}>{alert.client}</span>
                      <span style={{
                        fontFamily: 'var(--font-sans)', fontSize: '11px',
                        color: 'var(--espresso)', opacity: 0.3,
                      }}>{alert.timestamp}</span>
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-sans)', fontSize: '14px',
                      color: 'var(--espresso)', opacity: 0.7, lineHeight: 1.5,
                      marginBottom: '12px',
                    }}>{alert.message}</p>
                    <button style={{
                      fontFamily: 'var(--font-sans)', fontSize: '13px',
                      fontWeight: 600, color: config.color, background: 'none',
                      border: `1.5px solid ${config.border}`, borderRadius: 'var(--radius-md)',
                      padding: '8px 16px', cursor: 'pointer',
                      transition: 'all 0.2s var(--ease-out)',
                    }}>
                      {alert.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </ViewTransition>
  );
}
