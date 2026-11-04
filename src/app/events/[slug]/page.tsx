import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ALL_CHAPTER_EVENTS,
  INAUGURATION_DIGNITARIES,
  CHAPTER_CORE_CONTRIBUTORS,
  GALLERY_PHOTOS,
  OFFICIAL_LINKS,
  assetUrl,
} from '@/data/siteData';
import { PhotoCard } from '@/components/PhotoCard';
import { EventRegistrationForm } from '@/components/EventRegistrationForm';
import { buildPageMetadata, getEventJsonLd } from '@/lib/seoConfig';

export function generateStaticParams() {
  return ALL_CHAPTER_EVENTS.map((ev) => ({
    slug: ev.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = ALL_CHAPTER_EVENTS.find((ev) => ev.slug === slug);
  if (!event) {
    return { title: 'Event Not Found' };
  }
  return buildPageMetadata({
    title: `${event.title} — ${event.programmeType}`,
    description: event.shortDescription,
    path: `/events/${event.slug}`,
    image: event.image,
    type: 'article',
    keywords: [
      event.title,
      event.programmeType,
      event.speaker || 'ISTD Thrissur Session',
      'ISTD Thrissur Events',
    ],
  });
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = ALL_CHAPTER_EVENTS.find((ev) => ev.slug === slug);

  if (!event) {
    notFound();
  }

  const isInauguration = event.slug === 'inauguration';
  const eventJsonLd = getEventJsonLd(event);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      {/* =====================================================================
          HIGH-CONTRAST EXECUTIVE EVENT HERO BANNER
         ===================================================================== */}
      <section
        style={{
          background: 'linear-gradient(135deg, #071524 0%, #0B2239 60%, #163E66 100%)',
          color: '#FFFFFF',
          padding: '3rem 0 2.75rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="container">
          {/* High-Contrast Breadcrumb */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.84rem',
              fontWeight: 600,
              color: '#CBD5E1',
              marginBottom: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/" style={{ color: '#93C5FD', textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ opacity: 0.5 }}>/</span>
            <Link href="/events" style={{ color: '#93C5FD', textDecoration: 'none' }}>
              Events &amp; Programmes
            </Link>
            <span style={{ opacity: 0.5 }}>/</span>
            <span style={{ color: '#F8FAFC' }}>{event.programmeType}</span>
          </div>

          {/* Programme Type & Status Pills */}
          <div
            style={{
              display: 'flex',
              gap: '0.6rem',
              flexWrap: 'wrap',
              marginBottom: '0.9rem',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                background: '#FACC15',
                color: '#071524',
                fontSize: '0.74rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                padding: '0.28rem 0.8rem',
                borderRadius: '999px',
              }}
            >
              {event.programmeType}
            </span>
            <span
              style={{
                display: 'inline-block',
                background:
                  event.status === 'upcoming'
                    ? 'rgba(16, 185, 129, 0.22)'
                    : 'rgba(59, 130, 246, 0.25)',
                border: `1px solid ${
                  event.status === 'upcoming' ? '#34D399' : '#93C5FD'
                }`,
                color: event.status === 'upcoming' ? '#A7F3D0' : '#DBEAFE',
                fontSize: '0.74rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                padding: '0.28rem 0.85rem',
                borderRadius: '999px',
              }}
            >
              {event.status === 'upcoming'
                ? '● Upcoming Event — Registration Open'
                : '✓ Completed Event Report'}
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.75rem, 3.4vw, 2.55rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              maxWidth: '920px',
              lineHeight: 1.22,
              marginBottom: '1rem',
            }}
          >
            {event.title}
          </h1>

          {/* Key Metadata Pills Row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              alignItems: 'center',
              marginBottom: event.status === 'upcoming' ? '1.5rem' : '0.25rem',
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '10px',
                padding: '0.45rem 0.9rem',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: '#F8FAFC',
              }}
            >
              📅 {event.date}
            </div>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '10px',
                padding: '0.45rem 0.9rem',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: '#F8FAFC',
              }}
            >
              🕖 {event.timeIST}
            </div>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '10px',
                padding: '0.45rem 0.9rem',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: '#FACC15',
              }}
            >
              💻 {event.venue}
            </div>
            {event.speaker && (
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: '10px',
                  padding: '0.45rem 0.9rem',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#E2E8F0',
                }}
              >
                🎙️ {event.speaker}
                {event.speakerDesignation ? ` (${event.speakerDesignation})` : ''}
              </div>
            )}
          </div>

          {event.status === 'upcoming' && (
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="#eventRegistrationFormBox" className="btn btn-red">
                Register Online Now &darr;
              </a>
              <Link href="/events" className="btn btn-outline-white">
                &larr; All Events &amp; Programmes
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          MAIN EVENT OVERVIEW & POSTER SECTION
         ===================================================================== */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="split-grid" style={{ alignItems: 'start', gap: '2.5rem' }}>
            {/* Left Column: Narrative, Resource Person & Schedule */}
            <div>
              <span className="section-tag tag-blue">
                {event.status === 'upcoming'
                  ? 'About This Learning Session'
                  : 'Official Event Report'}
              </span>

              {event.subtitleQuestion && (
                <div
                  style={{
                    background: '#EFF6FF',
                    borderLeft: '4px solid #2563EB',
                    padding: '0.9rem 1.15rem',
                    borderRadius: '0 10px 10px 0',
                    fontSize: '1.05rem',
                    fontStyle: 'italic',
                    fontWeight: 700,
                    color: '#1E3A8A',
                    marginBottom: '1rem',
                  }}
                >
                  “{event.subtitleQuestion}”
                </div>
              )}

              <h2
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: '#0F172A',
                  marginBottom: '1.1rem',
                  lineHeight: 1.3,
                }}
              >
                {event.title}
              </h2>

              {isInauguration ? (
                <>
                  <p className="report-paragraph">
                    We are pleased to share the successful inauguration of the{' '}
                    <a
                      href={OFFICIAL_LINKS.istdTrichurLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="report-inline-link"
                    >
                      ISTD Trichur Chapter
                    </a>{' '}
                    on <strong>30 March 2026</strong>, marking the establishment of the{' '}
                    <strong>Diamond Chapter</strong> of the{' '}
                    <a
                      href={OFFICIAL_LINKS.istdNationalLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="report-inline-link"
                    >
                      Indian Society for Training &amp; Development (ISTD)
                    </a>{' '}
                    in its <strong>55th year</strong>.
                  </p>
                  <p className="report-paragraph">
                    The launch of the Trichur Chapter reflects a collective commitment to
                    strengthening the training and development ecosystem by creating a professional
                    platform for learning, knowledge exchange, collaboration, and leadership
                    development.
                  </p>
                  <p className="report-paragraph">
                    The chapter is envisioned as a space that brings together trainers, educators,
                    HR professionals, academicians, and industry leaders to contribute meaningfully
                    to professional growth in the region.
                  </p>
                  <div className="report-quote-box">
                    <p>
                      “The <strong>ISTD Trichur Chapter</strong> begins its journey with a clear
                      purpose: to support professional excellence in training, learning, and human
                      resource development through meaningful engagement and sustained
                      collaboration.”
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {event.fullDescription.map((para: string, idx: number) => (
                    <p key={idx} className="report-paragraph">
                      {para}
                    </p>
                  ))}
                </>
              )}

              {/* Resource Person & Session Information Card */}
              <div
                style={{
                  marginTop: '1.5rem',
                  padding: '1.5rem',
                  background: '#F8FAFC',
                  borderRadius: '16px',
                  border: '1.5px solid #E2E8F0',
                }}
              >
                {event.speaker && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      paddingBottom: '1.15rem',
                      marginBottom: '1.15rem',
                      borderBottom: '1px solid #E2E8F0',
                    }}
                  >
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        background: '#0B2239',
                        color: '#FACC15',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.35rem',
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      🎙️
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.07em',
                          color: '#2563EB',
                        }}
                      >
                        Resource Person / Speaker
                      </div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                        {event.speaker}
                      </div>
                      {event.speakerDesignation && (
                        <div style={{ fontSize: '0.86rem', color: '#475569', fontWeight: 600 }}>
                          {event.speakerDesignation}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '1rem',
                    fontSize: '0.88rem',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
                      📅 Session Date
                    </div>
                    <div style={{ fontWeight: 800, color: '#0F172A', marginTop: '0.15rem' }}>
                      {event.date}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
                      🕖 Time (IST)
                    </div>
                    <div style={{ fontWeight: 800, color: '#0F172A', marginTop: '0.15rem' }}>
                      {event.timeIST}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
                      💻 Platform / Venue
                    </div>
                    <div style={{ fontWeight: 800, color: '#2563EB', marginTop: '0.15rem' }}>
                      {event.venue}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
                      🏛️ Organised By
                    </div>
                    <div style={{ fontWeight: 800, color: '#0F172A', marginTop: '0.15rem' }}>
                      ISTD Thrissur Chapter
                    </div>
                  </div>
                </div>
              </div>

              {/* Who Should Attend Pills (For Upcoming Sessions) */}
              {event.status === 'upcoming' && (
                <div style={{ marginTop: '1.35rem' }}>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: '#475569',
                      marginBottom: '0.6rem',
                    }}
                  >
                    Who Should Attend
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {[
                      'Researchers & Academicians',
                      'Educators & Faculty Members',
                      'Technology & AIoT Professionals',
                      'HR & L&D Practitioners',
                      'Postgraduate & Undergraduate Students',
                    ].map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: '#EFF6FF',
                          border: '1px solid #BFDBFE',
                          color: '#1E3A8A',
                          padding: '0.35rem 0.8rem',
                          borderRadius: '999px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                        }}
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="btn-group" style={{ marginTop: '1.75rem' }}>
                {event.status === 'upcoming' ? (
                  <>
                    <a href="#eventRegistrationFormBox" className="btn btn-red">
                      Register Online for This Session &darr;
                    </a>
                    <a href="#eventPhotosSection" className="btn btn-outline-blue">
                      View Event Poster
                    </a>
                  </>
                ) : (
                  <>
                    <a href="#eventPhotosSection" className="btn btn-primary">
                      View Event Photographs &darr;
                    </a>
                    {event.slug === 'christ-college-student-chapter-inauguration' && (
                      <Link
                        href="/campus-chapters/christ-college-of-engineering"
                        className="btn btn-red"
                      >
                        Visit Exclusive Campus Chapter Page &rarr;
                      </Link>
                    )}
                    <Link href="/events#pastEvents" className="btn btn-outline-navy">
                      &larr; Back to Events &amp; Programmes
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Official Event Poster & Quick Registration Callout */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <PhotoCard
                src={event.image}
                alt={event.imageCaption}
                title={event.title}
                caption={event.imageCaption}
                category={event.programmeType}
                badgeText={`${event.date} • Click to Enlarge`}
                headingText={event.title}
                aspectRatio={event.isPosterImage ? '4/5' : '16/10'}
                imgStyle={
                  event.isPosterImage
                    ? { objectFit: 'contain', background: '#071524' }
                    : undefined
                }
              />

              {event.status === 'upcoming' && event.registrationAvailable !== false ? (
                <div
                  style={{
                    padding: '1.25rem 1.35rem',
                    background: '#F0F7FF',
                    borderRadius: '14px',
                    border: '1.5px solid #BFDBFE',
                  }}
                >
                  <div style={{ fontWeight: 800, color: '#0B2239', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                    🎟️ Instant Confirmation &amp; Unique Participant ID
                  </div>
                  <p style={{ fontSize: '0.84rem', color: '#334155', marginBottom: '0.85rem', lineHeight: 1.5 }}>
                    Register below to receive your official event pass and a permanent{' '}
                    <strong>Unique ISTD Participant ID</strong> (`ISTD-PID-2026-XXXX`) for 1-click
                    auto-fill in future sessions.
                  </p>
                  <a
                    href="#eventRegistrationFormBox"
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Go to Registration Form &darr;
                  </a>
                </div>
              ) : (
                <div
                  style={{
                    padding: '1.25rem 1.35rem',
                    background: '#F8FAFC',
                    borderRadius: '14px',
                    border: '1.5px solid #CBD5E1',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '0.22rem 0.65rem',
                      borderRadius: '999px',
                      background: '#E2E8F0',
                      color: '#334155',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '0.45rem',
                    }}
                  >
                    Registration Closed • Programme Completed
                  </div>
                  <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                    ✓ Official Completed Event Report
                  </div>
                  <p style={{ fontSize: '0.84rem', color: '#475569', marginBottom: event.slug === 'christ-college-student-chapter-inauguration' ? '0.85rem' : 0, lineHeight: 1.5 }}>
                    This programme has successfully concluded and participant registration is closed. Explore the official report and media archive on this page.
                  </p>
                  {event.slug === 'christ-college-student-chapter-inauguration' && (
                    <Link
                      href="/campus-chapters/christ-college-of-engineering"
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      Open Christ College Student Chapter Page &rarr;
                    </Link>
                  )}
                </div>
              )}

              {isInauguration && (
                <div
                  style={{
                    padding: '1.25rem',
                    background: '#F8FAFC',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.6rem',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0B2239' }}>
                    Official LinkedIn Announcements:
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <a
                      href={OFFICIAL_LINKS.istdTrichurLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-navy"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="#0A66C2"
                        aria-hidden="true"
                      >
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                      <span>ISTD Trichur</span>
                    </a>
                    <a
                      href={OFFICIAL_LINKS.istdNationalLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-blue"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="#0A66C2"
                        aria-hidden="true"
                      >
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                      <span>ISTD National</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* =================================================================
              ONLINE PARTICIPANT REGISTRATION FORM (FOR UPCOMING EVENTS)
             ================================================================= */}
          {event.status === 'upcoming' && event.registrationAvailable !== false && (
            <div style={{ marginTop: '3.25rem' }}>
              <EventRegistrationForm event={event} />
            </div>
          )}

          {/* =================================================================
              INAUGURATION-SPECIFIC SECTIONS: DIGNITARIES & APPRECIATION
             ================================================================= */}
          {isInauguration && (
            <>
              <div className="report-divider-section">
                <span className="section-tag tag-blue">Dignitaries in Attendance</span>
                <h2 className="report-sub-heading">
                  Distinguished ISTD Leaders Who Graced the Occasion
                </h2>
                <p style={{ color: '#64748B', marginBottom: '1.5rem' }}>
                  We were honoured by the presence of distinguished ISTD leaders who graced the
                  inauguration on 30 March 2026:
                </p>

                <div className="dignitaries-grid">
                  {INAUGURATION_DIGNITARIES.map((leader) => (
                    <div className="dignitary-card" key={leader.name}>
                      <div>
                        <div className="dignitary-photo-wrap">
                          <img
                            src={assetUrl(leader.photo)}
                            alt={leader.name}
                            loading="lazy"
                          />
                        </div>
                        <h3 className="dignitary-name">{leader.name}</h3>
                        <p className="dignitary-role">{leader.designation}</p>
                      </div>
                      <a
                        href={leader.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dignitary-linkedin-link"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                        <span>LinkedIn Profile ↗</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="report-appreciation-box">
                <span className="section-tag tag-red">Acknowledgements</span>
                <h2 className="report-sub-heading">
                  Leadership Team, Office Bearers &amp; Contributors
                </h2>
                <p className="report-paragraph" style={{ marginBottom: '1.25rem' }}>
                  The successful formation and inauguration of the chapter, along with the strong
                  membership response and installation of office bearers, reflect the dedication,
                  coordination, and shared vision of everyone involved in this initiative. We place
                  on record our sincere appreciation to the leadership team, office bearers,
                  members, and all those who contributed to making this occasion a success:
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
                        title={`${person.name} on LinkedIn`}
                      >
                        <span>{person.name}</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="#0A66C2"
                          aria-hidden="true"
                          style={{ flexShrink: 0 }}
                        >
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                      </a>
                    ) : (
                      <span key={person.name} className="contributor-pill">
                        {person.name}
                      </span>
                    )
                  )}
                  <span className="contributor-pill community-pill">
                    &amp; the Wider Chapter Community
                  </span>
                </div>
              </div>
            </>
          )}

          {/* =================================================================
              DEDICATED EVENT PHOTOGRAPHS & VISUAL ARCHIVE SECTION
             ================================================================= */}
          <div
            id="eventPhotosSection"
            style={{
              marginTop: '3.25rem',
              paddingTop: '2.5rem',
              borderTop: '1.5px solid #E2E8F0',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '1rem',
                marginBottom: '1.75rem',
              }}
            >
              <div>
                <span className="section-tag tag-blue">Event Photographs &amp; Media</span>
                <h2 className="section-title" style={{ marginBottom: '0.3rem' }}>
                  {isInauguration
                    ? 'Inauguration Ceremony Photo Gallery (24 Photos)'
                    : (event.eventPhotos?.length || 0) > 1
                    ? `Event Photographs (${event.eventPhotos?.length} Photos)`
                    : 'Event Poster & Session Photographs'}
                </h2>
                <p style={{ color: '#64748B', marginBottom: 0 }}>
                  {isInauguration || (event.eventPhotos?.length || 0) > 1
                    ? 'Click any photograph below to open the full-screen lightbox viewer with captions.'
                    : event.status === 'upcoming'
                    ? 'Official event poster below. Photographs and screenshots from the session will be updated here after the event.'
                    : 'Visual archive and session highlights for this programme.'}
                </p>
              </div>
              {isInauguration && (
                <Link href="/gallery" className="btn btn-outline-navy btn-sm">
                  Open Filterable Gallery Page &rarr;
                </Link>
              )}
            </div>

            {isInauguration ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
                  gap: '1.25rem',
                }}
              >
                {GALLERY_PHOTOS.filter((p) => !p.src.includes('chapter-connect')).map((photo) => (
                  <PhotoCard
                    key={photo.id}
                    src={photo.src}
                    alt={photo.title}
                    title={photo.title}
                    caption={photo.caption}
                    category={photo.categoryLabel}
                    badgeText={photo.categoryLabel}
                    headingText={photo.title}
                    aspectRatio="4/3"
                    compactCaption
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    (event.eventPhotos?.length || 0) > 1
                      ? 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))'
                      : 'repeat(auto-fit, minmax(min(100%, 260px), 380px))',
                  gap: '1.5rem',
                }}
              >
                {(event.eventPhotos || [
                  {
                    src: event.image,
                    title: event.title,
                    caption: event.imageCaption,
                    category: event.programmeType,
                  },
                ]).map((photo) => (
                  <PhotoCard
                    key={photo.src}
                    src={photo.src}
                    alt={photo.title}
                    title={photo.title}
                    caption={photo.caption}
                    category={photo.category}
                    badgeText={photo.category}
                    headingText={photo.title}
                    aspectRatio={event.isPosterImage ? '4/5' : '16/10'}
                    imgStyle={
                      event.isPosterImage
                        ? { objectFit: 'contain', background: '#071524' }
                        : undefined
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
