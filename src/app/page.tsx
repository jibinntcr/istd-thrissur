import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroShowcase } from '@/components/HeroShowcase';
import { HomePhotoMarquee } from '@/components/HomePhotoMarquee';
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
      {/* 1. Executive First-Impression Hero Section with Widescreen Showcase Slider */}
      <section className="hero-3d-master-section">
        {/* Subtle Architectural Mesh & Glow Elements */}
        <div className="hero-3d-perspective-grid" aria-hidden="true" />
        <div className="hero-3d-aurora-glow glow-1" aria-hidden="true" />
        <div className="hero-3d-aurora-glow glow-2" aria-hidden="true" />

        <div
          className="container hero-wide-container"
          style={{ position: 'relative', zIndex: 2 }}
        >
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
                Leading Transformation through{' '}
                <span className="hero-3d-gradient-text">
                  Training, Leadership &amp;
                </span>{' '}
                Human Resource Development
              </h1>

              <p className="hero-3d-lead">
                Inaugurated on <strong>30 March 2026</strong> as the prestigious{' '}
                <strong>Diamond Chapter</strong> in the 55th milestone year of
                the{' '}
                <strong>
                  Indian Society for Training &amp; Development (ISTD, New
                  Delhi)
                </strong>
                , the <strong>ISTD Trichur Chapter</strong> unites corporate
                trainers, HR leaders, academicians, researchers, entrepreneurs,
                and higher education institutions across Central Kerala to
                advance professional learning, innovative L&amp;D practices, and
                organisational excellence.
              </p>

              {/* Hero Action Buttons (Strictly 2 Primary Buttons) */}
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
              </div>

              {/* Clean Single-Line Institutional Credentials Strip */}
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

            {/* Hero Right Column: Large-Format Widescreen Image Slider */}
            <div className="fade-up-anim">
              <HeroShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Widened, High-Attention Upcoming Events & Live Announcements Ribbon */}
      <div
        className="upcoming-ticker-bar"
        aria-label="ISTD Trichur Chapter Upcoming Events and Live Announcements"
      >
        <div className="container upcoming-ticker-wide-container upcoming-ticker-inner">
          <div className="upcoming-ticker-label">
            <span className="pulse-dot-green" aria-hidden="true" />
            <span>UPCOMING &amp; LIVE • 2026</span>
          </div>

          <div className="upcoming-ticker-viewport">
            <div className="upcoming-ticker-track">
              <Link
                href="/events/advancing-aiot-research"
                className="upcoming-ticker-item"
              >
                <span className="ticker-date-pill">
                  NEXT WEBINAR • 10 NOV 2026 • 7:00 PM IST
                </span>
                <strong>
                  “Advancing AIoT Research: From Intelligent Algorithms to
                  Real-World Applications”
                </strong>{' '}
                — Resource Person: Boopathy (CTO, Monzha Research Labs Pvt.
                Ltd.) • Google Meet &rarr;
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
                &amp; Tony Chacko (Chairman) &rarr;
              </Link>
              <span className="upcoming-ticker-sep" aria-hidden="true">
                ◆
              </span>
              <Link
                href="/events/chapter-connect-2026"
                className="upcoming-ticker-item"
              >
                <span className="ticker-date-pill">2026 ARCHIVE</span>
                <strong>Chapter Connect 2026:</strong> Members’ Orientation &amp;
                Professional Networking Forum at Hotel Elite International,
                Trichur — View Report &amp; Photos &rarr;
              </Link>
              <span className="upcoming-ticker-sep" aria-hidden="true">
                ◆
              </span>
              <Link href="/membership" className="upcoming-ticker-item">
                <span className="ticker-date-pill gold">MEMBERSHIP OPEN</span>
                Join ISTD Trichur Diamond Chapter — Individual, Institutional
                &amp; Student Memberships Open via Official ISTD Portal &rarr;
              </Link>
            </div>
          </div>

          <Link
            href="/events/advancing-aiot-research#eventRegistrationFormBox"
            className="upcoming-ticker-cta"
          >
            <span>Register Free</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* 3. Interactive 3D ISTD Vision & Mission Ecosystem & Institutional Identity */}
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
            {/* Left: Pure-CSS 3D Orbital Visualization of ISTD Vision & Mission */}
            <div>
              <div className="ecosystem-3d-card">
                <div className="ecosystem-3d-header">
                  <span className="ecosystem-3d-tag">
                    ◆ ISTD VISION &amp; MISSION IN MOTION
                  </span>
                  <h3>
                    “Leading Transformation through Training &amp; Development”
                  </h3>
                  <p className="ecosystem-3d-subhead">
                    The 4 Core Mission Pillars of the Indian Society for
                    Training &amp; Development (ISTD)
                  </p>
                </div>

                {/* Lightweight Pure-CSS 3D Orbital Rings & Animated Mission Nodes */}
                <div className="ecosystem-3d-stage" aria-hidden="true">
                  <div className="ecosystem-3d-ring ring-outer" />
                  <div className="ecosystem-3d-ring ring-middle" />
                  <div className="ecosystem-3d-ring ring-inner" />
                  <div className="ecosystem-3d-pulse-halo" />

                  <div className="ecosystem-3d-core">
                    <span className="core-kicker">EST. 1970</span>
                    <strong>ISTD</strong>
                    <span>TRICHUR</span>
                  </div>

                  <div className="ecosystem-3d-node node-top">
                    <span className="node-title">
                      🎯 Training &amp; Development
                    </span>
                    <small className="node-sub">
                      Individuals &amp; Organizations
                    </small>
                  </div>
                  <div className="ecosystem-3d-node node-right">
                    <span className="node-title">
                      📚 Universal Knowledge
                    </span>
                    <small className="node-sub">
                      Reservoir of Human Interface
                    </small>
                  </div>
                  <div className="ecosystem-3d-node node-bottom">
                    <span className="node-title">
                      🔬 Exploratory Research
                    </span>
                    <small className="node-sub">
                      Original Action Research
                    </small>
                  </div>
                  <div className="ecosystem-3d-node node-left">
                    <span className="node-title">
                      💡 Innovative Practices
                    </span>
                    <small className="node-sub">
                      Modern L&amp;D Methodologies
                    </small>
                  </div>
                </div>

                {/* Animated Mission Flow Strip */}
                <div
                  className="ecosystem-mission-flow"
                  aria-label="ISTD Mission Flow"
                >
                  <div className="mission-flow-step">
                    <span className="flow-dot blue" />
                    <span>Facilitate Individuals &amp; Orgs</span>
                  </div>
                  <span className="mission-flow-arrow" aria-hidden="true">
                    →
                  </span>
                  <div className="mission-flow-step">
                    <span className="flow-dot gold" />
                    <span>Excel in T&amp;D Activities</span>
                  </div>
                  <span className="mission-flow-arrow" aria-hidden="true">
                    →
                  </span>
                  <div className="mission-flow-step">
                    <span className="flow-dot red" />
                    <span>Lead Transformation</span>
                  </div>
                </div>

                <p className="ecosystem-3d-caption">
                  Facilitating individuals and organizations to excel in
                  Training &amp; Development activities while serving as a
                  reservoir of universal knowledge of human interface through
                  innovative practices and original exploratory research.
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
                ISTD) and the chairmanship of <strong>Tony Chacko</strong>, with{' '}
                <strong>Sneha Rose George</strong> (Secretary) and{' '}
                <strong>Jibin N</strong> (Treasurer), the{' '}
                <strong>ISTD Trichur Chapter</strong> serves as a dynamic hub
                for professional learning, management research, and capability
                building across Central Kerala.
              </p>

              <div className="vision-mission-mini-grid">
                <div className="vm-mini-card vm-blue">
                  <span className="vm-kicker">Our Vision (ISTD)</span>
                  <p
                    style={{
                      textAlign: 'justify',
                      fontWeight: 700,
                      color: '#0f172a',
                    }}
                  >
                    “Leading Transformation through Training &amp; Development.”
                  </p>
                </div>
                <div className="vm-mini-card vm-red">
                  <span className="vm-kicker">Our Mission (ISTD)</span>
                  <p style={{ textAlign: 'justify' }}>
                    “To Facilitate Individuals and Organizations. To excel in
                    Training &amp; Development Activities Serve As Reservoir of
                    Universal Knowledge of Human Interface through Innovative
                    Practices and Original Exploratory Research.”
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

      {/* 4. Latest & Upcoming Programme Spotlight ONLY (Completed Archive Lives on /events) */}
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
              marginBottom: '2rem',
            }}
          >
            <div>
              <span className="section-tag tag-red">
                Latest &amp; Upcoming Programme
              </span>
              <h2 className="section-title" style={{ marginBottom: '0.35rem' }}>
                Upcoming Learning Session
              </h2>
              <p
                style={{
                  color: 'var(--color-muted)',
                  marginBottom: 0,
                  maxWidth: '720px',
                  textAlign: 'justify',
                }}
              >
                Register for our upcoming online session organised by the ISTD
                Trichur Chapter. To browse completed 2026 programmes and
                year-wise archives, visit the Events &amp; Programmes page.
              </p>
            </div>
            <Link href="/events" className="btn btn-outline-navy btn-sm">
              View All Events &amp; Year-Wise Archive &rarr;
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
                    href={`/events/${event.slug}#eventRegistrationFormBox`}
                    className="btn btn-red"
                  >
                    Register Now &rarr;
                  </Link>
                  <Link
                    href={`/events/${event.slug}`}
                    className="btn btn-outline-navy"
                  >
                    View Session Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Animated Scrolling Photo Marquee Ribbon */}
      <HomePhotoMarquee />

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
