import { Hero } from "@/components/hero";
import { OurStorySection } from "@/components/our-story-section";
import { StorySection } from "@/components/story-section";
import { TicketVenueSection } from "@/components/ticket-venue-section";
import { WhyPawenSection } from "@/components/why-pawen-section";
import { externalLinks } from "@/lib/external-links";

export default function Home() {
  return (
    <>
      <Hero
        nominationsUrl={externalLinks.nominations}
        ticketsUrl={externalLinks.tickets}
      />
      <StorySection supportUrl={externalLinks.supportOurWork} />
      <TicketVenueSection ticketsUrl={externalLinks.tickets} />
      <OurStorySection />
      <WhyPawenSection />
    </>
  );
}
