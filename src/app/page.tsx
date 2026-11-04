import React from 'react';
import Link from 'next/link';
import { HeroShowcase } from '@/components/HeroShowcase';
import { ImpactCounters } from '@/components/ImpactCounters';
import { PhotoCard } from '@/components/PhotoCard';
import { BentoGalleryPreview } from '@/components/BentoGalleryPreview';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { FLAGSHIP_PROGRAMS, CHAPTER_EVENTS, OFFICIAL_LINKS, assetUrl } from '@/data/siteData';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Hero Left Content */}
            <div className="hero-content">
              <div className="hero-eyebrow">
                <span className="dot" />
                <span>Affiliated with ISTD New Delhi (Est. 1970) • Member of IFTDO Geneva</span>
              </div>
              <h1 className="hero-title">
                Leading Transformation Through{' '}
                <span className="highlight">Training, Learning &amp; Development</span>
              </h1>
              <p className="hero-subtitle">
                The <strong>Indian Society for Training &amp; Development (ISTD)</strong> Thrissur
                Chapter is Central Kerala’s premier national forum for HR professionals, corporate
                trainers, educators, academicians, and industry leaders—dedicated to advancing
                human resource excellence through knowledge exchange, industry–academia
                collaboration, and leadership development.
              </p>
              <div className="btn-group">
                <Link href="/membership" className="btn btn-red btn-lg">
                  <span>Become a Member</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link href="/events" className="btn btn-outline-navy btn-lg">
                  <span>Explore Chapter Events</span>
                </Link>
                <Link href="/about" className="btn btn-outline-blue btn-lg">
                  <span>About Our Chapter</span>
                </Link>
              </div>
            </div>

            {/* Hero Right Live Interactive Photo Showcase */}
            <HeroShowcase />
          </div>
        </div>
      </section>

      {/* Impact Metrics Counter Bar */}
      <ImpactCounters />

      {/* About ISTD & Thrissur Chapter Section (Official ISTD.in Content) */}
      <section className="section-padding bg-white" id="aboutSection">
        <div className="container">
          <div className="split-grid">
            {/* Photo Collage */}
            <div className="about-image-frame">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <PhotoCard
                  src="/photos/istd-calicut.jpeg"
                  alt="ISTD National and Regional Leadership Session"
                  title="National & Regional L&D Leadership Forum"
                  caption="ISTD National President Shri. Atul Shah, Past National President Dr. Yogesh Kumar Upadhyay, National Treasurer Shri. Nabaghana Pany, Regional VP Prof. (Dr.) Zakkariya K A, and Chapter Chairman Shri. Tony Chacko."
                  category="Leadership & Strategy"
                  badgeText="ISTD Leadership • Click to Expand"
                  headingText="National & Regional Executive Forum"
                  aspectRatio="16/10"
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <PhotoCard
                    src="/photos/istd-3.jpeg"
                    alt="Knowledge Exchange by Prof. (Dr.) Zakkariya K A"
                    title="Academic & Industry Knowledge Exchange"
                    caption="Regional Vice President (South) Prof. (Dr.) Zakkariya K A sharing insights on strengthening the Training & Development ecosystem in Kerala."
                    category="Knowledge Exchange"
                    badgeText="Regional Perspective"
                    headingText="Prof. (Dr.) Zakkariya K A"
                    aspectRatio="4/3"
                    compactCaption
                  />
                  <PhotoCard
                    src="/photos/istd-national-tony.jpeg"
                    alt="Chairman Shri. Tony Chacko with National President Shri. Atul Shah"
                    title="National & Chapter Leadership Synergy"
                    caption="Chapter Chairman Shri. Tony Chacko in conversation with ISTD National President Shri. Atul Shah."
                    category="Chapter Governance"
                    badgeText="Leadership Synergy"
                    headingText="National & Chapter Leadership"
                    aspectRatio="4/3"
                    compactCaption
                  />
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div>
              <span className="section-tag tag-blue">About ISTD &amp; Thrissur Chapter</span>
              <h2 className="section-title">
                India’s Premier Professional Society for Human Resource Development
              </h2>
              <p
                style={{
                  color: 'var(--color-body)',
                  marginBottom: '1rem',
                  fontSize: '1.02rem',
                  lineHeight: 1.75,
                }}
              >
                Established in <strong>April 1970</strong> under the Societies Registration Act,
                1860, the{' '}
                <a
                  href={OFFICIAL_LINKS.istdNationalWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-primary-blue)', fontWeight: 700 }}
                >
                  Indian Society for Training &amp; Development (ISTD)
                </a>{' '}
                is a national-level autonomous non-profit institution affiliated with the{' '}
                <strong>
                  International Federation of Training and Development Organizations (IFTDO),
                  Geneva
                </strong>
                .
              </p>
              <p
                style={{
                  color: 'var(--color-muted)',
                  marginBottom: '1.35rem',
                  lineHeight: 1.72,
                }}
              >
                Operating from the Cultural Capital of Kerala, the{' '}
                <strong>ISTD Thrissur (Trichur) Chapter</strong> brings together corporate trainers,
                HR leaders, educators, academicians, and public/private sector executives to
                promote the effective utilization of human resources through education, training,
                research, and leadership development.
              </p>

              {/* Official ISTD Vision & Mission Cards (from istd.in) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  style={{
                    background: 'var(--bg-pale-blue)',
                    padding: '1.15rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    borderLeft: '4px solid var(--color-primary-blue)',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.07em',
                      color: 'var(--color-primary-blue)',
                      marginBottom: '0.3rem',
                    }}
                  >
                    Official ISTD Vision
                  </span>
                  <p
                    style={{
                      fontSize: '0.93rem',
                      fontWeight: 700,
                      color: 'var(--color-primary-navy)',
                      marginBottom: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    “Leading Transformation through Training &amp; Development.”
                  </p>
                </div>

                <div
                  style={{
                    background: 'var(--bg-pale-blue)',
                    padding: '1.15rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    borderLeft: '4px solid var(--accent-red)',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.07em',
                      color: 'var(--accent-red)',
                      marginBottom: '0.3rem',
                    }}
                  >
                    Official ISTD Mission
                  </span>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: 'var(--color-ink)',
                      marginBottom: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    To facilitate individuals &amp; organizations to excel in T&amp;D and serve as a
                    reservoir of universal HRD knowledge.
                  </p>
                </div>
              </div>

              <ul className="check-list">
                <li>
                  <span className="check-icon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div>
                    <strong>Collaborative Platform for HR Leaders, Trainers &amp; Educators:</strong>{' '}
                    Uniting corporate L&amp;D practitioners, university faculty, and industry
                    executives to elevate workplace learning across Central Kerala.
                  </div>
                </li>
                <li>
                  <span className="check-icon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div>
                    <strong>Research, IJTD Journal &amp; Consultancy:</strong> Access to the
                    peer-reviewed <em>Indian Journal of Training &amp; Development (IJTD)</em>,
                    national conventions, and organizational OD/training consultancy.
                  </div>
                </li>
              </ul>

              <div className="btn-group" style={{ marginTop: '1.75rem' }}>
                <Link href="/about" className="btn btn-primary">
                  <span>Discover ISTD Mandate</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
                <Link href="/committee" className="btn btn-outline-navy">
                  <span>Meet Managing Committee</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars of the ISTD Ecosystem (Based on istd.in) */}
      <section
        className="section-padding bg-pale-blue"
        style={{ borderTop: '1px solid var(--border-light)' }}
      >
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-blue">National Capabilities &amp; Ecosystem</span>
            <h2 className="section-title">What ISTD Delivers for Professionals &amp; Enterprises</h2>
            <p className="section-subtitle">
              Across 50+ chapters in India, ISTD bridges academia, government, public sector
              undertakings, and corporate enterprises through four strategic pillars.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div
              style={{
                background: '#FFFFFF',
                padding: '2rem 1.75rem',
                borderRadius: 'var(--radius-lg)',
                border: '1.5px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="program-icon" style={{ marginBottom: '1.15rem' }}>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <h3
                style={{
                  fontSize: '1.18rem',
                  fontWeight: 800,
                  color: 'var(--color-ink)',
                  marginBottom: '0.65rem',
                }}
              >
                Knowledge Exchange &amp; Learning Ecosystem
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-muted)', lineHeight: 1.65 }}>
                Connecting <strong>10,000+ L&amp;D professionals</strong> across corporate houses,
                PSUs, banks, and academic institutions to share modern facilitation and talent
                development practices.
              </p>
            </div>

            <div
              style={{
                background: '#FFFFFF',
                padding: '2rem 1.75rem',
                borderRadius: 'var(--radius-lg)',
                border: '1.5px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="program-icon" style={{ marginBottom: '1.15rem' }}>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <h3
                style={{
                  fontSize: '1.18rem',
                  fontWeight: 800,
                  color: 'var(--color-ink)',
                  marginBottom: '0.65rem',
                }}
              >
                In-House Training &amp; Consultancy
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-muted)', lineHeight: 1.65 }}>
                Bespoke MDPs, Training Needs Identification (TNI), Competency Mapping, Assessment
                Centers, and Evaluation studies for government departments, banks, and industries.
              </p>
            </div>

            <div
              style={{
                background: '#FFFFFF',
                padding: '2rem 1.75rem',
                borderRadius: 'var(--radius-lg)',
                border: '1.5px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="program-icon" style={{ marginBottom: '1.15rem' }}>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <h3
                style={{
                  fontSize: '1.18rem',
                  fontWeight: 800,
                  color: 'var(--color-ink)',
                  marginBottom: '0.65rem',
                }}
              >
                IJTD Journal &amp; National Awards
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-muted)', lineHeight: 1.65 }}>
                Publication of the quarterly{' '}
                <em>Indian Journal of Training &amp; Development (IJTD)</em> and the annual{' '}
                <strong>ISTD National Awards for Innovative Training Practices</strong>.
              </p>
            </div>

            <div
              style={{
                background: '#FFFFFF',
                padding: '2rem 1.75rem',
                borderRadius: 'var(--radius-lg)',
                border: '1.5px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="program-icon" style={{ marginBottom: '1.15rem' }}>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3
                style={{
                  fontSize: '1.18rem',
                  fontWeight: 800,
                  color: 'var(--color-ink)',
                  marginBottom: '0.65rem',
                }}
              >
                Regional Conclaves &amp; Chapter Forums
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-muted)', lineHeight: 1.65 }}>
                Continuous peer learning through chapter roundtables, facilitator skill labs,
                leadership workshops, and industry–academia dialogues in Thrissur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Chapter Initiatives & Learning Forums Section */}
      <section className="section-padding bg-white" id="programsSection">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-red">Chapter Initiatives</span>
            <h2 className="section-title">Core Programs &amp; Collaborative Forums</h2>
            <p className="section-subtitle">
              Structured initiatives designed to connect L&amp;D professionals, corporate trainers,
              academicians, and HR leaders across Central Kerala.
            </p>
          </div>

          <div className="programs-grid">
            {FLAGSHIP_PROGRAMS.map((prog) => (
              <article
                key={prog.id}
                className={`program-card ${prog.featured ? 'featured' : ''}`}
              >
                {prog.badge && <span className="program-badge">{prog.badge}</span>}
                <div className="program-icon">
                  {prog.iconType === 'diploma' && (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  )}
                  {prog.iconType === 'layers' && (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  )}
                  {prog.iconType === 'shield' && (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  )}
                </div>
                <span className="program-duration">{prog.duration}</span>
                <h3 className="program-title">{prog.shortTitle}</h3>
                <p className="program-desc">{prog.description}</p>
                <ul className="program-features">
                  {prog.features.slice(0, 3).map((feat) => (
                    <li key={feat}>{feat}</li>
                  ))}
                </ul>
                <Link
                  href={`/programs#${prog.id}`}
                  className={`btn ${prog.featured ? 'btn-primary' : 'btn-outline-navy'}`}
                  style={{ width: '100%' }}
                >
                  Explore Program Details
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter Community Visual Showcase (Bento Grid) */}
      <BentoGalleryPreview />

      {/* Knowledge Sharing Sessions & Webinars */}
      <section className="section-padding bg-white" id="eventsSection">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-blue">Knowledge Sharing &amp; Forums</span>
            <h2 className="section-title">Executive Sessions &amp; Learning Events</h2>
            <p className="section-subtitle">
              Stay updated with our latest webinars, expert panels, and chapter milestones shaping
              the future of workplace learning.
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
                    <Link href="/events" className="btn btn-outline-navy btn-sm">
                      View Event Details &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <Link href="/events" className="btn btn-primary btn-lg">
              <span>Explore All Chapter Events &amp; Milestones</span>
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

      {/* Member Voices / Testimonials Carousel */}
      <TestimonialCarousel />

      {/* Join CTA Banner */}
      <section className="section-padding-sm bg-white">
        <div className="container">
          <div className="cta-banner">
            <span className="section-tag tag-yellow" style={{ marginBottom: '1rem' }}>
              Join the L&amp;D Fraternity
            </span>
            <h2>Ready to Elevate Your Training &amp; HRD Journey?</h2>
            <p>
              Become an Individual, Institutional, or Student member of the ISTD Thrissur Chapter
              and connect with top HR leaders, trainers, and academicians across India.
            </p>
            <div className="btn-group" style={{ justifyContent: 'center' }}>
              <Link href="/membership" className="btn btn-red btn-lg">
                <span>Apply for Membership</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link href="/contact" className="btn btn-outline-white btn-lg">
                <span>Contact Secretariat</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
