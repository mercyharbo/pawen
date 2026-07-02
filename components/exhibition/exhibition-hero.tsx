import { MotionReveal } from '@/components/motion-reveal'
import Image from 'next/image'

export function ExhibitionHero() {
  return (
    <section
      id='exhibition'
      aria-labelledby='exhibition-hero-heading'
      className='relative isolate flex min-h-[calc(100svh-7.875rem)] overflow-hidden px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28'
    >
      <MotionReveal
        ariaHidden
        className='absolute inset-0'
        variant='image-reveal'
      >
        <Image
          src='/images/IMG-5.jpg'
          alt=''
          fill
          priority
          sizes='100vw'
          className='object-cover object-center'
        />
      </MotionReveal>
      <div className='absolute inset-0 bg-[#1c062d]/62' aria-hidden='true' />
      <div
        className='absolute inset-0 bg-dark-gold/80 mix-blend-multiply'
        aria-hidden='true'
      />

      <div className='relative z-10 mx-auto flex w-full max-w-5xl items-center justify-center'>
        <MotionReveal className='flex w-full flex-col items-center gap-7 text-center sm:gap-8'>
          <div className='flex max-w-4xl flex-col items-center gap-5'>
            <h1
              id='exhibition-hero-heading'
              className='text-4xl font-semibold leading-tight max-w-2xl text-champagne-gold sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-7xl'
            >
              The PAWEN Exhibition
            </h1>
            <p className='max-w-3xl font-brand text-base leading-7 text-primary sm:text-xl sm:leading-8 lg:text-2xl lg:leading-9'>
              The PAWEN Exhibition is more than a showcase. It is a high-value
              marketplace connecting Africa&apos;s women-led businesses with the
              people, partnerships, and opportunities that accelerate their
              growth.
            </p>
          </div>

          <div className='grid w-full max-w-3xl gap-4 text-background sm:grid-cols-[1.6fr_1fr] sm:gap-5'>
            <MotionReveal
              as='article'
              className='flex min-h-32 items-center justify-center rounded-md bg-champagne-gold px-6 py-5 sm:min-h-36 sm:px-8'
              delay={0.08}
              variant='scale-in'
            >
              <p className='max-w-lg font-brand text-sm leading-6 sm:text-base sm:leading-7'>
                Taking place alongside the PAWEN Summit 2026 in Lusaka, the
                exhibition brings together founders, executives, investors,
                buyers, corporates, policymakers, media, and decision-makers
                from across Africa.
              </p>
            </MotionReveal>
            <MotionReveal
              as='article'
              className='flex min-h-32 items-center justify-center rounded-md bg-exhibition-gold px-6 py-5 sm:min-h-36 sm:px-8'
              delay={0.16}
              variant='scale-in'
            >
              <p className='max-w-xs font-brand text-sm leading-6 sm:text-base sm:leading-7'>
                This is where brands get seen, businesses get discovered, and
                conversations turn into real opportunities.
              </p>
            </MotionReveal>
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
