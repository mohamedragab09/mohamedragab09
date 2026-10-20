"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, SearchX } from "lucide-react";

export default function Page
() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-foreground px-6 py-16 text-text-soft">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-cyan/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-accent-orange/10 blur-[100px]" />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center"
      >
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-accent-cyan/20 bg-accent-cyan/10 text-primary">
          <SearchX size={32} />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Page Not Found
        </p>

        <h1 className="text-8xl font-black tracking-tighter sm:text-9xl">
          <span className="bg-linear-to-r from-primary to-accent-orange bg-clip-text text-transparent">
            404
          </span>
        </h1>

        <h2 className="mt-6 text-2xl font-bold sm:text-3xl">
          Looks like you&apos;re lost.
        </h2>

        <p className="mt-4 max-w-md text-sm leading-7 text-white/60 sm:text-base">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back to exploring my portfolio.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3 font-semibold text-dark-bg transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-cyan/20"
        >
          <Home size={18} />
          Back to Home
          <ArrowLeft size={16} />
        </Link>

        <p className="mt-10 text-xs text-white/30">
          404 · Nothing to see here
        </p>
      </motion.section>
    </main>
  );
}
