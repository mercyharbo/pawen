import { MotionReveal } from "@/components/motion-reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const awardCategories = [
  "Entrepreneurship Excellence Awards",
  "Leadership Excellence Awards",
  "Impact Leadership Awards",
  "Special Awards",
] as const;

export function NominationAwardCategoriesSection() {
  return (
    <section
      id="award-categories"
      aria-labelledby="nomination-award-categories-heading"
      className="bg-background px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <MotionReveal className="flex max-w-5xl flex-col gap-6">
            <h2
              id="nomination-award-categories-heading"
              className="font-melodrama text-5xl font-semibold leading-[0.98] text-champagne-gold sm:text-6xl lg:text-7xl"
            >
              Award Categories
            </h2>
            <p className="max-w-6xl font-brand text-base leading-7 text-muted-beige sm:text-lg sm:leading-8">
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

          <MotionReveal delay={0.08}>
            <Button
              asChild
              className="h-11 w-fit rounded-full bg-champagne-gold px-8 text-xs font-medium text-background hover:bg-champagne-gold/90"
            >
              <Link href="#nomination-form">Submit a Nomination</Link>
            </Button>
          </MotionReveal>
        </div>

        <ul className="flex flex-col border-y border-primary/10">
          {awardCategories.map((category, index) => (
            <MotionReveal
              className="border-b border-primary/10 last:border-b-0"
              delay={index * 0.06}
              key={category}
            >
              <li className="py-8 font-brand text-3xl leading-tight text-primary sm:text-4xl lg:text-5xl">
                {category}
              </li>
            </MotionReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
