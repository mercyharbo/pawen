import { EventFormDialogs } from "@/components/event-forms/event-form-dialogs";
import { SummitFinalCtaSection } from "@/components/summit/summit-final-cta-section";
import { SummitHero } from "@/components/summit/summit-hero";
import { SummitPillarsSection } from "@/components/summit/summit-pillars-section";
import { SummitWhyAttendSection } from "@/components/summit/summit-why-attend-section";
import { SummitWhyZambiaSection } from "@/components/summit/summit-why-zambia-section";
import { SummitWhoShouldAttendSection } from "@/components/summit/summit-who-should-attend-section";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  path: "/summit",
  title: "Summit",
  description:
    "Register for the PAWEN Summit 2026 in Lusaka, Zambia and connect with women entrepreneurs, business leaders, partners, speakers, and ecosystem builders across Africa.",
  keywords: [
    "PAWEN Summit 2026",
    "women leadership summit",
    "Africa business summit",
    "Lusaka summit",
    "women entrepreneurs networking",
  ],
});

export default function SummitPage() {
  return (
    <>
      <div className="bg-pawen-brand-color">
        <SummitHero />
        <SummitPillarsSection />
        <SummitWhyZambiaSection />
        <SummitWhyAttendSection />
        <SummitWhoShouldAttendSection />
      </div>
      <SummitFinalCtaSection />
      <EventFormDialogs />
    </>
  );
}
