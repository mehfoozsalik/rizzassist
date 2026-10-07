import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/config";
import { WebAppSchema } from "@/components/seo/SchemaMarkup";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { InstallPrompt } from "@/components/ui/InstallPrompt";
import { AppToaster } from "@/components/ui/AppToaster";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
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
      "Rizz Assist: Enhance Your Personality | Confidence & Self-Improvement",
    template: "%s | Rizz Assist",
  },
  description: SITE_DESCRIPTION,
  manifest: "/manifest.json",
  keywords: [
    "personality test",
    "confidence test",
    "charisma test",
    "social skills test",
    "rizz test",
    "rizz assist",
    "AI self improvement",
    "personality improvement",
    "face shape detector",
    "body shape calculator",
    "body type calculator",
    "eye shape detector",
    "dating personality test",
    "communication style test",
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
    title: "Rizz Assist: Enhance Your Personality | AI Self-Improvement",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rizz Assist AI self-improvement platform for personality, confidence, and appearance",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizz Assist: Enhance Your Personality | AI Self-Improvement",
    description: SITE_DESCRIPTION,
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
  verification: {
    google: "google52c30d45ed78593f",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "ai-content": "https://rizzassistgo.com/ai.txt",
    "llms-txt": "https://rizzassistgo.com/llms.txt",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <meta name="apple-mobile-web-app-title" content="Rizz Assist" />
      <body className="min-h-screen bg-cream-50 text-gray-900 antialiased dark:bg-ink-900 dark:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <WebAppSchema />
          <AppToaster />
          {children}
          <CookieConsent gaId={GA_MEASUREMENT_ID} />
          <InstallPrompt />
        </ThemeProvider>
      </body>
    </html>
  );
}
