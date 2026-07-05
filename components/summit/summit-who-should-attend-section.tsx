import { MotionReveal } from '@/components/motion-reveal'
import Image from 'next/image'

const attendeeProfiles = [
  {
    label: 'Founders and entrepreneurs',
    positionClass: 'lg:left-[3%] lg:top-[15%]',
  },
  {
    label: 'Investors and financial institutions',
    positionClass: 'lg:right-[3%] lg:top-[15%]',
  },
  {
    label: 'Board advisors and executive search leaders',
    positionClass: 'lg:left-[11%] lg:top-[40%]',
  },
  {
    label: 'Policymakers and ecosystem builders',
    positionClass: 'lg:right-[11%] lg:top-[40%]',
  },
  {
    label: 'Corporate executives and emerging leaders',
    positionClass: 'lg:left-[19%] lg:bottom-[10%]',
  },
  {
    label: 'Women building careers, businesses, and influence across Africa',
    positionClass: 'lg:right-[19%] lg:bottom-[9%]',
  },
] as const

function AttendeeProfileCard({
  delay,
  label,
  positionClass,
}: {
  delay: number
  label: string
  positionClass: string
}) {
  return (
    <MotionReveal
      as='article'
      className={`overflow-hidden rounded bg-[#222315] text-center text-accent shadow-[0_18px_50px_rgba(0,0,0,0.25)] lg:absolute lg:w-40 ${positionClass}`}
      delay={delay}
      variant='scale-in'
    >
      <p className='flex min-h-16 items-center justify-center px-3 py-2 text-xs font-medium leading-4'>
        <span className='line-clamp-4'>{label}</span>
      </p>
    </MotionReveal>
  )
}

export function SummitWhoShouldAttendSection() {
  return (
    <section
      className='relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-pawen-brand-color)_0%,var(--color-pawen-brand-color)_42%,rgba(28,6,45,0.82)_58%,var(--background)_74%,var(--background)_100%)] px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-24'
      aria-labelledby='summit-who-should-attend-heading'
    >
      <Image
        src='/submit-star-bg.png'
        alt=''
        fill
        sizes='100vw'
        className='object-cover object-center'
        aria-hidden='true'
      />
      <div
        className='absolute inset-0 bg-background/20'
        aria-hidden='true'
      />

      <div className='relative z-10 mx-auto flex w-full max-w-[92rem] flex-col items-center gap-12 lg:min-h-[44rem] lg:justify-center'>
        <MotionReveal
          className='relative flex aspect-square w-full max-w-sm items-center justify-center sm:max-w-md lg:max-w-[28rem]'
          variant='scale-in'
        >
          <Image
            src='/star-vector.png'
            alt=''
            fill
            sizes='(min-width: 1024px) 28rem, 90vw'
            className='object-contain'
            aria-hidden='true'
          />
          <h2
            id='summit-who-should-attend-heading'
            className='absolute left-1/2 top-1/2 z-10 w-44 -translate-x-1/2 -translate-y-[42%] text-center font-melodrama font-semibold text-4xl text-background lg:text-3xl'
          >
            Who Should Attend?
          </h2>
        </MotionReveal>

        <div className='grid w-full max-w-3xl grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:contents'>
          {attendeeProfiles.map((profile, index) => (
            <AttendeeProfileCard
              key={profile.label}
              delay={index * 0.04}
              label={profile.label}
              positionClass={profile.positionClass}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
