'use client';

import React from 'react';
import { useLightbox } from './LightboxProvider';
import { GALLERY_PHOTOS, assetUrl } from '@/data/siteData';

interface PhotoCardProps {
  src: string;
  alt: string;
  title: string;
  caption?: string;
  category?: string;
  badgeText?: string;
  headingText?: string;
  aspectRatio?: string;
  compactCaption?: boolean;
  className?: string;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  hideCaptionOverlay?: boolean;
}

export function PhotoCard({
  src,
  alt,
  title,
  caption,
  category,
  badgeText,
  headingText,
  aspectRatio,
  compactCaption = false,
  className = '',
  style,
  imgStyle,
  hideCaptionOverlay = false,
}: PhotoCardProps) {
  const { openLightbox, openSinglePhoto } = useLightbox();

  const handleClick = () => {
    const galleryItems = GALLERY_PHOTOS.map((p) => ({
      src: p.src,
      title: p.title,
      caption: p.caption,
      category: p.categoryLabel,
    }));
    const idx = galleryItems.findIndex((item) => item.src === src);
    if (idx !== -1) {
      openLightbox(galleryItems, idx, false);
    } else {
      openSinglePhoto({ src, title, caption, category });
    }
  };

  return (
    <div
      className={`photo-feature-card ${className}`}
      style={style}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`View full-screen photo: ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div
        className="photo-feature-inner"
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <img src={assetUrl(src)} alt={alt} style={imgStyle} loading="lazy" />
        {!hideCaptionOverlay && (badgeText || headingText) && (
          <div
            className="photo-feature-caption"
            style={compactCaption ? { padding: '0.75rem' } : undefined}
          >
            <div className="photo-feature-caption-text">
              {badgeText && <span>{badgeText}</span>}
              {headingText && (
                <h4 style={compactCaption ? { fontSize: '0.82rem' } : undefined}>
                  {headingText}
                </h4>
              )}
            </div>
            {!compactCaption && (
              <div className="gallery-zoom-icon" aria-hidden="true">
                <svg
                  width="15"
                  height="15"
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}
