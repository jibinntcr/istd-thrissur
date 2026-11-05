import type { Metadata } from 'next';
import {
  ALL_CHAPTER_EVENTS,
  CAMPUS_CHAPTERS,
  OFFICE_BEARERS,
  COMMITTEE_MEMBERS,
  OFFICIAL_LINKS,
  ChapterEvent,
  CampusChapter,
} from '@/data/siteData';

export const SITE_URL = 'https://jibinntcr.github.io/istd-thrissur';
export const SITE_NAME =
  'ISTD Thrissur Chapter | Indian Society for Training & Development';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/photos/istd-22.jpeg`;

export const GLOBAL_SEO_KEYWORDS = [
  'ISTD Thrissur',
  'ISTD Thrissur Chapter',
  'ISTD Trichur',
  'ISTD Trichur Chapter',
  'Indian Society for Training and Development Thrissur',
  'Indian Society for Training & Development Kerala',
  'ISTD Diamond Chapter Thrissur',
  'ISTD Kerala',
  'HR and L&D Community Thrissur',
  'Learning and Development Kerala',
  'Human Resource Development Thrissur',
  'Corporate Training Thrissur',
  'ISTD Student Chapter Christ College of Engineering',
  'Christ College of Engineering Irinjalakuda ISTD',
  'Prof. Dr. Zakkariya K.A ISTD',
  'Tony Chacko ISTD Thrissur',
  'Sneha Rose George ISTD Thrissur',
  'Jibin N ISTD Thrissur',
  'ISTD Membership Kerala',
  'Training and Development Workshops Thrissur',
];

interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  noIndex?: boolean;
}

export function buildPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  keywords = [],
  noIndex = false,
}: PageSeoOptions): Metadata {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl =
    normalizedPath === '/'
      ? `${SITE_URL}/`
      : `${SITE_URL}${normalizedPath.endsWith('/') ? normalizedPath : `${normalizedPath}/`}`;
  const fullImageUrl = image.startsWith('http')
    ? image
    : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;

  const mergedKeywords = Array.from(
    new Set([...keywords, ...GLOBAL_SEO_KEYWORDS])
  );

  return {
    title,
    description,
    keywords: mergedKeywords,
    authors: [
      {
        name: 'ISTD Thrissur Chapter (Indian Society for Training & Development)',
        url: SITE_URL,
      },
    ],
    creator: 'ISTD Thrissur Chapter',
    publisher: 'Indian Society for Training & Development (ISTD) — Thrissur Chapter',
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      title: `${title} | ISTD Thrissur Chapter`,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'en_IN',
      type,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ISTD Thrissur Chapter`,
      description,
      images: [fullImageUrl],
    },
  };
}

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'ISTD Thrissur Chapter',
        alternateName: [
          'ISTD Trichur Chapter',
          'Indian Society for Training & Development — Thrissur Diamond Chapter',
        ],
        url: `${SITE_URL}/`,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/images/logo-circle.png`,
        },
        image: `${SITE_URL}/photos/istd-22.jpeg`,
        description:
          'Official Diamond Chapter of the Indian Society for Training & Development (ISTD, established April 1970 in New Delhi), inaugurated on 30 March 2026 in Thrissur, Kerala to advance training, learning, and human resource development.',
        foundingDate: '2026-03-30',
        parentOrganization: {
          '@type': 'Organization',
          name: 'Indian Society for Training & Development (ISTD)',
          url: OFFICIAL_LINKS.istdNationalWeb,
          foundingDate: '1970-04',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'New Delhi',
            addressCountry: 'IN',
          },
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Thrissur',
          addressRegion: 'Kerala',
          addressCountry: 'IN',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+91-9846101034',
            contactType: 'Chairman & Chapter Office',
            email: 'tonychacko67@gmail.com',
            areaServed: 'IN-KL',
            availableLanguage: ['English', 'Malayalam'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+91-9496839168',
            contactType: 'Treasurer & Membership Desk',
            email: 'jibintcr@gmail.com',
            areaServed: 'IN-KL',
            availableLanguage: ['English', 'Malayalam'],
          },
        ],
        sameAs: [
          OFFICIAL_LINKS.istdTrichurLinkedin,
          OFFICIAL_LINKS.istdNationalLinkedin,
          OFFICIAL_LINKS.istdNationalWeb,
        ],
        member: OFFICE_BEARERS.map((person) => ({
          '@type': 'Person',
          name: person.name,
          jobTitle: `${person.role}, ISTD Thrissur Chapter`,
          url: `${SITE_URL}/committee/${person.slug}/`,
          ...(person.linkedin ? { sameAs: person.linkedin } : {}),
        })),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
        inLanguage: 'en-IN',
      },
    ],
  };
}

export function getEventJsonLd(event: ChapterEvent) {
  const eventUrl = `${SITE_URL}/events/${event.slug}/`;
  const imageUrl = event.image.startsWith('http')
    ? event.image
    : `${SITE_URL}${event.image}`;

  const isOnline =
    event.venue.toLowerCase().includes('online') ||
    event.venue.toLowerCase().includes('google meet');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Events & Programmes',
            item: `${SITE_URL}/events/`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: event.title,
            item: eventUrl,
          },
        ],
      },
      {
        '@type': 'EducationEvent',
        name: event.title,
        description: event.shortDescription,
        url: eventUrl,
        image: [imageUrl],
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: isOnline
          ? 'https://schema.org/OnlineEventAttendanceMode'
          : 'https://schema.org/OfflineEventAttendanceMode',
        location: isOnline
          ? {
              '@type': 'VirtualLocation',
              url: eventUrl,
              name: event.venue,
            }
          : {
              '@type': 'Place',
              name: event.venue,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Thrissur',
                addressRegion: 'Kerala',
                addressCountry: 'IN',
              },
            },
        organizer: {
          '@type': 'Organization',
          name: 'ISTD Thrissur Chapter',
          url: `${SITE_URL}/`,
        },
        ...(event.speaker
          ? {
              performer: {
                '@type': 'Person',
                name: event.speaker,
                ...(event.speakerDesignation
                  ? { jobTitle: event.speakerDesignation }
                  : {}),
              },
            }
          : {}),
      },
    ],
  };
}

export function getCampusChapterJsonLd(chapter: CampusChapter) {
  const pageUrl = `${SITE_URL}/campus-chapters/${chapter.slug}/`;
  const imageUrl = `${SITE_URL}${chapter.posterImage}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Campus & Student Chapters',
            item: `${SITE_URL}/campus-chapters/`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: chapter.institutionName,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'EducationalOrganization',
        name: `ISTD Student Chapter — ${chapter.institutionName}`,
        description: chapter.summary,
        url: pageUrl,
        image: imageUrl,
        parentOrganization: {
          '@type': 'Organization',
          name: 'ISTD Thrissur Chapter',
          url: `${SITE_URL}/`,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Irinjalakuda, Thrissur',
          addressRegion: 'Kerala',
          addressCountry: 'IN',
        },
      },
    ],
  };
}

export function getAllStaticRoutes(): string[] {
  const baseRoutes = [
    '/',
    '/about/',
    '/committee/',
    '/events/',
    '/campus-chapters/',
    '/gallery/',
    '/membership/',
    '/contact/',
    '/privacy/',
  ];
  const eventRoutes = ALL_CHAPTER_EVENTS.map((ev) => `/events/${ev.slug}/`);
  const campusRoutes = CAMPUS_CHAPTERS.map(
    (ch) => `/campus-chapters/${ch.slug}/`
  );
  const committeeRoutes = OFFICE_BEARERS.map(
    (member) => `/committee/${member.slug}/`
  );
  return [...baseRoutes, ...eventRoutes, ...campusRoutes, ...committeeRoutes];
}
