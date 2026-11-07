import type { Metadata } from 'next';
import {
  ALL_CHAPTER_EVENTS,
  CAMPUS_CHAPTERS,
  GALLERY_PHOTOS,
  OFFICE_BEARERS,
  OFFICIAL_LINKS,
  ChapterEvent,
  CampusChapter,
  CommitteeMember,
} from '@/data/siteData';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://istdtrichur.in';
export const SITE_NAME =
  'ISTD Trichur Chapter | Indian Society for Training & Development (Thrissur Diamond Chapter)';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/photos/istd-22.jpeg`;

export const GLOBAL_SEO_KEYWORDS = [
  // Primary Brand & Local Search Queries
  'ISTD Trichur',
  'ISTD Trichur Chapter',
  'ISTD Thrissur',
  'ISTD Thrissur Chapter',
  'istdtrichur.in',
  'ISTD Kerala',
  'ISTD Chapters in Kerala',
  'Indian Society for Training and Development Trichur',
  'Indian Society for Training and Development Thrissur',
  'Indian Society for Training & Development Kerala',
  'ISTD Diamond Chapter Trichur',
  'ISTD Diamond Chapter Thrissur',
  'ISTD Diamond Chapter of India',
  '55th Chapter of ISTD',
  'ISTD Official Website Trichur',
  'ISTD Official Website Thrissur',
  // Professional & Industry Vertical Keywords
  'HR and L&D Community Trichur',
  'HR Association Thrissur Kerala',
  'Learning and Development Kerala',
  'Human Resource Development Trichur',
  'Corporate Training Trichur',
  'Corporate Trainers Network Kerala',
  'Leadership Development Programmes Thrissur',
  'Management Development Programmes Kerala',
  'ISTD Diploma in Training and Development Kerala',
  'ISTD Membership Kerala',
  'ISTD Life Membership Fee',
  'ISTD Institutional Membership',
  'Training and Development Workshops Trichur',
  // Student & Campus Chapters
  'ISTD Student Chapter Christ College of Engineering',
  'Christ College of Engineering Irinjalakuda ISTD',
  'ISTD Campus Chapters Kerala',
  'Academia Industry Interface Kerala',
  // Key Office Bearers & National Dignitaries
  'Prof. (Dr.) Zakkariya K. A.',
  'Prof. Dr. Zakkariya K.A ISTD',
  'Zakkariya K A National Vice President ISTD',
  'Tony Chacko',
  'Tony Chacko ISTD Trichur',
  'Tony Chacko Chairman ISTD Trichur Chapter',
  'Sneha Rose George',
  'Sneha Rose George ISTD Trichur',
  'Sneha Rose George Secretary ISTD Trichur Chapter',
  'Jibin N',
  'Jibin N ISTD Trichur',
  'Jibin N Treasurer ISTD Trichur Chapter',
  'Jibin N Managing Director NEOM Panels',
  'Jibin N Infinio Technology Solutions',
  'Jibin N Flexon Sports Foundation',
  'Atul Shah National President ISTD',
  // Featured Programmes & Webinars
  'Advancing AIoT Research Webinar ISTD',
  'Boopathy Monzha Research Labs ISTD Trichur',
  'From AI Assistants to AI Agents Shaheen Siddique ISTD',
  'Healthy Habits of High Performers Dr Ashik Kareem ISTD',
  'Chapter Connect 2026 ISTD Trichur Hotel Elite International',
  'Future of L&D AI Ecosystems Dr Sreekanth D ISTD',
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
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
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
  publishedTime,
  modifiedTime,
  section = 'Training & Human Resource Development',
}: PageSeoOptions): Metadata {
  const effectivePath = canonicalPath || path;
  const normalizedPath = effectivePath.startsWith('/')
    ? effectivePath
    : `/${effectivePath}`;
  const cleanPath =
    normalizedPath === '/' ? '' : normalizedPath.replace(/\/+$/, '');
  const canonicalUrl = `${SITE_URL}${cleanPath}`;
  const fullImageUrl = image.startsWith('http')
    ? image
    : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;

  const isPng = fullImageUrl.toLowerCase().endsWith('.png');
  const mergedKeywords = Array.from(
    new Set([...keywords, ...GLOBAL_SEO_KEYWORDS])
  );

  const socialTitle = exactTitle ? title : `${title} | ISTD Trichur Chapter`;
  const resolvedImageAlt =
    imageAlt || `${title} — ISTD Trichur Chapter (Thrissur Diamond Chapter)`;

  return {
    title: exactTitle ? { absolute: title } : title,
    description,
    keywords: mergedKeywords,
    authors: [
      {
        name: 'ISTD Trichur Chapter (Indian Society for Training & Development)',
        url: SITE_URL,
      },
    ],
    creator: 'ISTD Trichur Chapter',
    publisher:
      'Indian Society for Training & Development (ISTD) — Trichur Diamond Chapter',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-IN': canonicalUrl,
        en: canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          nocache: false,
          googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
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
      ...(type === 'article'
        ? {
            publishedTime: publishedTime || '2026-03-30T10:00:00+05:30',
            modifiedTime: modifiedTime || '2026-11-07T00:00:00+05:30',
            section,
            authors: [SITE_URL],
            tags: mergedKeywords.slice(0, 15),
          }
        : {}),
      images: [
        {
          url: fullImageUrl,
          secureUrl: fullImageUrl,
          type: isPng ? 'image/png' : 'image/jpeg',
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
      creator: '@ISTDTrichur',
      site: '@ISTDTrichur',
      images: [
        {
          url: fullImageUrl,
          alt: resolvedImageAlt,
        },
      ],
    },
    other: {
      'geo.region': 'IN-KL',
      'geo.placename': 'Trichur (Thrissur), Kerala, India',
      'geo.position': '10.5276;76.2144',
      ICBM: '10.5276, 76.2144',
      'revisit-after': '2 days',
      rating: 'General',
      distribution: 'Global',
      coverage: 'Worldwide',
      target: 'all',
      HandheldFriendly: 'True',
      MobileOptimized: '320',
      'dc.title': socialTitle,
      'dc.description': description,
      'dc.publisher':
        'Indian Society for Training & Development (ISTD) — Trichur Chapter',
      'dc.language': 'en-IN',
      'apple-mobile-web-app-title': 'ISTD Trichur',
    },
  };
}

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': [
          'Organization',
          'EducationalOrganization',
          'ProfessionalService',
          'LocalBusiness',
        ],
        '@id': `${SITE_URL}/#organization`,
        name: 'ISTD Trichur Chapter',
        legalName:
          'Indian Society for Training & Development — Trichur Chapter',
        alternateName: [
          'ISTD Thrissur Chapter',
          'ISTD Trichur',
          'ISTD Thrissur',
          'ISTD Trichur Diamond Chapter',
          'ISTD Thrissur Diamond Chapter',
          'Indian Society for Training & Development Trichur',
          'Indian Society for Training & Development Thrissur',
        ],
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#logo`,
          url: `${SITE_URL}/images/logo-circle.png`,
          contentUrl: `${SITE_URL}/images/logo-circle.png`,
          width: 512,
          height: 512,
          caption:
            'Official Emblem of the Indian Society for Training & Development (ISTD) — Trichur Diamond Chapter',
        },
        image: [
          `${SITE_URL}/photos/istd-22.jpeg`,
          `${SITE_URL}/photos/istd-tcr-inauguration.jpeg`,
          `${SITE_URL}/photos/chapter-connect-2026-2.jpg`,
        ],
        description:
          'Official Diamond Chapter of the Indian Society for Training & Development (ISTD, established April 1970 in New Delhi), inaugurated on 30 March 2026 in Trichur (Thrissur), Kerala to advance corporate training, workplace learning, academic–industry student chapters, and human resource development.',
        slogan: 'Training for Transformation',
        foundingDate: '2026-03-30',
        foundingLocation: {
          '@type': 'Place',
          name: 'Trichur (Thrissur), Kerala, India',
        },
        priceRange: '₹₹',
        telephone: '+91-9846101034',
        email: 'tonychacko67@gmail.com',
        knowsAbout: [
          'Human Resource Development (HRD)',
          'Learning and Development (L&D)',
          'Corporate Training & Executive Coaching',
          'Leadership Development',
          'Artificial Intelligence & AIoT in Learning Ecosystems',
          'Academic–Industry Student Chapters',
          'ISTD Diploma in Training & Development',
        ],
        parentOrganization: {
          '@type': 'Organization',
          '@id': 'https://www.istd.in/#organization',
          name: 'Indian Society for Training & Development (ISTD)',
          url: OFFICIAL_LINKS.istdNationalWeb,
          foundingDate: '1970-04',
          address: {
            '@type': 'PostalAddress',
            streetAddress:
              'Training House, B-23, Qutab Institutional Area, Mehrauli Road',
            addressLocality: 'New Delhi',
            postalCode: '110016',
            addressCountry: 'IN',
          },
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Trichur (Thrissur)',
          addressRegion: 'Kerala',
          postalCode: '680001',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 10.5276,
          longitude: 76.2144,
        },
        areaServed: [
          {
            '@type': 'City',
            name: 'Trichur',
            alternateName: 'Thrissur',
          },
          {
            '@type': 'City',
            name: 'Irinjalakuda',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Kerala',
          },
          {
            '@type': 'Country',
            name: 'India',
          },
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+91-9846101034',
            contactType: 'Chairman & Chapter Secretariat',
            email: 'tonychacko67@gmail.com',
            areaServed: 'IN-KL',
            availableLanguage: ['English', 'Malayalam', 'Hindi'],
          },
          {
            '@type': 'ContactPoint',
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
          'https://jibinntcr.github.io/istd-thrissur/',
        ],
        member: OFFICE_BEARERS.map((person) => ({
          '@type': 'OrganizationRole',
          roleName: person.role,
          member: {
            '@type': 'Person',
            '@id': `${SITE_URL}/team/${person.slug}#person`,
            name: person.name,
            jobTitle: `${person.role}, ISTD Trichur Chapter`,
            url: `${SITE_URL}/team/${person.slug}`,
            ...(person.sameAs && person.sameAs.length > 0
              ? { sameAs: person.sameAs }
              : {}),
          },
        })),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: [
          'ISTD Trichur',
          'ISTD Thrissur',
          'ISTD Trichur Chapter',
          'ISTD Thrissur Chapter',
          'ISTD Diamond Chapter Kerala',
        ],
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
        inLanguage: 'en-IN',
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${SITE_URL}/events?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        ],
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': `${SITE_URL}/#sitenavigation`,
        name: [
          'Home',
          'About Us',
          'Managing Committee',
          'Events & Programmes',
          'Campus Chapters',
          'Photo Gallery',
          'ISTD Membership',
          'Contact Us',
        ],
        url: [
          SITE_URL,
          `${SITE_URL}/about`,
          `${SITE_URL}/committee`,
          `${SITE_URL}/events`,
          `${SITE_URL}/campus-chapters`,
          `${SITE_URL}/gallery`,
          `${SITE_URL}/membership`,
          `${SITE_URL}/contact`,
        ],
      },
    ],
  };
}

