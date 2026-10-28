import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/config';

export const metadata: Metadata = {
  title: 'My RizzAssist Profile: Scores & Progress',
  description:
    'View completed assessments, personality scores, and improvement progress saved on your device.',
  alternates: { canonical: `${SITE_URL}/profile` },
  openGraph: {
    title: 'My RizzAssist Profile',
    url: `${SITE_URL}/profile`,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
