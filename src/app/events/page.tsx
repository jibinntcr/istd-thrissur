import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { EventsChronicleSection } from '@/components/EventsChronicleSection';
import { PhotoCard } from '@/components/PhotoCard';

export const metadata: Metadata = {
  title: 'Events & Chapter Chronicles | Upcoming Events & Past Event Reports',
  description:
    'Explore Upcoming Events and Official Past Event Reports of the ISTD Thrissur (Trichur) Chapter, including the Diamond Chapter Inauguration Report (30 March 2026).',
};

export default function EventsPage() {
  return (
    <>
      {/* Page Hero Header */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Events &amp; Chapter Chronicles</span>
          </div>
          <h1 className="page-hero-title">Events &amp; Chapter Chronicles</h1>
          <p className="page-hero-subtitle">
            Official post-event executive reports, chapter milestones, and our upcoming calendar of
            learning sessions and conclaves in Thrissur.
          </p>
        </div>
      </section>

      {/* Main Interactive Upcoming Events & Past Event Reports Section */}
      <EventsChronicleSection mode="full" />

      {/* Event Visual Highlights Archive */}
      <section className="section-padding bg-pale-blue" id="eventPhotoHighlights">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag tag-red">Event Visual Archive</span>
            <h2 className="section-title">Event Moments &amp; Photographic Highlights</h2>
            <p className="section-subtitle">
              Click any photograph to open the fullscreen viewer, or browse all 24 official high-res
              photographs in our Chapter Photo Gallery.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}
          >
            <PhotoCard
              src="/photos/istd-national-president.jpeg"
              alt="Charter Presentation by National President Shri. Atul Shah"
              title="Diamond Chapter Charter Presentation"
              caption="National President Shri. Atul Shah presenting the official Diamond Chapter Charter to Regional VP Prof. (Dr.) Zakkariya K A as National Treasurer Shri. Nabaghana Pany applauds."
              category="Charter Handover"
              badgeText="Charter Presentation"
              headingText="National President Shri. Atul Shah"
              aspectRatio="4/3"
              compactCaption
            />
            <PhotoCard
              src="/photos/istd-tony-chacko.jpeg"
              alt="Chairman Shri. Tony Chacko Address"
              title="Chairman Shri. Tony Chacko's Address"
              caption="Chairman Shri. Tony Chacko outlining the vision and roadmap of the ISTD Trichur Chapter."
              category="Chairman's Address"
              badgeText="Chairman's Address"
              headingText="Shri. Tony Chacko Addressing the Gathering"
              aspectRatio="4/3"
              compactCaption
            />
            <PhotoCard
              src="/photos/istd-calicut.jpeg"
              alt="Dignitaries on the Dais at Hotel Pearl Regency Thrissur"
              title="Presidential & Keynote Addresses on the Dais"
              caption="Dr. Yogesh Kumar Upadhyay, Shri. Nabaghana Pany, Shri. Atul Shah, Prof. (Dr.) Zakkariya K A, and Shri. Tony Chacko on the dais."
              category="Keynote Session"
              badgeText="Keynote Session"
              headingText="Dignitaries on the Dais"
              aspectRatio="4/3"
              compactCaption
            />
            <PhotoCard
              src="/photos/istd-treasurer.jpeg"
              alt="Address by Treasurer Mr. Jibin N"
              title="Address by Chapter Treasurer Mr. Jibin N"
              caption="Chapter Treasurer Mr. Jibin N addressing the gathering with National leaders on the dais."
              category="Chapter Address"
              badgeText="Chapter Address"
              headingText="Treasurer Mr. Jibin N Addressing Delegates"
              aspectRatio="4/3"
              compactCaption
            />
            <PhotoCard
              src="/photos/istd-sneha.jpeg"
              alt="Felicitation of Secretary Ms. Sneha Rose George"
              title="Felicitation of Secretary Ms. Sneha Rose George"
              caption="Regional VP Prof. (Dr.) Zakkariya K A presenting a floral memento to Chapter Secretary Ms. Sneha Rose George."
              category="Felicitations"
              badgeText="Felicitations"
              headingText="Honoring Secretary Ms. Sneha Rose George"
              aspectRatio="4/3"
              compactCaption
            />
            <PhotoCard
              src="/photos/istd-participants.jpeg"
              alt="Felicitation of Past National President Dr. Yogesh Kumar Upadhyay"
              title="Honoring Past National President Dr. Yogesh Kumar Upadhyay"
              caption="Treasurer Mr. Jibin N draping the traditional ponnada to Dr. Yogesh Kumar Upadhyay."
              category="Dignitary Honor"
              badgeText="Dignitary Honor"
              headingText="Honoring Dr. Yogesh Kumar Upadhyay"
              aspectRatio="4/3"
              compactCaption
            />
            <PhotoCard
              src="/photos/istd-national-treasurer.jpeg"
              alt="Honoring National Treasurer Shri. Nabaghana Pany"
              title="Honoring National Treasurer Shri. Nabaghana Pany"
              caption="Honoring ISTD National Treasurer Shri. Nabaghana Pany on stage."
              category="Dignitary Honor"
              badgeText="Dignitary Honor"
              headingText="Honoring Shri. Nabaghana Pany"
              aspectRatio="4/3"
              compactCaption
            />
            <PhotoCard
              src="/photos/istd-audience.jpeg"
              alt="Gathering of L&D Leaders and Delegates"
              title="August Gathering of HR & L&D Professionals"
              caption="HR leaders, corporate trainers, academicians, and chapter members participating in the ceremony."
              category="Chapter Community"
              badgeText="Delegate Audience"
              headingText="HR Leaders, Trainers & Academicians"
              aspectRatio="4/3"
              compactCaption
            />
          </div>

          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <Link href="/gallery" className="btn btn-red btn-lg">
              <span>Explore Full 24-Photo Event Gallery</span>
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
    </>
  );
}
