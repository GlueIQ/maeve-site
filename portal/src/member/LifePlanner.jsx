import React from 'react';
import { ViewTransition } from '../components/GoldSpinner';
import { calendarEvents, recommendedActions } from '../mockData';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const TYPE_COLORS = {
  legal: 'var(--teal)',
  financial: 'var(--gold)',
  community: 'var(--sage)',
  tax: 'var(--terracotta)',
  advisory: 'var(--forest)',
  family: 'var(--blush)',
  personal: 'var(--sandstone)',
};

export default function LifePlanner() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <ViewTransition viewKey="planner">
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
        }}>Planning</span>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '28px',
          fontWeight: 300,
          color: 'var(--forest)',
          letterSpacing: '-0.02em',
          marginBottom: '32px',
        }}>Life Planner</h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '24px',
        }}>
          {/* Calendar */}
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-xl)',
            padding: '28px',
            boxShadow: 'var(--shadow-xs)',
            border: '1px solid rgba(0,26,14,0.06)',
          }}>
            {/* Month Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
            }}>
              <button style={{
                width: '32px', height: '32px', borderRadius: 'var(--radius-full)',
                border: '1px solid var(--sandstone)', background: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <ChevronLeft size={16} color="var(--forest)" />
              </button>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '20px',
                fontWeight: 400,
                color: 'var(--forest)',
              }}>{monthName}</h2>
              <button style={{
                width: '32px', height: '32px', borderRadius: 'var(--radius-full)',
                border: '1px solid var(--sandstone)', background: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <ChevronRight size={16} color="var(--forest)" />
              </button>
            </div>

            {/* Day Headers */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '4px',
              marginBottom: '8px',
            }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} style={{
                  textAlign: 'center',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--espresso)',
                  opacity: 0.3,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  padding: '8px 0',
                }}>{d}</div>
              ))}
            </div>

            {/* Days Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '4px',
            }}>
              {days.map((day, i) => {
                if (!day) return <div key={`empty-${i}`} />;
                const event = calendarEvents.find(e => e.date === day);
                const isToday = day === today;

                return (
                  <div
                    key={day}
                    style={{
                      aspectRatio: '1',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 'var(--radius-md)',
                      cursor: event ? 'pointer' : 'default',
                      background: isToday ? 'var(--gold-soft)' : event ? 'var(--linen)' : 'transparent',
                      border: isToday ? '2px solid var(--gold)' : '2px solid transparent',
                      transition: 'all 0.2s var(--ease-out)',
                      position: 'relative',
                    }}
                    onMouseEnter={e => event && (e.currentTarget.style.background = 'var(--gold-soft)')}
                    onMouseLeave={e => event && (e.currentTarget.style.background = isToday ? 'var(--gold-soft)' : 'var(--linen)')}
                    title={event?.title}
                  >
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      fontWeight: isToday ? 700 : 400,
                      color: isToday ? 'var(--gold)' : 'var(--forest)',
                    }}>{day}</span>
                    {event && (
                      <div style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: TYPE_COLORS[event.type] || 'var(--gold)',
                        marginTop: '4px',
                      }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Sidebar — Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              padding: '24px',
              boxShadow: 'var(--shadow-xs)',
              border: '1px solid rgba(0,26,14,0.06)',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '18px',
                fontWeight: 400,
                color: 'var(--forest)',
                marginBottom: '16px',
              }}>This Month</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {calendarEvents.map((event, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--linen)',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-soft)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--linen)'}
                  >
                    <div style={{
                      width: '4px',
                      height: '100%',
                      minHeight: '32px',
                      borderRadius: '2px',
                      background: TYPE_COLORS[event.type] || 'var(--gold)',
                      flexShrink: 0,
                    }} />
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: 'var(--forest)',
                      }}>{event.title}</div>
                      <div style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '11px',
                        color: 'var(--espresso)',
                        opacity: 0.4,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginTop: '2px',
                      }}>
                        <Clock size={10} />
                        {monthName.split(' ')[0]} {event.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}
