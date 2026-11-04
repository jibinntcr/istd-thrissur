import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section-padding bg-pale-blue" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center' }}>
      <div className="container text-center">
        <div style={{ maxWidth: '580px', margin: '0 auto', background: '#FFFFFF', padding: '3rem 2rem', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--border-light)', boxShadow: 'var(--shadow-md)' }}>
          <span className="section-tag tag-red">404 • Page Not Found</span>
          <h1 className="section-title" style={{ marginTop: '0.5rem' }}>We Couldn&apos;t Find That Page</h1>
          <p style={{ color: 'var(--color-muted)', marginBottom: '1.75rem' }}>
            The page you are looking for may have moved or no longer exists. Explore our flagship programs, inauguration gallery, or return to the homepage.
          </p>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <Link href="/" className="btn btn-primary">
              Return to Homepage
            </Link>
            <Link href="/gallery" className="btn btn-outline-navy">
              View Photo Gallery
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
