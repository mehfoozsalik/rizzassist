import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/config';
import { WebAppSchema } from '@/components/seo/SchemaMarkup';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Rizz Assist — AI Rizz Coach | Pickup Lines, Style Tips & Look Analysis',
    template: '%s | Rizz Assist',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'rizz assistant',
    'AI rizz coach',
    'pickup line generator',
    'AI style tips',
    'face shape analysis',
    'outfit suggestions AI',
    'confidence coach',
    'photo appearance analyzer',
    'shades recommendation AI',
    'how to improve rizz',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Rizz Assist — AI Rizz Coach & Pickup Line Generator',
    description:
      'Upload a photo. Get pickup lines, style tips, shades recs, and your personal Rizz Score. Free. Instant. Private.',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rizz Assist - AI rizz coach with pickup lines, style and shades recommendations',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rizz Assist — AI Rizz Coach & Pickup Line Generator',
    description:
      'Upload a photo. Get pickup lines, style tips, shades recs, and your personal Rizz Score. Free. Instant. Private.',
    images: ['/twitter-image.png'],
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
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <WebAppSchema />
        {children}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
