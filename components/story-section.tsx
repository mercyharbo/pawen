"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const pillars = [
  {
    number: "01",
    title: "Competence",
    copy: "Equipping women with the knowledge and capacity to lead with substance.",
  },
  {
    number: "02",
    title: "Confidence",
    copy: "Helping African women recognise their power and maximise their potential.",
  },
  {
    number: "03",
    title: "Connections",
    copy: "Building the relationships that open rooms, markets and opportunities.",
  },
];

type StorySectionProps = {
  supportUrl: string;
};

const reveal = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function StorySection({ supportUrl }: StorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const atmosphereY = useTransform(scrollYProgress, [0, 1], ["-5%", "8%"]);
  const ruleScale = useTransform(scrollYProgress, [0.16, 0.52], [0, 1]);

  return (
    <section
      className="relative isolate overflow-hidden bg-background px-5 py-28 text-foreground sm:px-8 lg:px-10 lg:py-40"
      id="our-story"
      ref={sectionRef}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(212,175,55,0.13),transparent_28%),radial-gradient(circle_at_86%_56%,rgba(184,138,68,0.1),transparent_30%),linear-gradient(180deg,var(--background)_0%,var(--soft-black)_54%,var(--background)_100%)]"
        style={{ y: reduceMotion ? 0 : atmosphereY }}
      />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-background to-transparent" />
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-24 h-px w-full origin-left bg-gradient-to-r from-transparent via-premium-gold/40 to-transparent"
        style={{ scaleX: reduceMotion ? 1 : ruleScale }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16">
        <motion.div
          className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-20"
          initial="hidden"
          transition={{ staggerChildren: 0.14 }}
          viewport={{ once: true, amount: 0.35 }}
          whileInView="visible"
        >
          <motion.div className="grid content-start gap-8" variants={reveal}>
            <div className="flex items-center gap-4 text-sm uppercase tracking-[0.32em] text-champagne-gold">
              <span>Our story</span>
              <span className="h-px w-14 bg-premium-gold/55" />
            </div>
            <h2 className="max-w-4xl font-serif text-3xl leading-[1.08] text-foreground sm:text-3xl lg:text-4xl xl:text-[3.5rem]">
              Empowering African women to lead, succeed and transform the
              systems around them.
            </h2>
          </motion.div>

          <motion.div
            className="grid content-end gap-8 border-l border-premium-gold/18 pl-6 sm:pl-8 lg:pt-24"
            variants={reveal}
          >
            <p className="text-lg leading-8 text-muted-beige sm:text-xl sm:leading-9">
              Pan African Women Empowerment Network is a social enterprise
              equipping African women with the competence, confidence and
              connections they need to become successful business and career
              leaders.
            </p>
            <div className="grid gap-5">
              <p className="font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                The awards are one expression of a bigger movement.
              </p>
              <p className="text-base leading-8 text-muted-beige sm:text-lg">
                PAWEN exists for a future where African women do not just
                succeed within existing systems, they transform them.
              </p>
            </div>
            <Link
              href={supportUrl}
              className="w-fit border border-premium-gold/45 px-6 py-3 text-sm font-semibold text-champagne-gold transition-all duration-300 hover:border-champagne-gold hover:bg-premium-gold hover:text-background"
            >
              Support Our Work
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid border-y border-premium-gold/18 lg:grid-cols-3"
          initial="hidden"
          transition={{ staggerChildren: 0.1, delayChildren: 0.18 }}
          viewport={{ once: true, amount: 0.25 }}
          whileInView="visible"
        >
          {pillars.map((pillar, index) => (
            <motion.div
              className={`group grid min-h-56 content-between gap-10 py-8 sm:min-h-60 sm:py-10 lg:px-8 ${
                index === 0
                  ? ""
                  : "border-t border-premium-gold/18 lg:border-l lg:border-t-0"
              }`}
              key={pillar.title}
              variants={reveal}
            >
              <div className="grid gap-5">
                <span className="font-serif text-4xl leading-none text-premium-gold transition-colors duration-300 group-hover:text-champagne-gold">
                  {pillar.number}
                </span>
                <h3 className="font-serif text-4xl leading-none text-foreground sm:text-5xl">
                  {pillar.title}
                </h3>
              </div>
              <div className="grid gap-5">
                <span className="h-px w-16 bg-premium-gold/55 transition-all duration-300 group-hover:w-24 group-hover:bg-champagne-gold" />
                <p className="max-w-sm text-sm leading-7 text-muted-beige sm:text-base">
                  {pillar.copy}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
