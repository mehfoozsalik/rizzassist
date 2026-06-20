import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Activity,
  BarChart3,
  ChevronDown,
  Crown,
  Dumbbell,
  Flame,
  Ruler,
  Salad,
  Shirt,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import { SkipToContent } from '@/components/seo/SkipToContent';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolWebAppSchema, FaqSchema, BreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import { Reveal } from '@/components/ui/Reveal';
import { BodyTypeCalculator } from '@/components/calculators/BodyTypeCalculator';
import { BODY_TYPE_PROFILES } from '@/lib/bodyType';

const PAGE_URL = `${SITE_URL}/body-type-calculator`;

export const metadata: Metadata = {
  title: 'Body Type Calculator for Men and Women | Rizz Assist',
  description:
    "Free body type calculator for men and women. Find out if you're an ectomorph, mesomorph, or endomorph and get fitness, diet, and style tips tailored to your build.",
  keywords: [
    'body type calculator',
    'body type calculator female',
    'body shape type calculator',
    'body type calculator for women',
    'body types calculator',
    'body type calculator male',
    'body type calculator men',
    'kibbe body type calculator',
    'body type calculator women',
    'ectomorph mesomorph endomorph',
    'somatotype calculator',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Body Type Calculator for Men and Women | Rizz Assist',
    description:
      "Free body type calculator for men and women. Find out if you're an ectomorph, mesomorph, or endomorph and get fitness, diet, and style tips tailored to your build.",
    url: PAGE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rizz Assist Body Type Calculator for men and women showing ectomorph, mesomorph, and endomorph results',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Type Calculator for Men and Women | Rizz Assist',
    description:
      "Free body type calculator for men and women. Find out if you're an ectomorph, mesomorph, or endomorph and get fitness, diet, and style tips tailored to your build.",
    images: ['/twitter-image.png'],
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is my body type calculator?',
    answer:
      "This is a free tool that classifies you as an Ectomorph, Mesomorph, or Endomorph based on your measurements. Enter your height, weight, and key proportions, and the calculator returns your body type with personalized fitness and style tips instantly.",
  },
  {
    question: 'How do I calculate my body type?',
    answer:
      'Enter your height, weight, shoulder width, chest, waist, and hip measurements into the form above. The calculator scores your BMI alongside your shoulder-to-hip ratio and returns your somatotype with tips tailored to your build.',
  },
  {
    question: 'How is body type calculated for women vs men?',
    answer:
      'The three somatotypes (Ectomorph, Mesomorph, Endomorph) apply to all bodies, but typical proportions differ by sex. Women tend to carry more fat around the hips, which affects the hip-to-waist comparison. The calculator accounts for this when you select your sex in the form, so results are relevant for both men and women.',
  },
  {
    question: 'Can body type change?',
    answer:
      'Your underlying skeletal frame stays fairly fixed, but body composition (muscle and fat distribution) can shift significantly with training and diet. Many people show traits of more than one type.',
  },
  {
    question: 'Is BMI accurate?',
    answer:
      "BMI is a useful starting point but doesn't account for muscle mass, bone density, or fat distribution. This calculator combines BMI with shoulder-to-hip proportions for a more complete picture.",
  },
  {
    question: 'What workouts suit each type?',
    answer:
      'Ectomorphs benefit from heavy compound lifts with longer rest; mesomorphs thrive on varied strength + cardio mixes; endomorphs see the best results from combining strength training with frequent cardio.',
  },
];

const STEPS = [
  {
    icon: Ruler,
    title: 'Enter measurements',
    text: 'Fill in height, weight, shoulder, chest, waist, and hip.',
  },
  {
    icon: BarChart3,
    title: 'Instant calculation',
    text: 'BMI and shoulder-to-hip ratio scored in seconds.',
  },
  {
    icon: Sparkles,
    title: 'Get AI-powered tips',
    text: 'Receive your body type with personalized fitness and style advice.',
  },
];

const BENEFITS = [
  {
    icon: Dumbbell,
    title: 'Train smarter',
    text: 'The right rep ranges, volume, and rest periods differ by body type.',
  },
  {
    icon: Salad,
    title: 'Eat with purpose',
    text: 'Calorie and macro needs vary significantly between types.',
  },
  {
    icon: Shirt,
    title: 'Dress to your build',
    text: 'Certain cuts and fabrics flatter different frames.',
  },
  {
    icon: Target,
    title: 'Set realistic goals',
    text: 'Your genetics influence how fast you gain or lose weight.',
  },
];

const BODY_TYPE_ICONS = {
  Ectomorph: Zap,
  Mesomorph: Crown,
  Endomorph: Flame,
} as const;

