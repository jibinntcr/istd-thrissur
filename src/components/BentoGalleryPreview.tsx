'use client';

import React from 'react';
import Link from 'next/link';
import { GALLERY_PHOTOS, assetUrl } from '@/data/siteData';
import { useLightbox } from './LightboxProvider';

const BENTO_ITEMS = [
  {
    src: '/photos/team-istd.jpeg',
    wide: true,
    badge: 'Leadership & Community',
    title: 'ISTD National Executive & Thrissur Chapter Cohort',
    desc: 'Grand group portrait from the Diamond Chapter Inauguration at Pearl Regency, Thrissur.',
  },
  {
    src: '/photos/istd-22.jpeg',
    wide: true,
    badge: 'Inaugural Ceremony',
    title: 'Ceremonial Nilavilakku Lighting by Dignitaries',
    desc: 'Inaugurating a new era of Learning & Development excellence in Central Kerala.',
  },
  {
    src: '/photos/istd-tony-chacko.jpeg',
    wide: false,
    badge: "Chairman's Address",
    title: "Chairman Shri. Tony Chacko's Address",
    desc: 'Setting the strategic vision for the Thrissur Chapter.',
  },
  {
    src: '/photos/istd-sneha.jpeg',
    wide: false,
    badge: 'Felicitations',
    title: 'Honoring Secretary Sneha Rose George',
    desc: 'Presented by Regional VP Prof. (Dr.) Zakkariya K A.',
  },
  {
    src: '/photos/istd-participants.jpeg',
    wide: false,
    badge: 'Dignitary Honor',
    title: 'Treasurer Jibin N Honoring National Leadership',
    desc: 'Draping the ceremonial ponnada to Dr. Yogesh Kumar Upadhyay.',
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
      aria-label="Chapter Photo Gallery Highlights"
    >
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag tag-red">Visual Moments &amp; Archives</span>
          <h2 className="section-title">Diamond Chapter Inauguration Gallery</h2>
          <p className="section-subtitle">
            Glimpses from the grand inauguration of the ISTD Thrissur Diamond Chapter held at Hotel
            Pearl Regency. Click any photograph to launch the interactive fullscreen viewer.
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

        <div style={{ textAlign: 'center', marginTop: '2.75rem' }}>
          <Link href="/gallery" className="btn btn-red btn-lg">
            <span>Explore Full Photo Gallery (24 Official Photos)</span>
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
  );
}
