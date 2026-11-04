'use client';

import React, { useEffect, useRef, useState } from 'react';

const COUNTERS = [
  {
    id: 'counterMembers',
    target: 150,
    suffix: '+',
    label: 'Active Local Members',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'counterWorkshops',
    target: 45,
    suffix: '+',
    label: 'Workshops & Webinars',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 'counterLegacy',
    target: 55,
    suffix: '+ Yrs',
    label: 'ISTD National Legacy (Est. 1970)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
  },
];

export function ImpactCounters() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [values, setValues] = useState<number[]>(COUNTERS.map((c) => c.target));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasAnimated(true);
          const duration = 1200;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValues(COUNTERS.map((c) => Math.round(eased * c.target)));
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section className="impact-section" aria-label="Key Chapter Statistics" ref={sectionRef}>
      <div className="container">
        <div className="impact-grid">
          {COUNTERS.map((item, idx) => (
            <div className="impact-card" id={item.id} key={item.id}>
              <div className="impact-icon-box">{item.icon}</div>
              <div className="impact-number">
                {values[idx]}
                {item.suffix}
              </div>
              <div className="impact-title">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
