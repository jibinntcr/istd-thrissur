'use client';

import React from 'react';
import Link from 'next/link';
import { GALLERY_PHOTOS, assetUrl } from '@/data/siteData';
import { useLightbox } from './LightboxProvider';

const BENTO_ITEMS = [
  {
    src: '/photos/team-istd.jpeg',
    wide: true,
    badge: 'Leadership & Fraternity',
    title: 'ISTD National Executive & Thrissur Chapter Cohort',
    desc: 'Bringing together trainers, educators, HR professionals, academicians, and industry leaders across Central Kerala.',
  },
  {
    src: '/photos/istd-22.jpeg',
    wide: true,
    badge: 'Tradition & Excellence',
    title: 'Upholding 55+ Years of ISTD National Legacy',
    desc: 'Advancing human resource development, workplace learning, and collaborative leadership in Kerala.',
  },
  {
    src: '/photos/istd-tony-chacko.jpeg',
    wide: false,
    badge: 'Chapter Vision',
    title: 'Chairman Shri. Tony Chacko',
    desc: 'Driving strategic industry-academia synergy and L&D transformation.',
  },
  {
    src: '/photos/istd-sneha.jpeg',
    wide: false,
    badge: 'Academic & Research Excellence',
    title: 'Secretary Ms. Sneha Rose George with Prof. (Dr.) Zakkariya K A',
    desc: 'Strengthening scholarly collaboration and trainer development.',
  },
  {
    src: '/photos/istd-participants.jpeg',
    wide: false,
    badge: 'National Mentorship',
    title: 'Treasurer Mr. Jibin N with Dr. Yogesh Kumar Upadhyay',
    desc: 'Connecting regional talent with national L&D pioneers.',
  },
];

export function BentoGalleryPreview() {
  const { openLightbox } = useLightbox();

  const handleOpen = (src: string) => {
    const allItems = GALLERY_PHOTOS.map((p) => ({
      src: p.src,
      title: p.title,
      caption: p.caption,
      category: p.categoryLabel,
    }));
    const idx = allItems.findIndex((item) => item.src === src);
    openLightbox(allItems, idx >= 0 ? idx : 0, false);
  };

  return (
    <section
      className="section-padding bg-pale-blue"
      id="galleryPreview"
      aria-label="Chapter Community & Visual Highlights"
    >
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag tag-red">Chapter Community in Action</span>
          <h2 className="section-title">Leadership, Fellowship &amp; Knowledge Exchange</h2>
          <p className="section-subtitle">
            A vibrant professional forum uniting HR practitioners, corporate facilitators,
            academicians, and enterprise leaders across Thrissur and Central Kerala. Click any
            photograph to view in fullscreen.
          </p>
        </div>

        <div className="gallery-preview-grid">
          {BENTO_ITEMS.map((item) => (
            <div
              key={item.src}
              className={`gallery-bento-item ${item.wide ? 'bento-wide' : ''}`}
              onClick={() => handleOpen(item.src)}
              role="button"
              tabIndex={0}
              aria-label={`View fullscreen: ${item.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpen(item.src);
                }
              }}
            >
              <img src={assetUrl(item.src)} alt={item.title} loading="lazy" />
              <div className="gallery-item-overlay">
                <div className="gallery-item-top">
                  <span className="gallery-cat-badge">{item.badge}</span>
                  <div className="gallery-zoom-icon" aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  </div>
                </div>
                <div className="gallery-item-bottom">
                  {item.wide ? <h3>{item.title}</h3> : <h4>{item.title}</h4>}
                  <p>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginTop: '2.75rem',
          }}
        >
          <Link href="/gallery" className="btn btn-red btn-lg">
            <span>Explore Chapter Photo Gallery</span>
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
          <Link href="/events" className="btn btn-outline-navy btn-lg">
            <span>View Chapter Events &amp; Milestones</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
