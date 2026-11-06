'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { HERO_SLIDES, assetUrl } from '@/data/siteData';
import { useLightbox } from './LightboxProvider';

export function HeroShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const stageRef = useRef<HTMLDivElement>(null);
  const { openLightbox } = useLightbox();

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeSlide = HERO_SLIDES[activeIndex];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const x = px - 0.5;
    const y = py - 0.5;
    setTilt({
      rx: Number((-y * 8).toFixed(2)),
      ry: Number((x * 8).toFixed(2)),
      gx: Math.round(px * 100),
      gy: Math.round(py * 100),
    });
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });
  };

  const handleOpenFullscreen = () => {
    const heroLightboxItems = HERO_SLIDES.map((s) => ({
      src: s.src,
      title: s.title,
      caption: s.caption,
      category: s.badge,
    }));
    openLightbox(heroLightboxItems, activeIndex, false);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div
      ref={stageRef}
      className="hero-cinema-stage"
      onMouseEnter={() => setIsPaused(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient 3D Halo & Layered Glass Depth Planes */}
      <div className="hero-cinema-halo" aria-hidden="true" />
      <div className="hero-depth-plane plane-back" aria-hidden="true" />
      <div className="hero-depth-plane plane-mid" aria-hidden="true" />

      {/* Floating 3D Official Seal Badge (Top-Left) */}
      <div className="hero-floating-crest-card" aria-hidden="true">
        <div className="hero-floating-crest-seal">
          <img
            src={assetUrl('/images/logo-circle.png')}
            alt="ISTD Seal"
            width={38}
            height={38}
          />
        </div>
        <div className="hero-floating-crest-text">
          <span className="crest-kicker">◆ DIAMOND CHAPTER</span>
          <strong>ISTD Trichur Chapter</strong>
          <span className="crest-sub">Inaugurated 30 March 2026</span>
        </div>
      </div>

      {/* Main 3D Tilt Cinema Frame */}
      <div
        className="hero-cinema-card"
        style={
          {
            transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            '--glare-x': `${tilt.gx}%`,
            '--glare-y': `${tilt.gy}%`,
          } as React.CSSProperties
        }
      >
        <div
          className="hero-cinema-viewport"
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
          {/* Crossfading High-Resolution Slides (No Thumbnail Clutter) */}
          {HERO_SLIDES.map((slide, idx) => (
            <img
              key={slide.src}
              src={assetUrl(slide.src)}
              alt={slide.title}
              className={`hero-cinema-slide-img ${
                idx === activeIndex ? 'is-active' : ''
              }`}
              width={720}
              height={480}
            />
          ))}

          {/* Interactive Specular Glare Overlay */}
          <div className="hero-cinema-glare" aria-hidden="true" />

          {/* Cinema Overlay UI */}
          <div className="hero-cinema-overlay">
            <div className="hero-cinema-topbar">
              <span className="hero-cinema-badge">
                <span className="hero-cinema-dot" />
                <span>{activeSlide.badge}</span>
              </span>

              <span
                className="hero-cinema-expand"
                title="View full resolution"
              >
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
              </span>
            </div>

            {/* Bottom Glass Caption & Minimalist Control Dock */}
            <div className="hero-cinema-dock">
              <div className="hero-cinema-progress-row">
                <div
                  className="hero-cinema-dots"
                  role="tablist"
                  aria-label="Featured chapter highlights"
                >
                  {HERO_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.src}
                      type="button"
                      role="tab"
                      aria-selected={idx === activeIndex}
                      aria-label={`Highlight ${idx + 1}: ${slide.title}`}
                      className={`hero-cinema-dot-btn ${
                        idx === activeIndex ? 'active' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex(idx);
                      }}
                    />
                  ))}
                </div>
                <span className="hero-cinema-counter">
                  0{activeIndex + 1} / 0{HERO_SLIDES.length}
                </span>
              </div>

              <div className="hero-cinema-caption-row">
                <div className="hero-cinema-caption-copy">
                  <h4>{activeSlide.title}</h4>
                  <p>{activeSlide.desc}</p>
                </div>

                <div className="hero-cinema-nav-btns">
                  <button
                    type="button"
                    className="hero-cinema-arrow-btn"
                    onClick={handlePrev}
                    aria-label="Previous highlight"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="hero-cinema-arrow-btn"
                    onClick={handleNext}
                    aria-label="Next highlight"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating 3D Bottom-Right Live Programme Pill */}
      <Link
        href="/events/advancing-aiot-research"
        className="hero-floating-live-card"
      >
        <div className="hero-floating-live-indicator">
          <span className="pulse-dot-green" />
          <span>NEXT LIVE WEBINAR • 10 NOV 2026</span>
        </div>
        <div className="hero-floating-live-title">
          Advancing AIoT Research &rarr;
        </div>
        <div className="hero-floating-live-sub">
          Boopathy (CTO, Monzha Research Labs) • 7:00 PM IST
        </div>
      </Link>
    </div>
  );
}
