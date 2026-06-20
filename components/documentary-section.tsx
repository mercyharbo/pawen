"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

type DocumentarySectionProps = {
  videoUrl: string;
  embedUrl: string;
};

const reveal = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function DocumentarySection({
  videoUrl,
  embedUrl,
}: DocumentarySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const atmosphereY = useTransform(scrollYProgress, [0, 1], ["-5%", "7%"]);
  const ruleScale = useTransform(scrollYProgress, [0.12, 0.48], [0, 1]);

  return (
    <section
      className="relative isolate overflow-hidden bg-soft-black px-5 py-28 text-foreground sm:px-8 lg:px-10 lg:py-36"
      id="documentary"
      ref={sectionRef}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_22%_28%,rgba(212,175,55,0.11),transparent_30%),linear-gradient(180deg,var(--background)_0%,var(--soft-black)_58%,var(--background)_100%)]"
        style={{ y: reduceMotion ? 0 : atmosphereY }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-16 h-px w-full origin-left bg-gradient-to-r from-transparent via-premium-gold/42 to-transparent"
        style={{ scaleX: reduceMotion ? 1 : ruleScale }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-14">
        <motion.div
          className="grid gap-9 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-20"
          initial="hidden"
          transition={{ staggerChildren: 0.14 }}
          viewport={{ once: true, amount: 0.35 }}
          whileInView="visible"
        >
          <motion.div className="grid gap-5" variants={reveal}>
            <p className="text-sm uppercase tracking-[0.32em] text-champagne-gold">
              PAWEN documentary
            </p>
            <h2 className="font-serif text-4xl leading-[1.02] text-foreground sm:text-5xl lg:text-6xl">
              A story of empowerment and impact.
            </h2>
          </motion.div>

          <motion.div
            className="grid gap-6 border-l border-premium-gold/18 pl-6 sm:pl-8"
            variants={reveal}
          >
            <p className="max-w-3xl text-lg leading-8 text-muted-beige sm:text-xl sm:leading-9">
              Watch the inspiring story of PAWEN. Discover the vision that
              drives the network, the milestones already achieved and the
              transformative moments shaping its mission to uplift African women
              globally.
            </p>
            <Link
              href={videoUrl}
              className="w-fit text-sm font-semibold text-champagne-gold underline decoration-premium-gold/40 underline-offset-8 transition-colors duration-300 hover:text-foreground"
            >
              Watch on YouTube
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative overflow-hidden border border-premium-gold/18 bg-background shadow-[0_2rem_5rem_rgba(0,0,0,0.3)]"
          initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.2 }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(232,200,114,0.12),transparent_26%)]" />
          <div className="relative aspect-video">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              referrerPolicy="strict-origin-when-cross-origin"
              src={embedUrl}
              title="PAWEN documentary"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