const EVENT_ISO_DATES: Record<string, { start: string; end: string }> = {
  'advancing-aiot-research': {
    start: '2026-11-10T19:00:00+05:30',
    end: '2026-11-10T20:00:00+05:30',
  },
  'christ-college-student-chapter-inauguration': {
    start: '2026-09-15T10:00:00+05:30',
    end: '2026-09-15T13:00:00+05:30',
  },
  'ai-agents-in-business': {
    start: '2026-08-08T19:30:00+05:30',
    end: '2026-08-08T20:30:00+05:30',
  },
  'healthy-habits-of-high-performers': {
    start: '2026-07-25T19:30:00+05:30',
    end: '2026-07-25T20:30:00+05:30',
  },
  'chapter-connect-2026': {
    start: '2026-06-27T10:30:00+05:30',
    end: '2026-06-27T13:00:00+05:30',
  },
  'future-of-ld-ai-ecosystems': {
    start: '2026-04-11T19:00:00+05:30',
    end: '2026-04-11T20:30:00+05:30',
  },
  inauguration: {
    start: '2026-03-30T10:00:00+05:30',
    end: '2026-03-30T13:30:00+05:30',
  },
};

export function getHomePageJsonLd() {
  const upcomingEvents = ALL_CHAPTER_EVENTS.filter(
    (ev) => ev.status === 'upcoming'
  );
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: 'ISTD Trichur Chapter (Thrissur Diamond Chapter) | Indian Society for Training & Development',
        description:
          'Official website of the ISTD Trichur Chapter (Thrissur Diamond Chapter) — Indian Society for Training & Development. Empowering HR & L&D leaders, trainers, educators, and student chapters across Trichur and Central Kerala.',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: DEFAULT_OG_IMAGE,
        },
        inLanguage: 'en-IN',
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.hero-3d-headline', '.hero-3d-lead'],
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the ISTD Trichur Chapter (Thrissur Diamond Chapter)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The ISTD Trichur Chapter is the official Thrissur chapter of the Indian Society for Training & Development (ISTD, New Delhi, established in April 1970). Inaugurated on 30 March 2026 in Trichur, Kerala during ISTD’s 55th milestone year, it is designated as the prestigious Diamond Chapter of ISTD.',
            },
          },
          {
            '@type': 'Question',
            name: 'Who are the office bearers of the ISTD Trichur Chapter?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The ISTD Trichur Chapter is guided by Founder & Mentor Prof. (Dr.) Zakkariya K. A. (National Vice President, ISTD), Chairman Tony Chacko, Secretary Sneha Rose George, and Treasurer Jibin N.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which institution hosts the first ISTD Student Chapter under ISTD Trichur?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Christ College of Engineering (Autonomous), Irinjalakuda, Trichur hosts the first ISTD Student Chapter inaugurated under the ISTD Trichur Chapter.',
            },
          },
          {
            '@type': 'Question',
            name: 'How can professionals, trainers, and students join ISTD Trichur Chapter?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'HR professionals, corporate trainers, educators, institutions, and students can apply online through the official ISTD National Portal or via the Membership page at https://istdtrichur.in/membership by selecting the Trichur (Thrissur) Chapter.',
            },
          },
        ],
      },
      ...upcomingEvents.map((ev) => {
        const iso = EVENT_ISO_DATES[ev.slug] || {
          start: '2026-11-10T19:00:00+05:30',
          end: '2026-11-10T20:00:00+05:30',
        };
        return {
          '@type': 'EducationEvent',
          name: ev.title,
          description: ev.shortDescription,
          startDate: iso.start,
          endDate: iso.end,
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
          url: `${SITE_URL}/events/${ev.slug}`,
          image: [
            ev.image.startsWith('http') ? ev.image : `${SITE_URL}${ev.image}`,
          ],
          organizer: { '@id': `${SITE_URL}/#organization` },
          offers: {
            '@type': 'Offer',
            url: `${SITE_URL}/events/${ev.slug}`,
            price: '0',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
          },
        };
      }),
    ],
  };
}

