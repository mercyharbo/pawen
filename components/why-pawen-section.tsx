import { CountUpNumber } from '@/components/count-up-number'
import { MotionReveal } from '@/components/motion-reveal'
import Image from 'next/image'

const impactStats = [
  {
    target: 35,
    suffix: '',
    label: 'Countries represented',
  },
  {
    target: 10000,
    suffix: '+',
    label: 'Women in our community',
  },
  {
    target: 70,
    suffix: '+',
    label: 'Faculty & speakers',
  },
  {
    target: 500,
    suffix: '+',
    label: 'Gala attendees',
  },
] as const

export function WhyPawenSection() {
  return (
    <section
      className='relative isolate overflow-hidden bg-background px-5 py-20 text-foreground sm:px-8 lg:px-10 lg:py-28'
      id='why-pawen'
    >
      <MotionReveal
        ariaHidden
        className='absolute inset-0'
        variant='image-reveal'
      >
        <Image
          src='/images/why-1.jpg'
          alt=''
          fill
          sizes='100vw'
          className='object-cover object-center'
        />
      </MotionReveal>
      <div className='absolute inset-0 bg-background/40' aria-hidden='true' />
      <div
        className='absolute inset-0 shadow-[inset_0_0_10rem_var(--color-background)]'
        aria-hidden='true'
      />

      <div className='relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-16 text-center'>
        <MotionReveal className='flex max-w-4xl flex-col items-center gap-5'>
          <h2 className='font-brand text-4xl font-bold leading-tight text-accent sm:text-5xl lg:text-3xl xl:text-5xl 2xl:text-6xl 3xl:text-6xl'>
            Why the PAWEN Awards Matter
          </h2>
          <div className='flex max-w-3xl flex-col gap-2 text-sm leading-6 text-primary'>
            <p>
              The PAWEN Awards is Africa&apos;s premier platform recognising
              women whose leadership, innovation and influence are shaping the
              continent&apos;s future.
            </p>
            <p>
              More than an award, it is a permanent record of achievement. A
              celebration of women whose work is creating jobs, building
              institutions, driving innovation, influencing policy and expanding
              opportunity across Africa and the diaspora.
            </p>
            <p>
              Each year, PAWEN brings together founders, executives, investors,
              policymakers and changemakers to honour excellence and spotlight
              the women helping define Africa&apos;s next chapter.
            </p>
          </div>
        </MotionReveal>

        <MotionReveal className='flex w-full max-w-5xl flex-col items-center gap-10'>
          <h3 className='font-brand text-3xl font-normal leading-tight text-primary sm:text-4xl'>
            Our Impact in Numbers
          </h3>

          <div className='grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0'>
            {impactStats.map((stat, index) => (
              <div
                className={`flex min-h-28 flex-col items-center justify-center gap-3 ${
                  index === 0 ? '' : 'lg:border-l lg:border-border'
                }`}
                key={stat.label}
              >
                <CountUpNumber
                  className='font-brand text-5xl font-bold leading-none text-accent sm:text-6xl'
                  suffix={stat.suffix}
                  target={stat.target}
                />
                <p className='text-xs font-bold leading-5 text-primary'>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
