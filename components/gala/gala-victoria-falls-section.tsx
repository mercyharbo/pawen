import { MotionReveal } from '@/components/motion-reveal'
import Image from 'next/image'

const victoriaFallsDetails = [
  {
    label: 'Departing:',
    value: 'Sunday, 15 November 2026',
  },
  {
    label: 'Location:',
    value: 'Livingstone, Zambia',
  },
  {
    label: 'Add-on package:',
    value: 'Organized by our travel partner',
  },
] as const

export function GalaVictoriaFallsSection() {
  return (
    <section
      aria-labelledby='gala-victoria-falls-heading'
      className='py-10 text-primary lg:py-16'
    >
      <MotionReveal
        className='relative flex min-h-[36rem] w-full overflow-hidden px-5 py-16 sm:px-8 lg:min-h-[42rem] lg:px-10'
        variant='image-reveal'
      >
        <Image
          src='/images/IMG-8.jpg'
          alt='Victoria Falls waterfall landscape'
          fill
          sizes='100vw'
          className='object-cover object-center'
        />
        <div className='absolute inset-0 bg-background/68' aria-hidden='true' />
        <div
          className='absolute inset-0 bg-gradient-to-b from-background/20 via-background/30 to-background/45'
          aria-hidden='true'
        />

        <div className='relative z-10 m-auto flex w-full max-w-4xl flex-col items-center gap-7 text-center'>
          <h2
            id='gala-victoria-falls-heading'
            className='max-w-4xl text-4xl font-semibold leading-tight text-accent sm:text-5xl lg:text-6xl'
          >
            Extend Your Stay: Experience Zambia
          </h2>

          <div className='flex max-w-3xl flex-col gap-4 text-sm leading-6 text-primary md:text-lg md:leading-8 lg:text-base lg:leading-7 2xl:text-base 3xl:text-lg 3xl:leading-8'>
            <p className='font-medium text-white text-base sm:text-lg'>
              Your PAWEN experience does not have to end when the Summit does.
            </p>
            <p>
              In partnership with the Zambia Tourism Agency, a selection of
              post-Summit experiences is being curated for delegates who want to
              discover more of Zambia. Choose from a range of experiences
              designed through Zambia&apos;s tourism network, from unforgettable
              landscapes and wildlife to culture, adventure and some of the
              country&apos;s most iconic destinations.
            </p>
            <p>
              Whether that means standing before the magnificent Victoria Falls,
              experiencing Zambia&apos;s natural beauty or simply spending more
              time exploring with women you have met at PAWEN, there will be
              options to suit different interests and schedules.
            </p>
            <p className='font-semibold text-white text-base sm:text-lg pt-1'>
              Come for PAWEN. Stay to experience Zambia.
            </p>
          </div>

          <div className='grid w-full max-w-3xl gap-3 sm:grid-cols-3'>
            {victoriaFallsDetails.map((detail) => (
              <article
                className='flex min-h-16 flex-col items-center justify-center gap-2 rounded-md bg-background/30 px-4 py-4 text-center'
                key={detail.label}
              >
                <h3 className='text-sm font-semibold text-accent'>
                  {detail.label}
                </h3>
                <p className='text-sm font-semibold leading-5 text-primary'>
                  {detail.value}
                </p>
              </article>
            ))}
          </div>

          {/* <Button
            asChild
            className='h-11 w-full rounded-full bg-accent px-8 text-xs font-medium text-background hover:bg-accent/90 sm:w-fit'
          >
            <Link href='#tickets-and-tables'>
              Express Interest in the Victoria Falls Experience
            </Link>
          </Button> */}
        </div>
      </MotionReveal>
    </section>
  )
}
