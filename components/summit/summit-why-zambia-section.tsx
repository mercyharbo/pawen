import { MotionReveal } from '@/components/motion-reveal'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

const exploreItems = [
  'Victoria Falls',
  "Zambia's safari and wildlife experiences",
  'local culture, cuisine, and creativity',
  // "one of Southern Africa's most welcoming destinations",
] as const

export function SummitWhyZambiaSection() {
  return (
    <section
      className='px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28'
      aria-labelledby='summit-why-zambia-heading'
    >
      <div className='mx-auto flex w-full max-w-7xl flex-col items-center gap-10 lg:gap-12'>
        <MotionReveal>
          <h2
            id='summit-why-zambia-heading'
            className='font-melodrama text-4xl font-semibold leading-[0.98] text-champagne-gold lg:text-5xl xl:text-4xl 2xl:text-6xl 3xl:text-6xl'
          >
            Why Zambia? Why Now?
          </h2>
        </MotionReveal>

        <div className='grid w-full gap-3 lg:grid-cols-3 lg:gap-4'>
          <MotionReveal
            as='article'
            className='relative aspect-square overflow-hidden rounded-3xl bg-card'
            variant='image-reveal'
          >
            <Image
              src='/images/city.jpg'
              alt='Lusaka city skyline at night'
              fill
              sizes='(min-width: 1024px) 33vw, 100vw'
              className='object-cover object-center'
            />
            <div
              className='absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background/45'
              aria-hidden='true'
            />
            <div className='absolute inset-x-4 bottom-4 rounded-2xl bg-background px-5 py-4 text-primary sm:px-6 sm:py-5'>
              <p className='text-base  leading-6 sm:text-lg sm:leading-7'>
                Zambia is fast becoming a gateway to Africa&apos;s next economic
                chapter, driven by growth in trade, infrastructure, innovation,
                mining, energy, and regional connectivity.
              </p>
            </div>
          </MotionReveal>

          <MotionReveal
            as='article'
            className='flex aspect-square flex-col justify-center gap-7 rounded-3xl bg-champagne-gold px-6 py-8 text-background sm:px-10'
            delay={0.08}
          >
            <p className='2xl:text-lg leading-tight font-medium'>
              For African women leaders, this is a chance to gather exactly
              where new conversations, investments, and collaborations are
              taking shape.
            </p>
            <p className='2xl:text-lg leading-6 font-medium'>
              Known for its peace, warmth, and hospitality, Zambia offers the
              perfect setting for meaningful connection and strategic dialogue,
              on stage and off it.
            </p>
          </MotionReveal>

          <MotionReveal
            as='article'
            className='relative aspect-square overflow-hidden bg-transparent text-background'
            delay={0.16}
          >
            <div className='relative z-10 flex h-[48%] flex-col gap-5 rounded-3xl bg-primary px-6 py-6 text-background sm:px-8'>
              <div className='flex items-center gap-3'>
                <span className='flex size-9 items-center justify-center rounded-full bg-gray-100 text-background'>
                  <ArrowUpRight className='size-5' aria-hidden='true' />
                </span>
                <p className='text-sm leading-6'>Explore</p>
              </div>
              <h3 className='text-2xl leading-tight font-semibold sm:text-4xl lg:text-2xl 2xl:text-3xl'>
                Extend your stay and explore:
              </h3>
            </div>

            <div className='relative z-0 h-[52%] translate-y-0 overflow-hidden rounded-3xl bg-primary px-4 py-5 text-background sm:px-5'>
              <div className='grid h-full grid-cols-3 gap-3'>
                {exploreItems.map((item) => (
                  <article
                    className='flex min-w-0 flex-col overflow-hidden rounded-lg bg-champagne-gold'
                    key={item}
                  >
                    <div
                      className='flex min-h-0 flex-1 items-center justify-center bg-gray-200'
                      aria-hidden='true'
                    >
                      <span className='px-1 text-xs font-medium leading-4 text-gray-500'>
                        Image
                      </span>
                    </div>
                    <p className='flex min-h-14 items-center justify-center px-1 py-2 text-center text-[11px] font-medium'>
                      {item}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  )
}
