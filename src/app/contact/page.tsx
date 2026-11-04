import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PhotoCard } from '@/components/PhotoCard';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact ISTD Thrissur Chapter Secretariat for membership enquiries, training programs, admissions, and institutional collaborations.',
};

export default function ContactPage() {
  return (
    <>
      {/* Page Hero Header */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Contact Us</span>
          </div>
          <h1 className="page-hero-title">Contact ISTD Thrissur Chapter</h1>
          <p className="page-hero-subtitle">
            Get in touch with the Chapter Secretariat for enquiries, programs, memberships, and
            collaborations.
          </p>
        </div>
      </section>

      {/* Contact Us & Lead Form Grid */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="contact-layout-grid">
            {/* Lead Generation Form */}
            <ContactForm />

            {/* Contact Information & Chapter Photo Panel */}
            <div>
              <div
                style={{
                  backgroundColor: 'var(--bg-pale-blue)',
                  border: '1.5px solid var(--border-light)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '1.5rem',
                  marginBottom: '2rem',
                  textAlign: 'center',
                }}
              >
                <PhotoCard
                  src="/photos/istd.jpeg"
                  alt="ISTD Thrissur Chapter Leadership & Secretariat Team"
                  title="ISTD Thrissur Chapter Secretariat & Leadership Team"
                  caption="Chapter Office Bearers, Managing Committee, and National Dignitaries at the ISTD Diamond Chapter Inauguration in Thrissur."
                  category="Team & Secretariat"
                  badgeText="Click to Expand Photo"
                  headingText="ISTD Thrissur Leadership & Secretariat"
                  style={{ marginBottom: '1.25rem' }}
                  imgStyle={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }}
                />
                <h3
                  style={{
                    fontSize: '1.2rem',
                    color: 'var(--color-ink)',
                    marginBottom: '0.25rem',
                    fontWeight: 700,
                  }}
                >
                  Secretariat Helpdesk
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0 }}>
                  Assisting with admissions, registrations, and chapter activities.
                </p>
              </div>

              {/* Direct Phone / Email Cards */}
              <div
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid var(--border-light)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <h4
                  style={{
                    fontSize: '1.1rem',
                    color: 'var(--color-ink)',
                    marginBottom: '1.25rem',
                    fontWeight: 700,
                  }}
                >
                  Direct Contact Channels
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        background: 'var(--bg-pale-blue)',
                        border: '1px solid var(--border-blue)',
                        color: 'var(--accent-blue)',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: 'var(--color-muted)',
                          textTransform: 'uppercase',
                        }}
                      >
                        Chairman (Tony Chacko)
                      </div>
                      <a
                        href="tel:+919846101034"
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: 'var(--color-ink)',
                        }}
                      >
                        +91 9846101034
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        background: 'var(--bg-pale-blue)',
                        border: '1px solid var(--border-blue)',
                        color: 'var(--accent-blue)',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: 'var(--color-muted)',
                          textTransform: 'uppercase',
                        }}
                      >
                        Treasurer (Jibin N)
                      </div>
                      <a
                        href="tel:+919496839168"
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: 'var(--color-ink)',
                        }}
                      >
                        +91 9496839168
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        background: 'var(--bg-pale-blue)',
                        border: '1px solid var(--border-blue)',
                        color: 'var(--accent-blue)',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: 'var(--color-muted)',
                          textTransform: 'uppercase',
                        }}
                      >
                        Official Email
                      </div>
                      <a
                        href="mailto:info@istd.in"
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: 'var(--color-ink)',
                        }}
                      >
                        info@istd.in
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
