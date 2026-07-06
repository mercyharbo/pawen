import { ExhibitionExpectSection } from "@/components/exhibition/exhibition-expect-section";
import { ExhibitionFinalCtaSection } from "@/components/exhibition/exhibition-final-cta-section";
import { ExhibitionHero } from "@/components/exhibition/exhibition-hero";
import { ExhibitionPotentialSection } from "@/components/exhibition/exhibition-potential-section";
import { ExhibitionWhoSection } from "@/components/exhibition/exhibition-who-section";
import { ExhibitionWhySection } from "@/components/exhibition/exhibition-why-section";
import { externalLinks } from "@/lib/external-links";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exhibition | The PAWEN Awards & Summit 2026",
  description:
    "The PAWEN Exhibition connects Africa's women-led businesses with people, partnerships, and opportunities.",
};

export default function ExhibitionPage() {
  return (
    <>
      <div className="bg-pawen-brand-color">
        <ExhibitionHero />
        <ExhibitionWhySection />
        <ExhibitionPotentialSection />
        <ExhibitionWhoSection />
        <ExhibitionExpectSection />
      </div>
      <ExhibitionFinalCtaSection
        exhibitUrl={externalLinks.bookExhibition}
        registerUrl={externalLinks.summitRegistration}
      />
    </>
  );
}
