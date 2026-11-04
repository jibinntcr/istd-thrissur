import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ALL_CHAPTER_EVENTS,
  INAUGURATION_DIGNITARIES,
  CHAPTER_CORE_CONTRIBUTORS,
  OFFICIAL_LINKS,
  assetUrl,
} from '@/data/siteData';
import { PhotoCard } from '@/components/PhotoCard';

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
              {event.status === 'upcoming' ? 'Upcoming Event' : 'Past Event Report'}
            </span>
          </div>
          <h1 className="page-hero-title" style={{ maxWidth: '920px' }}>
            {event.title}
          </h1>
          <p className="page-hero-subtitle" style={{ maxWidth: '780px' }}>
            {event.date} • {event.timeIST} • {event.venue}
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
                {event.status === 'upcoming' ? 'Programme Overview' : 'Event Report'}
              </span>
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

              {/* Action Buttons */}
              <div className="btn-group" style={{ marginTop: '1.75rem' }}>
                {event.status === 'upcoming' ? (
                  <>
                    <Link
                      href={`/contact?type=event&event=${encodedTitle}#contactEnquiryForm`}
                      className="btn btn-red"
                    >
                      Enquire About This Event
                    </Link>
                    <Link href="/events" className="btn btn-outline-navy">
                      &larr; Back to Events &amp; Programmes
                    </Link>
                  </>
                ) : (
                  <>
                    {event.hasPhotoGallery && (
                      <Link href="/gallery" className="btn btn-primary">
                        View Event Photos in Gallery
                      </Link>
                    )}
                    <Link href="/events#pastEvents" className="btn btn-outline-navy">
                      &larr; Back to Events &amp; Programmes
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Event Metadata Summary Card & Visual */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <PhotoCard
                src={event.image}
                alt={event.imageCaption}
                title={event.title}
                caption={event.imageCaption}
                category={event.programmeType}
                badgeText={event.date}
                headingText={event.title}
                aspectRatio="16/10"
              />

              <div
                style={{
                  padding: '1.5rem',
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
                    marginBottom: '1rem',
                  }}
                >
                  Event Information
                </h3>
                <dl
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '0.65rem',
                    margin: 0,
                    fontSize: '0.9rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                    <dt style={{ fontWeight: 700, color: 'var(--color-muted)' }}>
                      Programme Type
                    </dt>
                    <dd style={{ margin: 0, fontWeight: 700, color: 'var(--color-ink)' }}>
                      {event.programmeType}
                    </dd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                    <dt style={{ fontWeight: 700, color: 'var(--color-muted)' }}>Date</dt>
                    <dd style={{ margin: 0, fontWeight: 700, color: 'var(--color-ink)' }}>
                      {event.date}
                    </dd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                    <dt style={{ fontWeight: 700, color: 'var(--color-muted)' }}>Time (IST)</dt>
                    <dd style={{ margin: 0, color: 'var(--color-body)' }}>{event.timeIST}</dd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                    <dt style={{ fontWeight: 700, color: 'var(--color-muted)' }}>Venue</dt>
                    <dd
                      style={{
                        margin: 0,
                        color: 'var(--color-body)',
                        textAlign: 'right',
                      }}
                    >
                      {event.venue}
                    </dd>
                  </div>
                  {event.speaker && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                      <dt style={{ fontWeight: 700, color: 'var(--color-muted)' }}>Speaker</dt>
                      <dd
                        style={{
                          margin: 0,
                          fontWeight: 700,
                          color: 'var(--brand-navy)',
                          textAlign: 'right',
                        }}
                      >
                        {event.speaker}
                        {event.speakerDesignation ? ` (${event.speakerDesignation})` : ''}
                      </dd>
                    </div>
                  )}
                </dl>

                {isInauguration && (
                  <div
                    style={{
                      marginTop: '1.25rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--color-border)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.6rem',
                    }}
                  >
                    <a
                      href={OFFICIAL_LINKS.istdTrichurLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-navy"
                    >
                      ISTD Trichur on LinkedIn ↗
                    </a>
                    <a
                      href={OFFICIAL_LINKS.istdNationalLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-blue"
                    >
                      ISTD National on LinkedIn ↗
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* =================================================================
              INAUGURATION-SPECIFIC SECTIONS: DIGNITARIES, APPRECIATION & PHOTOS
             ================================================================= */}
          {isInauguration && (
            <>
              {/* Distinguished ISTD Leaders */}
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

              {/* Appreciation & Contributors */}
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

              {/* Selected Photographs from the Inauguration */}
              <div style={{ marginTop: '3rem' }}>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div>
                    <span className="section-tag tag-blue">Photographic Record</span>
                    <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>
                      Photographs from the Inauguration Ceremony
                    </h2>
                    <p style={{ color: 'var(--color-muted)', marginBottom: 0 }}>
                      Selected photographs from the ceremony at Hotel Pearl Regency, Thrissur on 30
                      March 2026.
                    </p>
                  </div>
                  <Link href="/gallery" className="btn btn-outline-navy btn-sm">
                    View All 24 Photos in Gallery &rarr;
                  </Link>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '1.25rem',
                  }}
                >
                  <PhotoCard
                    src="/photos/istd-national-president.jpeg"
                    alt="National President Shri. Atul Shah presenting the Diamond Chapter Charter"
                    title="Presentation of the Diamond Chapter Charter"
                    caption="National President Shri. Atul Shah presenting the Diamond Chapter Charter to Regional Vice President (South) Prof. (Dr.) Zakkariya K A as National Treasurer Shri. Nabaghana Pany looks on."
                    category="Charter Presentation"
                    badgeText="30 March 2026"
                    headingText="Presentation of the Diamond Chapter Charter"
                    aspectRatio="4/3"
                    compactCaption
                  />
                  <PhotoCard
                    src="/photos/istd-in.jpeg"
                    alt="Oath of Office and Installation of Office Bearers"
                    title="Oath of Office and Installation of the Managing Committee"
                    caption="National President Shri. Atul Shah administering the oath of office to Chairman Shri. Tony Chacko, Secretary Ms. Sneha Rose George, Treasurer Mr. Jibin N, and committee members."
                    category="Installation"
                    badgeText="30 March 2026"
                    headingText="Oath of Office and Installation"
                    aspectRatio="4/3"
                    compactCaption
                  />
                  <PhotoCard
                    src="/photos/istd-tony-chacko.jpeg"
                    alt="Inaugural address by Chapter Chairman Shri. Tony Chacko"
                    title="Address by Chapter Chairman Shri. Tony Chacko"
                    caption="Chapter Chairman Shri. Tony Chacko addressing the gathering during the inauguration ceremony on 30 March 2026."
                    category="Addresses"
                    badgeText="30 March 2026"
                    headingText="Address by Chairman Shri. Tony Chacko"
                    aspectRatio="4/3"
                    compactCaption
                  />
                  <PhotoCard
                    src="/photos/team-istd.jpeg"
                    alt="Group photograph of ISTD national leaders and Thrissur Chapter members"
                    title="ISTD National Leaders and Thrissur Chapter Members"
                    caption="National President Shri. Atul Shah, Past National President Dr. Yogesh Kumar Upadhyay, National Treasurer Shri. Nabaghana Pany, Regional VP (South) Prof. (Dr.) Zakkariya K A, and Chairman Shri. Tony Chacko with chapter members."
                    category="Group Photograph"
                    badgeText="30 March 2026"
                    headingText="ISTD National Leaders & Chapter Members"
                    aspectRatio="4/3"
                    compactCaption
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
