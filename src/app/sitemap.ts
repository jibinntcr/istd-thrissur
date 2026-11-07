import type { MetadataRoute } from 'next';
import {
  ALL_CHAPTER_EVENTS,
  CAMPUS_CHAPTERS,
  OFFICE_BEARERS,
} from '@/data/siteData';
import { SITE_URL } from '@/lib/seoConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-11-07T00:00:00+05:30');

  const corePages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/committee`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/events`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/campus-chapters`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/membership`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  const teamPages: MetadataRoute.Sitemap = OFFICE_BEARERS.map((member) => ({
    url: `${SITE_URL}/team/${member.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const eventPages: MetadataRoute.Sitemap = ALL_CHAPTER_EVENTS.map((ev) => ({
    url: `${SITE_URL}/events/${ev.slug}`,
    lastModified,
    changeFrequency: ev.status === 'upcoming' ? 'daily' : 'monthly',
    priority: ev.status === 'upcoming' ? 0.95 : 0.9,
  }));

  const campusPages: MetadataRoute.Sitemap = CAMPUS_CHAPTERS.map((ch) => ({
    url: `${SITE_URL}/campus-chapters/${ch.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...corePages, ...teamPages, ...eventPages, ...campusPages];
}
