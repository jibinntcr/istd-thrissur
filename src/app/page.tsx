import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroShowcase } from '@/components/HeroShowcase';
import { PhotoCard } from '@/components/PhotoCard';
import { EventsChronicleSection } from '@/components/EventsChronicleSection';
import {
  OFFICE_BEARERS,
  OFFICIAL_LINKS,
  assetUrl,
} from '@/data/siteData';
import { buildPageMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = buildPageMetadata({
  title:
    'ISTD Thrissur Chapter (Diamond Chapter) | Indian Society for Training & Development',
  description:
    'Official website of the ISTD Thrissur Chapter (ISTD Trichur Diamond Chapter), inaugurated on 30 March 2026 under the Indian Society for Training & Development (New Delhi, Est. 1970). Explore year-wise L&D programmes, campus student chapters, managing committee profiles, photo gallery, and membership.',
  path: '/',
  image: '/photos/istd-22.jpeg',
});

const HOMEPAGE_GALLERY_PREVIEW = [
  {
    src: '/photos/istd-22.jpeg',
    title: 'Lighting of the Ceremonial Lamp at the Diamond Chapter Inauguration',
    caption:
      'Chairman Tony Chacko and National Vice President Prof. (Dr.) Zakkariya K. A. lighting the ceremonial lamp alongside National President Shri. Atul Shah, National Treasurer Shri. Nabaghana Pany, and Past National President Dr. Yogesh Kumar Upadhyay (30 March 2026).',
    category: 'Inauguration',
  },
  {
    src: '/photos/chapter-connect-2026-1.jpg',
    title: 'Chapter Connect 2026 at Hotel Elite International, Thrissur',
    caption:
      'Chairman Tony Chacko addressing members at Chapter Connect 2026 (27 June 2026) with National Vice President Prof. (Dr.) Zakkariya K. A. and chapter office bearers on the dais.',
    category: 'Chapter Connect 2026',
  },
  {
    src: '/photos/chapter-connect-2026-2.jpg',
    title: 'ISTD Thrissur Chapter Members Group Photograph',
    caption:
      'Official group photograph of ISTD Thrissur Chapter office bearers and members during Chapter Connect 2026 at Hotel Elite International, Thrissur.',
    category: 'Chapter Gathering',
  },
  {
    src: '/photos/team-istd.jpeg',
    title: 'National Dignitaries with ISTD Thrissur Chapter Members',
    caption:
      'ISTD National President Shri. Atul Shah, Past National President Dr. Yogesh Kumar Upadhyay, National Treasurer Shri. Nabaghana Pany, National Vice President Prof. (Dr.) Zakkariya K. A., and Chairman Tony Chacko with chapter members.',
    category: 'Leadership',
  },
];

const STRATEGIC_PILLARS = [
  {
    tag: '01 • Professional Learning',
    title: 'Executive L&D & Corporate Training Forums',
    description:
      'Curated workshops, leadership roundtables, and practitioner dialogues connecting HR leaders, corporate trainers, and management consultants across Central Kerala.',
  },
  {
    tag: '02 • Industry–Academia Bridge',
    title: 'Campus Student Chapters & Mentorship',
    description:
      'Partnering with leading autonomous colleges and universities—beginning with Christ College of Engineering (Autonomous)—to mentor future-ready professionals.',
  },
  {
    tag: '03 • Future of Work',
    title: 'AI, Emerging Tech & Learning Ecosystems',
    description:
      'Dedicated knowledge sessions exploring Artificial Intelligence, AIoT, intelligent workflows, and high-performance habits for modern organisations and educators.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Scrolling Announcements Ticker */}
      <div
        className="upcoming-ticker-bar"
        aria-label="Chapter Announcements and Upcoming Events"
      >
        <div className="container upcoming-ticker-inner">
          <div className="upcoming-ticker-label">
            <span className="pulse-dot-green" aria-hidden="true" />
            <span>Chapter Updates</span>
          </div>
          <div className="upcoming-ticker-viewport">
            <div className="upcoming-ticker-track">
              <Link
                href="/events/advancing-aiot-research"
                className="upcoming-ticker-item"
              >
                <strong>Upcoming Webinar (10 Nov 2026 • 7:00 PM IST):</strong>{' '}
                “Advancing AIoT Research: From Intelligent Algorithms to
                Real-World Applications” — Boopathy (CTO, Monzha Research Labs)
                &rarr;
              </Link>
              <span className="upcoming-ticker-sep" aria-hidden="true">
                •
              </span>
              <Link
                href="/campus-chapters/christ-college-of-engineering"
                className="upcoming-ticker-item"
              >
                <strong>First Student Chapter Inaugurated:</strong> Christ
                College of Engineering (Autonomous), Irinjalakuda — Inaugurated
                by Prof. (Dr.) Zakkariya K. A., National Vice President, ISTD
                &rarr;
              </Link>
              <span className="upcoming-ticker-sep" aria-hidden="true">
                •
              </span>
              <Link
                href="/events/chapter-connect-2026"
                className="upcoming-ticker-item"
              >
                <strong>Chapter Connect 2026:</strong> Members’ Orientation &amp;
                Professional Networking Programme at Hotel Elite International
                &rarr;
              </Link>
              <span className="upcoming-ticker-sep" aria-hidden="true">
                •
              </span>
              <Link href="/committee" className="upcoming-ticker-item">
                Meet the Managing Committee &amp; Office Bearers of ISTD
                Thrissur Chapter &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Redesigned Executive Hero Section */}
      <section
        className="hero-section"
        style={{
          padding: 'clamp(2.5rem, 5vw, 4.25rem) 0 clamp(2.5rem, 4.5vw, 3.75rem)',
          background:
            'radial-gradient(circle at 12% 18%, rgba(37, 99, 235, 0.08) 0%, transparent 45%), radial-gradient(circle at 88% 82%, rgba(239, 68, 68, 0.06) 0%, transparent 40%), linear-gradient(180deg, #FFFFFF 0%, #F0F7FF 100%)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container">
          <div
            className="hero-grid"
            style={{ gap: 'clamp(2rem, 4vw, 3.25rem)', alignItems: 'center' }}
          >
            {/* Hero Left Content */}
            <div className="hero-content fade-up-anim">
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.55rem',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}
              >
                <span className="hero-eyebrow" style={{ marginBottom: 0 }}>
                  <span className="dot" />
                  <span>ISTD Diamond Chapter • Thrissur, Kerala</span>
                </span>
                <span
                  style={{
                    padding: '0.32rem 0.85rem',
                    borderRadius: '999px',
                    background: '#FEF3C7',
                    border: '1px solid #FDE68A',
                    color: '#92400E',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                  }}
                >
                  National Body Est. April 1970
                </span>
              </div>

              <h1
                className="hero-title"
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 2.85rem)',
                  lineHeight: 1.15,
                  marginBottom: '1.1rem',
                  fontWeight: 800,
                }}
              >
                Advancing Excellence in{' '}
                <span className="highlight">
                  Training, Leadership &amp; Human Resource Development
                </span>
              </h1>

              <p
                className="hero-subtitle"
                style={{
                  fontSize: '1.02rem',
                  lineHeight: 1.75,
                  marginBottom: '1.65rem',
                  textAlign: 'justify',
                  color: 'var(--color-body)',
                }}
              >
                Inaugurated on <strong>30 March 2026</strong> in the 55th
                milestone year of the{' '}
                <strong>
                  Indian Society for Training &amp; Development (ISTD, New
                  Delhi)
                </strong>
                , the <strong>ISTD Thrissur Chapter</strong> unites trainers,
                HR leaders, academicians, entrepreneurs, and institutions across
                Central Kerala for continuous learning, knowledge exchange, and
                organisational transformation.
              </p>

              <div
                className="hero-cta-group"
                style={{ marginBottom: '1.75rem', gap: '0.85rem' }}
              >
                <Link href="/membership" className="btn btn-red">
                  <span>Become a Member</span>
                </Link>
                <Link href="/events" className="btn btn-primary">
                  <span>2026 Events Directory</span>
                </Link>
                <Link href="/committee" className="btn btn-outline-navy">
                  <span>Managing Committee</span>
                </Link>
              </div>

              {/* Key Highlights Pill Row */}
              <div
                className="hero-trust-bar"
                style={{
                  paddingTop: '1.15rem',
                  borderTop: '1px solid #DBEAFE',
                }}
              >
                <div className="hero-trust-item">
                  <span>✓ Executive L&amp;D Forums</span>
                </div>
                <div className="hero-trust-item">
                  <span>•</span>
                  <span>✓ Campus Student Chapters</span>
                </div>
                <div className="hero-trust-item">
                  <span>•</span>
                  <span>✓ Industry–Academia Network</span>
                </div>
              </div>
            </div>

            {/* Hero Right Photo Showcase */}
            <div className="fade-up-anim">
              <HeroShowcase />
            </div>
          </div>

          {/* Executive Milestone Metrics Bar */}
          <div
            style={{
              marginTop: 'clamp(2rem, 4vw, 3rem)',
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: '1rem',
            }}
          >
            {[
              {
                value: 'April 1970',
                label: 'ISTD National Established',
                sub: 'Headquartered in New Delhi',
                accent: '#2563EB',
              },
              {
                value: '30 March 2026',
                label: 'Diamond Chapter Inaugurated',
                sub: 'Hotel Pearl Regency, Thrissur',
                accent: '#EF4444',
              },
              {
                value: '7+ Sessions',
                label: '2026 Learning Programmes',
                sub: 'Webinars, Forums & Milestones',
                accent: '#F59E0B',
              },
              {
                value: '1st Campus Chapter',
                label: 'Christ College of Engineering',
                sub: 'Autonomous • Irinjalakuda',
                accent: '#10B981',
              },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderTop: `3px solid ${stat.accent}`,
                  borderRadius: '16px',
                  padding: '1.15rem 1.3rem',
                  boxShadow: '0 6px 20px -4px rgba(15, 23, 42, 0.05)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.28rem',
                    fontWeight: 800,
                    color: '#0F172A',
                    marginBottom: '0.2rem',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    color: '#1E3A8A',
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: '0.78rem',
                    color: '#64748B',
                    marginTop: '0.1rem',
                  }}
                >
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Institutional Identity & Strategic Pillars */}
      <section className="section-padding bg-white" id="aboutTheChapter">
        <div className="container">
          <div
            className="split-grid"
            style={{ alignItems: 'center', marginBottom: '3rem' }}
          >
            <div>
              <PhotoCard
                src="/photos/istd-3.jpeg"
                alt="National Vice President Prof. (Dr.) Zakkariya K. A. and National Dignitaries at the ISTD Thrissur Chapter Inauguration"
                title="Inaugural Session of the ISTD Thrissur Diamond Chapter"
                caption="National President Shri. Atul Shah, Past National President Dr. Yogesh Kumar Upadhyay, National Treasurer Shri. Nabaghana Pany, National Vice President Prof. (Dr.) Zakkariya K. A., and Chapter Chairman Tony Chacko on 30 March 2026."
                category="Chapter Heritage"
                badgeText="30 March 2026 • Thrissur"
                headingText="ISTD National & Chapter Leadership on the Inaugural Dais"
                aspectRatio="16/10"
              />
            </div>

            <div>
              <span className="section-tag tag-blue">
                Institutional Identity
              </span>
              <h2 className="section-title">
                National Legacy &amp; Thrissur Diamond Chapter Mandate
              </h2>
              <p
                style={{
                  color: 'var(--color-body)',
                  marginBottom: '0.95rem',
                  fontSize: '0.98rem',
                  lineHeight: 1.76,
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
                  lineHeight: 1.76,
                  textAlign: 'justify',
                }}
              >
                Inaugurated on <strong>30 March 2026</strong> as ISTD’s{' '}
                <strong>Diamond Chapter</strong> under the mentorship of{' '}
                <strong>Prof. (Dr.) Zakkariya K. A.</strong> (National Vice
                President, ISTD) and the chairmanship of{' '}
                <strong>Tony Chacko</strong>, the{' '}
                <strong>ISTD Thrissur Chapter</strong> serves as a collaborative
                forum for professional learning, management research, and
                capability building in Central Kerala.
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
                <Link href="/events/inauguration" className="btn btn-outline-navy btn-sm">
                  Inauguration Chronicle
                </Link>
              </div>
            </div>
          </div>

          {/* 3 Strategic Pillars Cards */}
          <div className="grid-3">
            {STRATEGIC_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="CleanCard"
                style={{
                  borderTop: '3px solid var(--brand-blue)',
                  padding: '1.65rem',
                }}
              >
                <span className="section-tag tag-blue">{pillar.tag}</span>
                <h3
                  style={{
                    fontSize: '1.18rem',
                    fontWeight: 800,
                    marginBottom: '0.6rem',
                    color: 'var(--color-ink)',
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.93rem',
                    color: 'var(--color-body)',
                    lineHeight: 1.7,
                    margin: 0,
                    textAlign: 'justify',
                  }}
                >
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Executive Leadership & Office Bearers Preview */}
      <section className="section-padding bg-pale-blue" id="leadershipPreview">
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
              <span className="section-tag tag-red">Chapter Governance</span>
              <h2 className="section-title" style={{ marginBottom: '0.35rem' }}>
                Managing Committee &amp; Office Bearers
              </h2>
              <p
                style={{
                  color: 'var(--color-muted)',
                  marginBottom: 0,
                  maxWidth: '680px',
                  textAlign: 'justify',
                }}
              >
                Guided by senior academic and industry leadership, the Managing
                Committee oversees chapter governance, institutional
                collaborations, and professional development initiatives.
              </p>
            </div>
            <Link href="/committee" className="btn btn-outline-navy btn-sm">
              View Managing Committee Overview &rarr;
            </Link>
          </div>

          <div className="committee-grid">
            {OFFICE_BEARERS.map((member) => (
              <div
                key={member.id}
                className="committee-card officer-highlight"
                style={{
                  justifyContent: 'space-between',
                  padding: '1.75rem 1.45rem',
                }}
              >
                <div style={{ width: '100%' }}>
                  <Link
                    href={`/team/${member.slug}`}
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                  >
                    <div
                      className="committee-avatar-wrap"
                      style={{
                        width: '138px',
                        height: '138px',
                        margin: '0 auto 1.15rem',
                        border: '3px solid var(--accent-blue)',
                      }}
                    >
                      <img
                        src={assetUrl(
                          member.avatar || '/images/logo-circle.png'
                        )}
                        alt={
                          member.avatarAlt ||
                          `${member.name}, ${member.role} of ISTD Thrissur Chapter`
                        }
                        width={138}
                        height={138}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'top center',
                        }}
                      />
                    </div>
                  </Link>

                  <span
                    className={`committee-role-badge ${
                      member.isChairman ? 'badge-chairman' : ''
                    }`}
                  >
                    {member.role}
                  </span>

                  <h3
                    className="committee-name"
                    style={{ fontSize: '1.16rem' }}
                  >
                    <Link
                      href={`/team/${member.slug}`}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {member.name}
                    </Link>
                  </h3>

                  <p
                    className="committee-title"
                    style={{
                      marginBottom: '0.65rem',
                      fontWeight: 700,
                      color: '#1E3A8A',
                      fontSize: '0.82rem',
                    }}
                  >
                    {member.slug === 'prof-dr-zakkariya-k-a'
                      ? 'National Vice President, ISTD'
                      : member.organisation || 'ISTD Thrissur Chapter'}
                  </p>

                  {member.shortBio && (
                    <p
                      style={{
                        fontSize: '0.84rem',
                        color: 'var(--color-body)',
                        lineHeight: 1.6,
                        marginBottom: '1.15rem',
                        textAlign: 'justify',
                      }}
                    >
                      {member.shortBio}
                    </p>
                  )}
                </div>

                <div style={{ width: '100%' }}>
                  <Link
                    href={`/team/${member.slug}`}
                    className="btn btn-primary btn-sm"
                    style={{
                      width: '100%',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                    }}
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Year-Wise Categorized & Searchable Events Section */}
      <EventsChronicleSection initialTab="all" compactHomeView />

      {/* 5. Campus Chapter Spotlight */}
      <section
        className="section-padding bg-pale-blue"
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
                ISTD Thrissur Chapter partners with higher education
                institutions to establish student chapters that bridge classroom
                learning with industry mentorship and professional development.
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
                  First Student Chapter • ISTD Thrissur
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
                  📍 Irinjalakuda, Thrissur
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
                ISTD Thrissur Chapter successfully inaugurated its first student
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
                </strong>
                , National Vice President, ISTD, alongside an address by{' '}
                <strong style={{ color: '#FDE68A' }}>Tony Chacko</strong>,
                Chairman of the ISTD Thrissur Chapter.
              </p>

              <div
                style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}
              >
                <Link
                  href="/campus-chapters/christ-college-of-engineering"
                  className="btn btn-red"
                >
                  Visit Campus Chapter Page &rarr;
                </Link>
                <Link href="/campus-chapters" className="btn btn-outline-white">
                  Establish a Campus Chapter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Membership Pathways */}
      <section className="section-padding bg-white" id="membershipOverview">
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
              <span className="section-tag tag-red">Membership</span>
              <h2 className="section-title" style={{ marginBottom: '0.35rem' }}>
                ISTD Membership Categories
              </h2>
              <p
                style={{
                  color: 'var(--color-muted)',
                  marginBottom: 0,
                  maxWidth: '640px',
                  textAlign: 'justify',
                }}
              >
                ISTD offers national and chapter-affiliated membership pathways
                for HR and L&amp;D practitioners, corporate enterprises,
                educational institutions, and students.
              </p>
            </div>
            <Link href="/membership" className="btn btn-primary btn-sm">
              Eligibility, Fee Tariff &amp; Enquiry &rarr;
            </Link>
          </div>

          <div className="grid-3">
            <div
              className="CleanCard"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: '3px solid var(--brand-blue)',
              }}
            >
              <div>
                <span className="section-tag tag-blue">
                  Practitioners &amp; Educators
                </span>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    marginBottom: '0.6rem',
                  }}
                >
                  Individual Membership
                </h3>
                <p
                  style={{
                    color: 'var(--color-body)',
                    fontSize: '0.92rem',
                    lineHeight: 1.68,
                    textAlign: 'justify',
                  }}
                >
                  For trainers, HR professionals, L&amp;D specialists,
                  consultants, and faculty members engaged in training and
                  human resource development (available as Annual or Life
                  Membership under ISTD National norms).
                </p>
              </div>
              <div style={{ marginTop: '1.25rem' }}>
                <Link
                  href="/membership?category=Individual#membershipEnquiry"
                  className="btn btn-outline-navy btn-sm"
                >
                  Enquire for Individual Membership
                </Link>
              </div>
            </div>

            <div
              className="CleanCard"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: '3px solid var(--accent-red)',
              }}
            >
              <div>
                <span className="section-tag tag-red">
                  Corporates &amp; Institutions
                </span>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    marginBottom: '0.6rem',
                  }}
                >
                  Institutional Membership
                </h3>
                <p
                  style={{
                    color: 'var(--color-body)',
                    fontSize: '0.92rem',
                    lineHeight: 1.68,
                    textAlign: 'justify',
                  }}
                >
                  For corporate enterprises, public sector undertakings,
                  training institutes, and higher education institutions
                  nominating representatives to participate in chapter and
                  national programmes.
                </p>
              </div>
              <div style={{ marginTop: '1.25rem' }}>
                <Link
                  href="/membership?category=Institutional#membershipEnquiry"
                  className="btn btn-outline-navy btn-sm"
                >
                  Enquire for Institutional Membership
                </Link>
              </div>
            </div>

            <div
              className="CleanCard"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: '3px solid var(--accent-yellow)',
              }}
            >
              <div>
                <span className="section-tag tag-yellow">
                  Students &amp; Early-Career
                </span>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    marginBottom: '0.6rem',
                  }}
                >
                  Student &amp; Associate Membership
                </h3>
                <p
                  style={{
                    color: 'var(--color-body)',
                    fontSize: '0.92rem',
                    lineHeight: 1.68,
                    textAlign: 'justify',
                  }}
                >
                  For postgraduate and undergraduate students in management,
                  engineering, HRM, and allied disciplines, as well as
                  early-career professionals building a foundation in L&amp;D.
                </p>
              </div>
              <div style={{ marginTop: '1.25rem' }}>
                <Link
                  href="/membership?category=Student#membershipEnquiry"
                  className="btn btn-outline-navy btn-sm"
                >
                  Enquire for Student Membership
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Gallery Highlights */}
      <section className="section-padding bg-pale-blue" id="galleryPreview">
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
              <span className="section-tag tag-blue">Photo Archive</span>
              <h2 className="section-title" style={{ marginBottom: '0.35rem' }}>
                Moments from Chapter Milestones
              </h2>
              <p
                style={{
                  color: 'var(--color-muted)',
                  marginBottom: 0,
                  textAlign: 'justify',
                }}
              >
                Photographs from the Diamond Chapter Inauguration, Chapter
                Connect 2026, and member gatherings in Thrissur.
              </p>
            </div>
            <Link href="/gallery" className="btn btn-outline-navy btn-sm">
              Open Full Photo Gallery (35 Photos) &rarr;
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {HOMEPAGE_GALLERY_PREVIEW.map((photo) => (
              <PhotoCard
                key={photo.src}
                src={photo.src}
                alt={photo.title}
                title={photo.title}
                caption={photo.caption}
                category={photo.category}
                badgeText={photo.category}
                headingText={photo.title}
                aspectRatio="4/3"
                compactCaption
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA Banner */}
      <section className="section-padding-sm bg-white">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-inner">
              <div>
                <span className="section-tag tag-yellow">
                  Connect &amp; Collaborate
                </span>
                <h2>Join the ISTD Thrissur Chapter Network</h2>
                <p style={{ textAlign: 'justify' }}>
                  Connect with HR leaders, trainers, academicians, and
                  institutions across Thrissur and Central Kerala. Apply for
                  membership or partner with us on upcoming learning programmes.
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
