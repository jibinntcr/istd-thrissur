import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PhotoCard } from '@/components/PhotoCard';
import { FLAGSHIP_PROGRAMS, CHAPTER_EVENTS, assetUrl } from '@/data/siteData';

export const metadata: Metadata = {
  title: 'Programs & Events',
  description:
    'Explore ISTD Thrissur training programs, flagship 15-month PGP-TL&D diploma, Train The Trainer workshops, and cutting-edge L&D webinars.',
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
            <span>Programs &amp; Events</span>
          </div>
          <h1 className="page-hero-title">Training Programs &amp; Chapter Events</h1>
          <p className="page-hero-subtitle">
            Comprehensive post-graduate certifications, train-the-trainer masterclasses, and
            forward-looking webinars.
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
              <span className="section-tag tag-yellow">Professional Credentials</span>
              <h2
                style={{
                  fontSize: '1.85rem',
                  marginBottom: '0.75rem',
                  color: 'var(--color-ink)',
                  fontWeight: 800,
                }}
              >
                Nationally Accredited L&amp;D Qualifications
              </h2>
              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--color-muted)',
                  lineHeight: 1.65,
                  marginBottom: '1.25rem',
                }}
              >
                Whether you are stepping into corporate training or leading human capital
                transformations, ISTD credentials provide recognized benchmark standards across
                industries.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href="#flagshipProgramsSection" className="btn btn-primary btn-sm">
                  Flagship Diploma (PGP)
                </a>
                <a href="#chapterEventsSection" className="btn btn-outline-navy btn-sm">
                  Chapter Events
                </a>
                <Link href="/gallery" className="btn btn-outline-blue btn-sm">
                  Event Gallery
                </Link>
              </div>
            </div>

            <PhotoCard
              src="/photos/istd-treasurer.jpeg"
              alt="ISTD Thrissur Keynote Session at Pearl Regency"
              title="Keynote Address at the ISTD Thrissur Diamond Chapter Inauguration"
              caption="National Treasurer Shri. Nabaghan Pany addressing delegates alongside National President Shri. Atul Shah, Past National President Dr. Yogesh Kumar Upadhyay, Regional VP Prof. (Dr.) Zakkariya K A, and Chairman Shri. Tony Chacko."
              category="Chapter Symposium"
              badgeText="National Leadership Symposium"
              headingText="Keynote Session at Hotel Pearl Regency"
              style={{ background: '#FFFFFF' }}
            />
          </div>
        </div>
      </section>

      {/* Section 1: National Flagship Programs */}
      <section className="section-padding bg-white" id="flagshipProgramsSection">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-red">National Flagship Certifications</span>
            <h2 className="section-title">Government Recognized Programs</h2>
            <p className="section-subtitle">
              Pioneering diploma and certificate credentials with nationwide and global recognition.
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
                    {prog.featured ? 'Enquire for Admissions' : 'Enroll in Next Batch'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Recent & Upcoming Chapter Events */}
      <section className="section-padding bg-pale-blue" id="chapterEventsSection">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-blue">Chapter Knowledge Hub</span>
            <h2 className="section-title">Recent &amp; Upcoming Chapter Events</h2>
            <p className="section-subtitle">
              Join thought leaders exploring the next wave of Artificial Intelligence,
              organizational psychology, and agile learning ecosystems.
            </p>
          </div>

          {/* Featured Milestone Event Banner Card */}
          <article className="event-card milestone-event-card">
            <PhotoCard
              src="/photos/istd-calicut.jpeg"
              alt="Inauguration of ISTD Diamond Chapter at Thrissur"
              title="Inauguration of ISTD Diamond Chapter at Thrissur — 30th March 2026"
              caption="Dignitaries on the dais at Hotel Pearl Regency, Thrissur: Dr. Yogesh Kumar Upadhyay, Shri. Nabaghan Pany, Shri. Atul Shah, Prof. (Dr.) Zakkariya K A, and Chairman Shri. Tony Chacko."
              category="Chapter Inauguration"
              badgeText="★ March 30, 2026 • Flagship Milestone"
              headingText="Click to View Inauguration Plenary"
              className="event-image-box"
              style={{ borderRadius: 0, border: 'none' }}
            />
            <div className="event-body">
              <div>
                <div className="event-speaker-tag" style={{ color: 'var(--accent-red)' }}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span>
                    Dignitaries: Shri. Atul Shah, Dr. Yogesh Kumar Upadhyay, Shri. Nabaghan Pany,
                    Prof. (Dr.) Zakkariya K A
                  </span>
                </div>
                <h3 className="event-title" style={{ fontSize: '1.4rem' }}>
                  Grand Inauguration of ISTD Diamond Chapter at Thrissur
                </h3>
                <p className="event-desc" style={{ marginBottom: '1.25rem' }}>
                  The formal inauguration of the ISTD Diamond Chapter at Hotel Pearl Regency,
                  Thrissur, featuring the auspicious lamp lighting, charter handover, keynote
                  addresses by National &amp; Regional leadership, and swearing-in of the Managing
                  Committee.
                </p>
              </div>
              <div className="event-footer">
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--color-primary-navy)',
                  }}
                >
                  Venue: Hotel Pearl Regency, Thrissur
                </span>
                <Link href="/gallery" className="btn btn-primary btn-sm">
                  Explore 24 Event Photos &rarr;
                </Link>
              </div>
            </div>
          </article>

          <div className="events-grid">
            {CHAPTER_EVENTS.map((ev) => (
              <article className="event-card" key={ev.id}>
                <div className="event-image-box">
                  <img src={assetUrl(ev.image)} alt={ev.title} width={560} height={230} loading="lazy" />
                  <span className="event-date-badge">{ev.dateBadge}</span>
                </div>
                <div className="event-body">
                  <div>
                    <div className="event-speaker-tag">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span>{ev.speaker}</span>
                    </div>
                    <h3 className="event-title">{ev.title}</h3>
                    <p className="event-desc">{ev.description}</p>
                  </div>
                  <div className="event-footer">
                    <span
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'var(--accent-red)',
                      }}
                    >
                      Date: {ev.dateBadge}
                    </span>
                    <Link href="/contact" className="btn btn-outline-blue btn-sm">
                      Register for Session
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
