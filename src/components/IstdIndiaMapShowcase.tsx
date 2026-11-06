'use client';

import React, { useState } from 'react';

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
    x: 192,
    y: 148,
    isHQ: true,
    labelPos: 'right',
  },
  {
    id: 'trichur',
    name: 'ISTD Trichur Chapter',
    role: 'Diamond Chapter • Inaugurated 30 March 2026',
    region: 'Central Kerala L&D & Campus Hub',
    x: 178,
    y: 392,
    isTrichur: true,
    labelPos: 'left',
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad / Vadodara',
    role: 'Western Chapter Network',
    region: 'Western Region',
    x: 132,
    y: 234,
    labelPos: 'left',
  },
  {
    id: 'mumbai',
    name: 'Mumbai / Pune',
    role: 'Western Corporate L&D Hub',
    region: 'Western Region',
    x: 142,
    y: 288,
    labelPos: 'left',
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    role: 'Deccan Chapter Hub',
    region: 'Southern Region',
    x: 204,
    y: 306,
    labelPos: 'right',
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    role: 'Southern Tech & HRD Hub',
    region: 'Southern Region',
    x: 188,
    y: 356,
    labelPos: 'right',
  },
  {
    id: 'chennai',
    name: 'Chennai',
    role: 'Southern Regional Hub',
    region: 'Southern Region',
    x: 218,
    y: 362,
    labelPos: 'right',
  },
  {
    id: 'kochi',
    name: 'Kochi / Trivandrum',
    role: 'Kerala Chapter Network',
    region: 'Southern Region',
    x: 182,
    y: 412,
    labelPos: 'right',
  },
  {
    id: 'kolkata',
    name: 'Kolkata / Jamshedpur',
    role: 'Eastern Regional Hub',
    region: 'Eastern Region',
    x: 298,
    y: 244,
    labelPos: 'right',
  },
  {
    id: 'guwahati',
    name: 'Guwahati',
    role: 'North-East Chapter Hub',
    region: 'Eastern Region',
    x: 348,
    y: 194,
    labelPos: 'right',
  },
  {
    id: 'jaipur',
    name: 'Jaipur / Chandigarh',
    role: 'Northern Chapter Network',
    region: 'Northern Region',
    x: 164,
    y: 176,
    labelPos: 'left',
  },
  {
    id: 'bhopal',
    name: 'Bhopal / Indore',
    role: 'Central India Chapter Network',
    region: 'Central Region',
    x: 196,
    y: 236,
    labelPos: 'right',
  },
];

