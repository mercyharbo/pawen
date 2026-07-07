"use client"

import { MotionReveal } from '@/components/motion-reveal'
import { Button } from '@/components/ui/button'
import { useEventDialog } from '@/lib/stores/event-dialog-store'

export function ExhibitionFinalCtaSection() {
  const openDialog = useEventDialog((store) => store.openDialog)

  return (
    <section
      aria-labelledby='exhibition-final-cta-heading'
      className='relative isolate overflow-hidden bg-pawen-brand-color px-5 py-10 text-primary sm:px-8 lg:px-10 lg:py-16'
    >
      <MotionReveal className='relative z-10 mx-auto flex min-h-[28rem] w-full max-w-5xl flex-col items-center justify-center gap-8 text-center'>
        <div className='flex flex-col items-center gap-7'>
          <h2
            id='exhibition-final-cta-heading'
            className='text-3xl font-medium text-primary sm:text-5xl lg:text-5xl 2xl:text-6xl 3xl:text-6xl leading-tight'
          >
            PUT YOUR BRAND IN THE ROOM WHERE AFRICA&apos;S FUTURE IS BEING
            SHAPED
          </h2>
          <p className='max-w-xl text-base leading-6 text-accent md:text-lg md:leading-8 lg:text-base lg:leading-7 2xl:text-base 3xl:text-lg 3xl:leading-8'>
            The women building Africa&apos;s next economy will be in Zambia.
            Make sure your business is seen by them.
          </p>
        </div>

        <div className='flex flex-col items-center justify-center gap-3 sm:flex-row'>
          <Button
            className='h-11 min-w-36 rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90'
            onClick={() => openDialog('exhibition')}
            type='button'
          >
            Book Exhibition Booth
          </Button>
          <Button
            className='h-11 min-w-44 rounded-full bg-accent px-8 text-background hover:bg-accent/90'
            onClick={() => openDialog('summit')}
            type='button'
          >
            Register for the Summit
          </Button>
        </div>
      </MotionReveal>
    </section>
  )
}
