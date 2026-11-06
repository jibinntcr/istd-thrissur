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
  1: 'rgba(30, 64, 175, 0.58)',
  2: 'rgba(29, 78, 216, 0.46)',
  3: 'rgba(37, 99, 235, 0.52)',
  4: 'rgba(15, 41, 82, 0.68)',
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

      {/* Animated Official State-Boundary India Map Stage */}
      <div className="india-map-stage">
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
            viewBox="0 15 775 820"
            className="india-map-svg"
            role="img"
            aria-label="Official Map of India with state boundaries showing ISTD National Headquarters in New Delhi connected to ISTD Trichur Diamond Chapter in Kerala and chapters across India"
          >
            <defs>
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

              {/* Ambient Spotlight Around India */}
              <radialGradient id="trichurSpotlight" cx="36%" cy="86%" r="55%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.32" />
                <stop offset="45%" stopColor="#3B82F6" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#0B2239" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Subtle Topographical Latitude/Longitude Grid */}
            <g
              className="india-map-grid-lines"
              stroke="rgba(148, 163, 184, 0.1)"
              strokeWidth="1.1"
              strokeDasharray="5 8"
            >
              <line x1="20" y1="150" x2="755" y2="150" />
              <line x1="20" y1="290" x2="755" y2="290" />
              <line x1="20" y1="430" x2="755" y2="430" />
              <line x1="20" y1="570" x2="755" y2="570" />
              <line x1="20" y1="710" x2="755" y2="710" />
              <line x1="160" y1="30" x2="160" y2="825" />
              <line x1="310" y1="30" x2="310" y2="825" />
              <line x1="460" y1="30" x2="460" y2="825" />
              <line x1="610" y1="30" x2="610" y2="825" />
            </g>

            {/* Ambient Spotlight Halo */}
            <circle
              cx="320"
              cy="460"
              r="360"
              fill="url(#trichurSpotlight)"
              className="india-map-ambient-circle"
            />

            {/* Outer Concentric Network Rings Centered on India */}
            <circle
              cx="350"
              cy="435"
              r="335"
              fill="none"
              stroke="rgba(56, 189, 248, 0.15)"
              strokeWidth="1.5"
              strokeDasharray="10 14"
              className="india-orbit-ring-slow"
            />
            <circle
              cx="350"
              cy="435"
              r="245"
              fill="none"
              stroke="rgba(251, 191, 36, 0.15)"
              strokeWidth="1.5"
              strokeDasharray="8 12"
              className="india-orbit-ring-reverse"
            />

            {/* High-Precision Official Map of India with All State Boundaries */}
            <g className="india-map-landmass">
              {/* Outer Glow Shadow of India */}
              <path
                d={INDIA_OUTER_PATH}
                fill="rgba(37, 99, 235, 0.22)"
                stroke="rgba(56, 189, 248, 0.45)"
                strokeWidth="5"
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
                      ? 'rgba(250, 204, 21, 0.48)'
                      : STATE_PALETTE[st.colorClass] || 'rgba(30, 64, 175, 0.55)'
                  }
                  stroke={
                    st.isKerala
                      ? '#FACC15'
                      : 'rgba(147, 197, 253, 0.52)'
                  }
                  strokeWidth={st.isKerala ? '2.8' : '1.45'}
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
                strokeWidth="2.6"
                strokeLinejoin="round"
                className="india-map-outline-path"
              />

              {/* Lakshadweep & Andaman & Nicobar Islands */}
              <g fill="#60A5FA" stroke="#BAE6FD" strokeWidth="0.8" opacity="0.85">
                {/* Lakshadweep */}
                <circle cx="122" cy="708" r="3.2" />
                <circle cx="136" cy="722" r="3" />
                <circle cx="128" cy="738" r="3.4" />
                <circle cx="144" cy="748" r="2.8" />
                <circle cx="132" cy="762" r="2.8" />
                <circle cx="142" cy="790" r="2.6" />
                {/* Andaman & Nicobar Islands */}
                <circle cx="672" cy="642" r="3.5" />
                <circle cx="668" cy="665" r="4.2" />
                <circle cx="666" cy="688" r="4.2" />
                <circle cx="664" cy="712" r="3.6" />
                <circle cx="662" cy="732" r="3.4" />
                <circle cx="676" cy="774" r="3.2" />
                <circle cx="692" cy="802" r="3.5" />
                <circle cx="705" cy="821" r="4" />
              </g>
            </g>

            {/* Animated Knowledge & Training Network Arcs Across India */}
            <g className="india-network-arcs" fill="none">
              <path
                d="M 274 265 Q 256 232 248 205"
                stroke="rgba(96, 165, 250, 0.55)"
                strokeWidth="2"
                strokeDasharray="6 6"
                className="network-arc-flow"
              />
              <path
                d="M 274 265 Q 235 288 215 318"
                stroke="rgba(96, 165, 250, 0.55)"
                strokeWidth="2"
                strokeDasharray="6 6"
                className="network-arc-flow"
              />
              <path
                d="M 274 265 Q 190 340 146 432"
                stroke="rgba(96, 165, 250, 0.55)"
                strokeWidth="2.1"
                strokeDasharray="7 6"
                className="network-arc-flow"
              />
              <path
                d="M 274 265 Q 210 395 174 528"
                stroke="rgba(96, 165, 250, 0.6)"
                strokeWidth="2.2"
                strokeDasharray="7 6"
                className="network-arc-flow"
              />
              <path
                d="M 274 265 Q 322 290 362 322"
                stroke="rgba(96, 165, 250, 0.55)"
                strokeWidth="2"
                strokeDasharray="6 6"
                className="network-arc-flow"
              />
              <path
                d="M 274 265 Q 410 330 526 424"
                stroke="rgba(96, 165, 250, 0.6)"
                strokeWidth="2.2"
                strokeDasharray="7 6"
                className="network-arc-flow"
              />
              <path
                d="M 526 424 Q 575 365 626 318"
                stroke="rgba(96, 165, 250, 0.55)"
                strokeWidth="2"
                strokeDasharray="6 6"
                className="network-arc-flow"
              />
              <path
                d="M 274 265 Q 305 415 314 565"
                stroke="rgba(96, 165, 250, 0.55)"
                strokeWidth="2.1"
                strokeDasharray="7 6"
                className="network-arc-flow"
              />

              {/* Southern & Coastal Connections into Trichur Diamond Chapter (238, 748) */}
              <path
                d="M 174 528 Q 188 645 238 748"
                stroke="rgba(251, 191, 36, 0.72)"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                className="network-arc-flow-fast"
              />
              <path
                d="M 266 682 Q 250 715 238 748"
                stroke="rgba(52, 211, 153, 0.85)"
                strokeWidth="2.8"
                strokeDasharray="6 5"
                className="network-arc-flow-fast"
              />
              <path
                d="M 338 684 Q 290 722 238 748"
                stroke="rgba(52, 211, 153, 0.8)"
                strokeWidth="2.5"
                strokeDasharray="6 5"
                className="network-arc-flow-fast"
              />
              <path
                d="M 314 565 Q 272 658 238 748"
                stroke="rgba(251, 191, 36, 0.65)"
                strokeWidth="2.2"
                strokeDasharray="7 6"
                className="network-arc-flow"
              />
              <path
                d="M 526 424 Q 445 555 338 684"
                stroke="rgba(96, 165, 250, 0.48)"
                strokeWidth="1.9"
                strokeDasharray="6 6"
                className="network-arc-flow"
              />

              {/* PRIMARY FLAGSHIP CORRIDOR: New Delhi National HQ (274, 265) -> ISTD Trichur Diamond Chapter (238, 748) */}
              <path
                id="delhiToTrichurMainArc"
                d="M 274 265 Q 205 510 238 748"
                stroke="url(#delhiTrichurGrad)"
                strokeWidth="4.4"
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
              <circle r="5.5" fill="#FEF08A" filter="url(#mapGlow)">
                <animateMotion
                  dur="3.4s"
                  repeatCount="indefinite"
                  path="M 274 265 Q 205 510 238 748"
                />
              </circle>
              <circle r="4.5" fill="#38BDF8" filter="url(#mapGlow)">
                <animateMotion
                  dur="3.4s"
                  begin="1.7s"
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
                      stroke="rgba(250, 204, 21, 0.6)"
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

                    {/* Pointer Line + Callout Badge for ISTD Trichur Chapter (Positioned cleanly in Arabian Sea to the left of Kerala) */}
                    <line
                      x1={hub.x - 14}
                      y1={hub.y}
                      x2={hub.x - 32}
                      y2={hub.y}
                      stroke="#FACC15"
                      strokeWidth="2"
                    />
                    <g transform={`translate(10, ${hub.y - 26})`}>
                      <rect
                        x="0"
                        y="0"
                        width="196"
                        height="52"
                        rx="12"
                        fill="rgba(11, 34, 57, 0.96)"
                        stroke="#FACC15"
                        strokeWidth="2.4"
                      />
                      <text
                        x="98"
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
                        x="98"
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
                    fill={isSelected ? '#FDE047' : 'rgba(241, 245, 249, 0.9)'}
                    fontSize="13"
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
