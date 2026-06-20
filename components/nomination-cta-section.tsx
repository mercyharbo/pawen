"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

type NominationCtaSectionProps = {
  nominationsUrl: string;
  ticketsUrl: string;
};

const paths = [
  ["Nominate", "Put forward a woman whose work deserves continental recognition."],
  ["Attend", "Join the summit, exhibition and awards gala in Lusaka."],
  ["Partner", "Align your institution with a platform built for legacy."],
];

export function NominationCtaSection({
  nominationsUrl,
  ticketsUrl,
}: NominationCtaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [0.1, 0.26, 0.08]);
  const lineScale = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <section
      className="relative isolate overflow-hidden bg-background px-5 py-28 text-foreground sm:px-8 lg:px-10 lg:py-36"
      id="nominate"
      ref={sectionRef}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(212,175,55,0.16),transparent_32%),linear-gradient(180deg,var(--background)_0%,var(--soft-black)_100%)]"
        style={{ opacity: reduceMotion ? 0.18 : glowOpacity }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-16 h-px w-full origin-left bg-gradient-to-r from-transparent via-premium-gold/44 to-transparent"
        style={{ scaleX: reduceMotion ? 1 : lineScale }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-14">
        <motion.div
          className="grid gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-end lg:gap-20"
          initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.35 }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        >
          <div className="grid gap-7">
            <p className="text-sm uppercase tracking-[0.32em] text-champagne-gold">
              The invitation
            </p>
            <h2 className="max-w-5xl font-serif text-5xl leading-[1] text-foreground sm:text-6xl lg:text-7xl">
              The next woman celebrated on this stage may already be building
              the future.
            </h2>
          </div>

          <div className="grid gap-8 border-l border-premium-gold/18 pl-6 sm:pl-8">
            <p className="text-lg leading-8 text-muted-beige sm:text-xl sm:leading-9">
              Nominate her. Join her. Stand beside the movement that is making
              women&apos;s leadership more visible, connected and enduring.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={nominationsUrl}
                className="border border-champagne-gold/60 bg-premium-gold px-7 py-3.5 text-sm font-semibold text-background shadow-[0_1.25rem_3rem_rgba(212,175,55,0.16)] transition-all duration-300 hover:border-champagne-gold hover:bg-champagne-gold"
              >
                Start a nomination
              </Link>
              <Link
                href={ticketsUrl}
                className="border border-premium-gold/45 px-7 py-3.5 text-sm font-semibold text-champagne-gold transition-all duration-300 hover:border-champagne-gold hover:bg-premium-gold hover:text-background"
              >
                Get tickets
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid border-y border-premium-gold/18 lg:grid-cols-3"
          initial={{ opacity: 0, y: 28 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.25 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {paths.map(([title, copy], index) => (
            <div
              className={`grid min-h-44 content-between gap-8 py-7 lg:px-8 ${
                index === 0
                  ? ""
                  : "border-t border-premium-gold/18 lg:border-l lg:border-t-0"
              }`}
              key={title}
            >
              <span className="font-serif text-3xl text-premium-gold">
                0{index + 1}
              </span>
              <div className="grid gap-3">
                <h3 className="font-serif text-3xl leading-tight text-foreground">
                  {title}
                </h3>
                <p className="text-sm leading-7 text-muted-beige">{copy}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
