import type { Metadata } from "next";
import Link from "next/link";
import {
  Flame,
  Shirt,
  Glasses,
  ScanFace,
  ShieldCheck,
  Zap,
  ImagePlus,
  BarChart3,
  FileText,
  Rocket,
  Crown,
} from "lucide-react";
import { SITE_URL, SITE_NAME } from "@/lib/config";
import { FAQS } from "@/lib/faq";
import { SkipToContent } from "@/components/seo/SkipToContent";
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
    "rizz score calculator",
    "AI pickup line generator",
    "free style analyzer",
    "photo rizz analysis",
    "AI confidence coach",
    "shades recommendation AI",
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
    text: "Our vision AI analyzes face shape, expression, grooming, outfit colors, and your overall alpha presence.",
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

const BENEFITS = [
  {
    icon: Flame,
    title: "Original Pickup Lines",
    text: "AI generates lines matched to your exact look and vibe, not generic openers everyone's seen before.",
  },
  {
    icon: Crown,
    title: "Alpha Presence Score",
    text: "Discover how commanding and magnetic your energy is, and get tips to amplify it.",
  },
  {
    icon: Shirt,
    title: "Outfit & Style Upgrades",
    text: "Specific suggestions on colors, fits, and styles that complement your face and body type.",
  },
  {
    icon: Glasses,
    title: "Shades Recommendations",
    text: "Visual frame-by-frame recommendations matched to your face shape, so you see exactly what suits you.",
  },
  {
    icon: ScanFace,
    title: "Face Orientation Tips",
    text: "Learn the angles, expressions, and grooming tweaks that sharpen your look in any photo.",
  },
  {
    icon: ShieldCheck,
    title: "100% Private",
    text: "Photo analyzed in memory only, never stored, never shared. Zero data kept after your session.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    text: "No login, no waitlist. Upload and get your full Rizz Report in under 30 seconds.",
  },
];

export default function HomePage() {
  return (
    <>
      <FaqSchema items={FAQS} />
      {/* <SkipToContent /> */}
      <Navbar />

      <main id="main-content">
        <AnimatedHero />

        {/* Upload section */}
        <section
          id="upload"
          aria-labelledby="upload-heading"
          className="scroll-mt-20 bg-cream-50 px-4 py-16"
        >
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <h2
                id="upload-heading"
                className="mb-2 text-center text-2xl font-bold text-gray-900"
              >
                Upload Your Photo
              </h2>
              <p className="mb-8 text-center text-sm text-gray-500">
                One selfie is all it takes to unlock your full Rizz Report.
              </p>
            </Reveal>
            <ImageUploader />
          </div>
        </section>

        {/* How it works */}
        <section
          aria-labelledby="how-it-works"
          className="border-t border-gray-100 bg-white px-4 py-16"
        >
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2
                id="how-it-works"
                className="text-center text-2xl font-bold text-gray-900 sm:text-3xl"
              >
                How Rizz Assist Works
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-500">
                Four steps from photo to full-on swagger.
              </p>
            </Reveal>

            <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.08}>
                  <li className="relative h-full rounded-2xl border border-gray-100 bg-cream-50 p-6 transition-shadow hover:shadow-md">
                    <span className="absolute -top-3.5 left-5 flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 text-xs font-bold text-white shadow-sm">
                      {i + 1}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600/10">
                      <step.icon
                        className="h-5 w-5 text-brand-600"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
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

        {/* Benefits */}
        <section aria-labelledby="benefits" className="bg-cream-50 px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2
                id="benefits"
                className="text-center text-2xl font-bold text-gray-900 sm:text-3xl"
              >
                Why Rizz Assist Hits Different
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-500">
                Everything you need to glow up, in one instant, AI-powered
                report.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {BENEFITS.map((benefit, i) => (
                <Reveal key={benefit.title} delay={(i % 4) * 0.07}>
                  <article className="h-full rounded-2xl border border-gray-100 bg-white p-5 transition-shadow hover:shadow-md">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-900">
                      <benefit.icon
                        className="h-5 w-5 text-brand-400"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-gray-900">
                      {benefit.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                      {benefit.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          aria-labelledby="faq-heading"
          className="border-t border-gray-100 bg-white px-4 py-16"
        >
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2
                id="faq-heading"
                className="text-center text-2xl font-bold text-gray-900 sm:text-3xl"
              >
                Frequently Asked Questions
              </h2>
            </Reveal>

            <div className="mt-10 space-y-2">
              {FAQS.map((faq, i) => (
                <Reveal key={faq.question} delay={i * 0.05}>
                  <details className="group rounded-xl border border-gray-100 bg-cream-50 p-5 open:border-brand-200 open:bg-white transition-colors">
                    <summary className="cursor-pointer list-none text-sm font-semibold text-gray-900 marker:hidden">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-gray-500">
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
