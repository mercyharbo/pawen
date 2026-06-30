import { MotionReveal } from "@/components/motion-reveal";

const exhibitionBenefits = [
  "high-level summit delegates from across Africa",
  "potential customers and distribution partners",
  "corporate procurement opportunities",
  "investors and ecosystem leaders",
  "media exposure and brand visibility",
  "cross-border collaboration opportunities",
] as const;

export function ExhibitionWhySection() {
  return (
    <section
      aria-labelledby="exhibition-why-heading"
      className="bg-background px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-7">
        <MotionReveal className="flex flex-col gap-5">
          <h2
            id="exhibition-why-heading"
            className="font-melodrama text-4xl font-semibold leading-[0.98] text-champagne-gold sm:text-5xl lg:text-5xl 2xl:text-6xl 3xl:text-6xl"
          >
            Why Exhibit?
          </h2>
          <div className="flex flex-col gap-1 font-brand text-lg leading-7 text-primary sm:text-xl sm:leading-8">
            <p>Visibility matters, but strategic visibility changes everything.</p>
            <p>As an exhibitor, you gain direct access to:</p>
          </div>
        </MotionReveal>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {exhibitionBenefits.map((benefit, index) => (
            <MotionReveal
              as="article"
              className="flex min-h-44 flex-col justify-between gap-10 rounded-xl border border-champagne-gold/12 bg-background p-4 text-primary transition-colors hover:border-champagne-gold/35 sm:min-h-48 lg:min-h-44"
              delay={index * 0.04}
              key={benefit}
            >
              <span className="flex size-8 items-center justify-center rounded-full border border-primary/15 text-xs leading-none text-primary">
                {index + 1}
              </span>
              <p className="font-brand text-sm leading-5 text-primary/82 sm:text-base sm:leading-6">
                {benefit}
              </p>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
