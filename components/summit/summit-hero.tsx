'use client'

import { MotionReveal } from '@/components/motion-reveal'
import { Button } from '@/components/ui/button'
import { useEventDialog } from '@/lib/stores/event-dialog-store'
import Image from 'next/image'

export function SummitHero() {
  const openDialog = useEventDialog((store) => store.openDialog)

  return (
    <section
      id='summit'
      aria-labelledby='summit-hero-heading'
      className='relative isolate min-h-[calc(100svh-7.875rem)] overflow-hidden px-5 py-20 text-foreground sm:px-8 lg:px-10 lg:py-28'
    >
      <Image
        src='/images/hero-bg.jpg'
        alt=''
        fill
        priority
        sizes='100vw'
        className='object-cover object-center'
        aria-hidden='true'
      />
      <div className='absolute inset-0 bg-[#2b0645]/58' aria-hidden='true' />
      <div
        className='absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-[#26043f]/0 via-[#26043f]/85 to-[#26043f]'
        aria-hidden='true'
      />

      <div className='relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-32 text-center sm:gap-36 lg:gap-44'>
        <MotionReveal className='flex flex-col items-center gap-8'>
          <div className='flex max-w-4xl flex-col items-center gap-5'>
            <h1
              id='summit-hero-heading'
              className='font-melodrama text-4xl font-bold leading-tight text-accent sm:text-5xl lg:text-5xl xl:text-5xl 2xl:text-6xl 3xl:text-6xl'
            >
              The 2026 PAWEN Summit <br className='hidden sm:block' />
              &amp; Exhibition
            </h1>

            <div className='flex flex-col items-center gap-5 font-brand text-sm leading-6 text-muted-beige md:text-lg md:leading-8 lg:text-base lg:leading-7 2xl:text-base 3xl:text-lg 3xl:leading-8'>
              <p>
                The Power Shift: African Women Leading in a Transformed World
              </p>
              <p className='flex flex-col items-center justify-center gap-3 text-primary lg:flex-row lg:flex-nowrap lg:gap-8'>
                <span className='lg:whitespace-nowrap'>
                  <span className='font-semibold text-accent'>Date:</span>{' '}
                  <span className='font-semibold'>13-14 November 2026</span>
                </span>
                <span className='lg:whitespace-nowrap'>
                  <span className='font-semibold text-accent'>Location:</span>{' '}
                  <span className='font-semibold'>
                    New Government Complex, Lusaka
                  </span>
                </span>
              </p>
            </div>
          </div>

          <div className='flex items-center justify-center sm:w-auto lg:w-auto w-full'>
            <Button
              className='h-12 rounded-full bg-accent px-8 text-sm font-semibold text-background hover:bg-accent/90'
              onClick={() => openDialog('summit')}
              type='button'
            >
              Register to Attend the Summit
            </Button>
          </div>
        </MotionReveal>

        <MotionReveal
          className='max-w-3xl space-y-8 font-brand text-base font-normal leading-relaxed md:text-lg md:leading-8 lg:text-base lg:leading-7 2xl:text-base 3xl:text-lg 3xl:leading-8'
          delay={0.1}
        >
          <p>
            Africa is changing. New markets are emerging, technology is reshaping
            how we work and build, capital is moving, and new centres of influence
            are taking shape. The question is not whether women will participate
            in Africa&apos;s next chapter, but how boldly we will lead, build and
            shape it.
          </p>
          <p>
            The PAWEN Summit 2026 brings 2,000+ women and 50+ speakers from across
            Africa and the diaspora to Lusaka, Zambia for two days of ideas,
            insight, business and meaningful connection.
          </p>
          <p>
            Here, founders meet investors. Executives meet peers and potential
            partners. Women building businesses discover new markets. Emerging
            leaders learn from women who have already navigated the path ahead.
          </p>
          <p>
            It is a place to learn, build powerful relationships, access markets,
            expand your influence and position yourself for what comes next.
          </p>
        </MotionReveal>
      </div>
    </section>
  )
}
