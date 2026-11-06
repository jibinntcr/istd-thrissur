import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroShowcase } from '@/components/HeroShowcase';
import {
  ALL_CHAPTER_EVENTS,
  OFFICIAL_LINKS,
  assetUrl,
} from '@/data/siteData';
import { buildPageMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = buildPageMetadata({
  title:
    'ISTD Trichur Chapter (Diamond Chapter) | Indian Society for Training & Development',
  description:
    'Official website of the ISTD Trichur Chapter (Diamond Chapter), inaugurated on 30 March 2026 under the Indian Society for Training & Development (New Delhi, Est. 1970). Explore upcoming L&D programmes, campus student chapters, leadership profiles, photo gallery, and membership.',
  path: '/',
  image: '/photos/istd-22.jpeg',
});

const STRATEGIC_PILLARS = [
  {
    num: '01',
    tag: 'Executive Learning',
    title: 'Corporate L&D & Leadership Forums',
    description:
      'Curated workshops, executive roundtables, and practitioner dialogues connecting HR leaders, corporate trainers, and management consultants across Trichur and Central Kerala.',
    accent: '#2563EB',
  },
  {
    num: '02',
    tag: 'Academic–Industry Bridge',
    title: 'Campus Student Chapters & Mentorship',
    description:
      'Partnering with leading autonomous colleges and universities—beginning with Christ College of Engineering (Autonomous), Irinjalakuda—to mentor future-ready professionals.',
    accent: '#F59E0B',
  },
  {
    num: '03',
    tag: 'Future of Work',
    title: 'AI, Emerging Tech & Learning Ecosystems',
    description:
      'Dedicated knowledge sessions exploring Artificial Intelligence, AIoT, intelligent workflows, and high-performance habits for modern organisations and educators.',
    accent: '#E11D48',
  },
];

export default function HomePage() {
  const upcomingEvents = ALL_CHAPTER_EVENTS.filter(
    (ev) => ev.status === 'upcoming'
  );

  return (
    <>
      {/* 1. Visual-Treat 3D Executive Hero Section */}
      <section className="hero-3d-master-section">
        {/* Lightweight GPU-Accelerated 3D Architectural Atmosphere */}
        <div className="hero-3d-perspective-grid" aria-hidden="true" />
        <div className="hero-3d-aurora-glow glow-1" aria-hidden="true" />
        <div className="hero-3d-aurora-glow glow-2" aria-hidden="true" />
        <div className="hero-3d-light-beam" aria-hidden="true" />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-3d-main-grid">
            {/* Hero Left Column */}
            <div className="hero-3d-copy-col fade-up-anim">
              <div className="hero-3d-pill-row">
                <span className="hero-3d-badge-primary">
                  <span className="hero-3d-live-dot" />
                  <span>ISTD Diamond Chapter • Trichur, Kerala</span>
                </span>
                <span className="hero-3d-badge-gold">
                  ◆ National Body Est. April 1970
                </span>
              </div>

              <h1 className="hero-3d-headline">
                Advancing Excellence in{' '}
                <span className="hero-3d-gradient-text">
                  Training, Leadership &amp;
                </span>{' '}
                Human Resource Development
              </h1>

              <p className="hero-3d-lead">
                Inaugurated on <strong>30 March 2026</strong> in the 55th
                milestone year of the{' '}
                <strong>
                  Indian Society for Training &amp; Development (ISTD, New
                  Delhi)
                </strong>
                , the <strong>ISTD Trichur Chapter</strong> unites trainers, HR
                leaders, academicians, entrepreneurs, and institutions across
                Central Kerala for continuous learning, knowledge exchange, and
                organisational transformation.
              </p>

              {/* Hero Action Buttons */}
              <div className="hero-3d-actions">
                <Link
                  href="/membership"
                  className="btn btn-red btn-lg hero-3d-btn-glow"
                >
                  <span>Become a Member</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="#upcomingProgrammes"
                  className="btn btn-primary btn-lg"
                >
                  <span>Upcoming Programmes</span>
                </Link>
                <Link
                  href="/committee"
                  className="btn btn-outline-white btn-lg"
                >
                  <span>Managing Committee</span>
                </Link>
              </div>

              {/* Clean Institutional Credentials Strip */}
              <div className="hero-3d-credentials-row">
                <div className="hero-3d-cred-item">
                  <span className="cred-check">✓</span>
                  <span>Executive L&amp;D Forums</span>
                </div>
                <span className="cred-dot" aria-hidden="true">
                  •
                </span>
                <div className="hero-3d-cred-item">
                  <span className="cred-check">✓</span>
                  <span>Campus Student Chapters</span>
                </div>
                <span className="cred-dot" aria-hidden="true">
                  •
                </span>
                <div className="hero-3d-cred-item">
                  <span className="cred-check">✓</span>
                  <span>National ISTD Network</span>
                </div>
              </div>
            </div>

            {/* Hero Right Column: Interactive 3D Layered Cinema Stage */}
            <div className="fade-up-anim">
              <HeroShowcase />
            </div>
          </div>

          {/* Unified Glassmorphic Architectural Milestone Ribbon */}
          <div className="hero-3d-metrics-bar">
            {[
              {
                kicker: 'NATIONAL HERITAGE',
                value: 'April 1970',
                label: 'ISTD National Established',
                sub: '55+ Years • New Delhi Headquarters',
                accent: '#38BDF8',
              },
              {
                kicker: 'CHAPTER RECOGNITION',
                value: 'Diamond Chapter',
                label: 'ISTD Trichur Chapter',
                sub: 'Inaugurated 30 March 2026',
                accent: '#FBBF24',
              },
              {
                kicker: 'ACADEMIC BRIDGE',
                value: '1st Student Chapter',
                label: 'Christ College of Engineering',
                sub: 'Autonomous • Irinjalakuda, Trichur',
                accent: '#34D399',
              },
              {
                kicker: 'KNOWLEDGE ECOSYSTEM',
                value: 'Active L&D Hub',
                label: 'Industry–Academia Forum',
                sub: 'Webinars, Workshops & Chapter Connect',
                accent: '#FB7185',
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="hero-3d-metric-card"
                style={
                  { '--metric-accent': stat.accent } as React.CSSProperties
                }
              >
                <span className="hero-3d-metric-kicker">{stat.kicker}</span>
                <div className="hero-3d-metric-value">{stat.value}</div>
                <div className="hero-3d-metric-label">{stat.label}</div>
                <div className="hero-3d-metric-sub">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. High-Visibility Live News & Announcements Bar (Positioned Just Below Hero Section) */}
      <div
        className="upcoming-ticker-bar"
        aria-label="ISTD Trichur Chapter Live Announcements and Upcoming Events"
      >
        <div className="container upcoming-ticker-inner">
          <div className="upcoming-ticker-label">
            <span className="pulse-dot-green" aria-hidden="true" />
            <span>LIVE UPDATES</span>
          </div>

          <div className="upcoming-ticker-viewport">
            <div className="upcoming-ticker-track">
              <Link
                href="/events/advancing-aiot-research"
                className="upcoming-ticker-item"
              >
                <span className="ticker-date-pill">
                  10 NOV 2026 • 7:00 PM IST
                </span>
                <strong>Upcoming Webinar:</strong> “Advancing AIoT Research:
                From Intelligent Algorithms to Real-World Applications” —
                Boopathy (CTO, Monzha Research Labs) &rarr;
              </Link>
              <span className="upcoming-ticker-sep" aria-hidden="true">
                ◆
              </span>
              <Link
                href="/campus-chapters/christ-college-of-engineering"
                className="upcoming-ticker-item"
              >
                <span className="ticker-date-pill gold">CAMPUS MILESTONE</span>
                <strong>First Student Chapter Inaugurated:</strong> Christ
                College of Engineering (Autonomous), Irinjalakuda — Inaugurated
                by Prof. (Dr.) Zakkariya K. A. (National Vice President, ISTD)
                &rarr;
              </Link>
              <span className="upcoming-ticker-sep" aria-hidden="true">
                ◆
              </span>
              <Link
                href="/events/chapter-connect-2026"
                className="upcoming-ticker-item"
              >
                <span className="ticker-date-pill">CHAPTER CONNECT 2026</span>
                <strong>Members’ Orientation &amp; Networking Forum</strong> at
                Hotel Elite International, Trichur — View Highlights &rarr;
              </Link>
              <span className="upcoming-ticker-sep" aria-hidden="true">
                ◆
              </span>
              <Link href="/membership" className="upcoming-ticker-item">
                <span className="ticker-date-pill gold">MEMBERSHIP OPEN</span>
                Join ISTD Trichur Diamond Chapter — Individual, Institutional
                &amp; Student Memberships Available &rarr;
              </Link>
            </div>
          </div>

          <Link
            href="/events/advancing-aiot-research"
            className="upcoming-ticker-cta"
          >
            <span>Register Now</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* 3. Interactive 3D Ecosystem & Institutional Identity */}
      <section className="section-padding bg-white" id="aboutTheChapter">
        <div className="container">
          <div
            className="split-grid"
            style={{
              alignItems: 'center',
              marginBottom: '3.5rem',
              gap: '3rem',
            }}
          >
            {/* Left: Pure-CSS 3D Orbital Ecosystem Visualization */}
            <div>
              <div className="ecosystem-3d-card">
                <div className="ecosystem-3d-header">
                  <span className="ecosystem-3d-tag">
                    ◆ INTERACTIVE 3D LEARNING ECOSYSTEM
                  </span>
                  <h3>Connecting Industry, Academia &amp; Future Skills</h3>
                </div>

                {/* Lightweight Pure-CSS 3D Orbital Rings */}
                <div className="ecosystem-3d-stage" aria-hidden="true">
                  <div className="ecosystem-3d-ring ring-outer" />
                  <div className="ecosystem-3d-ring ring-middle" />
                  <div className="ecosystem-3d-ring ring-inner" />

                  <div className="ecosystem-3d-core">
                    <strong>ISTD</strong>
                    <span>TRICHUR</span>
                  </div>

                  <div className="ecosystem-3d-node node-top">
                    <span>💼 Corporate L&amp;D</span>
                  </div>
                  <div className="ecosystem-3d-node node-right">
                    <span>🎓 Campus Chapters</span>
                  </div>
                  <div className="ecosystem-3d-node node-bottom">
                    <span>🤖 AI &amp; Future Tech</span>
                  </div>
                  <div className="ecosystem-3d-node node-left">
                    <span>🤝 Executive Network</span>
                  </div>
                </div>

                <p className="ecosystem-3d-caption">
                  A unified institutional platform in Trichur bringing together
                  HR leaders, trainers, researchers, entrepreneurs, and higher
                  education institutions.
                </p>
              </div>
            </div>

            {/* Right: Institutional Mandate & Vision/Mission */}
            <div>
              <span className="section-tag tag-blue">
                Institutional Identity
              </span>
              <h2 className="section-title">
                National Legacy &amp; ISTD Trichur Diamond Chapter Mandate
              </h2>
              <p
                style={{
                  color: 'var(--color-body)',
                  marginBottom: '1rem',
                  fontSize: '0.98rem',
                  lineHeight: 1.78,
                  textAlign: 'justify',
                }}
              >
                The{' '}
                <a
                  href={OFFICIAL_LINKS.istdNationalWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--brand-blue)', fontWeight: 700 }}
                >
                  Indian Society for Training &amp; Development (ISTD)
                </a>
                , established in <strong>April 1970</strong> in New Delhi under
                the Societies Registration Act, 1860, is India’s premier
                national autonomous society devoted to training, learning, and
                human resource development across industry, government, and
                academia.
              </p>
              <p
                style={{
                  color: 'var(--color-body)',
                  marginBottom: '1.35rem',
                  fontSize: '0.98rem',
                  lineHeight: 1.78,
                  textAlign: 'justify',
                }}
              >
                Inaugurated on <strong>30 March 2026</strong> as ISTD’s{' '}
                <strong>Diamond Chapter</strong> under the mentorship of{' '}
                <strong>Prof. (Dr.) Zakkariya K. A.</strong> (Founder &amp;
                Mentor, ISTD Trichur Chapter &amp; National Vice President,
                ISTD) and the chairmanship of <strong>Tony Chacko</strong>, the{' '}
                <strong>ISTD Trichur Chapter</strong> serves as a dynamic hub
                for professional learning, management research, and capability
                building across Central Kerala.
              </p>

              <div className="vision-mission-mini-grid">
                <div className="vm-mini-card vm-blue">
                  <span className="vm-kicker">ISTD Vision</span>
                  <p style={{ textAlign: 'justify' }}>
                    “Leading Transformation through Training &amp; Development.”
                  </p>
                </div>
                <div className="vm-mini-card vm-red">
                  <span className="vm-kicker">Chapter Mission</span>
                  <p style={{ textAlign: 'justify' }}>
                    To advance training and development practices by connecting
                    professionals, organisations, and educators through
                    continuous learning.
                  </p>
                </div>
              </div>

              <div className="btn-group" style={{ marginTop: '1.5rem' }}>
                <Link href="/about" className="btn btn-primary btn-sm">
                  Explore Chapter Profile &rarr;
                </Link>
                <Link
                  href="/committee"
                  className="btn btn-outline-navy btn-sm"
                >
                  Managing Committee
                </Link>
              </div>
            </div>
          </div>

          {/* 3 Interactive 3D-Hover Strategic Pillar Cards */}
          <div className="grid-3">
            {STRATEGIC_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="pillar-3d-card"
                style={
                  { '--pillar-accent': pillar.accent } as React.CSSProperties
                }
              >
                <div className="pillar-3d-top">
                  <span className="pillar-3d-num">{pillar.num}</span>
                  <span className="pillar-3d-tag">{pillar.tag}</span>
                </div>
                <h3 className="pillar-3d-title">{pillar.title}</h3>
                <p className="pillar-3d-desc">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Upcoming Flagship Programmes Spotlight (Only Upcoming Sessions on Home Page) */}
      <section
        className="section-padding bg-pale-blue"
        id="upcomingProgrammes"
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '2.25rem',
            }}
          >
            <div>
              <span className="section-tag tag-red">
                Upcoming Programmes &amp; Live Sessions
              </span>
              <h2 className="section-title" style={{ marginBottom: '0.35rem' }}>
                Join Our Next Learning Session
              </h2>
              <p
                style={{
                  color: 'var(--color-muted)',
                  marginBottom: 0,
                  maxWidth: '680px',
                  textAlign: 'justify',
                }}
              >
                Participate in upcoming webinars, executive workshops, and
                knowledge sessions organised by ISTD Trichur Chapter. Looking
                for past event reports? Browse our complete Year-Wise Archive.
              </p>
            </div>
            <Link href="/events" className="btn btn-outline-navy btn-sm">
              Full Year-Wise Events Directory &rarr;
            </Link>
          </div>

          {upcomingEvents.map((event) => (
            <div key={event.id} className="upcoming-flagship-3d-card">
              <div className="upcoming-flagship-poster-col">
                <Link href={`/events/${event.slug}`}>
                  <img
                    src={assetUrl(event.image)}
                    alt={event.title}
                    className="upcoming-flagship-poster-img"
                  />
                </Link>
              </div>

              <div className="upcoming-flagship-content-col">
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.55rem',
                    alignItems: 'center',
                    marginBottom: '0.9rem',
                  }}
                >
                  <span className="upcoming-live-badge">
                    <span className="pulse-dot-green" />
                    <span>UPCOMING {event.programmeType.toUpperCase()}</span>
                  </span>
                  <span className="upcoming-date-chip">
                    📅 {event.date} • {event.timeIST}
                  </span>
                  <span className="upcoming-venue-chip">
                    📍 {event.venue}
                  </span>
                </div>

                <h3 className="upcoming-flagship-title">
                  <Link
                    href={`/events/${event.slug}`}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {event.title}
                  </Link>
                </h3>

                {event.subtitleQuestion && (
                  <p className="upcoming-flagship-question">
                    “{event.subtitleQuestion}”
                  </p>
                )}

                <p className="upcoming-flagship-desc">
                  {event.shortDescription}
                </p>

                {event.speaker && (
                  <div className="upcoming-speaker-box">
                    <div className="upcoming-speaker-label">
                      Resource Person
                    </div>
                    <div className="upcoming-speaker-name">
                      {event.speaker}
                    </div>
                    {event.speakerDesignation && (
                      <div className="upcoming-speaker-role">
                        {event.speakerDesignation}
                      </div>
                    )}
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.85rem',
                    marginTop: '1.5rem',
                  }}
                >
                  <Link
                    href={`/events/${event.slug}`}
                    className="btn btn-red"
                  >
                    Register / View Session Details &rarr;
                  </Link>
                  <Link href="/events" className="btn btn-outline-navy">
                    Explore All 2026 Events &amp; Archives
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Campus & Student Chapters Spotlight */}
      <section
        className="section-padding bg-white"
        id="campusChaptersSpotlight"
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '1.85rem',
            }}
          >
            <div>
              <span className="section-tag tag-yellow">
                Campus &amp; Student Chapters
              </span>
              <h2 className="section-title" style={{ marginBottom: '0.35rem' }}>
                Connecting Academic Learning with Professional Practice
              </h2>
              <p
                style={{
                  color: 'var(--color-muted)',
                  marginBottom: 0,
                  maxWidth: '680px',
                  textAlign: 'justify',
                }}
              >
                ISTD Trichur Chapter partners with higher education institutions
                to establish student chapters that bridge classroom learning
                with industry mentorship and professional development.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <Link
                href="/campus-chapters"
                className="btn btn-outline-navy btn-sm"
              >
                Campus Chapters Hub &amp; Institutional EOI &rarr;
              </Link>
            </div>
          </div>

          <div
            style={{
              background:
                'linear-gradient(135deg, #071226 0%, #0F2347 60%, #16336B 100%)',
              borderRadius: '22px',
              border: '2px solid rgba(245, 158, 11, 0.35)',
              boxShadow: '0 20px 50px rgba(15, 29, 58, 0.14)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              alignItems: 'center',
            }}
          >
            <Link
              href="/campus-chapters/christ-college-of-engineering"
              style={{
                padding: 'clamp(1.15rem, 3vw, 1.75rem)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 0, 0, 0.22)',
                textDecoration: 'none',
              }}
            >
              <img
                src={assetUrl('/images/campus-chapter-cce.jpg')}
                alt="ISTD Trichur First Student Chapter — Christ College of Engineering (Autonomous)"
                style={{
                  width: '100%',
                  maxWidth: '340px',
                  maxHeight: '400px',
                  objectFit: 'contain',
                  borderRadius: '14px',
                  boxShadow: '0 14px 36px rgba(0, 0, 0, 0.45)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                }}
              />
            </Link>

            <div
              style={{
                padding: 'clamp(1.25rem, 3.5vw, 2.25rem)',
                color: '#FFFFFF',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '0.85rem',
                }}
              >
                <span
                  style={{
                    padding: '0.28rem 0.78rem',
                    borderRadius: '999px',
                    background: '#FEF3C7',
                    color: '#92400E',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                  }}
                >
                  First Student Chapter • ISTD Trichur
                </span>
                <span
                  style={{
                    padding: '0.28rem 0.78rem',
                    borderRadius: '999px',
                    background: 'rgba(255,255,255,0.12)',
                    color: '#E2E8F0',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                  }}
                >
                  📍 Irinjalakuda, Trichur
                </span>
              </div>

              <h3
                style={{
                  color: '#FFFFFF',
                  fontSize: 'clamp(1.35rem, 2.3vw, 1.75rem)',
                  fontWeight: 900,
                  lineHeight: 1.25,
                  marginBottom: '0.75rem',
                }}
              >
                Inauguration of First Student Chapter at Christ College of
                Engineering (Autonomous)
              </h3>

              <p
                style={{
                  color: '#E2E8F0',
                  fontSize: '0.94rem',
                  lineHeight: 1.72,
                  marginBottom: '0.9rem',
                  textAlign: 'justify',
                }}
              >
                ISTD Trichur Chapter successfully inaugurated its first student
                chapter at{' '}
                <strong style={{ color: '#FFFFFF' }}>
                  Christ College of Engineering (Autonomous)
                </strong>
                , creating a dedicated forum for students to connect academic
                learning with professional practice, engage with experienced
                practitioners, and develop as future professionals.
              </p>

              <p
                style={{
                  color: '#CBD5E1',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  marginBottom: '1.35rem',
                  textAlign: 'justify',
                }}
              >
                The inaugural ceremony featured the keynote address and official
                inauguration by{' '}
                <strong style={{ color: '#FDE68A' }}>
                  Prof. (Dr.) Zakkariya K. A.
                </strong>{' '}
                (National Vice President, ISTD &amp; Founder-Mentor, ISTD
                Trichur Chapter), alongside an address by{' '}
                <strong style={{ color: '#FDE68A' }}>Tony Chacko</strong>{' '}
                (Chairman, ISTD Trichur Chapter).
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <Link
                  href="/campus-chapters/christ-college-of-engineering"
                  className="btn btn-red btn-sm"
                >
                  View Student Chapter Page &rarr;
                </Link>
                <Link
                  href="/campus-chapters#establishChapter"
                  className="btn btn-outline-white btn-sm"
                >
                  Establish a Student Chapter at Your College
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Membership CTA Banner */}
      <section className="section-padding-sm bg-pale-blue">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-inner">
              <div>
                <span className="section-tag tag-yellow">
                  Join the ISTD Network
                </span>
                <h2>Become a Member of ISTD Trichur Chapter</h2>
                <p style={{ textAlign: 'justify' }}>
                  Connect with HR leaders, trainers, management faculty,
                  entrepreneurs, and researchers across Trichur and India.
                  Individual, Institutional, Associate, and Student memberships
                  are open.
                </p>
              </div>
              <div className="btn-group">
                <Link href="/membership" className="btn btn-red">
                  Apply for Membership
                </Link>
                <Link href="/contact" className="btn btn-outline-white">
                  Contact Chapter Office
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
