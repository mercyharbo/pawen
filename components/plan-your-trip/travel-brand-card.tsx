import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

type TravelBrandCardProps = {
  name: string
  description: string
  href: string
  imageAlt: string
  imageClassName?: string
  imageHeight: number
  imageSrc: string
  imageWidth: number
  note?: string
}

export function TravelBrandCard({
  name,
  description,
  href,
  imageAlt,
  imageClassName = '',
  imageHeight,
  imageSrc,
  imageWidth,
  note,
}: TravelBrandCardProps) {
  return (
    <article className='flex h-full flex-col overflow-hidden rounded-2xl border border-background/20'>
      <div className='flex min-h-48 items-center justify-center px-8 py-10'>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className={`max-h-28 w-auto max-w-full object-contain ${imageClassName}`}
        />
      </div>

      <div className='flex flex-1 flex-col gap-6 border-t border-background/15 px-6 py-7 sm:px-7'>
        <div className='flex flex-col gap-3'>
          <h3 className='font-brand text-xl font-semibold text-background'>
            {name}
          </h3>
          <p className='text-sm leading-6 text-background/70'>{description}</p>
          {note ? (
            <p className='text-xs font-semibold text-dark-gold'>{note}</p>
          ) : null}
        </div>

        <a
          href={href}
          target='_blank'
          rel='noreferrer'
          className='group inline-flex w-fit items-center gap-2 text-sm font-semibold text-background underline decoration-dark-gold/70 underline-offset-4 transition-colors hover:text-dark-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-gold'
          aria-label={`View booking options for ${name}`}
        >
          View booking options
          <ArrowUpRight
            className='size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
            aria-hidden='true'
          />
        </a>
      </div>
    </article>
  )
}
