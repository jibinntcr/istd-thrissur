import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PhotoCard } from '@/components/PhotoCard';
import {
  OFFICE_BEARERS,
  COMMITTEE_MEMBERS,
  CHAPTER_CORE_CONTRIBUTORS,
  assetUrl,
} from '@/data/siteData';

export const metadata: Metadata = {
  title: 'Managing Committee 2024–2026',
  description:
    'Meet the Managing Committee of ISTD Thrissur Chapter (2024-2026) - Dedicated leaders, corporate trainers, and educators guiding L&D in Central Kerala.',
};

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
          <h1 className="page-hero-title">Managing Committee 2024–2026</h1>
          <p className="page-hero-subtitle">
            Meet the dedicated leaders and professionals driving the ISTD Thrissur Chapter forward.
          </p>
        </div>
      </section>

      {/* Leadership Team Banner Showcase */}
      <section
        className="section-padding-sm bg-white"
        style={{ borderBottom: '1.5px solid var(--border-light)' }}
      >
        <div className="container">
          <div className="split-banner-card">
            <div>
              <span className="section-tag tag-blue">Chapter Governance</span>
              <h2
                style={{
                  fontSize: '1.75rem',
                  marginBottom: '0.75rem',
                  color: 'var(--color-ink)',
                  fontWeight: 800,
                }}
              >
                Elected Leadership for Sustainable Growth
              </h2>
              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--color-muted)',
                  lineHeight: 1.65,
                  marginBottom: '1.25rem',
                }}
              >
                The ISTD Thrissur Chapter Managing Committee comprises visionary industry leaders,
                corporate heads, academicians, and certified facilitators dedicated to building
                talent across Kerala.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href="#officeBearers" className="btn btn-primary btn-sm">
                  Office Bearers
                </a>
                <a href="#committeeMembers" className="btn btn-outline-navy btn-sm">
                  Committee Members
                </a>
                <Link href="/events" className="btn btn-outline-blue btn-sm">
                  Chapter Events
                </Link>
              </div>
            </div>

            <PhotoCard
              src="/photos/team.jpeg"
              alt="ISTD Thrissur Managing Committee & National Dignitaries Group Photo"
              title="ISTD Thrissur Managing Committee & National Executive Leaders"
              caption="Office Bearers (Chairman Shri. Tony Chacko, Secretary Sneha Rose George, Treasurer Jibin N) and Managing Committee members alongside ISTD National President Shri. Atul Shah and Regional VP Prof. (Dr.) Zakkariya K A."
              category="Leadership Portrait"
              badgeText="Click to Expand Portrait"
              headingText="Managing Committee & National Dignitaries"
              style={{ background: '#FFFFFF' }}
            />
          </div>
        </div>
      </section>

      {/* Executive Office Bearers Section */}
      <section className="section-padding bg-white" id="officeBearers">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-red">Executive Leadership</span>
            <h2 className="section-title">Office Bearers</h2>
            <p className="section-subtitle">
              Guiding the governance, strategy, and industry-academia partnerships of the chapter.
            </p>
          </div>

          <div className="committee-grid">
            {OFFICE_BEARERS.map((member) => (
              <div
                key={member.id}
                className="committee-card officer-highlight"
                id={member.id}
              >
                <div className="committee-avatar-wrap">
                  <img
                    src={assetUrl(member.avatar)}
                    alt={`${member.name} - ${member.role} ISTD Thrissur Chapter`}
                    width={130}
                    height={130}
                    loading="lazy"
                  />
                </div>
                <div>
                  <span
                    className={`committee-role-badge ${
                      member.isChairman ? 'badge-chairman' : ''
                    }`}
                  >
                    {member.role}
                  </span>
                  <h3 className="committee-name">{member.name}</h3>
                  <p className="committee-title">{member.title}</p>
                </div>
                <div className="committee-social">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      title={`Email ${member.role}`}
                      aria-label={`Email ${member.name}`}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      title={`Call ${member.role}`}
                      aria-label={`Call ${member.name}`}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
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
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committee Members & Key Contributors */}
      <section className="section-padding bg-pale-blue" id="committeeMembers">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-blue">Governance &amp; Operations</span>
            <h2 className="section-title">Committee Members &amp; Key Contributors</h2>
            <p className="section-subtitle">
              Distinguished leaders from corporate training, legal advisory, academia, and business
              development.
            </p>
          </div>

          <div className="committee-grid">
            {COMMITTEE_MEMBERS.map((member) => (
              <div className="committee-card" key={member.id}>
                <div className="committee-avatar-wrap">
                  <img
                    src={assetUrl(member.avatar)}
                    alt={`${member.name} Portrait`}
                    width={130}
                    height={130}
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="committee-role-badge">{member.role}</span>
                  <h3 className="committee-name">{member.name}</h3>
                  <p className="committee-title">{member.title}</p>
                </div>
                <div className="committee-social">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name}`}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Extended Leadership & Core Chapter Contributors */}
          <div
            style={{
              marginTop: '2.5rem',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              border: '1.5px solid var(--border-light)',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--color-ink)',
                marginBottom: '0.6rem',
              }}
            >
              Chapter Leadership Cohort &amp; Key Contributors
            </h3>
            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--color-muted)',
                marginBottom: '1.25rem',
              }}
            >
              Dedicated educators, HR leaders, and trainers driving chapter initiatives across
              Thrissur and Central Kerala:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              {CHAPTER_CORE_CONTRIBUTORS.map((person) =>
                person.linkedin ? (
                  <a
                    key={person.name}
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      background: 'var(--bg-pale-blue)',
                      border: '1.5px solid #BFDBFE',
                      padding: '0.5rem 0.95rem',
                      borderRadius: '999px',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      color: 'var(--color-primary-navy)',
                    }}
                  >
                    <span>{person.name}</span>
                    <span style={{ fontSize: '0.74rem', color: '#0A66C2', fontWeight: 800 }}>
                      in ↗
                    </span>
                  </a>
                ) : (
                  <span
                    key={person.name}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      background: 'var(--bg-pale-blue)',
                      border: '1.5px solid var(--border-light)',
                      padding: '0.5rem 0.95rem',
                      borderRadius: '999px',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      color: 'var(--color-ink)',
                    }}
                  >
                    {person.name}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Connect CTA */}
      <section className="section-padding bg-white">
        <div className="container">
          <div
            style={{
              maxWidth: '860px',
              margin: '0 auto',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem 2rem',
              border: '1.5px solid var(--border-light)',
              borderLeft: '6px solid var(--accent-red)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h3
              style={{
                color: 'var(--color-ink)',
                fontSize: '1.5rem',
                marginBottom: '0.85rem',
                fontWeight: 800,
              }}
            >
              Collaborate with the ISTD Thrissur Leadership
            </h3>
            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.65,
                color: 'var(--color-muted)',
                marginBottom: '1.75rem',
              }}
            >
              The Managing Committee is committed to fostering fruitful partnerships with
              corporations, colleges, business houses, and freelance trainers across Kerala. Whether
              you would like to speak at our next chapter webinar, propose an institutional tie-up,
              or collaborate on an L&amp;D forum, we welcome your active participation.
            </p>
            <div className="btn-group">
              <Link href="/contact" className="btn btn-red">
                Connect with Secretariat
              </Link>
              <Link href="/membership" className="btn btn-outline-navy">
                Apply for Chapter Membership
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
