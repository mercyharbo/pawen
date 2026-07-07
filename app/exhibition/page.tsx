import { EventFormDialogs } from "@/components/event-forms/event-form-dialogs";
import { ExhibitionExpectSection } from "@/components/exhibition/exhibition-expect-section";
import { ExhibitionFinalCtaSection } from "@/components/exhibition/exhibition-final-cta-section";
import { ExhibitionHero } from "@/components/exhibition/exhibition-hero";
import { ExhibitionPotentialSection } from "@/components/exhibition/exhibition-potential-section";
import { ExhibitionWhoSection } from "@/components/exhibition/exhibition-who-section";
import { ExhibitionWhySection } from "@/components/exhibition/exhibition-why-section";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  path: "/exhibition",
  title: "Exhibition",
  description:
    "Book an exhibition booth at PAWEN 2026 to showcase your brand to women-led businesses, investors, partners, leaders, and decision makers across Africa.",
  keywords: [
    "PAWEN exhibition",
    "book exhibition booth",
    "women business expo",
    "Africa trade exhibition",
    "brand showcase Zambia",
  ],
});

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
      <ExhibitionFinalCtaSection />
      <EventFormDialogs />
    </>
  );
}
