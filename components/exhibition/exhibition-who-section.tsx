import { MotionReveal } from "@/components/motion-reveal";
import { BriefcaseBusiness } from "lucide-react";

const featuredExhibitor = "Businesses looking to expand across African markets";

export function ExhibitionWhoSection() {
  return (
    <section
      aria-labelledby="exhibition-who-heading"
      className="bg-background px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto flex w-full max-w-7xl justify-center">
        <MotionReveal className="relative w-full" variant="image-reveal">
          <div className="relative min-h-128 overflow-hidden bg-primary sm:min-h-144 lg:min-h-160">
            <MotionReveal delay={0.08}>
              <h2
                id="exhibition-who-heading"
                className="px-1 py-2 font-melodrama text-4xl leading-[0.98] text-champagne-gold sm:text-5xl lg:text-5xl 2xl:text-6xl 3xl:text-6xl"
              >
                Who Should Exhibit?
              </h2>
            </MotionReveal>

            <MotionReveal
              as="article"
              className="absolute bottom-0 right-0 flex min-h-44 w-full max-w-xs flex-col justify-between gap-10 border border-champagne-gold/12 bg-background p-5 text-primary sm:max-w-sm sm:p-7"
              delay={0.16}
              variant="scale-in"
            >
              <span className="flex size-8 items-center justify-center rounded-full border border-primary/15 bg-primary/3 text-primary">
                <BriefcaseBusiness className="size-4" aria-hidden="true" />
              </span>
              <p className="font-brand text-sm leading-5 text-primary/82 sm:text-base sm:leading-6">
                {featuredExhibitor}
              </p>
            </MotionReveal>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
