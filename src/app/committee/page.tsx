import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PhotoCard } from '@/components/PhotoCard';
import { OFFICE_BEARERS, assetUrl } from '@/data/siteData';
import {
  buildPageMetadata,
  getCommitteeCollectionJsonLd,
} from '@/lib/seoConfig';

export const metadata: Metadata = buildPageMetadata({
  title: 'Managing Committee & Office Bearers',
  description:
    'Meet the managing committee and office bearers of ISTD Thrissur Chapter: Founder & Mentor Prof. (Dr.) Zakkariya K. A., Chairman Tony Chacko, Secretary Jibin N, and Treasurer Sneha Rose George.',
  path: '/committee',
  image: '/images/ISTDTeamTCR/zakkariya-ka.jpg',
  keywords: [
    'ISTD Thrissur Managing Committee',
    'Prof. Dr. Zakkariya K.A Founder Mentor ISTD',
    'Tony Chacko Chairman ISTD Thrissur',
    'Jibin N Secretary ISTD Thrissur',
    'Sneha Rose George Treasurer ISTD Thrissur',
  ],
});

export default function CommitteePage() {
  const collectionJsonLd = getCommitteeCollectionJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      {/* Page Hero Header */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Managing Committee</span>
          </div>
          <h1 className="page-hero-title">Managing Committee</h1>
          <p className="page-hero-subtitle">
            Founder &amp; Mentor, Chairman, Secretary, and Treasurer guiding the
            governance, academic–industry initiatives, and operations of ISTD
            Thrissur Chapter.
          </p>
        </div>
      </section>

      {/* Leadership Team Overview Banner */}
      <section
        className="section-padding-sm bg-white"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="container">
          <div className="split-banner-card">
            <div>
              <span className="section-tag tag-blue">Chapter Governance</span>
              <h2
                style={{
                  fontSize: '1.65rem',
                  marginBottom: '0.75rem',
                  color: 'var(--color-ink)',
                  fontWeight: 800,
                }}
              >
                ISTD Thrissur Chapter Executive Leadership
              </h2>
              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--color-body)',
                  lineHeight: 1.68,
                  marginBottom: '1.25rem',
                  textAlign: 'justify',
                }}
              >
                Formally installed during the Diamond Chapter inauguration on 30
                March 2026 in the presence of ISTD National and Regional
                dignitaries, the executive leadership team coordinates chapter
                programmes, campus student chapters, and professional networking
                across Thrissur and Central Kerala. Select any office bearer
                below to view their dedicated profile page.
              </p>
              <div
                style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
              >
                <a href="#officeBearers" className="btn btn-primary btn-sm">
                  Office Bearers Directory
                </a>
                <Link
                  href="/events/inauguration"
                  className="btn btn-outline-blue btn-sm"
                >
                  Inauguration Report
                </Link>
                <Link href="/contact" className="btn btn-outline-navy btn-sm">
                  Contact Chapter
                </Link>
              </div>
            </div>

            <PhotoCard
              src="/photos/team.jpeg"
              alt="ISTD Thrissur Chapter Leadership with National Dignitaries"
              title="ISTD Thrissur Chapter Leadership with National Dignitaries"
              caption="Founder & Mentor Prof. (Dr.) Zakkariya K. A., Chairman Tony Chacko, Secretary Jibin N, and Treasurer Sneha Rose George with National President Shri. Atul Shah (30 March 2026)."
              category="Managing Committee"
              badgeText="30 March 2026"
              headingText="Chapter Leadership & National Dignitaries"
              style={{ background: '#FFFFFF' }}
            />
          </div>
        </div>
      </section>

      {/* Core 4 Office Bearers Grid */}
      <section className="section-padding bg-white" id="officeBearers">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-red">
              Core Chapter Leadership
            </span>
            <h2 className="section-title">
              Founder, Chairman, Secretary &amp; Treasurer
            </h2>
            <p className="section-subtitle">
              Select any office bearer below to open their dedicated profile
              page.
            </p>
          </div>

          <div className="committee-grid">
            {OFFICE_BEARERS.map((member) => (
              <div
                key={member.id}
                className="committee-card officer-highlight"
                id={member.id}
                style={{
                  justifyContent: 'space-between',
                  padding: '1.85rem 1.5rem',
                }}
              >
                <div style={{ width: '100%' }}>
                  <Link
                    href={`/team/${member.slug}`}
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                  >
                    <div
                      className="committee-avatar-wrap"
                      style={{
                        width: '148px',
                        height: '148px',
                        margin: '0 auto 1.25rem',
                        border: '3px solid var(--accent-blue)',
                      }}
                    >
                      <img
                        src={assetUrl(
                          member.avatar || '/images/logo-circle.png'
                        )}
                        alt={
                          member.avatarAlt ||
                          `${member.name}, ${member.role} of ISTD Thrissur Chapter`
                        }
                        width={148}
                        height={148}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'top center',
                        }}
                      />
                    </div>
                  </Link>

                  <div>
                    <span
                      className={`committee-role-badge ${
                        member.isChairman ? 'badge-chairman' : ''
                      }`}
                    >
                      {member.role}
                    </span>
                    <h3
                      className="committee-name"
                      style={{ fontSize: '1.2rem' }}
                    >
                      <Link
                        href={`/team/${member.slug}`}
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        {member.name}
                      </Link>
                    </h3>
                    <p
                      className="committee-title"
                      style={{
                        marginBottom: '0.75rem',
                        fontWeight: 600,
                        color: '#1E3A8A',
                      }}
                    >
                      {member.slug === 'prof-dr-zakkariya-k-a'
                        ? 'National Vice President, ISTD • ISTD Thrissur Chapter'
                        : member.organisation || 'ISTD Thrissur Chapter'}
                    </p>
                    {member.shortBio && (
                      <p
                        style={{
                          fontSize: '0.84rem',
                          color: 'var(--color-muted)',
                          lineHeight: 1.62,
                          marginBottom: '1.15rem',
                          textAlign: 'justify',
                        }}
                      >
                        {member.shortBio}
                      </p>
                    )}
                  </div>
                </div>

                <div style={{ width: '100%' }}>
                  <Link
                    href={`/team/${member.slug}`}
                    className="btn btn-primary btn-sm"
                    style={{
                      width: '100%',
                      marginBottom: '0.85rem',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                    }}
                  >
                    View Profile
                  </Link>

                  <div className="committee-social">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        title={`Email ${member.name} (${member.role})`}
                        aria-label={`Email ${member.name}`}
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        title={`Call ${member.name} (${member.role})`}
                        aria-label={`Call ${member.name}`}
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${member.name} on LinkedIn`}
                        aria-label={`${member.name} on LinkedIn`}
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding-sm bg-white">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-inner">
              <div>
                <span className="section-tag tag-yellow">
                  Connect With the Committee
                </span>
                <h2>Collaborate With the ISTD Thrissur Chapter</h2>
                <p>
                  To discuss upcoming training programmes, academic
                  collaborations, or membership enquiries, please contact our
                  chapter office bearers.
                </p>
              </div>
              <div className="btn-group">
                <Link href="/contact" className="btn btn-red">
                  Contact Us
                </Link>
                <Link href="/membership" className="btn btn-outline-white">
                  Become a Member
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
