'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { assetUrl } from '@/data/siteData';

export interface LightboxItem {
  src: string;
  title: string;
  caption?: string;
  category?: string;
}

interface LightboxContextValue {
  openLightbox: (items: LightboxItem[], startIndex?: number, autoPlay?: boolean) => void;
  openSinglePhoto: (item: LightboxItem) => void;
  closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxContextValue | undefined>(undefined);

export function useLightbox(): LightboxContextValue {
  const ctx = useContext(LightboxContext);
  if (!ctx) {
    throw new Error('useLightbox must be used within a LightboxProvider');
  }
  return ctx;
}

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const openLightbox = useCallback(
    (newItems: LightboxItem[], startIndex = 0, autoPlay = false) => {
      if (!newItems.length) return;
      setItems(newItems);
      setCurrentIndex(Math.max(0, Math.min(startIndex, newItems.length - 1)));
      setIsZoomed(false);
      setImgLoaded(false);
      setIsSlideshow(autoPlay);
      setIsOpen(true);
    },
    []
  );

  const openSinglePhoto = useCallback((item: LightboxItem) => {
    setItems([item]);
    setCurrentIndex(0);
    setIsZoomed(false);
    setImgLoaded(false);
    setIsSlideshow(false);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    setIsSlideshow(false);
    setIsZoomed(false);
  }, []);

  const goNext = useCallback(() => {
    if (items.length <= 1) return;
    setIsZoomed(false);
    setImgLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goPrev = useCallback(() => {
    if (items.length <= 1) return;
    setIsZoomed(false);
    setImgLoaded(false);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        setIsSlideshow(false);
        goNext();
      } else if (e.key === 'ArrowLeft') {
        setIsSlideshow(false);
        goPrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsSlideshow((prev) => !prev);
      } else if (e.key.toLowerCase() === 'z') {
        setIsZoomed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeLightbox, goNext, goPrev]);

  // Auto slideshow interval
  useEffect(() => {
    if (!isOpen || !isSlideshow || items.length <= 1) return;
    const timer = setInterval(() => {
      setIsZoomed(false);
      setImgLoaded(false);
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isOpen, isSlideshow, items.length]);

  const currentItem = items[currentIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(deltaX) > 45) {
      setIsSlideshow(false);
      if (deltaX < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  return (
    <LightboxContext.Provider value={{ openLightbox, openSinglePhoto, closeLightbox }}>
      {children}

      {isOpen && currentItem && (
        <div
          className="lightbox-modal is-open"
          role="dialog"
          aria-modal="true"
          aria-label="Full-screen Photo Viewer"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar */}
          <div className="lightbox-topbar">
            <div className="lightbox-top-left">
              <span className="lightbox-counter">
                {currentIndex + 1} / {items.length}
              </span>
              {currentItem.category && (
                <span className="lightbox-cat-pill">{currentItem.category}</span>
              )}
            </div>

            <div className="lightbox-top-actions">
              {items.length > 1 && (
                <button
                  type="button"
                  className={`lightbox-action-btn ${isSlideshow ? 'active-slideshow' : ''}`}
                  onClick={() => setIsSlideshow((prev) => !prev)}
                  aria-label="Toggle Slideshow"
                >
                  {isSlideshow ? (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                      <span className="hide-xs">Pause</span>
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      <span className="hide-xs">Slideshow</span>
                    </>
                  )}
                </button>
              )}

              <button
                type="button"
                className="lightbox-action-btn"
                onClick={() => setIsZoomed((prev) => !prev)}
                aria-label="Toggle Zoom"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <span className="hide-xs">{isZoomed ? 'Reset' : 'Zoom'}</span>
              </button>

              <a
                href={assetUrl(currentItem.src)}
                download={currentItem.src.split('/').pop() || 'istd-thrissur-photo.jpeg'}
                className="lightbox-action-btn"
                aria-label="Download High-Res Photo"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span className="hide-xs">Download</span>
              </a>

              <button
                type="button"
                className="lightbox-action-btn close-btn"
                onClick={closeLightbox}
                aria-label="Close Lightbox (Esc)"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Stage */}
          <div
            className="lightbox-stage"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox();
            }}
          >
            {items.length > 1 && (
              <button
                type="button"
                className="lightbox-nav-arrow prev"
                onClick={() => {
                  setIsSlideshow(false);
                  goPrev();
                }}
                aria-label="Previous Photograph"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            <div className="lightbox-img-container">
              {!imgLoaded && <div className="lightbox-spinner" aria-hidden="true" />}
              <img
                src={assetUrl(currentItem.src)}
                alt={currentItem.title}
                className={`lightbox-img ${isZoomed ? 'is-zoomed' : ''} ${
                  imgLoaded ? 'is-loaded' : 'is-loading'
                }`}
                onLoad={() => setImgLoaded(true)}
                onClick={() => setIsZoomed((prev) => !prev)}
              />
            </div>

            {items.length > 1 && (
              <button
                type="button"
                className="lightbox-nav-arrow next"
                onClick={() => {
                  setIsSlideshow(false);
                  goNext();
                }}
                aria-label="Next Photograph"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>

          {/* Bottom Bar & Filmstrip */}
          <div className="lightbox-bottombar">
            <div className="lightbox-caption-wrap">
              <h3>{currentItem.title}</h3>
              {currentItem.caption && <p>{currentItem.caption}</p>}
            </div>

            {items.length > 1 && (
              <div className="lightbox-filmstrip" aria-label="Photo Thumbnails">
                {items.map((item, idx) => (
                  <button
                    key={`${item.src}-${idx}`}
                    type="button"
                    className={`lightbox-film-thumb ${idx === currentIndex ? 'active' : ''}`}
                    onClick={() => {
                      setIsSlideshow(false);
                      setIsZoomed(false);
                      setImgLoaded(false);
                      setCurrentIndex(idx);
                    }}
                    aria-label={`View photo ${idx + 1}: ${item.title}`}
                  >
                    <img src={assetUrl(item.src)} alt={item.title} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  );
}
