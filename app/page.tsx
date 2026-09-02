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
  description:
    'Join The PAWEN Awards & Summit 2026 in Lusaka, Zambia for awards, summit sessions, exhibitions, networking, and opportunities for women entrepreneurs and business leaders across Africa.',
  keywords: [
    'PAWEN 2026',
    'women awards Africa',
    'women business summit',
    'African women entrepreneurs',
    'Lusaka business event',
  ],
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
