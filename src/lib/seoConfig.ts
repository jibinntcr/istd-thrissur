import type { Metadata } from 'next';
import {
  ALL_CHAPTER_EVENTS,
  CAMPUS_CHAPTERS,
  OFFICE_BEARERS,
  OFFICIAL_LINKS,
  ChapterEvent,
  CampusChapter,
  CommitteeMember,
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
  exactTitle?: boolean;
  description: string;
  path: string;
  canonicalPath?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
  keywords?: string[];
  noIndex?: boolean;
}

export function buildPageMetadata({
  title,
  exactTitle = false,
  description,
  path,
  canonicalPath,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  imageWidth = 1200,
  imageHeight = 630,
  type = 'website',
  twitterCard = 'summary_large_image',
  keywords = [],
  noIndex = false,
}: PageSeoOptions): Metadata {
  const effectivePath = canonicalPath || path;
  const normalizedPath = effectivePath.startsWith('/')
    ? effectivePath
    : `/${effectivePath}`;
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

  const socialTitle = exactTitle ? title : `${title} | ISTD Thrissur Chapter`;
  const resolvedImageAlt = imageAlt || title;

  return {
    title: exactTitle ? { absolute: title } : title,
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
      title: socialTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'en_IN',
      type,
      images: [
        {
          url: fullImageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: resolvedImageAlt,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      title: socialTitle,
      description,
      images: [
        {
          url: fullImageUrl,
          alt: resolvedImageAlt,
        },
      ],
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
          '@id': 'https://www.istd.in/#organization',
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
            contactType: 'Secretary & Membership Desk',
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
          '@type': 'OrganizationRole',
          roleName: person.role,
          member: {
            '@type': 'Person',
            '@id': `${SITE_URL}/team/${person.slug}/#person`,
            name: person.name,
            url: `${SITE_URL}/team/${person.slug}/`,
            ...(person.sameAs && person.sameAs.length > 0
              ? { sameAs: person.sameAs }
              : {}),
          },
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

export function getCommitteeCollectionJsonLd() {
  const pageUrl = `${SITE_URL}/committee/`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#collectionpage`,
        url: pageUrl,
        name: 'Managing Committee | ISTD Thrissur Chapter',
        description:
          'Office bearers and managing committee of ISTD Thrissur Chapter: Founder & Mentor Prof. (Dr.) Zakkariya K. A., Chairman Tony Chacko, Secretary Jibin N, and Treasurer Sneha Rose George.',
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        about: {
          '@id': `${SITE_URL}/#organization`,
        },
        breadcrumb: {
          '@id': `${pageUrl}#breadcrumb`,
        },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: OFFICE_BEARERS.map((person, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${SITE_URL}/team/${person.slug}/`,
            name: `${person.name} — ${person.role}, ISTD Thrissur Chapter`,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
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
            name: 'Managing Committee',
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

export function getTeamMemberJsonLd(member: CommitteeMember) {
  const profileUrl = `${SITE_URL}/team/${member.slug}/`;
  const portraitUrl = member.avatar
    ? member.avatar.startsWith('http')
      ? member.avatar
      : `${SITE_URL}${member.avatar}`
    : undefined;
  const portraitAlt =
    member.avatarAlt ||
    `${member.name}, ${member.role} of ISTD Thrissur Chapter`;
  const personDescription =
    member.biography && member.biography.length > 0
      ? member.biography[0]
      : member.shortBio;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${profileUrl}#profilepage`,
        url: profileUrl,
        name:
          member.metaTitle ||
          `${member.name} | ${member.role} | ISTD Thrissur Chapter`,
        description: member.metaDescription || member.shortBio,
        inLanguage: 'en-IN',
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        about: {
          '@id': `${profileUrl}#person`,
        },
        mainEntity: {
          '@id': `${profileUrl}#person`,
        },
        breadcrumb: {
          '@id': `${profileUrl}#breadcrumb`,
        },
      },
      {
        '@type': 'Person',
        '@id': `${profileUrl}#person`,
        name: member.name,
        url: profileUrl,
        mainEntityOfPage: {
          '@id': `${profileUrl}#profilepage`,
        },
        description: personDescription,
        ...(portraitUrl
          ? {
              image: {
                '@type': 'ImageObject',
                '@id': `${profileUrl}#portrait`,
                url: portraitUrl,
                contentUrl: portraitUrl,
                ...(member.avatarWidth ? { width: member.avatarWidth } : {}),
                ...(member.avatarHeight ? { height: member.avatarHeight } : {}),
                caption: portraitAlt,
              },
            }
          : {}),
        memberOf: [
          {
            '@type': 'OrganizationRole',
            roleName: member.role,
            memberOf: {
              '@type': 'Organization',
              '@id': `${SITE_URL}/#organization`,
              name: 'ISTD Thrissur Chapter',
              url: `${SITE_URL}/`,
              parentOrganization: {
                '@type': 'Organization',
                '@id': 'https://www.istd.in/#organization',
                name: 'Indian Society for Training & Development (ISTD)',
                url: OFFICIAL_LINKS.istdNationalWeb,
              },
            },
          },
        ],
        ...(member.schemaAffiliations && member.schemaAffiliations.length > 0
          ? {
              affiliation: member.schemaAffiliations.map((aff) => ({
                '@type': 'Organization',
                name: aff.name,
                ...(aff.url ? { url: aff.url } : {}),
              })),
            }
          : {}),
        ...(member.sameAs && member.sameAs.length > 0
          ? {
              sameAs: member.sameAs,
            }
          : {}),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${profileUrl}#breadcrumb`,
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
            name: 'Managing Committee',
            item: `${SITE_URL}/committee/`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: member.name,
            item: profileUrl,
          },
        ],
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
  const teamRoutes = OFFICE_BEARERS.map(
    (member) => `/team/${member.slug}/`
  );
  return [...baseRoutes, ...eventRoutes, ...campusRoutes, ...teamRoutes];
}
