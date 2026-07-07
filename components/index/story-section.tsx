import { MotionReveal } from '@/components/motion-reveal'
import Image from 'next/image'

type StorySectionProps = {
  supportUrl: string
}

const experiences = [
  {
    title: 'Leadership Summit',
    copy: 'Where 1000+ African women leaders gather for strategic conversations, networking and purposeful growth.',
    image: '/images/leadershipp.jpg',
  },
  {
    title: 'Exhibition',
    copy: 'Where women-led businesses meet buyers, investors, partners and new markets.',
    image: '/images/IMG (3).jpg',
  },
  {
    title: 'Awards Gala',
    copy: 'A night honouring the women building Africa’s economic future',
    image: '/images/award-gala.jpg',
    copyClassName: 'max-w-80',
  },
] as const

export function StorySection({ supportUrl }: StorySectionProps) {
  return (
    <section
      className='relative isolate overflow-hidden bg-pawen-brand-color px-5 py-10 text-foreground sm:px-8 lg:px-10 lg:py-16'
      id='our-story'
    >
      <div className='relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-20 lg:gap-28'>
        <div className='grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28 xl:gap-36 2xl:gap-50'>
          <MotionReveal
            className='flex justify-center lg:justify-end'
            variant='scale-in'
          >
            <Image
              src='/Award-Plaquee.gif'
              alt='PAWEN Awards plaques'
              width={1373}
              height={4096}
              className='h-auto w-36 sm:w-44 lg:w-52'
              priority
              unoptimized
            />
          </MotionReveal>

          <MotionReveal className='flex max-w-xl flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <h2 className='font-brand text-4xl font-bold leading-tight text-primary sm:text-5xl'>
                A Pan-African <span className='text-accent'>Movement</span>
              </h2>
              <p className='text-sm'>
                Every edition carries this platform further across the
                continent.
              </p>
            </div>

            <div className='flex max-w-lg flex-col gap-8 text-sm leading-6 text-muted-foreground md:text-lg md:leading-8 lg:text-base lg:leading-7 2xl:text-base 3xl:text-lg 3xl:leading-8'>
              <p className='text-base lg:text-lg leading-relaxed font-medium text-primary'>
                The PAWEN Awards recognises visionary women across Africa and
                the diaspora, celebrating their impact while preserving their
                legacy for generations to come.
              </p>

              <div className='flex flex-wrap items-center gap-4 sm:gap-6'>
                <div className='flex flex-col gap-1'>
                  {/* <h3 className='text-lg font-bold leading-6 text-primary'>
                    Lagos
                  </h3> */}
                  <div className='flex flex-col text-xs leading-5 text-primary'>
                    <span>Nigeria</span>
                    <span>2023-2025</span>
                  </div>
                </div>
                <span
                  className='h-px w-10 overflow-hidden bg-accent text-transparent sm:w-14'
                  aria-hidden='true'
                >
                  •
                </span>
                <div className='flex flex-col gap-1'>
                  {/* <h3 className='text-lg font-bold leading-6 text-primary'>
                    Lusaka
                  </h3> */}
                  <div className='flex flex-col text-xs leading-5 text-accent'>
                    <span>Zambia</span>
                    <span>2026</span>
                  </div>
                </div>
                <span
                  className='h-px w-10 overflow-hidden bg-primary/70 text-transparent sm:w-14'
                  aria-hidden='true'
                >
                  •
                </span>
                <p className='self-center text-lg italic leading-7'>next</p>
              </div>
            </div>
          </MotionReveal>
        </div>

        <div className='flex flex-col gap-10'>
          <MotionReveal className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
            <h2 className='max-w-2xl text-left font-brand text-4xl font-bold leading-tight text-accent sm:mx-auto sm:text-center sm:text-5xl'>
              <span className='block sm:hidden'>
                <span className='block'>3 experiences,</span>
                <span className='block'>2 days,</span>
                <span className='block text-primary'>1 Platform.</span>
              </span>
              <span className='hidden sm:block'>
                <span className='block'>3 experiences,</span>
                <span className='block'>
                  2 days, <span className='text-primary'>1 Platform.</span>
                </span>
              </span>
            </h2>
          </MotionReveal>

          <div className='grid gap-5 md:grid-cols-3'>
            {experiences.map((experience, index) => (
              <MotionReveal
                as='article'
                className='group flex flex-col gap-4'
                delay={index * 0.08}
                key={experience.title}
                variant='image-reveal'
              >
                <div className='relative aspect-square overflow-hidden rounded-md bg-card'>
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    sizes='(min-width: 768px) 33vw, 100vw'
                    className='object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <h3 className='font-brand text-lg font-bold leading-6 text-accent'>
                    {experience.title}
                  </h3>
                  <p
                    className={`overflow-hidden text-ellipsis text-sm leading-6 text-primary [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] ${
                      'copyClassName' in experience
                        ? experience.copyClassName
                        : ''
                    }`}
                  >
                    {experience.copy}
                  </p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
