"use client";

import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  nominationsUrl: string;
  ticketsUrl: string;
};

export function Hero({ nominationsUrl, ticketsUrl }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const revealTransition = {
    duration: 1.15,
    ease: [0.22, 1, 0.36, 1],
  } as const;

  return (
    <section className="relative isolate flex min-h-[calc(115svh-7.875rem)] overflow-hidden bg-background text-foreground">
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { opacity: 0.68, scale: 1.04 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={revealTransition}
        aria-hidden="true"
      >
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
        animate={reduceMotion ? undefined : { opacity: 0.95, scale: 1 }}
        transition={revealTransition}
        aria-hidden="true"
      >
        <Image
          src="/images/hero-overlay.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-background/30"
        initial={reduceMotion ? false : { opacity: 0.78 }}
        animate={reduceMotion ? undefined : { opacity: 1 }}
        transition={revealTransition}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0 shadow-[inset_0_0_10rem_var(--color-background)] opacity-80"
        initial={reduceMotion ? false : { opacity: 0.3 }}
        animate={reduceMotion ? undefined : { opacity: 0.8 }}
        transition={revealTransition}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1905px] items-center justify-center px-5 py-20 text-center sm:px-8 lg:px-10">
        <motion.div
          className="flex max-w-4xl flex-col items-center gap-8"
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 18, scale: 0.985, filter: "blur(12px)" }
          }
          animate={
            reduceMotion
              ? undefined
              : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          }
          transition={revealTransition}
        >
          <div className="flex flex-col items-center gap-5">
            <p className="font-sans text-lg font-normal leading-8 text-muted-foreground">
              The PAWEN Awards &amp; Summit 2026
            </p>
            <h1 className="max-w-3xl font-brand text-4xl font-bold leading-tight text-accent sm:text-5xl lg:text-3xl xl:text-5xl 2xl:text-6xl 3xl:text-6xl">
              Africa&apos;s Stage for the Women Shaping Its Future
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              className="h-12 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <Link href={nominationsUrl}>Nomination</Link>
            </Button>
            <Button
              asChild
              className="h-12 rounded-full bg-accent px-8 text-sm font-medium text-accent-foreground hover:bg-accent/90"
            >
              <Link href={ticketsUrl}>Get Tickets</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
