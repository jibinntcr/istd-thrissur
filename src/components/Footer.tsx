'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { assetUrl, OFFICIAL_LINKS } from '@/data/siteData';

export function Footer() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            {/* Col 1: Brand & Bio */}
            <div>
              <div className="footer-brand-wrap">
                <div className="brand-seal-ring footer-seal">
                  <img
                    src={assetUrl('/images/logo-circle.png')}
                    alt="ISTD Thrissur Official Seal"
                    width={46}
                    height={46}
                  />
                </div>
                <div>
                  <h3>ISTD Thrissur</h3>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--accent-yellow-bright)',
                      fontWeight: 700,
                      marginBottom: 0,
                    }}
                  >
                    Indian Society for Training &amp; Development
                  </p>
                </div>
              </div>
              <p className="footer-about-text">
                Affiliated with ISTD New Delhi (Est. 1970) and IFTDO Geneva. Leading transformation
                through Training, Learning &amp; Human Resource Development across Central Kerala.
              </p>
              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                <a
                  href={OFFICIAL_LINKS.istdTrichurLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-white"
                  style={{ fontSize: '0.76rem' }}
                >
                  ISTD Trichur LinkedIn &rarr;
                </a>
                <a
                  href={OFFICIAL_LINKS.istdNationalWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-white"
                  style={{ fontSize: '0.76rem' }}
                >
                  istd.in &rarr;
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="footer-heading">Chapter Navigation</h4>
              <ul className="footer-links">
                <li>
                  <Link href="/about">About ISTD &amp; Chapter</Link>
                </li>
                <li>
                  <Link href="/committee">Chapter Leadership</Link>
                </li>
                <li>
                  <Link href="/events">Events &amp; Chronicles</Link>
                </li>
                <li>
                  <Link href="/gallery">Photo Gallery (24 Photos)</Link>
                </li>
                <li>
                  <Link href="/membership">Membership Categories</Link>
                </li>
                <li>
                  <Link href="/contact">Contact Secretariat</Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Events & Chronicles */}
            <div>
              <h4 className="footer-heading">Events &amp; Chronicles</h4>
              <ul className="footer-links">
                <li>
                  <Link href="/events#pastEventReports">Past Event Reports</Link>
                </li>
                <li>
                  <Link href="/events#upcomingEvents">Upcoming Events Calendar</Link>
                </li>
                <li>
                  <Link href="/events#inaugurationReport">Diamond Chapter Inauguration Report</Link>
                </li>
                <li>
                  <Link href="/gallery">Official Photo Archives</Link>
                </li>
                <li>
                  <Link href="/membership#categoriesSection">Join the Chapter</Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact Details */}
            <div>
              <h4 className="footer-heading">Contact Secretariat</h4>
              <ul className="footer-contact-list">
                <li>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>ISTD Thrissur (Trichur) Chapter, Kerala, India</span>
                </li>
                <li>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <div>
                    <a href="mailto:info@istd.in">info@istd.in</a>
                    <br />
                    <a href="mailto:jibintcr@gmail.com">jibintcr@gmail.com</a>
                  </div>
                </li>
                <li>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <div>
                    <a href="tel:+919846101034">+91 9846101034 (Chairman)</a>
                    <br />
                    <a href="tel:+919496839168">+91 9496839168 (Treasurer)</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-inner">
              <p>© 2026 ISTD Thrissur (Trichur) Chapter. All rights reserved.</p>
              <div className="footer-bottom-links">
                <Link href="/about">About ISTD</Link>
                <Link href="/committee">Leadership</Link>
                <Link href="/events">Events &amp; Reports</Link>
                <Link href="/gallery">Gallery</Link>
                <Link href="/membership">Membership</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Quick-Action Floating Bar */}
      <nav className="mobile-bottom-bar" aria-label="Mobile Quick Navigation Bar">
        <Link
          href="/"
          className={`mobile-bottom-item ${isActive('/') ? 'active' : ''}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Home</span>
        </Link>
        <Link
          href="/events"
          className={`mobile-bottom-item ${isActive('/events') ? 'active' : ''}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>Events</span>
        </Link>
        <Link
          href="/membership"
          className={`mobile-bottom-item highlight ${
            isActive('/membership') ? 'active' : ''
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
          <span>Join</span>
        </Link>
        <Link
          href="/gallery"
          className={`mobile-bottom-item ${isActive('/gallery') ? 'active' : ''}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span>Gallery</span>
        </Link>
        <Link
          href="/contact"
          className={`mobile-bottom-item ${isActive('/contact') ? 'active' : ''}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>Contact</span>
        </Link>
      </nav>
    </>
  );
}
