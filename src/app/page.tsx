import React from 'react';
import Link from 'next/link';
import { HeroShowcase } from '@/components/HeroShowcase';
import { ImpactCounters } from '@/components/ImpactCounters';
import { PhotoCard } from '@/components/PhotoCard';
import { BentoGalleryPreview } from '@/components/BentoGalleryPreview';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { FLAGSHIP_PROGRAMS, CHAPTER_EVENTS, assetUrl } from '@/data/siteData';

export default function HomePage() {
  return (
    <>
      {/* Main Hero Banner Section */}
      <section className="hero-section" id="heroSection">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge-container">
                <div className="hero-badge">
                  <span className="dot" />
                  <span>Diamond Chapter • Central Kerala&apos;s Premier L&amp;D Ecosystem</span>
                </div>
              </div>
              <h1 className="hero-headline">
                Empowering <span className="highlight-blue">L&amp;D Leaders</span> &amp;{' '}
                <span className="highlight-red">Trainers</span> in Thrissur
              </h1>
              <p className="hero-subheadline">
                Pioneers in Training, Learning &amp; Development. Join India&apos;s foremost
                professional network of corporate facilitators, HR executives, and educators.
              </p>
              <div className="hero-cta-group">
                <Link href="/membership" className="btn btn-red btn-lg" id="heroJoinBtn">
                  <span>Become a Member</span>
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
                <Link href="/gallery" className="btn btn-outline-navy btn-lg" id="heroGalleryBtn">
                  <span>Inauguration Gallery</span>
                </Link>
              </div>
              <div className="hero-trust-bar">
                <div className="hero-trust-item">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>National Govt Recognition</span>
                </div>
                <div className="hero-trust-item">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Industry-Academia Network</span>
                </div>
              </div>
            </div>

            <div className="hero-media-wrapper">
              <HeroShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics (Counters Grid of 3) */}
      <ImpactCounters />

      {/* About ISTD Thrissur Section */}
      <section className="section-padding bg-white" id="aboutSection">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-wrapper">
              <div className="photo-collage-wrapper">
                <PhotoCard
                  src="/photos/istd-calicut.jpeg"
                  alt="ISTD Thrissur Diamond Chapter Inauguration Plenary Session"
                  title="Inauguration of ISTD Diamond Chapter at Thrissur"
                  caption="Dignitaries on the dais at Hotel Pearl Regency, Thrissur during the official Diamond Chapter Inauguration on 30th March 2026."
                  category="Chapter Heritage"
                  badgeText="30th March 2026 • Pearl Regency, Thrissur"
                  headingText="Inauguration of the ISTD Diamond Chapter"
                />
                <div className="photo-sub-grid">
                  <PhotoCard
                    src="/photos/istd-3.jpeg"
                    alt="Swearing-In Ceremony at ISTD Thrissur"
                    title="Swearing-In of Chapter Leadership"
                    caption="National President Shri. Atul Shah administering the official oath of office to the leadership on the dais."
                    category="Oath & Swearing-In"
                    badgeText="Governance"
                    headingText="Swearing-In Ceremony"
                    aspectRatio="4 / 3"
                    compactCaption
                  />
                  <PhotoCard
                    src="/photos/istd-national-tony.jpeg"
                    alt="National President Shri. Atul Shah with Chairman Tony Chacko"
                    title="National President Honoring Chapter Chairman"
                    caption="ISTD National President Shri. Atul Shah presenting a commemorative memento to Chairman Shri. Tony Chacko."
                    category="Leadership Recognition"
                    badgeText="National Tie-Up"
                    headingText="Leadership Felicitation"
                    aspectRatio="4 / 3"
                    compactCaption
                  />
                </div>
              </div>
              <div className="about-experience-badge">
                <div className="exp-num">50+</div>
                <div className="exp-label">Years National Legacy</div>
              </div>
            </div>

            <div className="about-content-block">
              <span className="section-tag tag-red">About ISTD Thrissur</span>
              <h2 className="section-title">Advancing Human Resource Development</h2>
              <p className="about-lead">
                The ISTD Thrissur Chapter is dedicated to promoting better and more effective
                utilization of human resources through continuous education, professional training,
                and career development. We bridge corporate industry standards with academic
                excellence.
              </p>

              <div className="pillar-list">
                <div className="pillar-item">
                  <div className="pillar-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="pillar-text">
                    <h4>Continuous Learning</h4>
                    <p>Equipping facilitators with modern adult learning pedagogies.</p>
                  </div>
                </div>
                <div className="pillar-item">
                  <div className="pillar-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="pillar-text">
                    <h4>Industry Synergies</h4>
                    <p>Bridging corporate HR requirements with academic talent.</p>
                  </div>
                </div>
                <div className="pillar-item">
                  <div className="pillar-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="pillar-text">
                    <h4>Flagship PGP-TL&amp;D</h4>
                    <p>Government recognized 15-month postgraduate diploma.</p>
                  </div>
                </div>
                <div className="pillar-item">
                  <div className="pillar-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="pillar-text">
                    <h4>Knowledge Sharing</h4>
                    <p>Monthly webinars, research papers, and national journal access.</p>
                  </div>
                </div>
              </div>

              <div className="btn-group">
                <Link href="/about" className="btn btn-navy" id="readMoreAboutBtn">
                  <span>Read More About Us</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link href="/committee" className="btn btn-outline-navy">
                  Meet Managing Committee
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Programs Showcase */}
      <section className="section-padding bg-pale-blue" id="programsPreview">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-yellow">National Flagship Certifications</span>
            <h2 className="section-title">Premier Learning &amp; Certification Programs</h2>
            <p className="section-subtitle">
              Nationally accredited credentials designed to empower trainers, HR executives, and
              organizational change-makers.
            </p>
          </div>

          <div className="programs-grid">
            {FLAGSHIP_PROGRAMS.map((prog) => (
              <div
                key={prog.id}
                className={`program-card ${prog.featured ? 'featured' : ''}`}
              >
                <div>
                  {prog.featured && <span className="program-card-badge">Flagship</span>}
                  <div className="program-icon-wrap">
                    {prog.iconType === 'diploma' && (
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
                    )}
                    {prog.iconType === 'layers' && (
                      <svg
                        width="26"
                        height="26"
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
                        width="26"
                        height="26"
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
                  <p className="program-description">{prog.description}</p>
                  <ul className="program-features">
                    {prog.features.slice(0, 3).map((feat) => (
                      <li key={feat}>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/programs#${prog.id}`}
                  className={`btn ${prog.featured ? 'btn-primary' : 'btn-outline-navy'} btn-sm`}
                  style={{ width: '100%' }}
                >
                  {prog.featured ? 'Program Details & Syllabus' : 'Learn More'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent & Upcoming Chapter Events */}
      <section className="section-padding bg-white" id="eventsPreview">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-blue">
              Chapter Knowledge Sessions &amp; Milestones
            </span>
            <h2 className="section-title">Recent &amp; Upcoming Events</h2>
            <p className="section-subtitle">
              Historic chapter milestones, cutting-edge webinars, and interactive learning
              symposiums led by top thought leaders.
            </p>
          </div>

          {/* Featured Milestone Event Banner Card */}
          <article className="event-card milestone-event-card">
            <PhotoCard
              src="/photos/istd-in.jpeg"
              alt="Inauguration of ISTD Diamond Chapter at Thrissur"
              title="Inauguration of ISTD Diamond Chapter at Thrissur — 30th March 2026"
              caption="Dr. Yogesh Kumar Upadhyay (Past National President) lighting the ceremonial lamp alongside Shri. Nabaghan Pany, Shri. Atul Shah, Prof. (Dr.) Zakkariya K A, and Chairman Shri. Tony Chacko at Hotel Pearl Regency, Thrissur."
              category="Chapter Inauguration"
              badgeText="★ March 30, 2026 • Flagship Milestone"
              headingText="Click to View Inauguration Photo"
              className="event-image-box"
              style={{ borderRadius: 0, border: 'none' }}
            />
            <div className="event-body">
              <div>
                <div className="event-speaker-tag" style={{ color: 'var(--accent-red)' }}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span>
                    Chief Guests: Shri. Atul Shah (National President) &amp; National Executive
                    Council
                  </span>
                </div>
                <h3 className="event-title" style={{ fontSize: '1.45rem' }}>
                  Grand Inauguration of ISTD Diamond Chapter at Thrissur
                </h3>
                <p className="event-desc" style={{ marginBottom: '1.25rem' }}>
                  Held at Hotel Pearl Regency, Thrissur, the historic inauguration of the ISTD
                  Diamond Chapter brought together National President Shri. Atul Shah, Past
                  National President Dr. Yogesh Kumar Upadhyay, National Treasurer Shri. Nabaghan
                  Pany, Regional VP (South) Prof. (Dr.) Zakkariya K A, and Chairman Shri. Tony
                  Chacko for the charter presentation and swearing-in of office bearers.
                </p>
              </div>
              <div className="event-footer">
                <span
                  style={{
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    color: 'var(--color-primary-navy)',
                  }}
                >
                  Venue: Hotel Pearl Regency, Thrissur
                </span>
                <Link href="/gallery" className="btn btn-primary btn-sm">
                  View 24 Event Photos &rarr;
                </Link>
              </div>
            </div>
          </article>

          <div className="events-grid">
            {CHAPTER_EVENTS.map((ev) => (
              <article className="event-card" key={ev.id}>
                <div className="event-image-box">
                  <img src={assetUrl(ev.image)} alt={ev.title} width={560} height={230} loading="lazy" />
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
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: 'var(--color-primary-navy)',
                      }}
                    >
                      {ev.venueOrMode}
                    </span>
                    <Link href="/programs" className="btn btn-outline-blue btn-sm">
                      Event Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/programs" className="btn btn-navy">
              View All Events &amp; Workshops
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Photo Gallery Showcase Section (Bento Grid) */}
      <BentoGalleryPreview />

      {/* Testimonial Section (Swipeable Carousel) */}
      <section
        className="section-padding testimonial-section"
        id="testimonialSection"
        aria-label="Member Testimonials"
      >
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-white">Member Voices</span>
            <h2 className="section-title title-white">What Our Community Says</h2>
            <p className="section-subtitle" style={{ color: '#CBD5E1' }}>
              Hear from experienced corporate trainers, HR consultants, and educators who have
              elevated their careers with ISTD Thrissur.
            </p>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="section-padding-sm bg-white">
        <div className="container">
          <div className="cta-banner-card">
            <div style={{ maxWidth: '650px' }}>
              <h2
                style={{
                  color: '#FFFFFF',
                  fontSize: '2rem',
                  marginBottom: '0.5rem',
                  fontWeight: 800,
                }}
              >
                Ready to Accelerate Your Career in Training &amp; HR?
              </h2>
              <p style={{ color: '#CBD5E1', fontSize: '1.05rem', margin: 0 }}>
                Join India&apos;s most prestigious society for Learning &amp; Development
                professionals today.
              </p>
            </div>
            <div className="btn-group">
              <Link href="/membership" className="btn btn-red btn-lg">
                Apply for Membership
              </Link>
              <Link href="/contact" className="btn btn-outline-white btn-lg">
                Contact Secretariat
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
