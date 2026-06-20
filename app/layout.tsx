import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/config";
import { WebAppSchema } from "@/components/seo/SchemaMarkup";
import { CookieConsent } from "@/components/ui/CookieConsent";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Rizz Assist: AI Rizz Coach | Pickup Lines, Style Tips & Look Analysis",
    template: "%s | Rizz Assist",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "rizz assistant",
    "AI rizz coach",
    "pickup line generator",
    "AI style tips",
    "face shape analysis",
    "outfit suggestions AI",
    "confidence coach",
    "photo appearance analyzer",
    "shades recommendation AI",
    "how to improve rizz",
    "body shape analysis",
    "body shape analysis AI",
    "body shape analysis tool",
    "body shape analysis app",
    "body shape analysis software",
    "body shape analysis service",
    "body shape analysis provider",
    "body shape analysis company",
    "body shape analysis provider",
    "body type analysis",
    "body type analysis AI",
    "body type analysis tool",
    "body type analysis app",
    "body type analysis software",
    "body type analysis service",
    "body type analysis provider",
    "body type analysis company",
    "body type analysis provider",
    "eye shape analysis",
    "eye shape analysis AI",
    "eye shape analysis tool",
    "eye shape analysis app",
    "eye shape analysis software",
    "eye shape analysis service",
    "eye shape analysis provider",
    "eye shape analysis company",
    "eye shape analysis provider",
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
    title: "Rizz Assist: AI Rizz Coach & Pickup Line Generator",
    description:
      "Upload a photo. Get pickup lines, style tips, shades recs, and your personal Rizz Score. Free. Instant. Private.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rizz Assist - AI rizz coach with pickup lines, style and shades recommendations",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizz Assist: AI Rizz Coach & Pickup Line Generator",
    description:
      "Upload a photo. Get pickup lines, style tips, shades recs, and your personal Rizz Score. Free. Instant. Private.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
      <meta name="apple-mobile-web-app-title" content="Rizz Assist" />
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <WebAppSchema />
        {children}
        <CookieConsent gaId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
