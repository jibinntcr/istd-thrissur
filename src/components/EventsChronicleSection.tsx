'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PhotoCard } from './PhotoCard';
import {
  INAUGURATION_DIGNITARIES,
  CHAPTER_CORE_CONTRIBUTORS,
  OFFICIAL_LINKS,
  assetUrl,
} from '@/data/siteData';

type EventTab = 'all' | 'upcoming' | 'past';

interface EventsChronicleSectionProps {
  mode?: 'preview' | 'full';
}

const UPCOMING_EVENTS = [
  {
    id: 'upcoming-ai-roundtable',
    statusBadge: 'Upcoming Session • Registration Open',
    category: 'Executive L&D Forum',
    dateLabel: 'Upcoming • 2026–27 Series',
    modeLabel: 'Hybrid / Thrissur & Online',
    title: 'From AI Assistants to AI Agents: Transforming Workplace Learning & HRD',
    speaker: 'Expert Panel & Industry Practitioners',
    description:
      'An interactive chapter learning session exploring how HR leaders, corporate trainers, and educators can adopt agentic AI workflows for instructional design, talent development, and organizational productivity.',
    highlights: [
      'Practical AI workflows for L&D and HR teams',
      'Live demonstration & peer discussion',
      'Open to ISTD members, trainers, educators & HR professionals',
    ],
  },
  {
    id: 'upcoming-academia-conclave',
    statusBadge: 'Upcoming Conclave • Open for Tie-Ups',
    category: 'Industry–Academia Dialogue',
    dateLabel: 'Upcoming • 2026–27 Series',
    modeLabel: 'In-Person • Thrissur, Kerala',
    title: 'Industry–Academia Conclave: Bridging Campus Pedagogy & Corporate Readiness',
    speaker: 'CHROs, Academic Deans & ISTD Trichur Leadership',
    description:
      'A collaborative regional forum bringing together university educators, B-school faculty, and corporate talent heads across Central Kerala to align graduate capabilities with modern industry demands.',
    highlights: [
      'CHRO & Academic Leadership panel',
      'Campus-to-Corporate employability frameworks',
      'Institutional partnership opportunities with ISTD Trichur',
    ],
  },
];