export function getAboutPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${SITE_URL}/about#aboutpage`,
        url: `${SITE_URL}/about`,
        name: 'About ISTD Trichur Chapter (Diamond Chapter) & National ISTD Vision',
        description:
          'Learn about the Indian Society for Training & Development (ISTD, est. April 1970, New Delhi) and the ISTD Trichur Diamond Chapter inaugurated in Trichur (Thrissur), Kerala.',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About ISTD Trichur',
            item: `${SITE_URL}/about`,
          },
        ],
      },
    ],
  };
}

export function getEventsCollectionJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/events#collection`,
        url: `${SITE_URL}/events`,
        name: 'Events, Webinars & 2026 Programme Archive | ISTD Trichur Chapter',
        description:
          'Explore upcoming webinars, 2026 completed programmes, campus chapter launches, and year-wise archives of the ISTD Trichur Chapter.',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: ALL_CHAPTER_EVENTS.map((ev, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: ev.title,
            url: `${SITE_URL}/events/${ev.slug}`,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Events & Programmes',
            item: `${SITE_URL}/events`,
          },
        ],
      },
    ],
  };
}

export function getCampusChaptersCollectionJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/campus-chapters#collection`,
        url: `${SITE_URL}/campus-chapters`,
        name: 'Campus & Student Chapters | ISTD Trichur Chapter',
        description:
          'Official directory of ISTD Student & Campus Chapters under the ISTD Trichur Chapter, including Christ College of Engineering (Autonomous), Irinjalakuda.',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: CAMPUS_CHAPTERS.map((ch, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: `${ch.institutionName} (${ch.shortName})`,
            url: `${SITE_URL}/campus-chapters/${ch.slug}`,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Campus Chapters',
            item: `${SITE_URL}/campus-chapters`,
          },
        ],
      },
    ],
  };
}

