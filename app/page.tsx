import type { Metadata } from "next";
import Link from "next/link";
import {
  Flame,
  Shirt,
  Glasses,
  ScanFace,
  ShieldCheck,
  ImagePlus,
  BarChart3,
  FileText,
  Rocket,
  Eye,
  Dumbbell,
  Sparkles,
  Activity,
  Scissors,
} from "lucide-react";
import { SITE_URL, SITE_NAME } from "@/lib/config";
import { FAQS } from "@/lib/faq";
import { FaqSchema } from "@/components/seo/SchemaMarkup";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { AnimatedHero } from "@/components/ui/AnimatedHero";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: {
    absolute:
      "Rizz Assist — AI Rizz Coach | Pickup Lines, Style Tips & Look Analysis",
  },
  description:
    "Upload your photo and let Rizz Assist's AI analyze your look, suggest outfit upgrades, recommend shades, generate personalized pickup lines, and help you radiate confidence. Free. No login required.",
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
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Rizz Assist — AI Rizz Coach & Pickup Line Generator",
    description:
      "Upload a photo. Get pickup lines, style tips, shades recs, and your personal Rizz Score. Free. Instant. Private.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rizz Assist — AI rizz coach for pickup lines, style tips, and look analysis",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizz Assist — AI Rizz Coach & Pickup Line Generator",
    description:
      "Upload a photo. Get pickup lines, style tips, shades recs, and your personal Rizz Score. Free. Instant. Private.",
    images: ["/twitter-image.png"],
  },
};

const PERSONALITY_TOOLS = [
  {
    href: "/personality-test",
    title: "Personality Test",
    text: "Map traits and habits that help you enhance your personality over time.",
    cta: "Start personality assessment",
  },
  {
    href: "/confidence-test",
    title: "Confidence Test",
    text: "Discover how confident you are in social situations.",
    cta: "Analyze your confidence",
  },
  {
    href: "/charisma-test",
    title: "Charisma Test",
    text: "Analyze your social presence and communication style.",
    cta: "Measure your charisma",
  },
  {
    href: "/rizz-test",
    title: "Rizz Test",
    text: "Understand your conversation and dating strengths.",
    cta: "Check your rizz score",
  },
];

const STEPS = [
  {
    icon: ImagePlus,
    title: "Upload your photo",
    text: "Use a clear, well-lit selfie or full-body shot — the more Rizz Assist can see, the better the feedback.",
  },
  {
    icon: BarChart3,
    title: "AI reads your vibe",
    text: "Our vision AI analyzes face shape, expression, grooming, outfit colors, and overall presentation.",
  },
  {
    icon: FileText,
    title: "Get your Rizz Report",
    text: "Receive a style score, pickup line suggestions, outfit tips, shades recommendations, and confidence boosters.",
  },
  {
    icon: Rocket,
    title: "Walk out with swagger",
    text: "Apply the tips, use the lines, and let Rizz Assist turn heads for you.",
  },
];

const CAPABILITIES = [
  {
    icon: Flame,
    title: "Personalized Pickup Lines",
    href: null as string | null,
    cta: null as string | null,
    text: "AI generates lines matched to your look and the vibe you project — not generic openers.",
  },
  {
    icon: Shirt,
    title: "Outfit & Style Upgrades",
    href: null,
    cta: null,
    text: "Get specific suggestions on colors, fits, and styles that complement your face and body type.",
  },
  {
    icon: Glasses,
    title: "Shades & Accessories",
    href: null,
    cta: null,
    text: "Find out which sunglass frames and accessories suit your face shape.",
  },
  {
    icon: ScanFace,
    title: "Face Orientation Tips",
    href: "/face-shape-detector",
    cta: "Run face shape scan",
    text: "Learn how angles, expression, and grooming can sharpen your look.",
  },
  {
    icon: ShieldCheck,
    title: "100% Private",
    href: "/privacy",
    cta: "Read our privacy policy",
    text: "Photo analyzed in memory and never stored. Zero data kept after your session.",
  },
  {
    icon: Sparkles,
    title: "Instant Results",
    href: null,
    cta: null,
    text: "No login, no waitlist. Upload and get your Rizz Report in seconds.",
  },
  {
    icon: Scissors,
    title: "Style Try-On",
    href: "/try-on",
    cta: "Try styles on your selfie",
    text: "Preview hairstyles and glasses on your selfie with private on-device overlays before you book a cut or buy frames.",
  },
  {
    icon: Activity,
    title: "Body Type Calculator",
    href: "/body-type-calculator",
    cta: "Calculate body type",
    text: "Find out whether you are an ectomorph, mesomorph, or endomorph from your measurements. Comes with fitness, diet, and style tips tailored to your build.",
  },
  {
    icon: Dumbbell,
    title: "Body Shape Calculator",
    href: "/body-shape-calculator",
    cta: "Calculate body shape",
    text: "Classify your silhouette (hourglass, pear, apple, rectangle, or inverted triangle) from your bust, waist, and hip measurements, with fashion tips for each shape.",
  },
  {
    icon: Eye,
    title: "Eye Shape Analysis",
    href: "/eye-shape-detector",
    cta: "Analyze eye shape",
    text: "Identify your exact eye shape using landmark-based matching, then get personalized eyeliner and eyeshadow tips for your shape.",
  },
];

