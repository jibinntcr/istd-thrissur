import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GalleryClient } from '@/components/GalleryClient';

export const metadata: Metadata = {
  title: 'Photo Gallery | Diamond Chapter Inauguration & Events',
  description:
    'Explore the official Photo Gallery of the ISTD Thrissur Diamond Chapter Inauguration held on 30th March 2026 at Pearl Regency, Thrissur, graced by ISTD National and Regional leadership.',
};

export default function GalleryPage() {
  return (
    <>
      {/* Page Hero Header */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Photo Gallery</span>
          </div>
          <h1 className="page-hero-title">Chapter Photo Gallery &amp; Archives</h1>
          <p className="page-hero-subtitle">
            Capturing historic milestones, national leadership visits, swearing-in ceremonies, and
            vibrant community moments of the ISTD Thrissur Chapter.
          </p>
        </div>
      </section>

      {/* Interactive Filter, Search, View Switcher & 24-Photo Grid */}
      <GalleryClient />

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
                Be Part of Our Next Chapter Milestone
              </h2>
              <p style={{ color: '#CBD5E1', fontSize: '1.05rem', margin: 0 }}>
                Join ISTD Thrissur Chapter to participate in upcoming workshops, learning forums, and
                leadership conclaves.
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
