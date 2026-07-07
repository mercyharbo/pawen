import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  getAwardCategories,
  getAwardWinners,
  getWinnerYears,
  type AwardCategory,
  type AwardWinner,
  type WinnerYear,
} from '@/lib/contentful'
import { createPageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = createPageMetadata({
  path: '/winners',
  title: 'Award Winners',
  description:
    'Explore PAWEN Award winners by year and award category, celebrating women entrepreneurs, leaders, founders, and changemakers across Africa.',
  keywords: [
    'PAWEN winners',
    'PAWEN award winners',
    'women award winners',
    'African women leaders',
    'award categories',
  ],
})

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

function WinnerCard({ winner }: { winner: AwardWinner }) {
  return (
    <article className='group/winner-card flex min-h-full flex-col overflow-hidden rounded-xl border border-accent bg-accent text-background'>
      <div className='relative aspect-[0.86] overflow-hidden bg-gray-200'>
        {winner.image ? (
          <Image
            src={winner.image.url}
            alt={winner.image.alt || winner.name}
            fill
            sizes='(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw'
            className='object-cover object-center grayscale transition duration-500 ease-out group-hover/winner-card:grayscale-0 group-focus-within/winner-card:grayscale-0'
          />
        ) : null}
      </div>

      <div className='flex flex-1 flex-col gap-5 p-5'>
        <div className='flex flex-col gap-2'>
          <h2 className='font-brand text-lg font-bold leading-6 text-background'>
            {winner.name}
          </h2>
          <p className='font-brand text-sm leading-5 text-background/80'>
            {winner.winnerTitle}
          </p>
        </div>

        {winner.linkedinUrl ? (
          <Link
            href={winner.linkedinUrl}
            aria-label={`${winner.name} on LinkedIn`}
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

function WinnerGrid({ winners }: { winners: AwardWinner[] }) {
  if (winners.length === 0) {
    return (
      <div className='rounded-xl border border-accent px-6 py-10 text-center font-brand text-sm leading-6 text-primary'>
        Winners for this category will be announced soon.
      </div>
    )
  }

  return (
    <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
      {winners.map((winner) => (
        <WinnerCard key={winner.slug} winner={winner} />
      ))}
    </div>
  )
}

function CategoryTabs({
  categories,
  winners,
}: {
  categories: AwardCategory[]
  winners: AwardWinner[]
}) {
  const activeCategories = categories.filter((category) =>
    winners.some((winner) => winner.categoryId === category.id),
  )
  const defaultCategory = activeCategories[0]?.slug ?? 'all'

  if (activeCategories.length === 0) {
    return <WinnerGrid winners={winners} />
  }

  return (
    <Tabs defaultValue={defaultCategory} className='w-full items-center gap-8'>
      <TabsList
        aria-label='Award categories'
        className='h-auto flex-wrap gap-2 bg-transparent p-0'
      >
        {activeCategories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.slug}
            className='h-11 min-w-0 bg-primary/8 px-6 text-sm'
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {activeCategories.map((category) => (
        <TabsContent key={category.id} value={category.slug} className='w-full'>
          <WinnerGrid
            winners={winners.filter(
              (winner) => winner.categoryId === category.id,
            )}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}

function YearPanel({
  categories,
  winners,
  year,
}: {
  categories: AwardCategory[]
  winners: AwardWinner[]
  year: WinnerYear
}) {
  const yearWinners = winners.filter((winner) => winner.yearId === year.id)

  return (
    <div className='flex flex-col items-center gap-8'>
      <div className='flex max-w-3xl flex-col items-center gap-3 text-center'>
        <h2 className='font-melodrama text-4xl font-semibold leading-[0.98] text-accent sm:text-5xl lg:text-6xl'>
          {year.heading}
        </h2>
        {year.intro ? (
          <p className='font-brand text-sm leading-6 text-primary md:text-lg md:leading-8 lg:text-base lg:leading-7'>
            {year.intro}
          </p>
        ) : null}
      </div>

      <CategoryTabs categories={categories} winners={yearWinners} />
    </div>
  )
}

export default async function WinnersPage() {
  const [years, categories, winners] = await Promise.all([
    getWinnerYears(),
    getAwardCategories(),
    getAwardWinners(),
  ])
  const defaultYear = years[0]?.year ?? 'winners'

  return (
    <main className='bg-pawen-brand-color px-5 py-10 text-primary sm:px-8 lg:px-10 lg:py-16'>
      <section className='mx-auto flex w-full max-w-6xl flex-col items-center gap-10'>
        {years.length === 0 ? (
          <div className='flex max-w-3xl flex-col items-center gap-4 text-center'>
            <h1 className='font-melodrama text-5xl font-semibold leading-[0.98] text-accent sm:text-6xl lg:text-7xl'>
              Award Winners
            </h1>
            <p className='font-brand text-sm leading-6 text-primary md:text-lg md:leading-8 lg:text-base lg:leading-7'>
              Winner galleries will be published soon.
            </p>
          </div>
        ) : (
          <Tabs defaultValue={defaultYear} className='w-full items-center gap-8'>
            <TabsList
              aria-label='Winner years'
              className='h-auto flex-wrap gap-2 bg-transparent p-0'
            >
              {years.map((year) => (
                <TabsTrigger
                  key={year.id}
                  value={year.year}
                  className='h-11 min-w-0 bg-primary/8 px-6 text-sm'
                >
                  {year.year}
                </TabsTrigger>
              ))}
            </TabsList>

            {years.map((year) => (
              <TabsContent key={year.id} value={year.year} className='w-full'>
                <YearPanel
                  categories={categories}
                  winners={winners}
                  year={year}
                />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </section>
    </main>
  )
}
