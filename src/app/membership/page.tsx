import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MembershipPageClient } from '@/components/MembershipPageClient';

export const metadata: Metadata = {
  title: 'Membership',
  description:
    'Explore ISTD Membership Categories, Benefits, Eligibility, Membership Fees, How to Apply, and submit a Membership Enquiry for the ISTD Thrissur Chapter.',
};

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
