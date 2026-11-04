import React from 'react';

export default function Loading() {
  return (
    <div className="page-loading-wrap" role="status" aria-live="polite">
      <div className="page-loading-card">
        <div className="page-loading-spinner" />
        <p className="page-loading-text">Loading ISTD Thrissur Chapter...</p>
      </div>
    </div>
  );
}
