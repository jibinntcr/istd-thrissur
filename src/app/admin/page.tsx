import React from 'react';
import type { Metadata } from 'next';
import { AdminPortalClient } from '@/components/AdminPortalClient';
import { buildPageMetadata } from '@/lib/seoConfig';

export const metadata: Metadata = buildPageMetadata({
  title: 'Admin Console',
  description:
    'ISTD Trichur Chapter administration console for managing events, photographs, participant registrations, and cache.',
  path: '/admin',
  noIndex: true,
});

export default function AdminPortalPage() {
  return <AdminPortalClient />;
}
