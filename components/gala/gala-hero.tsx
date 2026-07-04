import { CountUpNumber } from '@/components/count-up-number'
import { MotionReveal } from '@/components/motion-reveal'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

type GalaHeroProps = {
  brochureUrl: string
  ticketsUrl: string
}

const galaStats = [
  { label: 'Countries represented', suffix: '', target: 35 },
  { label: 'Women in our community', suffix: '+', target: 10000 },
  { label: 'Faculty & speakers', suffix: '+', target: 70 },
] as const

export function GalaHero({ brochureUrl, ticketsUrl }: GalaHeroProps) {
  return (
    <section
      id='awards-gala'
      aria-labelledby='gala-hero-heading'
      className='relative isolate min-h-[calc(100svh-7.875rem)] overflow-hidden px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28'
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
      <div className='absolute inset-0 bg-[#25023c]/76' aria-hidden='true' />
      <div
        className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(185,153,214,0.42)_0%,rgba(82,42,112,0.32)_22%,rgba(35,6,56,0)_48%)]'
        aria-hidden='true'
      />
      <div
        className='absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-[#220338]/0 via-[#220338]/88 to-[#220338]'
        aria-hidden='true'
      />

      <div className='relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-32 text-center sm:gap-36 lg:gap-44'>
        <MotionReveal className='flex flex-col items-center gap-10'>
          <div className='flex max-w-4xl flex-col items-center gap-5'>
            <h1
              id='gala-hero-heading'
              className='font-melodrama text-4xl font-bold leading-tight text-champagne-gold sm:text-5xl lg:text-5xl xl:text-5xl 2xl:text-6xl 3xl:text-6xl'
            >
              The 2026 PAWEN
              <br />
              Awards Gala
            </h1>

            <div className='flex flex-col items-center gap-3 font-brand text-sm leading-6 text-muted-beige md:text-lg md:leading-8 lg:text-base lg:leading-7 2xl:text-base 3xl:text-lg 3xl:leading-8'>
              <p>An evening of recognition, celebration, and connection.</p>
              <p className='flex flex-col items-center justify-center gap-3 text-primary lg:flex-row lg:flex-nowrap lg:gap-8'>
                <span className='lg:whitespace-nowrap'>
                  <span className='font-semibold text-champagne-gold'>
                    Date:
                  </span>{' '}
                  <span className='font-semibold'>
                    Saturday, 14 November 2026
                  </span>
                </span>
                <span className='lg:whitespace-nowrap'>
                  <span className='font-semibold text-champagne-gold'>
                    Location:
                  </span>{' '}
                  <span className='font-semibold'>
                    InterContinental Hotel, Lusaka, Zambia
                  </span>
                </span>
              </p>
            </div>
          </div>

          <div className='flex flex-col items-center justify-center gap-3 sm:flex-row'>
            <Button
              asChild
              className='h-11 min-w-32 rounded-full bg-champagne-gold px-8 text-xs font-medium text-background hover:bg-champagne-gold/90'
            >
              <Link href={ticketsUrl}>Get Tickets</Link>
            </Button>
            <Button
              asChild
              className='h-11 min-w-44 rounded-full bg-primary px-8 text-xs font-medium text-primary-foreground hover:bg-primary/90'
            >
              <Link href={brochureUrl}>Explore Our Brochure</Link>
            </Button>
          </div>

          <div className='grid w-full max-w-4xl gap-8 sm:grid-cols-3 sm:gap-0'>
            {galaStats.map((stat) => (
              <div
                className='flex min-h-24 flex-col items-center justify-center gap-4 border-primary/10 sm:border-r sm:last:border-r-0'
                key={stat.label}
              >
                <CountUpNumber
                  className='font-brand text-4xl font-semibold leading-none text-champagne-gold sm:text-5xl'
                  suffix={stat.suffix}
                  target={stat.target}
                />
                <p className='font-brand text-xs font-medium uppercase leading-5 text-primary'>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </MotionReveal>

        <div className='grid w-full items-center gap-12 text-left lg:grid-cols-2 lg:gap-16'>
          <MotionReveal className='flex max-w-xl flex-col gap-6'>
            <h2 className='font-melodrama text-4xl font-semibold leading-[0.98] text-champagne-gold sm:text-5xl lg:text-6xl'>
              A Night to Remember
            </h2>
            <p className='font-brand text-sm leading-6 text-primary md:text-lg md:leading-8 lg:text-base lg:leading-7 2xl:text-base 3xl:text-lg 3xl:leading-8'>
              The PAWEN Awards Gala is the defining moment of the year for the
              Pan African Women Empowerment Network: a high-impact gathering of
              the women building companies, shaping institutions, and driving
              transformation across the continent. In one powerful evening,
              awards spotlight the founders building bold ventures, the leaders
              driving change within institutions, and the trailblazers opening
              new paths across the continent, alongside the partners, allies,
              and changemakers standing beside them.
            </p>
          </MotionReveal>

          <MotionReveal
            className='min-h-80 rounded-2xl bg-primary sm:min-h-96 lg:min-h-[28rem]'
            delay={0.08}
            variant='scale-in'
          >
            <div aria-hidden='true' />
          </MotionReveal>
        </div>
      </div>
    </section>
  )
}
