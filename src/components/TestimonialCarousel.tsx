'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TESTIMONIALS } from '@/data/siteData';

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <div
      className="testimonial-carousel-wrapper"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
        if (Math.abs(dx) > 40) {
          if (dx < 0) handleNext();
          else handlePrev();
        }
        touchStartX.current = null;
      }}
    >
      <div
        className="testimonial-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {TESTIMONIALS.map((item) => (
          <div className="testimonial-slide" key={item.id}>
            <div className="testimonial-card">
              <div className="testimonial-stars" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <blockquote className="testimonial-quote">&ldquo;{item.quote}&rdquo;</blockquote>
              <div className="testimonial-author">
                <h4>{item.author}</h4>
                <p>{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        <button
          type="button"
          className="carousel-arrow"
          onClick={handlePrev}
          aria-label="Previous Testimonial"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="carousel-dots">
          {TESTIMONIALS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              className={`carousel-dot ${idx === current ? 'active' : ''}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          className="carousel-arrow"
          onClick={handleNext}
          aria-label="Next Testimonial"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
