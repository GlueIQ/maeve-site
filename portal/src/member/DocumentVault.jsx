import React from 'react';
import { ViewTransition } from '../components/GoldSpinner';
import { documentCategories } from '../mockData';
import { Scroll, Receipt, Shield, TrendingUp, Home, Handshake, PenLine, Users, Upload, FileText } from 'lucide-react';

const ICON_MAP = {
  Scroll, Receipt, Shield, TrendingUp, Home, Handshake, PenLine, Users,
};

export default function DocumentVault() {
  return (
    <ViewTransition viewKey="documents">
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
        }}>Secure Storage</span>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '28px',
          fontWeight: 300,
          color: 'var(--forest)',
          letterSpacing: '-0.02em',
          marginBottom: '8px',
        }}>Document Vault</h1>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '15px',
          color: 'var(--espresso)',
          opacity: 0.6,
          marginBottom: '32px',
          lineHeight: 1.6,
          maxWidth: '600px',
        }}>
          A single, organized home for every important document. Upload, categorize, and access your critical files whenever you need them.
        </p>

        {/* Category Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
        }}>
          {documentCategories.map(cat => {
            const IconComp = ICON_MAP[cat.icon] || FileText;
            const hasDocuments = cat.docs.length > 0;

            return (
              <div
                key={cat.id}
                style={{
                  background: 'white',
                  borderRadius: 'var(--radius-xl)',
                  padding: '28px 24px',
                  boxShadow: 'var(--shadow-xs)',
                  border: hasDocuments ? '1px solid var(--gold-soft)' : '1px solid rgba(0,26,14,0.06)',
                  cursor: 'pointer',
                  transition: 'all 0.3s var(--ease-out)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '12px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                  e.currentTarget.style.borderColor = 'var(--gold-medium)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
                  e.currentTarget.style.borderColor = hasDocuments ? 'var(--gold-soft)' : 'rgba(0,26,14,0.06)';
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-lg)',
                  background: hasDocuments ? 'var(--gold-soft)' : 'var(--linen)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <IconComp size={22} color={hasDocuments ? 'var(--gold)' : 'var(--espresso)'} style={{ opacity: hasDocuments ? 1 : 0.3 }} />
                </div>

                <div>
                  <div style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--forest)',
                    marginBottom: '4px',
                  }}>{cat.label}</div>

                  {hasDocuments ? (
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      color: 'var(--gold)',
                      fontWeight: 600,
                    }}>{cat.count} documents</span>
                  ) : (
                    <span style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: '12px',
                      color: 'var(--espresso)',
                      opacity: 0.35,
                    }}>Ready when you are</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Upload Area */}
        <div style={{
          marginTop: '32px',
          padding: '32px',
          borderRadius: 'var(--radius-xl)',
          border: '2px dashed var(--sandstone)',
          background: 'rgba(250,249,246,0.5)',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s var(--ease-out)',
        }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--gold)';
            e.currentTarget.style.background = 'var(--gold-soft)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--sandstone)';
            e.currentTarget.style.background = 'rgba(250,249,246,0.5)';
          }}
        >
          <Upload size={24} color="var(--gold)" style={{ marginBottom: '8px' }} />
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--forest)',
            marginBottom: '4px',
          }}>Drop files here or click to upload</div>
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            color: 'var(--espresso)',
            opacity: 0.4,
          }}>PDF, DOC, XLSX, JPG up to 25MB</div>
        </div>

        {/* Document List for populated categories */}
        {documentCategories.filter(c => c.docs.length > 0).map(cat => (
          <div key={cat.id} style={{ marginTop: '32px' }}>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '18px',
              fontWeight: 400,
              color: 'var(--forest)',
              marginBottom: '12px',
            }}>{cat.label}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {cat.docs.map((doc, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'white',
                  border: '1px solid rgba(0,26,14,0.06)',
                  cursor: 'pointer',
                  transition: 'all 0.2s var(--ease-out)',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold-medium)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,26,14,0.06)'}
                >
                  <FileText size={16} color="var(--gold)" />
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    color: 'var(--forest)',
                    flex: 1,
                  }}>{doc.name}</span>
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    color: 'var(--espresso)',
                    opacity: 0.3,
                  }}>{doc.size}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ViewTransition>
  );
}
