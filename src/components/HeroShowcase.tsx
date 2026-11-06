'use client';

import React, { useState, useEffect } from 'react';
import { HERO_SLIDES, assetUrl } from '@/data/siteData';
import { useLightbox } from './LightboxProvider';

const SLIDE_SHORT_LABELS = [
  'Inauguration',
  'Keynote',
  'Chairman',
  'Connect 2026',
];

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
      className="hero-grand-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Widescreen Slider Frame */}
      <div className="hero-grand-slider-card">
        <div
          className="hero-grand-viewport"
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
          {/* Live Auto-Slide Progress Bar */}
          <div className="hero-slider-progress-track" aria-hidden="true">
            <div
              key={`${activeIndex}-${isPaused ? 'paused' : 'play'}`}
              className={`hero-slider-progress-fill ${
                isPaused ? 'paused' : ''
              }`}
            />
          </div>

          {/* Horizontal Sliding Image Track */}
          <div
            className="hero-grand-track"
            style={{
              transform: `translate3d(-${activeIndex * 100}%, 0, 0)`,
            }}
          >
            {HERO_SLIDES.map((slide, idx) => (
              <div key={slide.src} className="hero-grand-slide">
                <img
                  src={assetUrl(slide.src)}
                  alt={slide.title}
                  width={860}
                  height={540}
                  className={idx === activeIndex ? 'is-active' : ''}
                />
              </div>
            ))}
          </div>

          {/* Left & Right Slider Navigation Arrows */}
          <button
            type="button"
            className="hero-slider-side-arrow prev"
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            className="hero-slider-side-arrow next"
            onClick={handleNext}
            aria-label="Next slide"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Top Badge & Expand Icon */}
          <div className="hero-grand-top-overlay">
            <span className="hero-grand-badge">
              <span className="hero-cinema-dot" />
              <span>{activeSlide.badge}</span>
            </span>

            <span className="hero-grand-counter-pill">
              0{activeIndex + 1} / 0{HERO_SLIDES.length}
            </span>
          </div>

          {/* Bottom Caption Overlay */}
          <div className="hero-grand-bottom-overlay">
            <div className="hero-grand-caption">
              <h4>{activeSlide.title}</h4>
              <p>{activeSlide.desc}</p>
            </div>
          </div>
        </div>

        {/* Interactive 4-Slide Selector Bar */}
        <div
          className="hero-grand-selector-bar"
          role="tablist"
          aria-label="Select slide"
        >
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={idx === activeIndex}
              className={`hero-grand-selector-item ${
                idx === activeIndex ? 'active' : ''
              }`}
              onClick={() => setActiveIndex(idx)}
            >
              <div className="hero-grand-selector-thumb">
                <img src={assetUrl(slide.src)} alt={slide.title} />
              </div>
              <div className="hero-grand-selector-info">
                <span className="selector-num">0{idx + 1}</span>
                <span className="selector-label">
                  {SLIDE_SHORT_LABELS[idx] || `Slide ${idx + 1}`}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
