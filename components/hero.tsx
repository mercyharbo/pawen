"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type HeroProps = {
  nominationsUrl: string;
  ticketsUrl: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Hero({ nominationsUrl, ticketsUrl }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.8], [0.5, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[calc(100svh-5rem)] overflow-hidden bg-background text-foreground"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: reduceMotion ? 0 : imageY }}
      >
        <Image
          src="/images/pawen-hero.png"
          alt="Elegant PAWEN Awards and Summit atmosphere"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,rgba(5,5,5,0.94)_28%,rgba(5,5,5,0.58)_58%,rgba(5,5,5,0.28)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(212,175,55,0.22),transparent_32%),radial-gradient(circle_at_18%_72%,rgba(184,138,68,0.16),transparent_30%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <motion.div
        aria-hidden="true"
        className="absolute right-[8%] top-[18%] hidden h-72 w-72 rounded-full border border-premium-gold/20 lg:block"
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: 360,
                scale: [1, 1.04, 1],
              }
        }
        transition={{
          rotate: { duration: 34, repeat: Infinity, ease: "linear" },
          scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute right-[18%] top-[30%] hidden h-44 w-px bg-gradient-to-b from-transparent via-champagne-gold/70 to-transparent lg:block"
        animate={reduceMotion ? undefined : { opacity: [0.2, 0.85, 0.2] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-0 top-24 h-px w-full bg-gradient-to-r from-transparent via-premium-gold/35 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative z-10 flex w-full justify-center px-5 py-16 sm:px-8 lg:px-10">
        <motion.div
          className="flex w-full max-w-7xl flex-col justify-center gap-10"
          style={{ y: reduceMotion ? 0 : textY }}
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.16, delayChildren: 0.12 }}
        >
          <div className="flex max-w-4xl flex-col gap-8">
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3 text-sm text-champagne-gold"
            >
              <span>Lusaka, Zambia</span>
              <span className="h-px w-10 bg-premium-gold/60" />
              <span>13-14 November 2026</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl font-serif text-[4.25rem] leading-[0.88] text-foreground sm:text-[5.25rem] md:text-[6rem] lg:text-[5.75rem] xl:text-[6.5rem] 2xl:text-[7rem] min-[1920px]:text-[7.5rem]"
            >
              The PAWEN Awards & Summit 2026
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl text-lg leading-8 text-muted-beige sm:text-xl"
            >
              Africa&apos;s largest awards and leadership summit for women in
              business, leadership and impact.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href={nominationsUrl}
                className="group relative overflow-hidden bg-premium-gold px-6 py-3 text-sm font-semibold text-background transition-colors duration-300 hover:bg-champagne-gold"
              >
                <span className="relative z-10">Nominations</span>
                <span className="absolute inset-y-0 left-0 w-8 -translate-x-10 bg-white/35 blur-md transition-transform duration-700 group-hover:translate-x-40" />
              </Link>
              <Link
                href={ticketsUrl}
                className="border border-premium-gold/55 px-6 py-3 text-sm font-semibold text-champagne-gold transition-colors duration-300 hover:border-champagne-gold hover:bg-premium-gold hover:text-background"
              >
                Tickets
              </Link>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="grid max-w-3xl grid-cols-3 gap-px border border-premium-gold/20 bg-premium-gold/20 text-sm"
          >
            {[
              ["01", "Leadership Summit"],
              ["02", "Trade Exhibition"],
              ["03", "Awards Gala"],
            ].map(([number, label]) => (
              <div key={label} className="flex flex-col gap-3 bg-background/78 p-4 backdrop-blur">
                <span className="font-serif text-2xl text-premium-gold">{number}</span>
                <span className="text-muted-beige">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-16 right-10 hidden h-32 w-32 rounded-full bg-premium-gold/20 blur-3xl lg:block"
        style={{ opacity: glowOpacity }}
      />
    </section>
  );
}
