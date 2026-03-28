import React, { useState } from 'react';
import { ViewTransition } from '../components/GoldSpinner';
import { phases } from '../mockData';
import { CheckCircle2, Circle, ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';

export default function TransitionJourney() {
  const [expandedPhase, setExpandedPhase] = useState(2);

  return (
    <ViewTransition viewKey="journey">
      <div style={{ maxWidth: '800px' }}>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          fontWeight: 600,
          display: 'block',
          marginBottom: '8px',
        }}>Your Journey</span>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '28px',
          fontWeight: 300,
          color: 'var(--forest)',
          letterSpacing: '-0.02em',
          marginBottom: '8px',
        }}>Transition Timeline</h1>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '15px',
          color: 'var(--espresso)',
          opacity: 0.6,
          marginBottom: '40px',
          lineHeight: 1.6,
        }}>
          Your path through the Maeve framework. Each phase builds on the last — there's no rushing this process.
        </p>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: '48px' }}>
          {/* Gold dashed line */}
          <div style={{
            position: 'absolute',
            left: '19px',
            top: '24px',
            bottom: '24px',
            width: '2px',
            background: 'repeating-linear-gradient(to bottom, var(--gold) 0px, var(--gold) 6px, transparent 6px, transparent 12px)',
          }} />

          {phases.map((phase, i) => {
            const isExpanded = expandedPhase === phase.id;
            const completedTasks = phase.tasks.filter(t => t.done).length;

            return (
              <div key={phase.id} style={{ marginBottom: '32px', position: 'relative' }}>
                {/* Phase Node */}
                <div style={{
                  position: 'absolute',
                  left: '-48px',
                  top: '4px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: phase.status === 'completed' ? 'var(--gold)' :
                    phase.status === 'active' ? 'var(--forest)' : 'white',
                  border: phase.status === 'active' ? '2px solid var(--gold)' :
                    phase.status === 'upcoming' ? '2px solid var(--sandstone)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1,
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  {phase.status === 'completed' ? (
                    <CheckCircle2 size={18} color="var(--forest)" />
                  ) : (
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: phase.status === 'active' ? 'var(--gold)' : 'var(--espresso)',
                      opacity: phase.status === 'upcoming' ? 0.3 : 1,
                    }}>0{phase.id}</span>
                  )}
                </div>

                {/* Phase Card */}
                <div
                  onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                  style={{
                    background: 'white',
                    borderRadius: 'var(--radius-xl)',
                    padding: '24px 28px',
                    boxShadow: 'var(--shadow-xs)',
                    border: phase.status === 'active' ? '1px solid var(--gold-medium)' : '1px solid rgba(0,26,14,0.06)',
                    cursor: 'pointer',
                    transition: 'all 0.3s var(--ease-out)',
                    opacity: phase.status === 'upcoming' ? 0.6 : 1,
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}>
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '4px',
                      }}>
                        <h3 style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '20px',
                          fontWeight: 400,
                          color: 'var(--forest)',
                          letterSpacing: '-0.01em',
                        }}>Phase {phase.id}: {phase.name}</h3>
                        {phase.status === 'active' && (
                          <span style={{
                            padding: '2px 10px',
                            borderRadius: 'var(--radius-pill)',
                            background: 'var(--gold-soft)',
                            color: 'var(--gold)',
                            fontSize: '11px',
                            fontWeight: 600,
                            fontFamily: 'var(--font-sans)',
                          }}>Active</span>
                        )}
                        {phase.status === 'completed' && (
                          <span style={{
                            padding: '2px 10px',
                            borderRadius: 'var(--radius-pill)',
                            background: 'var(--sage)',
                            color: 'var(--forest)',
                            fontSize: '11px',
                            fontWeight: 600,
                            fontFamily: 'var(--font-sans)',
                          }}>Complete</span>
                        )}
                      </div>
                      <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '14px',
                        color: 'var(--espresso)',
                        opacity: 0.6,
                      }}>{phase.description}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '13px',
                        color: 'var(--espresso)',
                        opacity: 0.4,
                      }}>{completedTasks}/{phase.tasks.length}</span>
                      {isExpanded ? <ChevronDown size={18} color="var(--forest)" /> : <ChevronRight size={18} color="var(--espresso)" style={{ opacity: 0.4 }} />}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {phase.status !== 'upcoming' && (
                    <div style={{
                      height: '3px',
                      background: 'var(--sandstone)',
                      borderRadius: '2px',
                      marginTop: '16px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${phase.progress}%`,
                        background: 'var(--gold)',
                        borderRadius: '2px',
                        transition: 'width 1s var(--ease-out)',
                      }} />
                    </div>
                  )}

                  {/* Expanded Tasks */}
                  {isExpanded && (
                    <div style={{
                      marginTop: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}>
                      {phase.tasks.map(task => (
                        <div key={task.id} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '10px 14px',
                          borderRadius: 'var(--radius-md)',
                          background: task.done ? 'rgba(72,101,84,0.04)' : task.doNotRush ? 'rgba(245,158,11,0.06)' : 'var(--linen)',
                          border: task.doNotRush ? '1px solid rgba(245,158,11,0.2)' : '1px solid transparent',
                        }}>
                          {task.done ? (
                            <CheckCircle2 size={16} color="var(--gold)" style={{ marginTop: '2px', flexShrink: 0 }} />
                          ) : (
                            <Circle size={16} color="var(--espresso)" style={{ opacity: 0.2, marginTop: '2px', flexShrink: 0 }} />
                          )}
                          <span style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '14px',
                            color: 'var(--espresso)',
                            opacity: task.done ? 0.5 : 0.8,
                            textDecoration: task.done ? 'line-through' : 'none',
                            flex: 1,
                          }}>{task.text}</span>
                          {task.doNotRush && (
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '2px 8px',
                              borderRadius: 'var(--radius-pill)',
                              background: 'rgba(245,158,11,0.12)',
                              flexShrink: 0,
                            }}>
                              <AlertTriangle size={10} color="var(--amber)" />
                              <span style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '10px',
                                fontWeight: 600,
                                color: 'var(--amber)',
                                letterSpacing: '0.5px',
                                textTransform: 'uppercase',
                              }}>Don't rush</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ViewTransition>
  );
}
