import React from 'react';
import Link from 'next/link';
import { HeroShowcase } from '@/components/HeroShowcase';
import { PhotoCard } from '@/components/PhotoCard';
import { EventsChronicleSection } from '@/components/EventsChronicleSection';
import { BentoGalleryPreview } from '@/components/BentoGalleryPreview';
import { OFFICIAL_LINKS } from '@/data/siteData';

export default function HomePage() {
  return (
    <>
      {/* 1. Executive Hero Section */}
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
                (Trichur) Chapter is Central Kerala’s premier professional platform uniting
                trainers, educators, HR professionals, academicians, and industry leaders for
                knowledge exchange, collaboration, and leadership development.
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
                  <span>Events &amp; Reports</span>
                </Link>
                <Link href="/about" className="btn btn-outline-blue btn-lg">
                  <span>About Our Chapter</span>
                </Link>
              </div>
            </div>

            {/* Hero Right Live Interactive Photo Showcase */}
            <HeroShowcase />
          </div>

          {/* Executive Heritage & Affiliation Strip */}
          <div className="hero-trust-strip">
            <div className="trust-strip-item">
              <span className="trust-strip-kicker">National Body</span>
              <strong>ISTD New Delhi (Est. April 1970)</strong>
            </div>
            <div className="trust-strip-divider" />
            <div className="trust-strip-item">
              <span className="trust-strip-kicker">Chapter Recognition</span>
              <strong>Diamond Chapter • ISTD’s 55th Year</strong>
            </div>
            <div className="trust-strip-divider" />
            <div className="trust-strip-item">
              <span className="trust-strip-kicker">Global Federation</span>
              <strong>Affiliated with IFTDO, Geneva</strong>
            </div>
            <div className="trust-strip-divider" />
            <div className="trust-strip-item">
              <span className="trust-strip-kicker">Regional Hub</span>
              <strong>Thrissur (Trichur), Central Kerala</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About ISTD & The Thrissur Chapter (Concise & Authoritative) */}
      <section className="section-padding bg-pale-blue" id="aboutSection">
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
                Strengthening the Training &amp; Human Resource Development Ecosystem
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
                is India’s premier national non-profit professional society dedicated to advancing
                human resource development across corporate enterprises, government, and academia.
              </p>
              <p
                style={{
                  color: 'var(--color-muted)',
                  marginBottom: '1.5rem',
                  lineHeight: 1.72,
                }}
              >
                The <strong>ISTD Thrissur (Trichur) Chapter</strong> serves as Central Kerala’s
                collaborative forum—bringing together trainers, educators, HR professionals,
                academicians, and industry leaders to support professional excellence through
                meaningful engagement and sustained collaboration.
              </p>

              {/* Official ISTD Vision & Mission Cards */}
              <div className="vision-mission-mini-grid">
                <div className="vm-mini-card vm-blue">
                  <span className="vm-kicker">Official ISTD Vision</span>
                  <p>“Leading Transformation through Training &amp; Development.”</p>
                </div>
                <div className="vm-mini-card vm-red">
                  <span className="vm-kicker">Official ISTD Mission</span>
                  <p>
                    To facilitate individuals and organizations to excel in T&amp;D and serve as a
                    reservoir of universal HRD knowledge.
                  </p>
                </div>
              </div>

              <div className="btn-group" style={{ marginTop: '1.75rem' }}>
                <Link href="/about" className="btn btn-primary">
                  <span>About Our Chapter</span>
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
                  <span>Meet Chapter Leadership</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Events & Chapter Chronicles (Upcoming Events & Past Event Reports) */}
      <EventsChronicleSection mode="preview" />

      {/* 4. Chapter Community Visual Highlights (Bento Gallery Preview) */}
      <BentoGalleryPreview />

      {/* 5. Join CTA Banner */}
      <section className="section-padding-sm bg-white">
        <div className="container">
          <div className="cta-banner">
            <span className="section-tag tag-yellow" style={{ marginBottom: '1rem' }}>
              Join the L&amp;D Fraternity
            </span>
            <h2>Become Part of the ISTD Thrissur Chapter Network</h2>
            <p>
              Connect with trainers, educators, HR professionals, academicians, and industry
              leaders across Central Kerala through Individual, Institutional, or Student
              membership.
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
