import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ShieldCheck, Zap } from "lucide-react";

/** CSS-only hero, keeps framer-motion off the LCP path. */
export function AnimatedHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative -mt-14 overflow-x-clip overflow-y-hidden bg-ink-900 pt-14 sm:-mt-16 sm:pt-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-brand-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1280px] items-end gap-4 px-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-8">
        {/* Image left — flush to bottom, height capped to stop overflow */}
        <figure className="relative order-1 mx-auto mb-0 w-full min-w-0 max-w-[280px] self-end sm:max-w-[320px] lg:max-w-none lg:justify-self-start">
          <Image
            src="/hero-silhouette.png"
            alt="Stylized silhouette with red rim light, Rizz Assist hero"
            width={340}
            height={640}
            sizes="(max-width: 1024px) 70vw, 440px"
            priority
            fetchPriority="high"
            quality={85}
            className="mx-auto block h-auto max-h-[min(87vh,640px)] w-full object-contain object-bottom"
          />
        </figure>

        {/* Text + buttons right */}
        <div className="order-2 min-w-0 self-center py-6 text-center sm:py-8 lg:py-10 lg:text-left">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand-400 uppercase">
            Rizz Assist
          </p>

          <h1
            id="hero-heading"
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
          >
            Your look is talking.{" "}
            <span className="gold-text">
              Make sure it says the right thing.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg lg:mx-0">
            Drop a clear selfie. You get straight talk on fit, grooming, and
            vibe, plus openers that sound like you, not a script someone stole
            from a group chat.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="#upload"
              className="group inline-flex items-center gap-2 rounded-xl bg-brand-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/30 transition-all duration-200 hover:bg-brand-500 hover:shadow-brand-500/40"
            >
              Upload your photo
              <ArrowDown
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
            <Link
              href="/personality-test"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white transition duration-200 hover:bg-white/10"
            >
              Try a personality check
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <span className="flex items-center gap-1.5 text-xs text-white/55">
              <ShieldCheck
                className="h-3.5 w-3.5 text-brand-400"
                aria-hidden="true"
              />
              Photo stays in memory, never stored
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/55">
              <Zap className="h-3.5 w-3.5 text-brand-400" aria-hidden="true" />
              Results in seconds, no waitlist
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
