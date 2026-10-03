import { MotionReveal } from '@/components/motion-reveal'
import { Button } from '@/components/ui/button'
import { getSpeakers, type Speaker } from '@/lib/contentful'
import Image from 'next/image'
import Link from 'next/link'

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='currentColor'
      aria-hidden='true'
    >
      <path d='M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19ZM8.34 17.67V9.75H5.88V17.67H8.34ZM7.11 8.67C7.9 8.67 8.43 8.14 8.43 7.45C8.42 6.74 7.9 6.23 7.13 6.23C6.36 6.23 5.82 6.74 5.82 7.45C5.82 8.14 6.34 8.67 7.1 8.67H7.11ZM18.18 17.67V13.13C18.18 10.7 16.88 9.57 15.15 9.57C13.75 9.57 13.13 10.34 12.78 10.88V9.75H10.33C10.36 10.49 10.33 17.67 10.33 17.67H12.78V13.25C12.78 13.01 12.8 12.78 12.87 12.61C13.04 12.14 13.44 11.65 14.1 11.65C14.97 11.65 15.32 12.31 15.32 13.28V17.67H18.18Z' />
    </svg>
  )
}

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <article className='group/speaker-card flex min-h-full flex-col overflow-hidden rounded-none border border-accent bg-accent text-background transition-transform duration-300 ease-out hover:scale-105'>
      <div className='relative aspect-[0.86] overflow-hidden bg-background/20'>
        {speaker.image ? (
          <Image
            src={speaker.image.url}
            alt={speaker.image.alt || speaker.name}
            fill
            unoptimized
            sizes='(min-width: 1920px) 20vw, (min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
            className='object-cover object-center grayscale transition duration-500 ease-out group-hover/speaker-card:grayscale-0 group-focus-within/speaker-card:grayscale-0'
          />
        ) : null}
        {speaker.country ? (
          <span className='absolute top-0 right-0 z-10 border-b border-l border-accent bg-background px-3 py-1.5 text-xs font-medium text-primary'>
            {speaker.country}
          </span>
        ) : null}
      </div>

      <div className='flex flex-1 flex-col justify-between gap-4 p-5'>
        <div className='flex flex-col gap-1.5'>
          <h3 className='font-brand text-lg font-bold leading-6 text-background'>
            {speaker.name}
          </h3>
          {speaker.professionalTitle ? (
            <p className='font-brand text-sm leading-5 text-background/80'>
              {speaker.professionalTitle}
            </p>
          ) : null}
          {speaker.company ? (
            <p className='font-brand text-sm font-semibold leading-5 text-background/90'>
              {speaker.company}
            </p>
          ) : null}
        </div>

        {speaker.linkedinUrl ? (
          <Link
            href={speaker.linkedinUrl}
            aria-label={`${speaker.name} on LinkedIn`}
            target='_blank'
            rel='noreferrer'
            className='flex size-8 items-center justify-center rounded bg-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background'
          >
            <LinkedInIcon className='size-8 text-[#0A66C2]' />
          </Link>
        ) : null}
      </div>
    </article>
  )
}

export async function SummitSpeakersSection() {
  let speakers: Speaker[] = []

  try {
    speakers = await getSpeakers()
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      (('digest' in error && error.digest === 'DYNAMIC_SERVER_USAGE') ||
        ('message' in error &&
          typeof error.message === 'string' &&
          error.message.includes('Dynamic server usage')))
    ) {
      throw error
    }
    console.error('Failed to load summit speakers:', error)
  }

  // Display curated list of 2026 speakers on the homepage (up to 10)
  const summit2026Speakers = speakers.filter(
    (speaker) => speaker.year === '2026' || !speaker.year,
  )
  const displayedSpeakers = (
    summit2026Speakers.length > 0 ? summit2026Speakers : speakers
  ).slice(0, 10)

  return (
    <section
      className='relative isolate overflow-hidden bg-pawen-brand-color px-5 py-12 text-foreground sm:px-8 lg:px-10 lg:py-20'
      id='speakers'
    >
      <div className='relative z-10 mx-auto flex w-full max-w-[1905px] flex-col items-center gap-12 text-center'>
        <MotionReveal className='flex flex-col items-center gap-3'>
          <h2 className='font-brand text-4xl font-bold leading-tight text-accent sm:text-5xl 2xl:text-6xl 3xl:text-6xl'>
            2026 Summit Speakers
          </h2>
        </MotionReveal>

        {displayedSpeakers.length > 0 ? (
          <div className='grid w-full gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 text-left'>
            {displayedSpeakers.map((speaker, index) => (
              <MotionReveal
                key={speaker.slug || `${speaker.name}-${index}`}
                delay={index * 0.05}
                className='flex flex-col'
              >
                <SpeakerCard speaker={speaker} />
              </MotionReveal>
            ))}
          </div>
        ) : null}

        <MotionReveal>
          <Button
            asChild
            className='h-12 rounded-full bg-accent px-8 text-sm font-semibold text-background hover:bg-accent/90'
          >
            <Link href='/speakers'>View full 2026 Speaker list</Link>
          </Button>
        </MotionReveal>
      </div>
    </section>
  )
}
