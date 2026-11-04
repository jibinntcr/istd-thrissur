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
  title: 'Managing Committee',
  description:
    'Meet the Managing Committee and Office Bearers of the ISTD Thrissur Chapter.',
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
          <h1 className="page-hero-title">Managing Committee</h1>
          <p className="page-hero-subtitle">
            Office Bearers and Managing Committee members of the ISTD Thrissur Chapter, installed on
            30 March 2026.
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
                ISTD Thrissur Chapter Managing Committee
              </h2>
              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--color-body)',
                  lineHeight: 1.68,
                  marginBottom: '1.25rem',
                }}
              >
                The Managing Committee of the ISTD Thrissur Chapter was formally installed during
                the Diamond Chapter inauguration on 30 March 2026 in the presence of ISTD National
                and Regional leaders. The committee coordinates chapter programmes, membership
                engagement, and academic–industry initiatives in Thrissur.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href="#officeBearers" className="btn btn-primary btn-sm">
                  Office Bearers
                </a>
                <a href="#committeeMembers" className="btn btn-outline-navy btn-sm">
                  Committee Members
                </a>
                <Link href="/events/inauguration" className="btn btn-outline-blue btn-sm">
                  Inauguration Report
                </Link>
              </div>
            </div>

            <PhotoCard
              src="/photos/team.jpeg"
              alt="ISTD Thrissur Chapter Managing Committee with National Leaders"
              title="ISTD Thrissur Chapter Managing Committee with National Leaders"
              caption="Chairman Shri. Tony Chacko, Secretary Ms. Sneha Rose George, Treasurer Mr. Jibin N, and Managing Committee members with National President Shri. Atul Shah and Regional Vice President (South) Prof. (Dr.) Zakkariya K A (30 March 2026)."
              category="Managing Committee"
              badgeText="30 March 2026"
              headingText="Managing Committee & National Leaders"
              style={{ background: '#FFFFFF' }}
            />
          </div>
        </div>
      </section>

      {/* Office Bearers Section */}
      <section className="section-padding bg-white" id="officeBearers">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-red">Office Bearers</span>
            <h2 className="section-title">Chapter Office Bearers</h2>
            <p className="section-subtitle">
              Primary office bearers coordinating the governance and operations of the ISTD
              Thrissur Chapter.
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
                    src={assetUrl(member.avatar || '/images/logo-circle.png')}
                    alt={`${member.name} - ${member.role}, ISTD Thrissur Chapter`}
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
            ))}
          </div>
        </div>
      </section>

      {/* Committee Members */}
      <section className="section-padding bg-pale-blue" id="committeeMembers">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-blue">Committee Members</span>
            <h2 className="section-title">Managing Committee Members</h2>
            <p className="section-subtitle">
              Members of the ISTD Thrissur Chapter Managing Committee.
            </p>
          </div>

          <div className="committee-grid">
            {COMMITTEE_MEMBERS.map((member) => (
              <div className="committee-card" key={member.id}>
                <div className="committee-avatar-wrap">
                  <img
                    src={assetUrl(member.avatar || '/images/logo-circle.png')}
                    alt={`${member.name} - ${member.role}`}
                    width={130}
                    height={130}
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="committee-role-badge">{member.role}</span>
                  <h3 className="committee-name">{member.name}</h3>
                  {member.title && <p className="committee-title">{member.title}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Contributors Recognized at Chapter Inauguration */}
          <div
            style={{
              marginTop: '2.5rem',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              border: '1px solid var(--color-border)',
            }}
          >
            <h3
              style={{
                fontSize: '1.2rem',
                fontWeight: 800,
                color: 'var(--color-ink)',
                marginBottom: '0.5rem',
              }}
            >
              Contributors Acknowledged at the Chapter Inauguration (30 March 2026)
            </h3>
            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--color-muted)',
                marginBottom: '1.25rem',
              }}
            >
              Office bearers, members, and contributors recognised for their role in establishing
              and inaugurating the ISTD Thrissur Chapter:
            </p>
            <div className="contributors-pill-wrap">
              {CHAPTER_CORE_CONTRIBUTORS.map((person) =>
                person.linkedin ? (
                  <a
                    key={person.name}
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contributor-pill linked"
                  >
                    <span>{person.name}</span>
                    <span className="in-badge">in ↗</span>
                  </a>
                ) : (
                  <span key={person.name} className="contributor-pill">
                    {person.name}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding-sm bg-white">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-inner">
              <div>
                <span className="section-tag tag-yellow">Connect With the Committee</span>
                <h2>Collaborate With the ISTD Thrissur Chapter</h2>
                <p>
                  To discuss upcoming training programmes, academic collaborations, or membership
                  enquiries, please contact our chapter office bearers.
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
