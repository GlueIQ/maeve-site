import React from 'react';
import { ViewTransition } from '../components/GoldSpinner';
import { MessageSquare, Heart, Users } from 'lucide-react';

const THREADS = [
  {
    id: 1,
    author: 'Catherine P.',
    initials: 'CP',
    time: '2 hours ago',
    title: 'How do you talk to family about changing the investment strategy?',
    preview: 'I inherited a portfolio that was very concentrated in tech stocks. My family expects me to keep it exactly as-is, but my advisor recommends diversifying...',
    replies: 12,
    likes: 8,
    category: 'Inheritance',
  },
  {
    id: 2,
    author: 'Anonymous',
    initials: '✦',
    time: '5 hours ago',
    title: 'Finding your own financial identity after loss',
    preview: "For 30 years, my husband managed everything. Now I'm learning from scratch — not because I can't, but because I never had to. Has anyone else felt this mix of grief and unexpected empowerment?",
    replies: 24,
    likes: 31,
    category: 'Spousal Loss',
  },
  {
    id: 3,
    author: 'Elena V.',
    initials: 'EV',
    time: '1 day ago',
    title: 'Caregiver burnout and financial decision fatigue',
    preview: "Between managing my mother's care and trying to keep up with the financial decisions that come with it, I'm completely drained. How do you all manage the mental load?",
    replies: 9,
    likes: 15,
    category: 'Caregiving',
  },
  {
    id: 4,
    author: 'Margaret O.',
    initials: 'MO',
    time: '2 days ago',
    title: 'The gift of a "decision-free" period',
    preview: "My advisor reminded me that I don't have to make any major decisions for six months. Giving myself permission to NOT decide has been the most empowering choice I've made.",
    replies: 18,
    likes: 27,
    category: 'General',
  },
];

const CAT_COLORS = {
  Inheritance: { bg: 'var(--gold-soft)', text: 'var(--gold)' },
  'Spousal Loss': { bg: 'rgba(27,73,101,0.1)', text: 'var(--teal)' },
  Caregiving: { bg: 'rgba(194,120,91,0.1)', text: 'var(--terracotta)' },
  General: { bg: 'var(--sage)', text: 'var(--forest)' },
};

export default function CommunityFeed() {
  return (
    <ViewTransition viewKey="community">
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
        }}>Community</span>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '28px',
          fontWeight: 300,
          color: 'var(--forest)',
          letterSpacing: '-0.02em',
          marginBottom: '8px',
        }}>The Circle</h1>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '15px',
          color: 'var(--espresso)',
          opacity: 0.6,
          marginBottom: '32px',
          lineHeight: 1.6,
        }}>
          A private space for women navigating transition. Share experiences, ask questions, and find solidarity.
        </p>

        {/* Threads */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {THREADS.map(thread => {
            const catStyle = CAT_COLORS[thread.category] || CAT_COLORS.General;
            return (
              <div
                key={thread.id}
                style={{
                  background: 'white',
                  borderRadius: 'var(--radius-xl)',
                  padding: '24px 28px',
                  boxShadow: 'var(--shadow-xs)',
                  border: '1px solid rgba(0,26,14,0.06)',
                  cursor: 'pointer',
                  transition: 'all 0.2s var(--ease-out)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--gold-medium)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,26,14,0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-full)',
                    background: thread.initials === '✦' ? 'var(--gold-soft)' : 'var(--forest)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: thread.initials === '✦' ? 'var(--gold)' : 'var(--linen)',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '13px',
                    fontWeight: 600,
                    flexShrink: 0,
                  }}>{thread.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--forest)',
                      }}>{thread.author}</span>
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '12px',
                        color: 'var(--espresso)',
                        opacity: 0.3,
                      }}>· {thread.time}</span>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-pill)',
                        background: catStyle.bg,
                        color: catStyle.text,
                        fontSize: '10px',
                        fontWeight: 600,
                        fontFamily: 'var(--font-sans)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}>{thread.category}</span>
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '17px',
                      fontWeight: 400,
                      color: 'var(--forest)',
                      marginBottom: '6px',
                      lineHeight: 1.3,
                    }}>{thread.title}</h3>
                    <p style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      color: 'var(--espresso)',
                      opacity: 0.6,
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>{thread.preview}</p>
                    <div style={{
                      display: 'flex',
                      gap: '16px',
                      marginTop: '12px',
                    }}>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '12px',
                        color: 'var(--espresso)',
                        opacity: 0.4,
                      }}>
                        <MessageSquare size={14} /> {thread.replies} replies
                      </span>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '12px',
                        color: 'var(--espresso)',
                        opacity: 0.4,
                      }}>
                        <Heart size={14} /> {thread.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ViewTransition>
  );
}
