"use client";

import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  nominationsUrl: string;
  ticketsUrl: string;
};

type HeroParticle = {
  left: number;
  top: number;
  size: number;
  opacity: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  scale: number;
};

const heroParticles: HeroParticle[] = [
  [3, 44, 4, 0.58, 18, -18, 10, 0, 1.7],
  [7, 23, 3, 0.5, -14, 20, 12, 1.1, 1.5],
  [10, 78, 6, 0.72, 22, -26, 13, 0.4, 1.6],
  [14, 36, 4, 0.64, -18, -20, 11, 1.8, 1.8],
  [18, 63, 3, 0.52, 16, 24, 10, 2.2, 1.55],
  [22, 18, 5, 0.68, 24, -16, 14, 0.8, 1.45],
  [26, 84, 4, 0.57, -20, 18, 12, 1.5, 1.7],
  [30, 46, 7, 0.76, 18, -30, 15, 0.2, 1.35],
  [34, 27, 3, 0.56, -22, 20, 11, 2.6, 1.8],
  [38, 71, 5, 0.66, 20, 24, 13, 0.9, 1.5],
  [42, 55, 3, 0.5, -16, -22, 10, 1.7, 1.75],
  [46, 16, 6, 0.74, 26, 18, 16, 0.5, 1.4],
  [50, 82, 4, 0.6, -18, -20, 12, 2.4, 1.65],
  [54, 38, 8, 0.78, 22, -26, 14, 1.2, 1.35],
  [58, 66, 3, 0.54, -20, 24, 11, 0.7, 1.8],
  [62, 24, 5, 0.7, 24, 18, 13, 2, 1.5],
  [66, 78, 4, 0.58, -24, -18, 15, 1.4, 1.6],
  [70, 44, 7, 0.76, 18, 28, 12, 0.3, 1.4],
  [74, 18, 3, 0.55, -18, 22, 10, 2.8, 1.85],
  [78, 61, 5, 0.68, 20, -26, 14, 1, 1.55],
  [82, 31, 4, 0.62, -22, -18, 11, 2.1, 1.7],
  [86, 72, 8, 0.8, 24, 20, 16, 0.6, 1.32],
  [90, 48, 3, 0.56, -18, 26, 12, 1.6, 1.8],
  [94, 20, 5, 0.7, 20, -22, 13, 0.9, 1.5],
  [96, 86, 4, 0.6, -24, -16, 15, 2.5, 1.65],
].map(
  ([left, top, size, opacity, x, y, duration, delay, scale]) => ({
    left,
    top,
    size,
    opacity,
    x,
    y,
    duration,
    delay,
    scale,
  }),
);

export function Hero({ nominationsUrl, ticketsUrl }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const revealTransition = {
    duration: 1.15,
    ease: [0.22, 1, 0.36, 1],
  } as const;

  return (
    <section className='relative isolate flex min-h-[calc(100svh-7.875rem)] overflow-hidden bg-pawen-brand-color text-foreground md:min-h-[calc(115svh-7.875rem)]'>
      <motion.div
        className='absolute inset-0'
        initial={reduceMotion ? false : { opacity: 0.68, scale: 1.04 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={revealTransition}
        aria-hidden='true'
      >
        <Image
          src='/images/IMG-6.png'
          alt=''
          fill
          priority
          sizes='100vw'
          className='object-cover object-center md:hidden'
        />
        <Image
          src='/images/hero-bg.jpg'
          alt=''
          fill
          priority
          sizes='100vw'
          className='hidden object-cover object-top md:block'
        />
      </motion.div>

      <motion.div
        className='absolute inset-0'
        initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
        animate={reduceMotion ? undefined : { opacity: 0.95, scale: 1 }}
        transition={revealTransition}
        aria-hidden='true'
      >
        <Image
          src='/images/hero-overlay.png'
          alt=''
          fill
          priority
          sizes='100vw'
          className='hidden object-cover object-center md:block'
        />
      </motion.div>

      <motion.div
        className='absolute inset-0 bg-[#2b0645]/58'
        initial={reduceMotion ? false : { opacity: 0.78 }}
        animate={reduceMotion ? undefined : { opacity: 1 }}
        transition={revealTransition}
        aria-hidden='true'
      />
      <motion.div
        className='absolute inset-0 shadow-[inset_0_0_10rem_#26043f] opacity-90'
        initial={reduceMotion ? false : { opacity: 0.3 }}
        animate={reduceMotion ? undefined : { opacity: 0.9 }}
        transition={revealTransition}
        aria-hidden='true'
      />

      <motion.div
        className='pointer-events-none absolute inset-0 mix-blend-screen'
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? { opacity: 0.72 } : { opacity: 1 }}
        transition={revealTransition}
        aria-hidden='true'
      >
        {heroParticles.map((particle, index) => (
          <motion.span
            key={`${particle.left}-${particle.top}-${index}`}
            className='absolute rounded-full bg-[#ffd56a] shadow-[0_0_0.625rem_rgba(255,213,106,0.85),0_0_1.75rem_rgba(232,200,114,0.65)]'
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
            }}
            initial={
              reduceMotion
                ? false
                : { opacity: particle.opacity * 0.55, x: 0, y: 0, scale: 1 }
            }
            animate={
              reduceMotion
                ? { opacity: particle.opacity }
                : {
                    opacity: [
                      particle.opacity * 0.65,
                      particle.opacity,
                      particle.opacity * 0.72,
                    ],
                    x: [0, particle.x, 0],
                    y: [0, particle.y, 0],
                    scale: [1, particle.scale, 1],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: particle.duration,
                    delay: particle.delay,
                    ease: 'easeInOut',
                    repeat: Infinity,
                  }
            }
          />
        ))}
      </motion.div>

      <div className='relative z-10 mx-auto flex w-full max-w-[1905px] items-center justify-center px-5 py-12 text-center sm:px-8 md:py-20 lg:px-10'>
        <motion.div
          className='flex max-w-4xl flex-col items-center gap-8'
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 18, scale: 0.985, filter: 'blur(12px)' }
          }
          animate={
            reduceMotion
              ? undefined
              : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
          }
          transition={revealTransition}
        >
          <div className='flex flex-col items-center gap-5'>
            <h1 className='max-w-3xl font-brand text-4xl font-bold leading-tight text-accent sm:text-5xl lg:text-3xl xl:text-5xl 2xl:text-6xl 3xl:text-6xl'>
              Africa&apos;s Premier Platform for Women&apos;s Economic Leadership
            </h1>
            <p className='font-sans text-base font-normal leading-6 md:text-lg md:leading-8 lg:text-base lg:leading-7 2xl:text-base 3xl:text-lg 3xl:leading-8'>
              A Summit, An Exhibition and a Gala celebration to honour the women
              building Africa&apos;s economic future
            </p>
          </div>

          <div className='flex flex-wrap items-center justify-center gap-3'>
            <Button
              asChild
              className='h-12 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90'
            >
              <Link href={nominationsUrl}>Nominate Now</Link>
            </Button>
            <Button
              asChild
              className='h-12 rounded-full bg-accent px-8 text-sm font-medium text-accent-foreground hover:bg-accent/90'
            >
              <Link href={ticketsUrl}>Partner with Us</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
