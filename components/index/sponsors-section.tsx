'use client'

import { MotionReveal } from '@/components/motion-reveal'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'

const partnerLogos = [
  {
    name: 'Zanaco',
    src: '/zanaco.png',
    alt: 'Zanaco logo',
    href: 'https://www.zanaco.co.zm',
  },
  {
    name: 'Nugi Technologies',
    src: '/NTW.png',
    alt: 'Nugi Technologies logo',
    href: 'https://nugitech.co.uk/',
  },
  {
    name: 'Qloop',
    src: '/QLoop.png',
    alt: 'Qloop logo',
    href: 'https://theqloop.com/',
  },
  {
    name: 'Syncventory',
    src: '/Syncventory Logo B.jpg',
    alt: 'Syncventory logo',
    href: 'https://www.syncventory.co/',
  },
  {
    name: '360 Gov',
    src: '/360 gov_W.png',
    alt: '360 Gov logo',
  },
  {
    name: 'Women in Technology Zambia',
    src: '/WITN.jpg',
    alt: 'Women in Technology Zambia logo',
    href: 'https://www.witn.org.zm/',
  },
] as const

export function SponsorsSection() {
  return (
    <section
      className='relative isolate overflow-hidden bg-pawen-brand-color px-5 py-10 text-foreground sm:px-8 lg:px-10 lg:py-16'
      id='our-story-details'
    >
      <div
        className='pointer-events-none absolute inset-x-0 top-0 h-[520%] bg-[linear-gradient(180deg,var(--color-pawen-brand-color)_0%,var(--color-pawen-brand-color)_56%,rgba(28,6,45,0.82)_72%,rgba(5,5,5,0)_100%)]'
        aria-hidden='true'
      />

      <div className='relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-14'>
        <h2 className='font-brand text-4xl font-bold leading-tight text-accent text-center sm:text-5xl 3xl:text-6xl 2xl:text-6xl'>
          Our Partners and Sponsors
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
                className='flex min-h-32 min-w-64 items-center justify-center px-4'
                key={logo.name}
              >
                {'href' in logo ? (
                  <a
                    href={logo.href}
                    target='_blank'
                    rel='noreferrer'
                    className='inline-flex h-28 w-56 items-center justify-center transition-transform duration-300 ease-out hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'
                    aria-label={`Visit ${logo.name}`}
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={220}
                      height={110}
                      className='max-h-24 w-auto object-contain'
                    />
                  </a>
                ) : (
                  <div className='flex h-28 w-56 items-center justify-center'>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={220}
                      height={110}
                      className='max-h-24 w-auto object-contain'
                    />
                  </div>
                )}
              </div>
            ))}
          </Marquee>
        </MotionReveal>
      </div>
    </section>
  )
}
