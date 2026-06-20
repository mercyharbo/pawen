"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const partnerReasons = [
  {
    title: "Association",
    copy: "Stand with a platform built around women's leadership, enterprise and measurable impact.",
  },
  {
    title: "Access",
    copy: "Enter a room of founders, executives, policy voices, investors and community builders.",
  },
  {
    title: "Legacy",
    copy: "Attach your brand to a continental story that extends beyond one event cycle.",
  },
];

type SponsorsPartnersSectionProps = {
  ticketsUrl: string;
};

const reveal = {
  hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function SponsorsPartnersSection({
  ticketsUrl,
}: SponsorsPartnersSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-5%", "8%"]);

  return (
    <section
      className="relative isolate overflow-hidden bg-soft-black px-5 py-28 text-foreground sm:px-8 lg:px-10 lg:py-36"
      id="sponsors"
      ref={sectionRef}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(212,175,55,0.12),transparent_28%),linear-gradient(120deg,transparent_0%,rgba(232,200,114,0.07)_45%,transparent_68%)]"
        style={{ y: reduceMotion ? 0 : backgroundY }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-premium-gold/42 to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16">
        <motion.div
          className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-20"
          initial="hidden"
          transition={{ staggerChildren: 0.14 }}
          viewport={{ once: true, amount: 0.32 }}
          whileInView="visible"
        >
          <motion.div className="grid gap-8" variants={reveal}>
            <p className="text-sm uppercase tracking-[0.32em] text-champagne-gold">
              Sponsors & partners
            </p>
            <h2 className="max-w-4xl font-serif text-4xl leading-[1.02] text-foreground sm:text-5xl lg:text-6xl">
              Partner with the women shaping Africa&apos;s next chapter.
            </h2>
          </motion.div>

          <motion.div className="grid gap-9 lg:pt-20" variants={reveal}>
            <p className="text-lg leading-8 text-muted-beige sm:text-xl sm:leading-9">
              PAWEN gives brands, institutions and ecosystem partners a
              credible way to stand beside women who are building companies,
              leading sectors and strengthening communities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="mailto:partnerships@pawenawards.com"
                className="border border-champagne-gold/60 bg-premium-gold px-7 py-3.5 text-sm font-semibold text-background shadow-[0_1.25rem_3rem_rgba(212,175,55,0.14)] transition-all duration-300 hover:border-champagne-gold hover:bg-champagne-gold"
              >
                Partner with PAWEN
              </Link>
              <Link
                href={ticketsUrl}
                className="border border-premium-gold/45 px-7 py-3.5 text-sm font-semibold text-champagne-gold transition-all duration-300 hover:border-champagne-gold hover:bg-premium-gold hover:text-background"
              >
                Attend the summit
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid border-y border-premium-gold/18 lg:grid-cols-3"
          initial="hidden"
          transition={{ staggerChildren: 0.1, delayChildren: 0.12 }}
          viewport={{ once: true, amount: 0.25 }}
          whileInView="visible"
        >
          {partnerReasons.map((reason, index) => (
            <motion.div
              className={`grid min-h-60 content-between gap-10 py-8 lg:px-8 ${
                index === 0
                  ? ""
                  : "border-t border-premium-gold/18 lg:border-l lg:border-t-0"
              }`}
              key={reason.title}
              variants={reveal}
            >
              <span className="font-serif text-4xl leading-none text-premium-gold">
                0{index + 1}
              </span>
              <div className="grid gap-4">
                <h3 className="font-serif text-4xl leading-none text-foreground">
                  {reason.title}
                </h3>
                <p className="max-w-sm text-sm leading-7 text-muted-beige">
                  {reason.copy}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
