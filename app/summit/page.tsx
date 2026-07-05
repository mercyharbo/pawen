import { SummitFinalCtaSection } from "@/components/summit/summit-final-cta-section";
import { SummitHero } from "@/components/summit/summit-hero";
import { SummitPillarsSection } from "@/components/summit/summit-pillars-section";
import { SummitWhyAttendSection } from "@/components/summit/summit-why-attend-section";
import { SummitWhyZambiaSection } from "@/components/summit/summit-why-zambia-section";
import { SummitWhoShouldAttendSection } from "@/components/summit/summit-who-should-attend-section";
import { externalLinks } from "@/lib/external-links";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Summit | The PAWEN Awards & Summit 2026",
  description:
    "The 2026 PAWEN Summit and Exhibition in Lusaka, Zambia.",
};

export default function SummitPage() {
  return (
    <>
      <div className="bg-pawen-brand-color">
        <SummitHero
          registerUrl={externalLinks.tickets}
          exhibitUrl="#exhibition"
          speakUrl="#speakers"
        />
        <SummitPillarsSection />
        <SummitWhyZambiaSection />
        <SummitWhyAttendSection />
        <SummitWhoShouldAttendSection />
      </div>
      <SummitFinalCtaSection
        registerUrl={externalLinks.tickets}
        exhibitUrl="#exhibition"
        speakUrl="#speakers"
      />
    </>
  );
}
