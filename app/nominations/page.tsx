import type { Metadata } from "next";
import { NominationAwardCategoriesSection } from "@/components/nomination/nomination-award-categories-section";
import { NominationEligibilitySection } from "@/components/nomination/nomination-eligibility-section";
import { NominationFormCtaSection } from "@/components/nomination/nomination-form-cta-section";
import { NominationHero } from "@/components/nomination/nomination-hero";
import { NominationKeyDatesSection } from "@/components/nomination/nomination-key-dates-section";
import { NominationWhySection } from "@/components/nomination/nomination-why-section";
import { externalLinks } from "@/lib/external-links";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/nominations",
  title: "Nominations",
  description:
    "Submit a nomination for The PAWEN Awards & Summit 2026 without leaving the PAWEN website.",
});

export default function NominationsPage() {
  return (
    <>
      <div className="bg-pawen-brand-color">
        <NominationHero />
        <NominationWhySection />
        <NominationEligibilitySection />
        <NominationAwardCategoriesSection />
      </div>
      <NominationKeyDatesSection ticketsUrl={externalLinks.tickets} />
      <NominationFormCtaSection />
    </>
  );
}
