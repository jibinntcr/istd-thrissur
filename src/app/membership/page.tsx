import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MembershipPageClient } from '@/components/MembershipPageClient';
import { buildPageMetadata, getMembershipPageJsonLd } from '@/lib/seoConfig';

export const metadata: Metadata = buildPageMetadata({
  title: 'Membership Categories, Official Fee Schedule & Online Registration',
  description:
    'Official ISTD Membership categories (Individual Life, Individual Annual, Associate/Student, Institutional), fee schedule, eligibility, benefits, and direct link to the ISTD online registration portal (istd.co.in/register/member).',
  path: '/membership',
  image: '/photos/istd-audience.jpeg',
  keywords: [
    'ISTD Membership Kerala',
    'Join ISTD Trichur Chapter',
    'ISTD Life Membership Fees',
    'ISTD Institutional Membership',
    'ISTD Associate Student Membership',
    'istd.co.in register member',
  ],
});

export default function MembershipPage() {
  const membershipJsonLd = getMembershipPageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(membershipJsonLd) }}
      />
      {/* Page Hero Header */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Membership</span>
          </div>
          <h1 className="page-hero-title">ISTD Membership</h1>
          <p className="page-hero-subtitle">
            Official ISTD membership categories, eligibility criteria, New &amp; Renewal fee
            tariffs, member privileges, and direct online registration via the ISTD National Portal.
          </p>
        </div>
      </section>

      <MembershipPageClient />
    </>
  );
}
