import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MembershipPageClient } from '@/components/MembershipPageClient';
import { buildPageMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = buildPageMetadata({
  title: 'Membership Categories, Benefits, Fees & Application',
  description:
    'Explore ISTD Individual, Institutional, and Student Membership categories, benefits, eligibility, fee structure, and apply through the ISTD Trichur Chapter.',
  path: '/membership',
  image: '/photos/istd-audience.jpeg',
  keywords: [
    'ISTD Membership Kerala',
    'Join ISTD Trichur Chapter',
    'ISTD Life Membership Fees',
    'ISTD Institutional Membership',
  ],
});

export default function MembershipPage() {
  return (
    <>
      {/* Page Hero Header */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Membership</span>
          </div>
          <h1 className="page-hero-title">Membership</h1>
          <p className="page-hero-subtitle">
            Information on ISTD membership categories, documented benefits, eligibility, fee
            structure, application steps, and chapter membership enquiries.
          </p>
        </div>
      </section>

      <MembershipPageClient />
    </>
  );
}
