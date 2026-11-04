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
  return {
    title: `${event.title} | Events & Programmes`,
    description: event.shortDescription,
  };
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
  const encodedTitle = encodeURIComponent(event.title);

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/events">Events &amp; Programmes</Link>
            <span>/</span>
            <span>{event.programmeType}</span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '0.6rem',
              flexWrap: 'wrap',
              marginBottom: '0.85rem',
            }}
          >
            <span className="section-tag tag-yellow" style={{ marginBottom: 0 }}>
              {event.programmeType}
            </span>
            <span
              className="section-tag"
              style={{
                marginBottom: 0,
                background: 'rgba(255,255,255,0.14)',
                color: '#fff',
              }}
            >
              {event.status === 'upcoming' ? 'Upcoming Event' : 'Completed Event Report'}
            </span>
          </div>
          <h1 className="page-hero-title" style={{ maxWidth: '920px' }}>
            {event.title}
          </h1>
          <p className="page-hero-subtitle" style={{ maxWidth: '780px' }}>
            📅 {event.date} • 🕖 {event.timeIST} • 💻 {event.venue}
          </p>
        </div>
      </section>

      {/* Main Event Detail Content */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="split-grid" style={{ alignItems: 'start', gap: '2.5rem' }}>
            {/* Left Column: Event Narrative & Details */}
            <div>
              <span className="section-tag tag-blue">
                {event.status === 'upcoming' ? 'Upcoming Session Details' : 'Official Event Report'}
              </span>

              {event.subtitleQuestion && (
                <p
                  style={{
                    fontSize: '1.08rem',
                    fontStyle: 'italic',
                    fontWeight: 700,
                    color: 'var(--brand-blue)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {event.subtitleQuestion}
                </p>
              )}

              <h2
                style={{
                  fontSize: '1.65rem',
                  fontWeight: 800,
                  color: 'var(--color-ink)',
                  marginBottom: '1.15rem',
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

              {/* Structured Speaker & Schedule Card */}
              <div
                style={{
                  marginTop: '1.5rem',
                  padding: '1.35rem 1.5rem',
                  background: 'var(--color-surface-soft)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    color: 'var(--brand-navy)',
                    marginBottom: '0.85rem',
                  }}
                >
                  Session Schedule &amp; Resource Person
                </h3>
                <dl
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '0.6rem',
                    margin: 0,
                    fontSize: '0.92rem',
                  }}
                >
                  {event.speaker && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                      <dt style={{ fontWeight: 700, color: 'var(--color-muted)' }}>
                        🎙️ Resource Person / Speaker
                      </dt>
                      <dd
                        style={{
                          margin: 0,
                          fontWeight: 800,
                          color: 'var(--brand-navy)',
                          textAlign: 'right',
                        }}
                      >
                        {event.speaker}
                        {event.speakerDesignation ? ` — ${event.speakerDesignation}` : ''}
                      </dd>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                    <dt style={{ fontWeight: 700, color: 'var(--color-muted)' }}>📅 Date</dt>
                    <dd style={{ margin: 0, fontWeight: 700, color: 'var(--color-ink)' }}>
                      {event.date}
                    </dd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                    <dt style={{ fontWeight: 700, color: 'var(--color-muted)' }}>🕖 Time (IST)</dt>
                    <dd style={{ margin: 0, fontWeight: 700, color: 'var(--color-ink)' }}>
                      {event.timeIST}
                    </dd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                    <dt style={{ fontWeight: 700, color: 'var(--color-muted)' }}>
                      💻 Platform / Venue
                    </dt>
                    <dd
                      style={{
                        margin: 0,
                        fontWeight: 700,
                        color: 'var(--brand-blue)',
                        textAlign: 'right',
                      }}
                    >
                      {event.venue}
                    </dd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                    <dt style={{ fontWeight: 700, color: 'var(--color-muted)' }}>Organised By</dt>
                    <dd style={{ margin: 0, fontWeight: 700, color: 'var(--color-ink)' }}>
                      ISTD Trichur (Thrissur) Chapter
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Action Buttons */}
              <div className="btn-group" style={{ marginTop: '1.75rem' }}>
                {event.status === 'upcoming' ? (
                  <>
                    <a
                      href="#eventRegistrationFormBox"
                      className="btn btn-red"
                    >
                      Register Online for This Session &darr;
                    </a>
                    <a href="#eventPhotosSection" className="btn btn-outline-blue">
                      Event Poster &amp; Photos
                    </a>
                    <Link href="/events" className="btn btn-outline-navy">
                      &larr; All Events &amp; Programmes
                    </Link>
                  </>
                ) : (
                  <>
                    <a href="#eventPhotosSection" className="btn btn-primary">
                      View Event Photographs &darr;
                    </a>
                    <Link href="/events#pastEvents" className="btn btn-outline-navy">
                      &larr; Back to Events &amp; Programmes
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Official Event Poster / Main Visual */}
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

              {isInauguration && (
                <div
                  style={{
                    padding: '1.25rem',
                    background: 'var(--color-surface-soft)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.6rem',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--brand-navy)' }}>
                    Official LinkedIn Announcements:
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <a
                      href={OFFICIAL_LINKS.istdTrichurLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-navy"
                    >
                      ISTD Trichur LinkedIn ↗
                    </a>
                    <a
                      href={OFFICIAL_LINKS.istdNationalLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-blue"
                    >
                      ISTD National LinkedIn ↗
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* =================================================================
              ONLINE PARTICIPANT REGISTRATION FORM (FOR UPCOMING EVENTS)
             ================================================================= */}
          {event.status === 'upcoming' && (
            <div style={{ marginTop: '3rem' }}>
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
                <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
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
                  <span className="contributor-pill community-pill">
                    &amp; the Wider Chapter Community
                  </span>
                </div>
              </div>
            </>
          )}

          {/* =================================================================
              DEDICATED EVENT PHOTOGRAPHS & VISUAL ARCHIVE SECTION (EVERY EVENT)
             ================================================================= */}
          <div
            id="eventPhotosSection"
            style={{
              marginTop: '3.25rem',
              paddingTop: '2.5rem',
              borderTop: '1.5px solid var(--color-border)',
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
                    ? `Inauguration Ceremony Photo Gallery (${GALLERY_PHOTOS.length} Photos)`
                    : 'Event Poster & Session Photographs'}
                </h2>
                <p style={{ color: 'var(--color-muted)', marginBottom: 0 }}>
                  {isInauguration
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
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '1.25rem',
                }}
              >
                {GALLERY_PHOTOS.map((photo) => (
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
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 380px))',
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
