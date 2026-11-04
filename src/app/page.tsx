import React from 'react';
import Link from 'next/link';
import { HeroShowcase } from '@/components/HeroShowcase';
import { PhotoCard } from '@/components/PhotoCard';
import { UpcomingEventCard, PastEventCard } from '@/components/EventsChronicleSection';
import {
  ALL_CHAPTER_EVENTS,
  OFFICE_BEARERS,
  COMMITTEE_MEMBERS,
  OFFICIAL_LINKS,
  assetUrl,
} from '@/data/siteData';

const HOMEPAGE_GALLERY_PREVIEW = [
  {
    src: '/photos/istd-treasurer.jpeg',
    title: 'Address by Chapter Treasurer Mr. Jibin N',
    caption:
      'Chapter Treasurer Mr. Jibin N addressing the gathering during the inauguration ceremony on 30 March 2026.',
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
  const upcomingEvents = ALL_CHAPTER_EVENTS.filter((e) => e.status === 'upcoming');
  const pastEvents = ALL_CHAPTER_EVENTS.filter((e) => e.status === 'past');

  return (
    <>
      {/* Scrolling Upcoming Events Headline Ticker */}
      <div className="upcoming-ticker-bar" aria-label="Upcoming Events Announcements">
        <div className="container upcoming-ticker-inner">
          <div className="upcoming-ticker-label">
            <span className="pulse-dot-green" aria-hidden="true" />
            <span>Upcoming Events</span>
          </div>
          <div className="upcoming-ticker-viewport">
            <div className="upcoming-ticker-track">
              <Link href="/events/ai-agents-in-business" className="upcoming-ticker-item">
                <strong>8 August 2026 (Webinar):</strong> “From AI Assistants to AI Agents: The
                Next Shift in Business” — Speaker: Shaheen Siddique &rarr;
              </Link>
              <span className="upcoming-ticker-sep" aria-hidden="true">
                •
              </span>
              <Link href="/events" className="upcoming-ticker-item">
                Explore Learning Sessions, Workshops &amp; Seminars organised by the ISTD Thrissur
                Chapter &rarr;
              </Link>
              <span className="upcoming-ticker-sep" aria-hidden="true">
                •
              </span>
              <Link
                href="/contact?type=event&event=Programme+Collaboration+or+Speaker+Proposal#contactEnquiryForm"
                className="upcoming-ticker-item"
              >
                Interested in speaking or collaborating on an upcoming chapter workshop? Connect
                with us &rarr;
              </Link>
              <span className="upcoming-ticker-sep" aria-hidden="true">
                •
              </span>
              <Link
                href="/events/ai-agents-in-business"
                className="upcoming-ticker-item"
                aria-hidden="true"
                tabIndex={-1}
              >
                <strong>8 August 2026 (Webinar):</strong> “From AI Assistants to AI Agents: The
                Next Shift in Business” — Speaker: Shaheen Siddique &rarr;
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
                Explore Learning Sessions, Workshops &amp; Seminars organised by the ISTD Thrissur
                Chapter &rarr;
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

      {/* 3. Upcoming Events */}
      <section className="section-padding bg-white" id="upcomingEventsSection">
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
              <span className="section-tag tag-blue">Events &amp; Programmes</span>
              <h2 className="section-title" style={{ marginBottom: '0.35rem' }}>
                Upcoming Events
              </h2>
              <p style={{ color: 'var(--color-muted)', marginBottom: 0 }}>
                Explore scheduled learning sessions and programmes organised by the ISTD Thrissur
                Chapter.
              </p>
            </div>
            <Link href="/events" className="btn btn-outline-navy btn-sm">
              View All Events &amp; Programmes &rarr;
            </Link>
          </div>

          {upcomingEvents.length === 0 ? (
            <div
              style={{
                padding: '2.5rem',
                textAlign: 'center',
                background: 'var(--color-surface-soft)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
              }}
            >
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-ink)' }}>
                Details of upcoming events will be published here.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.75rem',
              }}
            >
              {upcomingEvents.map((ev) => (
                <UpcomingEventCard key={ev.slug} event={ev} />
              ))}
            </div>
          )}
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
            <div className="CleanCard" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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

            <div className="CleanCard" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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

            <div className="CleanCard" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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

      {/* 5. Past Events (Concise Milestone + Recent Session) */}
      <section className="section-padding bg-white" id="pastEventsSection">
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
              <span className="section-tag tag-blue">Chapter Archive</span>
              <h2 className="section-title" style={{ marginBottom: '0.35rem' }}>
                Past Events
              </h2>
              <p style={{ color: 'var(--color-muted)', marginBottom: 0 }}>
                Recent learning sessions and the official inauguration of the ISTD Thrissur
                Chapter.
              </p>
            </div>
            <Link href="/events#pastEvents" className="btn btn-outline-navy btn-sm">
              View All Past Events &rarr;
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {pastEvents.map((ev) => (
              <PastEventCard key={ev.slug} event={ev} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Managing Committee Preview */}
      <section className="section-padding bg-pale-blue" id="managingCommitteePreview">
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
              <span className="section-tag tag-blue">Chapter Governance</span>
              <h2 className="section-title" style={{ marginBottom: '0.35rem' }}>
                Managing Committee
              </h2>
              <p style={{ color: 'var(--color-muted)', marginBottom: 0 }}>
                Office bearers and managing committee members of the ISTD Thrissur Chapter.
              </p>
            </div>
            <Link href="/committee" className="btn btn-outline-navy btn-sm">
              View Full Managing Committee &rarr;
            </Link>
          </div>

          <div className="grid-3">
            {OFFICE_BEARERS.map((member) => (
              <div className="CleanCard" key={member.name}>
                <span
                  className={`section-tag ${
                    member.isChairman ? 'tag-red' : 'tag-blue'
                  }`}
                >
                  {member.role}
                </span>
                <h3 style={{ fontSize: '1.22rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                  {member.name}
                </h3>
                {member.title && (
                  <p
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: 'var(--brand-blue)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {member.title}
                  </p>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      color: 'var(--brand-navy)',
                      textDecoration: 'underline',
                    }}
                  >
                    LinkedIn Profile ↗
                  </a>
                )}
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '1.25rem',
              padding: '1rem 1.35rem',
              background: '#fff',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              fontSize: '0.9rem',
            }}
          >
            <div>
              <strong style={{ color: 'var(--brand-navy)' }}>Committee Members: </strong>
              <span style={{ color: 'var(--color-body)' }}>
                {COMMITTEE_MEMBERS.map((m) => m.name).join(' • ')}
              </span>
            </div>
            <Link
              href="/committee"
              style={{ fontWeight: 700, color: 'var(--brand-blue)' }}
            >
              Committee Details &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Gallery Preview */}
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
                Chapter Photographs
              </h2>
              <p style={{ color: 'var(--color-muted)', marginBottom: 0 }}>
                Photographs from the ISTD Thrissur Chapter inauguration and member gatherings.
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

      {/* 8. Contact Invitation */}
      <section className="section-padding-sm bg-pale-blue" id="contactInvitation">
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
