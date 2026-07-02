'use client'

import { Button } from '@/components/ui/button'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

type GalaNightCard = {
  body: string
  buttonClassName: string
  cta: string
  href: string
  imageAlt: string
  imageClassName: string
  imageSrc: string
  overlayClassName: string
  textClassName: string
  title: string
}

const galaNightCards: GalaNightCard[] = [
  {
    title: '25 Awards',
    body: 'Across 4 Categories Recognising African women in entrepreneurship, corporate leadership, and impact and public service.',
    cta: 'View All Categories',
    href: '/nominations#award-categories',
    imageSrc: '/images/IMG-7.png',
    imageAlt: 'PAWEN award winner holding a trophy',
    imageClassName:
      'origin-right scale-200 object-cover object-right sm:scale-150',
    overlayClassName: 'bg-champagne-gold/65 sm:bg-champagne-gold/10',
    textClassName: 'text-background',
    buttonClassName: 'bg-background text-primary hover:bg-background/90',
  },
  {
    title: 'An Exquisitely Curated Programme',
    body: 'Live performances, headline conversations, and the kind of moments that make a gala unforgettable.',
    cta: 'View Program',
    href: '/gala#program',
    imageSrc: '/images/IMG-9.png',
    imageAlt: 'PAWEN gala guest speaking during dinner',
    imageClassName: 'object-cover object-center',
    overlayClassName: 'bg-champagne-gold/20 sm:bg-transparent',
    textClassName: 'text-background',
    buttonClassName: 'bg-background text-primary hover:bg-background/90',
  },
  {
    title: 'An African Glam Dining Experience',
    body: "A curated dinner celebrating the best of African cuisine, hospitality, and culture, presented by Zambia's finest.",
    cta: 'View Program',
    href: '/gala#program',
    imageSrc: '/images/IMG-10.png',
    imageAlt: 'PAWEN gala attendees holding awards',
    imageClassName: 'object-cover object-center',
    overlayClassName: 'bg-background/45 sm:bg-background/15',
    textClassName: 'text-primary',
    buttonClassName:
      'bg-champagne-gold text-background hover:bg-champagne-gold/90',
  },
]

type GalaNightStackCardProps = {
  card: GalaNightCard
  index: number
  progress: MotionValue<number>
}

function GalaNightStackCard({
  card,
  index,
  progress,
}: GalaNightStackCardProps) {
  const start = index / galaNightCards.length
  const middle = (index + 0.5) / galaNightCards.length
  const end = (index + 1) / galaNightCards.length
  const isFirstCard = index === 0
  const isLastCard = index === galaNightCards.length - 1

  const x = useTransform(
    progress,
    [Math.max(0, start - 0.08), middle, Math.min(1, end + 0.08)],
    isFirstCard
      ? ['0%', '0%', '-18%']
      : isLastCard
        ? ['105%', '0%', '0%']
        : ['105%', '0%', '-18%'],
  )
  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.08), start, middle, end],
    isFirstCard ? [1, 1, 1, 1] : [0, 1, 1, 1],
  )
  const scale = useTransform(
    progress,
    [Math.max(0, start - 0.08), middle, Math.min(1, end + 0.08)],
    isLastCard ? [0.97, 1, 1] : [1, 1, 0.97],
  )

  return (
    <motion.article
      className='absolute inset-0 overflow-hidden rounded-2xl bg-champagne-gold text-background shadow-2xl shadow-background/30'
      style={{ opacity, scale, x, zIndex: index + 1 }}
    >
      <Image
        src={card.imageSrc}
        alt={card.imageAlt}
        fill
        sizes='(min-width: 1280px) 72rem, 100vw'
        className={card.imageClassName}
      />
      <div
        className={`absolute inset-0 ${card.overlayClassName}`}
        aria-hidden='true'
      />

      <div className='relative z-10 flex min-h-[24rem] w-full max-w-xl flex-col justify-center gap-8 px-6 py-10 sm:min-h-[28rem] sm:px-12 lg:min-h-[30rem] lg:px-20'>
        <div className='flex flex-col gap-5'>
          <h3
            className={`font-melodrama text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-5xl ${card.textClassName}`}
          >
            {card.title}
          </h3>
          <p
            className={`max-w-sm font-brand text-base font-medium leading-7 text-white sm:text-lg sm:leading-8 ${card.textClassName}`}
          >
            {card.body}
          </p>
        </div>

        <Button
          asChild
          className={`h-11 w-full max-w-xs rounded-full px-8 font-medium ${card.buttonClassName}`}
        >
          <Link href={card.href}>{card.cta}</Link>
        </Button>
      </div>
    </motion.article>
  )
}

export function GalaNightSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  if (reduceMotion) {
    return (
      <section
        aria-labelledby='gala-night-heading'
        className='bg-background px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28'
      >
        <div className='mx-auto flex w-full max-w-6xl flex-col items-center gap-8'>
          <h2
            id='gala-night-heading'
            className='font-melodrama text-4xl font-semibold leading-[0.98] text-champagne-gold sm:text-5xl lg:text-6xl'
          >
            What the Night Holds
          </h2>

          <div className='grid w-full gap-5'>
            {galaNightCards.map((card) => (
              <article
                className='relative min-h-[24rem] overflow-hidden rounded-2xl bg-champagne-gold text-background sm:min-h-[28rem] lg:min-h-[30rem]'
                key={card.title}
              >
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  fill
                  sizes='(min-width: 1280px) 72rem, 100vw'
                  className={card.imageClassName}
                />
                <div
                  className={`absolute inset-0 ${card.overlayClassName}`}
                  aria-hidden='true'
                />
                <div className='relative z-10 flex min-h-[24rem] w-full max-w-lg flex-col justify-center gap-8 px-6 py-10 sm:min-h-[28rem] sm:px-12 lg:min-h-[30rem] lg:px-20'>
                  <div className='flex flex-col gap-5'>
                    <h3
                      className={`font-melodrama text-5xl font-medium leading-[0.98] sm:text-6xl lg:text-7xl ${card.textClassName}`}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`max-w-sm font-brand text-base font-medium leading-7 sm:text-lg sm:leading-8 ${card.textClassName}`}
                    >
                      {card.body}
                    </p>
                  </div>
                  <Button
                    asChild
                    className={`h-11 w-full max-w-xs rounded-full px-8 text-xs font-medium ${card.buttonClassName}`}
                  >
                    <Link href={card.href}>{card.cta}</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      aria-labelledby='gala-night-heading'
      className='relative min-h-[320svh] bg-background px-5 text-primary sm:px-8 lg:px-10'
      ref={sectionRef}
    >
      <div className='sticky top-24 mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-6xl flex-col items-center justify-center gap-8 py-20 lg:py-28'>
        <motion.h2
          id='gala-night-heading'
          className='font-melodrama text-4xl font-semibold leading-[0.98] text-champagne-gold sm:text-5xl lg:text-6xl'
          initial={{ opacity: 0, y: 40, filter: 'blur(16px)' }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.4 }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        >
          What the Night Holds
        </motion.h2>

        <div className='relative min-h-[24rem] w-full overflow-hidden rounded-2xl sm:min-h-[28rem] lg:min-h-[30rem]'>
          {galaNightCards.map((card, index) => (
            <GalaNightStackCard
              card={card}
              index={index}
              key={card.title}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
