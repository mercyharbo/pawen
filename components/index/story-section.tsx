import { MotionReveal } from '@/components/motion-reveal'
import Image from 'next/image'
import Link from 'next/link'

type StorySectionProps = {
  supportUrl: string
}

const experiences = [
  {
    title: 'The PAWEN Summit',
    subtitle: 'Learn. Lead. Expand.',
    copy: 'Two days of powerful conversations, practical learning and strategic connections for women building careers, businesses and influence across Africa.',
    image: '/images/leadershipp.jpg',
    ctaText: 'Explore the Summit →',
    ctaHref: '/summit',
  },
  {
    title: 'The PAWEN Exhibition',
    subtitle: 'Show. Sell. Connect. Collaborate.',
    copy: 'A Pan-African marketplace putting businesses and brands in front of customers, corporate buyers, partners, investors and decision-makers.',
    image: '/images/IMG (3).jpg',
    ctaText: 'Book a Booth →',
    ctaHref: '/exhibition',
  },
  {
    title: 'The PAWEN Awards',
    subtitle: 'Recognise. Honour. Celebrate.',
    copy: 'An evening celebrating African women whose leadership, enterprise and impact are helping shape the continent.',
    image: '/images/award-gala.jpg',
    ctaText: 'Get Gala Tickets →',
    ctaHref: '/gala',
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
              src='/USE-THIS-ONE.gif'
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
                Africa Meets in <span className='text-accent'>Zambia</span>
              </h2>
            </div>

            <div className='flex max-w-lg flex-col gap-6 text-sm leading-6 text-muted-foreground md:text-lg md:leading-8 lg:text-base lg:leading-7 2xl:text-base 3xl:text-lg 3xl:leading-8'>
              <p className='text-base lg:text-lg leading-relaxed font-medium text-primary'>
                In November 2026, women from across Africa and the diaspora will gather in
                Lusaka, Zambia for two days of ideas, business, connection, influence and
                celebration.
              </p>

              <ul className='flex flex-col gap-2.5 text-sm font-medium text-white sm:text-base pt-1'>
                <li className='flex items-center gap-2.5'>
                  <span className='size-1.5 rounded-full bg-accent shrink-0' aria-hidden='true' />
                  <span>2,000+ attendees</span>
                </li>
                <li className='flex items-center gap-2.5'>
                  <span className='size-1.5 rounded-full bg-accent shrink-0' aria-hidden='true' />
                  <span>35+ countries</span>
                </li>
                <li className='flex items-center gap-2.5'>
                  <span className='size-1.5 rounded-full bg-accent shrink-0' aria-hidden='true' />
                  <span>50+ speakers</span>
                </li>
                <li className='flex items-center gap-2.5'>
                  <span className='size-1.5 rounded-full bg-accent shrink-0' aria-hidden='true' />
                  <span>3 flagship experiences</span>
                </li>
              </ul>
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

          <div className='grid gap-6 md:grid-cols-3'>
            {experiences.map((experience, index) => (
              <MotionReveal
                as='article'
                className='group flex flex-col justify-between gap-4 rounded-xl'
                delay={index * 0.08}
                key={experience.title}
                variant='image-reveal'
              >
                <div className='flex flex-col gap-4'>
                  <div className='relative aspect-square overflow-hidden rounded-md bg-card'>
                    <Image
                      src={experience.image}
                      alt={experience.title}
                      fill
                      sizes='(min-width: 768px) 33vw, 100vw'
                      className='object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0'
                    />
                  </div>
                  <div className='flex flex-col gap-1.5'>
                    <h3 className='font-brand text-xl font-bold leading-snug text-accent'>
                      {experience.title}
                    </h3>
                    <p className='font-brand text-xs font-semibold uppercase tracking-wider text-primary/75 sm:text-sm'>
                      {experience.subtitle}
                    </p>
                    <p className='mt-1 text-sm leading-relaxed text-primary/85'>
                      {experience.copy}
                    </p>
                  </div>
                </div>

                <div className='pt-2'>
                  <Link
                    href={experience.ctaHref}
                    className='inline-flex items-center text-sm font-semibold text-accent transition-colors hover:text-accent/80 hover:underline'
                  >
                    {experience.ctaText}
                  </Link>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
