import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { CHAPTER_CONTACTS, OFFICIAL_LINKS } from '@/data/siteData';
import { buildPageMetadata, getContactPageJsonLd } from '@/lib/seoConfig';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact Us — Chapter Office Bearers & Enquiries',
  description:
    'Contact the ISTD Trichur Chapter office bearers (Chairman Tony Chacko, Secretary Sneha Rose George, Treasurer Jibin N) and the ISTD National Office, New Delhi.',
  path: '/contact',
  keywords: [
    'Contact ISTD Trichur Chapter',
    'ISTD Trichur Phone Number',
    'ISTD Trichur Email',
  ],
});

export default function ContactPage() {
  const contactJsonLd = getContactPageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
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
            Get in touch with the ISTD Trichur Chapter office bearers for local chapter programmes,
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

            {/* Right Column: Clearly Separated Trichur Chapter Contacts & ISTD National Office Contacts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Card 1: Trichur Chapter Contacts */}
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
                  ISTD Trichur Chapter Contacts
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
                        aria-label={`${CHAPTER_CONTACTS.secretary.name} on LinkedIn`}
                        title={`${CHAPTER_CONTACTS.secretary.name} on LinkedIn`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          fontWeight: 700,
                          color: '#0A66C2',
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                        <span>LinkedIn</span>
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
                      Email:{' '}
                      <a
                        href={`mailto:${CHAPTER_CONTACTS.treasurer.email}`}
                        style={{ fontWeight: 600, color: 'var(--brand-blue)' }}
                      >
                        {CHAPTER_CONTACTS.treasurer.email}
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
