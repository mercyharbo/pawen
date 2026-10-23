import { HelpdeskExperience } from '@/components/helpdesk/helpdesk-experience'
import { createPageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = createPageMetadata({
  path: '/helpdesk',
  title: 'Helpdesk',
  description:
    'Chat with Priscar, the PAWEN 2026 Digital Concierge, for help navigating the PAWEN Summit, Exhibition & Awards 2026.',
  keywords: [
    'PAWEN helpdesk',
    'PAWEN digital concierge',
    'PAWEN Summit support',
  ],
})

export default function HelpdeskPage() {
  return <HelpdeskExperience />
}
