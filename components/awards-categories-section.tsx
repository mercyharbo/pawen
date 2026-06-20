"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const categories = [
  {
    title: "Entrepreneurship Excellence Awards",
    summary:
      "For founders creating strong businesses, new markets and measurable value across the continent.",
    items: [
      "Technology Entrepreneur of the Year",
      "Digital Entrepreneur of the Year",
      "Real Estate Entrepreneur of the Year",
      "Agribusiness Entrepreneur of the Year",
      "Creative Entrepreneur of the Year",
      "Social Impact Entrepreneur of the Year",
      "Emerging Entrepreneur of the Year",
    ],
  },
  {
    title: "Leadership Excellence Awards",
    summary:
      "For women leading teams, boards, products, capital, people and brand influence with distinction.",
    items: [
      "CEO of the Year",
      "Boardroom Leader of the Year",
      "Finance Leader of the Year",
      "Technology Leader of the Year",
      "People Leader of the Year",
      "Product Leader of the Year",
      "Brand Leader of the Year",
    ],
  },
  {
    title: "Impact Leadership Awards",
    summary:
      "For leaders whose work improves systems, communities, investment access and public outcomes.",
    items: [
      "Public Service Leader of the Year",
      "Health Leader of the Year",
      "Education Leader of the Year",
      "Innovation Leader of the Year",
      "Investor of the Year",
      "Economic Empowerment Leader of the Year",
    ],
  },
];

export function AwardsCategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-6%", "8%"]);
  const activeCategory = categories[activeIndex];

  return (
    <section
      className="relative isolate overflow-hidden bg-soft-black px-5 py-28 text-foreground sm:px-8 lg:px-10 lg:py-36"
      id="award-categories"
      ref={sectionRef}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(212,175,55,0.07)_36%,transparent_62%)]"
        style={{ y: reduceMotion ? 0 : backgroundY }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-premium-gold/42 to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16">
        <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.div
            className="grid gap-4"
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm text-champagne-gold">
              PAWENpreneur Awards
            </p>
            <h2 className="font-serif text-4xl leading-[1.02] text-foreground sm:text-5xl lg:text-6xl">
              Celebrating excellence across the continent.
            </h2>
          </motion.div>
          <motion.div
            className="grid max-w-2xl gap-5 text-lg leading-8 text-muted-beige sm:text-xl sm:leading-9 lg:justify-self-end"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>
              The PAWENpreneur Awards is the flagship annual recognition
              programme of PAWEN, celebrating African women whose vision,
              leadership and impact are shaping the continent.
            </p>
            <p className="text-base leading-7 text-soft-gray sm:text-lg sm:leading-8">
              Established in 2023 to spotlight excellence across business and
              career, the awards honour founders, intrapreneurs and leaders of
              African descent across the continent and diaspora.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="grid gap-px border-y border-premium-gold/18 bg-premium-gold/18 lg:grid-cols-3"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {[
            ["Summit", "Leadership conversations and ecosystem connection."],
            ["Exhibition", "A platform for visibility, products and enterprise."],
            ["Awards Gala", "A night of recognition at MICC in Zambia."],
          ].map(([title, copy]) => (
            <div
              className="grid min-h-36 content-between gap-5 bg-soft-black px-0 py-6 lg:px-7"
              key={title}
            >
              <h3 className="font-serif text-3xl leading-tight text-foreground">
                {title}
              </h3>
              <p className="max-w-sm text-sm leading-7 text-muted-beige">
                {copy}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="grid gap-6 lg:hidden">
          {categories.map((category, index) => (
            <motion.article
              className="overflow-hidden border border-premium-gold/16 bg-background shadow-[0_1.5rem_4rem_rgba(0,0,0,0.22)]"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              key={category.title}
              transition={{
                duration: 0.75,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, amount: 0.18 }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            >
              <div className="grid gap-5 border-b border-premium-gold/14 p-6">
                <span className="font-serif text-3xl leading-none text-champagne-gold">
                  0{index + 1}
                </span>
                <div className="grid gap-3">
                  <h3 className="font-serif text-3xl leading-tight text-foreground">
                    {category.title}
                  </h3>
                  <p className="text-sm leading-6 text-muted-beige">
                    {category.summary}
                  </p>
                </div>
              </div>

              <div className="grid gap-px bg-premium-gold/12">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    className="min-h-24 bg-soft-black p-5"
                    initial={{ opacity: 0, x: -18 }}
                    key={item}
                    transition={{
                      duration: 0.45,
                      delay: itemIndex * 0.035,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                    whileInView={{ opacity: 1, x: 0 }}
                  >
                    <div className="flex h-full flex-col justify-between gap-4">
                      <span className="text-sm leading-6 text-muted-beige">
                        {item}
                      </span>
                      <span className="h-px w-10 bg-premium-gold/50" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="hidden gap-8 lg:grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-px border border-premium-gold/16 bg-premium-gold/16 shadow-[0_2rem_5rem_rgba(0,0,0,0.24)]">
            {categories.map((category, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.button
                  className={`group grid min-h-56 gap-6 p-7 text-left transition-all duration-500 ${
                    isActive
                      ? "bg-premium-gold text-background shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]"
                      : "bg-background/92 text-foreground hover:bg-charcoal/95"
                  }`}
                  initial={{ opacity: 0, x: -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.75,
                    delay: index * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  key={category.title}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  type="button"
                >
                  <span
                    className={`font-serif text-3xl leading-none ${
                      isActive ? "text-background" : "text-champagne-gold"
                    }`}
                  >
                    0{index + 1}
                  </span>
                  <span className="grid gap-3">
                    <span className="font-serif text-3xl leading-tight">
                      {category.title}
                    </span>
                    <span
                      className={`text-sm leading-6 ${
                        isActive ? "text-background/75" : "text-muted-beige"
                      }`}
                    >
                      {category.summary}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            className="relative overflow-hidden border border-premium-gold/16 bg-background p-6 shadow-[0_2rem_5rem_rgba(0,0,0,0.22)] sm:p-8 lg:p-11"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_16%,rgba(212,175,55,0.12),transparent_30%)]" />
            <div className="relative grid gap-12">
              <div className="grid gap-3">
                <motion.p
                  className="text-sm text-champagne-gold"
                  key={`${activeCategory.title}-label`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  Current group
                </motion.p>
                <motion.h3
                  className="font-serif text-4xl leading-tight text-foreground sm:text-5xl"
                  key={activeCategory.title}
                  initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {activeCategory.title}
                </motion.h3>
              </div>

              <div className="grid gap-px bg-premium-gold/12 sm:grid-cols-2">
                {activeCategory.items.map((item, index) => (
                  <motion.div
                    className="group min-h-32 bg-soft-black p-6 transition-colors duration-300 hover:bg-charcoal"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.035,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    key={item}
                  >
                    <div className="flex h-full flex-col justify-between gap-4">
                      <span className="text-sm leading-6 text-muted-beige transition-colors duration-300 group-hover:text-foreground">
                        {item}
                      </span>
                      <span className="h-px w-10 bg-premium-gold/50 transition-all duration-300 group-hover:w-16 group-hover:bg-champagne-gold" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
