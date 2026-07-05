import { MotionReveal } from '@/components/motion-reveal'
import Image from 'next/image'

export function NominationWhySection() {
  return (
    <section
      aria-labelledby='nomination-why-heading'
      className='relative isolate overflow-hidden px-5 py-5 text-primary sm:px-8 lg:px-10 lg:py-10'
    >
      <MotionReveal
        ariaHidden
        className='absolute inset-0'
        variant='image-reveal'
      >
        <Image
          src='/Vector.png'
          alt=''
          fill
          sizes='100vw'
          className='object-cover object-center'
        />
      </MotionReveal>
      <div
        className='absolute inset-0 bg-pawen-brand-color/18'
        aria-hidden='true'
      />

      <MotionReveal className='relative z-10 mx-auto flex min-h-96 w-full max-w-4xl flex-col items-center justify-center gap-6 text-center lg:min-h-[32rem]'>
        <h2
          id='nomination-why-heading'
          className='font-melodrama text-4xl font-medium leading-[0.98] text-primary sm:text-5xl lg:text-6xl'
        >
          Why Nominate
        </h2>
        <p className='max-w-3xl font-brand text-base leading-6 md:text-lg md:leading-8 lg:text-base lg:leading-7 2xl:text-base 3xl:text-lg 3xl:leading-8'>
          The women leading Africa forward are everywhere: in boardrooms and at
          decision-making tables, building startups and scaling enterprises,
          leading public institutions and reshaping entire industries. The
          question has never been whether they exist. It&apos;s whether their
          work is known, celebrated, and easy for the world to find.
        </p>
      </MotionReveal>
    </section>
  )
}
