import { MotionReveal } from '@/components/motion-reveal'

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
      className='px-5 py-10 text-primary sm:px-8 lg:px-10 lg:py-16'
    >
      <MotionReveal className='mx-auto flex w-full max-w-4xl flex-col items-center gap-8 text-center'>
        <div className='flex flex-col items-center gap-6'>
          <h2
            id='gala-dress-code-heading'
            className='font-melodrama text-4xl font-semibold leading-[0.98] text-accent sm:text-5xl lg:text-6xl'
          >
            A celebration,
            <br />
            A statement,
            <br />
            An expression,
            <br />
            of who we are.
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
      </MotionReveal>
    </section>
  )
}
