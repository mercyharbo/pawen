"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const details = [
  ["Competence", "Business and leadership capacity"],
  ["Confidence", "Voice, ambition and self-belief"],
  ["Connections", "Networks that create opportunity"],
];

const fadeIn = {
  hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ruleScale = useTransform(scrollYProgress, [0.12, 0.46], [0, 1]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["8%", "-10%"]);
  const panelY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section
      className="relative isolate overflow-hidden bg-background px-5 py-28 text-foreground sm:px-8 lg:px-10 lg:py-36"
      id="about"
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--background)_0%,var(--soft-black)_48%,var(--background)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_14%,rgba(212,175,55,0.1),transparent_28%),radial-gradient(circle_at_12%_82%,rgba(232,200,114,0.07),transparent_24%)]" />
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-16 h-px w-full origin-left bg-gradient-to-r from-premium-gold/0 via-premium-gold/42 to-premium-gold/0"
        style={{ scaleX: reduceMotion ? 1 : ruleScale }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <motion.div
          className="grid gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ staggerChildren: 0.14 }}
        >
          <motion.div className="grid gap-5" variants={fadeIn}>
            <p className="text-sm text-champagne-gold">Mission & vision</p>
            <h2 className="max-w-3xl font-serif text-4xl leading-[1.08] text-foreground sm:text-[2.75rem] lg:text-[3rem] xl:text-[3.125rem] 2xl:text-[3.125rem] min-[1920px]:text-[3.5rem]">
              Building the ecosystem African women need to lead and succeed.
            </h2>
          </motion.div>

          <motion.p
            className="max-w-2xl text-lg leading-8 text-muted-beige sm:text-xl sm:leading-9"
            variants={fadeIn}
          >
            PAWEN&apos;s mission is to build an ecosystem that equips African
            women with the competence, confidence and connections to lead and
            succeed in business and careers. This is not just about individual
            success. It is about a ripple effect where one woman&apos;s achievement
            opens opportunities for others.
          </motion.p>

          <motion.div
            className="grid gap-px border border-premium-gold/16 bg-premium-gold/16 shadow-[0_2rem_4rem_rgba(0,0,0,0.2)] sm:grid-cols-3 lg:max-w-3xl"
            variants={fadeIn}
          >
            {details.map(([label, value]) => (
              <div
                className="grid min-h-32 content-between gap-5 bg-background/88 p-6"
                key={label}
              >
                <span className="text-sm text-soft-gray">{label}</span>
                <span className="font-serif text-2xl leading-tight text-champagne-gold">
                  {value}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative min-h-[34rem] overflow-hidden border border-premium-gold/16 bg-charcoal shadow-[0_2.5rem_6rem_rgba(0,0,0,0.35)]"
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: reduceMotion ? 0 : panelY }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-champagne-gold/50 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.14),transparent_34%),linear-gradient(135deg,rgba(212,175,55,0.1),transparent_38%)]"
            style={{ y: reduceMotion ? 0 : portraitY }}
          />
          <div className="absolute inset-8 border border-premium-gold/8" />
          <div className="relative flex min-h-[34rem] flex-col justify-end gap-10 p-8 sm:p-10 lg:p-12">
            <div className="grid max-w-md gap-6">
              <p className="text-sm uppercase tracking-[0.28em] text-champagne-gold">
                Our vision
              </p>
              <p className="font-serif text-3xl leading-[1.12] text-foreground sm:text-[2.125rem] lg:text-[2.375rem] xl:text-[2.625rem] 2xl:text-[2.875rem] min-[1920px]:text-[3.125rem]">
                A world where every African woman is inspired and empowered to
                maximise her potential.
              </p>
              <p className="text-sm leading-7 text-muted-beige">
                A future where the women who sustain economies also own, lead
                and transform them.
              </p>
            </div>
            <figure className="grid gap-4 border-l border-premium-gold/30 pl-5">
              <blockquote className="font-serif text-2xl leading-tight text-foreground">
                &ldquo;For us, it is really about helping women to maximise their
                potential.&rdquo;
              </blockquote>
              <figcaption className="text-sm leading-6 text-muted-beige">
                Oluwaseyi Kehinde-Peters, Founder, PAWEN
              </figcaption>
            </figure>
            <div className="grid grid-cols-3 gap-px bg-premium-gold/16 text-center">
              {["Mission", "Vision", "Impact"].map((item) => (
                <span
                  className="bg-background/82 px-3 py-5 text-sm text-muted-beige"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
