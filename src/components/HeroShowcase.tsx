'use client';

import React, { useState, useEffect } from 'react';
import { HERO_SLIDES, GALLERY_PHOTOS, assetUrl } from '@/data/siteData';
import { useLightbox } from './LightboxProvider';

export function HeroShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { openLightbox } = useLightbox();

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeSlide = HERO_SLIDES[activeIndex];

  const handleOpenFullscreen = () => {
    const galleryItems = GALLERY_PHOTOS.map((p) => ({
      src: p.src,
      title: p.title,
      caption: p.caption,
      category: p.categoryLabel,
    }));
    const matchIdx = galleryItems.findIndex((item) => item.src === activeSlide.src);
    openLightbox(galleryItems, matchIdx >= 0 ? matchIdx : 0, false);
  };

  return (
    <div
      className="hero-photo-showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="hero-main-photo-card">
        <div
          className="hero-main-photo-frame"
          id="heroMainPhotoFrame"
          onClick={handleOpenFullscreen}
          role="button"
          tabIndex={0}
          aria-label={`View fullscreen: ${activeSlide.title}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpenFullscreen();
            }
          }}
        >
          <img
            src={assetUrl(activeSlide.src)}
            alt={activeSlide.title}
            id="heroMainPhotoImg"
            width={600}
            height={450}
          />
          <div className="hero-photo-overlay">
            <div className="hero-photo-top-badges">
              <span className="hero-live-pill">
                <span className="pulse-dot" />
                <span id="heroMainPhotoBadge">{activeSlide.badge}</span>
              </span>
              <span className="hero-expand-hint" title="Click to view fullscreen">
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
              </span>
            </div>
            <div className="hero-photo-caption-box">
              <h4 id="heroMainPhotoTitle">{activeSlide.title}</h4>
              <p id="heroMainPhotoDesc">{activeSlide.desc}</p>
            </div>
          </div>
        </div>

        {/* Interactive 4-Photo Switcher Strip */}
        <div className="hero-thumb-strip" aria-label="Switch featured chapter photograph">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.src}
              type="button"
              className={`hero-thumb-btn ${idx === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Select photo ${idx + 1}: ${slide.title}`}
            >
              <img src={assetUrl(slide.src)} alt={slide.title} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
