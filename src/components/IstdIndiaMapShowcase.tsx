'use client';

import React, { useState } from 'react';
import {
  INDIA_OUTER_PATH,
  INDIA_STATE_PATHS,
} from '@/data/indiaMapPaths';

interface ChapterHub {
  id: string;
  name: string;
  role: string;
  region: string;
  x: number;
  y: number;
  isHQ?: boolean;
  isTrichur?: boolean;
  labelPos: 'right' | 'left' | 'top' | 'bottom';
}

const ISTD_INDIA_HUBS: ChapterHub[] = [
  {
    id: 'new-delhi',
    name: 'New Delhi (National HQ)',
    role: 'ISTD National Office • Est. April 1970',
    region: 'Northern Region Headquarters',
    x: 274,
    y: 265,
    isHQ: true,
    labelPos: 'right',
  },
  {
    id: 'trichur',
    name: 'ISTD Trichur Chapter',
    role: 'Diamond Chapter • Inaugurated 30 March 2026',
    region: 'Central Kerala L&D & Campus Hub',
    x: 238,
    y: 748,
    isTrichur: true,
    labelPos: 'left',
  },
  {
    id: 'chandigarh',
    name: 'Chandigarh / Punjab',
    role: 'Northern Chapter Network',
    region: 'Northern Region',
    x: 248,
    y: 205,
    labelPos: 'left',
  },
  {
    id: 'jaipur',
    name: 'Jaipur / Udaipur',
    role: 'Rajasthan Chapter Network',
    region: 'Northern Region',
    x: 215,
    y: 318,
    labelPos: 'left',
  },
  {
    id: 'lucknow',
    name: 'Lucknow / Kanpur',
    role: 'Uttar Pradesh Chapter Network',
    region: 'Northern Region',
    x: 362,
    y: 322,
    labelPos: 'right',
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad / Vadodara',
    role: 'Gujarat Chapter Network',
    region: 'Western Region',
    x: 146,
    y: 432,
    labelPos: 'left',
  },
  {
    id: 'bhopal',
    name: 'Bhopal / Indore',
    role: 'Central India Chapter Hub',
    region: 'Central Region',
    x: 298,
    y: 412,
    labelPos: 'right',
  },
  {
    id: 'mumbai',
    name: 'Mumbai / Pune',
    role: 'Western Corporate L&D Hub',
    region: 'Western Region',
    x: 174,
    y: 528,
    labelPos: 'left',
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    role: 'Telangana & Deccan Hub',
    region: 'Southern Region',
    x: 314,
    y: 565,
    labelPos: 'right',
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    role: 'Karnataka Tech & HRD Hub',
    region: 'Southern Region',
    x: 266,
    y: 682,
    labelPos: 'left',
  },
  {
    id: 'chennai',
    name: 'Chennai / Puducherry',
    role: 'Southern Regional Hub',
    region: 'Southern Region',
    x: 338,
    y: 684,
    labelPos: 'right',
  },
  {
    id: 'kochi',
    name: 'Kochi / Trivandrum',
    role: 'Kerala Chapter Network',
    region: 'Southern Region',
    x: 252,
    y: 786,
    labelPos: 'right',
  },
  {
    id: 'bhubaneswar',
    name: 'Bhubaneswar / Visakhapatnam',
    role: 'East Coast Chapter Hub',
    region: 'Eastern Region',
    x: 458,
    y: 492,
    labelPos: 'right',
  },
  {
    id: 'kolkata',
    name: 'Kolkata / Jamshedpur',
    role: 'Eastern Regional Hub',
    region: 'Eastern Region',
    x: 526,
    y: 424,
    labelPos: 'right',
  },
  {
    id: 'guwahati',
    name: 'Guwahati / North-East',
    role: 'North-East Chapter Hub',
    region: 'Eastern Region',
    x: 626,
    y: 318,
    labelPos: 'right',
  },
];

const STATE_PALETTE: Record<number, string> = {
  1: 'rgba(30, 64, 175, 0.66)',
  2: 'rgba(29, 78, 216, 0.54)',
  3: 'rgba(37, 99, 235, 0.6)',
  4: 'rgba(15, 41, 82, 0.74)',
};

