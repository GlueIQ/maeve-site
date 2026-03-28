import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ViewTransition } from '../components/GoldSpinner';
import { advisorProfile, advisorClients, advisorAlerts } from '../mockData';
import { ArrowRight, Users, AlertTriangle, TrendingUp, BarChart3, Bell } from 'lucide-react';

function AnimatedStat({ value, suffix = '' }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const num = parseFloat(value.replace(/[^0-9.]/g, ''));
    const duration = 1200;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * num));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);
  return <>{display}{suffix}</>;
}

const RISK_COLORS = { high: 'var(--rose)', medium: 'var(--amber)', low: 'var(--sage)' };
const TIER_STYLES = {
  urgent: { bg: 'rgba(225,29,72,0.06)', border: 'rgba(225,29,72,0.2)', dot: 'var(--rose)' },
  'this-week': { bg: 'var(--gold-soft)', border: 'var(--gold-medium)', dot: 'var(--gold)' },
  fyi: { bg: 'rgba(0,26,14,0.02)', border: 'rgba(0,26,14,0.08)', dot: 'var(--sage)' },
};

export default function AdvisorDashboard() {
  const urgentAlerts = advisorAlerts.filter(a => a.tier === 'urgent');

  return (
    <ViewTransition viewKey="advisor-dashboard">
      {/* Welcome */}
      <div style={{
        background: 'var(--forest)',
        borderRadius: 'var(--radius-xl)',
        padding: '40px 48px',
        marginBottom: '32px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '-30%', right: '-5%',
          width: '350px', height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(72,101,84,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          fontWeight: 600,
          display: 'block',
          marginBottom: '12px',
        }}>Advisor Portal</span>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '32px',
          fontWeight: 300,
          color: 'var(--linen)',
          letterSpacing: '-0.02em',
          marginBottom: '8px',
        }}>
          Welcome, {advisorProfile.firstName}
        </h1>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '15px',
          color: 'rgba(250,249,246,0.6)',
          lineHeight: 1.6,
        }}>
          {urgentAlerts.length > 0
            ? `You have ${urgentAlerts.length} urgent ${urgentAlerts.length === 1 ? 'alert' : 'alerts'} requiring attention. ${advisorProfile.activeTransitions} active transitions across your practice.`
            : `All quiet today. ${advisorProfile.activeTransitions} active transitions across your practice.`
          }
        </p>
      </div>

      {/* Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '32px',
      }}>
        {[
          { label: 'Active Clients', value: advisorProfile.clientCount.toString(), icon: Users, suffix: '' },
          { label: 'In Transition', value: advisorProfile.activeTransitions.toString(), icon: TrendingUp, suffix: '' },
          { label: 'Retention Rate', value: advisorProfile.retentionRate.toString(), icon: BarChart3, suffix: '%' },
          { label: 'Alert Queue', value: advisorAlerts.filter(a => a.tier === 'urgent').length.toString(), icon: Bell, suffix: '', highlight: true },
        ].map((stat, i) => (
          <div key={i} style={{
            background: stat.highlight && parseInt(stat.value) > 0 ? 'rgba(225,29,72,0.04)' : 'white',
            borderRadius: 'var(--radius-xl)',
            padding: '24px',
            boxShadow: 'var(--shadow-xs)',
            border: stat.highlight && parseInt(stat.value) > 0 ? '1px solid rgba(225,29,72,0.15)' : '1px solid rgba(0,26,14,0.06)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
            }}>
              <stat.icon size={16} color={stat.highlight ? 'var(--rose)' : 'var(--gold)'} />
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--espresso)',
                opacity: 0.4,
              }}>{stat.label}</span>
            </div>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '32px',
              fontWeight: 300,
              color: stat.highlight && parseInt(stat.value) > 0 ? 'var(--rose)' : 'var(--forest)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>
              <AnimatedStat value={stat.value} suffix={stat.suffix} />
            </div>
          </div>
        ))}
      </div>

      {/* Two Column: Client Map + Alerts */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
      }}>
        {/* Client Transition Map */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          padding: '28px',
          boxShadow: 'var(--shadow-xs)',
          border: '1px solid rgba(0,26,14,0.06)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '18px',
              fontWeight: 400,
              color: 'var(--forest)',
            }}>Client Transitions</h2>
            <Link to="/advisor/clients" style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: 'var(--gold)',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {advisorClients.map(client => (
              <div key={client.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--linen)',
                transition: 'all 0.15s var(--ease-out)',
                cursor: 'pointer',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-soft)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--linen)'}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--forest)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--linen)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '11px',
                  fontWeight: 600,
                  flexShrink: 0,
                }}>{client.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--forest)',
                  }}>{client.name}</div>
                  <div style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    color: 'var(--espresso)',
                    opacity: 0.4,
                  }}>{client.transitionLabel} · Phase {client.phase}</div>
                </div>
                <div style={{
                  width: '48px',
                  height: '4px',
                  borderRadius: '2px',
                  background: 'var(--sandstone)',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  <div style={{
                    height: '100%',
                    width: `${client.progress}%`,
                    background: RISK_COLORS[client.risk] || 'var(--gold)',
                    borderRadius: '2px',
                  }} />
                </div>
                {client.alerts > 0 && (
                  <span style={{
                    padding: '1px 6px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(225,29,72,0.1)',
                    color: 'var(--rose)',
                    fontSize: '11px',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>{client.alerts}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Alert Feed Preview */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          padding: '28px',
          boxShadow: 'var(--shadow-xs)',
          border: '1px solid rgba(0,26,14,0.06)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '18px',
              fontWeight: 400,
              color: 'var(--forest)',
            }}>Recent Alerts</h2>
            <Link to="/advisor/alerts" style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: 'var(--gold)',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {advisorAlerts.slice(0, 4).map(alert => {
              const tierStyle = TIER_STYLES[alert.tier];
              return (
                <div key={alert.id} style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: tierStyle.bg,
                  border: `1px solid ${tierStyle.border}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s var(--ease-out)',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: tierStyle.dot,
                      marginTop: '6px',
                      flexShrink: 0,
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--forest)',
                        marginBottom: '2px',
                      }}>{alert.client}</div>
                      <div style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '13px',
                        color: 'var(--espresso)',
                        opacity: 0.7,
                        lineHeight: 1.4,
                      }}>{alert.message}</div>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '11px',
                      color: 'var(--espresso)',
                      opacity: 0.3,
                      whiteSpace: 'nowrap',
                    }}>{alert.timestamp}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}
