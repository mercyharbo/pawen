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

        <MotionReveal className='relative z-10 m-auto flex w-full max-w-4xl flex-col items-center gap-6 text-center'>
          <p className='font-brand text-sm font-medium leading-5 text-accent'>
            13-14 November 2026.
          </p>
          <h2
            id='ticket-venue-heading'
            className='font-brand text-3xl font-normal leading-tight text-primary min-[380px]:text-4xl sm:text-5xl lg:text-3xl xl:text-5xl 2xl:text-6xl 3xl:text-6xl'
          >
            INTERCONTINENTAL
            <br />
            HOTEL,
            <br />
            LUSAKA, ZAMBIA.
          </h2>
          <Button
            asChild
            className='h-12 rounded-full bg-accent px-8 text-sm font-medium text-accent-foreground hover:bg-accent/90'
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
