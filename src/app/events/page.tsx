import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { EventsChronicleSection } from '@/components/EventsChronicleSection';
import { buildPageMetadata, getEventsCollectionJsonLd } from '@/lib/seoConfig';

export const metadata: Metadata = buildPageMetadata({
  title: 'Events, Webinars & Programmes',
  description:
    'Explore year-wise categorized webinars, learning sessions, workshops, campus milestones, and completed event reports organised by the ISTD Trichur Chapter.',
  path: '/events',
  image: '/images/event-aiot-boopathy.jpg',
  keywords: [
    'ISTD Trichur Events',
    'ISTD Trichur Webinars',
    'HR and L&D Workshops Kerala',
    'Advancing AIoT Research Boopathy ISTD',
    'Chapter Connect 2026 ISTD Trichur',
  ],
});

export default function EventsPage() {
  const eventsJsonLd = getEventsCollectionJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />
      {/* Page Hero Header */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Events &amp; Programmes</span>
          </div>
          <h1 className="page-hero-title">Events &amp; Programmes</h1>
          <p className="page-hero-subtitle">
            Explore year-wise categorized learning sessions, workshops, campus
            chapter milestones, and official event reports organised by the ISTD
            Trichur Chapter.
          </p>
        </div>
      </section>

      {/* Year-Wise Categorized & Searchable Events Directory */}
      <EventsChronicleSection initialTab="all" />

      {/* Speaker & Programme Proposal Invitation */}
      <section className="section-padding bg-pale-blue">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-inner">
              <div>
                <span className="section-tag tag-yellow">
                  Academic &amp; Industry Collaboration
                </span>
                <h2>Propose a Workshop, Seminar, or Learning Session</h2>
                <p style={{ textAlign: 'justify' }}>
                  HR leaders, corporate trainers, academicians, and institutions
                  interested in collaborating on upcoming ISTD Trichur Chapter
                  programmes are invited to get in touch with our chapter office
                  bearers.
                </p>
              </div>
              <div className="btn-group">
                <Link
                  href="/contact?type=event&event=Programme+Collaboration+or+Speaker+Proposal"
                  className="btn btn-red"
                >
                  Contact Us About Programmes
                </Link>
                <Link href="/membership" className="btn btn-outline-white">
                  Become a Member
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
