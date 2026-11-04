import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { EventsChronicleSection } from '@/components/EventsChronicleSection';
import { buildPageMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = buildPageMetadata({
  title: 'Events, Webinars & Programmes',
  description:
    'Explore upcoming webinars, learning sessions, workshops, seminars, and completed event reports organised by the ISTD Thrissur (Trichur) Chapter.',
  path: '/events',
  image: '/images/event-aiot-boopathy.jpg',
  keywords: [
    'ISTD Thrissur Events',
    'ISTD Trichur Webinars',
    'HR and L&D Workshops Kerala',
    'Advancing AIoT Research Boopathy ISTD',
  ],
});

export default function EventsPage() {
  return (
    <>
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
            Explore learning sessions, workshops, seminars, and other activities organised by the
            ISTD Thrissur Chapter.
          </p>
        </div>
      </section>

      {/* Upcoming Events & Past Events Tabs */}
      <EventsChronicleSection initialTab="upcoming" />

      {/* Speaker & Programme Proposal Invitation */}
      <section className="section-padding bg-pale-blue">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-inner">
              <div>
                <span className="section-tag tag-yellow">Academic &amp; Industry Collaboration</span>
                <h2>Propose a Workshop, Seminar, or Learning Session</h2>
                <p>
                  HR leaders, corporate trainers, academicians, and institutions interested in
                  collaborating on upcoming ISTD Thrissur Chapter programmes are invited to get in
                  touch with our chapter office bearers.
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