export function getMembershipPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/membership#webpage`,
        url: `${SITE_URL}/membership`,
        name: 'ISTD Membership Categories, Official Fee Structure & Online Portal | ISTD Trichur Chapter',
        description:
          'Join the Indian Society for Training & Development (ISTD) through the Trichur Diamond Chapter. Official Individual, Institutional, Life, Student, and Senior Citizen fee structures.',
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/membership#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the official fee for ISTD Individual Membership?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Under the official ISTD National fee schedule, Annual Individual Membership is Rs. 1,500 per annum plus Rs. 500 one-time entrance fee and 18% GST (Total Rs. 2,360). Individual Life Membership is a one-time fee of Rs. 12,500 plus Rs. 500 entrance fee and 18% GST (Total Rs. 15,340), with a 50% concession for Senior Citizens (60+ years).',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the official fee for ISTD Institutional Membership?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Annual Institutional Membership is Rs. 10,000 per annum plus Rs. 2,000 entrance fee and 18% GST (Total Rs. 14,160). Permanent Institutional Membership (20 years) is Rs. 1,00,000 plus Rs. 2,000 entrance fee and 18% GST (Total Rs. 1,20,360).',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I apply for ISTD Membership under the Trichur Chapter?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can apply directly on the Official ISTD National Membership Portal (https://www.istd.in/membership-information) and select Trichur / Thrissur Chapter (Kerala), or submit an enquiry on the ISTD Trichur Chapter Membership page for guided assistance.',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Membership',
            item: `${SITE_URL}/membership`,
          },
        ],
      },
    ],
  };
}

