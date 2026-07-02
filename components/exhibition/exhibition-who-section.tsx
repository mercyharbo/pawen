import { MotionReveal } from '@/components/motion-reveal'
import { BriefcaseBusiness } from 'lucide-react'

const exhibitorProfiles = [
  {
    label: 'Women-led startups and growth-stage businesses',
    layoutClass: 'lg:order-1',
  },
  {
    label: 'Tech, fintech, agritech, and innovation companies',
    layoutClass: 'lg:order-2',
  },
  {
    label: 'Creative and lifestyle brands',
    layoutClass: 'lg:order-3',
  },
  {
    label: 'Consumer brands and product-based businesses',
    layoutClass: 'lg:order-5',
  },
  {
    label: 'Corporations and institutions supporting women-led enterprise',
    layoutClass: 'lg:order-6',
  },
  {
    label: 'Service providers and consultants',
    layoutClass: 'lg:order-7',
  },
  {
    label: 'Businesses looking to expand across African markets',
    layoutClass: 'lg:order-4 lg:row-span-2 lg:min-h-full',
  },
] as const

export function ExhibitionWhoSection() {
  return (
    <section
      aria-labelledby='exhibition-who-heading'
      className='overflow-hidden px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28'
    >
      <div className='mx-auto flex w-full max-w-7xl flex-col gap-7'>
        <MotionReveal delay={0.08}>
          <h2
            id='exhibition-who-heading'
            className='text-4xl font-semibold leading-[0.98] text-champagne-gold sm:text-5xl lg:text-5xl 2xl:text-6xl 3xl:text-6xl'
          >
            Who Should Exhibit?
          </h2>
        </MotionReveal>

        <MotionReveal className='w-full' variant='image-reveal'>
          <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
            {exhibitorProfiles.map(({ label, layoutClass }, index) => (
              <MotionReveal
                as='article'
                className={`group/exhibit-card flex min-h-40 flex-col justify-between gap-10 rounded-xl border border-champagne-gold/12 bg-background p-4 text-primary transition-colors duration-500 ease-out hover:border-champagne-gold hover:bg-champagne-gold hover:text-background sm:min-h-44 sm:p-5 lg:min-h-40 ${layoutClass}`}
                delay={0.16 + index * 0.04}
                key={label}
                variant='scale-in'
              >
                <span className='flex size-8 items-center justify-center rounded-full border border-primary/15 bg-primary/3 text-primary transition-colors duration-500 ease-out group-hover/exhibit-card:border-background/35 group-hover/exhibit-card:text-background'>
                  <BriefcaseBusiness className='size-4' aria-hidden='true' />
                </span>
                <p className='font-brand text-sm leading-5 text-primary/82 transition-colors duration-500 ease-out group-hover/exhibit-card:text-background sm:text-base sm:leading-6'>
                  {label}
                </p>
              </MotionReveal>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
