import React from 'react';
import type { Metadata } from 'next';
import { AdminPortalClient } from '@/components/AdminPortalClient';

export const metadata: Metadata = {
  title: 'Admin Console | ISTD Thrissur Chapter',
  description:
    'ISTD Thrissur Chapter administration console for managing upcoming events, completed event reports, event photographs, participant registrations, and MongoDB cache.',
};

export default function AdminPortalPage() {
  return <AdminPortalClient />;
}
