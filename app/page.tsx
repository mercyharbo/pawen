import { Hero } from '@/components/index/hero'
import { NewsletterSection } from '@/components/index/newsletter-section'
import { SponsorsSection } from '@/components/index/sponsors-section'
import { StorySection } from '@/components/index/story-section'
import { TicketVenueSection } from '@/components/index/ticket-venue-section'
import { WhyPawenSection } from '@/components/index/why-pawen-section'
import { externalLinks } from '@/lib/external-links'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  path: '/',
})

export default function Home() {
  return (
    <>
      <Hero nominationsUrl={externalLinks.nominations} />
      <StorySection supportUrl={externalLinks.supportOurWork} />
      <SponsorsSection />
      <WhyPawenSection />
      <TicketVenueSection ticketsUrl={externalLinks.tickets} />
      <NewsletterSection />
    </>
  )
}