const MISSION_PILLARS = [
  {
    id: 'training',
    icon: '🎯',
    title: 'Training & Development',
    sub: 'Facilitating Individuals & Organizations',
    color: '#38BDF8',
  },
  {
    id: 'knowledge',
    icon: '📚',
    title: 'Universal Knowledge',
    sub: 'Reservoir of Human Interface',
    color: '#FBBF24',
  },
  {
    id: 'innovation',
    icon: '💡',
    title: 'Innovative Practices',
    sub: 'Modern L&D Methodologies',
    color: '#34D399',
  },
  {
    id: 'research',
    icon: '🔬',
    title: 'Exploratory Research',
    sub: 'Original Action Research',
    color: '#FB7185',
  },
];

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
          &amp; 55+ Chapters Nationwide
        </p>
      </div>

      {/* Animated SVG India Map Stage */}
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
            <span>★ Trichur Diamond Chapter</span>
          </button>
        </div>

        <div className="india-map-svg-wrapper">
          <svg
            viewBox="0 0 440 470"
            className="india-map-svg"
            role="img"
            aria-label="Animated Map of India showing ISTD National Headquarters in New Delhi connected to ISTD Trichur Diamond Chapter in Kerala and chapters across India"
          >
            <defs>
              {/* Glowing Map Fill Gradient */}
              <linearGradient
                id="indiaBodyGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.62" />
                <stop offset="50%" stopColor="#0F2952" stopOpacity="0.78" />
                <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.52" />
              </linearGradient>

              {/* Glowing Map Stroke Gradient */}
              <linearGradient
                id="indiaStrokeGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="55%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#FBBF24" />
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
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Radar Sweep Radial Gradient */}
              <radialGradient id="trichurSpotlight" cx="40%" cy="83%" r="48%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.28" />
                <stop offset="45%" stopColor="#3B82F6" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#0B2239" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Subtle Topographical Latitude/Longitude Grid */}
            <g className="india-map-grid-lines" stroke="rgba(148, 163, 184, 0.1)" strokeWidth="0.7" strokeDasharray="3 5">
              <line x1="40" y1="90" x2="400" y2="90" />
              <line x1="40" y1="165" x2="400" y2="165" />
              <line x1="40" y1="240" x2="400" y2="240" />
              <line x1="40" y1="315" x2="400" y2="315" />
              <line x1="40" y1="390" x2="400" y2="390" />
              <line x1="115" y1="30" x2="115" y2="440" />
              <line x1="190" y1="30" x2="190" y2="440" />
              <line x1="265" y1="30" x2="265" y2="440" />
              <line x1="340" y1="30" x2="340" y2="440" />
            </g>

            {/* Ambient Spotlight Halo Around Trichur & Peninsula */}
            <circle
              cx="190"
              cy="280"
              r="195"
              fill="url(#trichurSpotlight)"
              className="india-map-ambient-circle"
            />

            {/* Outer Concentric Network Rings Centered on India */}
            <circle
              cx="210"
              cy="255"
              r="175"
              fill="none"
              stroke="rgba(56, 189, 248, 0.14)"
              strokeWidth="1"
              strokeDasharray="6 8"
              className="india-orbit-ring-slow"
            />
            <circle
              cx="210"
              cy="255"
              r="130"
              fill="none"
              stroke="rgba(251, 191, 36, 0.14)"
              strokeWidth="1"
              strokeDasharray="4 7"
              className="india-orbit-ring-reverse"
            />

            {/* Detailed Polygon Silhouette of India */}
            <g className="india-map-landmass">
              {/* Outer Shadow/Halo of India */}
              <path
                d="M 168 32
                   L 196 28 L 218 40 L 236 52 L 232 72 L 214 86 L 222 106 L 236 124
                   L 256 144 L 284 156 L 304 154 L 314 138 L 326 142 L 332 158
                   L 356 156 L 382 142 L 404 152 L 396 174 L 382 192 L 378 216
                   L 364 234 L 352 214 L 340 206 L 324 208 L 318 228 L 312 252
                   L 292 266 L 274 288 L 254 308 L 236 330 L 228 358 L 222 384
                   L 208 412 L 194 432 L 182 426 L 172 402 L 162 374 L 152 342
                   L 140 306 L 132 272 L 122 256 L 102 258 L 86 244 L 94 226
                   L 80 214 L 92 198 L 114 196 L 122 178 L 114 158 L 128 136
                   L 148 118 L 160 96 L 154 74 L 148 54 Z"
                fill="rgba(37, 99, 235, 0.18)"
                transform="translate(0, 5)"
                filter="url(#mapGlow)"
              />

              {/* Main India Silhouette */}
              <path
                d="M 168 32
                   L 196 28 L 218 40 L 236 52 L 232 72 L 214 86 L 222 106 L 236 124
                   L 256 144 L 284 156 L 304 154 L 314 138 L 326 142 L 332 158
                   L 356 156 L 382 142 L 404 152 L 396 174 L 382 192 L 378 216
                   L 364 234 L 352 214 L 340 206 L 324 208 L 318 228 L 312 252
                   L 292 266 L 274 288 L 254 308 L 236 330 L 228 358 L 222 384
                   L 208 412 L 194 432 L 182 426 L 172 402 L 162 374 L 152 342
                   L 140 306 L 132 272 L 122 256 L 102 258 L 86 244 L 94 226
                   L 80 214 L 92 198 L 114 196 L 122 178 L 114 158 L 128 136
                   L 148 118 L 160 96 L 154 74 L 148 54 Z"
                fill="url(#indiaBodyGrad)"
                stroke="url(#indiaStrokeGrad)"
                strokeWidth="2.2"
                strokeLinejoin="round"
                className="india-map-outline-path"
              />

              {/* Highlighted Kerala State Region on Southwest Coast */}
              <path
                d="M 165 372 L 178 370 L 190 404 L 194 430 L 182 426 L 172 402 Z"
                fill="rgba(250, 204, 21, 0.35)"
                stroke="#FACC15"
                strokeWidth="1.5"
              />

              {/* Andaman & Nicobar Islands & Lakshadweep Dots */}
              <g fill="#60A5FA" opacity="0.65">
                <circle cx="132" cy="396" r="2" />
                <circle cx="136" cy="406" r="1.8" />
                <circle cx="130" cy="414" r="1.6" />
                <circle cx="344" cy="348" r="2.2" />
                <circle cx="346" cy="360" r="2.4" />
                <circle cx="348" cy="372" r="2" />
                <circle cx="352" cy="388" r="1.8" />
              </g>
            </g>

            {/* Animated Knowledge & Training Network Arcs Across India */}
            <g className="india-network-arcs" fill="none">
              {/* Regional Network Mesh Lines from New Delhi HQ */}
              <path
                d="M 192 148 Q 145 185 132 234"
                stroke="rgba(96, 165, 250, 0.45)"
                strokeWidth="1.3"
                strokeDasharray="4 4"
                className="network-arc-flow"
              />
              <path
                d="M 192 148 Q 148 215 142 288"
                stroke="rgba(96, 165, 250, 0.5)"
                strokeWidth="1.4"
                strokeDasharray="4 4"
                className="network-arc-flow"
              />
              <path
                d="M 192 148 Q 250 185 298 244"
                stroke="rgba(96, 165, 250, 0.5)"
                strokeWidth="1.4"
                strokeDasharray="4 4"
                className="network-arc-flow"
              />
              <path
                d="M 298 244 Q 325 215 348 194"
                stroke="rgba(96, 165, 250, 0.45)"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                className="network-arc-flow"
              />
              <path
                d="M 192 148 Q 212 225 204 306"
                stroke="rgba(96, 165, 250, 0.48)"
                strokeWidth="1.3"
                strokeDasharray="4 4"
                className="network-arc-flow"
              />

              {/* Southern Chapter Connections into Trichur Diamond Chapter */}
              <path
                d="M 142 288 Q 148 342 178 392"
                stroke="rgba(251, 191, 36, 0.65)"
                strokeWidth="1.6"
                strokeDasharray="5 4"
                className="network-arc-flow-fast"
              />
              <path
                d="M 188 356 Q 182 374 178 392"
                stroke="rgba(52, 211, 153, 0.75)"
                strokeWidth="1.8"
                strokeDasharray="4 3"
                className="network-arc-flow-fast"
              />
              <path
                d="M 218 362 Q 198 380 178 392"
                stroke="rgba(52, 211, 153, 0.7)"
                strokeWidth="1.6"
                strokeDasharray="4 3"
                className="network-arc-flow-fast"
              />
              <path
                d="M 204 306 Q 190 350 178 392"
                stroke="rgba(251, 191, 36, 0.55)"
                strokeWidth="1.4"
                strokeDasharray="4 4"
                className="network-arc-flow"
              />

              {/* PRIMARY FLAGSHIP CORRIDOR: New Delhi National HQ -> ISTD Trichur Diamond Chapter */}
              <path
                id="delhiToTrichurArc"
                d="M 192 148 Q 145 270 178 392"
                stroke="url(#delhiTrichurGrad)"
                strokeWidth="2.8"
                strokeLinecap="round"
                filter="url(#mapGlow)"
              />
              <path
                d="M 192 148 Q 145 270 178 392"
                stroke="#FEF08A"
                strokeWidth="2"
                strokeDasharray="6 10"
                className="flagship-corridor-flow"
              />

              {/* Secondary Eastern-Southern Corridor: Kolkata -> Chennai -> Trichur */}
              <path
                d="M 298 244 Q 260 310 218 362"
                stroke="rgba(96, 165, 250, 0.42)"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                className="network-arc-flow"
              />
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
                      r="22"
                      fill="none"
                      stroke="rgba(250, 204, 21, 0.55)"
                      strokeWidth="1.5"
                      className="trichur-sonar-ring ring-1"
                    />
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r="14"
                      fill="none"
                      stroke="rgba(245, 158, 11, 0.8)"
                      strokeWidth="1.8"
                      className="trichur-sonar-ring ring-2"
                    />
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r="8"
                      fill="#F59E0B"
                      stroke="#FEF08A"
                      strokeWidth="2.2"
                      filter="url(#mapGlow)"
                    />
                    <circle cx={hub.x} cy={hub.y} r="3.2" fill="#FFFFFF" />

                    {/* Callout Badge for ISTD Trichur Chapter */}
                    <g transform={`translate(${hub.x - 148}, ${hub.y - 16})`}>
                      <rect
                        x="0"
                        y="0"
                        width="134"
                        height="34"
                        rx="8"
                        fill="rgba(11, 34, 57, 0.94)"
                        stroke="#FACC15"
                        strokeWidth="1.5"
                      />
                      <text
                        x="67"
                        y="14"
                        textAnchor="middle"
                        fill="#FDE047"
                        fontSize="8.5"
                        fontWeight="800"
                        letterSpacing="0.04em"
                      >
                        ★ ISTD TRICHUR
                      </text>
                      <text
                        x="67"
                        y="26"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="7.5"
                        fontWeight="700"
                      >
                        DIAMOND CHAPTER
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
                      r="16"
                      fill="none"
                      stroke="rgba(56, 189, 248, 0.65)"
                      strokeWidth="1.5"
                      className="trichur-sonar-ring ring-1"
                    />
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r="7"
                      fill="#0284C7"
                      stroke="#BAE6FD"
                      strokeWidth="2.2"
                      filter="url(#mapGlow)"
                    />
                    <circle cx={hub.x} cy={hub.y} r="2.8" fill="#FFFFFF" />

                    {/* Callout Badge for New Delhi National HQ */}
                    <g transform={`translate(${hub.x + 12}, ${hub.y - 18})`}>
                      <rect
                        x="0"
                        y="0"
                        width="136"
                        height="32"
                        rx="8"
                        fill="rgba(15, 23, 42, 0.92)"
                        stroke="#38BDF8"
                        strokeWidth="1.3"
                      />
                      <text
                        x="68"
                        y="13.5"
                        textAnchor="middle"
                        fill="#7DD3FC"
                        fontSize="8"
                        fontWeight="800"
                        letterSpacing="0.04em"
                      >
                        ISTD NATIONAL HQ
                      </text>
                      <text
                        x="68"
                        y="24.5"
                        textAnchor="middle"
                        fill="#F8FAFC"
                        fontSize="7.2"
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
                      r="10"
                      fill="none"
                      stroke="#38BDF8"
                      strokeWidth="1.4"
                      className="trichur-sonar-ring ring-2"
                    />
                  )}
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={isSelected ? 5 : 3.8}
                    fill={isSelected ? '#38BDF8' : '#93C5FD'}
                    stroke="#0B2239"
                    strokeWidth="1.2"
                  />
                  <text
                    x={
                      hub.labelPos === 'left'
                        ? hub.x - 7
                        : hub.x + 7
                    }
                    y={hub.y + 3}
                    textAnchor={hub.labelPos === 'left' ? 'end' : 'start'}
                    fill={isSelected ? '#FDE047' : 'rgba(226, 232, 240, 0.85)'}
                    fontSize="8"
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
        <div className="india-map-active- readout">
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

      {/* 4 Core ISTD Mission Pillars Grid Under the Map */}
      <div className="india-map-pillars-grid" aria-label="4 Core Mission Pillars of ISTD">
        {MISSION_PILLARS.map((pillar) => (
          <div
            key={pillar.id}
            className="india-map-pillar-chip"
            style={
              { '--chip-accent': pillar.color } as React.CSSProperties
            }
          >
            <span className="pillar-chip-icon" aria-hidden="true">
              {pillar.icon}
            </span>
            <div className="pillar-chip-text">
              <strong>{pillar.title}</strong>
              <small>{pillar.sub}</small>
            </div>
          </div>
        ))}
      </div>

      {/* Animated Mission Flow Strip */}
      <div
        className="ecosystem-mission-flow"
        aria-label="ISTD Mission Flow"
      >
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

      <p className="ecosystem-3d-caption">
        Facilitating individuals and organizations across India to excel in
        Training &amp; Development activities while serving as a reservoir of
        universal knowledge of human interface through innovative practices and
        original exploratory research.
      </p>
    </div>
  );
}
