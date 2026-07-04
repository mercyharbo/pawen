import { MotionReveal } from "@/components/motion-reveal";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";

const eligibilityItems = [
  "An African woman, on the continent or across the diaspora.",
  "A founder, intrapreneur, or leader, building businesses, driving innovation within organisations, or leading change in the public and social sectors.",
  "A woman of demonstrated impact, with clear evidence of achievement, leadership, or influence in her field.",
  "18 years or older as of 1 July 2026.",
] as const;

export function NominationEligibilitySection() {
  return (
    <section
      aria-labelledby="nomination-eligibility-heading"
      className="px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-16 xl:gap-24">
        <MotionReveal className="flex max-w-xl flex-col gap-7">
          <div className="flex flex-col gap-5">
            <h2
              id="nomination-eligibility-heading"
              className="font-melodrama text-4xl font-medium leading-[0.98] text-champagne-gold sm:text-5xl lg:text-6xl"
            >
              Who Can Be Nominated
            </h2>
            <p className="font-brand text-sm leading-6 text-muted-beige md:text-lg md:leading-8 lg:text-base lg:leading-7 2xl:text-base 3xl:text-lg 3xl:leading-8">
              The PAWEN Awards are open to African women worldwide whose work is
              shaping business, leadership, and impact. Whether you are
              nominating yourself or championing a remarkable woman, nominees
              should be:
            </p>
          </div>

          <Button
            asChild
            className="h-11 w-fit rounded-full bg-champagne-gold px-8 text-xs font-medium text-background hover:bg-champagne-gold/90"
          >
            <Link href="#nomination-form">Submit Nomination</Link>
          </Button>
        </MotionReveal>

        <ul className="flex flex-col border-y border-primary/10">
          {eligibilityItems.map((item, index) => (
            <MotionReveal
              className="border-b border-primary/10 last:border-b-0"
              delay={index * 0.06}
              key={item}
            >
              <li className="flex items-start gap-4 py-5">
                <Star
                  className="size-4 mt-2 shrink-0 fill-champagne-gold text-champagne-gold sm:size-4"
                  aria-hidden="true"
                />
                <span className="font-brand text-lg leading-8 text-primary sm:text-2xl sm:leading-9">
                  {item}
                </span>
              </li>
            </MotionReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
