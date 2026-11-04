'use client';

import React, { useState, useMemo } from 'react';
import {
  GALLERY_CATEGORIES,
  GALLERY_PHOTOS,
  GalleryPhoto,
  assetUrl,
} from '@/data/siteData';
import { useLightbox } from './LightboxProvider';

type ViewMode = 'masonry' | 'grid' | 'compact';

export function GalleryClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('masonry');
  const { openLightbox } = useLightbox();

  const filteredPhotos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return GALLERY_PHOTOS.filter((photo) => {
      const catMatch =
        selectedCategory === 'all' || photo.category === selectedCategory;
      if (!catMatch) return false;
      if (!q) return true;
      const haystack = `${photo.title} ${photo.shortDesc} ${photo.caption} ${photo.keywords} ${photo.categoryLabel} ${photo.metaTag}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenPhoto = (clickedPhoto: GalleryPhoto, autoPlay = false) => {
    const activeList = filteredPhotos.length > 0 ? filteredPhotos : GALLERY_PHOTOS;
    const lightboxItems = activeList.map((p) => ({
      src: p.src,
      title: p.title,
      caption: p.caption,
      category: p.categoryLabel,
    }));
    const idx = activeList.findIndex((p) => p.id === clickedPhoto.id);
    openLightbox(lightboxItems, idx >= 0 ? idx : 0, autoPlay);
  };

  const handleStartSlideshow = () => {
    const activeList = filteredPhotos.length > 0 ? filteredPhotos : GALLERY_PHOTOS;
    if (activeList[0]) {
      handleOpenPhoto(activeList[0], true);
    }
  };

  return (
    <>
      {/* Featured Event Spotlight Banner */}
      <section
        className="section-padding-sm bg-white"
        style={{ borderBottom: '1.5px solid var(--border-light)' }}
      >
        <div className="container">
          <div className="gallery-spotlight-banner">
            <div>
              <div className="gallery-spotlight-pill">
                <span>30 March 2026 • Hotel Pearl Regency, Thrissur</span>
              </div>
              <h2 className="gallery-spotlight-title">
                ISTD Thrissur Chapter Inauguration Photographs
              </h2>
              <p className="gallery-spotlight-desc">
                Held on <strong style={{ color: '#FFFFFF' }}>30 March 2026</strong> at{' '}
                <strong style={{ color: '#FFFFFF' }}>Hotel Pearl Regency, Thrissur</strong>, the
                inauguration was attended by National President{' '}
                <strong style={{ color: '#FFFFFF' }}>Shri. Atul Shah</strong>, Past National
                President{' '}
                <strong style={{ color: '#FFFFFF' }}>Dr. Yogesh Kumar Upadhyay</strong>, National
                Treasurer <strong style={{ color: '#FFFFFF' }}>Shri. Nabaghana Pany</strong>,
                Regional Vice President (South){' '}
                <strong style={{ color: '#FFFFFF' }}>Prof. (Dr.) Zakkariya K A</strong>, and
                Chapter Chairman <strong style={{ color: '#FFFFFF' }}>Shri. Tony Chacko</strong>.
              </p>
              <div className="gallery-spotlight-meta">
                <span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FACC15"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  30th March 2026
                </span>
                <span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FACC15"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Pearl Regency, Thrissur
                </span>
                <span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FACC15"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  24 Official High-Res Photos
                </span>
              </div>
              <div style={{ marginTop: '1.35rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-red btn-sm"
                  onClick={handleStartSlideshow}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Start Fullscreen Slideshow</span>
                </button>
              </div>
            </div>

            <div
              className="photo-feature-card"
              style={{
                background: 'rgba(255,255,255,0.08)',
                borderColor: 'rgba(255,255,255,0.2)',
              }}
              onClick={() => {
                const groupPhoto =
                  GALLERY_PHOTOS.find((p) => p.src === '/photos/team-istd.jpeg') ||
                  GALLERY_PHOTOS[0];
                if (groupPhoto) handleOpenPhoto(groupPhoto, false);
              }}
              role="button"
              tabIndex={0}
              aria-label="Open Grand Inaugural Group Portrait in Lightbox"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const groupPhoto =
                    GALLERY_PHOTOS.find((p) => p.src === '/photos/team-istd.jpeg') ||
                    GALLERY_PHOTOS[0];
                  if (groupPhoto) handleOpenPhoto(groupPhoto, false);
                }
              }}
            >
              <div className="photo-feature-inner">
                <img
                  src={assetUrl('/photos/team-istd.jpeg')}
                  alt="ISTD Thrissur Diamond Chapter Inauguration Group Photo"
                />
                <div className="photo-feature-caption">
                  <div className="photo-feature-caption-text">
                    <span>Click to Launch Lightbox Viewer</span>
                    <h4>Grand Inaugural Group Portrait</h4>
                  </div>
                  <div className="gallery-zoom-icon" aria-hidden="true">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Gallery Section */}
      <section className="section-padding bg-pale-blue" id="photoGallerySection">
        <div className="container">
          {/* Interactive Filter, Search & View Mode Command Bar */}
          <div className="gallery-Command-bar">
            <div className="gallery-filter-row">
              <div
                className="gallery-filter-pills"
                role="tablist"
                aria-label="Filter photos by category"
              >
                {GALLERY_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={selectedCategory === cat.id}
                    className={`gallery-filter-btn ${
                      selectedCategory === cat.id ? 'active' : ''
                    }`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span>{cat.label}</span>
                    <span className="gallery-filter-count">{cat.count}</span>
                  </button>
                ))}
              </div>

              <div className="gallery-search-and-view">
                <div className="gallery-search-box">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="search"
                    id="gallerySearchInput"
                    className="gallery-search-input"
                    placeholder="Search by leader, moment, or keyword..."
                    aria-label="Search gallery photos"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div
                  className="gallery-view-toggle"
                  role="group"
                  aria-label="Gallery layout view"
                >
                  <button
                    type="button"
                    className={`view-toggle-btn ${viewMode === 'masonry' ? 'active' : ''}`}
                    onClick={() => setViewMode('masonry')}
                    title="Featured Editorial View"
                    aria-label="Featured Editorial View"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="3" width="18" height="7" rx="1" />
                      <rect x="3" y="14" width="8" height="7" rx="1" />
                      <rect x="15" y="14" width="6" height="7" rx="1" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Standard 3-Column Grid"
                    aria-label="Standard 3-Column Grid"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className={`view-toggle-btn ${viewMode === 'compact' ? 'active' : ''}`}
                    onClick={() => setViewMode('compact')}
                    title="Compact 4-Column Grid"
                    aria-label="Compact 4-Column Grid"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="gallery-command-footer">
              <span id="galleryShowingCount">
                Showing <strong>{filteredPhotos.length}</strong> of{' '}
                <strong>{GALLERY_PHOTOS.length}</strong> official photographs
              </span>
              <span>
                💡 <strong>Tip:</strong> Tap or click any photograph for Full-Screen Lightbox with
                Slideshow &amp; Zoom.
              </span>
            </div>
          </div>

          {/* Empty State when Search has no matches */}
          {filteredPhotos.length === 0 ? (
            <div className="gallery-empty-state" id="galleryEmptyState">
              <h3>No Matching Photographs Found</h3>
              <p>Try clearing your search term or selecting a different category tab.</p>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                Reset Gallery Filters
              </button>
            </div>
          ) : (
            <div className={`gallery-grid layout-${viewMode}`} id="mainGalleryGrid">
              {filteredPhotos.map((photo) => (
                <article
                  key={photo.id}
                  className={`gallery-card ${photo.featured ? 'card-featured' : ''}`}
                  onClick={() => handleOpenPhoto(photo, false)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open photo: ${photo.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenPhoto(photo, false);
                    }
                  }}
                >
                  <div className="gallery-card-media">
                    <img src={assetUrl(photo.src)} alt={photo.title} loading="lazy" />
                    <div className="gallery-card-overlay">
                      <div className="gallery-item-top">
                        <span className="gallery-cat-badge">{photo.categoryLabel}</span>
                        <div className="gallery-zoom-icon" aria-hidden="true">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="gallery-card-body">
                    <div>
                      <h3 className="gallery-card-title">{photo.title}</h3>
                      <p className="gallery-card-desc">{photo.shortDesc}</p>
                    </div>
                    <div className="gallery-card-meta">
                      <span>{photo.metaTag}</span>
                      <span className="gallery-card-action">View Fullscreen &rarr;</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
