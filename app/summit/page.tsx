import { SummitHero } from "@/components/summit-hero";
import { SummitWhyZambiaSection } from "@/components/summit-why-zambia-section";
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
      <SummitHero
        registerUrl={externalLinks.tickets}
        exhibitUrl="#exhibition"
        speakUrl="#speakers"
      />
      <SummitWhyZambiaSection />
    </>
  );
}
