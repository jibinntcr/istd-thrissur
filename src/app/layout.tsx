import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LightboxProvider } from '@/components/LightboxProvider';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B2239',
};

export const metadata: Metadata = {
  title: {
    default: 'ISTD Thrissur Chapter | Indian Society for Training & Development',
    template: '%s | ISTD Thrissur Chapter',
  },
  description:
    'ISTD Thrissur Chapter (Diamond Chapter) — Indian Society for Training & Development. Bringing together trainers, educators, HR professionals, academicians, and industry practitioners in Central Kerala.',
  icons: {
    icon: '/images/logo-circle.png',
    apple: '/images/logo-circle.png',
  },
  openGraph: {
    title: 'ISTD Thrissur Diamond Chapter | Indian Society for Training & Development',
    description:
      'Promoting excellence in Human Resource Development, workplace learning, and leadership development across Central Kerala.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LightboxProvider>
          <Navbar />
          <main id="mainContent">{children}</main>
          <Footer />
        </LightboxProvider>
      </body>
    </html>
  );
}
