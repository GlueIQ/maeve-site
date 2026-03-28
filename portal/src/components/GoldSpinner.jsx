import React from 'react';

export function GoldSpinner({ text = 'Loading' }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      padding: '48px',
    }}>
      <div className="gold-spinner" style={{ fontSize: '24px', color: 'var(--gold)' }}>
        <span>✦</span><span>✦</span><span>✦</span>
      </div>
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        color: 'var(--espresso)',
        opacity: 0.5,
        fontSize: '14px',
      }}>{text}</p>
    </div>
  );
}

export function ViewTransition({ children, viewKey }) {
  return (
    <div key={viewKey} className="view-enter">
      {children}
    </div>
  );
}
