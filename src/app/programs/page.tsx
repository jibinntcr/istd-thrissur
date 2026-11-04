import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PhotoCard } from '@/components/PhotoCard';
import { FLAGSHIP_PROGRAMS } from '@/data/siteData';

export const metadata: Metadata = {
  title: 'Programs & Initiatives',
  description:
    'Explore ISTD Thrissur Chapter learning initiatives, executive knowledge forums, industry-academia collaborations, and corporate HRD workshops.',
};

export default function ProgramsPage() {
  return (
    <>
      {/* Page Hero Header */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Programs &amp; Initiatives</span>
          </div>
          <h1 className="page-hero-title">Chapter Programs &amp; Learning Initiatives</h1>
          <p className="page-hero-subtitle">
            Executive knowledge-sharing forums, industry–academia partnerships, and practitioner
            skill labs across Central Kerala.
          </p>
        </div>
      </section>

      {/* Programs Hero Banner Showcase */}
      <section
        className="section-padding-sm bg-white"
        style={{ borderBottom: '1.5px solid var(--border-light)' }}
      >
        <div className="container">
          <div className="split-banner-card">
            <div>
              <span className="section-tag tag-yellow">Collaborative Ecosystem</span>
              <h2
                style={{
                  fontSize: '1.85rem',
                  marginBottom: '0.75rem',
                  color: 'var(--color-ink)',
                  fontWeight: 800,
                }}
              >
                Strengthening the Regional Training &amp; Development Ecosystem
              </h2>
              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--color-muted)',
                  lineHeight: 1.65,
                  marginBottom: '1.25rem',
                }}
              >
                The ISTD Thrissur Chapter serves as a dynamic platform for learning, knowledge
                exchange, collaboration, and leadership development—bringing together trainers,
                educators, HR professionals, academicians, and industry leaders.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href="#flagshipProgramsSection" className="btn btn-primary btn-sm">
                  Core Initiatives
                </a>
                <Link href="/events" className="btn btn-outline-navy btn-sm">
                  Chapter Events
                </Link>
                <Link href="/gallery" className="btn btn-outline-blue btn-sm">
                  Photo Gallery
                </Link>
              </div>
            </div>

            <PhotoCard
              src="/photos/istd-treasurer.jpeg"
              alt="ISTD National & Regional Executive Forum"
              title="Executive Knowledge Exchange & Academic Leadership"
              caption="National Treasurer Shri. Nabaghana Pany, National President Shri. Atul Shah, Past National President Dr. Yogesh Kumar Upadhyay, Regional VP Prof. (Dr.) Zakkariya K A, and Chapter Chairman Shri. Tony Chacko."
              category="Academic & L&D Leadership"
              badgeText="National & Regional Forum"
              headingText="Advancing Professional L&D Standards"
              style={{ background: '#FFFFFF' }}
            />
          </div>
        </div>
      </section>

      {/* Section 1: Core Chapter Initiatives */}
      <section className="section-padding bg-white" id="flagshipProgramsSection">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-red">Chapter Focus Areas</span>
            <h2 className="section-title">Core Programs &amp; Collaborative Forums</h2>
            <p className="section-subtitle">
              Action-oriented learning forums, campus tie-ups, and practitioner workshops designed
              for the L&amp;D community.
            </p>
          </div>

          <div className="programs-grid">
            {FLAGSHIP_PROGRAMS.map((prog) => (
              <div
                key={prog.id}
                className={`program-card ${prog.featured ? 'featured' : ''}`}
                id={prog.id}
              >
                <div>
                  {prog.badge && <span className="program-card-badge">{prog.badge}</span>}
                  <div className="program-icon-wrap">
                    {prog.iconType === 'diploma' && (
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    )}
                    {prog.iconType === 'layers' && (
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                        <polyline points="2 17 12 22 22 17" />
                        <polyline points="2 12 12 17 22 12" />
                      </svg>
                    )}
                    {prog.iconType === 'shield' && (
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    )}
                  </div>
                  <span className="program-duration">{prog.duration}</span>
                  <h3 className="program-title">{prog.title}</h3>
                  <p className="program-description">{prog.fullDescription}</p>
                  <ul className="program-features">
                    {prog.features.map((feat) => (
                      <li key={feat}>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  style={{
                    marginTop: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  <Link
                    href="/contact"
                    className={`btn ${prog.featured ? 'btn-primary' : 'btn-navy'} btn-sm`}
                    style={{ width: '100%' }}
                  >
                    {prog.featured ? 'Partner / Participate' : 'Connect With Us'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA to Events & Reports */}
      <section className="section-padding-sm bg-pale-blue">
        <div className="container text-center">
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-ink)', marginBottom: '0.6rem' }}>
            Explore Upcoming Events &amp; Past Event Reports
          </h3>
          <p style={{ color: 'var(--color-muted)', maxWidth: '580px', margin: '0 auto 1.35rem', fontSize: '0.95rem' }}>
            View our full calendar of upcoming workshops and read official post-event reports from the ISTD Thrissur Chapter.
          </p>
          <Link href="/events" className="btn btn-primary">
            Go to Events &amp; Reports &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
