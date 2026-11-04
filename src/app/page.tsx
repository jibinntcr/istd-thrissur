import React from 'react';
import Link from 'next/link';
import { HeroShowcase } from '@/components/HeroShowcase';
import { PhotoCard } from '@/components/PhotoCard';
import { EventsChronicleSection } from '@/components/EventsChronicleSection';
import {
  OFFICIAL_LINKS,
  assetUrl,
} from '@/data/siteData';

const HOMEPAGE_GALLERY_PREVIEW = [
  {
    src: '/photos/istd-treasurer.jpeg',
    title: 'Address by National Treasurer Shri. Nabaghana Pany',
    caption:
      'Shri. Nabaghana Pany (National Treasurer, ISTD) addressing the ISTD Thrissur Chapter members at Hotel Pearl Regency on 30 March 2026.',
    category: 'Addresses',
  },
  {
    src: '/photos/istd-sneha.jpeg',
    title: 'Presentation of Memento to Secretary Ms. Sneha Rose George',
    caption:
      'Regional Vice President (South) Prof. (Dr.) Zakkariya K A presenting a floral memento to Chapter Secretary Ms. Sneha Rose George.',
    category: 'Felicitations',
  },
  {
    src: '/photos/istd-participants.jpeg',
    title: 'Felicitation of Past National President Dr. Yogesh Kumar Upadhyay',
    caption:
      'Chapter Treasurer Mr. Jibin N draping a traditional ponnada to Past National President Dr. Yogesh Kumar Upadhyay.',
    category: 'Felicitations',
  },
  {
    src: '/photos/istd-national-treasurer.jpeg',
    title: 'Felicitation of National Treasurer Shri. Nabaghana Pany',
    caption:
      'Chapter members honouring ISTD National Treasurer Shri. Nabaghana Pany on stage at Hotel Pearl Regency, Thrissur.',
    category: 'Felicitations',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Scrolling Upcoming Events Headline Ticker */}
      <div className="upcoming-ticker-bar" aria-label="Upcoming Events Announcements">
        <div className="container upcoming-ticker-inner">
          <div className="upcoming-ticker-label">
            <span className="pulse-dot-green" aria-hidden="true" />
            <span>Upcoming Event</span>
          </div>
          <div className="upcoming-ticker-viewport">
            <div className="upcoming-ticker-track">
              <Link href="/campus-chapters/christ-college-of-engineering" className="upcoming-ticker-item">
                <strong>First Student Chapter Inauguration:</strong> ISTD Trichur Chapter announces
                its First Student Chapter at Christ College of Engineering (Autonomous) &rarr;
              </Link>
              <span className="upcoming-ticker-sep" aria-hidden="true">
                •
              </span>
              <Link href="/events/advancing-aiot-research" className="upcoming-ticker-item">
                <strong>10 Nov 2026 (7:00 PM – 8:00 PM IST • Google Meet):</strong> “Advancing AIoT
                Research: From Intelligent Algorithms to Real-World Applications” — Resource Person:
                Boopathy (CTO, Monzha Research Labs Pvt. Ltd.) &rarr;
              </Link>
              <span className="upcoming-ticker-sep" aria-hidden="true">
                •
              </span>
              <Link href="/events" className="upcoming-ticker-item">
                Explore Upcoming Events &amp; Completed Event Reports of ISTD Thrissur Chapter
                &rarr;
              </Link>
              <span className="upcoming-ticker-sep" aria-hidden="true">
                •
              </span>
              <Link href="/campus-chapters/christ-college-of-engineering" className="upcoming-ticker-item">
                <strong>First Student Chapter Inauguration:</strong> ISTD Trichur Chapter announces
                its First Student Chapter at Christ College of Engineering (Autonomous) &rarr;
              </Link>
              <span className="upcoming-ticker-sep" aria-hidden="true">
                •
              </span>
              <Link href="/events/advancing-aiot-research" className="upcoming-ticker-item">
                <strong>Online Session:</strong> How can intelligent algorithms translate into
                real-world applications? Join us on 10 November 2026 &rarr;
              </Link>
              <span className="upcoming-ticker-sep" aria-hidden="true">
                •
              </span>
              <Link
                href="/events/advancing-aiot-research"
                className="upcoming-ticker-item"
                aria-hidden="true"
                tabIndex={-1}
              >
                <strong>10 Nov 2026 (7:00 PM – 8:00 PM IST • Google Meet):</strong> “Advancing AIoT
                Research: From Intelligent Algorithms to Real-World Applications” — Resource Person:
                Boopathy (CTO, Monzha Research Labs Pvt. Ltd.) &rarr;
              </Link>
              <span className="upcoming-ticker-sep" aria-hidden="true">
                •
              </span>
              <Link
                href="/events"
                className="upcoming-ticker-item"
                aria-hidden="true"
                tabIndex={-1}
              >
                Explore Upcoming Events &amp; Completed Event Reports of ISTD Thrissur Chapter
                &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Hero Section (Compact & Balanced) */}
      <section className="hero-section" style={{ padding: '2.75rem 0 3rem' }}>
        <div className="container">
          <div className="hero-grid" style={{ gap: '2.5rem', alignItems: 'center' }}>
            {/* Hero Left Content */}
            <div className="hero-content">
              <div className="hero-eyebrow">
                <span className="dot" />
                <span>Indian Society for Training &amp; Development • Thrissur Chapter</span>
              </div>
              <h1
                className="hero-title"
                style={{
                  fontSize: 'clamp(1.85rem, 3.2vw, 2.65rem)',
                  lineHeight: 1.18,
                  marginBottom: '1rem',
                }}
              >
                Leading Transformation through{' '}
                <span className="highlight">Training &amp; Development</span>
              </h1>
              <p
                className="hero-subtitle"
                style={{ fontSize: '1rem', lineHeight: 1.68, marginBottom: '1.5rem' }}
              >
                The <strong>ISTD Thrissur Chapter</strong> brings together trainers, educators, HR
                professionals, academicians, and industry practitioners in Central Kerala for
                professional learning, knowledge exchange, and human resource development.
              </p>
              <div className="hero-cta-group" style={{ marginBottom: '1.5rem' }}>
                <Link href="/membership" className="btn btn-red">
                  <span>Become a Member</span>
                </Link>
                <Link href="/events" className="btn btn-outline-navy">
                  <span>Explore Events</span>
                </Link>
              </div>

              <div className="hero-trust-bar" style={{ paddingTop: '1rem' }}>
                <div className="hero-trust-item">
                  <span>Workshops &amp; Seminars</span>
                </div>
                <div className="hero-trust-item">
                  <span>•</span>
                  <span>HR &amp; L&amp;D Practitioner Network</span>
                </div>
                <div className="hero-trust-item">
                  <span>•</span>
                  <span>Industry–Academia Collaboration</span>
                </div>
              </div>
            </div>

            {/* Hero Right Photo Showcase */}
            <HeroShowcase />
          </div>
        </div>
      </section>

      {/* 2. About the Chapter */}
      <section className="section-padding bg-pale-blue" id="aboutTheChapter">
        <div className="container">
          <div className="split-grid">
            <div>
              <PhotoCard
                src="/photos/istd-3.jpeg"
                alt="Regional Vice President (South) Prof. (Dr.) Zakkariya K A addressing the ISTD Thrissur Chapter"
                title="Address by Regional Vice President (South) Prof. (Dr.) Zakkariya K A"
                caption="Prof. (Dr.) Zakkariya K A, Regional Vice President (South), ISTD, addressing members at the Thrissur Chapter inauguration on 30 March 2026."
                category="About the Chapter"
                badgeText="30 March 2026 • Thrissur"
                headingText="Prof. (Dr.) Zakkariya K A Addressing the Chapter"
                aspectRatio="16/10"
              />
            </div>

            <div>
              <span className="section-tag tag-blue">About the Chapter</span>
              <h2 className="section-title">
                ISTD National Heritage &amp; the Thrissur Chapter
              </h2>
              <p
                style={{
                  color: 'var(--color-body)',
                  marginBottom: '0.9rem',
                  fontSize: '0.98rem',
                  lineHeight: 1.72,
                }}
              >
                The{' '}
                <a
                  href={OFFICIAL_LINKS.istdNationalWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-primary-blue)', fontWeight: 700 }}
                >
                  Indian Society for Training &amp; Development (ISTD)
                </a>
                , established in <strong>April 1970</strong> in New Delhi under the Societies
                Registration Act, 1860, is a national non-profit society dedicated to training and
                human resource development across business, industry, government, and academia.
              </p>
              <p
                style={{
                  color: 'var(--color-body)',
                  marginBottom: '1.25rem',
                  fontSize: '0.98rem',
                  lineHeight: 1.72,
                }}
              >
                The <strong>ISTD Thrissur Chapter</strong> (also referred to as the{' '}
                <em>ISTD Trichur Chapter</em>) was inaugurated on <strong>30 March 2026</strong> as
                the <strong>Diamond Chapter</strong> in ISTD’s 55th year to foster training
                excellence, workshops, and professional collaboration in Thrissur and Central
                Kerala.
              </p>

              <div className="vision-mission-mini-grid">
                <div className="vm-mini-card vm-blue">
                  <span className="vm-kicker">ISTD Vision</span>
                  <p>“Leading Transformation through Training &amp; Development.”</p>
                </div>
                <div className="vm-mini-card vm-red">
                  <span className="vm-kicker">Chapter Mission</span>
                  <p>
                    To advance training and development practices by connecting professionals,
                    organisations, and educators through continuous learning.
                  </p>
                </div>
              </div>

              <div className="btn-group" style={{ marginTop: '1.5rem' }}>
                <Link href="/about" className="btn btn-primary btn-sm">
                  Read More About Us &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Tabbed Events Section: Upcoming Events & Past Event Reports */}
      <EventsChronicleSection initialTab="upcoming" />

      {/* 3B. Campus & Student Chapters Spotlight */}
      <section className="section-padding bg-white" id="campusChaptersSpotlight">
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
              <span className="section-tag tag-yellow">Campus &amp; Student Chapters</span>
              <h2 className="section-title" style={{ marginBottom: '0.35rem' }}>
                Connecting Academic Learning with Professional Practice
              </h2>
              <p style={{ color: 'var(--color-muted)', marginBottom: 0, maxWidth: '680px' }}>
                ISTD Trichur Chapter partners with higher education institutions to establish
                student chapters that bridge classroom learning with industry mentorship and
                professional development.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <Link href="/campus-chapters" className="btn btn-outline-navy btn-sm">
                Why Campus Chapters &amp; Submit EOI &rarr;
              </Link>
            </div>
          </div>

          <div
            style={{
              background: 'linear-gradient(135deg, #071226 0%, #0F2347 60%, #16336B 100%)',
              borderRadius: '22px',
              border: '2px solid rgba(245, 158, 11, 0.35)',
              boxShadow: '0 20px 50px rgba(15, 29, 58, 0.14)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              alignItems: 'center',
            }}
          >
            <Link
              href="/campus-chapters/christ-college-of-engineering"
              style={{
                padding: '1.75rem',
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

            <div style={{ padding: '2.25rem', color: '#FFFFFF' }}>
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
                Inauguration of First Student Chapter at Christ College of Engineering (Autonomous)
              </h3>

              <p
                style={{
                  color: '#E2E8F0',
                  fontSize: '0.94rem',
                  lineHeight: 1.7,
                  marginBottom: '0.9rem',
                }}
              >
                ISTD Trichur Chapter is pleased to announce the inauguration of its first student
                chapter at <strong style={{ color: '#FFFFFF' }}>Christ College of Engineering (Autonomous)</strong>. The
                chapter will create a space for students to connect academic learning with
                professional practice, engage with experienced practitioners, and develop as future
                professionals.
              </p>

              <p
                style={{
                  color: '#CBD5E1',
                  fontSize: '0.88rem',
                  lineHeight: 1.65,
                  marginBottom: '1.35rem',
                }}
              >
                The inaugural program includes an address by{' '}
                <strong style={{ color: '#FDE68A' }}>Prof. (Dr.) Zakkariya</strong>, National Vice
                President, ISTD, followed by the official inauguration and lighting of the lamp, and
                an address by <strong style={{ color: '#FDE68A' }}>Mr. Tony Chacko</strong>, Chairman
                of the ISTD Trichur Chapter.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <Link
                  href="/campus-chapters/christ-college-of-engineering"
                  className="btn btn-red"
                >
                  Visit Exclusive Chapter Page &rarr;
                </Link>
                <Link href="/campus-chapters" className="btn btn-outline-white">
                  Campus Chapters Hub &amp; Institutional EOI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Membership */}
      <section className="section-padding bg-pale-blue" id="membershipOverview">
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
              <p style={{ color: 'var(--color-muted)', marginBottom: 0, maxWidth: '640px' }}>
                ISTD offers membership categories for individual HR/L&amp;D practitioners,
                organisations, and students pursuing careers in training and human resource
                development.
              </p>
            </div>
            <Link href="/membership" className="btn btn-primary btn-sm">
              Eligibility, Fees &amp; How to Apply &rarr;
            </Link>
          </div>

          <div className="grid-3">
            <div
              className="CleanCard"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span className="section-tag tag-blue">Practitioners &amp; Educators</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.6rem' }}>
                  Individual Membership
                </h3>
                <p style={{ color: 'var(--color-body)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                  For trainers, HR professionals, L&amp;D specialists, consultants, and faculty
                  members engaged in training and development (Annual or Life membership via ISTD
                  National).
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
              }}
            >
              <div>
                <span className="section-tag tag-red">Corporates &amp; Academic Institutions</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.6rem' }}>
                  Institutional Membership
                </h3>
                <p style={{ color: 'var(--color-body)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                  For corporate enterprises, public sector undertakings, training institutes, and
                  higher education institutions nominating representatives to chapter activities.
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
              }}
            >
              <div>
                <span className="section-tag tag-yellow">Students &amp; Early-Career</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.6rem' }}>
                  Student &amp; Associate Membership
                </h3>
                <p style={{ color: 'var(--color-body)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                  For postgraduate students in management, HRM, and allied disciplines, as well as
                  early-career individuals interested in learning and development.
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

      {/* 5. Gallery Preview */}
      <section className="section-padding bg-white" id="galleryPreview">
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
              <span className="section-tag tag-blue">Gallery</span>
              <h2 className="section-title" style={{ marginBottom: '0.35rem' }}>
                Moments from Chapter Events
              </h2>
              <p style={{ color: 'var(--color-muted)', marginBottom: 0 }}>
                Highlights from sessions, ceremonies, and member gatherings of the ISTD Thrissur
                Chapter.
              </p>
            </div>
            <Link href="/gallery" className="btn btn-outline-navy btn-sm">
              View All 24 Photos in Gallery &rarr;
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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

      {/* 7. Contact Invitation */}
      <section className="section-padding-sm bg-white" id="contactInvitation">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-inner">
              <div>
                <span className="section-tag tag-yellow">Connect With Us</span>
                <h2>Get in Touch with the ISTD Thrissur Chapter</h2>
                <p>
                  Have a question about membership, upcoming learning sessions, or institutional
                  collaboration? Reach out to our Thrissur Chapter office bearers directly.
                </p>
              </div>
              <div className="btn-group">
                <Link href="/contact" className="btn btn-red">
                  Contact Us
                </Link>
                <a href="tel:+919846101034" className="btn btn-outline-white">
                  Call +91 9846101034
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
