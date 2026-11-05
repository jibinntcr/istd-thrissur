import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PhotoCard } from '@/components/PhotoCard';
import { OFFICE_BEARERS, assetUrl } from '@/data/siteData';
import { buildPageMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = buildPageMetadata({
  title: 'Managing Committee & Executive Leadership Profiles',
  description:
    'Meet the core leadership of the ISTD Thrissur Chapter: Founder & Mentor Prof. (Dr.) Zakkariya K. A., Chairman / President Shri. Tony Chacko, Secretary Ms. Sneha Rose George, and Treasurer Mr. Jibin N.',
  path: '/committee',
  image: '/images/ISTDTeamTCR/zakkariya-ka.jpg',
  keywords: [
    'ISTD Thrissur Managing Committee',
    'Prof. Dr. Zakkariya K.A Founder Mentor ISTD',
    'Tony Chacko Chairman ISTD Thrissur',
    'Sneha Rose George Secretary ISTD Thrissur',
    'Jibin N Treasurer ISTD Thrissur',
  ],
});

export default function CommitteePage() {
  return (
    <>
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
            Founder &amp; Mentor, Chairman / President, Hon. Secretary, and
            Treasurer guiding the governance, academic–industry initiatives, and
            operations of the ISTD Thrissur Chapter.
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
                }}
              >
                Formally installed during the Diamond Chapter inauguration on 30
                March 2026 in the presence of ISTD National and Regional
                dignitaries, the executive leadership team spearheads chapter
                programmes, campus student chapters, and professional networking
                across Thrissur and Central Kerala. Click on any office bearer
                below to view their complete individual profile.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href="#officeBearers" className="btn btn-primary btn-sm">
                  Office Bearers Directory
                </a>
                <a href="#detailedProfiles" className="btn btn-outline-navy btn-sm">
                  Detailed Leadership Profiles
                </a>
                <Link
                  href="/events/inauguration"
                  className="btn btn-outline-blue btn-sm"
                >
                  Inauguration Report
                </Link>
              </div>
            </div>

            <PhotoCard
              src="/photos/team.jpeg"
              alt="ISTD Thrissur Chapter Leadership with National Dignitaries"
              title="ISTD Thrissur Chapter Leadership with National Dignitaries"
              caption="Founder & Mentor Prof. (Dr.) Zakkariya K. A., Chairman Shri. Tony Chacko, Secretary Ms. Sneha Rose George, and Treasurer Mr. Jibin N with National President Shri. Atul Shah (30 March 2026)."
              category="Managing Committee"
              badgeText="30 March 2026"
              headingText="Chapter Leadership & National Dignitaries"
              style={{ background: '#FFFFFF' }}
            />
          </div>
        </div>
      </section>

      {/* 1. Core 4 Office Bearers Grid */}
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
              Select any leadership card below to open their dedicated
              executive profile page with full biography, academic credentials,
              and ISTD milestones.
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
                    href={`/committee/${member.slug}`}
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
                        alt={`${member.name} - ${member.role}, ISTD Thrissur Chapter`}
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
                    <h3 className="committee-name" style={{ fontSize: '1.2rem' }}>
                      <Link
                        href={`/committee/${member.slug}`}
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
                      {member.title}
                    </p>
                    {member.shortBio && (
                      <p
                        style={{
                          fontSize: '0.84rem',
                          color: 'var(--color-muted)',
                          lineHeight: 1.55,
                          marginBottom: '1.15rem',
                        }}
                      >
                        {member.shortBio}
                      </p>
                    )}
                  </div>
                </div>

                <div style={{ width: '100%' }}>
                  <Link
                    href={`/committee/${member.slug}`}
                    className="btn btn-primary btn-sm"
                    style={{
                      width: '100%',
                      marginBottom: '0.85rem',
                      fontSize: '0.83rem',
                      fontWeight: 700,
                    }}
                  >
                    View Individual Profile &rarr;
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

      {/* 2. Detailed Individual Leadership Profiles Section */}
      <section className="section-padding bg-pale-blue" id="detailedProfiles">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-blue">
              Individual Leadership Profiles
            </span>
            <h2 className="section-title">
              Executive Profiles of Our Office Bearers
            </h2>
            <p className="section-subtitle">
              Detailed biographical profiles, academic credentials, and ISTD
              leadership roles of the Founder &amp; Mentor, Chairman,
              Secretary, and Treasurer.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '2.25rem' }}>
            {OFFICE_BEARERS.map((member) => (
              <article
                key={member.slug}
                id={`profile-${member.slug}`}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '22px',
                  border: '1.5px solid #DBEAFE',
                  boxShadow: '0 16px 40px rgba(15, 29, 58, 0.06)',
                  overflow: 'hidden',
                }}
              >
                {/* Top Dark Header Strip */}
                <div
                  style={{
                    background:
                      'linear-gradient(135deg, #071226 0%, #0F2347 60%, #17356D 100%)',
                    color: '#FFFFFF',
                    padding: 'clamp(1.25rem, 3vw, 1.75rem) clamp(1.25rem, 3.5vw, 2.25rem)',
                    borderBottom: '3px solid #F59E0B',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '0.24rem 0.78rem',
                        borderRadius: '999px',
                        background: '#FEF3C7',
                        color: '#92400E',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.07em',
                        marginBottom: '0.4rem',
                      }}
                    >
                      {member.role} • ISTD Thrissur Chapter
                    </span>
                    <h3
                      style={{
                        color: '#FFFFFF',
                        fontSize: 'clamp(1.35rem, 2.4vw, 1.75rem)',
                        fontWeight: 900,
                        margin: 0,
                      }}
                    >
                      <Link
                        href={`/committee/${member.slug}`}
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        {member.name}
                      </Link>
                    </h3>
                    <p
                      style={{
                        color: '#FDE68A',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        margin: '0.25rem 0 0',
                      }}
                    >
                      {member.title}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                    <Link
                      href={`/committee/${member.slug}`}
                      className="btn btn-red btn-sm"
                    >
                      Open Dedicated Profile Page &rarr;
                    </Link>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-white btn-sm"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                        }}
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
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Body Content */}
                <div
                  style={{
                    padding: 'clamp(1.35rem, 3.5vw, 2.25rem)',
                    display: 'grid',
                    gridTemplateColumns:
                      'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                    gap: '2rem',
                    alignItems: 'start',
                  }}
                >
                  {/* Left: Portrait(s) & Credentials */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        marginBottom: '1.25rem',
                      }}
                    >
                      <Link
                        href={`/committee/${member.slug}`}
                        style={{
                          display: 'block',
                          flex: '1 1 180px',
                          maxWidth: member.secondaryAvatar ? '210px' : '260px',
                        }}
                      >
                        <img
                          src={assetUrl(
                            member.avatar || '/images/logo-circle.png'
                          )}
                          alt={member.name}
                          style={{
                            width: '100%',
                            aspectRatio: '3 / 4',
                            objectFit: 'cover',
                            objectPosition: 'top center',
                            borderRadius: '16px',
                            border: '2px solid #BFDBFE',
                            boxShadow: '0 12px 28px rgba(15, 23, 42, 0.1)',
                          }}
                        />
                      </Link>

                      {member.secondaryAvatar && (
                        <Link
                          href={`/committee/${member.slug}`}
                          style={{
                            display: 'block',
                            flex: '1 1 180px',
                            maxWidth: '210px',
                          }}
                        >
                          <img
                            src={assetUrl(member.secondaryAvatar)}
                            alt={`${member.name} — Portrait 2`}
                            style={{
                              width: '100%',
                              aspectRatio: '3 / 4',
                              objectFit: 'cover',
                              objectPosition: 'top center',
                              borderRadius: '16px',
                              border: '2px solid #FDE68A',
                              boxShadow: '0 12px 28px rgba(15, 23, 42, 0.1)',
                            }}
                          />
                        </Link>
                      )}
                    </div>

                    {member.educationAndCredentials && (
                      <div
                        style={{
                          background: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          borderRadius: '14px',
                          padding: '1.1rem 1.25rem',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '0.73rem',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.07em',
                            color: '#1E40AF',
                            marginBottom: '0.55rem',
                          }}
                        >
                          Academic Qualifications &amp; Honours
                        </div>
                        <ul
                          style={{
                            margin: 0,
                            paddingLeft: '1.15rem',
                            color: '#334155',
                            fontSize: '0.86rem',
                            lineHeight: 1.6,
                            display: 'grid',
                            gap: '0.35rem',
                          }}
                        >
                          {member.educationAndCredentials.map((cred) => (
                            <li key={cred}>{cred}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Right: Biography & Key Highlights */}
                  <div style={{ gridColumn: 'span 1' }}>
                    <h4
                      style={{
                        fontSize: '1.08rem',
                        fontWeight: 800,
                        color: '#0F172A',
                        marginBottom: '0.75rem',
                      }}
                    >
                      Biographical Overview
                    </h4>
                    {(member.biography || []).map((para, index) => (
                      <p
                        key={index}
                        style={{
                          color: '#334155',
                          fontSize: '0.94rem',
                          lineHeight: 1.72,
                          marginBottom: '0.9rem',
                        }}
                      >
                        {para}
                      </p>
                    ))}

                    {member.careerHighlights && (
                      <div
                        style={{
                          background: '#EFF6FF',
                          border: '1px solid #BFDBFE',
                          borderRadius: '14px',
                          padding: '1.15rem 1.35rem',
                          marginTop: '1rem',
                          marginBottom: '1.25rem',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '0.74rem',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.07em',
                            color: '#1D4ED8',
                            marginBottom: '0.55rem',
                          }}
                        >
                          Key Leadership &amp; Institutional Highlights
                        </div>
                        <ul
                          style={{
                            margin: 0,
                            paddingLeft: '1.15rem',
                            color: '#1E293B',
                            fontSize: '0.88rem',
                            lineHeight: 1.62,
                            display: 'grid',
                            gap: '0.4rem',
                          }}
                        >
                          {member.careerHighlights.slice(0, 5).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Link
                      href={`/committee/${member.slug}`}
                      className="btn btn-outline-navy btn-sm"
                    >
                      Read Full Profile of {member.name} &rarr;
                    </Link>
                  </div>
                </div>
              </article>
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
