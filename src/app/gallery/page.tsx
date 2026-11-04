import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GalleryClient } from '@/components/GalleryClient';
import { buildPageMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = buildPageMetadata({
  title: 'Photo Gallery — Inauguration & Chapter Events',
  description:
    'Official photo gallery of the ISTD Thrissur Diamond Chapter inauguration on 30 March 2026 at Hotel Pearl Regency, Thrissur, and chapter learning sessions.',
  path: '/gallery',
  image: '/photos/istd-22.jpeg',
  keywords: [
    'ISTD Thrissur Photo Gallery',
    'ISTD Diamond Chapter Inauguration Photos',
    'Hotel Pearl Regency Thrissur ISTD',
  ],
});

export default function GalleryPage() {
  return (
    <>
      {/* Page Hero Header */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Gallery</span>
          </div>
          <h1 className="page-hero-title">Gallery</h1>
          <p className="page-hero-subtitle">
            Photographs from the ISTD Thrissur Chapter inauguration on 30 March 2026 at Hotel Pearl
            Regency, Thrissur, with factual captions identifying the occasion and participants.
          </p>
        </div>
      </section>

      {/* Interactive Filter, Search, View Switcher & 24-Photo Grid */}
      <GalleryClient />

      {/* CTA Banner Section */}
      <section className="section-padding-sm bg-white">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-inner">
              <div>
                <span className="section-tag tag-yellow">Join Our Chapter</span>
                <h2>Participate in Upcoming ISTD Thrissur Chapter Programmes</h2>
                <p>
                  Explore our upcoming events or enquire about membership with the ISTD Thrissur
                  Chapter.
                </p>
              </div>
              <div className="btn-group">
                <Link href="/events" className="btn btn-red">
                  Events &amp; Programmes
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