export default function HomePage() {
  return (
    <>
      <FaqSchema items={FAQS} />
      <Navbar />

      <main id="main-content">
        <AnimatedHero />

        {/* Explore personality tools */}
        <section
          aria-labelledby="explore-personality"
          className="border-t border-gray-100 bg-white px-4 py-16 dark:border-white/5 dark:bg-ink-900"
        >
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2
                id="explore-personality"
                className="text-center text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white"
              >
                Explore Your Personality
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 dark:text-white/50">
                Free assessments that help you enhance your personality —
                covering confidence, charisma, and rizz, with a combined improvement report.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PERSONALITY_TOOLS.map((tool, i) => (
                <Reveal key={tool.href} delay={i * 0.06}>
                  <article className="flex h-full flex-col rounded-2xl border border-gray-100 bg-cream-50 p-5 transition hover:border-brand-200 hover:shadow-md dark:border-white/5 dark:bg-ink-800 dark:hover:border-brand-600/30">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {tool.title}
                    </p>
                    <p className="mt-2 flex-1 text-sm text-gray-500 dark:text-white/50">
                      {tool.text}
                    </p>
                    <Link
                      href={tool.href}
                      className="mt-4 text-sm font-semibold text-brand-600 hover:underline"
                    >
                      {tool.cta} →
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 text-center">
              <Link
                href="/tools"
                className="inline-flex rounded-lg bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-800 dark:bg-white dark:text-ink-900"
              >
                Browse every self-improvement tool
              </Link>
            </p>
          </div>
        </section>

        {/* Upload section */}
        <section
          id="upload"
          aria-labelledby="upload-heading"
          className="scroll-mt-20 bg-cream-50 px-4 py-16 dark:bg-ink-800"
        >
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <h2
                id="upload-heading"
                className="mb-2 text-center text-2xl font-bold text-gray-900 dark:text-white"
              >
                Drop your photo here and let Rizz Assist do its thing
              </h2>
              <p className="mb-8 text-center text-sm text-gray-500 dark:text-white/50">
                JPG, PNG or WebP · up to 5MB · No login · 100% private
              </p>
            </Reveal>
            <ImageUploader />
          </div>
        </section>

        {/* What Rizz Assist Does */}
        <section
          aria-labelledby="what-we-do"
          className="border-t border-gray-100 bg-white px-4 py-16 dark:border-white/5 dark:bg-ink-900"
        >
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2
                id="what-we-do"
                className="text-center text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white"
              >
                Why Rizz Assist Hits Different
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 dark:text-white/50">
                Personalized pickup lines, style upgrades, shades matched to your
                face, and confidence tips — plus free calculators for body type,
                body shape, and eye shape.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {CAPABILITIES.map((cap, i) => (
                <Reveal key={cap.title} delay={(i % 4) * 0.07}>
                  <article
                    className={`group flex h-full flex-col rounded-2xl border border-gray-100 bg-cream-50 p-5 transition-all dark:border-white/5 dark:bg-ink-800 ${
                      cap.href
                        ? "hover:border-brand-200 hover:shadow-md dark:hover:border-brand-600/30 dark:hover:shadow-black/30"
                        : ""
                    }`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-900 transition-transform duration-200 group-hover:scale-105 dark:bg-ink-700">
                      <cap.icon
                        className="h-5 w-5 text-brand-400"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
                      {cap.title}
                    </p>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-gray-500 dark:text-white/50">
                      {cap.text}
                    </p>
                    {cap.href && cap.cta && (
                      <Link
                        href={cap.href}
                        className="mt-4 inline-flex text-sm font-medium text-brand-600 underline-offset-2 hover:underline"
                      >
                        {cap.cta}
                      </Link>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <p className="mt-10 text-center text-sm text-gray-500 dark:text-white/40">
                <ShieldCheck className="mr-1.5 inline h-4 w-4 text-brand-600" aria-hidden="true" />
                Your photos are analyzed in memory only and never stored. Zero data is kept after your session.
              </p>
            </Reveal>
          </div>
        </section>

        {/* How it works */}
        <section
          aria-labelledby="how-it-works"
          className="border-t border-gray-100 bg-cream-50 px-4 py-16 dark:border-white/5 dark:bg-ink-800"
        >
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2
                id="how-it-works"
                className="text-center text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white"
              >
                How Rizz Assist Works
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-500 dark:text-white/50">
                Four steps from photo to full-on swagger — the same path that
                helps you unlock your inner rizz with AI in under a minute.
              </p>
            </Reveal>

            <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.08}>
                  <li className="relative h-full rounded-2xl border border-gray-100 bg-white p-6 transition-shadow hover:shadow-md dark:border-white/5 dark:bg-ink-900 dark:hover:shadow-black/30">
                    <span className="absolute -top-3.5 left-5 flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 text-xs font-bold text-white shadow-sm dark:bg-ink-700">
                      {i + 1}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600/10">
                      <step.icon
                        className="h-5 w-5 text-brand-600"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
                      {step.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-white/50">
                      {step.text}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>

            <p className="mt-8 text-center text-sm">
              <Link
                href="/how-it-works"
                className="font-medium text-brand-600 underline hover:no-underline"
              >
                See exactly how your Rizz Report is built →
              </Link>
            </p>
          </div>
        </section>

        {/* Share */}
        <section
          aria-labelledby="share-heading"
          className="border-t border-gray-100 bg-white px-4 py-12 dark:border-white/5 dark:bg-ink-900"
        >
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2
                id="share-heading"
                className="text-xl font-bold text-gray-900 dark:text-white"
              >
                Share Rizz Assist
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm text-gray-500 dark:text-white/50">
                Know someone who wants to level up their rizz? Pass the free AI
                coach along.
              </p>
            </Reveal>
            <div className="mt-6">
              <ShareButtons />
            </div>
            <p className="mt-4 text-xs text-gray-400 dark:text-white/30">
              Learn more about{" "}
              <a
                href="https://en.wikipedia.org/wiki/Somatotype_and_constitutional_psychology"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-brand-600"
              >
                somatotype science
              </a>{" "}
              and{" "}
              <a
                href="https://en.wikipedia.org/wiki/Female_body_shape"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-brand-600"
              >
                figure shape guides
              </a>{" "}
              on Wikipedia.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section
          aria-labelledby="faq-heading"
          className="border-t border-gray-100 bg-cream-50 px-4 py-16 dark:border-white/5 dark:bg-ink-800"
        >
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2
                id="faq-heading"
                className="text-center text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white"
              >
                Frequently Asked Questions
              </h2>
            </Reveal>

            <div className="mt-10 space-y-2">
              {FAQS.map((faq, i) => (
                <Reveal key={faq.question} delay={i * 0.05}>
                  <details className="group rounded-xl border border-gray-100 bg-white p-5 open:border-brand-200 transition-colors dark:border-white/5 dark:bg-ink-900 dark:open:border-brand-600/30 dark:open:bg-ink-700">
                    <summary className="cursor-pointer list-none text-sm font-semibold text-gray-900 marker:hidden dark:text-white">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-white/50">
                      {faq.answer}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>

            <p className="mt-8 text-center text-sm">
              <Link
                href="/faq"
                className="font-medium text-brand-600 underline hover:no-underline"
              >
                Questions? Check the FAQ →
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
