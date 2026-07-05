import { Hero } from '@/components/index/hero'
import { FooterTicketCta } from '@/components/index/footer-ticket-cta'
import { SponsorsSection } from '@/components/index/sponsors-section'
import { StorySection } from '@/components/index/story-section'
import { TicketVenueSection } from '@/components/index/ticket-venue-section'
import { WhyPawenSection } from '@/components/index/why-pawen-section'
import { externalLinks } from '@/lib/external-links'

export default function Home() {
  return (
    <>
      <Hero
        nominationsUrl={externalLinks.nominations}
        ticketsUrl={externalLinks.tickets}
      />
      <StorySection supportUrl={externalLinks.supportOurWork} />
      <SponsorsSection />
      <WhyPawenSection />
      <TicketVenueSection ticketsUrl={externalLinks.tickets} />
      <FooterTicketCta />
    </>
  )
}
