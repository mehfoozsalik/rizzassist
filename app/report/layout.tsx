import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Personality Improvement Report',
  description:
    'Your free RizzAssist Personality Improvement Report, strengths, growth areas, personalized recommendations, and a 30-day plan.',
  alternates: { canonical: `${SITE_URL}/report` },
  openGraph: {
    title: 'Personality Improvement Report | Rizz Assist',
    url: `${SITE_URL}/report`,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function ReportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
