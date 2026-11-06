import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CHAPTER_CONTACTS } from '@/data/siteData';
import { buildPageMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = buildPageMetadata({
  title: 'Privacy Policy',
  description:
    'Privacy Policy of the ISTD Trichur Chapter website explaining how membership, event registrations, and contact enquiries are handled.',
  path: '/privacy',
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Privacy Policy</span>
          </div>
          <h1 className="page-hero-title">Privacy Policy</h1>
          <p className="page-hero-subtitle">
            How the ISTD Trichur Chapter handles information submitted through our website.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container container-narrow">
          <div className="CleanCard" style={{ padding: '2.25rem' }}>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
              <strong>Last Updated:</strong> April 2026
            </p>

            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.65rem' }}>
              1. Overview
            </h2>
            <p className="report-paragraph">
              This website is operated by the <strong>ISTD Trichur Chapter</strong> of the Indian
              Society for Training &amp; Development (ISTD) to provide information about chapter
              events, programmes, governance, photographs, and membership enquiries. We respect the
              privacy of our members, event participants, and website visitors.
            </p>

            <h2
              style={{
                fontSize: '1.3rem',
                fontWeight: 800,
                marginTop: '1.75rem',
                marginBottom: '0.65rem',
              }}
            >
              2. Information You Provide Voluntarily
            </h2>
            <p className="report-paragraph">
              When you fill out the <strong>Membership Enquiry</strong> form or the{' '}
              <strong>Contact Us</strong> enquiry form on this website, you may enter your name,
              email address, phone number, organisation/institution, selected membership category
              or event title, and message.
            </p>
            <p className="report-paragraph">
              If an automated backend webhook is configured, your enquiry details are transmitted
              to the ISTD Trichur Chapter office bearers. When the site is served as a static web
              application (such as on GitHub Pages) without a backend mail server configured, the
              website does not store your form input on any external database; instead, your input
              remains in your browser and can be sent directly via your email client to our chapter
              office bearers ({CHAPTER_CONTACTS.chairman.email},{' '}
              {CHAPTER_CONTACTS.treasurer.email}).
            </p>

            <h2
              style={{
                fontSize: '1.3rem',
                fontWeight: 800,
                marginTop: '1.75rem',
                marginBottom: '0.65rem',
              }}
            >
              3. How We Use Your Information
            </h2>
            <p className="report-paragraph">
              Contact details submitted to the ISTD Trichur Chapter are used solely to:
            </p>
            <ul
              style={{
                marginBottom: '1.25rem',
                paddingLeft: '1.25rem',
                color: 'var(--color-body)',
                lineHeight: 1.7,
              }}
            >
              <li>Respond to your membership, programme, or collaboration enquiry;</li>
              <li>
                Share relevant details regarding ISTD National membership registration or upcoming
                Trichur Chapter events you enquired about.
              </li>
            </ul>
            <p className="report-paragraph">
              We do not sell, rent, or trade your personal contact information to third parties.
            </p>

            <h2
              style={{
                fontSize: '1.3rem',
                fontWeight: 800,
                marginTop: '1.75rem',
                marginBottom: '0.65rem',
              }}
            >
              4. Event Photographs
            </h2>
            <p className="report-paragraph">
              Photographs published in the Gallery and event reports document official proceedings
              and activities of the ISTD Trichur Chapter. If you appear in a chapter photograph
              and wish to request a caption correction or removal, please contact our chapter
              office bearers.
            </p>

            <h2
              style={{
                fontSize: '1.3rem',
                fontWeight: 800,
                marginTop: '1.75rem',
                marginBottom: '0.65rem',
              }}
            >
              5. External Links
            </h2>
            <p className="report-paragraph">
              This website links to external websites including the ISTD National Portal (
              <code>istd.in</code>) and LinkedIn profiles. Those external services are governed by
              their own respective privacy policies.
            </p>

            <h2
              style={{
                fontSize: '1.3rem',
                fontWeight: 800,
                marginTop: '1.75rem',
                marginBottom: '0.65rem',
              }}
            >
              6. Contact for Privacy Questions
            </h2>
            <p className="report-paragraph" style={{ marginBottom: 0 }}>
              For any questions regarding this Privacy Policy or your personal data, please contact
              the ISTD Trichur Chapter at{' '}
              <a
                href={`mailto:${CHAPTER_CONTACTS.treasurer.email}`}
                style={{ color: 'var(--brand-blue)', fontWeight: 700 }}
              >
                {CHAPTER_CONTACTS.treasurer.email}
              </a>{' '}
              or{' '}
              <a
                href={`mailto:${CHAPTER_CONTACTS.chairman.email}`}
                style={{ color: 'var(--brand-blue)', fontWeight: 700 }}
              >
                {CHAPTER_CONTACTS.chairman.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
