import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OFFICE_BEARERS } from '@/data/siteData';
import { buildPageMetadata } from '@/lib/seoConfig';
import { TeamMemberProfileView } from '@/components/TeamMemberProfileView';

export function generateStaticParams() {
  return OFFICE_BEARERS.map((member) => ({
    slug: member.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = OFFICE_BEARERS.find((m) => m.slug === slug);

  if (!member) {
    return {
      title: 'Leadership Profile | ISTD Thrissur Chapter',
    };
  }

  const exactTitle =
    member.metaTitle ||
    `${member.name} | ${member.role} | ISTD Thrissur Chapter`;
  const description =
    member.metaDescription ||
    member.shortBio ||
    `Meet ${member.name}, ${member.role} of ISTD Thrissur Chapter.`;

  return buildPageMetadata({
    title: exactTitle,
    exactTitle: true,
    description,
    path: `/team/${member.slug}`,
    image: member.avatar || '/images/logo-circle.png',
    imageAlt:
      member.avatarAlt ||
      `${member.name}, ${member.role} of ISTD Thrissur Chapter`,
    imageWidth: member.avatarWidth || 400,
    imageHeight: member.avatarHeight || 400,
    type: 'profile',
    twitterCard: 'summary_large_image',
    keywords: [
      member.name,
      `${member.name} ISTD`,
      `${member.name} ISTD Thrissur`,
      `${member.name} ${member.role} ISTD Thrissur Chapter`,
      `${member.role} ISTD Thrissur Chapter`,
      ...(member.expertiseDomains || []),
    ],
  });
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = OFFICE_BEARERS.find((m) => m.slug === slug);

  if (!member) {
    notFound();
  }

  return <TeamMemberProfileView member={member} />;
}