export function IstdIndiaMapShowcase() {
  const [activeHubId, setActiveHubId] = useState<string>('trichur');
  const activeHub =
    ISTD_INDIA_HUBS.find((h) => h.id === activeHubId) || ISTD_INDIA_HUBS[1];

  return (
    <div className="ecosystem-3d-card india-map-showcase-card">
      <div className="ecosystem-3d-header">
        <span className="ecosystem-3d-tag">
          ◆ ISTD PAN-INDIA NETWORK &amp; VISION IN MOTION
        </span>
        <h3>“Leading Transformation through Training &amp; Development”</h3>
        <p className="ecosystem-3d-subhead">
          Connecting{' '}
          <strong style={{ color: '#FDE047' }}>
            ISTD National HQ (New Delhi, Est. 1970)
          </strong>{' '}
          with the{' '}
          <strong style={{ color: '#60A5FA' }}>
            ISTD Trichur Diamond Chapter
          </strong>{' '}
          &amp; 55+ Chapters Across India
        </p>
      </div>

      {/* Animated Official State-Boundary India Map & Ocean Stage */}
      <div className="india-map-stage">
        {/* Animated Ocean Shimmer & Wave Layers in Background */}
        <div className="india-ocean-backdrop" aria-hidden="true">
          <div className="ocean-caustics-glow" />
          <div className="ocean-wave-layer wave-1" />
          <div className="ocean-wave-layer wave-2" />
        </div>

        {/* Top Live Status Pills */}
        <div className="india-map-top-badges">
          <button
            type="button"
            onClick={() => setActiveHubId('new-delhi')}
            className={`india-map-legend-pill pill-hq ${
              activeHubId === 'new-delhi' ? 'active' : ''
            }`}
          >
            <span className="legend-dot hq-dot" />
            <span>New Delhi HQ (Est. 1970)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveHubId('trichur')}
            className={`india-map-legend-pill pill-trichur ${
              activeHubId === 'trichur' ? 'active' : ''
            }`}
          >
            <span className="legend-dot trichur-dot" />
            <span>★ Trichur Diamond Chapter (Kerala)</span>
          </button>
        </div>

        <div className="india-map-svg-wrapper">
          <svg
            viewBox="15 25 745 805"
            className="india-map-svg"
            role="img"
            aria-label="Official Map of India with state boundaries, animated Arabian Sea, Bay of Bengal, and Indian Ocean currents, showing ISTD National Headquarters in New Delhi connected to ISTD Trichur Diamond Chapter in Kerala"
          >
            <defs>
              {/* Deep Ocean Gradient */}
              <radialGradient id="oceanDepthGrad" cx="46%" cy="55%" r="65%">
                <stop offset="0%" stopColor="#0E3A75" stopOpacity="0.48" />
                <stop offset="55%" stopColor="#082046" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#041026" stopOpacity="0" />
              </radialGradient>

              {/* Glowing Map Outer Stroke Gradient */}
              <linearGradient
                id="indiaStrokeGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="55%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#FACC15" />
              </linearGradient>

              {/* Golden National Corridor Gradient (Delhi <-> Trichur) */}
              <linearGradient
                id="delhiTrichurGrad"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#FACC15" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>

              {/* Radar Sweep Gradient */}
              <linearGradient id="radarBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
              </linearGradient>

              {/* Soft Glow Filter */}
              <filter
                id="mapGlow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Ambient Spotlight Around Southern Peninsula */}
              <radialGradient id="trichurSpotlight" cx="35%" cy="86%" r="55%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.34" />
                <stop offset="45%" stopColor="#0284C7" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#0B2239" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Ocean Depth Glow */}
            <rect x="15" y="25" width="745" height="805" fill="url(#oceanDepthGrad)" />

            {/* Topographical Nautical Latitude/Longitude Grid */}
            <g
              className="india-map-grid-lines"
              stroke="rgba(56, 189, 248, 0.13)"
              strokeWidth="1"
              strokeDasharray="4 7"
            >
              <line x1="20" y1="135" x2="755" y2="135" />
              <line x1="20" y1="265" x2="755" y2="265" />
              <line x1="20" y1="395" x2="755" y2="395" />
              <line x1="20" y1="525" x2="755" y2="525" />
              <line x1="20" y1="655" x2="755" y2="655" />
              <line x1="20" y1="785" x2="755" y2="785" />
              <line x1="140" y1="30" x2="140" y2="825" />
              <line x1="280" y1="30" x2="280" y2="825" />
              <line x1="420" y1="30" x2="420" y2="825" />
              <line x1="560" y1="30" x2="560" y2="825" />
              <line x1="700" y1="30" x2="700" y2="825" />
            </g>

            {/* Ambient Spotlight Halo */}
            <circle
              cx="310"
              cy="460"
              r="370"
              fill="url(#trichurSpotlight)"
              className="india-map-ambient-circle"
            />

            {/* Animated Rotating Nautical Compass & Orbital Rings */}
            <circle
              cx="350"
              cy="435"
              r="345"
              fill="none"
              stroke="rgba(56, 189, 248, 0.18)"
              strokeWidth="1.5"
              strokeDasharray="10 12"
              className="india-orbit-ring-slow"
            />
            <circle
              cx="350"
              cy="435"
              r="255"
              fill="none"
              stroke="rgba(251, 191, 36, 0.16)"
              strokeWidth="1.5"
              strokeDasharray="8 10"
              className="india-orbit-ring-reverse"
            />

            {/* ============================================================
                ANIMATED OCEAN CURRENTS, WAVE CRESTS & MARITIME LABELS
               ============================================================ */}
            <g className="india-ocean-elements">
              {/* 1. ARABIAN SEA (West of India) — Animated Wave Currents & Label */}
              <g className="ocean-wave-group wave-drift-left">
                <path
                  d="M 28 545 Q 48 537 68 545 T 108 545 T 148 545"
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.42)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M 42 565 Q 62 557 82 565 T 122 565"
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.28)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M 25 635 Q 45 627 65 635 T 105 635 T 145 635"
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.38)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M 38 655 Q 58 647 78 655 T 118 655"
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.24)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
              <text
                x="88"
                y="596"
                textAnchor="middle"
                fill="rgba(125, 211, 252, 0.62)"
                fontSize="12"
                fontWeight="800"
                letterSpacing="0.22em"
              >
                ARABIAN
              </text>
              <text
                x="88"
                y="613"
                textAnchor="middle"
                fill="rgba(125, 211, 252, 0.62)"
                fontSize="12"
                fontWeight="800"
                letterSpacing="0.22em"
              >
                SEA
              </text>
              <text
                x="115"
                y="808"
                textAnchor="middle"
                fill="rgba(147, 197, 253, 0.72)"
                fontSize="10"
                fontWeight="700"
                letterSpacing="0.06em"
              >
                Lakshadweep
              </text>

              {/* 2. BAY OF BENGAL (East of India) — Animated Wave Currents & Compass Rose */}
              <g className="ocean-wave-group wave-drift-right">
                <path
                  d="M 495 555 Q 518 546 541 555 T 587 555 T 633 555"
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.42)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M 515 576 Q 538 567 561 576 T 607 576"
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.28)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M 465 655 Q 488 646 511 655 T 557 655 T 603 655"
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.36)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M 485 675 Q 508 666 531 675 T 577 675"
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.24)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
              <text
                x="558"
                y="608"
                textAnchor="middle"
                fill="rgba(125, 211, 252, 0.62)"
                fontSize="12"
                fontWeight="800"
                letterSpacing="0.2em"
              >
                BAY OF
              </text>
              <text
                x="558"
                y="625"
                textAnchor="middle"
                fill="rgba(125, 211, 252, 0.62)"
                fontSize="12"
                fontWeight="800"
                letterSpacing="0.2em"
              >
                BENGAL
              </text>
              <text
                x="615"
                y="756"
                textAnchor="middle"
                fill="rgba(147, 197, 253, 0.72)"
                fontSize="10"
                fontWeight="700"
                letterSpacing="0.05em"
              >
                Andaman &amp; Nicobar
              </text>

              {/* 3. INDIAN OCEAN (South of Kanyakumari) */}
              <g className="ocean-wave-group wave-drift-left">
                <path
                  d="M 355 795 Q 378 787 401 795 T 447 795 T 493 795"
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.36)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </g>
              <text
                x="425"
                y="818"
                textAnchor="middle"
                fill="rgba(125, 211, 252, 0.58)"
                fontSize="11"
                fontWeight="800"
                letterSpacing="0.24em"
              >
                INDIAN OCEAN
              </text>

              {/* 4. Animated Nautical Compass Rose in Top-Right Quadrant (585, 135) */}
              <g transform="translate(615, 132)">
                <circle
                  cx="0"
                  cy="0"
                  r="42"
                  fill="rgba(11, 34, 57, 0.65)"
                  stroke="rgba(56, 189, 248, 0.35)"
                  strokeWidth="1.4"
                  strokeDasharray="3 4"
                  className="compass-outer-spin"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="30"
                  fill="none"
                  stroke="rgba(250, 204, 21, 0.35)"
                  strokeWidth="1.2"
                />
                {/* Compass Star Points */}
                <polygon
                  points="0,-28 6,-6 28,0 6,6 0,28 -6,6 -28,0 -6,-6"
                  fill="rgba(56, 189, 248, 0.28)"
                  stroke="#38BDF8"
                  strokeWidth="1.2"
                />
                <polygon
                  points="0,-28 4,-6 0,0 -4,-6"
                  fill="#FACC15"
                />
                <circle cx="0" cy="0" r="4" fill="#FEF08A" />
                <text
                  x="0"
                  y="-33"
                  textAnchor="middle"
                  fill="#FDE047"
                  fontSize="10"
                  fontWeight="800"
                >
                  N
                </text>
              </g>

              {/* 5. Floating Animated ISTD Pillar Badges in Upper-Left & Mid-Right */}
              <g transform="translate(24, 92)">
                <g className="floating-map-pill pill-float-1">
                  <rect
                    x="0"
                    y="0"
                    width="162"
                    height="46"
                    rx="11"
                    fill="rgba(15, 23, 42, 0.88)"
                    stroke="rgba(56, 189, 248, 0.5)"
                    strokeWidth="1.5"
                  />
                  <text x="14" y="19" fill="#38BDF8" fontSize="11" fontWeight="800">
                    🏛️ EST. APRIL 1970
                  </text>
                  <text x="14" y="35" fill="#E2E8F0" fontSize="10" fontWeight="600">
                    55+ Chapters Nationwide
                  </text>
                </g>
              </g>

              <g transform="translate(22, 204)">
                <g className="floating-map-pill pill-float-2">
                  <rect
                    x="0"
                    y="0"
                    width="158"
                    height="46"
                    rx="11"
                    fill="rgba(15, 23, 42, 0.88)"
                    stroke="rgba(250, 204, 21, 0.5)"
                    strokeWidth="1.5"
                  />
                  <text x="14" y="19" fill="#FDE047" fontSize="11" fontWeight="800">
                    🎯 L&amp;D EXCELLENCE
                  </text>
                  <text x="14" y="35" fill="#E2E8F0" fontSize="10" fontWeight="600">
                    Industry &amp; Academia Bridge
                  </text>
                </g>
              </g>

              <g transform="translate(542, 482)">
                <g className="floating-map-pill pill-float-1">
                  <rect
                    x="0"
                    y="0"
                    width="192"
                    height="46"
                    rx="11"
                    fill="rgba(15, 23, 42, 0.88)"
                    stroke="rgba(52, 211, 153, 0.5)"
                    strokeWidth="1.5"
                  />
                  <text x="14" y="19" fill="#34D399" fontSize="11" fontWeight="800">
                    📚 UNIVERSAL KNOWLEDGE
                  </text>
                  <text x="14" y="35" fill="#E2E8F0" fontSize="10" fontWeight="600">
                    Training &amp; Action Research
                  </text>
                </g>
              </g>
            </g>

            {/* High-Precision Official Map of India with All State Boundaries */}
            <g className="india-map-landmass">
              {/* Outer Coastal Bathymetry Ripple Halo of India */}
              <path
                d={INDIA_OUTER_PATH}
                fill="none"
                stroke="rgba(56, 189, 248, 0.22)"
                strokeWidth="16"
                strokeLinejoin="round"
                className="coastal-ripple-outer"
              />
              <path
                d={INDIA_OUTER_PATH}
                fill="rgba(37, 99, 235, 0.25)"
                stroke="rgba(56, 189, 248, 0.45)"
                strokeWidth="6"
                strokeLinejoin="round"
                filter="url(#mapGlow)"
              />

              {/* Individual Indian State Polygons */}
              {INDIA_STATE_PATHS.map((st) => (
                <path
                  key={st.id}
                  d={st.d}
                  fill={
                    st.isKerala
                      ? 'rgba(250, 204, 21, 0.52)'
                      : STATE_PALETTE[st.colorClass] || 'rgba(30, 64, 175, 0.6)'
                  }
                  stroke={
                    st.isKerala
                      ? '#FACC15'
                      : 'rgba(147, 197, 253, 0.55)'
                  }
                  strokeWidth={st.isKerala ? '2.8' : '1.5'}
                  strokeLinejoin="round"
                  className={
                    st.isKerala
                      ? 'india-state-path kerala-state-highlight'
                      : 'india-state-path'
                  }
                />
              ))}

              {/* Outer Crisp Border of Mainland India */}
              <path
                d={INDIA_OUTER_PATH}
                fill="none"
                stroke="url(#indiaStrokeGrad)"
                strokeWidth="2.8"
                strokeLinejoin="round"
                className="india-map-outline-path"
              />

              {/* Lakshadweep & Andaman & Nicobar Islands with Pulsing Atoll Rings */}
              <g fill="#60A5FA" stroke="#BAE6FD" strokeWidth="0.9" opacity="0.9">
                {/* Lakshadweep */}
                <circle cx="122" cy="708" r="3.5" />
                <circle cx="136" cy="722" r="3.2" />
                <circle cx="128" cy="738" r="3.8" />
                <circle cx="144" cy="748" r="3" />
                <circle cx="132" cy="762" r="3" />
                <circle cx="142" cy="785" r="2.8" />
                {/* Andaman & Nicobar Islands */}
                <circle cx="672" cy="642" r="3.8" />
                <circle cx="668" cy="665" r="4.5" />
                <circle cx="666" cy="688" r="4.5" />
                <circle cx="664" cy="712" r="3.8" />
                <circle cx="662" cy="732" r="3.6" />
                <circle cx="676" cy="774" r="3.5" />
                <circle cx="692" cy="802" r="3.8" />
                <circle cx="705" cy="818" r="4.2" />
              </g>
            </g>

            {/* Animated Knowledge & Training Network Arcs Across India */}
            <g className="india-network-arcs" fill="none">
              <path
                d="M 274 265 Q 256 232 248 205"
                stroke="rgba(96, 165, 250, 0.58)"
                strokeWidth="2.1"
                strokeDasharray="6 6"
                className="network-arc-flow"
              />
              <path
                d="M 274 265 Q 235 288 215 318"
                stroke="rgba(96, 165, 250, 0.58)"
                strokeWidth="2.1"
                strokeDasharray="6 6"
                className="network-arc-flow"
              />
              <path
                d="M 274 265 Q 190 340 146 432"
                stroke="rgba(96, 165, 250, 0.58)"
                strokeWidth="2.2"
                strokeDasharray="7 6"
                className="network-arc-flow"
              />
              <path
                d="M 274 265 Q 210 395 174 528"
                stroke="rgba(96, 165, 250, 0.62)"
                strokeWidth="2.2"
                strokeDasharray="7 6"
                className="network-arc-flow"
              />
              <path
                d="M 274 265 Q 322 290 362 322"
                stroke="rgba(96, 165, 250, 0.58)"
                strokeWidth="2.1"
                strokeDasharray="6 6"
                className="network-arc-flow"
              />
              <path
                d="M 274 265 Q 410 330 526 424"
                stroke="rgba(96, 165, 250, 0.62)"
                strokeWidth="2.2"
                strokeDasharray="7 6"
                className="network-arc-flow"
              />
              <path
                d="M 526 424 Q 575 365 626 318"
                stroke="rgba(96, 165, 250, 0.58)"
                strokeWidth="2.1"
                strokeDasharray="6 6"
                className="network-arc-flow"
              />
              <path
                d="M 274 265 Q 305 415 314 565"
                stroke="rgba(96, 165, 250, 0.58)"
                strokeWidth="2.2"
                strokeDasharray="7 6"
                className="network-arc-flow"
              />

              {/* Southern & Coastal Connections into Trichur Diamond Chapter (238, 748) */}
              <path
                d="M 174 528 Q 188 645 238 748"
                stroke="rgba(251, 191, 36, 0.75)"
                strokeWidth="2.6"
                strokeDasharray="8 6"
                className="network-arc-flow-fast"
              />
              <path
                d="M 266 682 Q 250 715 238 748"
                stroke="rgba(52, 211, 153, 0.88)"
                strokeWidth="2.8"
                strokeDasharray="6 5"
                className="network-arc-flow-fast"
              />
              <path
                d="M 338 684 Q 290 722 238 748"
                stroke="rgba(52, 211, 153, 0.82)"
                strokeWidth="2.6"
                strokeDasharray="6 5"
                className="network-arc-flow-fast"
              />
              <path
                d="M 314 565 Q 272 658 238 748"
                stroke="rgba(251, 191, 36, 0.68)"
                strokeWidth="2.2"
                strokeDasharray="7 6"
                className="network-arc-flow"
              />
              <path
                d="M 526 424 Q 445 555 338 684"
                stroke="rgba(96, 165, 250, 0.52)"
                strokeWidth="2"
                strokeDasharray="6 6"
                className="network-arc-flow"
              />

              {/* PRIMARY FLAGSHIP CORRIDOR: New Delhi National HQ (274, 265) -> ISTD Trichur Diamond Chapter (238, 748) */}
              <path
                id="delhiToTrichurMainArc"
                d="M 274 265 Q 205 510 238 748"
                stroke="url(#delhiTrichurGrad)"
                strokeWidth="4.6"
                strokeLinecap="round"
                filter="url(#mapGlow)"
              />
              <path
                d="M 274 265 Q 205 510 238 748"
                stroke="#FEF08A"
                strokeWidth="3"
                strokeDasharray="10 14"
                className="flagship-corridor-flow"
              />

              {/* Animated Traveling Knowledge Pulses Along Flagship Corridor */}
              <circle r="6" fill="#FEF08A" filter="url(#mapGlow)">
                <animateMotion
                  dur="3.2s"
                  repeatCount="indefinite"
                  path="M 274 265 Q 205 510 238 748"
                />
              </circle>
              <circle r="5" fill="#38BDF8" filter="url(#mapGlow)">
                <animateMotion
                  dur="3.2s"
                  begin="1.6s"
                  repeatCount="indefinite"
                  path="M 238 748 Q 205 510 274 265"
                />
              </circle>
            </g>

            {/* Chapter Hub Nodes Across India */}
            {ISTD_INDIA_HUBS.map((hub) => {
              const isSelected = activeHubId === hub.id;
              if (hub.isTrichur) {
                return (
                  <g
                    key={hub.id}
                    className="india-hub-group trichur-hub-group"
                    onClick={() => setActiveHubId(hub.id)}
                    onMouseEnter={() => setActiveHubId(hub.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Triple Expanding Diamond Pulse Rings */}
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r="34"
                      fill="none"
                      stroke="rgba(250, 204, 21, 0.65)"
                      strokeWidth="2.4"
                      className="trichur-sonar-ring ring-1"
                    />
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r="22"
                      fill="none"
                      stroke="rgba(245, 158, 11, 0.85)"
                      strokeWidth="2.8"
                      className="trichur-sonar-ring ring-2"
                    />
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r="12"
                      fill="#F59E0B"
                      stroke="#FEF08A"
                      strokeWidth="3.5"
                      filter="url(#mapGlow)"
                    />
                    <circle cx={hub.x} cy={hub.y} r="4.8" fill="#FFFFFF" />

                    {/* Pointer Line + Callout Badge for ISTD Trichur Chapter */}
                    <line
                      x1={hub.x - 14}
                      y1={hub.y}
                      x2={hub.x - 30}
                      y2={hub.y}
                      stroke="#FACC15"
                      strokeWidth="2.2"
                    />
                    <g transform={`translate(18, ${hub.y - 58})`}>
                      <rect
                        x="0"
                        y="0"
                        width="192"
                        height="52"
                        rx="12"
                        fill="rgba(11, 34, 57, 0.96)"
                        stroke="#FACC15"
                        strokeWidth="2.4"
                      />
                      <text
                        x="96"
                        y="22"
                        textAnchor="middle"
                        fill="#FDE047"
                        fontSize="13.5"
                        fontWeight="800"
                        letterSpacing="0.04em"
                      >
                        ★ ISTD TRICHUR
                      </text>
                      <text
                        x="96"
                        y="40"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="11"
                        fontWeight="700"
                      >
                        DIAMOND CHAPTER (KERALA)
                      </text>
                    </g>
                  </g>
                );
              }

              if (hub.isHQ) {
                return (
                  <g
                    key={hub.id}
                    className="india-hub-group hq-hub-group"
                    onClick={() => setActiveHubId(hub.id)}
                    onMouseEnter={() => setActiveHubId(hub.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r="26"
                      fill="none"
                      stroke="rgba(56, 189, 248, 0.7)"
                      strokeWidth="2.4"
                      className="trichur-sonar-ring ring-1"
                    />
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r="11.5"
                      fill="#0284C7"
                      stroke="#BAE6FD"
                      strokeWidth="3.2"
                      filter="url(#mapGlow)"
                    />
                    <circle cx={hub.x} cy={hub.y} r="4.5" fill="#FFFFFF" />

                    {/* Callout Badge for New Delhi National HQ */}
                    <g transform={`translate(${hub.x + 18}, ${hub.y - 28})`}>
                      <rect
                        x="0"
                        y="0"
                        width="206"
                        height="50"
                        rx="12"
                        fill="rgba(15, 23, 42, 0.94)"
                        stroke="#38BDF8"
                        strokeWidth="2.2"
                      />
                      <text
                        x="103"
                        y="21"
                        textAnchor="middle"
                        fill="#7DD3FC"
                        fontSize="13"
                        fontWeight="800"
                        letterSpacing="0.04em"
                      >
                        ISTD NATIONAL HQ
                      </text>
                      <text
                        x="103"
                        y="39"
                        textAnchor="middle"
                        fill="#F8FAFC"
                        fontSize="11.5"
                        fontWeight="600"
                      >
                        New Delhi • Est. April 1970
                      </text>
                    </g>
                  </g>
                );
              }

              return (
                <g
                  key={hub.id}
                  className="india-hub-group regional-hub-group"
                  onClick={() => setActiveHubId(hub.id)}
                  onMouseEnter={() => setActiveHubId(hub.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {isSelected && (
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r="16"
                      fill="none"
                      stroke="#38BDF8"
                      strokeWidth="2.2"
                      className="trichur-sonar-ring ring-2"
                    />
                  )}
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={isSelected ? 8.5 : 6.5}
                    fill={isSelected ? '#38BDF8' : '#93C5FD'}
                    stroke="#0B2239"
                    strokeWidth="2"
                  />
                  <text
                    x={hub.labelPos === 'left' ? hub.x - 12 : hub.x + 12}
                    y={hub.y + 4.5}
                    textAnchor={hub.labelPos === 'left' ? 'end' : 'start'}
                    fill={isSelected ? '#FDE047' : 'rgba(241, 245, 249, 0.92)'}
                    fontSize="13.5"
                    fontWeight={isSelected ? '800' : '600'}
                  >
                    {hub.name.split(' / ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Interactive Active Chapter Info Strip */}
        <div className="india-map-active-readout">
          <div className="india-map-readout-box">
            <div className="readout-left">
              <span className="readout-badge">
                {activeHub.isTrichur
                  ? '★ FEATURED DIAMOND CHAPTER'
                  : activeHub.isHQ
                  ? '🏛️ NATIONAL HEADQUARTERS'
                  : '📍 ISTD CHAPTER NETWORK'}
              </span>
              <strong>{activeHub.name}</strong>
              <span>{activeHub.role}</span>
            </div>
            <div className="readout-right">
              <div className="readout-stat">
                <strong>1970</strong>
                <small>Est. New Delhi</small>
              </div>
              <div className="readout-stat">
                <strong>55+</strong>
                <small>Chapters in India</small>
              </div>
              <div className="readout-stat gold">
                <strong>Trichur</strong>
                <small>Diamond Chapter</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Mission Flow Strip */}
      <div className="ecosystem-mission-flow" aria-label="ISTD Mission Flow">
        <div className="mission-flow-step">
          <span className="flow-dot blue" />
          <span>Facilitate Individuals &amp; Orgs</span>
        </div>
        <span className="mission-flow-arrow" aria-hidden="true">
          →
        </span>
        <div className="mission-flow-step">
          <span className="flow-dot gold" />
          <span>Excel in T&amp;D Activities</span>
        </div>
        <span className="mission-flow-arrow" aria-hidden="true">
          →
        </span>
        <div className="mission-flow-step">
          <span className="flow-dot red" />
          <span>Lead Transformation</span>
        </div>
      </div>
    </div>
  );
}
