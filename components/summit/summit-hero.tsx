import { MotionReveal } from '@/components/motion-reveal'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

type SummitHeroProps = {
  exhibitUrl: string
  registerUrl: string
  speakUrl: string
}

export function SummitHero({
  exhibitUrl,
  registerUrl,
  speakUrl,
}: SummitHeroProps) {
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
                  <span className='font-semibold text-accent'>
                    Date:
                  </span>{' '}
                  <span className='font-semibold'>
                    13-14 November 2026
                  </span>
                </span>
                <span className='lg:whitespace-nowrap'>
                  <span className='font-semibold text-accent'>
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
              className='h-11 min-w-32 rounded-full bg-accent px-8 text-xs font-medium text-background hover:bg-accent/90'
            >
              <Link href={registerUrl}>Register</Link>
            </Button>
            <Button
              asChild
              className='h-11 min-w-36 rounded-full bg-primary px-8 text-xs font-medium text-primary-foreground hover:bg-primary/90'
            >
              <Link href={exhibitUrl}>Book Exhibition Booth</Link>
            </Button>
            <Button
              asChild
              className='h-11 min-w-36 rounded-full border-primary/80 bg-transparent px-8 text-xs font-medium text-primary hover:border-accent hover:bg-accent hover:text-background'
            >
              <Link href={speakUrl}>Apply to Speak</Link>
            </Button>
          </div>
        </MotionReveal>

        <MotionReveal
          className='max-w-4xl space-y-10 font-brand text-base font-normal leading-6 md:text-lg md:leading-8 lg:text-base lg:leading-7 2xl:text-base 3xl:text-lg 3xl:leading-8'
          delay={0.1}
        >
          <p>
            Africa is entering a new era of transformation, powered by
            technology, capital, innovation, and shifting global influence. The
            women who lead now will shape what comes next.
          </p>
          <p>
            The PAWEN Summit 2026 brings together Africa&apos;s most influential
            women, leaders, founders, executives, investors, policymakers, and
            changemakers, in Zambia for one defining conversation about the
            future of leadership, business, and opportunity on the continent.
          </p>
          <p>
            This is where 1000+ ambitious women gather to build powerful connections,
            access new opportunities, gain strategic insight, expand across
            markets, and position themselves for Africa&apos;s next chapter of
            growth.
          </p>
        </MotionReveal>
      </div>
    </section>
  )
}
