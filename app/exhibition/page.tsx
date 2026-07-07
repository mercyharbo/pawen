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
    "Book an exhibition booth and connect your brand with Africa's women-led businesses, leaders, and partners.",
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
