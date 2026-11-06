'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ALL_CHAPTER_EVENTS, assetUrl, ChapterEvent } from '@/data/siteData';
import { fetchBackendStore } from '@/lib/clientBackendCache';

type EventStatusFilter = 'all' | 'upcoming' | 'past';
type EventCategoryFilter =
  | 'all'
  | 'milestones'
  | 'webinars'
  | 'campus';

interface EventsChronicleSectionProps {
  initialTab?: EventStatusFilter;
  compactHomeView?: boolean;
}

function extractEventYear(event: ChapterEvent): string {
  if (event.year) return event.year;
  const match = event.date.match(/\b(20\d{2})\b/);
  return match ? match[1] : '2026';
}

export function EventsChronicleSection({
  initialTab = 'all',
  compactHomeView = false,
}: EventsChronicleSectionProps) {
  const [statusFilter, setStatusFilter] =
    useState<EventStatusFilter>(initialTab);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] =
    useState<EventCategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [eventsList, setEventsList] =
    useState<ChapterEvent[]>(ALL_CHAPTER_EVENTS);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#pastEvents') {
        setStatusFilter('past');
      } else if (window.location.hash === '#upcomingEvents') {
        setStatusFilter('upcoming');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    const loadBackendEvents = () => {
      fetchBackendStore().then(({ data }) => {
        if (data?.events?.length) {
          setEventsList(data.events);
        }
      });
    };
    loadBackendEvents();
    window.addEventListener('istd-backend-updated', loadBackendEvents);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('istd-backend-updated', loadBackendEvents);
    };
  }, []);

  const availableYears = useMemo(() => {
    const yearsSet = new Set<string>();
    eventsList.forEach((ev) => yearsSet.add(extractEventYear(ev)));
    return Array.from(yearsSet).sort((a, b) => Number(b) - Number(a));
  }, [eventsList]);

  const upcomingCount = useMemo(
    () => eventsList.filter((e) => e.status === 'upcoming').length,
    [eventsList]
  );
  const pastCount = useMemo(
    () => eventsList.filter((e) => e.status === 'past').length,
    [eventsList]
  );

  const filteredEvents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return eventsList.filter((ev) => {
      const evYear = extractEventYear(ev);
      if (selectedYear !== 'all' && evYear !== selectedYear) {
        return false;
      }

      if (statusFilter === 'upcoming' && ev.status !== 'upcoming') {
        return false;
      }
      if (statusFilter === 'past' && ev.status !== 'past') {
        return false;
      }

      if (categoryFilter === 'milestones') {
        const isMilestone =
          ev.programmeType === 'Chapter Milestone' ||
          ev.programmeType === '57th Foundation Day Session' ||
          ev.slug === 'chapter-connect-2026';
        if (!isMilestone) return false;
      } else if (categoryFilter === 'webinars') {
        const isWebinar =
          ev.programmeType === 'Webinar' ||
          ev.programmeType === 'Special Session' ||
          ev.programmeType === '57th Foundation Day Session';
        if (!isWebinar) return false;
      } else if (categoryFilter === 'campus') {
        const isCampus =
          ev.programmeType === 'Campus Chapter Milestone' ||
          ev.slug.includes('student-chapter');
        if (!isCampus) return false;
      }

      if (q) {
        const searchable = [
          ev.title,
          ev.programmeType,
          ev.date,
          ev.monthLabel || '',
          evYear,
          ev.venue,
          ev.speaker || '',
          ev.speakerDesignation || '',
          ev.shortDescription,
          ...(ev.fullDescription || []),
        ]
          .join(' ')
          .toLowerCase();

        if (!searchable.includes(q)) {
          return false;
        }
      }

      return true;
    });
  }, [eventsList, selectedYear, statusFilter, categoryFilter, searchQuery]);

  const groupedByYear = useMemo(() => {
    const map = new Map<string, ChapterEvent[]>();
    filteredEvents.forEach((ev) => {
      const yr = extractEventYear(ev);
      const list = map.get(yr) || [];
      list.push(ev);
      map.set(yr, list);
    });
    return Array.from(map.entries()).sort(
      (a, b) => Number(b[0]) - Number(a[0])
    );
  }, [filteredEvents]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedYear('all');
    setStatusFilter('all');
    setCategoryFilter('all');
  };

  return (
    <section
      className="section-padding bg-white"
      id="eventsProgrammesSection"
      aria-label="Events and Programmes"
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1.25rem',
            marginBottom: '1.75rem',
          }}
        >
          <div>
            <span className="section-tag tag-blue">
              Year-Wise Programme Directory
            </span>
            <h2 className="section-title" style={{ marginBottom: '0.35rem' }}>
              Events, Webinars &amp; Chapter Milestones
            </h2>
            <p
              style={{
                color: 'var(--color-muted)',
                fontSize: '0.96rem',
                maxWidth: '680px',
                marginBottom: 0,
                textAlign: 'justify',
              }}
            >
              Browse and search ISTD Trichur Chapter programmes by year,
              category, speaker, or session status. Select any programme card to
              view its complete report, resource person details, and photographs.
            </p>
          </div>

          {compactHomeView && (
            <Link href="/events" className="btn btn-outline-navy btn-sm">
              Open Full Events Directory &rarr;
            </Link>
          )}
        </div>

        {/* Interactive Search & Year / Category Filter Console */}
        <div
          style={{
            background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
            border: '1.5px solid #DBEAFE',
            borderRadius: '20px',
            padding: 'clamp(1.15rem, 2.5vw, 1.65rem)',
            marginBottom: '2.25rem',
            boxShadow: '0 10px 28px -8px rgba(15, 23, 42, 0.06)',
          }}
        >
          {/* Top Row: Search Input + Year Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.85rem 1.25rem',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.1rem',
            }}
          >
            {/* Search Box */}
            <div style={{ position: 'relative', flex: '1 1 340px', minWidth: 0 }}>
              <label
                htmlFor="events-search-input"
                className="sr-only"
                style={{
                  position: 'absolute',
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden',
                  clip: 'rect(0,0,0,0)',
                }}
              >
                Search events by title, speaker, topic, or venue
              </label>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2563EB"
                strokeWidth="2.2"
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                id="events-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by event title, speaker, topic, or venue..."
                style={{
                  width: '100%',
                  padding: '0.78rem 2.6rem 0.78rem 2.75rem',
                  borderRadius: '12px',
                  border: '1.5px solid #BFDBFE',
                  background: '#FFFFFF',
                  color: '#0F172A',
                  fontSize: '0.92rem',
                  fontWeight: 500,
                  outline: 'none',
                  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.03)',
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: '#E2E8F0',
                    border: 'none',
                    borderRadius: '999px',
                    width: '22px',
                    height: '22px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: '#334155',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Year-Wise Archive Selector Pills */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.5rem',
                justifyContent: 'flex-start',
              }}
              role="group"
              aria-label="Year-Wise Archive Filter"
            >
              <span
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  color: '#1E3A8A',
                  marginRight: '0.25rem',
                }}
              >
                Year-Wise Archive:
              </span>
              <button
                type="button"
                onClick={() => setSelectedYear('all')}
                style={{
                  padding: '0.45rem 0.95rem',
                  borderRadius: '999px',
                  border:
                    selectedYear === 'all'
                      ? '1.5px solid #0B2239'
                      : '1.5px solid #CBD5E1',
                  background: selectedYear === 'all' ? '#0B2239' : '#FFFFFF',
                  color: selectedYear === 'all' ? '#FFFFFF' : '#334155',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                All Years ({eventsList.length})
              </button>
              {availableYears.map((yr) => {
                const count = eventsList.filter(
                  (e) => extractEventYear(e) === yr
                ).length;
                const active = selectedYear === yr;
                return (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setSelectedYear(yr)}
                    style={{
                      padding: '0.45rem 0.95rem',
                      borderRadius: '999px',
                      border: active
                        ? '1.5px solid #2563EB'
                        : '1.5px solid #CBD5E1',
                      background: active ? '#2563EB' : '#FFFFFF',
                      color: active ? '#FFFFFF' : '#1E293B',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    🗓️ {yr} • Current Year ({count})
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setSelectedYear('pre-2026')}
                style={{
                  padding: '0.45rem 0.95rem',
                  borderRadius: '999px',
                  border:
                    selectedYear === 'pre-2026'
                      ? '1.5px solid #0B2239'
                      : '1.5px solid #CBD5E1',
                  background:
                    selectedYear === 'pre-2026' ? '#0B2239' : '#FFFFFF',
                  color: selectedYear === 'pre-2026' ? '#FFFFFF' : '#475569',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                🗄️ 2025 &amp; Earlier Archive
              </button>
            </div>
          </div>

          {/* Bottom Row: Status Filter & Category Filter */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.85rem',
              paddingTop: '0.95rem',
              borderTop: '1px solid #DBEAFE',
            }}
          >
            {/* Status Tabs */}
            <div
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}
              role="tablist"
              aria-label="Event status filter"
            >
              <button
                type="button"
                role="tab"
                aria-selected={statusFilter === 'all'}
                onClick={() => setStatusFilter('all')}
                style={{
                  padding: '0.42rem 0.9rem',
                  borderRadius: '10px',
                  border:
                    statusFilter === 'all'
                      ? '1.5px solid #1E40AF'
                      : '1px solid #CBD5E1',
                  background: statusFilter === 'all' ? '#1E40AF' : '#FFFFFF',
                  color: statusFilter === 'all' ? '#FFFFFF' : '#334155',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                All Programmes ({eventsList.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={statusFilter === 'upcoming'}
                onClick={() => setStatusFilter('upcoming')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.42rem 0.9rem',
                  borderRadius: '10px',
                  border:
                    statusFilter === 'upcoming'
                      ? '1.5px solid #059669'
                      : '1px solid #CBD5E1',
                  background:
                    statusFilter === 'upcoming' ? '#059669' : '#FFFFFF',
                  color: statusFilter === 'upcoming' ? '#FFFFFF' : '#334155',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <span className="pulse-dot-green" aria-hidden="true" />
                <span>Upcoming ({upcomingCount})</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={statusFilter === 'past'}
                onClick={() => setStatusFilter('past')}
                style={{
                  padding: '0.42rem 0.9rem',
                  borderRadius: '10px',
                  border:
                    statusFilter === 'past'
                      ? '1.5px solid #0B2239'
                      : '1px solid #CBD5E1',
                  background: statusFilter === 'past' ? '#0B2239' : '#FFFFFF',
                  color: statusFilter === 'past' ? '#FFFFFF' : '#334155',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Completed Reports ({pastCount})
              </button>
            </div>

            {/* Category Pills */}
            <div
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}
              role="group"
              aria-label="Programme category filter"
            >
              {(
                [
                  { id: 'all', label: 'All Categories' },
                  { id: 'milestones', label: 'Chapter Milestones' },
                  { id: 'campus', label: 'Campus Chapters' },
                  { id: 'webinars', label: 'Webinars & Sessions' },
                ] as { id: EventCategoryFilter; label: string }[]
              ).map((cat) => {
                const active = categoryFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoryFilter(cat.id)}
                    style={{
                      padding: '0.38rem 0.8rem',
                      borderRadius: '999px',
                      border: active
                        ? '1.5px solid #2563EB'
                        : '1px solid #CBD5E1',
                      background: active ? '#EFF6FF' : '#FFFFFF',
                      color: active ? '#1D4ED8' : '#475569',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Summary Bar */}
        {(searchQuery ||
          selectedYear !== 'all' ||
          statusFilter !== 'all' ||
          categoryFilter !== 'all') && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              marginBottom: '1.5rem',
              padding: '0.75rem 1.1rem',
              background: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              fontSize: '0.88rem',
              color: '#334155',
            }}
          >
            <div>
              Showing <strong>{filteredEvents.length}</strong> of{' '}
              <strong>{eventsList.length}</strong> programmes
              {selectedYear !== 'all' ? ` in ${selectedYear}` : ''}
              {searchQuery ? ` matching “${searchQuery}”` : ''}
            </div>
            <button
              type="button"
              onClick={resetFilters}
              style={{
                background: 'none',
                border: 'none',
                color: '#2563EB',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.85rem',
                textDecoration: 'underline',
              }}
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Empty State or Pre-2026 Archive Notice */}
        {groupedByYear.length === 0 ? (
          <div
            style={{
              padding: '3rem 2rem',
              textAlign: 'left',
              background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
              borderRadius: '20px',
              border: '1.5px solid #BFDBFE',
              maxWidth: '820px',
              margin: '0 auto',
            }}
          >
            {selectedYear === 'pre-2026' ? (
              <>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.28rem 0.78rem',
                    borderRadius: '999px',
                    background: '#FEF3C7',
                    border: '1px solid #F59E0B',
                    color: '#92400E',
                    fontSize: '0.73rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '0.75rem',
                  }}
                >
                  Year-Wise Archive Notice • Pre-2026
                </span>
                <h3
                  style={{
                    fontSize: '1.28rem',
                    fontWeight: 800,
                    color: '#0F172A',
                    marginBottom: '0.6rem',
                  }}
                >
                  ISTD Trichur Chapter Was Inaugurated on 30 March 2026
                </h3>
                <p
                  style={{
                    color: '#334155',
                    fontSize: '0.96rem',
                    lineHeight: 1.75,
                    marginBottom: '1.25rem',
                    textAlign: 'justify',
                  }}
                >
                  While the parent body—the{' '}
                  <strong>
                    Indian Society for Training &amp; Development (ISTD, New
                    Delhi)
                  </strong>
                  —was established in <strong>April 1970</strong>, the{' '}
                  <strong>ISTD Trichur Chapter</strong> was officially
                  inaugurated as a <strong>Diamond Chapter</strong> on{' '}
                  <strong>30 March 2026</strong> at Hotel Pearl Regency,
                  Trichur. All chapter-level webinars, orientation forums, and
                  student chapter milestones are archived from the{' '}
                  <strong>2026 Inaugural Year</strong> onwards.
                </p>
                <div
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedYear('2026')}
                    className="btn btn-primary btn-sm"
                  >
                    View 2026 Current Year Programmes ({eventsList.length})
                    &rarr;
                  </button>
                  <a
                    href="https://www.istd.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-navy btn-sm"
                  >
                    Visit ISTD National Portal (istd.in) &#8599;
                  </a>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: '#0F172A',
                    marginBottom: '0.45rem',
                  }}
                >
                  No matching programmes found
                </h3>
                <p
                  style={{
                    color: '#64748B',
                    fontSize: '0.94rem',
                    marginBottom: '1.15rem',
                  }}
                >
                  Try clearing your search query or switching the year/category
                  filters above.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="btn btn-primary btn-sm"
                >
                  Show All Programmes
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '3rem' }}>
            {groupedByYear.map(([year, yearEvents]) => {
              const yearUpcoming = yearEvents.filter(
                (e) => e.status === 'upcoming'
              );
              const yearPast = yearEvents.filter((e) => e.status === 'past');

              return (
                <div key={year} id={`year-${year}`}>
                  {/* Year Section Banner */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      padding: '1.1rem 1.45rem',
                      marginBottom: '1.75rem',
                      background:
                        'linear-gradient(135deg, #071524 0%, #0B2239 65%, #163E66 100%)',
                      color: '#FFFFFF',
                      borderRadius: '16px',
                      borderLeft: '5px solid #FACC15',
                      boxShadow: '0 10px 25px -6px rgba(11, 34, 57, 0.16)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.85rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          padding: '0.32rem 0.85rem',
                          borderRadius: '999px',
                          background: '#FACC15',
                          color: '#071524',
                          fontSize: '0.85rem',
                          fontWeight: 900,
                          letterSpacing: '0.04em',
                        }}
                      >
                        YEAR {year} • CURRENT YEAR
                      </span>
                      <div>
                        <h3
                          style={{
                            color: '#FFFFFF',
                            fontSize: '1.22rem',
                            fontWeight: 800,
                            margin: 0,
                          }}
                        >
                          {year} Chapter Programmes, Upcoming Sessions &amp;
                          Year-Wise Archive
                        </h3>
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                      }}
                    >
                      <span
                        style={{
                          padding: '0.28rem 0.75rem',
                          borderRadius: '999px',
                          background: 'rgba(255,255,255,0.12)',
                          color: '#F8FAFC',
                        }}
                      >
                        {yearEvents.length}{' '}
                        {yearEvents.length === 1 ? 'Programme' : 'Programmes'}
                      </span>
                      {yearUpcoming.length > 0 && (
                        <span
                          style={{
                            padding: '0.28rem 0.75rem',
                            borderRadius: '999px',
                            background: 'rgba(16, 185, 129, 0.22)',
                            border: '1px solid #34D399',
                            color: '#A7F3D0',
                          }}
                        >
                          {yearUpcoming.length} Upcoming
                        </span>
                      )}
                      {yearPast.length > 0 && (
                        <span
                          style={{
                            padding: '0.28rem 0.75rem',
                            borderRadius: '999px',
                            background: 'rgba(59, 130, 246, 0.25)',
                            border: '1px solid #93C5FD',
                            color: '#DBEAFE',
                          }}
                        >
                          {yearPast.length} Completed in {year}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Upcoming Events in this Year */}
                  {yearUpcoming.length > 0 && (
                    <div
                      style={{
                        marginBottom: yearPast.length > 0 ? '2.5rem' : 0,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                          marginBottom: '1rem',
                          paddingBottom: '0.55rem',
                          borderBottom: '2px solid #D1FAE5',
                        }}
                      >
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.55rem',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.92rem',
                            fontWeight: 800,
                            color: '#065F46',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                          }}
                        >
                          <span className="pulse-dot-green" />
                          <span>
                            Upcoming Events ({year} Current Year) — Registration
                            Open
                          </span>
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr',
                          gap: '1.5rem',
                        }}
                      >
                        {yearUpcoming.map((ev) => (
                          <UpcomingEventCard key={ev.slug} event={ev} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Completed Events in this Year */}
                  {yearPast.length > 0 && (
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                          marginBottom: '1.15rem',
                          paddingBottom: '0.55rem',
                          borderBottom: '2px solid #DBEAFE',
                        }}
                      >
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.55rem',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.92rem',
                            fontWeight: 800,
                            color: '#0B2239',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                          }}
                        >
                          <span>
                            🗂️ Events of the Current Year ({year}) — Completed
                            Programmes &amp; Reports ({yearPast.length})
                          </span>
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns:
                            'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                          gap: '1.65rem',
                        }}
                      >
                        {yearPast.map((ev) => (
                          <PastEventCard key={ev.slug} event={ev} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export function UpcomingEventCard({ event }: { event: ChapterEvent }) {
  const router = useRouter();
  const eventYear = extractEventYear(event);

  const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) return;
    router.push(`/events/${event.slug}`);
  };

  return (
    <article
      className="upcoming-event-card clickable-event-card"
      onClick={handleCardClick}
      style={{
        padding: 0,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <div className="upcoming-poster-layout">
        {/* Left: Official Event Poster */}
        <div className="upcoming-poster-media">
          <img
            src={assetUrl(event.image)}
            alt={event.imageCaption}
            loading="lazy"
          />
        </div>

        {/* Right: Structured Event Content */}
        <div
          style={{
            padding: 'clamp(1.25rem, 3.5vw, 2rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.55rem',
                alignItems: 'center',
                marginBottom: '0.85rem',
              }}
            >
              <span
                style={{
                  background: '#059669',
                  color: '#fff',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '999px',
                }}
              >
                ● Upcoming • {eventYear}
              </span>
              <span
                style={{
                  background: 'var(--brand-navy)',
                  color: '#fff',
                  fontSize: '0.73rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '999px',
                }}
              >
                {event.programmeType}
              </span>
              <span
                style={{
                  background: 'var(--accent-blue-subtle)',
                  color: 'var(--accent-blue)',
                  border: '1px solid var(--border-blue)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.28rem 0.75rem',
                  borderRadius: '999px',
                }}
              >
                📅 {event.date} • 🕖 {event.timeIST}
              </span>
            </div>

            {event.subtitleQuestion && (
              <p
                style={{
                  fontSize: '0.96rem',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  color: 'var(--brand-blue)',
                  marginBottom: '0.4rem',
                }}
              >
                {event.subtitleQuestion}
              </p>
            )}

            <h3
              style={{
                fontSize: 'clamp(1.3rem, 2.2vw, 1.65rem)',
                fontWeight: 800,
                color: 'var(--color-ink)',
                marginBottom: '1rem',
                lineHeight: 1.3,
              }}
            >
              <Link
                href={`/events/${event.slug}`}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                {event.title}
              </Link>
            </h3>

            {/* Speaker & Schedule Box */}
            <dl
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.75rem 1.25rem',
                margin: '0 0 1.15rem 0',
                padding: '1rem 1.2rem',
                background: 'var(--color-surface-soft)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                fontSize: '0.88rem',
              }}
            >
              {event.speaker && (
                <div>
                  <dt
                    style={{
                      fontSize: '0.73rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--color-muted)',
                      marginBottom: '0.15rem',
                    }}
                  >
                    🎙️ Resource Person
                  </dt>
                  <dd
                    style={{
                      margin: 0,
                      color: 'var(--color-ink)',
                      fontWeight: 800,
                    }}
                  >
                    {event.speaker}
                    {event.speakerDesignation && (
                      <span
                        style={{
                          display: 'block',
                          fontWeight: 600,
                          fontSize: '0.82rem',
                          color: 'var(--brand-blue)',
                        }}
                      >
                        {event.speakerDesignation}
                      </span>
                    )}
                  </dd>
                </div>
              )}

              <div>
                <dt
                  style={{
                    fontSize: '0.73rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--color-muted)',
                    marginBottom: '0.15rem',
                  }}
                >
                  📅 Date &amp; Time (IST)
                </dt>
                <dd
                  style={{
                    margin: 0,
                    color: 'var(--color-ink)',
                    fontWeight: 700,
                  }}
                >
                  {event.date}
                  <span
                    style={{
                      display: 'block',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      color: 'var(--color-body)',
                    }}
                  >
                    {event.timeIST}
                  </span>
                </dd>
              </div>

              <div>
                <dt
                  style={{
                    fontSize: '0.73rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--color-muted)',
                    marginBottom: '0.15rem',
                  }}
                >
                  💻 Platform / Venue
                </dt>
                <dd
                  style={{
                    margin: 0,
                    color: 'var(--color-ink)',
                    fontWeight: 700,
                  }}
                >
                  {event.venue}
                  <span
                    style={{
                      display: 'block',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      color: 'var(--color-body)',
                    }}
                  >
                    Organised by ISTD Trichur Chapter
                  </span>
                </dd>
              </div>
            </dl>

            <p
              style={{
                fontSize: '0.94rem',
                color: 'var(--color-body)',
                lineHeight: 1.72,
                marginBottom: 0,
                textAlign: 'justify',
              }}
            >
              {event.shortDescription}
            </p>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              marginTop: '1.5rem',
              paddingTop: '1.15rem',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              alignItems: 'center',
            }}
          >
            <Link
              href={`/events/${event.slug}`}
              className="btn btn-primary btn-sm"
            >
              View Details &amp; Poster &rarr;
            </Link>
            {event.registrationAvailable && (
              <Link
                href={`/events/${event.slug}#eventRegistrationFormBox`}
                className="btn btn-red btn-sm"
              >
                Register Now &rarr;
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function PastEventCard({ event }: { event: ChapterEvent }) {
  const router = useRouter();
  const eventYear = extractEventYear(event);

  const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) return;
    router.push(`/events/${event.slug}`);
  };

  return (
    <article
      className="upcoming-event-card clickable-event-card"
      onClick={handleCardClick}
      style={{
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}
    >
      <div>
        {/* Event Image */}
        <div
          style={{
            position: 'relative',
            aspectRatio: event.isPosterImage ? '1/1' : '16/10',
            maxHeight: event.isPosterImage ? '340px' : '250px',
            width: '100%',
            overflow: 'hidden',
            background: '#071524',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <img
            src={assetUrl(event.image)}
            alt={event.imageCaption}
            style={{
              width: '100%',
              height: '100%',
              objectFit: event.isPosterImage ? 'contain' : 'cover',
              display: 'block',
            }}
            loading="lazy"
          />
          <div
            style={{
              position: 'absolute',
              top: '0.85rem',
              left: '0.85rem',
              display: 'flex',
              gap: '0.45rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                background: 'rgba(12, 27, 56, 0.92)',
                color: '#fff',
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '0.28rem 0.7rem',
                borderRadius: '999px',
              }}
            >
              {event.programmeType}
            </span>
            <span
              style={{
                background: '#FACC15',
                color: '#071524',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '0.28rem 0.65rem',
                borderRadius: '999px',
              }}
            >
              {event.monthLabel || eventYear}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div style={{ padding: '1.5rem' }}>
          <div
            style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--brand-blue)',
              marginBottom: '0.45rem',
            }}
          >
            📅 {event.date}{' '}
            {event.timeIST ? `• 🕢 ${event.timeIST}` : ''} • {event.venue}
          </div>

          <h3
            style={{
              fontSize: '1.16rem',
              fontWeight: 800,
              color: 'var(--color-ink)',
              marginBottom: '0.65rem',
              lineHeight: 1.35,
            }}
          >
            <Link
              href={`/events/${event.slug}`}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              {event.title}
            </Link>
          </h3>

          {event.speaker && (
            <div
              style={{
                fontSize: '0.84rem',
                color: 'var(--color-ink)',
                background: 'var(--color-surface-soft)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.55rem 0.75rem',
                marginBottom: '0.75rem',
              }}
            >
              <strong>🎙️ {event.speaker}</strong>
              {event.speakerDesignation && (
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.79rem',
                    color: 'var(--color-muted)',
                    marginTop: '0.12rem',
                  }}
                >
                  {event.speakerDesignation}
                </span>
              )}
            </div>
          )}

          <p
            style={{
              fontSize: '0.92rem',
              color: 'var(--color-body)',
              lineHeight: 1.68,
              marginBottom: 0,
              textAlign: 'justify',
            }}
          >
            {event.shortDescription}
          </p>
        </div>
      </div>

      {/* Action Buttons: View Report & Photos */}
      <div
        style={{
          padding: '1rem 1.5rem 1.35rem',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.65rem',
          alignItems: 'center',
        }}
      >
        <Link
          href={`/events/${event.slug}`}
          className="btn btn-primary btn-sm"
        >
          View Official Report &rarr;
        </Link>
        {event.hasPhotoGallery && (
          <Link
            href={`/events/${event.slug}#eventPhotosSection`}
            className="btn btn-outline-navy btn-sm"
          >
            {event.slug === 'inauguration'
              ? '24 Event Photos'
              : `${event.eventPhotos?.length || 1} Event Photos`}
          </Link>
        )}
      </div>
    </article>
  );
}
