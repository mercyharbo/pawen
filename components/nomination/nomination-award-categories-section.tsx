"use client";

import { MotionReveal } from "@/components/motion-reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const awardCategories = [
  {
    title: "Entrepreneurship Excellence Awards",
    description:
      "Scaling African Businesses for Growth. African women entrepreneurs are building resilient, innovative, high-growth businesses across every industry. This category celebrates market access, scaling strategy, and the opportunities shaping the future of African enterprise.",
  },
  {
    title: "Leadership Excellence Awards",
    description:
      "Recognising women leading institutions, teams, and industries with vision, courage, and measurable influence across Africa's business and professional landscape.",
  },
  {
    title: "Impact Leadership Awards",
    description:
      "Celebrating women whose work creates lasting social, economic, policy, community, or environmental impact across the continent and diaspora.",
  },
  {
    title: "Special Awards",
    description:
      "Honouring exceptional contributions, legacy achievements, and standout work that deserves dedicated recognition beyond the core award categories.",
  },
] as const;

export function NominationAwardCategoriesSection() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section
      id="award-categories"
      aria-labelledby="nomination-award-categories-heading"
      className="bg-background px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <MotionReveal>
              <h2
                id="nomination-award-categories-heading"
                className="font-brand text-4xl font-semibold leading-tight text-champagne-gold sm:text-5xl"
              >
                Award Categories
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.08}>
              <Button
                asChild
                className="h-11 w-fit rounded-full bg-champagne-gold px-8 text-xs font-medium text-background hover:bg-champagne-gold/90"
              >
                <Link href="#nomination-form">Submit a Nomination</Link>
              </Button>
            </MotionReveal>
          </div>

          <MotionReveal className="max-w-6xl" delay={0.12}>
            <p className="font-brand text-sm leading-6 text-muted-beige sm:text-base sm:leading-7">
              Five Categories, One stage where Africa&apos;s most outstanding
              women in business and career are celebrated. Whether you are a
              founder, a corporate leader, or a changemaker driving impact
              across the continent, there is a category for the work you are
              doing. Explore the categories below and nominate the African
              woman, including yourself, whose contribution deserves to be on
              record. Every nomination undergoes a rigorous multi-stage
              evaluation process led by an independent judging panel comprising
              respected leaders from business, governance, academia and civil
              society.
            </p>
          </MotionReveal>
        </div>

        <div className="flex flex-col border-y border-primary/10">
          {awardCategories.map((category, index) => {
            const isActive = activeCategory === index;
            const categoryNumber = String(index + 1).padStart(2, "0");
            const contentId = `award-category-panel-${index}`;

            return (
              <MotionReveal
                className="border-b border-primary/10 last:border-b-0"
                delay={index * 0.06}
                key={category.title}
              >
                <article className="flex flex-col gap-7 py-7 lg:py-9">
                  <button
                    type="button"
                    aria-controls={contentId}
                    aria-expanded={isActive}
                    className="group/category flex w-full items-center gap-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:gap-6"
                    onClick={() => setActiveCategory(index)}
                  >
                    <span className="font-brand text-xl leading-none text-champagne-gold sm:text-2xl">
                      {categoryNumber}
                    </span>
                    <span className="flex-1 font-brand text-3xl leading-tight text-primary sm:text-4xl lg:text-5xl">
                      {category.title}
                    </span>
                    {!isActive ? (
                      <span
                        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-champagne-gold/45 text-primary transition-colors duration-500 ease-out group-hover/category:bg-champagne-gold group-hover/category:text-background group-focus-visible/category:bg-champagne-gold group-focus-visible/category:text-background sm:size-10"
                        aria-hidden="true"
                      >
                        <ArrowRight className="size-5" />
                      </span>
                    ) : null}
                  </button>

                  {isActive ? (
                    <div
                      id={contentId}
                      className="grid gap-8 pl-12 sm:pl-16 lg:grid-cols-[1fr_18.5rem] lg:items-start lg:gap-16 xl:grid-cols-[1fr_22rem]"
                    >
                      <p className="max-w-xl font-brand text-sm leading-6 text-muted-beige sm:text-base sm:leading-7">
                        {category.description}
                      </p>
                      <div
                        className="aspect-[1.75] w-full max-w-sm rounded-xl bg-primary sm:max-w-md lg:max-w-none"
                        aria-label={`${category.title} image placeholder`}
                        role="img"
                      />
                    </div>
                  ) : null}
                </article>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
