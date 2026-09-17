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
} from "lucide-react";
import { SITE_URL, SITE_NAME } from "@/lib/config";
import { FAQS } from "@/lib/faq";
import { FaqSchema } from "@/components/seo/SchemaMarkup";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { AnimatedHero } from "@/components/ui/AnimatedHero";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "AI Look Analyzer: Pickup Lines & Style Tips | Rizz Assist",
  description:
    "Upload one photo to get a free Rizz Report: personalized pickup lines, style tips, shades recs, and AI confidence advice tailored to your exact look. No login.",
  keywords: [
    "AI look analyzer",
    "rizz assist",
    "rizzassist",
    "rizz score calculator",
    "AI pickup line generator",
    "free style analyzer",
    "photo rizz analysis",
    "AI confidence coach",
    "shades recommendation AI",
    "body shape calculator",
    "body type calculator",
    "AI eye shape analyzer",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "AI Look Analyzer: Pickup Lines & Style Tips | Rizz Assist",
    description:
      "Upload one photo to get a free Rizz Report: personalized pickup lines, style tips, shades recs, and AI confidence advice tailored to your exact look. No login.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rizz Assist AI look analyzer showing a rizz score, pickup lines, and style recommendations",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Look Analyzer: Pickup Lines & Style Tips | Rizz Assist",
    description:
      "Upload one photo to get a free Rizz Report: personalized pickup lines, style tips, shades recs, and AI confidence advice tailored to your exact look. No login.",
    images: ["/twitter-image.png"],
  },
};

const STEPS = [
  {
    icon: ImagePlus,
    title: "Upload your photo",
    text: "Use a clear, well-lit selfie or full-body shot. The more Rizz Assist can see, the sharper the feedback.",
  },
  {
    icon: BarChart3,
    title: "AI reads your vibe",
    text: "Our vision AI analyzes face shape, expression, grooming, outfit colors, and your overall presence.",
  },
  {
    icon: FileText,
    title: "Get your Rizz Report",
    text: "Receive a full score breakdown, original pickup lines, style tips, shade recs, and confidence boosters.",
  },
  {
    icon: Rocket,
    title: "Walk out with swagger",
    text: "Apply the tips, deploy the lines, and let Rizz Assist turn heads everywhere you go.",
  },
];

const CAPABILITIES = [
  {
    icon: Flame,
    title: "Pickup Lines",
    href: null,
    text: "The AI writes original lines matched to your exact look and vibe, not recycled openers from a list. Each one is tailored to what it actually sees in your photo.",
  },
  {
    icon: Shirt,
    title: "Style Tips",
    href: null,
    text: "Get specific suggestions on colors, fits, and clothing categories that complement your face shape and body proportions, not generic advice.",
  },
  {
    icon: Glasses,
    title: "Shade Recommendations",
    href: null,
    text: "Frame-by-frame sunglasses recommendations matched to your detected face shape, so you can see exactly what suits you before you buy.",
  },
  {
    icon: Activity,
    title: "Body Type Calculator",
    href: "/body-type-calculator",
    text: "Find out whether you are an ectomorph, mesomorph, or endomorph from your measurements. Comes with fitness, diet, and style tips tailored to your build.",
  },
  {
    icon: Dumbbell,
    title: "Body Shape Calculator",
    href: "/body-shape-calculator",
    text: "Classify your silhouette (hourglass, pear, apple, rectangle, or inverted triangle) from your bust, waist, and hip measurements, with fashion tips for each shape.",
  },
  {
    icon: Eye,
    title: "Eye Shape Analysis",
    href: "/eye-shape-detector",
    text: "Identify your exact eye shape using the same landmark-based eye matching techniques that eye models and makeup professionals use, then get personalized eyeliner and eyeshadow tips for your shape.",
  },
  {
    icon: ScanFace,
    title: "Face Orientation Tips",
    href: null,
    text: "Learn the best camera angles, jaw positions, and grooming tweaks that make your face shape look its best in any photo or in person.",
  },
  {
    icon: Sparkles,
    title: "Confidence Tips",
    href: null,
    text: "Actionable posture, mindset, and daily habit recommendations tied to your strongest visible traits, so the glow-up goes beyond the outfit.",
  },
];

export default function HomePage() {
  return (
    <>
      <FaqSchema items={FAQS} />
      <Navbar />

      <main id="main-content">
        <AnimatedHero />

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
                Upload Your Photo
              </h2>
              <p className="mb-8 text-center text-sm text-gray-500 dark:text-white/50">
                AI-powered photo analysis across face, eye, and body shape, delivering personalized style and confidence feedback in under 30 seconds.
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
                What Rizz Assist Does
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-500 dark:text-white/50">
                Every tool in one place, from instant photo analysis to dedicated calculators for body type, body shape, and eye shape.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {CAPABILITIES.map((cap, i) => (
                <Reveal key={cap.title} delay={(i % 4) * 0.07}>
                  {cap.href ? (
                    <Link
                      href={cap.href}
                      className="group block h-full rounded-2xl border border-gray-100 bg-cream-50 p-5 transition-all hover:border-brand-200 hover:shadow-md dark:border-white/5 dark:bg-ink-800 dark:hover:border-brand-600/30 dark:hover:shadow-black/30"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-900 transition-transform duration-200 group-hover:scale-105 dark:bg-ink-700">
                        <cap.icon
                          className="h-5 w-5 text-brand-400"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
                        {cap.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-white/50">
                        {cap.text}
                      </p>
                    </Link>
                  ) : (
                    <article className="h-full rounded-2xl border border-gray-100 bg-cream-50 p-5 dark:border-white/5 dark:bg-ink-800">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-900 dark:bg-ink-700">
                        <cap.icon
                          className="h-5 w-5 text-brand-400"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
                        {cap.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-white/50">
                        {cap.text}
                      </p>
                    </article>
                  )}
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
                Four steps from photo to full-on swagger.
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
                    <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
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
                See exactly how your Rizz Report is built &rarr;
              </Link>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section
          aria-labelledby="faq-heading"
          className="border-t border-gray-100 bg-white px-4 py-16 dark:border-white/5 dark:bg-ink-900"
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
                  <details className="group rounded-xl border border-gray-100 bg-cream-50 p-5 open:border-brand-200 open:bg-white transition-colors dark:border-white/5 dark:bg-ink-800 dark:open:border-brand-600/30 dark:open:bg-ink-700">
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
                See the full FAQ &rarr;
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
