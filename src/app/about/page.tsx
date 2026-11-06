import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PhotoCard } from '@/components/PhotoCard';
import { OFFICIAL_LINKS } from '@/data/siteData';
import { buildPageMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = buildPageMetadata({
  title: 'About Us — History, Vision & Mission',
  description:
    'Learn about the Indian Society for Training & Development (ISTD, established April 1970 in New Delhi) and the ISTD Trichur Diamond Chapter (inaugurated 30 March 2026 in Trichur, Kerala).',
  path: '/about',
  image: '/photos/istd-national-president.jpeg',
  keywords: [
    'About ISTD Trichur Chapter',
    'ISTD History April 1970',
    'ISTD Diamond Chapter Trichur Inauguration',
    'ISTD Vision and Mission',
  ],
});

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
          <h1 className="page-hero-title">About Us</h1>
          <p className="page-hero-subtitle">
            Learn about the Indian Society for Training &amp; Development (ISTD) and the mission,
            vision, and activities of the ISTD Trichur Chapter.
          </p>
        </div>
      </section>

      {/* Distinction: ISTD National Establishment vs. Trichur Chapter Establishment */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="split-grid" style={{ alignItems: 'start', gap: '2.5rem' }}>
            <div>
              <PhotoCard
                src="/photos/istd-national-president.jpeg"
                alt="National President Shri. Atul Shah presenting the Diamond Chapter Charter to National Vice President Prof. (Dr.) Zakkariya K. A."
                title="Presentation of the Diamond Chapter Charter"
                caption="National President Shri. Atul Shah presenting the Diamond Chapter Charter to National Vice President Prof. (Dr.) Zakkariya K. A. as National Treasurer Shri. Nabaghana Pany looks on (30 March 2026)."
                category="Charter Presentation"
                badgeText="30 March 2026 • Trichur"
                headingText="Presentation of the Diamond Chapter Charter"
                aspectRatio="16/10"
              />
              <div
                className="photo-sub-grid"
                style={{
                  marginTop: '1rem',
                }}
              >
                <PhotoCard
                  src="/photos/istd-in.jpeg"
                  alt="Oath of office administered by National President Shri. Atul Shah"
                  title="Installation of Office Bearers"
                  caption="National President Shri. Atul Shah administering the oath of office to the Trichur Chapter Managing Committee on 30 March 2026."
                  category="Installation"
                  badgeText="30 March 2026"
                  headingText="Installation of Office Bearers"
                  aspectRatio="4/3"
                  compactCaption
                />
                <PhotoCard
                  src="/photos/istd-calicut.jpeg"
                  alt="Dignitaries seated on the dais at the Trichur Chapter inauguration"
                  title="Dignitaries on the Dais"
                  caption="Past National President Dr. Yogesh Kumar Upadhyay, National Treasurer Shri. Nabaghana Pany, National President Shri. Atul Shah, National Vice President Prof. (Dr.) Zakkariya K. A., and Chapter Chairman Tony Chacko."
                  category="Inauguration"
                  badgeText="30 March 2026"
                  headingText="Dignitaries on the Dais"
                  aspectRatio="4/3"
                  compactCaption
                />
              </div>
            </div>

            <div>
              <span className="section-tag tag-blue">National &amp; Chapter Profile</span>
              <h2 className="section-title">
                Advancing Training &amp; Human Resource Development
              </h2>

              <h3
                style={{
                  fontSize: '1.12rem',
                  fontWeight: 800,
                  color: 'var(--brand-navy)',
                  marginBottom: '0.45rem',
                }}
              >
                ISTD National Body (Established April 1970, New Delhi)
              </h3>
              <p
                style={{
                  color: 'var(--color-body)',
                  fontSize: '0.96rem',
                  lineHeight: 1.72,
                  marginBottom: '1.2rem',
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
                , established in <strong>April 1970</strong>, is a national non-profit professional
                society registered under the Societies Registration Act, 1860. It has a broad
                membership of individuals and institutions involved in the area of training and
                development of human resources from government, public and private sector
                organisations, educational and training institutions, and other professional bodies.
                ISTD is affiliated to the International Federation of Training and Development
                Organizations (IFTDO), Geneva.
              </p>

              <h3
                style={{
                  fontSize: '1.12rem',
                  fontWeight: 800,
                  color: 'var(--brand-navy)',
                  marginBottom: '0.45rem',
                }}
              >
                ISTD Trichur Chapter (Inaugurated 30 March 2026)
              </h3>
              <p
                style={{
                  color: 'var(--color-body)',
                  fontSize: '0.96rem',
                  lineHeight: 1.72,
                  marginBottom: '1.2rem',
                }}
              >
                The <strong>ISTD Trichur Chapter</strong> (also known as the{' '}
                <em>ISTD Trichur Chapter</em>) was inaugurated on <strong>30 March 2026</strong> at
                Hotel Pearl Regency, Trichur, marking the establishment of the{' '}
                <strong>Diamond Chapter</strong> of ISTD in its 55th year. The chapter brings
                together trainers, educators, HR professionals, academicians, and industry
                practitioners across the Trichur region for continuous learning, knowledge
                exchange, and collaborative human resource development.
              </p>

              <div className="btn-group" style={{ marginTop: '1.5rem' }}>
                <Link href="/events/inauguration" className="btn btn-primary btn-sm">
                  Read Inauguration Report
                </Link>
                <Link href="/committee" className="btn btn-outline-navy btn-sm">
                  View Managing Committee
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
            <span className="section-tag tag-blue">Purpose &amp; Direction</span>
            <h2 className="section-title">Vision &amp; Mission</h2>
            <p className="section-subtitle">
              Guided by the national mandate of ISTD and our commitment to regional professional
              development.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.75rem',
              maxWidth: '960px',
              margin: '0 auto',
            }}
          >
            <div className="CleanCard" style={{ borderTop: '4px solid var(--brand-blue)' }}>
              <span className="section-tag tag-blue">Official ISTD Vision</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                ISTD National Vision &amp; Mission
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-body)' }}>
                <strong>Vision:</strong> “Leading Transformation through Training &amp;
                Development.”
              </p>
              <p
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  color: 'var(--color-body)',
                  marginBottom: 0,
                }}
              >
                <strong>Mission:</strong> To facilitate individuals and organisations to excel in
                Training &amp; Development and serve as a reservoir of universal HRD knowledge.
              </p>
            </div>

            <div className="CleanCard" style={{ borderTop: '4px solid var(--accent-red)' }}>
              <span className="section-tag tag-red">Chapter Objectives</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                Trichur Chapter Mission &amp; Focus
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-body)' }}>
                To foster a culture of continuous learning and professional development among
                trainers, educators, HR practitioners, and organisational leaders in the Trichur
                region.
              </p>
              <p
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  color: 'var(--color-body)',
                  marginBottom: 0,
                }}
              >
                To serve as a collaborative professional body in Central Kerala connecting industry
                and academia through practical workshops, seminars, and peer knowledge sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-blue">Chapter Activities</span>
            <h2 className="section-title">What We Do</h2>
            <p className="section-subtitle">
              Key activities organised by the ISTD Trichur Chapter for members and the wider
              professional community.
            </p>
          </div>

          <div className="grid-3">
            <div className="CleanCard">
              <span className="section-tag tag-blue">01 • Learning Sessions</span>
              <h3 style={{ fontSize: '1.18rem', fontWeight: 800, marginBottom: '0.65rem' }}>
                Training Programmes, Workshops &amp; Webinars
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-body)', lineHeight: 1.65, marginBottom: 0 }}>
                Organising regional training sessions, webinars, and seminars on contemporary
                topics such as AI in workplace learning, instructional design, and facilitation
                practices.
              </p>
            </div>

            <div className="CleanCard">
              <span className="section-tag tag-red">02 • Practitioner Exchange</span>
              <h3 style={{ fontSize: '1.18rem', fontWeight: 800, marginBottom: '0.65rem' }}>
                Professional Networking &amp; Knowledge Sharing
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-body)', lineHeight: 1.65, marginBottom: 0 }}>
                Creating opportunities for HR professionals, corporate trainers, consultants, and
                faculty members to exchange case studies, methodologies, and practical insights.
              </p>
            </div>

            <div className="CleanCard">
              <span className="section-tag tag-yellow">03 • Regional Collaboration</span>
              <h3 style={{ fontSize: '1.18rem', fontWeight: 800, marginBottom: '0.65rem' }}>
                Industry–Academia Engagement
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-body)', lineHeight: 1.65, marginBottom: 0 }}>
                Connecting management institutions, universities, and business organisations in
                Trichur to encourage dialogue on skill development and workplace readiness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* National Affiliation CTA */}
      <section className="section-padding-sm bg-pale-blue">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-inner">
              <div>
                <span className="section-tag tag-yellow">National Affiliation</span>
                <h2>Affiliated with ISTD National Office, New Delhi</h2>
                <p>
                  Visit the official ISTD national portal (istd.in) to learn more about national
                  programmes, publications (IJTD), and institutional initiatives, or join the
                  Trichur Chapter.
                </p>
              </div>
              <div className="btn-group">
                <Link href="/membership" className="btn btn-red">
                  Become a Member
                </Link>
                <a
                  href={OFFICIAL_LINKS.istdNationalWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-white"
                >
                  Visit istd.in ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
