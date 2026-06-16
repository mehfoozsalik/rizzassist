"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowDown, ShieldCheck, Zap } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function AnimatedHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-ink-900"
    >
      {/* Subtle ambient blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 -top-16 h-96 w-96 rounded-full bg-brand-600/10 blur-3xl animate-blob" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-brand-400/8 blur-3xl animate-blob [animation-delay:4s]" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 rounded-full bg-ink-700/60 blur-3xl animate-blob [animation-delay:8s]" />
      </div>

      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-10 sm:py-18 lg:grid-cols-2">
        {/* Text column */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-600/30 bg-brand-600/10 px-3 py-1 text-xs font-medium text-brand-400 backdrop-blur"
          >
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            Free AI Rizz Coach &middot; No Login Required
          </motion.span>

          <motion.h1
            variants={item}
            id="hero-heading"
            className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Unlock Your <span className="gold-text">Inner Rizz</span>
            <br />
            <span className="text-white/90">with AI.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-white/60 sm:text-lg lg:mx-0"
          >
            Upload a photo to get personalized pickup lines, style upgrades,
            shade recommendations, and confidence tips built around your look.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <a
              href="#upload"
              className="group inline-flex items-center gap-2 rounded-xl bg-brand-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-500 hover:shadow-brand-500/30"
            >
              Get Your Rizz Report
              <ArrowDown
                className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <span className="flex items-center gap-1.5 text-xs text-white/40">
              <ShieldCheck
                className="h-3.5 w-3.5 text-brand-500"
                aria-hidden="true"
              />
              100% private, photo never stored
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/40">
              <Zap className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
              Instant results, no waitlist
            </span>
          </motion.div>
        </motion.div>

        {/* Hero image column */}
        <motion.figure
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="animate-float">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-brand-600/20 to-brand-400/10 blur-2xl" />
            <Image
              src="/hero.png"
              alt="Rizz Assist AI analyzing a confident person's photo with rizz score, pickup line, and shades suggestions"
              width={1024}
              height={683}
              priority
              className="relative rounded-[1.75rem] border border-white/10 shadow-2xl shadow-black/50"
            />
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
