'use client'

import { MotionReveal } from '@/components/motion-reveal'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'

const partnerLogos = [
  {
    src: '/images/sponsor (1).jpg',
    alt: 'Stejarri Country Club',
  },
  {
    src: '/images/sponsor (1).png',
    alt: 'JYH International Architects',
  },
  {
    src: '/images/sponsor (2).jpg',
    alt: 'Jets 100',
  },
  {
    src: '/images/sponsor (2).png',
    alt: 'Peacebird',
  },
  {
    src: '/images/sponsor (3).png',
    alt: 'Milk',
  },
  {
    src: '/images/sponsor (4).png',
    alt: 'ROW',
  },
] as const

export function SponsorsSection() {
  return (
    <section
      className='relative isolate overflow-hidden bg-pawen-brand-color px-5 py-20 text-foreground sm:px-8 lg:px-10 lg:py-28'
      id='our-story-details'
    >
      <div
        className='pointer-events-none absolute inset-x-0 top-0 h-[520%] bg-[linear-gradient(180deg,var(--color-pawen-brand-color)_0%,var(--color-pawen-brand-color)_56%,rgba(28,6,45,0.82)_72%,rgba(5,5,5,0)_100%)]'
        aria-hidden='true'
      />

      <div className='relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-14'>
        <h2 className='font-brand text-4xl font-bold leading-tight text-accent text-center sm:text-5xl 3xl:text-6xl 2xl:text-6xl'>
          Our Sponsors & Partners
        </h2>

        <MotionReveal className='w-full max-w-5xl overflow-hidden'>
          <Marquee
            autoFill
            gradient={false}
            pauseOnHover
            speed={34}
            className='overflow-hidden'
          >
            {partnerLogos.map((logo) => (
              <div
                className='flex min-h-20 min-w-48 items-center justify-center px-8'
                key={logo.src}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={192}
                  height={192}
                  className='max-h-20 w-auto object-contain'
                />
              </div>
            ))}
          </Marquee>
        </MotionReveal>
      </div>
    </section>
  )
}
