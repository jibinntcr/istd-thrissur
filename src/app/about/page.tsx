import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PhotoCard } from '@/components/PhotoCard';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about ISTD Thrissur Chapter - Our mission, vision, national legacy, and initiatives in Human Resource Development in Central Kerala.',
};

export default function AboutPage() {
  return (
    <>
      {/* Page Hero Header */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>About Us</span>
          </div>
          <h1 className="page-hero-title">About ISTD Thrissur Chapter</h1>
          <p className="page-hero-subtitle">
            Promoting human resource excellence, continuous learning, and professional leadership
            throughout Central Kerala.
          </p>
        </div>
      </section>

      {/* About Narrative & Overview */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-wrapper">
              <div className="photo-collage-wrapper">
                <PhotoCard
                  src="/photos/istd-in.jpeg"
                  alt="ISTD National and Thrissur Chapter Leadership"
                  title="National & Regional ISTD Leadership"
                  caption="Past National President Dr. Yogesh Kumar Upadhyay, National Treasurer Shri. Nabaghana Pany, National President Shri. Atul Shah, Regional VP Prof. (Dr.) Zakkariya K A, and Chapter Chairman Shri. Tony Chacko."
                  category="Leadership"
                  badgeText="ISTD National & Chapter Leadership"
                  headingText="Upholding 55+ Years of ISTD Excellence"
                />
                <div className="photo-sub-grid">
                  <PhotoCard
                    src="/photos/istd-national-president.jpeg"
                    alt="Official ISTD National Mandate"
                    title="National Recognition & Affiliation"
                    caption="ISTD National President Shri. Atul Shah with Regional Vice President Prof. (Dr.) Zakkariya K A and National Treasurer Shri. Nabaghana Pany."
                    category="National Affiliation"
                    badgeText="ISTD New Delhi"
                    headingText="National Affiliation"
                    aspectRatio="4 / 3"
                    compactCaption
                  />
                  <PhotoCard
                    src="/photos/istd-treasurer.jpeg"
                    alt="Executive Knowledge Forum"
                    title="Executive Knowledge Forum"
                    caption="National and Chapter leaders sharing perspectives on advancing L&D across Kerala."
                    category="Plenary Dialogue"
                    badgeText="Plenary Forum"
                    headingText="Executive Dialogue"
                    aspectRatio="4 / 3"
                    compactCaption
                  />
                </div>
              </div>
              <div className="about-experience-badge">
                <div className="exp-num">150+</div>
                <div className="exp-label">Active Members</div>
              </div>
            </div>

            <div className="about-content-block">
              <span className="section-tag tag-red">Our Profile &amp; Mission</span>
              <h2 className="section-title">Advancing Human Resource Development</h2>
              <p className="about-lead">
                The Indian Society for Training &amp; Development (ISTD) Thrissur Chapter is
                dedicated to promoting better and more effective utilization of human resources
                through continuous education, training, and development. We bridge the gap between
                industry and academia, offering innovative programs, networking opportunities, and
                professional certifications to equip trainers and organizational leaders for the
                future.
              </p>
              <p
                style={{
                  color: 'var(--color-ink-light)',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                }}
              >
                Operating as an integral regional chapter of the national ISTD body (established in
                April 1970 and headquartered in New Delhi), the Thrissur Chapter serves as Central
                Kerala&apos;s vibrant epicenter for trainers, HR directors, behavioral coaches,
                institutional educators, and business consultants.
              </p>
              <div className="btn-group">
                <Link href="/membership" className="btn btn-primary">
                  Join Our Network
                </Link>
                <Link href="/committee" className="btn btn-outline-navy">
                  View Leadership
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="section-padding bg-pale-blue">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-yellow">Purpose &amp; Aspiration</span>
            <h2 className="section-title">Our Mission &amp; Vision</h2>
            <p className="section-subtitle">
              Guiding our community toward pioneering benchmarks in learning design and leadership
              development.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              maxWidth: '960px',
              margin: '0 auto',
            }}
          >
            {/* Mission Card */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem 2rem',
                border: '1.5px solid var(--border-light)',
                borderTop: '5px solid var(--accent-red)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-red-subtle)',
                  color: 'var(--accent-red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 14 14" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--accent-red)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Core Mission
              </span>
              <h3 style={{ fontSize: '1.4rem', margin: '0.4rem 0 0.85rem', color: 'var(--color-ink)' }}>
                Our Mission
              </h3>
              <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--color-ink-light)' }}>
                &ldquo;To foster a culture of continuous learning and professional excellence among
                trainers, educators, and corporate leaders in the Thrissur region.&rdquo;
              </p>
            </div>

            {/* Vision Card */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem 2rem',
                border: '1.5px solid var(--border-light)',
                borderTop: '5px solid var(--accent-blue)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-blue-subtle)',
                  color: 'var(--accent-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--accent-blue)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Future Vision
              </span>
              <h3 style={{ fontSize: '1.4rem', margin: '0.4rem 0 0.85rem', color: 'var(--color-ink)' }}>
                Our Vision
              </h3>
              <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--color-ink-light)' }}>
                &ldquo;To be the most sought-after professional body in Central Kerala for Learning
                &amp; Development, driving organizational success and individual empowerment.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-blue">Key Initiatives</span>
            <h2 className="section-title">What We Do</h2>
            <p className="section-subtitle">
              We organize impactful programs, academic initiatives, and industry dialogues across
              three core strategic pillars.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {/* Pillar 1 */}
            <div
              style={{
                background: 'var(--bg-pale-blue)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.25rem 1.75rem',
                border: '1.5px solid var(--border-light)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: 'rgba(11, 34, 57, 0.08)',
                  position: 'absolute',
                  top: '1rem',
                  right: '1.25rem',
                }}
              >
                01
              </div>
              <div
                className="pillar-icon"
                style={{
                  width: '44px',
                  height: '44px',
                  marginBottom: '1.25rem',
                  backgroundColor: '#FFFFFF',
                  borderColor: 'var(--border-blue)',
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem', color: 'var(--color-ink)' }}>
                Regional Training Programs, Workshops &amp; Webinars
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                We organize regional training programs, workshops, and webinars addressing modern
                topics such as AI in HR, advanced instructional design, behavioral psychology, and
                experiential facilitation.
              </p>
            </div>

            {/* Pillar 2 */}
            <div
              style={{
                background: 'var(--bg-pale-blue)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.25rem 1.75rem',
                border: '1.5px solid var(--border-light)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: 'rgba(11, 34, 57, 0.08)',
                  position: 'absolute',
                  top: '1rem',
                  right: '1.25rem',
                }}
              >
                02
              </div>
              <div
                className="pillar-icon"
                style={{
                  width: '44px',
                  height: '44px',
                  marginBottom: '1.25rem',
                  backgroundColor: '#FFFFFF',
                  borderColor: 'var(--border-blue)',
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem', color: 'var(--color-ink)' }}>
                Flagship PGP-TL&amp;D Program Facilitation
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                We facilitate the flagship Post Graduate Program in Training, Learning &amp;
                Development (PGP-TL&amp;D), a prestigious 15-month diploma recognized by the Govt.
                of India for aspiring L&amp;D leaders.
              </p>
            </div>

            {/* Pillar 3 */}
            <div
              style={{
                background: 'var(--bg-pale-blue)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.25rem 1.75rem',
                border: '1.5px solid var(--border-light)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: 'rgba(11, 34, 57, 0.08)',
                  position: 'absolute',
                  top: '1rem',
                  right: '1.25rem',
                }}
              >
                03
              </div>
              <div
                className="pillar-icon"
                style={{
                  width: '44px',
                  height: '44px',
                  marginBottom: '1.25rem',
                  backgroundColor: '#FFFFFF',
                  borderColor: 'var(--border-blue)',
                }}
              >
                <svg
                  width="22"
                  height="22"
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
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem', color: 'var(--color-ink)' }}>
                Industry-Academia Collaboration
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                We provide interactive networking platforms for industry-academia collaboration,
                linking university researchers and business leaders to solve contemporary talent
                development challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Ecosystem & Collaborative Forum Showcase */}
      <section className="section-padding bg-pale-blue">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-red">Leadership &amp; Community</span>
            <h2 className="section-title">A Vibrant Ecosystem of L&amp;D Practitioners</h2>
            <p className="section-subtitle">
              Uniting national ISTD leaders, regional academicians, HR heads, and corporate
              facilitators to elevate professional standards in Central Kerala.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <PhotoCard
              src="/photos/istd-calicut.jpeg"
              alt="National and Regional Leadership Dais"
              title="National & Regional Executive Dais"
              caption="Dr. Yogesh Kumar Upadhyay, Shri. Nabaghana Pany, Shri. Atul Shah, Prof. (Dr.) Zakkariya K A, and Chairman Shri. Tony Chacko."
              category="Executive Leadership"
              badgeText="National & Regional Dais"
              headingText="Strategic HRD & L&D Leadership"
              style={{ background: '#FFFFFF' }}
            />
            <PhotoCard
              src="/photos/istd-3.jpeg"
              alt="Chapter Governance and Commitment"
              title="Commitment to Professional Standards"
              caption="Chapter office bearers and members upholding ISTD's code of professional excellence."
              category="Governance"
              badgeText="Governance"
              headingText="Shared Vision & Governance"
              style={{ background: '#FFFFFF' }}
            />
            <PhotoCard
              src="/photos/istd-audience.jpeg"
              alt="ISTD Thrissur Chapter Fraternity"
              title="Thrissur Chapter Professional Fraternity"
              caption="Trainers, educators, HR professionals, academicians, and industry leaders of the ISTD Thrissur Chapter."
              category="Chapter Community"
              badgeText="Community"
              headingText="Active Chapter Fraternity"
              style={{ background: '#FFFFFF' }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginTop: '2.25rem',
            }}
          >
            <Link href="/events" className="btn btn-primary">
              View Chapter Events &amp; Milestones &rarr;
            </Link>
            <Link href="/gallery" className="btn btn-outline-navy">
              Explore Photo Gallery &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* National Affiliation Banner */}
      <section
        className="section-padding-sm bg-navy"
        style={{ backgroundColor: 'var(--color-navy-dark)' }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '2rem',
            }}
          >
            <div style={{ maxWidth: '680px' }}>
              <span className="section-tag tag-white" style={{ marginBottom: '0.75rem' }}>
                National Heritage
              </span>
              <h2
                style={{
                  color: '#FFFFFF',
                  fontSize: '1.85rem',
                  marginBottom: '0.75rem',
                  fontWeight: 800,
                }}
              >
                Affiliated with ISTD National Body, New Delhi
              </h2>
              <p
                style={{
                  color: '#CBD5E1',
                  fontSize: '0.95rem',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Established in April 1970, ISTD is a premier national non-profit professional
                society with 45+ chapters across India. It is an active member of the International
                Federation of Training and Development Organizations (IFTDO), USA and Asian
                Association of Training and Development Organizations (ARTDO), Manila.
              </p>
            </div>
            <div className="btn-group">
              <a
                href="https://www.istd.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-red btn-lg"
              >
                <span>Visit ISTD National Website</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
