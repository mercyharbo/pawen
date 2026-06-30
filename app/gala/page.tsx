import { GalaHero } from "@/components/gala/gala-hero";
import { GalaDressCodeSection } from "@/components/gala/gala-dress-code-section";
import { GalaFaqSection } from "@/components/gala/gala-faq-section";
import { GalaFinalCtaSection } from "@/components/gala/gala-final-cta-section";
import { GalaNightSection } from "@/components/gala/gala-night-section";
import { GalaPastWinnersSection } from "@/components/gala/gala-past-winners-section";
import { GalaTicketsSection } from "@/components/gala/gala-tickets-section";
import { GalaVictoriaFallsSection } from "@/components/gala/gala-victoria-falls-section";
import { externalLinks } from "@/lib/external-links";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Award Gala | The PAWEN Awards & Summit 2026",
  description:
    "The 2026 PAWEN Awards Gala in Lusaka, Zambia.",
};

export default function GalaPage() {
  return (
    <>
      <GalaHero
        brochureUrl="#brochure"
        ticketsUrl={externalLinks.tickets}
      />
      <GalaNightSection />
      <GalaPastWinnersSection />
      <GalaDressCodeSection />
      <GalaTicketsSection ticketsUrl={externalLinks.tickets} />
      <GalaVictoriaFallsSection />
      <GalaFaqSection />
      <GalaFinalCtaSection ticketsUrl={externalLinks.tickets} />
    </>
  );
}
