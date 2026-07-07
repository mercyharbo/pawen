import { MotionReveal } from '@/components/motion-reveal'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  getAwardWinners,
  getWinnerYears,
  type AwardWinner,
  type WinnerYear,
} from '@/lib/contentful'
import Image from 'next/image'
import Link from 'next/link'

type WinnerMediaCardProps = {
  className?: string
  imageSizes: string
  winner: AwardWinner
}

function WinnerMediaCard({
  className = '',
  imageSizes,
  winner,
}: WinnerMediaCardProps) {
  return (
    <article
      className={`group/winner-media relative overflow-hidden rounded-xl bg-gray-200 ${className}`}
    >
      {winner.image ? (
        <Image
          src={winner.image.url}
          alt={winner.image.alt || winner.name}
          fill
          sizes={imageSizes}
          className='object-cover object-center grayscale transition duration-500 ease-out group-hover/winner-media:grayscale-0 group-focus-within/winner-media:grayscale-0'
        />
      ) : (
        <div className='absolute inset-0 bg-gray-200' aria-hidden='true' />
      )}

      <div
        className='absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent'
        aria-hidden='true'
      />

      <div className='relative z-10 flex h-full flex-col justify-end gap-2 p-5'>
        <h3 className='font-brand text-base font-semibold leading-6 text-primary'>
          {winner.name}
        </h3>
        {winner.winnerTitle ? (
          <p className='font-brand text-xs leading-5 text-primary/85'>
            {winner.winnerTitle}
          </p>
        ) : null}
      </div>
    </article>
  )
}

function EmptyWinnerPanel({ year }: { year: string }) {
  return (
    <div className='rounded-xl border border-accent/40 px-6 py-10 text-center font-brand text-sm leading-6 text-primary'>
      {year} winners will be published soon.
    </div>
  )
}

function WinnerYearPanel({
  winners,
  year,
}: {
  winners: AwardWinner[]
  year: WinnerYear
}) {
  const yearWinners = winners.filter((winner) => winner.yearId === year.id)
  const visibleWinners = yearWinners.slice(0, 4)

  if (yearWinners.length === 0) {
    return <EmptyWinnerPanel year={year.year} />
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='grid w-full gap-2 sm:grid-cols-2 lg:grid-cols-4'>
        {visibleWinners.map((winner) => (
          <WinnerMediaCard
            key={winner.slug}
            winner={winner}
            imageSizes='(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'
            className='min-h-72 sm:min-h-96'
          />
        ))}
      </div>
    </div>
  )
}

export async function GalaPastWinnersSection() {
  const [years, winners] = await Promise.all([
    getWinnerYears(),
    getAwardWinners(),
  ])
  const defaultYear = years[0]?.year ?? 'winners'

  return (
    <section
      id='hall-of-fame'
      aria-labelledby='gala-past-winners-heading'
      className='px-5 pb-10 pt-0 text-primary sm:px-8 lg:px-10 lg:pb-16'
    >
      <div className='mx-auto flex w-full max-w-7xl flex-col items-center gap-10'>
        <MotionReveal className='flex flex-col items-center gap-3 text-center'>
          <h2
            id='gala-past-winners-heading'
            className='font-melodrama text-4xl font-semibold leading-tight text-accent sm:text-5xl lg:text-6xl'
          >
            PAWEN Awards Past Winners
          </h2>
          <p className='font-brand text-sm leading-6 text-primary md:text-lg md:leading-8 lg:text-base lg:leading-7 2xl:text-base 3xl:text-lg 3xl:leading-8'>
            Explore the women honoured across PAWEN Awards editions.
          </p>
        </MotionReveal>

        {years.length === 0 ? (
          <div className='w-full rounded-xl border border-accent/40 px-6 py-10 text-center font-brand text-sm leading-6 text-primary'>
            Winner galleries will be published soon.
          </div>
        ) : (
          <Tabs
            defaultValue={defaultYear}
            className='w-full items-center gap-8'
          >
            <TabsList aria-label='Past winners by year'>
              {years.map((year) => (
                <TabsTrigger key={year.id} value={year.year}>
                  {year.year}
                </TabsTrigger>
              ))}
            </TabsList>

            {years.map((year) => (
              <TabsContent className='w-full' key={year.id} value={year.year}>
                <WinnerYearPanel winners={winners} year={year} />
              </TabsContent>
            ))}
          </Tabs>
        )}

        <Button
          asChild
          className='h-11 rounded-full bg-accent px-8 text-xs font-medium text-background hover:bg-accent/90'
        >
          <Link href='/winners'>See All Gallery</Link>
        </Button>
      </div>
    </section>
  )
}