export function getGalleryPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ImageGallery',
        '@id': `${SITE_URL}/gallery#gallery`,
        url: `${SITE_URL}/gallery`,
        name: 'Photo Gallery & Chapter Archive | ISTD Trichur Chapter',
        description:
          'Curated photographs from the ISTD Trichur Diamond Chapter inauguration, lamp lighting ceremony, keynote address, Chapter Connect 2026, and student chapter launches.',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        image: GALLERY_PHOTOS.slice(0, 12).map((photo) => ({
          '@type': 'ImageObject',
          contentUrl: `${SITE_URL}${photo.src}`,
          url: `${SITE_URL}${photo.src}`,
          name: photo.title,
          caption: photo.caption,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Photo Gallery',
            item: `${SITE_URL}/gallery`,
          },
        ],
      },
    ],
  };
}

export function getContactPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${SITE_URL}/contact#contactpage`,
        url: `${SITE_URL}/contact`,
        name: 'Contact ISTD Trichur Chapter Office Bearers & Secretariat',
        description:
          'Connect with the ISTD Trichur Chapter (Diamond Chapter) leadership team in Trichur, Kerala for membership, corporate training, and student chapter partnerships.',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Contact Us',
            item: `${SITE_URL}/contact`,
          },
        ],
      },
    ],
  };
}

export function getCommitteeCollectionJsonLd() {
  const pageUrl = `${SITE_URL}/committee`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#collectionpage`,
        url: pageUrl,
        name: 'Managing Committee & Office Bearers | ISTD Trichur Chapter',
        description:
          'Office bearers and managing committee of ISTD Trichur Chapter: Founder & Mentor Prof. (Dr.) Zakkariya K. A., Chairman Tony Chacko, Secretary Sneha Rose George, and Treasurer Jibin N.',
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
            url: `${SITE_URL}/team/${person.slug}`,
            name: `${person.name} — ${person.role}, ISTD Trichur Chapter`,
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
            item: SITE_URL,
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
  const profileUrl = `${SITE_URL}/team/${member.slug}`;
  const portraitUrl = member.avatar
    ? member.avatar.startsWith('http')
      ? member.avatar
      : `${SITE_URL}${member.avatar}`
    : undefined;
  const portraitAlt =
    member.avatarAlt ||
    `${member.name}, ${member.role} of ISTD Trichur Chapter`;
  const personDescription =
    member.biography && member.biography.length > 0
      ? member.biography[0]
      : member.shortBio;

  const additionalImages =
    member.featuredPhotos?.map((photo) =>
      photo.src.startsWith('http') ? photo.src : `${SITE_URL}${photo.src}`
    ) || [];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${profileUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Managing Committee',
            item: `${SITE_URL}/committee`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: member.name,
            item: profileUrl,
          },
        ],
      },
      ...(portraitUrl
        ? [
            {
              '@type': 'ImageObject',
              '@id': `${profileUrl}#primaryimage`,
              url: portraitUrl,
              contentUrl: portraitUrl,
              ...(member.avatarWidth ? { width: member.avatarWidth } : {}),
              ...(member.avatarHeight ? { height: member.avatarHeight } : {}),
              caption: portraitAlt,
            },
          ]
        : []),
      {
        '@type': 'Person',
        '@id': `${profileUrl}#person`,
        name: member.name,
        jobTitle: `${member.role}, ISTD Trichur Chapter`,
        url: profileUrl,
        mainEntityOfPage: {
          '@id': `${profileUrl}#profilepage`,
        },
        description: personDescription,
        ...(portraitUrl
          ? {
              image:
                additionalImages.length > 0
                  ? [{ '@id': `${profileUrl}#primaryimage` }, ...additionalImages]
                  : { '@id': `${profileUrl}#primaryimage` },
            }
          : {}),
        memberOf: [
          {
            '@type': 'OrganizationRole',
            roleName: member.role,
            memberOf: {
              '@type': 'Organization',
              '@id': `${SITE_URL}/#organization`,
              name: 'ISTD Trichur Chapter',
              alternateName: 'ISTD Thrissur Chapter',
              url: SITE_URL,
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
        ...(member.expertiseDomains && member.expertiseDomains.length > 0
          ? {
              knowsAbout: member.expertiseDomains,
            }
          : {}),
        ...(member.sameAs && member.sameAs.length > 0
          ? {
              sameAs: member.sameAs,
            }
          : {}),
      },
      {
        '@type': 'ProfilePage',
        '@id': `${profileUrl}#profilepage`,
        url: profileUrl,
        name:
          member.metaTitle ||
          `${member.name} | ${member.role} | ISTD Trichur Chapter`,
        description: member.metaDescription || member.shortBio,
        inLanguage: 'en-IN',
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        breadcrumb: {
          '@id': `${profileUrl}#breadcrumb`,
        },
        ...(portraitUrl
          ? {
              primaryImageOfPage: {
                '@id': `${profileUrl}#primaryimage`,
              },
            }
          : {}),
        about: {
          '@id': `${profileUrl}#person`,
        },
        mainEntity: {
          '@id': `${profileUrl}#person`,
        },
      },
    ],
  };
}

