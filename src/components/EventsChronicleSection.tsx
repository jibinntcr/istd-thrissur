'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ALL_CHAPTER_EVENTS, assetUrl, ChapterEvent } from '@/data/siteData';

type EventTab = 'upcoming' | 'past';

interface EventsChronicleSectionProps {
  initialTab?: EventTab;
}

export function EventsChronicleSection({
  initialTab = 'upcoming',
}: EventsChronicleSectionProps) {
  const [activeTab, setActiveTab] = useState<EventTab>(initialTab);

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
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const upcomingEvents = ALL_CHAPTER_EVENTS.filter((e) => e.status === 'upcoming');
  // Past events ordered most recent first (11 April 2026 first, then 30 March 2026)
  const pastEvents = ALL_CHAPTER_EVENTS.filter((e) => e.status === 'past');

  return (
    <section
      className="section-padding bg-white"
      id="eventsProgrammesSection"
      aria-label="Events and Programmes"
    >
      <div className="container">
        {/* Two-Tab Navigation Bar: Upcoming Events (First) | Past Events */}
        <div
          className="events-chronicle-header"
          style={{ marginBottom: '2rem', paddingBottom: '1.25rem' }}
        >
          <div>
            <span className="section-tag tag-blue">Chapter Calendar &amp; Archive</span>
            <h2 className="section-title" style={{ marginBottom: '0.35rem' }}>
              {activeTab === 'upcoming' ? 'Upcoming Events' : 'Past Events'}
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
                ? 'Scheduled learning sessions, webinars, and programmes organised by the ISTD Thrissur Chapter.'
                : 'Summaries, reports, and photographic records of completed chapter programmes and milestones.'}
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
              <span>Past Events</span>
              <span className="events-tab-badge">{pastEvents.length}</span>
            </button>
          </div>
        </div>

        {/* =====================================================================
            TAB 1: UPCOMING EVENTS (SHOWN FIRST)
           ===================================================================== */}
        {activeTab === 'upcoming' && (
          <div
            id="panel-upcoming"
            role="tabpanel"
            aria-labelledby="tab-upcoming"
          >
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
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
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
            TAB 2: PAST EVENTS (MOST RECENT FIRST)
           ===================================================================== */}
        {activeTab === 'past' && (
          <div
            id="panel-past"
            role="tabpanel"
            aria-labelledby="tab-past"
          >
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
  return (
    <article
      className="upcoming-event-card"
      style={{
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        {/* Event Poster / Relevant Image */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '16/9',
            overflow: 'hidden',
            background: 'var(--brand-navy-deep)',
          }}
        >
          <img
            src={assetUrl(event.image)}
            alt={event.imageCaption}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
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
                background: 'var(--brand-navy)',
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

        {/* Card Content */}
        <div style={{ padding: '1.5rem' }}>
          <h3
            style={{
              fontSize: '1.22rem',
              fontWeight: 800,
              color: 'var(--color-ink)',
              marginBottom: '0.85rem',
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

          {/* Structured Event Metadata: Date, Time (IST), Venue/Platform, Speaker */}
          <dl
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '0.45rem',
              margin: '0 0 1rem 0',
              padding: '0.85rem 1rem',
              background: 'var(--color-surface-soft)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              fontSize: '0.85rem',
            }}
          >
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <dt style={{ fontWeight: 700, color: 'var(--brand-navy)', minWidth: '72px' }}>
                Date:
              </dt>
              <dd style={{ margin: 0, color: 'var(--color-ink)', fontWeight: 600 }}>
                {event.date}
              </dd>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <dt style={{ fontWeight: 700, color: 'var(--brand-navy)', minWidth: '72px' }}>
                Time:
              </dt>
              <dd style={{ margin: 0, color: 'var(--color-body)' }}>{event.timeIST}</dd>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <dt style={{ fontWeight: 700, color: 'var(--brand-navy)', minWidth: '72px' }}>
                Venue:
              </dt>
              <dd style={{ margin: 0, color: 'var(--color-body)' }}>{event.venue}</dd>
            </div>
            {event.speaker && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <dt style={{ fontWeight: 700, color: 'var(--brand-navy)', minWidth: '72px' }}>
                  Speaker:
                </dt>
                <dd style={{ margin: 0, color: 'var(--color-ink)', fontWeight: 600 }}>
                  {event.speaker}
                  {event.speakerDesignation ? `, ${event.speakerDesignation}` : ''}
                </dd>
              </div>
            )}
          </dl>

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

      {/* Action Buttons */}
      <div
        style={{
          padding: '1rem 1.5rem 1.35rem',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.65rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link href={`/events/${event.slug}`} className="btn btn-primary btn-sm">
          View Details
        </Link>
        {event.registrationAvailable && (
          <Link
            href={`/contact?type=event&event=${encodeURIComponent(event.title)}#contactEnquiryForm`}
            className="btn btn-red btn-sm"
          >
            Register Now
          </Link>
        )}
        {event.brochureUrl && (
          <a
            href={event.brochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-navy btn-sm"
          >
            Download Brochure
          </a>
        )}
      </div>
    </article>
  );
}

export function PastEventCard({ event }: { event: ChapterEvent }) {
  return (
    <article
      className="upcoming-event-card"
      style={{
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        {/* Event Image */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '16/9',
            overflow: 'hidden',
            background: 'var(--brand-navy-deep)',
          }}
        >
          <img
            src={assetUrl(event.image)}
            alt={event.imageCaption}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
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
                background: 'rgba(12, 27, 56, 0.88)',
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
            {event.date} • {event.venue}
          </div>

          <h3
            style={{
              fontSize: '1.18rem',
              fontWeight: 800,
              color: 'var(--color-ink)',
              marginBottom: '0.75rem',
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

      {/* Action Buttons: View Report, View Photos (where available), Watch Recording (where available) */}
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
          View Report
        </Link>
        {event.hasPhotoGallery && (
          <Link href="/gallery" className="btn btn-outline-navy btn-sm">
            View Photos
          </Link>
        )}
        {event.recordingUrl && (
          <a
            href={event.recordingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-blue btn-sm"
          >
            Watch Recording
          </a>
        )}
      </div>
    </article>
  );
}
