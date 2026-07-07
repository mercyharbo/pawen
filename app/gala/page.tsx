import { GalaHero } from "@/components/gala/gala-hero";
import { GalaDressCodeSection } from "@/components/gala/gala-dress-code-section";
import { GalaFaqSection } from "@/components/gala/gala-faq-section";
import { GalaFinalCtaSection } from "@/components/gala/gala-final-cta-section";
import { GalaNightSection } from "@/components/gala/gala-night-section";
import { GalaPastWinnersSection } from "@/components/gala/gala-past-winners-section";
import { GalaSponsorSection } from "@/components/gala/gala-sponsor-section";
import { GalaTicketsSection } from "@/components/gala/gala-tickets-section";
import { GalaVictoriaFallsSection } from "@/components/gala/gala-victoria-falls-section";
import { externalLinks } from "@/lib/external-links";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  path: "/gala",
  title: "Award Gala",
  description:
    "Get details for the 2026 PAWEN Awards Gala in Lusaka, Zambia, including tickets, tables, dress code, and event FAQs.",
});

export default function GalaPage() {
  return (
    <main className="overflow-x-clip">
      <div className="bg-pawen-brand-color">
        <GalaHero
          brochureUrl="#brochure"
          ticketsUrl={externalLinks.tickets}
        />
        <GalaNightSection />
        <GalaPastWinnersSection />
        <GalaDressCodeSection />
        <GalaTicketsSection />
        <GalaVictoriaFallsSection />
        <GalaSponsorSection sponsorUrl={externalLinks.tickets} />
      </div>
      <GalaFaqSection />
      <GalaFinalCtaSection ticketsUrl={externalLinks.tickets} />
    </main>
  );
}
