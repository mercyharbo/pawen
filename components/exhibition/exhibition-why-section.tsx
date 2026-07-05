import { MotionReveal } from "@/components/motion-reveal";

const exhibitionBenefits = [
  ["high-level summit", "delegates from", "across Africa"],
  ["potential customers", "and distribution", "partners"],
  ["corporate", "procurement", "opportunities"],
  ["investors and", "ecosystem", "leaders"],
  ["media exposure", "and brand", "visibility"],
  ["cross-border", "collaboration", "opportunities"],
] as const;

export function ExhibitionWhySection() {
  return (
    <section
      aria-labelledby="exhibition-why-heading"
      className="px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-7">
        <MotionReveal className="flex flex-col gap-5">
          <h2
            id="exhibition-why-heading"
            className="font-melodrama text-4xl font-semibold leading-[0.98] text-accent sm:text-5xl lg:text-5xl 2xl:text-6xl 3xl:text-6xl"
          >
            Why Exhibit?
          </h2>
          <div className="flex flex-col gap-1 font-brand text-sm leading-6 text-primary md:text-lg md:leading-8 lg:text-base lg:leading-7 2xl:text-base 3xl:text-lg 3xl:leading-8">
            <p>Visibility matters, but strategic visibility changes everything.</p>
            <p>As an exhibitor, you gain direct access to:</p>
          </div>
        </MotionReveal>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {exhibitionBenefits.map((benefitLines, index) => (
            <MotionReveal
              as="article"
              className="group/exhibit-card flex min-h-44 flex-col justify-between gap-10 rounded-xl border border-accent/12 bg-background p-4 text-primary transition-colors duration-500 ease-out hover:border-accent hover:bg-accent hover:text-background sm:min-h-48 lg:min-h-44"
              delay={index * 0.04}
              key={benefitLines.join(" ")}
            >
              <span className="flex size-8 items-center justify-center rounded-full border border-primary/15 text-xs leading-none text-primary transition-colors duration-500 ease-out group-hover/exhibit-card:border-background/35 group-hover/exhibit-card:text-background">
                {index + 1}
              </span>
              <p className="flex flex-col font-brand text-sm leading-5 text-primary/82 transition-colors duration-500 ease-out group-hover/exhibit-card:text-background sm:text-base sm:leading-6">
                {benefitLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
