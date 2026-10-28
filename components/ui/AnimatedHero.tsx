import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowDown, ShieldCheck, Zap } from "lucide-react";

/** CSS-only hero motion, keeps framer-motion off the LCP path. */
export function AnimatedHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-ink-50 dark:bg-ink-900"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 -top-16 h-96 w-96 rounded-full bg-brand-600/10 blur-3xl animate-blob dark:bg-brand-600/10" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-brand-400/10 blur-3xl animate-blob [animation-delay:4s]" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 rounded-full bg-ink-200/60 blur-3xl animate-blob [animation-delay:8s] dark:bg-ink-700/60" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-10 sm:py-18 lg:grid-cols-2">
        <div className="animate-fade-in-up text-center motion-reduce:animate-none lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-600/30 bg-brand-600/10 px-3 py-1 text-xs font-medium text-brand-700 backdrop-blur dark:text-brand-400">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            AI Rizz Coach &middot; Free. No login.
          </span>

          <h1
            id="hero-heading"
            className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl lg:text-6xl dark:text-white"
          >
            Boost Your <span className="gold-text">Rizz</span> with AI
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-ink-700 sm:text-lg lg:mx-0 dark:text-white/65">
            Upload a photo, get personalized pickup lines, style upgrades, shade
            recommendations, and confidence tips tailored to your look.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="#upload"
              className="group inline-flex items-center gap-2 rounded-xl bg-brand-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-500 hover:shadow-brand-500/30"
            >
              Get Your Rizz Report
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="/personality-test"
              className="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white/80 px-6 py-3.5 font-semibold text-ink-800 transition hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white"
            >
              Start Personality Test
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <span className="flex items-center gap-1.5 text-xs text-ink-500 dark:text-white/45">
              <ShieldCheck
                className="h-3.5 w-3.5 text-brand-500"
                aria-hidden="true"
              />
              100% private, photo never stored
            </span>
            <span className="flex items-center gap-1.5 text-xs text-ink-500 dark:text-white/45">
              <Zap className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
              Instant results, no waitlist
            </span>
          </div>
        </div>

        <figure className="animate-fade-in-up relative mx-auto w-full max-w-xl motion-reduce:animate-none [animation-delay:120ms] lg:max-w-none lg:w-[112%] lg:justify-self-end">
          <div className="animate-float motion-reduce:animate-none">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-tr from-brand-600/20 to-brand-400/10 blur-2xl" />
            <Image
              src="/hero.jpg"
              alt="Rizz Assist AI rizz coach showing pickup lines, style tips, and look analysis from a photo"
              width={1152}
              height={864}
              sizes="(max-width: 1024px) 92vw, 620px"
              priority
              fetchPriority="high"
              quality={75}
              className="relative aspect-[4/3] w-full rounded-[1.75rem] border border-ink-200/60 object-cover shadow-xl shadow-ink-300/20 dark:border-white/10 dark:shadow-2xl dark:shadow-black/50"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