export function getEventJsonLd(event: ChapterEvent) {
  const eventUrl = `${SITE_URL}/events/${event.slug}`;
  const imageUrl = event.image.startsWith('http')
    ? event.image
    : `${SITE_URL}${event.image}`;

  const isOnline =
    event.venue.toLowerCase().includes('online') ||
    event.venue.toLowerCase().includes('google meet');

  const isoDates = EVENT_ISO_DATES[event.slug] || {
    start: '2026-03-30T10:00:00+05:30',
    end: '2026-03-30T13:00:00+05:30',
  };

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
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Events & Programmes',
            item: `${SITE_URL}/events`,
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
        '@id': `${eventUrl}#event`,
        name: event.title,
        description: event.shortDescription,
        url: eventUrl,
        startDate: isoDates.start,
        endDate: isoDates.end,
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
                addressLocality: 'Trichur (Thrissur)',
                addressRegion: 'Kerala',
                addressCountry: 'IN',
              },
            },
        organizer: {
          '@id': `${SITE_URL}/#organization`,
        },
        offers: {
          '@type': 'Offer',
          url: eventUrl,
          price: '0',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-01-01T00:00:00+05:30',
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
      {
        '@type': 'Article',
        '@id': `${eventUrl}#article`,
        headline: event.title,
        description: event.shortDescription,
        image: [imageUrl],
        datePublished: isoDates.start,
        dateModified: '2026-11-07T00:00:00+05:30',
        author: {
          '@id': `${SITE_URL}/#organization`,
        },
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
        mainEntityOfPage: eventUrl,
      },
    ],
  };
}

export function getCampusChapterJsonLd(chapter: CampusChapter) {
  const pageUrl = `${SITE_URL}/campus-chapters/${chapter.slug}`;
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
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Campus & Student Chapters',
            item: `${SITE_URL}/campus-chapters`,
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
        '@id': `${pageUrl}#campuschapter`,
        name: `ISTD Student Chapter — ${chapter.institutionName}`,
        description: chapter.summary,
        url: pageUrl,
        image: imageUrl,
        parentOrganization: {
          '@id': `${SITE_URL}/#organization`,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Irinjalakuda, Trichur (Thrissur)',
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
    '/about',
    '/committee',
    '/events',
    '/campus-chapters',
    '/gallery',
    '/membership',
    '/contact',
    '/privacy',
  ];
  const eventRoutes = ALL_CHAPTER_EVENTS.map((ev) => `/events/${ev.slug}`);
  const campusRoutes = CAMPUS_CHAPTERS.map(
    (ch) => `/campus-chapters/${ch.slug}`
  );
  const teamRoutes = OFFICE_BEARERS.map((member) => `/team/${member.slug}`);
  return [...baseRoutes, ...eventRoutes, ...campusRoutes, ...teamRoutes];
}
