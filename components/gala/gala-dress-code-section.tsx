import { MotionReveal } from '@/components/motion-reveal'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const dressCodeLinks = [
  'Aso Oke',
  'Hand-beaded Maasai-inspired Gown',
  'Embroidered Kaftan',
  'Zambian Chitenge Couture',
] as const

export function GalaDressCodeSection() {
  return (
    <section
      aria-labelledby='gala-dress-code-heading'
      className='px-5 py-24 text-primary sm:px-8 lg:px-10 lg:py-32'
    >
      <MotionReveal className='mx-auto flex w-full max-w-4xl flex-col items-center gap-8 text-center'>
        <div className='flex flex-col items-center gap-6'>
          <h2
            id='gala-dress-code-heading'
            className='font-melodrama text-4xl font-semibold leading-[0.98] text-champagne-gold sm:text-5xl lg:text-6xl'
          >
            A celebration. A statement.
            <br />
            An expression of who we are.
          </h2>

          <p className='max-w-2xl font-brand text-sm leading-6 text-primary md:text-lg md:leading-8 lg:text-base lg:leading-7 2xl:text-base 3xl:text-lg 3xl:leading-8'>
            The dress code for the 2026 PAWEN Awards Gala is African Glam: a
            deliberate invitation to step onto the stage of the night dressed in
            the elegance, colour, and craftsmanship of the continent. Whether
            that is a tailored Aso Oke, a hand-beaded Maasai-inspired gown, an
            embroidered kaftan, a Zambian chitenge couture piece, or any
            reimagined statement of African heritage, this is your moment to
            wear what makes you feel powerful.
          </p>
        </div>

        <div className='flex w-full flex-wrap items-center justify-center gap-3 sm:gap-4'>
          {dressCodeLinks.map((label, index) => (
            <Button
              asChild
              className='h-10 w-full rounded-full bg-champagne-gold px-7 text-xs font-medium text-background hover:bg-champagne-gold/90 sm:w-auto'
              key={`${label}-${index}`}
            >
              <Link href='#hall-of-fame'>{label}</Link>
            </Button>
          ))}
        </div>
      </MotionReveal>
    </section>
  )
}
