import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Briefcase,
  Eye,
  ScanFace,
  Scissors,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'For Professionals: Grooming Tools for Stylists & Coaches',
  description:
    'Rizz Assist tools for barbers, stylists, image consultants, and confidence coaches — face shape, try-on, body calculators, and eye analysis for client personality grooming.',
  alternates: { canonical: `${SITE_URL}/professionals` },
  openGraph: {
    title: 'For Professionals | Rizz Assist',
    url: `${SITE_URL}/professionals`,
    siteName: SITE_NAME,
    type: 'website',
  },
};

const USE_CASES = [
  {
    icon: Scissors,
    title: 'Barbers & hairstylists',
    text: 'Run face shape detection or try-on before the cut. Share PDF grooming notes so clients leave with a clear brief.',
  },
  {
    icon: Eye,
    title: 'Makeup & brow artists',
    text: 'Pair eye shape and face shape results with presence tips — keep the conversation on harmony, not harsh critique.',
  },
  {
    icon: Users,
    title: 'Image & confidence coaches',
    text: 'Use Rizz Report clothing colors, body shape, and posture cues as a structured personality-grooming session.',
  },
  {
    icon: Briefcase,
    title: 'Retail & optical',
    text: 'Glasses try-on and face shape guides help clients shortlist frames that fit their proportions.',
  },
];

export default function ProfessionalsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="bg-ink-900 px-4 py-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400">
            For professionals
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
            Client grooming tools that stay private
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/65">
            Help people improve how they present themselves — hair, frames,
            clothes, presence — with on-device analysis and downloadable reports.
            No vanity scoring. No photo vaults.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/face-shape-detector"
              className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Open face shape tool
            </Link>
            <Link
              href="/tools"
              className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white"
            >
              All tools
            </Link>
          </div>
        </section>

        <section className="bg-cream-50 px-4 py-14 dark:bg-ink-800">
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
            {USE_CASES.map((u) => (
              <article
                key={u.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-ink-900"
              >
                <u.icon className="h-6 w-6 text-brand-500" />
                <h2 className="mt-3 text-lg font-bold text-gray-900 dark:text-white">{u.title}</h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-white/50">{u.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white px-4 py-14 dark:bg-ink-900">
          <div className="mx-auto max-w-3xl text-center">
            <ShieldCheck className="mx-auto h-8 w-8 text-brand-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
              Privacy-first for client trust
            </h2>
            <p className="mt-3 text-sm text-gray-500 dark:text-white/50">
              Landmark detection runs in the browser. Encourage clients to use
              their own device during consultations. Download PDF reports when
              they want a takeaway — without creating accounts.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/try-on" className="font-medium text-brand-600 underline">
                Try-on suite
              </Link>
              <Link href="/blog" className="font-medium text-brand-600 underline">
                Training-style guides
              </Link>
              <Link href="/#upload" className="inline-flex items-center gap-1 font-medium text-brand-600 underline">
                <ScanFace className="h-4 w-4" /> Full Rizz Report
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
