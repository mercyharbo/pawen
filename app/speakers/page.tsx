import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  getSpeakerPageContent,
  getSpeakers,
  type Speaker,
} from '@/lib/contentful'
import { createPageMetadata, siteConfig } from '@/lib/seo'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const speakerCategories = [
  'All Speakers',
  'Keynote',
  'Hosts',
  'Panels',
  'Fireside',
  'Moderators',
] as const

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

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSpeakerPageContent()
  const title = (page.seoTitle || page.heading).replace(
    ` | ${siteConfig.name}`,
    '',
  )

  return createPageMetadata({
    path: '/speakers',
    title,
    description: page.seoDescription || page.intro,
    keywords: [
      'PAWEN speakers',
      'PAWEN Summit speakers',
      'women speakers Africa',
      'business speakers',
      'leadership speakers',
    ],
  })
}

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <article className='group/speaker-card flex min-h-full flex-col overflow-hidden rounded-xl border border-accent bg-accent text-background'>
      <div className='relative aspect-[0.86] overflow-hidden bg-gray-200'>
        {speaker.image ? (
          <Image
            src={speaker.image.url}
            alt={speaker.image.alt || speaker.name}
            fill
            sizes='(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw'
            className='object-cover object-center grayscale transition duration-500 ease-out group-hover/speaker-card:grayscale-0 group-focus-within/speaker-card:grayscale-0'
          />
        ) : null}
      </div>

      <div className='flex flex-1 flex-col gap-3 p-5'>
        <div className='flex flex-col gap-2'>
          <span className='w-fit rounded-full bg-background px-3 py-1 text-xs font-medium leading-none text-primary'>
            {speaker.eventRoleLabel}
          </span>
          <h2 className='font-brand text-lg font-bold leading-6 text-background'>
            {speaker.name}
          </h2>
          <p className='font-brand text-sm leading-5 text-background/80'>
            {speaker.professionalTitle}
          </p>
          {speaker.bio ? (
            <p className='font-brand text-sm leading-5 text-background/70'>
              {speaker.bio}
            </p>
          ) : null}
        </div>

        {speaker.linkedinUrl ? (
          <Link
            href={speaker.linkedinUrl}
            aria-label={`${speaker.name} on LinkedIn`}
            target='_blank'
            rel='noreferrer'
            className='flex size-9 items-center justify-center rounded bg-background text-primary transition-colors hover:bg-background/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'
          >
            <LinkedInIcon className='size-6' />
          </Link>
        ) : null}
      </div>
    </article>
  )
}

function SpeakerGrid({ speakers }: { speakers: Speaker[] }) {
  if (speakers.length === 0) {
    return (
      <div className='rounded-xl border border-accent px-6 py-10 text-center font-brand text-sm leading-6 text-primary'>
        Speaker details will be announced soon.
      </div>
    )
  }

  return (
    <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
      {speakers.map((speaker) => (
        <SpeakerCard key={speaker.slug} speaker={speaker} />
      ))}
    </div>
  )
}

export default async function SpeakersPage() {
  const [page, speakers] = await Promise.all([
    getSpeakerPageContent(),
    getSpeakers(),
  ])

  return (
    <main className='bg-pawen-brand-color px-5 py-10 text-primary sm:px-8 lg:px-10 lg:py-16'>
      <section className='mx-auto flex w-full max-w-6xl flex-col items-center gap-12'>
        <div className='flex max-w-3xl flex-col items-center gap-6 text-center'>
          <h1 className='font-melodrama text-5xl font-semibold leading-[0.98] text-accent sm:text-6xl lg:text-7xl'>
            {page.heading}
          </h1>
          <p className='font-brand text-sm leading-6 text-primary md:text-lg md:leading-8 lg:text-base lg:leading-7'>
            {page.intro}
          </p>
          {page.ctaLabel && page.ctaUrl ? (
            <Button
              asChild
              className='h-11 rounded-full bg-accent px-8 text-xs font-medium text-background hover:bg-accent/90'
            >
              <Link href={page.ctaUrl}>{page.ctaLabel}</Link>
            </Button>
          ) : null}
        </div>

        <Tabs defaultValue='All Speakers' className='w-full items-center gap-8'>
          <TabsList
            aria-label='Speaker categories'
            className='h-auto flex-wrap gap-2 bg-transparent p-0'
          >
            {speakerCategories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className='h-11 min-w-0 bg-primary/8 px-6 text-sm'
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value='All Speakers' className='w-full'>
            <SpeakerGrid speakers={speakers} />
          </TabsContent>

          {speakerCategories.slice(1).map((category) => (
            <TabsContent key={category} value={category} className='w-full'>
              <SpeakerGrid
                speakers={speakers.filter(
                  (speaker) => speaker.category === category,
                )}
              />
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </main>
  )
}
