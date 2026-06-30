import type { Metadata } from "next";
import { MotionReveal } from "@/components/motion-reveal";
import { NominationForm } from "@/components/nomination-form";
import { NominationAwardCategoriesSection } from "@/components/nomination/nomination-award-categories-section";
import { NominationEligibilitySection } from "@/components/nomination/nomination-eligibility-section";
import { NominationHero } from "@/components/nomination/nomination-hero";
import { NominationKeyDatesSection } from "@/components/nomination/nomination-key-dates-section";
import { NominationWhySection } from "@/components/nomination/nomination-why-section";
import { externalLinks } from "@/lib/external-links";

export const metadata: Metadata = {
  title: "Nominations | The PAWEN Awards & Summit 2026",
  description:
    "Submit a nomination for The PAWEN Awards & Summit 2026 without leaving the PAWEN website.",
};

export default function NominationsPage() {
  return (
    <>
      <NominationHero />
      <NominationWhySection />
      <NominationEligibilitySection />
      <NominationAwardCategoriesSection />
      <NominationKeyDatesSection ticketsUrl={externalLinks.tickets} />

      <section
        aria-labelledby="nomination-form-heading"
        className="bg-background px-5 py-16 text-foreground sm:px-8 lg:px-10"
        id="nomination-form"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <MotionReveal className="flex flex-col gap-4">
            <h2
              id="nomination-form-heading"
              className="font-melodrama text-4xl font-semibold leading-[0.98] text-champagne-gold sm:text-5xl lg:text-6xl"
            >
              Nomination Form
            </h2>
            <p className="max-w-2xl font-brand text-base leading-7 text-muted-beige sm:text-lg sm:leading-8">
              Complete the form below to submit a nominee for The PAWEN Awards.
            </p>
          </MotionReveal>
          <NominationForm />
        </div>
      </section>
    </>
  );
}
