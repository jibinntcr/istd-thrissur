import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LightboxProvider } from '@/components/LightboxProvider';
import { NetworkingParticlesBackground } from '@/components/NetworkingParticlesBackground';
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  GLOBAL_SEO_KEYWORDS,
  getOrganizationJsonLd,
} from '@/lib/seoConfig';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B2239',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ISTD Trichur Chapter | Indian Society for Training & Development',
    template: '%s | ISTD Trichur Chapter',
  },
  description:
    'Official website of the ISTD Trichur Chapter (ISTD Trichur Diamond Chapter) — Indian Society for Training & Development (Est. 1970, New Delhi). Connecting trainers, educators, HR & L&D professionals, academicians, industry leaders, and student chapters across Trichur and Central Kerala.',
  keywords: GLOBAL_SEO_KEYWORDS,
  applicationName: 'ISTD Trichur Chapter',
  authors: [
    {
      name: 'ISTD Trichur Chapter (Indian Society for Training & Development)',
      url: SITE_URL,
    },
  ],
  creator: 'ISTD Trichur Chapter',
  publisher: 'Indian Society for Training & Development (ISTD) — Trichur Chapter',
  category: 'Education & Professional Development',
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  robots: {
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
  icons: {
    icon: '/images/logo-circle.png',
    shortcut: '/images/logo-circle.png',
    apple: '/images/logo-circle.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: SITE_NAME,
    description:
      'Promoting excellence in Human Resource Development, workplace learning, academic–industry student chapters, and leadership development across Trichur and Central Kerala.',
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'ISTD Trichur Diamond Chapter Inauguration & Leadership',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description:
      'Official Diamond Chapter of the Indian Society for Training & Development (ISTD) in Trichur, Kerala.',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = getOrganizationJsonLd();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body>
        <NetworkingParticlesBackground />
        <LightboxProvider>
          <Navbar />
          <main id="mainContent">{children}</main>
          <Footer />
        </LightboxProvider>
      </body>
    </html>
  );
}
