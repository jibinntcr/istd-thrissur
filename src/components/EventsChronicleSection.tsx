'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ALL_CHAPTER_EVENTS, assetUrl, ChapterEvent } from '@/data/siteData';
import { fetchBackendStore } from '@/lib/clientBackendCache';

type EventTab = 'upcoming' | 'past';

interface EventsChronicleSectionProps {
  initialTab?: EventTab;
}

export function EventsChronicleSection({
  initialTab = 'upcoming',
}: EventsChronicleSectionProps) {
  const [activeTab, setActiveTab] = useState<EventTab>(initialTab);
  const [eventsList, setEventsList] = useState<ChapterEvent[]>(ALL_CHAPTER_EVENTS);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#pastEvents') {
        setActiveTab('past');
      } else if (window.location.hash === '#upcomingEvents') {
        setActiveTab('upcoming');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    const loadBackendEvents = () => {
      fetchBackendStore().then(({ data }) => {
        if (data?.events?.length) {
          setEventsList(data.events);
        }
      });
    };
    loadBackendEvents();
    window.addEventListener('istd-backend-updated', loadBackendEvents);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('istd-backend-updated', loadBackendEvents);
    };
  }, []);

  const upcomingEvents = eventsList.filter((e) => e.status === 'upcoming');
  const pastEvents = eventsList.filter((e) => e.status === 'past');

  return (
    <section
      className="section-padding bg-white"
      id="eventsProgrammesSection"
      aria-label="Events and Programmes"
    >
      <div className="container">
        {/* Two-Tab Navigation Header: Upcoming Events | Past Events & Reports */}
        <div
          className="events-chronicle-header"
          style={{ marginBottom: '2rem', paddingBottom: '1.25rem' }}
        >
          <div>
            <span className="section-tag tag-blue">Events &amp; Programmes</span>
            <h2 className="section-title" style={{ marginBottom: '0.35rem' }}>
              {activeTab === 'upcoming' ? 'Upcoming Events' : 'Completed Events & Reports'}
            </h2>
            <p
              style={{
                color: 'var(--color-muted)',
                fontSize: '0.96rem',
                maxWidth: '640px',
                marginBottom: 0,
              }}
            >
              {activeTab === 'upcoming'
                ? 'Explore scheduled learning sessions and programmes organised by the ISTD Thrissur Chapter. Click any event card to view full details.'
                : 'Reports and photographs of completed learning sessions, seminars, and milestones organised by the ISTD Thrissur Chapter. Click any event card to open its full report and photo gallery.'}
            </p>
          </div>

          <div className="events-tab-bar" role="tablist" aria-label="Event categories">
            <button
              type="button"
              role="tab"
              id="tab-upcoming"
              aria-selected={activeTab === 'upcoming'}
              aria-controls="panel-upcoming"
              className={`events-tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              <span className="pulse-dot-green" aria-hidden="true" />
              <span>Upcoming Events</span>
              <span className="events-tab-badge">{upcomingEvents.length}</span>
            </button>
            <button
              type="button"
              role="tab"
              id="tab-past"
              aria-selected={activeTab === 'past'}
              aria-controls="panel-past"
              className={`events-tab-btn ${activeTab === 'past' ? 'active' : ''}`}
              onClick={() => setActiveTab('past')}
            >
              <span>Past Events &amp; Reports</span>
              <span className="events-tab-badge">{pastEvents.length}</span>
            </button>
          </div>
        </div>

        {/* =====================================================================
            TAB 1: UPCOMING EVENTS (SHOWN FIRST)
           ===================================================================== */}
        {activeTab === 'upcoming' && (
          <div id="panel-upcoming" role="tabpanel" aria-labelledby="tab-upcoming">
            {upcomingEvents.length === 0 ? (
              <div
                style={{
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  background: 'var(--color-surface-soft)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <p
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: 'var(--color-ink)',
                    marginBottom: 0,
                  }}
                >
                  Details of upcoming events will be published here.
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '1.75rem',
                }}
              >
                {upcomingEvents.map((ev) => (
                  <UpcomingEventCard key={ev.slug} event={ev} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* =====================================================================
            TAB 2: PAST EVENTS & COMPLETED REPORTS (MOST RECENT FIRST)
           ===================================================================== */}
        {activeTab === 'past' && (
          <div id="panel-past" role="tabpanel" aria-labelledby="tab-past">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.75rem',
              }}
            >
              {pastEvents.map((ev) => (
                <PastEventCard key={ev.slug} event={ev} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function UpcomingEventCard({ event }: { event: ChapterEvent }) {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) return;
    router.push(`/events/${event.slug}`);
  };

  return (
    <article
      className="upcoming-event-card clickable-event-card"
      onClick={handleCardClick}
      style={{
        padding: 0,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <div className="upcoming-poster-layout">
        {/* Left: Official Event Poster */}
        <div className="upcoming-poster-media">
          <img
            src={assetUrl(event.image)}
            alt={event.imageCaption}
            loading="lazy"
          />
        </div>

        {/* Right: Structured Event Content */}
        <div
          style={{
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.55rem',
                alignItems: 'center',
                marginBottom: '0.85rem',
              }}
            >
              <span
                style={{
                  background: 'var(--brand-navy)',
                  color: '#fff',
                  fontSize: '0.73rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '999px',
                }}
              >
                {event.programmeType}
              </span>
              <span
                style={{
                  background: 'var(--accent-blue-subtle)',
                  color: 'var(--accent-blue)',
                  border: '1px solid var(--border-blue)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.28rem 0.75rem',
                  borderRadius: '999px',
                }}
              >
                📅 {event.date} • 🕖 {event.timeIST}
              </span>
              <span
                style={{
                  background: '#ECFDF5',
                  color: '#047857',
                  border: '1px solid #A7F3D0',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.28rem 0.75rem',
                  borderRadius: '999px',
                }}
              >
                💻 {event.venue}
              </span>
            </div>

            {event.subtitleQuestion && (
              <p
                style={{
                  fontSize: '0.96rem',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  color: 'var(--brand-blue)',
                  marginBottom: '0.4rem',
                }}
              >
                {event.subtitleQuestion}
              </p>
            )}

            <h3
              style={{
                fontSize: 'clamp(1.3rem, 2.2vw, 1.65rem)',
                fontWeight: 800,
                color: 'var(--color-ink)',
                marginBottom: '1rem',
                lineHeight: 1.3,
              }}
            >
              <Link
                href={`/events/${event.slug}`}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                {event.title}
              </Link>
            </h3>

            {/* Speaker & Schedule Box */}
            <dl
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.75rem 1.25rem',
                margin: '0 0 1.15rem 0',
                padding: '1rem 1.2rem',
                background: 'var(--color-surface-soft)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                fontSize: '0.88rem',
              }}
            >
              {event.speaker && (
                <div>
                  <dt
                    style={{
                      fontSize: '0.73rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--color-muted)',
                      marginBottom: '0.15rem',
                    }}
                  >
                    🎙️ Resource Person
                  </dt>
                  <dd style={{ margin: 0, color: 'var(--color-ink)', fontWeight: 800 }}>
                    {event.speaker}
                    {event.speakerDesignation && (
                      <span
                        style={{
                          display: 'block',
                          fontWeight: 600,
                          fontSize: '0.82rem',
                          color: 'var(--brand-blue)',
                        }}
                      >
                        {event.speakerDesignation}
                      </span>
                    )}
                  </dd>
                </div>
              )}

              <div>
                <dt
                  style={{
                    fontSize: '0.73rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--color-muted)',
                    marginBottom: '0.15rem',
                  }}
                >
                  📅 Date &amp; Time (IST)
                </dt>
                <dd style={{ margin: 0, color: 'var(--color-ink)', fontWeight: 700 }}>
                  {event.date}
                  <span
                    style={{
                      display: 'block',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      color: 'var(--color-body)',
                    }}
                  >
                    {event.timeIST}
                  </span>
                </dd>
              </div>

              <div>
                <dt
                  style={{
                    fontSize: '0.73rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--color-muted)',
                    marginBottom: '0.15rem',
                  }}
                >
                  💻 Platform / Venue
                </dt>
                <dd style={{ margin: 0, color: 'var(--color-ink)', fontWeight: 700 }}>
                  {event.venue}
                  <span
                    style={{
                      display: 'block',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      color: 'var(--color-body)',
                    }}
                  >
                    Organised by ISTD Trichur Chapter
                  </span>
                </dd>
              </div>
            </dl>

            <p
              style={{
                fontSize: '0.94rem',
                color: 'var(--color-body)',
                lineHeight: 1.68,
                marginBottom: '0.6rem',
              }}
            >
              Explore the convergence of Artificial Intelligence and the Internet of Things, and how
              research can connect intelligent algorithms with practical applications.
            </p>
            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--color-muted)',
                lineHeight: 1.65,
                marginBottom: 0,
              }}
            >
              We welcome researchers, educators, students, and technology professionals to join us
              for an evening of learning and fresh perspectives on AIoT.
            </p>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              marginTop: '1.5rem',
              paddingTop: '1.15rem',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              alignItems: 'center',
            }}
          >
            <Link href={`/events/${event.slug}`} className="btn btn-primary btn-sm">
              View Details &amp; Poster &rarr;
            </Link>
            {event.registrationAvailable && (
              <Link
                href={`/events/${event.slug}#eventRegistrationFormBox`}
                className="btn btn-red btn-sm"
              >
                Register Now &rarr;
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function PastEventCard({ event }: { event: ChapterEvent }) {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) return;
    router.push(`/events/${event.slug}`);
  };

  return (
    <article
      className="upcoming-event-card clickable-event-card"
      onClick={handleCardClick}
      style={{
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}
    >
      <div>
        {/* Event Image */}
        <div
          style={{
            position: 'relative',
            aspectRatio: event.isPosterImage ? '1/1' : '16/10',
            maxHeight: event.isPosterImage ? '360px' : '260px',
            width: '100%',
            overflow: 'hidden',
            background: '#071524',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <img
            src={assetUrl(event.image)}
            alt={event.imageCaption}
            style={{
              width: '100%',
              height: '100%',
              objectFit: event.isPosterImage ? 'contain' : 'cover',
              display: 'block',
            }}
            loading="lazy"
          />
          <div
            style={{
              position: 'absolute',
              top: '0.85rem',
              left: '0.85rem',
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                background: 'rgba(12, 27, 56, 0.9)',
                color: '#fff',
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '0.3rem 0.7rem',
                borderRadius: '999px',
              }}
            >
              {event.programmeType}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div style={{ padding: '1.5rem' }}>
          <div
            style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--brand-blue)',
              marginBottom: '0.45rem',
            }}
          >
            📅 {event.date} {event.timeIST ? `• 🕢 ${event.timeIST}` : ''} • {event.venue}
          </div>

          <h3
            style={{
              fontSize: '1.18rem',
              fontWeight: 800,
              color: 'var(--color-ink)',
              marginBottom: '0.6rem',
              lineHeight: 1.35,
            }}
          >
            <Link
              href={`/events/${event.slug}`}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              {event.title}
            </Link>
          </h3>

          {event.speaker && (
            <div
              style={{
                fontSize: '0.84rem',
                color: 'var(--color-ink)',
                background: 'var(--color-surface-soft)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.55rem 0.75rem',
                marginBottom: '0.75rem',
              }}
            >
              <strong>🎙️ Speaker: {event.speaker}</strong>
              {event.speakerDesignation && (
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.79rem',
                    color: 'var(--color-muted)',
                    marginTop: '0.12rem',
                  }}
                >
                  {event.speakerDesignation}
                </span>
              )}
            </div>
          )}

          <p
            style={{
              fontSize: '0.92rem',
              color: 'var(--color-body)',
              lineHeight: 1.65,
              marginBottom: 0,
            }}
          >
            {event.shortDescription}
          </p>
        </div>
      </div>

      {/* Action Buttons: View Report & Photos */}
      <div
        style={{
          padding: '1rem 1.5rem 1.35rem',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.65rem',
          alignItems: 'center',
        }}
      >
        <Link href={`/events/${event.slug}`} className="btn btn-primary btn-sm">
          View Report &amp; Photos &rarr;
        </Link>
        {event.hasPhotoGallery && (
          <Link href={`/events/${event.slug}#eventPhotosSection`} className="btn btn-outline-navy btn-sm">
            24 Event Photos
          </Link>
        )}
      </div>
    </article>
  );
}
