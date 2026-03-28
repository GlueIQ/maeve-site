import React, { useState } from 'react';
import { ViewTransition } from '../components/GoldSpinner';
import { advisorClients } from '../mockData';
import { Search, Filter, X, ChevronRight } from 'lucide-react';

const RISK_COLORS = { high: 'var(--rose)', medium: 'var(--amber)', low: '#22c55e' };
const TRANSITION_COLORS = {
  inheritance: { bg: 'var(--gold-soft)', text: 'var(--gold)' },
  'spousal-loss': { bg: 'rgba(27,73,101,0.1)', text: 'var(--teal)' },
  caregiving: { bg: 'rgba(194,120,91,0.1)', text: 'var(--terracotta)' },
};

export default function ClientRoster() {
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);

  const filtered = advisorClients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ViewTransition viewKey="clients">
      <div>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          fontWeight: 600,
          display: 'block',
          marginBottom: '8px',
        }}>Practice Management</span>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '28px',
          fontWeight: 300,
          color: 'var(--forest)',
          letterSpacing: '-0.02em',
          marginBottom: '24px',
        }}>Client Roster</h1>

        {/* Search */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
        }}>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--sandstone)',
            background: 'white',
          }}>
            <Search size={16} color="var(--espresso)" style={{ opacity: 0.3 }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search clients..."
              style={{
                border: 'none',
                outline: 'none',
                flex: 1,
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                color: 'var(--espresso)',
                background: 'transparent',
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xs)',
          border: '1px solid rgba(0,26,14,0.06)',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '200px 120px 100px 80px 100px 60px 40px',
            gap: '16px',
            padding: '14px 24px',
            borderBottom: '1px solid rgba(0,26,14,0.06)',
            background: 'var(--linen)',
          }}>
            {['Client', 'Transition', 'Phase', 'Progress', 'AUM', 'Risk', ''].map(h => (
              <span key={h} style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: 'var(--espresso)',
                opacity: 0.4,
              }}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          {filtered.map(client => {
            const transStyle = TRANSITION_COLORS[client.transition] || {};
            return (
              <div
                key={client.id}
                onClick={() => setSelectedClient(client)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 120px 100px 80px 100px 60px 40px',
                  gap: '16px',
                  padding: '16px 24px',
                  borderBottom: '1px solid rgba(0,26,14,0.04)',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                  alignItems: 'center',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-soft)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: 'var(--radius-full)',
                    background: 'var(--forest)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: 'var(--linen)',
                    fontFamily: 'var(--font-serif)', fontSize: '11px', fontWeight: 600,
                  }}>{client.initials}</div>
                  <span style={{
                    fontFamily: 'var(--font-sans)', fontSize: '14px',
                    fontWeight: 500, color: 'var(--forest)',
                  }}>{client.name}</span>
                </div>
                <span style={{
                  padding: '3px 10px', borderRadius: 'var(--radius-pill)',
                  background: transStyle.bg, color: transStyle.text,
                  fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-sans)',
                  whiteSpace: 'nowrap',
                }}>{client.transitionLabel}</span>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: '13px',
                  color: 'var(--espresso)', opacity: 0.7,
                }}>{client.phaseLabel}</span>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  <div style={{
                    flex: 1, height: '4px', borderRadius: '2px',
                    background: 'var(--sandstone)', overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%', width: `${client.progress}%`,
                      background: 'var(--gold)', borderRadius: '2px',
                    }} />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-sans)', fontSize: '11px',
                    color: 'var(--espresso)', opacity: 0.4,
                  }}>{client.progress}%</span>
                </div>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: '14px',
                  fontWeight: 500, color: 'var(--forest)',
                }}>{client.aum}</span>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: RISK_COLORS[client.risk],
                }} />
                <ChevronRight size={14} color="var(--espresso)" style={{ opacity: 0.3 }} />
              </div>
            );
          })}
        </div>

        {/* Client Detail Drawer */}
        {selectedClient && (
          <>
            <div className="scrim" onClick={() => setSelectedClient(null)} />
            <div style={{
              position: 'fixed', top: 'var(--nav-height)', right: 0, bottom: 0,
              width: '420px', background: 'white', zIndex: 45,
              borderLeft: '1px solid rgba(0,26,14,0.08)',
              boxShadow: 'var(--shadow-drawer)',
              animation: 'slideInRight 0.3s var(--ease-out) forwards',
              overflowY: 'auto', padding: '32px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: 'var(--radius-full)',
                    background: 'var(--forest)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: 'var(--gold)',
                    fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 600,
                    marginBottom: '12px',
                  }}>{selectedClient.initials}</div>
                  <h2 style={{
                    fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 400,
                    color: 'var(--forest)', marginBottom: '4px',
                  }}>{selectedClient.name}</h2>
                  <span style={{
                    padding: '3px 10px', borderRadius: 'var(--radius-pill)',
                    background: TRANSITION_COLORS[selectedClient.transition]?.bg,
                    color: TRANSITION_COLORS[selectedClient.transition]?.text,
                    fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-sans)',
                  }}>{selectedClient.transitionLabel}</span>
                </div>
                <button onClick={() => setSelectedClient(null)} style={{
                  width: '32px', height: '32px', borderRadius: 'var(--radius-full)',
                  border: 'none', background: 'var(--linen)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <X size={16} />
                </button>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                {[
                  { label: 'AUM', value: selectedClient.aum },
                  { label: 'Phase', value: selectedClient.phaseLabel },
                  { label: 'Progress', value: `${selectedClient.progress}%` },
                  { label: 'Last Contact', value: selectedClient.lastContact },
                ].map((s, i) => (
                  <div key={i} style={{
                    padding: '14px', borderRadius: 'var(--radius-md)',
                    background: 'var(--linen)', border: '1px solid rgba(0,26,14,0.04)',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-sans)', fontSize: '10px',
                      letterSpacing: '1.5px', textTransform: 'uppercase',
                      color: 'var(--espresso)', opacity: 0.4, marginBottom: '4px',
                    }}>{s.label}</div>
                    <div style={{
                      fontFamily: 'var(--font-serif)', fontSize: '18px',
                      fontWeight: 400, color: 'var(--forest)',
                    }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Next Action */}
              <div style={{
                padding: '16px', borderRadius: 'var(--radius-md)',
                background: 'var(--gold-soft)', border: '1px solid var(--gold-medium)',
                marginBottom: '24px',
              }}>
                <div style={{
                  fontFamily: 'var(--font-sans)', fontSize: '10px',
                  letterSpacing: '1.5px', textTransform: 'uppercase',
                  color: 'var(--gold)', fontWeight: 600, marginBottom: '4px',
                }}>Next Action</div>
                <div style={{
                  fontFamily: 'var(--font-sans)', fontSize: '14px',
                  color: 'var(--forest)', fontWeight: 500,
                }}>{selectedClient.nextAction}</div>
              </div>

              {/* Notes */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-sans)', fontSize: '10px',
                  letterSpacing: '1.5px', textTransform: 'uppercase',
                  color: 'var(--espresso)', opacity: 0.4, marginBottom: '8px',
                }}>Notes</div>
                <p style={{
                  fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                  fontSize: '14px', color: 'var(--espresso)', opacity: 0.7,
                  lineHeight: 1.6,
                }}>{selectedClient.notes}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </ViewTransition>
  );
}