export default function BodyTypeCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        crumbs={[
          { name: 'Home', item: SITE_URL },
          { name: 'Body Type Calculator', item: PAGE_URL },
        ]}
      />
      <ToolWebAppSchema
        name="Body Type Calculator"
        description="Free calculator that determines whether you're an ectomorph, mesomorph, or endomorph based on your measurements."
        url={PAGE_URL}
        featureList={[
          'BMI-based body type detection',
          'Ectomorph, Mesomorph, Endomorph classification',
          'Personalized fitness recommendations',
          'Personalized diet suggestions',
          'Clothing and style tips',
          'No login required',
        ]}
      />
      <FaqSchema items={FAQ_ITEMS} />
      <SkipToContent />
      <Navbar />

      <main id="main-content">
        {/* Breadcrumb */}
        <div className="border-b border-gray-100 bg-white px-4 py-3">
          <div className="mx-auto max-w-3xl">
            <Breadcrumbs
              crumbs={[
                { name: 'Home', href: '/' },
                { name: 'Body Type Calculator', href: '/body-type-calculator' },
              ]}
            />
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-ink-900 px-4 py-16 text-center sm:py-20">
          {/* Ambient blobs */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="animate-blob absolute -left-24 -top-12 h-72 w-72 rounded-full bg-brand-600/10 blur-3xl" />
            <div className="animate-blob absolute right-0 top-20 h-64 w-64 rounded-full bg-brand-400/8 blur-3xl [animation-delay:4s]" />
            <div className="animate-blob absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-ink-700/60 blur-3xl [animation-delay:8s]" />
          </div>
          {/* Subtle grid overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          <div className="relative mx-auto max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-600/30 bg-brand-600/10 px-3 py-1 text-xs font-medium text-brand-400 backdrop-blur">
                <Activity className="h-3 w-3" aria-hidden="true" />
                Free Body Type Calculator
              </span>

              <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                Body Type Calculator
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-white/65">
                Enter your measurements to find out if you&apos;re an Ectomorph,
                Mesomorph, or Endomorph. Works for men and women, with fitness,
                diet, and style tips tailored to your build.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-5">
                <span className="flex items-center gap-1.5 text-xs text-white/45">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
                  No login required
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/45">
                  <Zap className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
                  Instant results
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/45">
                  <Crown className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
                  Free forever
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* How it works strip */}
        <section aria-label="How it works" className="border-b border-gray-100 bg-white px-4 py-8">
          <div className="mx-auto max-w-3xl">
            <ol className="grid gap-6 sm:grid-cols-3">
              {STEPS.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.1}>
                  <li className="flex items-start gap-3 sm:flex-col sm:items-center sm:text-center">
                    <div className="relative shrink-0">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-900">
                        <step.icon className="h-5 w-5 text-brand-400" aria-hidden="true" />
                      </div>
                      <span
                        aria-hidden="true"
                        className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white"
                      >
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{step.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{step.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Calculator */}
        <section aria-label="Body type calculator form" className="bg-cream-50 px-4 py-12 sm:py-16">
          <BodyTypeCalculator />
        </section>

        {/* Content */}
        <section className="bg-white px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">

            {/* What Are Body Types */}
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                The Science
              </span>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                What Are Body Types?
              </h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                Body type theory groups people into three broad somatotypes:
                Ectomorph, Mesomorph, and Endomorph, based on skeletal frame,
                metabolism, and how the body tends to build muscle and store fat.
                Knowing yours helps you choose training and nutrition approaches
                that actually fit your build, instead of following generic advice.
              </p>
              <p className="mt-3 text-sm text-gray-500">
                Looking for proportion-based or Kibbe-style results? The{' '}
                <Link
                  href="/body-shape-calculator"
                  className="font-medium text-brand-600 underline hover:no-underline"
                >
                  Body Shape Calculator
                </Link>
                {' '}covers bust, waist, and hip ratios, which overlaps with how Kibbe body types assess silhouette and frame.
              </p>
            </Reveal>

            {/* Body type profile cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {BODY_TYPE_PROFILES.map((profile, i) => {
                const Icon = BODY_TYPE_ICONS[profile.type as keyof typeof BODY_TYPE_ICONS];
                return (
                  <Reveal key={profile.type} delay={i * 0.08}>
                    <div className="group h-full rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-md">
                      {Icon && (
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600/10 transition-colors duration-300 group-hover:bg-brand-600/20">
                          <Icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                        </div>
                      )}
                      <h3 className="font-semibold text-gray-900">{profile.type}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                        {profile.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Why it helps */}
            <Reveal>
              <span className="mt-14 block text-xs font-semibold uppercase tracking-widest text-brand-600">
                Why It Matters
              </span>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                Why Knowing Your Body Type Helps
              </h2>
            </Reveal>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {BENEFITS.map((benefit, i) => (
                <Reveal key={benefit.title} delay={i * 0.07}>
                  <div className="group flex gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-900 transition-transform duration-300 group-hover:scale-110">
                      <benefit.icon className="h-5 w-5 text-brand-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{benefit.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">{benefit.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* FAQ */}
            <Reveal>
              <span className="mt-14 block text-xs font-semibold uppercase tracking-widest text-brand-600">
                Got Questions
              </span>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                Frequently Asked Questions
              </h2>
            </Reveal>

            <div className="mt-6 space-y-2">
              {FAQ_ITEMS.map((item, i) => (
                <Reveal key={item.question} delay={i * 0.04}>
                  <details className="group rounded-2xl border border-gray-100 bg-cream-50 px-5 py-4 transition-colors open:border-brand-200 open:bg-white">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-gray-900 marker:hidden">
                      {item.question}
                      <ChevronDown
                        className="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180 group-open:text-brand-600"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-gray-500">{item.answer}</p>
                  </details>
                </Reveal>
              ))}
            </div>

            {/* Footer links */}
            <Reveal>
              <p className="mt-12 text-center text-sm text-gray-500">
                Want the full breakdown of each type?{' '}
                <Link
                  href="/features/body-type-calculator"
                  className="font-medium text-brand-600 underline hover:no-underline"
                >
                  Read the full guide
                </Link>
              </p>
            </Reveal>

            <Reveal>
              <div className="mt-6 border-t border-gray-100 pt-6 text-center text-sm text-gray-500">
                Also try:{' '}
                <Link
                  href="/body-shape-calculator"
                  className="font-medium text-brand-600 underline hover:no-underline"
                >
                  Body Shape Calculator
                </Link>
                {' · '}
                <Link
                  href="/eye-shape-detector"
                  className="font-medium text-brand-600 underline hover:no-underline"
                >
                  Eye Shape Detector
                </Link>
                {' · '}
                <Link
                  href="/"
                  className="font-medium text-brand-600 underline hover:no-underline"
                >
                  AI Look Analyzer
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
