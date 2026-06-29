import { MotionReveal } from '@/components/motion-reveal'
import { Star } from 'lucide-react'
import Image from 'next/image'

const attendBenefits = [
  'Meaningful connections with influential women leaders from across Africa',
  'Practical insight from founders, executives, investors, and decision-makers',
  "Direct access to the board and executive search leaders shaping who sits in Africa's next generation of leadership seats",
  'Access to new partnerships, markets, and growth opportunities',
  'Fresh perspective and strategic clarity for your next level',
  'Greater visibility for your business, brand, or leadership journey',
  'A stronger network of women building and leading across the continent',
  "A front-row seat to the conversations shaping Africa's future economy",
] as const

const benefitSpanClasses = [
  'lg:col-span-6',
  'lg:col-span-6',
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-7',
  'lg:col-span-6',
  'lg:col-span-6',
] as const

export function SummitWhyAttendSection() {
  return (
    <section
      className='bg-background px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28'
      aria-labelledby='summit-why-attend-heading'
    >
      <div className='mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6'>
        <MotionReveal>
          <h2
            id='summit-why-attend-heading'
            className='font-melodrama text-5xl font-semibold leading-[0.95] text-champagne-gold sm:text-6xl lg:text-6xl 2xl:text-7xl'
          >
            Why Attend?
          </h2>
        </MotionReveal>

        <MotionReveal
          className='flex flex-col gap-5 text-sm leading-5 text-primary sm:text-base sm:leading-6 lg:max-w-3xl'
          delay={0.08}
        >
          <p>
            There is a different kind of power in being in a room full of women
            who understand the weight of leadership, the pressure to perform,
            and the ambition that keeps you building, leading, and showing up at
            the highest level.
          </p>
          <p>
            With 20+ Pan-African board and executive search firms in the room,
            Exhibitors, Entrepreneurs, Women in leadership and Board executives
            from across 35 countries in Africa, you will leave with:
          </p>
        </MotionReveal>

        <MotionReveal
          className='relative aspect-[1.22] overflow-hidden rounded-3xl bg-card lg:aspect-[1.28]'
          variant='image-reveal'
        >
          <Image
            src='/images/submit-img.jpg'
            alt='PAWEN speaker presenting at a summit event'
            fill
            sizes='(min-width: 1024px) 48vw, 100vw'
            className='object-cover object-center'
          />
        </MotionReveal>

        <div className='grid content-start gap-4 md:grid-cols-2 lg:grid-cols-12'>
          {attendBenefits.map((benefit, index) => (
            <MotionReveal
              as='article'
              className={`flex min-h-28 items-start justify-center gap-3 rounded-lg bg-[#1d1c14] px-5 py-5 text-primary md:min-h-32 lg:min-h-28 ${benefitSpanClasses[index]}`}
              key={benefit}
              delay={index * 0.03}
            >
              <Star
                className='size-4 shrink-0 fill-champagne-gold text-champagne-gold'
                aria-hidden='true'
              />
              <p className='text-sm leading-5 text-primary/86'>{benefit}</p>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
