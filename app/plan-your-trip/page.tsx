import { MotionReveal } from '@/components/motion-reveal'
import { TravelBrandCard } from '@/components/plan-your-trip/travel-brand-card'
import { externalLinks } from '@/lib/external-links'
import { createPageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = createPageMetadata({
  path: '/plan-your-trip',
  title: 'Plan your Trip',
  description:
    'Plan your visit to Lusaka for the PAWEN Awards and Summit 2026 with recommended hotel options.',
  keywords: [
    'PAWEN 2026 travel',
    'Lusaka hotels',
    'PAWEN accommodation',
  ],
})

const hotels = [
  {
    name: 'Grand Palace Hotel',
    description:
      'Reserve your stay through the dedicated PAWEN booking form for the 2026 event.',
    href: externalLinks.hotelBooking,
    imageSrc: '/grandpalace-logo.png',
    imageAlt: 'Grand Palace Hotel logo',
    imageWidth: 843,
    imageHeight: 576,
    note: `PAWEN booking code: ${externalLinks.hotelBookingCode}`,
  },
  {
    name: 'Holiday Inn Lusaka',
    description:
      'Book the PAWEN group rate at Holiday Inn Lusaka for your event dates.',
    href: externalLinks.holidayInnBooking,
    imageSrc: '/holiday-inn-lusaka-logo.png',
    imageAlt: 'Holiday Inn Lusaka logo',
    imageWidth: 604,
    imageHeight: 654,
  },
  {
    name: 'Southern Sun Ridgeway',
    description:
      'Explore rooms and availability at Southern Sun Ridgeway in central Lusaka.',
    href: externalLinks.southernSunRidgeway,
    imageSrc: '/southern-sun-ridgeway-logo.png',
    imageAlt: 'Southern Sun Ridgeway logo',
    imageWidth: 528,
    imageHeight: 113,
    note: 'Discount code: 1211PA',
  },
] as const

export default function PlanYourTripPage() {
  return (
    <main>
      <section className='bg-pawen-brand-color px-5 py-16 text-primary sm:px-8 sm:py-20 lg:px-10 lg:py-24'>
        <MotionReveal className='mx-auto flex w-full max-w-7xl flex-col gap-6'>
          <h1 className='max-w-4xl font-brand text-5xl font-semibold leading-tight text-accent sm:text-6xl lg:text-7xl'>
            Plan your Trip
          </h1>
          <p className='max-w-2xl text-base leading-7 text-primary/80 sm:text-lg sm:leading-8'>
            Make your journey to Lusaka simple. Explore recommended places to
            stay for the PAWEN Awards and Summit 2026.
          </p>
        </MotionReveal>
      </section>

      <div className='bg-primary px-5 py-16 text-background sm:px-8 lg:px-10 lg:py-24'>
        <div className='mx-auto w-full max-w-7xl'>
          <section
            className='flex flex-col gap-10'
            aria-labelledby='hotels-heading'
          >
            <MotionReveal className='flex max-w-2xl flex-col gap-4'>
              <h2
                id='hotels-heading'
                className='font-brand text-3xl font-semibold sm:text-4xl'
              >
                Hotels
              </h2>
              <p className='text-sm leading-6 text-background/70 sm:text-base sm:leading-7'>
                Choose from our recommended accommodation options in Lusaka.
              </p>
            </MotionReveal>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
              {hotels.map((hotel, index) => (
                <MotionReveal
                  key={hotel.name}
                  className='h-full'
                  delay={index * 0.06}
                >
                  <TravelBrandCard {...hotel} />
                </MotionReveal>
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}
