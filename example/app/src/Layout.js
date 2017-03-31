import React from 'react';

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: '200vh' }}>
      {children}
    </div>
  );
}
