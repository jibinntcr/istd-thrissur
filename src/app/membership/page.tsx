import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PhotoCard } from '@/components/PhotoCard';
import { MembershipForm } from '@/components/MembershipForm';

export const metadata: Metadata = {
  title: 'Membership',
  description:
    'Join ISTD Thrissur Chapter - Explore membership tiers for individual trainers, corporations, universities, and students in Central Kerala.',
};

export default function MembershipPage() {
  return (
    <>
      {/* Page Hero Header */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Membership</span>
          </div>
          <h1 className="page-hero-title">Join ISTD Thrissur Chapter</h1>
          <p className="page-hero-subtitle">
            Become a part of India&apos;s premier community of Learning, Training &amp; Human
            Resource leaders.
          </p>
        </div>
      </section>

      {/* Membership Intro Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="about-grid">
            <div className="about-content-block">
              <span className="section-tag tag-red">Grow Your Career</span>
              <h2 className="section-title">Grow Your L&amp;D Career with ISTD</h2>
              <p className="about-lead">
                Become a part of India&apos;s largest network of training professionals. Membership
                is open to individuals and institutions involved in the training and development of
                Human Resources from Government, Public, and Private Sectors, as well as Educational
                Institutions.
              </p>
              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--color-ink-light)',
                  lineHeight: 1.7,
                  marginBottom: '1.75rem',
                }}
              >
                Whether you are an independent trainer, a corporate HR leader, an institutional
                educator, or a budding talent specialist, ISTD Thrissur offers you the local
                platform and national standing to accelerate your professional journey.
              </p>
              <div className="btn-group">
                <a href="#applySection" className="btn btn-red btn-lg" id="applyOnlineCTA">
                  <span>Apply Online</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <a
                  href="https://www.istd.in/membership"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-navy btn-lg"
                >
                  <span>National Portal Form</span>
                </a>
              </div>
            </div>

            <div className="about-image-wrapper">
              <div className="photo-collage-wrapper">
                <PhotoCard
                  src="/photos/istd-audience.jpeg"
                  alt="ISTD Thrissur Chapter Professional Community"
                  title="ISTD Thrissur Chapter Professional Network"
                  caption="Trainers, educators, HR professionals, academicians, and industry leaders of the ISTD Thrissur Chapter."
                  category="Chapter Community"
                  badgeText="Active L&D Fraternity"
                  headingText="A Vibrant Network of L&D Practitioners"
                />
                <div className="photo-sub-grid">
                  <PhotoCard
                    src="/photos/istd-kozhikkod.jpeg"
                    alt="Executive Committee and Members"
                    title="Shared Commitment to HRD Excellence"
                    caption="Chapter leadership and members collaborating to strengthen the regional L&D ecosystem."
                    category="Chapter Leadership"
                    badgeText="Collaboration"
                    headingText="Executive & Member Cohort"
                    aspectRatio="4 / 3"
                    compactCaption
                  />
                  <PhotoCard
                    src="/photos/istd.jpeg"
                    alt="ISTD Thrissur Community"
                    title="ISTD Thrissur Chapter Delegation with National Leaders"
                    caption="Chapter members and office bearers with ISTD National Executive leaders."
                    category="Community"
                    badgeText="Fraternity"
                    headingText="Vibrant L&D Network"
                    aspectRatio="4 / 3"
                    compactCaption
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Categories (List & Grid) */}
      <section className="section-padding bg-pale-blue" id="categoriesSection">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-blue">Choose Your Membership</span>
            <h2 className="section-title">Membership Categories</h2>
            <p className="section-subtitle">
              Tailored membership tiers designed to support trainers, corporations, universities,
              and students.
            </p>
          </div>

          <div className="programs-grid">
            {/* Category 1: Individual Membership */}
            <div className="program-card featured" id="catIndividual">
              <div>
                <span className="program-card-badge">Most Popular</span>
                <div className="program-icon-wrap">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="program-duration">Professional Category</span>
                <h3 className="program-title">Individual Life Membership</h3>
                <p className="program-description">
                  For practicing trainers, HR executives, consultants, behavioral coaches &amp;
                  academicians.
                </p>
                <ul className="program-features">
                  <li>
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
                    Voting rights in annual chapter elections
                  </li>
                  <li>
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
                    Free access to monthly chapter webinars &amp; meetups
                  </li>
                  <li>
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
                    Complimentary subscription to quarterly IJTD journal
                  </li>
                  <li>
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
                    Exclusive discounts on National Conventions
                  </li>
                </ul>
              </div>
              <a href="#applySection" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                Select Individual
              </a>
            </div>

            {/* Category 2: Institutional Membership */}
            <div className="program-card" id="catInstitutional">
              <div>
                <div className="program-icon-wrap">
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
                <span className="program-duration">Corporate &amp; Academic</span>
                <h3 className="program-title">Institutional Membership</h3>
                <p className="program-description">
                  For corporate enterprises, universities, colleges, public sector units, and
                  training academies.
                </p>
                <ul className="program-features">
                  <li>
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
                    Nominate multiple corporate executives for events
                  </li>
                  <li>
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
                    Custom in-house corporate training sessions
                  </li>
                  <li>
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
                    Campus placement &amp; trainer empanelment support
                  </li>
                  <li>
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
                    National directory institutional listing
                  </li>
                </ul>
              </div>
              <a
                href="#applySection"
                className="btn btn-outline-navy btn-sm"
                style={{ width: '100%' }}
              >
                Select Institutional
              </a>
            </div>

            {/* Category 3: Student Membership */}
            <div className="program-card" id="catStudent">
              <div>
                <div className="program-icon-wrap">
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
                <span className="program-duration">Student Concession</span>
                <h3 className="program-title">Student Membership</h3>
                <p className="program-description">
                  For full-time students pursuing MBA, MSW, HR, Psychology, or Management degrees.
                </p>
                <ul className="program-features">
                  <li>
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
                    Subsidized student entry to all chapter workshops
                  </li>
                  <li>
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
                    Senior HR mentorship &amp; live project guidance
                  </li>
                  <li>
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
                    Internship referrals with corporate partners
                  </li>
                  <li>
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
                    Access to ISTD research papers &amp; monographs
                  </li>
                </ul>
              </div>
              <a
                href="#applySection"
                className="btn btn-outline-navy btn-sm"
                style={{ width: '100%' }}
              >
                Select Student
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Online / Enquiry Section */}
      <section className="section-padding bg-white" id="applySection">
        <div className="container container-narrow">
          <MembershipForm />
        </div>
      </section>
    </>
  );
}
