import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ViewTransition } from '../components/GoldSpinner';
import { memberProfile, phases, recommendedActions } from '../mockData';
import { ArrowRight, CheckCircle2, Clock, Sparkles, TrendingUp, Target, FileText } from 'lucide-react';

function ProgressRing({ progress, size = 80, strokeWidth = 5 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="var(--sandstone)" strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="var(--gold)" strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{
          transition: 'stroke-dashoffset 1.5s var(--ease-out)',
          '--circumference': circumference,
          '--offset': offset,
        }}
      />
    </svg>
  );
}

function AnimatedNumber({ value, suffix = '' }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    const num = parseInt(value);
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

export default function MemberDashboard() {
  const completedTasks = phases.flatMap(p => p.tasks).filter(t => t.done).length;
  const totalTasks = phases.flatMap(p => p.tasks).length;

  return (
    <ViewTransition viewKey="member-dashboard">
      {/* Welcome Banner */}
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
          top: '-50%', right: '-10%',
          width: '400px', height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(72,101,84,0.08) 0%, transparent 70%)',
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
        }}>Welcome Back</span>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '32px',
          fontWeight: 300,
          color: 'var(--linen)',
          letterSpacing: '-0.02em',
          marginBottom: '8px',
        }}>
          Good afternoon, {memberProfile.firstName}
        </h1>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '15px',
          color: 'rgba(250,249,246,0.6)',
          maxWidth: '500px',
          lineHeight: 1.6,
        }}>
          You're making real progress. Phase 2 is where strategy takes shape — and you're building a foundation that will serve you for decades.
        </p>
      </div>

      {/* Status Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginBottom: '32px',
      }}>
        {/* Progress Card */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          padding: '28px',
          boxShadow: 'var(--shadow-xs)',
          border: '1px solid rgba(0,26,14,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
        }}>
          <ProgressRing progress={memberProfile.overallProgress} />
          <div>
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'var(--espresso)',
              opacity: 0.5,
              marginBottom: '4px',
            }}>Overall Progress</div>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '36px',
              fontWeight: 300,
              color: 'var(--forest)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>
              <AnimatedNumber value={memberProfile.overallProgress} suffix="%" />
            </div>
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: 'var(--gold)',
              fontWeight: 500,
              marginTop: '4px',
            }}>Phase 2: Strategize</div>
          </div>
        </div>

        {/* Checklist Card */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          padding: '28px',
          boxShadow: 'var(--shadow-xs)',
          border: '1px solid rgba(0,26,14,0.06)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '16px',
          }}>
            <CheckCircle2 size={20} color="var(--gold)" />
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'var(--espresso)',
              opacity: 0.5,
            }}>Checklist Status</span>
          </div>
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '36px',
            fontWeight: 300,
            color: 'var(--forest)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            marginBottom: '8px',
          }}>
            <AnimatedNumber value={completedTasks} /> / {totalTasks}
          </div>
          <div style={{
            height: '4px',
            background: 'var(--sandstone)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${(completedTasks / totalTasks) * 100}%`,
              background: 'var(--gold)',
              borderRadius: '2px',
              transition: 'width 1.2s var(--ease-out)',
            }} />
          </div>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            color: 'var(--espresso)',
            opacity: 0.5,
            marginTop: '8px',
          }}>tasks completed across all phases</p>
        </div>

        {/* Insight Card */}
        <div style={{
          background: 'var(--cream)',
          borderRadius: 'var(--radius-xl)',
          padding: '28px',
          boxShadow: 'var(--shadow-xs)',
          border: '1px solid var(--gold-soft)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '16px',
          }}>
            <Sparkles size={20} color="var(--gold)" />
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontWeight: 600,
            }}>Maeve Insight</span>
          </div>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '15px',
            color: 'var(--forest)',
            lineHeight: 1.6,
            marginBottom: '12px',
          }}>
            "Your assessment revealed that decision confidence is your growth edge. That's actually a sign of healthy self-awareness."
          </p>
          <Link to="/member/assessment" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            color: 'var(--gold)',
            fontWeight: 600,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            View Assessment <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Phase Timeline Strip */}
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius-xl)',
        padding: '28px 32px',
        boxShadow: 'var(--shadow-xs)',
        border: '1px solid rgba(0,26,14,0.06)',
        marginBottom: '32px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '20px',
            fontWeight: 400,
            color: 'var(--forest)',
          }}>Your Journey</h2>
          <Link to="/member/journey" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            color: 'var(--gold)',
            fontWeight: 600,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            Full Timeline <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          position: 'relative',
        }}>
          {phases.map((phase, i) => (
            <React.Fragment key={phase.id}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                flex: 1,
                position: 'relative',
                zIndex: 1,
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: phase.status === 'completed' ? 'var(--gold)' :
                    phase.status === 'active' ? 'var(--forest)' : 'var(--sandstone)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: phase.status === 'completed' ? 'var(--forest)' :
                    phase.status === 'active' ? 'var(--gold)' : 'var(--espresso)',
                  border: phase.status === 'active' ? '2px solid var(--gold)' : 'none',
                  transition: 'all 0.5s var(--ease-out)',
                }}>
                  {phase.status === 'completed' ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>0{phase.id}</span>
                  )}
                </div>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: phase.status === 'active' ? 600 : 400,
                  color: phase.status === 'upcoming' ? 'var(--espresso)' : 'var(--forest)',
                  opacity: phase.status === 'upcoming' ? 0.4 : 1,
                }}>{phase.name}</span>
                {phase.status === 'active' && (
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    color: 'var(--gold)',
                    fontWeight: 600,
                  }}>{phase.progress}%</span>
                )}
              </div>
              {i < phases.length - 1 && (
                <div style={{
                  flex: 2,
                  height: '2px',
                  background: phase.status === 'completed' ? 'var(--gold)' : 'var(--sandstone)',
                  position: 'relative',
                  top: '-12px',
                  transition: 'background 0.5s var(--ease-out)',
                }}>
                  {phase.status === 'active' && (
                    <div style={{
                      height: '100%',
                      width: `${phase.progress}%`,
                      background: 'var(--gold)',
                      borderRadius: '1px',
                      transition: 'width 1s var(--ease-out)',
                    }} />
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Recommended Actions */}
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius-xl)',
        padding: '28px 32px',
        boxShadow: 'var(--shadow-xs)',
        border: '1px solid rgba(0,26,14,0.06)',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '20px',
          fontWeight: 400,
          color: 'var(--forest)',
          marginBottom: '20px',
        }}>Recommended Actions</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {recommendedActions.map(action => (
            <div key={action.id} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '16px 20px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--linen)',
              border: '1px solid rgba(0,26,14,0.04)',
              cursor: 'pointer',
              transition: 'all 0.2s var(--ease-out)',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--gold-medium)';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(0,26,14,0.04)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                marginTop: '6px',
                flexShrink: 0,
                background: action.priority === 'high' ? 'var(--gold)' :
                  action.priority === 'medium' ? 'var(--teal)' : 'var(--sage)',
              }} />
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--forest)',
                  marginBottom: '4px',
                }}>{action.title}</div>
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: 'var(--espresso)',
                  opacity: 0.6,
                  lineHeight: 1.5,
                }}>{action.description}</div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0,
              }}>
                <Clock size={12} color="var(--espresso)" style={{ opacity: 0.4 }} />
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  color: 'var(--espresso)',
                  opacity: 0.4,
                }}>{action.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ViewTransition>
  );
}
