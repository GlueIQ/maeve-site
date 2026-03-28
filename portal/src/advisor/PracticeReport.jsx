import React from 'react';
import { ViewTransition } from '../components/GoldSpinner';
import { advisorProfile, benchmarkData, advisorClients } from '../mockData';
import { Download, Share2, TrendingUp } from 'lucide-react';

export default function PracticeReport() {
  const avgProgress = Math.round(advisorClients.reduce((sum, c) => sum + c.progress, 0) / advisorClients.length);
  const highRisk = advisorClients.filter(c => c.risk === 'high').length;

  return (
    <ViewTransition viewKey="report">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          marginBottom: '32px',
        }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '2px',
              textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600,
              display: 'block', marginBottom: '8px',
            }}>Monthly Report</span>
            <h1 style={{
              fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 300,
              color: 'var(--forest)', letterSpacing: '-0.02em', marginBottom: '4px',
            }}>Practice Report</h1>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: '14px',
              color: 'var(--espresso)', opacity: 0.4,
            }}>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} · {advisorProfile.firm}</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '10px 20px', borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--sandstone)', background: 'white',
              fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500,
              color: 'var(--forest)', cursor: 'pointer',
            }}>
              <Share2 size={14} /> Share
            </button>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '10px 20px', borderRadius: 'var(--radius-md)',
              background: 'var(--forest)', border: 'none',
              fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600,
              color: 'var(--linen)', cursor: 'pointer',
            }}>
              <Download size={14} /> Download PDF
            </button>
          </div>
        </div>

        {/* Hero Stat */}
        <div style={{
          background: 'var(--forest)', borderRadius: 'var(--radius-xl)',
          padding: '48px', textAlign: 'center', marginBottom: '24px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(72,101,84,0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '2px',
            textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600,
          }}>Total Assets Under Maeve Management</span>
          <div style={{
            fontFamily: 'var(--font-serif)', fontSize: '64px', fontWeight: 300,
            color: 'var(--linen)', letterSpacing: '-0.03em', lineHeight: 1.1,
            margin: '12px 0',
          }}>{advisorProfile.aum}</div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          }}>
            <TrendingUp size={14} color="#22c55e" />
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: '13px',
              color: '#22c55e', fontWeight: 600,
            }}>+12% from last quarter</span>
          </div>
        </div>

        {/* Summary Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px', marginBottom: '24px',
        }}>
          {[
            { label: 'Active Clients', value: advisorProfile.clientCount, sub: `${highRisk} high-attention` },
            { label: 'Avg. Progress', value: `${avgProgress}%`, sub: 'across all phases' },
            { label: 'Retention Rate', value: `${advisorProfile.retentionRate}%`, sub: '+27% vs industry' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: 'var(--radius-xl)',
              padding: '28px', boxShadow: 'var(--shadow-xs)',
              border: '1px solid rgba(0,26,14,0.06)', textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-sans)', fontSize: '11px',
                letterSpacing: '1.5px', textTransform: 'uppercase',
                color: 'var(--espresso)', opacity: 0.4, marginBottom: '8px',
              }}>{stat.label}</div>
              <div style={{
                fontFamily: 'var(--font-serif)', fontSize: '36px',
                fontWeight: 300, color: 'var(--forest)', letterSpacing: '-0.02em',
                marginBottom: '4px',
              }}>{stat.value}</div>
              <div style={{
                fontFamily: 'var(--font-sans)', fontSize: '12px',
                color: 'var(--espresso)', opacity: 0.3,
              }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Client Status Table */}
        <div style={{
          background: 'white', borderRadius: 'var(--radius-xl)',
          padding: '28px', boxShadow: 'var(--shadow-xs)',
          border: '1px solid rgba(0,26,14,0.06)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-serif)', fontSize: '18px',
            fontWeight: 400, color: 'var(--forest)', marginBottom: '20px',
          }}>Client Status Summary</h3>
          <table style={{
            width: '100%', borderCollapse: 'collapse',
          }}>
            <thead>
              <tr>
                {['Client', 'Transition', 'Phase', 'Progress', 'Status'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '10px 12px',
                    fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
                    letterSpacing: '1px', textTransform: 'uppercase',
                    color: 'var(--espresso)', opacity: 0.4,
                    borderBottom: '1px solid rgba(0,26,14,0.06)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {advisorClients.map(client => (
                <tr key={client.id}>
                  <td style={{
                    padding: '12px', fontFamily: 'var(--font-sans)',
                    fontSize: '14px', fontWeight: 500, color: 'var(--forest)',
                    borderBottom: '1px solid rgba(0,26,14,0.04)',
                  }}>{client.name}</td>
                  <td style={{
                    padding: '12px', borderBottom: '1px solid rgba(0,26,14,0.04)',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-sans)', fontSize: '12px',
                      color: 'var(--espresso)', opacity: 0.6,
                    }}>{client.transitionLabel}</span>
                  </td>
                  <td style={{
                    padding: '12px', fontFamily: 'var(--font-sans)',
                    fontSize: '13px', color: 'var(--espresso)', opacity: 0.6,
                    borderBottom: '1px solid rgba(0,26,14,0.04)',
                  }}>{client.phaseLabel}</td>
                  <td style={{
                    padding: '12px', borderBottom: '1px solid rgba(0,26,14,0.04)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '60px', height: '4px', borderRadius: '2px',
                        background: 'var(--sandstone)', overflow: 'hidden',
                      }}>
                        <div style={{
                          height: '100%', width: `${client.progress}%`,
                          background: 'var(--gold)', borderRadius: '2px',
                        }} />
                      </div>
                      <span style={{
                        fontFamily: 'var(--font-sans)', fontSize: '12px',
                        color: 'var(--espresso)', opacity: 0.4,
                      }}>{client.progress}%</span>
                    </div>
                  </td>
                  <td style={{
                    padding: '12px', borderBottom: '1px solid rgba(0,26,14,0.04)',
                  }}>
                    <div style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: client.risk === 'high' ? 'var(--rose)' : client.risk === 'medium' ? 'var(--amber)' : '#22c55e',
                    }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ViewTransition>
  );
}
