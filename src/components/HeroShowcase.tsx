'use client';

import React, { useState, useEffect, useRef } from 'react';
import { HERO_SLIDES, GALLERY_PHOTOS, assetUrl } from '@/data/siteData';
import { useLightbox } from './LightboxProvider';

export function HeroShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const { openLightbox } = useLightbox();

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeSlide = HERO_SLIDES[activeIndex];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: Number((-y * 7).toFixed(2)),
      ry: Number((x * 7).toFixed(2)),
    });
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setTilt({ rx: 0, ry: 0 });
  };

  const handleOpenFullscreen = () => {
    const galleryItems = GALLERY_PHOTOS.map((p) => ({
      src: p.src,
      title: p.title,
      caption: p.caption,
      category: p.categoryLabel,
    }));
    const matchIdx = galleryItems.findIndex(
      (item) => item.src === activeSlide.src
    );
    openLightbox(galleryItems, matchIdx >= 0 ? matchIdx : 0, false);
  };

  return (
    <div
      ref={cardRef}
      className="hero-photo-showcase hero-3d-stage"
      onMouseEnter={() => setIsPaused(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating 3D Decorative Orbital Ring Behind Card */}
      <div className="hero-3d-orbit-ring" aria-hidden="true" />
      <div className="hero-3d-glow-orb" aria-hidden="true" />

      {/* Floating 3D Badge Top-Left */}
      <div className="hero-3d-floating-badge top-left" aria-hidden="true">
        <span className="hero-3d-diamond-icon">◆</span>
        <div>
          <strong>Diamond Chapter</strong>
          <span>ISTD Trichur • Est. 2026</span>
        </div>
      </div>

      {/* Main 3D Tilt Card */}
      <div
        className="hero-main-photo-card hero-3d-card"
        style={{
          transform: `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
      >
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
            width={640}
            height={480}
          />
          <div className="hero-photo-overlay">
            <div className="hero-photo-top-badges">
              <span className="hero-live-pill">
                <span className="pulse-dot" />
                <span id="heroMainPhotoBadge">{activeSlide.badge}</span>
              </span>
              <span
                className="hero-expand-hint"
                title="Click to view fullscreen"
              >
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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  marginBottom: '0.25rem',
                }}
              >
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#FBBF24',
                  }}
                >
                  Slide 0{activeIndex + 1} / 0{HERO_SLIDES.length}
                </span>
              </div>
              <h4 id="heroMainPhotoTitle">{activeSlide.title}</h4>
              <p id="heroMainPhotoDesc">{activeSlide.desc}</p>
            </div>
          </div>
        </div>

        {/* Interactive 5-Photo Switcher Strip */}
        <div
          className="hero-thumb-strip"
          aria-label="Switch featured chapter photograph"
          style={{
            gridTemplateColumns: `repeat(${HERO_SLIDES.length}, 1fr)`,
          }}
        >
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.src}
              type="button"
              className={`hero-thumb-btn ${
                idx === activeIndex ? 'active' : ''
              }`}
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
