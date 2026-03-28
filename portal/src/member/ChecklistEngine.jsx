import React, { useState } from 'react';
import { ViewTransition } from '../components/GoldSpinner';
import { checklists } from '../mockData';
import { CheckCircle2, Circle, AlertTriangle } from 'lucide-react';

export default function ChecklistEngine() {
  const checklistKeys = Object.keys(checklists);
  const [activeTab, setActiveTab] = useState(checklistKeys[0]);
  const [checkedItems, setCheckedItems] = useState(() => {
    const initial = {};
    Object.values(checklists).forEach(cl => {
      cl.items.forEach(item => { initial[item.id] = item.done; });
    });
    return initial;
  });

  const toggleItem = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const activeChecklist = checklists[activeTab];
  const completedCount = activeChecklist.items.filter(i => checkedItems[i.id]).length;
  const totalCount = activeChecklist.items.length;

  return (
    <ViewTransition viewKey="checklists">
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
        }}>Action Items</span>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '28px',
          fontWeight: 300,
          color: 'var(--forest)',
          letterSpacing: '-0.02em',
          marginBottom: '8px',
        }}>Your Checklists</h1>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '15px',
          color: 'var(--espresso)',
          opacity: 0.6,
          marginBottom: '32px',
          lineHeight: 1.6,
        }}>
          Structured guidance for every stage. Check items as you complete them — your progress is saved automatically.
        </p>

        {/* Tab Row */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px',
          marginBottom: '24px',
        }}>
          {checklistKeys.map(key => {
            const cl = checklists[key];
            const done = cl.items.filter(i => checkedItems[i.id]).length;
            const isActive = key === activeTab;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-pill)',
                  border: isActive ? '1.5px solid var(--forest)' : '1.5px solid var(--sandstone)',
                  background: isActive ? 'var(--forest)' : 'transparent',
                  color: isActive ? 'var(--linen)' : 'var(--espresso)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s var(--ease-out)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {cl.title}
                <span style={{
                  fontSize: '11px',
                  opacity: 0.6,
                }}>{done}/{cl.items.length}</span>
              </button>
            );
          })}
        </div>

        {/* Checklist Content */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xs)',
          border: '1px solid rgba(0,26,14,0.06)',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            padding: '24px 28px 16px',
            borderBottom: '1px solid rgba(0,26,14,0.06)',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '20px',
              fontWeight: 400,
              color: 'var(--forest)',
              marginBottom: '4px',
            }}>{activeChecklist.title}</h2>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: 'var(--espresso)',
              opacity: 0.5,
              marginBottom: '12px',
            }}>{activeChecklist.description}</p>
            <div style={{
              height: '3px',
              background: 'var(--sandstone)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${(completedCount / totalCount) * 100}%`,
                background: 'var(--gold)',
                borderRadius: '2px',
                transition: 'width 0.5s var(--ease-out)',
              }} />
            </div>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              color: 'var(--espresso)',
              opacity: 0.4,
              display: 'block',
              marginTop: '4px',
            }}>{completedCount} of {totalCount} completed</span>
          </div>

          {/* Items */}
          <div style={{ padding: '8px 0' }}>
            {activeChecklist.items.map(item => {
              const isDone = checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    padding: '14px 28px',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                    background: isDone ? 'rgba(72,101,84,0.03)' : 'transparent',
                    borderLeft: item.doNotRush ? '3px solid var(--amber)' : '3px solid transparent',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = isDone ? 'rgba(72,101,84,0.06)' : 'var(--linen)'}
                  onMouseLeave={e => e.currentTarget.style.background = isDone ? 'rgba(72,101,84,0.03)' : 'transparent'}
                >
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '6px',
                    border: isDone ? '2px solid var(--gold)' : '2px solid var(--sandstone)',
                    background: isDone ? 'var(--gold)' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '1px',
                    transition: 'all 0.2s var(--ease-spring)',
                    transform: isDone ? 'scale(1)' : 'scale(1)',
                  }}>
                    {isDone && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{
                        animation: isDone ? 'checkFill 0.3s var(--ease-spring)' : 'none',
                      }}>
                        <path d="M2 6L5 9L10 3" stroke="var(--forest)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      color: 'var(--espresso)',
                      opacity: isDone ? 0.5 : 0.85,
                      textDecoration: isDone ? 'line-through' : 'none',
                      lineHeight: 1.4,
                    }}>{item.text}</span>
                    {item.doNotRush && !isDone && (
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginLeft: '8px',
                        padding: '1px 8px',
                        borderRadius: 'var(--radius-pill)',
                        background: 'rgba(245,158,11,0.1)',
                      }}>
                        <AlertTriangle size={10} color="var(--amber)" />
                        <span style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '10px',
                          fontWeight: 600,
                          color: 'var(--amber)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}>Take your time</span>
                      </div>
                    )}
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
