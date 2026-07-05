import { MotionReveal } from '@/components/motion-reveal'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

type SummitFinalCtaSectionProps = {
  exhibitUrl: string
  registerUrl: string
  speakUrl: string
}

export function SummitFinalCtaSection({
  exhibitUrl,
  registerUrl,
  speakUrl,
}: SummitFinalCtaSectionProps) {
  return (
    <section
      className='relative isolate overflow-hidden bg-pawen-brand-color px-5 py-24 text-primary sm:px-8 lg:px-10 lg:py-32'
      aria-labelledby='summit-final-cta-heading'
    >
      <Image
        src='/clip-path.png'
        alt=''
        fill
        sizes='100vw'
        className='object-cover object-center'
        aria-hidden='true'
      />
      <div className='absolute inset-0 bg-background/28' aria-hidden='true' />

      <MotionReveal className='relative z-10 mx-auto flex min-h-[28rem] w-full max-w-3xl flex-col items-center justify-center gap-8 text-center'>
        <div className='flex flex-col items-center gap-7'>
          <h2
            id='summit-final-cta-heading'
            className='max-w-2xl text-5xl font-medium leading-tight text-primary sm:text-6xl lg:text-6xl'
          >
            VOICES THAT SHAPE THE CONTINENT
          </h2>
          <p className='max-w-lg text-sm leading-6 text-accent md:text-lg md:leading-8 lg:text-base lg:leading-7 2xl:text-base 3xl:text-lg 3xl:leading-8'>
            PAWEN&apos;s stages feature some of Africa&apos;s most respected
            leaders in business, innovation, finance, policy, and enterprise.
            Explore the 2025 speaker line-up for a sense of the calibre of
            conversation coming to Zambia in 2026.
          </p>
        </div>

        <div className='flex flex-col items-center justify-center gap-3 sm:flex-row'>
          <Button
            asChild
            className='h-11 min-w-32 rounded-full bg-accent px-8 text-xs font-medium text-background hover:bg-accent/90'
          >
            <Link href={registerUrl}>Register</Link>
          </Button>
          <Button
            asChild
            className='h-11 min-w-36 rounded-full bg-primary px-8 text-xs font-medium text-primary-foreground hover:bg-primary/90'
          >
            <Link href={exhibitUrl}>Book Exhibition Booth</Link>
          </Button>
          <Button
            asChild
            className='h-11 min-w-36 rounded-full border-primary/80 bg-transparent px-8 text-xs font-medium text-primary hover:border-accent hover:bg-accent hover:text-background'
          >
            <Link href={speakUrl}>Apply to Speak</Link>
          </Button>
        </div>
      </MotionReveal>
    </section>
  )
}
