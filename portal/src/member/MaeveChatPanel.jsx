import React, { useState, useRef, useEffect } from 'react';
import { chatHistory, maeveSystemPrompt } from '../mockData';
import { X, Send, Sparkles } from 'lucide-react';

export default function MaeveChatPanel({ onClose }) {
  const [messages, setMessages] = useState(chatHistory);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulated Maeve response (mock — replace with Claude API when key is provided)
    setTimeout(() => {
      const responses = [
        "That's a really important question, and I'm glad you're sitting with it rather than rushing to an answer. What I'm noticing is that you're already thinking about this more thoughtfully than most people in your situation. Let's unpack that a bit — what specifically is driving that concern?",
        "I hear the weight in that question. Here's what I've seen: the most successful transitions happen when women give themselves permission to make decisions that feel right to *them*, even when those decisions look different from what others expect. What would it look like to trust your own instincts here?",
        "You know, that tension you're describing — between honoring the past and building your own future — is one of the most common and most important aspects of inheritance. It's not either/or. The question isn't whether to change things, but *how* to change them in a way that feels aligned with your values.",
      ];
      const maevMsg = {
        id: (Date.now() + 1).toString(),
        role: 'maeve',
        content: responses[Math.floor(Math.random() * responses.length)],
      };
      setMessages(prev => [...prev, maevMsg]);
      setIsTyping(false);
    }, 2000 + Math.random() * 1500);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 'var(--nav-height)',
      right: 0,
      bottom: 0,
      width: 'var(--chat-width)',
      background: 'white',
      borderLeft: '1px solid rgba(0,26,14,0.08)',
      boxShadow: 'var(--shadow-drawer)',
      zIndex: 35,
      display: 'flex',
      flexDirection: 'column',
      animation: 'slideInRight 0.35s var(--ease-out) forwards',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid rgba(0,26,14,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--gold-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Sparkles size={16} color="var(--gold)" />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '16px',
              fontWeight: 400,
              color: 'var(--forest)',
            }}>Maeve</div>
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              color: 'var(--gold)',
              fontWeight: 500,
            }}>Your transition companion</div>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: 'var(--linen)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          <X size={16} color="var(--espresso)" />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {messages.map(msg => (
          <div key={msg.id} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
          }}>
            <div style={{
              maxWidth: '85%',
              padding: '14px 18px',
              borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: msg.role === 'user' ? 'var(--forest)' : 'var(--cream)',
              color: msg.role === 'user' ? 'var(--linen)' : 'var(--espresso)',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              lineHeight: 1.6,
              border: msg.role === 'maeve' ? '1px solid var(--gold-soft)' : 'none',
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '14px 20px',
              borderRadius: '16px 16px 16px 4px',
              background: 'var(--cream)',
              border: '1px solid var(--gold-soft)',
            }}>
              <div className="gold-spinner" style={{ fontSize: '14px', color: 'var(--gold)' }}>
                <span>✦</span><span>✦</span><span>✦</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{
        padding: '16px 24px',
        borderTop: '1px solid rgba(0,26,14,0.06)',
        background: 'var(--linen)',
      }}>
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          style={{
            display: 'flex',
            gap: '8px',
          }}
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask Maeve anything..."
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: 'var(--radius-lg)',
              border: '1.5px solid var(--sandstone)',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              color: 'var(--espresso)',
              outline: 'none',
              background: 'white',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--gold)'}
            onBlur={e => e.target.style.borderColor = 'var(--sandstone)'}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-lg)',
              border: 'none',
              background: input.trim() ? 'var(--forest)' : 'var(--sandstone)',
              color: input.trim() ? 'var(--gold)' : 'var(--espresso)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: input.trim() ? 'pointer' : 'default',
              transition: 'all 0.2s var(--ease-out)',
            }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
