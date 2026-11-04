'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { assetUrl, OFFICIAL_LINKS } from '@/data/siteData';

export const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/committee', label: 'Managing Committee' },
  { href: '/events', label: 'Events & Programmes' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/membership', label: 'Membership' },
  { href: '/contact', label: 'Contact Us' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [drawerOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Top Notification & Contact Bar */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <span className="top-bar-badge">Affiliated with ISTD New Delhi (Est. April 1970)</span>
            <div className="top-bar-item">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Thrissur Chapter:</span>
              <a href="tel:+919846101034">+91 9846101034</a>
              <span>/</span>
              <a href="tel:+919496839168">+91 9496839168</a>
            </div>
            <div className="top-bar-item">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>ISTD National Office:</span>
              <a href="mailto:info@istd.in">info@istd.in</a>
            </div>
          </div>
          <div className="top-bar-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a
              href={OFFICIAL_LINKS.istdTrichurLinkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="top-bar-item top-bar-portal-link"
            >
              <span>Chapter LinkedIn</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
            <a
              href={OFFICIAL_LINKS.istdNationalWeb}
              target="_blank"
              rel="noopener noreferrer"
              className="top-bar-item top-bar-portal-link"
            >
              <span>ISTD National (istd.in)</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Main Header Navigation */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="mainHeader">
        <div className="container">
          <nav className="navbar" aria-label="Main Navigation">
            {/* Official Circular Brand Logo Lockup */}
            <Link href="/" className="brand-logo" id="brandLogo">
              <div className="brand-seal-ring">
                <img
                  src={assetUrl('/images/logo-circle.png')}
                  alt="ISTD Thrissur Chapter Official Emblem"
                  width={48}
                  height={48}
                />
              </div>
              <div className="brand-text">
                <div className="brand-title-row">
                  <span className="brand-name">ISTD</span>
                  <span className="brand-diamond-tag">Diamond Chapter</span>
                </div>
                <span className="brand-chapter">Thrissur Chapter</span>
                <span className="brand-sub">Indian Society for Training &amp; Development</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="nav-menu" id="desktopNav">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Action Button & Mobile Hamburger Toggle */}
            <div className="header-actions">
              <Link href="/membership" className="btn btn-red btn-sm header-join-btn" id="headerJoinBtn">
                Become a Member
              </Link>
              <button
                type="button"
                className={`hamburger-btn ${drawerOpen ? 'is-active' : ''}`}
                id="hamburgerBtn"
                aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={drawerOpen}
                aria-controls="mobileDrawer"
                onClick={() => setDrawerOpen((prev) => !prev)}
              >
                <span className="hamburger-icon" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="hamburger-label">Menu</span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Offcanvas Navigation Drawer */}
      <div
        className={`mobile-nav-backdrop ${drawerOpen ? 'is-open' : ''}`}
        id="mobileBackdrop"
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`mobile-nav-drawer ${drawerOpen ? 'is-open' : ''}`}
        id="mobileDrawer"
        aria-label="Mobile Navigation Menu"
        aria-hidden={!drawerOpen}
        style={{ visibility: drawerOpen ? 'visible' : 'hidden' }}
      >
        <div className="mobile-drawer-top">
          <div className="mobile-drawer-header">
            <Link
              href="/"
              className="brand-logo"
              tabIndex={drawerOpen ? 0 : -1}
              onClick={() => setDrawerOpen(false)}
            >
              <div className="brand-seal-ring sm">
                <img
                  src={assetUrl('/images/logo-circle.png')}
                  alt="ISTD Thrissur Chapter Emblem"
                  width={40}
                  height={40}
                />
              </div>
              <div className="brand-text">
                <div className="brand-title-row">
                  <span className="brand-name">ISTD</span>
                  <span className="brand-diamond-tag">Diamond</span>
                </div>
                <span className="brand-chapter">Thrissur Chapter</span>
              </div>
            </Link>
            <button
              type="button"
              className="mobile-drawer-close"
              id="mobileDrawerClose"
              aria-label="Close menu"
              tabIndex={drawerOpen ? 0 : -1}
              onClick={() => setDrawerOpen(false)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav className="mobile-nav-list" aria-label="Mobile Pages">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`mobile-nav-link ${isActive(item.href) ? 'active' : ''}`}
                tabIndex={drawerOpen ? 0 : -1}
                onClick={() => setDrawerOpen(false)}
              >
                <span>{item.label}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mobile-drawer-footer">
          <Link
            href="/membership"
            className="btn btn-red"
            style={{ width: '100%', marginBottom: '0.75rem' }}
            tabIndex={drawerOpen ? 0 : -1}
            onClick={() => setDrawerOpen(false)}
          >
            Become a Member
          </Link>
          <div className="mobile-drawer-contact">
            <a href="tel:+919846101034" tabIndex={drawerOpen ? 0 : -1}>
              +91 9846101034
            </a>
            <span>•</span>
            <a href="mailto:jibintcr@gmail.com" tabIndex={drawerOpen ? 0 : -1}>
              jibintcr@gmail.com
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
