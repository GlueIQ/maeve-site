import React, { useState } from 'react';
import { ViewTransition } from '../components/GoldSpinner';
import { advisorClients, advisorProfile, outreachTemplates } from '../mockData';
import { Mail, MessageSquare, PenTool, Sparkles } from 'lucide-react';

const CHANNELS = [
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'text', label: 'Text', icon: MessageSquare },
  { id: 'handwritten', label: 'Handwritten', icon: PenTool },
];

export default function OutreachCenter() {
  const [selectedClient, setSelectedClient] = useState(advisorClients[0]);
  const [channel, setChannel] = useState('email');
  const [messageContent, setMessageContent] = useState('');

  const template = outreachTemplates[channel];

  const fillTemplate = (text) => {
    return text
      .replace(/\{client_name\}/g, selectedClient.name.split(' ')[0])
      .replace(/\{transition_type\}/g, selectedClient.transitionLabel.replace(/[↓♡⟳⇄] /, '').toLowerCase())
      .replace(/\{advisor_name\}/g, advisorProfile.name.split(',')[0])
      .replace(/\{personalized_note\}/g, 'I reviewed your recent assessment results, and I want you to know — your instincts about diversification are sound. We can discuss timing at your pace.');
  };

  const currentText = messageContent || fillTemplate(template.body || template.subject + '\n\n' + template.body);

  return (
    <ViewTransition viewKey="outreach">
      <div>
        <span style={{
          fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '2px',
          textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600,
          display: 'block', marginBottom: '8px',
        }}>Communication</span>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 300,
          color: 'var(--forest)', letterSpacing: '-0.02em', marginBottom: '24px',
        }}>Outreach Center</h1>

        <div style={{
          display: 'grid', gridTemplateColumns: '220px 1fr 280px',
          gap: '20px',
        }}>
          {/* Client List */}
          <div style={{
            background: 'white', borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-xs)', border: '1px solid rgba(0,26,14,0.06)',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '16px 20px', borderBottom: '1px solid rgba(0,26,14,0.06)',
            }}>
              <span style={{
                fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                color: 'var(--espresso)', opacity: 0.4,
              }}>Select Client</span>
            </div>
            {advisorClients.map(client => (
              <div
                key={client.id}
                onClick={() => { setSelectedClient(client); setMessageContent(''); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '12px 20px', cursor: 'pointer',
                  background: selectedClient?.id === client.id ? 'var(--gold-soft)' : 'transparent',
                  borderLeft: selectedClient?.id === client.id ? '3px solid var(--gold)' : '3px solid transparent',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{
                  width: '28px', height: '28px', borderRadius: 'var(--radius-full)',
                  background: 'var(--forest)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: 'var(--linen)',
                  fontFamily: 'var(--font-serif)', fontSize: '10px', fontWeight: 600,
                }}>{client.initials}</div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-sans)', fontSize: '13px',
                    fontWeight: 500, color: 'var(--forest)',
                  }}>{client.name}</div>
                  <div style={{
                    fontFamily: 'var(--font-sans)', fontSize: '11px',
                    color: 'var(--espresso)', opacity: 0.4,
                  }}>{client.lastContact}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Editor */}
          <div style={{
            background: 'white', borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-xs)', border: '1px solid rgba(0,26,14,0.06)',
            display: 'flex', flexDirection: 'column',
          }}>
            {/* Channel Tabs */}
            <div style={{
              display: 'flex', borderBottom: '1px solid rgba(0,26,14,0.06)',
              padding: '0 20px',
            }}>
              {CHANNELS.map(ch => (
                <button
                  key={ch.id}
                  onClick={() => { setChannel(ch.id); setMessageContent(''); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '14px 16px', fontFamily: 'var(--font-sans)',
                    fontSize: '13px', fontWeight: channel === ch.id ? 600 : 400,
                    color: channel === ch.id ? 'var(--gold)' : 'var(--espresso)',
                    background: 'none', border: 'none',
                    borderBottom: channel === ch.id ? '2px solid var(--gold)' : '2px solid transparent',
                    cursor: 'pointer', transition: 'all 0.2s',
                    opacity: channel === ch.id ? 1 : 0.5,
                  }}
                >
                  <ch.icon size={14} /> {ch.label}
                </button>
              ))}
            </div>

            {/* Editor */}
            <div style={{ flex: 1, padding: '20px' }}>
              {channel === 'email' && template.subject && (
                <input
                  defaultValue={fillTemplate(template.subject)}
                  style={{
                    width: '100%', padding: '10px 14px', marginBottom: '12px',
                    borderRadius: 'var(--radius-md)', border: '1.5px solid var(--sandstone)',
                    fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 500,
                    color: 'var(--forest)', outline: 'none',
                  }}
                />
              )}
              <textarea
                value={currentText}
                onChange={e => setMessageContent(e.target.value)}
                style={{
                  width: '100%', height: channel === 'text' ? '120px' : '300px',
                  padding: '14px', borderRadius: 'var(--radius-lg)',
                  border: '1.5px solid var(--sandstone)', background: 'var(--linen)',
                  fontFamily: 'var(--font-sans)', fontSize: '14px',
                  color: 'var(--espresso)', resize: 'vertical', outline: 'none',
                  lineHeight: 1.6,
                }}
              />
            </div>

            {/* Actions */}
            <div style={{
              padding: '16px 20px', borderTop: '1px solid rgba(0,26,14,0.06)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '10px 20px', borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--gold-medium)', background: 'var(--gold-soft)',
                color: 'var(--gold)', fontFamily: 'var(--font-sans)',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.2s var(--ease-out)',
              }}>
                <Sparkles size={14} /> Personalize with Maeve
              </button>
              <button style={{
                padding: '10px 24px', borderRadius: 'var(--radius-md)',
                background: 'var(--forest)', color: 'var(--linen)',
                fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600,
                border: 'none', cursor: 'pointer',
              }}>
                Send {channel === 'email' ? 'Email' : channel === 'text' ? 'Text' : 'Letter'}
              </button>
            </div>
          </div>

          {/* Maeve Talking Points */}
          <div style={{
            background: 'var(--cream)', borderRadius: 'var(--radius-xl)',
            padding: '24px', border: '1px solid var(--gold-soft)',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px',
            }}>
              <Sparkles size={16} color="var(--gold)" />
              <span style={{
                fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
                letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--gold)',
              }}>Maeve Talking Points</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                fontSize: '14px', color: 'var(--forest)', lineHeight: 1.6,
                padding: '12px', borderRadius: 'var(--radius-md)',
                background: 'white', border: '1px solid var(--gold-soft)',
              }}>
                "{selectedClient?.name.split(' ')[0]} recently completed their self-assessment. Decision confidence scored 39/100 — this is an opportunity to reinforce their trust in the process."
              </div>
              <div style={{
                fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                fontSize: '14px', color: 'var(--forest)', lineHeight: 1.6,
                padding: '12px', borderRadius: 'var(--radius-md)',
                background: 'white', border: '1px solid var(--gold-soft)',
              }}>
                "Their notes indicate tension around family expectations vs. personal investment values. Consider framing changes as 'evolution' rather than 'departure.'"
              </div>
              <div style={{
                fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                fontSize: '14px', color: 'var(--forest)', lineHeight: 1.6,
                padding: '12px', borderRadius: 'var(--radius-md)',
                background: 'white', border: '1px solid var(--gold-soft)',
              }}>
                "Last contact {selectedClient?.lastContact}. {selectedClient?.progress}% through Phase {selectedClient?.phase}."
              </div>
            </div>
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}
