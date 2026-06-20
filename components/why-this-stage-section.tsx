"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const outcomes = [
  ["Financing", "A future where the $42 billion financing gap for African women is closed."],
  ["Leadership", "A future where senior leadership is no longer limited to fewer than one in four positions."],
  ["Ownership", "A future where the women who sustain economies also own and lead them."],
  ["Ripple effect", "A future where one woman's progress creates opportunity for many others."],
];

const reveal = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function WhyThisStageSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const atmosphereY = useTransform(scrollYProgress, [0, 1], ["-4%", "7%"]);
  const ruleScale = useTransform(scrollYProgress, [0.14, 0.48], [0, 1]);

  return (
    <section
      className="relative isolate overflow-hidden bg-background px-5 py-28 text-foreground sm:px-8 lg:px-10 lg:py-36"
      id="why-this-stage"
      ref={sectionRef}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,var(--soft-black)_0%,var(--background)_44%,var(--soft-black)_100%),radial-gradient(circle_at_82%_24%,rgba(232,200,114,0.11),transparent_30%)]"
        style={{ y: reduceMotion ? 0 : atmosphereY }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-16 h-px w-full origin-left bg-gradient-to-r from-transparent via-premium-gold/42 to-transparent"
        style={{ scaleX: reduceMotion ? 1 : ruleScale }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16">
        <motion.div
          className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-20"
          initial="hidden"
          transition={{ staggerChildren: 0.14 }}
          viewport={{ once: true, amount: 0.35 }}
          whileInView="visible"
        >
          <motion.div className="grid gap-5" variants={reveal}>
            <p className="text-sm uppercase tracking-[0.32em] text-champagne-gold">
              Why this stage matters
            </p>
            <h2 className="font-serif text-4xl leading-[1.02] text-foreground sm:text-5xl lg:text-6xl">
              When women are fully at the table, economies become stronger.
            </h2>
          </motion.div>

          <motion.div
            className="grid gap-8 border-l border-premium-gold/18 pl-6 sm:pl-8"
            variants={reveal}
          >
            <p className="max-w-3xl text-lg leading-8 text-muted-beige sm:text-xl sm:leading-9">
              PAWEN exists to move women from potential into power, from
              participation into ownership, and from isolated success into
              shared economic transformation.
            </p>
            <p className="max-w-2xl font-serif text-3xl leading-tight text-foreground sm:text-4xl">
              The award is a signal. The ecosystem is the opportunity.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid border-y border-premium-gold/18 lg:grid-cols-4"
          initial="hidden"
          transition={{ staggerChildren: 0.08, delayChildren: 0.12 }}
          viewport={{ once: true, amount: 0.25 }}
          whileInView="visible"
        >
          {outcomes.map(([title, copy], index) => (
            <motion.div
              className={`grid min-h-52 content-between gap-9 py-8 lg:px-7 ${
                index === 0
                  ? ""
                  : "border-t border-premium-gold/18 lg:border-l lg:border-t-0"
              }`}
              key={title}
              variants={reveal}
            >
              <span className="font-serif text-3xl text-premium-gold">
                0{index + 1}
              </span>
              <div className="grid gap-4">
                <h3 className="font-serif text-3xl leading-tight text-foreground">
                  {title}
                </h3>
                <p className="text-sm leading-7 text-muted-beige">{copy}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