export function EventsChronicleSection({ mode = 'full' }: EventsChronicleSectionProps) {
  const [activeTab, setActiveTab] = useState<EventTab>('all');

  const showPast = activeTab === 'all' || activeTab === 'past';
  const showUpcoming = activeTab === 'all' || activeTab === 'upcoming';

  return (
    <section
      className="section-padding bg-white"
      id="eventsChroniclesSection"
      aria-label="Upcoming Events and Past Event Reports"
    >
      <div className="container">
        {/* Section Header + Interactive Tab Bar */}
        <div className="events-chronicle-header">
          <div>
            <span className="section-tag tag-blue">Events &amp; Chapter Chronicles</span>
            <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
              Upcoming Events &amp; Past Event Reports
            </h2>
            <p
              style={{
                color: 'var(--color-muted)',
                fontSize: '1rem',
                maxWidth: '640px',
                marginBottom: 0,
                lineHeight: 1.6,
              }}
            >
              Official post-event executive reports, chapter milestones, and our upcoming calendar
              of knowledge-sharing sessions in Thrissur.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="events-tab-bar" role="tablist" aria-label="Filter events by status">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'all'}
              className={`events-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              <span>All Events &amp; Reports</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'past'}
              className={`events-tab-btn ${activeTab === 'past' ? 'active' : ''}`}
              onClick={() => setActiveTab('past')}
            >
              <span>Past Event Reports</span>
              <span className="events-tab-badge">1 Report</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'upcoming'}
              className={`events-tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              <span className="pulse-dot-green" aria-hidden="true" />
              <span>Upcoming Events</span>
              <span className="events-tab-badge">{UPCOMING_EVENTS.length}</span>
            </button>
          </div>
        </div>

        {/* =====================================================================
            PART 1: PAST EVENT REPORTS & ARCHIVES
           ===================================================================== */}
        {showPast && (
          <div id="pastEventReports" style={{ marginBottom: showUpcoming ? '3.5rem' : 0 }}>
            <div className="events-sub-heading">
              <div className="events-sub-title-group">
                <span className="events-status-pill past-pill">Official Post-Event Report</span>
                <h3>Past Events &amp; Executive Reports</h3>
              </div>
              {mode === 'preview' && (
                <Link href="/events#inaugurationReport" className="btn btn-outline-navy btn-sm">
                  View Complete Event Report &rarr;
                </Link>
              )}
            </div>

            {/* Official Inauguration Event Report Card */}
            <article className="event-report-card" id="inaugurationReport">
              {/* Top Royal Navy Banner */}
              <div className="event-report-banner">
                <div className="event-report-badges">
                  <span className="report-gold-badge">
                    ★ Event Report #01 • 30 March 2026
                  </span>
                  <span className="report-glass-badge">
                    ISTD’s 55th Year • Diamond Chapter
                  </span>
                  <span className="report-glass-badge">
                    📍 Hotel Pearl Regency, Thrissur
                  </span>
                </div>

                <h3 className="event-report-main-title">
                  ISTD Trichur Chapter Inaugurated as Diamond Chapter in ISTD’s 55th Year
                </h3>

                <div className="event-report-social-links">
                  <a
                    href={OFFICIAL_LINKS.istdTrichurLinkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm report-linkedin-btn"
                  >
                    <span>ISTD Trichur on LinkedIn</span>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
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
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Report Body */}
              <div className="event-report-body">
                <div className="split-grid" style={{ alignItems: 'start', gap: '2.25rem' }}>
                  {/* Left Narrative */}
                  <div>
                    <span className="section-tag tag-red">Executive Summary</span>
                    <h4
                      style={{
                        fontSize: '1.35rem',
                        fontWeight: 800,
                        color: 'var(--color-ink)',
                        marginBottom: '1rem',
                      }}
                    >
                      Launch of the Diamond Chapter &amp; Installation of Office Bearers
                    </h4>

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
                      strengthening the training and development ecosystem by creating a
                      professional platform for learning, knowledge exchange, collaboration, and
                      leadership development.
                    </p>

                    <p className="report-paragraph">
                      The chapter is envisioned as a space that brings together trainers,
                      educators, HR professionals, academicians, and industry leaders to contribute
                      meaningfully to professional growth in the region.
                    </p>

                    <div className="report-quote-box">
                      <p>
                        “The <strong>ISTD Trichur Chapter</strong> begins its journey with a clear
                        purpose: to support professional excellence in training, learning, and human
                        resource development through meaningful engagement and sustained
                        collaboration.”
                      </p>
                    </div>

                    {mode === 'preview' && (
                      <div className="btn-group" style={{ marginTop: '1.5rem' }}>
                        <Link href="/events#inaugurationReport" className="btn btn-primary">
                          <span>Read Full Event Report &amp; Dignitaries</span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </Link>
                        <Link href="/gallery" className="btn btn-outline-navy">
                          <span>View 24 Event Photos</span>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Right Photo Collage */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <PhotoCard
                      src="/photos/istd-22.jpeg"
                      alt="ISTD Trichur Diamond Chapter Inauguration Ceremonial Lamp Lighting"
                      title="Ceremonial Lamp Lighting — 30 March 2026"
                      caption="Chairman Shri. Tony Chacko and Regional Vice President (South) Prof. (Dr.) Zakkariya K A lighting the ceremonial Nilavilakku alongside National President Shri. Atul Shah, National Treasurer Shri. Nabaghana Pany, and Past National President Dr. Yogesh Kumar Upadhyay."
                      category="Event Report • 30 March 2026"
                      badgeText="30 March 2026 • Click to Expand"
                      headingText="Ceremonial Lamp Lighting by Dignitaries"
                      aspectRatio="16/10"
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <PhotoCard
                        src="/photos/team-istd.jpeg"
                        alt="ISTD National Leaders and Trichur Chapter Cohort"
                        title="ISTD National Executive & Trichur Chapter Cohort"
                        caption="National President Shri. Atul Shah, Past National President Dr. Yogesh Kumar Upadhyay, National Treasurer Shri. Nabaghana Pany, Regional VP Prof. (Dr.) Zakkariya K A, and Chairman Shri. Tony Chacko with the chapter cohort."
                        category="Chapter Cohort"
                        badgeText="Group Portrait"
                        headingText="National Leaders & Chapter Cohort"
                        aspectRatio="4/3"
                        compactCaption
                      />
                      <PhotoCard
                        src="/photos/istd-in.jpeg"
                        alt="Installation of Office Bearers"
                        title="Installation of Office Bearers"
                        caption="National President Shri. Atul Shah administering the oath of office to the newly installed Office Bearers and Managing Committee."
                        category="Installation"
                        badgeText="Installation"
                        headingText="Oath of Office Bearers"
                        aspectRatio="4/3"
                        compactCaption
                      />
                    </div>
                  </div>
                </div>

                {/* Dignitaries & Appreciation Full Details (Always shown in full mode, and compactly summarized in preview mode) */}
                {mode === 'full' ? (
                  <>
                    {/* Distinguished ISTD Leaders */}
                    <div className="report-divider-section">
                      <span className="section-tag tag-blue">Guests of Honour</span>
                      <h4 className="report-sub-heading">
                        Distinguished ISTD Leaders Who Graced the Occasion
                      </h4>
                      <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
                        We were honoured by the presence of distinguished national and regional ISTD
                        leaders:
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
                              <h5 className="dignitary-name">{leader.name}</h5>
                              <p className="dignitary-role">{leader.designation}</p>
                            </div>
                            <a
                              href={leader.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="dignitary-linkedin-link"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
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
                      <span className="section-tag tag-red">Record of Appreciation</span>
                      <h4 className="report-sub-heading">
                        Leadership Team, Office Bearers &amp; Core Contributors
                      </h4>
                      <p className="report-paragraph" style={{ marginBottom: '1.25rem' }}>
                        The successful formation and inauguration of the chapter, along with the
                        strong membership response and installation of office bearers, reflect the
                        dedication, coordination, and shared vision of everyone involved in this
                        initiative. We place on record our sincere appreciation to the leadership
                        team, office bearers, members, and all those who contributed to making this
                        occasion a success:
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
                          &amp; the Wider ISTD Trichur Chapter Community
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="report-preview-dignitary-strip">
                    <span className="strip-label">Graced By Distinguished ISTD Leaders:</span>
                    <div className="strip-pills">
                      {INAUGURATION_DIGNITARIES.map((d) => (
                        <a
                          key={d.name}
                          href={d.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contributor-pill linked"
                        >
                          <span>
                            <strong>{d.name}</strong> ({d.designation.replace(', ISTD', '')})
                          </span>
                          <span className="in-badge">in ↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          </div>
        )}

        {/* =====================================================================
            PART 2: UPCOMING EVENTS CALENDAR
           ===================================================================== */}
        {showUpcoming && (
          <div id="upcomingEvents">
            <div className="events-sub-heading">
              <div className="events-sub-title-group">
                <span className="events-status-pill upcoming-pill">
                  <span className="pulse-dot-green" aria-hidden="true" />
                  Upcoming Calendar
                </span>
                <h3>Upcoming Chapter Events &amp; Learning Sessions</h3>
              </div>
              <Link href="/contact" className="btn btn-outline-blue btn-sm">
                Propose a Topic / Speak &rarr;
              </Link>
            </div>

            <div className="upcoming-events-grid">
              {UPCOMING_EVENTS.map((ev) => (
                <article className="upcoming-event-card" key={ev.id}>
                  <div>
                    <div className="upcoming-card-top">
                      <span className="upcoming-badge">{ev.statusBadge}</span>
                      <span className="upcoming-category">{ev.category}</span>
                    </div>
                    <h4 className="upcoming-title">{ev.title}</h4>
                    <div className="upcoming-meta-row">
                      <span>📅 {ev.dateLabel}</span>
                      <span>•</span>
                      <span>📍 {ev.modeLabel}</span>
                    </div>
                    <p className="upcoming-desc">{ev.description}</p>
                    <ul className="upcoming-highlights">
                      {ev.highlights.map((h) => (
                        <li key={h}>✓ {h}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="upcoming-card-footer">
                    <span className="upcoming-speaker">{ev.speaker}</span>
                    <Link href="/contact" className="btn btn-primary btn-sm">
                      Register Interest &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
