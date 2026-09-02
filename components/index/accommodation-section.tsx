import { MotionReveal } from '@/components/motion-reveal'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type AccommodationSectionProps = {
  hotelBookingUrl?: string
  hotelBookingCode?: string
}

export function AccommodationSection({
  hotelBookingUrl = 'https://www.ideaform.app/f/iKriLY',
  hotelBookingCode = 'PAWEN2026',
}: AccommodationSectionProps) {
  return (
    <section
      className='relative isolate overflow-hidden bg-pawen-brand-color px-4 pb-12 text-foreground sm:px-8 lg:px-10 lg:pb-16'
      aria-label='Hotel Accommodation'
    >
      <div className='relative mx-auto w-full max-w-7xl'>
        <MotionReveal className='mx-auto flex w-full max-w-2xl flex-col items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-card/60 px-6 py-5 text-center shadow-lg backdrop-blur-sm sm:flex-row sm:text-left sm:px-8'>
          <div className='flex flex-col gap-1'>
            <p className='font-brand text-sm font-medium text-white sm:text-base'>
              GrandPalace Hotel &bull; Booking Code:{' '}
              <span className='rounded-md bg-accent/20 px-2 py-0.5 font-mono font-bold text-accent'>
                {hotelBookingCode}
              </span>
            </p>
            <p className='font-brand text-xs text-muted-beige'>
              Special discounted room rates for PAWEN 2026 attendees.
            </p>
          </div>

          <Button
            asChild
            className='h-10 shrink-0 rounded-full bg-accent px-6 text-xs font-semibold text-accent-foreground hover:bg-accent/90'
          >
            <Link href={hotelBookingUrl} target='_blank' rel='noreferrer'>
              Book a Hotel
            </Link>
          </Button>
        </MotionReveal>
      </div>
    </section>
  )
}
