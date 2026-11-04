import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { CHAPTER_CONTACTS, OFFICIAL_LINKS } from '@/data/siteData';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact details for the ISTD Thrissur Chapter office bearers and the ISTD National Office, New Delhi.',
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
          <h1 className="page-hero-title">Contact Us</h1>
          <p className="page-hero-subtitle">
            Get in touch with the ISTD Thrissur Chapter office bearers for local chapter programmes,
            membership guidance, and academic–industry collaborations.
          </p>
        </div>
      </section>

      {/* Contact Us Layout Grid */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="contact-layout-grid">
            {/* Left Column: Enquiry Form */}
            <ContactForm />

            {/* Right Column: Clearly Separated Thrissur Chapter Contacts & ISTD National Office Contacts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Card 1: Thrissur Chapter Contacts */}
              <div
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid var(--color-border)',
                  borderTop: '4px solid var(--brand-navy)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <span className="section-tag tag-blue">Local Chapter</span>
                <h2
                  style={{
                    fontSize: '1.28rem',
                    color: 'var(--color-ink)',
                    marginBottom: '0.5rem',
                    fontWeight: 800,
                  }}
                >
                  ISTD Thrissur Chapter Contacts
                </h2>
                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--color-muted)',
                    marginBottom: '1.25rem',
                  }}
                >
                  Location: {CHAPTER_CONTACTS.location}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {/* Chairman */}
                  <div
                    style={{
                      padding: '1rem',
                      background: 'var(--color-surface-soft)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.76rem',
                        fontWeight: 800,
                        color: 'var(--brand-blue)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '0.2rem',
                      }}
                    >
                      Chapter Chairman
                    </div>
                    <div
                      style={{
                        fontSize: '1rem',
                        fontWeight: 800,
                        color: 'var(--color-ink)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {CHAPTER_CONTACTS.chairman.name} ({CHAPTER_CONTACTS.chairman.designation})
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-body)' }}>
                      Phone:{' '}
                      <a
                        href={`tel:${CHAPTER_CONTACTS.chairman.phoneHref}`}
                        style={{ fontWeight: 700, color: 'var(--brand-navy)' }}
                      >
                        {CHAPTER_CONTACTS.chairman.phoneDisplay}
                      </a>
                      <br />
                      Email:{' '}
                      <a
                        href={`mailto:${CHAPTER_CONTACTS.chairman.email}`}
                        style={{ fontWeight: 600, color: 'var(--brand-blue)' }}
                      >
                        {CHAPTER_CONTACTS.chairman.email}
                      </a>
                    </div>
                  </div>

                  {/* Treasurer */}
                  <div
                    style={{
                      padding: '1rem',
                      background: 'var(--color-surface-soft)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.76rem',
                        fontWeight: 800,
                        color: 'var(--brand-blue)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '0.2rem',
                      }}
                    >
                      Chapter Treasurer &amp; Chapter Contact
                    </div>
                    <div
                      style={{
                        fontSize: '1rem',
                        fontWeight: 800,
                        color: 'var(--color-ink)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {CHAPTER_CONTACTS.treasurer.name} ({CHAPTER_CONTACTS.treasurer.designation})
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-body)' }}>
                      Phone:{' '}
                      <a
                        href={`tel:${CHAPTER_CONTACTS.treasurer.phoneHref}`}
                        style={{ fontWeight: 700, color: 'var(--brand-navy)' }}
                      >
                        {CHAPTER_CONTACTS.treasurer.phoneDisplay}
                      </a>
                      <br />
                      Email:{' '}
                      <a
                        href={`mailto:${CHAPTER_CONTACTS.treasurer.email}`}
                        style={{ fontWeight: 600, color: 'var(--brand-blue)' }}
                      >
                        {CHAPTER_CONTACTS.treasurer.email}
                      </a>
                    </div>
                  </div>

                  {/* Secretary */}
                  <div
                    style={{
                      padding: '1rem',
                      background: 'var(--color-surface-soft)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.76rem',
                        fontWeight: 800,
                        color: 'var(--brand-blue)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '0.2rem',
                      }}
                    >
                      Chapter Secretary
                    </div>
                    <div
                      style={{
                        fontSize: '1rem',
                        fontWeight: 800,
                        color: 'var(--color-ink)',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {CHAPTER_CONTACTS.secretary.name} ({CHAPTER_CONTACTS.secretary.designation})
                    </div>
                    <div style={{ fontSize: '0.88rem' }}>
                      <a
                        href={CHAPTER_CONTACTS.secretary.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontWeight: 700, color: 'var(--brand-blue)' }}
                      >
                        Connect on LinkedIn ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: ISTD National Office Contacts */}
              <div
                style={{
                  background: 'var(--color-surface-soft)',
                  border: '1.5px solid var(--color-border)',
                  borderTop: '4px solid var(--accent-red)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem',
                }}
              >
                <span className="section-tag tag-red">Parent Body</span>
                <h2
                  style={{
                    fontSize: '1.22rem',
                    color: 'var(--color-ink)',
                    marginBottom: '0.45rem',
                    fontWeight: 800,
                  }}
                >
                  ISTD National Office (New Delhi)
                </h2>
                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--color-body)',
                    lineHeight: 1.6,
                    marginBottom: '1rem',
                  }}
                >
                  For national-level enquiries, central membership processing, and official ISTD
                  National communications:
                </p>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-body)', lineHeight: 1.75 }}>
                  <div>
                    <strong>National Office Email:</strong>{' '}
                    <a
                      href={`mailto:${CHAPTER_CONTACTS.nationalOffice.email}`}
                      style={{ fontWeight: 700, color: 'var(--brand-blue)' }}
                    >
                      {CHAPTER_CONTACTS.nationalOffice.email}
                    </a>
                  </div>
                  <div>
                    <strong>National Website:</strong>{' '}
                    <a
                      href={OFFICIAL_LINKS.istdNationalWeb}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontWeight: 700, color: 'var(--brand-blue)' }}
                    >
                      https://www.istd.in/ ↗
                    </a>
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
