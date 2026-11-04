import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PhotoCard } from '@/components/PhotoCard';
import {
  CHAPTER_EVENTS,
  INAUGURATION_DIGNITARIES,
  CHAPTER_CORE_CONTRIBUTORS,
  OFFICIAL_LINKS,
  assetUrl,
} from '@/data/siteData';

export const metadata: Metadata = {
  title: 'Chapter Events & Milestones | ISTD Thrissur (Trichur) Chapter',
  description:
    'ISTD Trichur Chapter Inaugurated as Diamond Chapter in ISTD’s 55th Year on 30 March 2026, alongside executive L&D sessions, webinars, and knowledge-sharing forums.',
};

export default function EventsPage() {
  return (
    <>
      {/* Page Hero Header */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Events &amp; Milestones</span>
          </div>
          <h1 className="page-hero-title">Chapter Events &amp; Milestones</h1>
          <p className="page-hero-subtitle">
            Official chronicles of our chapter milestones, leadership conclaves, and executive
            learning sessions advancing L&amp;D across Central Kerala.
          </p>
        </div>
      </section>

      {/* Flagship Event Feature: ISTD Trichur Chapter Inaugurated as Diamond Chapter */}
      <section className="section-padding bg-white" id="inaugurationEvent">
        <div className="container">
          {/* Top Event Header Card */}
          <article
            style={{
              background: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)',
              borderRadius: 'var(--radius-xl)',
              border: '1.5px solid var(--border-light)',
              boxShadow: 'var(--shadow-lg)',
              overflow: 'hidden',
              marginBottom: '3rem',
            }}
          >
            {/* Accent Banner Top */}
            <div
              style={{
                background:
                  'linear-gradient(125deg, var(--color-primary-navy) 0%, #102E4A 55%, var(--color-primary-blue) 100%)',
                padding: '2.5rem 2.25rem',
                color: '#FFFFFF',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                }}
              >
                <span
                  style={{
                    background: 'var(--accent-yellow-bright)',
                    color: 'var(--color-primary-navy)',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '999px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  ★ Historic Chapter Milestone • 30 March 2026
                </span>
                <span
                  style={{
                    background: 'rgba(255,255,255,0.14)',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '0.78rem',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(255,255,255,0.24)',
                  }}
                >
                  ISTD’s 55th Year • Diamond Chapter
                </span>
                <span
                  style={{
                    background: 'rgba(255,255,255,0.14)',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '0.78rem',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(255,255,255,0.24)',
                  }}
                >
                  📍 Hotel Pearl Regency, Thrissur
                </span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(1.65rem, 3.2vw, 2.4rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.22,
                  marginBottom: '1rem',
                }}
              >
                ISTD Trichur Chapter Inaugurated as Diamond Chapter in ISTD’s 55th Year
              </h2>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.85rem',
                  alignItems: 'center',
                }}
              >
                <a
                  href={OFFICIAL_LINKS.istdTrichurLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm"
                  style={{
                    background: '#0A66C2',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255,255,255,0.25)',
                  }}
                >
                  <span>Follow ISTD Trichur on LinkedIn</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.3"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
                <a
                  href={OFFICIAL_LINKS.istdNationalLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-white"
                >
                  <span>Indian Society for Training &amp; Development (ISTD)</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.3"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Main Event Narrative & Featured Photo Grid */}
            <div style={{ padding: 'clamp(1.5rem, 3vw, 2.75rem)' }}>
              <div className="split-grid" style={{ alignItems: 'start', gap: '2.5rem' }}>
                {/* Left Column: Official Communiqué */}
                <div>
                  <span className="section-tag tag-blue">Official Event Report</span>
                  <h3
                    style={{
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      color: 'var(--color-ink)',
                      marginBottom: '1.15rem',
                    }}
                  >
                    Establishing a Premier Platform for Training, Learning &amp; HRD Excellence
                  </h3>

                  <p
                    style={{
                      fontSize: '1.02rem',
                      color: 'var(--color-body)',
                      lineHeight: 1.78,
                      marginBottom: '1.15rem',
                    }}
                  >
                    We are pleased to share the successful inauguration of the{' '}
                    <a
                      href={OFFICIAL_LINKS.istdTrichurLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: 'var(--color-primary-blue)',
                        fontWeight: 700,
                        textDecoration: 'underline',
                      }}
                    >
                      ISTD Trichur Chapter
                    </a>{' '}
                    on <strong>30 March 2026</strong>, marking the establishment of the{' '}
                    <strong>Diamond Chapter</strong> of the{' '}
                    <a
                      href={OFFICIAL_LINKS.istdNationalLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: 'var(--color-primary-blue)',
                        fontWeight: 700,
                        textDecoration: 'underline',
                      }}
                    >
                      Indian Society for Training &amp; Development (ISTD)
                    </a>{' '}
                    in its <strong>55th year</strong>.
                  </p>

                  <p
                    style={{
                      fontSize: '1rem',
                      color: 'var(--color-body)',
                      lineHeight: 1.78,
                      marginBottom: '1.15rem',
                    }}
                  >
                    The launch of the Trichur Chapter reflects a collective commitment to
                    strengthening the training and development ecosystem by creating a professional
                    platform for learning, knowledge exchange, collaboration, and leadership
                    development.
                  </p>

                  <p
                    style={{
                      fontSize: '1rem',
                      color: 'var(--color-body)',
                      lineHeight: 1.78,
                      marginBottom: '1.5rem',
                    }}
                  >
                    The chapter is envisioned as a space that brings together trainers, educators,
                    HR professionals, academicians, and industry leaders to contribute meaningfully
                    to professional growth in the region.
                  </p>

                  {/* Purpose Callout */}
                  <div
                    style={{
                      background: 'var(--bg-pale-blue)',
                      borderLeft: '4px solid var(--accent-red)',
                      padding: '1.25rem 1.5rem',
                      borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '0.96rem',
                        fontWeight: 600,
                        color: 'var(--color-primary-navy)',
                        lineHeight: 1.68,
                        marginBottom: 0,
                      }}
                    >
                      “The <strong>ISTD Trichur Chapter</strong> begins its journey with a clear
                      purpose: to support professional excellence in training, learning, and human
                      resource development through meaningful engagement and sustained
                      collaboration.”
                    </p>
                  </div>
                </div>

                {/* Right Column: Featured Event Photographs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  <PhotoCard
                    src="/photos/istd-22.jpeg"
                    alt="ISTD Trichur Diamond Chapter Inauguration Ceremonial Lamp Lighting"
                    title="Ceremonial Lamp Lighting — ISTD Trichur Diamond Chapter Inauguration"
                    caption="Chairman Shri. Tony Chacko and Regional Vice President (South) Prof. (Dr.) Zakkariya K A lighting the ceremonial Nilavilakku alongside National President Shri. Atul Shah, National Treasurer Shri. Nabaghana Pany, and Past National President Dr. Yogesh Kumar Upadhyay."
                    category="30 March 2026 • Inauguration"
                    badgeText="30 March 2026 • Click to Expand"
                    headingText="Ceremonial Lamp Lighting by National & Chapter Leaders"
                    aspectRatio="16/10"
                  />
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '1rem',
                    }}
                  >
                    <PhotoCard
                      src="/photos/team-istd.jpeg"
                      alt="ISTD National Leaders and Trichur Chapter Cohort"
                      title="ISTD National Executive & Trichur Chapter Cohort"
                      caption="Full group portrait of National President Shri. Atul Shah, Past National President Dr. Yogesh Kumar Upadhyay, National Treasurer Shri. Nabaghana Pany, Regional VP Prof. (Dr.) Zakkariya K A, Chairman Shri. Tony Chacko, and the ISTD Trichur Chapter members."
                      category="Chapter Fraternity"
                      badgeText="Full Cohort"
                      headingText="National Leaders & Chapter Fraternity"
                      aspectRatio="4/3"
                      compactCaption
                    />
                    <PhotoCard
                      src="/photos/istd-in.jpeg"
                      alt="Oath Taking and Installation of Office Bearers"
                      title="Installation of Office Bearers & Managing Committee"
                      caption="National President Shri. Atul Shah administering the solemn oath of office to Chairman Shri. Tony Chacko, Secretary Ms. Sneha Rose George, Treasurer Mr. Jibin N, and Managing Committee members."
                      category="Installation Ceremony"
                      badgeText="Installation"
                      headingText="Swearing-In of Office Bearers"
                      aspectRatio="4/3"
                      compactCaption
                    />
                  </div>
                </div>
              </div>

              {/* Distinguished ISTD Leaders Section */}
              <div
                style={{
                  marginTop: '3rem',
                  paddingTop: '2.5rem',
                  borderTop: '1.5px solid var(--border-light)',
                }}
              >
                <div style={{ marginBottom: '1.75rem' }}>
                  <span className="section-tag tag-red">Guests of Honour &amp; Dignitaries</span>
                  <h3
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: 'var(--color-ink)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Distinguished ISTD Leaders Who Graced the Occasion
                  </h3>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', marginBottom: 0 }}>
                    We were honoured by the presence of national and regional ISTD leaders who
                    officiated the inauguration and installation of office bearers:
                  </p>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1.25rem',
                  }}
                >
                  {INAUGURATION_DIGNITARIES.map((leader) => (
                    <div
                      key={leader.name}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: 'var(--radius-lg)',
                        border: '1.5px solid var(--border-light)',
                        padding: '1.35rem',
                        boxShadow: 'var(--shadow-xs)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '1rem',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            width: '100%',
                            aspectRatio: '16/10',
                            borderRadius: 'var(--radius-md)',
                            overflow: 'hidden',
                            marginBottom: '1rem',
                            background: 'var(--bg-pale-blue)',
                          }}
                        >
                          <img
                            src={assetUrl(leader.photo)}
                            alt={leader.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                            loading="lazy"
                          />
                        </div>
                        <h4
                          style={{
                            fontSize: '1.05rem',
                            fontWeight: 800,
                            color: 'var(--color-ink)',
                            marginBottom: '0.25rem',
                          }}
                        >
                          {leader.name}
                        </h4>
                        <p
                          style={{
                            fontSize: '0.86rem',
                            fontWeight: 600,
                            color: 'var(--color-primary-blue)',
                            marginBottom: 0,
                          }}
                        >
                          {leader.designation}
                        </p>
                      </div>

                      <a
                        href={leader.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          color: '#0A66C2',
                          paddingTop: '0.65rem',
                          borderTop: '1px solid var(--border-light)',
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                        <span>View LinkedIn Profile &rarr;</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Appreciation & Chapter Contributors Section */}
              <div
                style={{
                  marginTop: '2.75rem',
                  background: 'var(--bg-pale-blue)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem',
                  border: '1.5px solid var(--border-light)',
                }}
              >
                <span className="section-tag tag-blue">Gratitude &amp; Appreciation</span>
                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: 'var(--color-ink)',
                    marginBottom: '0.75rem',
                  }}
                >
                  Acknowledging Our Leadership Team, Office Bearers &amp; Core Contributors
                </h3>
                <p
                  style={{
                    fontSize: '0.96rem',
                    color: 'var(--color-body)',
                    lineHeight: 1.72,
                    marginBottom: '1.25rem',
                  }}
                >
                  The successful formation and inauguration of the chapter, along with the strong
                  membership response and installation of office bearers, reflect the dedication,
                  coordination, and shared vision of everyone involved in this initiative. We place
                  on record our sincere appreciation to the leadership team, office bearers,
                  members, and all those who contributed to making this occasion a success:
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.65rem',
                    marginBottom: '1.25rem',
                  }}
                >
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
                          background: '#FFFFFF',
                          border: '1.5px solid #BFDBFE',
                          padding: '0.5rem 0.95rem',
                          borderRadius: '999px',
                          fontSize: '0.86rem',
                          fontWeight: 700,
                          color: 'var(--color-primary-navy)',
                          boxShadow: 'var(--shadow-xs)',
                        }}
                      >
                        <span>{person.name}</span>
                        <span
                          style={{
                            fontSize: '0.74rem',
                            color: '#0A66C2',
                            fontWeight: 800,
                          }}
                        >
                          in ↗
                        </span>
                      </a>
                    ) : (
                      <span
                        key={person.name}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          background: '#FFFFFF',
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
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      background: 'var(--color-primary-navy)',
                      color: '#FFFFFF',
                      padding: '0.5rem 1rem',
                      borderRadius: '999px',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                    }}
                  >
                    &amp; the Wider ISTD Trichur Chapter Community
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* Inauguration Event Visual Highlights (8 Curated Moments) */}
          <div className="section-header text-center">
            <span className="section-tag tag-red">Event Visual Archive</span>
            <h2 className="section-title">Glimpses from the Inauguration Ceremony</h2>
            <p className="section-subtitle">
              Key moments from the 30th March 2026 ceremony at Hotel Pearl Regency, Thrissur. Click
              any photograph to launch the fullscreen viewer, or explore all 24 official photos in
              the Gallery.
            </p>
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
              alt="Charter Presentation by National President Shri. Atul Shah"
              title="Diamond Chapter Charter Presentation"
              caption="National President Shri. Atul Shah presenting the official Diamond Chapter Charter to Regional VP Prof. (Dr.) Zakkariya K A as National Treasurer Shri. Nabaghana Pany applauds."
              category="Charter Handover"
              badgeText="Charter Presentation"
              headingText="National President Shri. Atul Shah"
              aspectRatio="4/3"
              compactCaption
            />
            <PhotoCard
              src="/photos/istd-tony-chacko.jpeg"
              alt="Chairman Shri. Tony Chacko Inaugural Address"
              title="Chairman Shri. Tony Chacko's Inaugural Address"
              caption="Chairman Shri. Tony Chacko outlining the vision and roadmap of the ISTD Trichur Chapter."
              category="Chairman's Address"
              badgeText="Chairman's Address"
              headingText="Shri. Tony Chacko Addressing the Gathering"
              aspectRatio="4/3"
              compactCaption
            />
            <PhotoCard
              src="/photos/istd-calicut.jpeg"
              alt="Inaugural Dais at Hotel Pearl Regency Thrissur"
              title="Presidential & Keynote Addresses on the Dais"
              caption="Dr. Yogesh Kumar Upadhyay, Shri. Nabaghana Pany, Shri. Atul Shah, Prof. (Dr.) Zakkariya K A, and Shri. Tony Chacko on the inaugural dais."
              category="Keynote Session"
              badgeText="Keynote Session"
              headingText="Dignitaries on the Inaugural Dais"
              aspectRatio="4/3"
              compactCaption
            />
            <PhotoCard
              src="/photos/istd-treasurer.jpeg"
              alt="Address by Treasurer Mr. Jibin N"
              title="Address by Chapter Treasurer Mr. Jibin N"
              caption="Chapter Treasurer Mr. Jibin N addressing the gathering with National leaders on the dais."
              category="Vote of Thanks"
              badgeText="Chapter Address"
              headingText="Treasurer Mr. Jibin N Addressing Delegates"
              aspectRatio="4/3"
              compactCaption
            />
            <PhotoCard
              src="/photos/istd-sneha.jpeg"
              alt="Felicitation of Secretary Ms. Sneha Rose George"
              title="Felicitation of Secretary Ms. Sneha Rose George"
              caption="Regional VP Prof. (Dr.) Zakkariya K A presenting a floral memento to Chapter Secretary Ms. Sneha Rose George."
              category="Felicitations"
              badgeText="Felicitations"
              headingText="Honoring Secretary Ms. Sneha Rose George"
              aspectRatio="4/3"
              compactCaption
            />
            <PhotoCard
              src="/photos/istd-participants.jpeg"
              alt="Felicitation of Past National President Dr. Yogesh Kumar Upadhyay"
              title="Honoring Past National President Dr. Yogesh Kumar Upadhyay"
              caption="Treasurer Mr. Jibin N draping the traditional ponnada to Dr. Yogesh Kumar Upadhyay."
              category="Dignitary Honor"
              badgeText="Dignitary Honor"
              headingText="Honoring Dr. Yogesh Kumar Upadhyay"
              aspectRatio="4/3"
              compactCaption
            />
            <PhotoCard
              src="/photos/istd-national-treasurer.jpeg"
              alt="Honoring National Treasurer Shri. Nabaghana Pany"
              title="Honoring National Treasurer Shri. Nabaghana Pany"
              caption="Honoring ISTD National Treasurer Shri. Nabaghana Pany on stage."
              category="Dignitary Honor"
              badgeText="Dignitary Honor"
              headingText="Honoring Shri. Nabaghana Pany"
              aspectRatio="4/3"
              compactCaption
            />
            <PhotoCard
              src="/photos/istd-audience.jpeg"
              alt="Gathering of L&D Leaders and Delegates"
              title="August Gathering of HR & L&D Professionals"
              caption="HR leaders, corporate trainers, academicians, and chapter members participating in the ceremony."
              category="Chapter Community"
              badgeText="Delegate Audience"
              headingText="HR Leaders, Trainers & Academicians"
              aspectRatio="4/3"
              compactCaption
            />
          </div>

          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <Link href="/gallery" className="btn btn-red btn-lg">
              <span>Open Full 24-Photo Event Gallery</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Knowledge Sharing Sessions, Webinars & Learning Forums */}
      <section className="section-padding bg-pale-blue" id="knowledgeSessions">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-blue">Continuous Learning</span>
            <h2 className="section-title">Knowledge Sharing Sessions &amp; Webinars</h2>
            <p className="section-subtitle">
              Executive webinars, Foundation Day sessions, and interactive workshops hosted by the
              ISTD Thrissur Chapter.
            </p>
          </div>

          <div className="events-grid">
            {CHAPTER_EVENTS.map((ev) => (
              <article className="event-card" key={ev.id}>
                <div className="event-image-box">
                  <img
                    src={assetUrl(ev.image)}
                    alt={ev.title}
                    width={560}
                    height={230}
                    loading="lazy"
                  />
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
                        color: 'var(--color-primary-navy)',
                      }}
                    >
                      {ev.venueOrMode}
                    </span>
                    <Link href="/contact" className="btn btn-outline-navy btn-sm">
                      Enquire Next Cohort
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
