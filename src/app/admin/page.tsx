import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AdminPortalClient } from '@/components/AdminPortalClient';

export const metadata: Metadata = {
  title: 'Admin Backend Portal',
  description:
    'ISTD Thrissur Chapter administration portal for managing upcoming events, completed event reports, event photographs, participant registrations, and MongoDB cache.',
};

export default function AdminPortalPage() {
  return (
    <>
      <section className="page-hero" style={{ padding: '2rem 0' }}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Admin Backend Portal</span>
          </div>
          <h1 className="page-hero-title" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            Backend Administration Portal
          </h1>
          <p className="page-hero-subtitle" style={{ marginBottom: 0 }}>
            Manage upcoming events, completed event reports, photographs, participant registrations,
            and MongoDB cache for the ISTD Thrissur Chapter.
          </p>
        </div>
      </section>

      <AdminPortalClient />
    </>
  );
}
