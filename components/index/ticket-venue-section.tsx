import { MotionReveal } from '@/components/motion-reveal'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

type TicketVenueSectionProps = {
  ticketsUrl: string
}

export function TicketVenueSection({ ticketsUrl }: TicketVenueSectionProps) {
  return (
    <section
      className='relative isolate overflow-hidden bg-pawen-brand-color px-4 py-10 text-foreground sm:px-8 lg:px-10 lg:py-16'
      aria-labelledby='ticket-venue-heading'
    >
      <div className='relative mx-auto flex min-h-96 w-full max-w-7xl overflow-hidden rounded-md bg-card px-4 py-16 sm:px-8 lg:min-h-128 lg:px-10'>
        <MotionReveal
          ariaHidden
          className='absolute inset-0'
          variant='image-reveal'
        >
          <Image
            src='/images/ticket-image.jpg'
            alt=''
            fill
            sizes='(min-width: 1280px) 80rem, 100vw'
            className='object-cover object-center'
          />
        </MotionReveal>
        <div className='absolute inset-0 bg-background/78' aria-hidden='true' />
        <div
          className='absolute inset-0 shadow-[inset_0_0_9rem_var(--color-background)]'
          aria-hidden='true'
        />

        <MotionReveal className='relative z-10 m-auto flex w-full max-w-5xl flex-col items-center gap-8 text-center'>
          <p className='font-brand text-sm font-semibold tracking-wider text-accent uppercase'>
            13–14 November 2026
          </p>

          <div className='grid w-full max-w-4xl divide-y divide-primary/15 sm:grid-cols-2 sm:divide-y-0 sm:divide-x sm:divide-primary/25 text-center'>
            <div className='flex flex-col gap-2 pb-6 sm:pb-0 sm:pr-8 sm:pl-4'>
              <span className='font-brand text-xs font-bold uppercase tracking-wider text-accent sm:text-sm'>
                Summit &amp; Exhibition
              </span>
              <h3 className='font-brand text-2xl font-semibold leading-snug text-primary sm:text-3xl lg:text-4xl'>
                New Government Complex
              </h3>
              <p className='text-sm text-primary/80 sm:text-base'>Lusaka, Zambia</p>
            </div>

            <div className='flex flex-col gap-2 pt-6 sm:pt-0 sm:pl-8 sm:pr-4'>
              <span className='font-brand text-xs font-bold uppercase tracking-wider text-accent sm:text-sm'>
                Awards Gala
              </span>
              <h3 className='font-brand text-2xl font-semibold leading-snug text-primary sm:text-3xl lg:text-4xl'>
                Intercontinental Hotel
              </h3>
              <p className='text-sm text-primary/80 sm:text-base'>Lusaka, Zambia</p>
            </div>
          </div>

          <Button
            asChild
            className='h-12 rounded-full bg-accent px-8 text-sm font-semibold text-background hover:bg-accent/90'
          >
            <Link href={ticketsUrl} target='_blank' rel='noreferrer'>
              Get Gala Tickets
            </Link>
          </Button>
        </MotionReveal>
      </div>
    </section>
  )
}
