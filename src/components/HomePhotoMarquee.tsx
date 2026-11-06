'use client';

import React from 'react';
import Link from 'next/link';
import { GALLERY_PHOTOS, assetUrl } from '@/data/siteData';
import { useLightbox } from './LightboxProvider';

const MARQUEE_PHOTO_IDS = [
  'photo-1',
  'photo-new-zakkariya-podium',
  'photo-new-tony-felicitation',
  'photo-12',
  'photo-new-jibin-address',
  'photo-5',
  'photo-7',
  'photo-19',
  'photo-27',
  'photo-29',
  'photo-31',
  'photo-34',
];

export function HomePhotoMarquee() {
  const { openLightbox } = useLightbox();

  const marqueePhotos = MARQUEE_PHOTO_IDS.map((id) =>
    GALLERY_PHOTOS.find((p) => p.id === id)
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const lightboxItems = marqueePhotos.map((p) => ({
    src: p.src,
    title: p.title,
    caption: p.caption,
    category: p.categoryLabel,
  }));

  const handleOpenPhoto = (index: number) => {
    openLightbox(lightboxItems, index, false);
  };

  return (
    <section
      className="photo-marquee-section"
      aria-label="ISTD Trichur Chapter Moments Photo Ribbon"
    >
      <div className="container">
        <div className="photo-marquee-header">
          <div>
            <span className="section-tag tag-blue">
              Chapter Moments &amp; Visual Chronicle
            </span>
            <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>
              Moments from ISTD Trichur Chapter
            </h2>
          </div>
          <Link href="/gallery" className="btn btn-outline-navy btn-sm">
            Explore Full Photo Gallery (41 Photos) &rarr;
          </Link>
        </div>
      </div>

      {/* Full-Bleed Infinite Scrolling Photo Ribbon */}
      <div className="photo-marquee-viewport">
        <div className="photo-marquee-track">
          {[0, 1].map((loopIdx) => (
            <div
              key={loopIdx}
              className="photo-marquee-group"
              aria-hidden={loopIdx === 1}
            >
              {marqueePhotos.map((photo, idx) => (
                <button
                  key={`${loopIdx}-${photo.id}`}
                  type="button"
                  className="photo-marquee-card"
                  onClick={() => handleOpenPhoto(idx)}
                  tabIndex={loopIdx === 1 ? -1 : 0}
                  aria-label={`View photo: ${photo.title}`}
                >
                  <div className="photo-marquee-img-wrap">
                    <img
                      src={assetUrl(photo.src)}
                      alt={photo.title}
                      loading="lazy"
                    />
                    <span className="photo-marquee-badge">
                      {photo.categoryLabel}
                    </span>
                  </div>
                  <div className="photo-marquee-caption">
                    <strong>{photo.title}</strong>
                    <span>{photo.metaTag}</span>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
