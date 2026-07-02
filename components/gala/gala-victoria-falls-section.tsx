import { MotionReveal } from "@/components/motion-reveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const victoriaFallsDetails = [
  {
    label: "Departing:",
    value: "Sunday, 15 November 2026",
  },
  {
    label: "Location:",
    value: "Livingstone, Zambia",
  },
  {
    label: "Add-on package:",
    value: "Organized by our travel partner",
  },
] as const;

export function GalaVictoriaFallsSection() {
  return (
    <section
      aria-labelledby='gala-victoria-falls-heading'
      className='bg-background py-20 text-primary lg:py-28'
    >
      <MotionReveal
        className='relative flex min-h-[36rem] w-full overflow-hidden px-5 py-16 sm:px-8 lg:min-h-[42rem] lg:px-10'
        variant='image-reveal'
      >
        <Image
          src='/images/IMG-8.jpg'
          alt='Victoria Falls waterfall landscape'
          fill
          sizes='100vw'
          className='object-cover object-center'
        />
        <div className='absolute inset-0 bg-background/68' aria-hidden='true' />
        <div
          className='absolute inset-0 bg-gradient-to-b from-background/20 via-background/30 to-background/45'
          aria-hidden='true'
        />

        <div className='relative z-10 m-auto flex w-full max-w-4xl flex-col items-center gap-7 text-center'>
          <h2
            id='gala-victoria-falls-heading'
            className='max-w-4xl text-4xl font-semibold leading-tight text-champagne-gold sm:text-5xl lg:text-6xl'
          >
            Extend Your Stay: The PAWEN Victoria Falls Experience
          </h2>

          <div className='flex max-w-3xl flex-col gap-3 text-xs leading-5 text-primary sm:text-sm sm:leading-6'>
            <p>
              One of the Seven Natural Wonders of the World. Curated for the
              PAWEN community. After the celebration in Lusaka, join us on a
              journey to Victoria Falls, the breathtaking natural wonder shared
              between Zambia and Zimbabwe.
            </p>
            <p>
              This optional group trip is curated exclusively for the PAWEN
              community by a trusted travel partner, with a thoughtfully
              designed itinerary that includes guided tours of the Falls, sunset
              experiences, and time to connect with the women you have just
              spent the week celebrating. It is the perfect way to extend your
              time in Zambia, deepen the friendships made at the Awards, and
              step into one of Africa&apos;s most spectacular landscapes
              alongside fellow leaders, founders, and changemakers.
            </p>
            <p>
              With 20+ Pan-African board and executive search firms in the room,
              Exhibitors, Entrepreneurs, Women in leadership and Board
              executives from across 35 countries in Africa, you will leave
              with:
            </p>
          </div>

          <div className='grid w-full max-w-3xl gap-3 sm:grid-cols-3'>
            {victoriaFallsDetails.map((detail) => (
              <article
                className='flex min-h-16 flex-col items-center justify-center gap-2 rounded-md bg-background/30 px-4 py-4 text-center'
                key={detail.label}
              >
                <h3 className='text-sm font-semibold text-champagne-gold'>
                  {detail.label}
                </h3>
                <p className='text-sm font-semibold leading-5 text-primary'>
                  {detail.value}
                </p>
              </article>
            ))}
          </div>

          <Button
            asChild
            className='h-11 w-full rounded-full bg-champagne-gold px-8 text-xs font-medium text-background hover:bg-champagne-gold/90 sm:w-fit'
          >
            <Link href='#tickets-and-tables'>
              Express Interest in the Victoria Falls Experience
            </Link>
          </Button>
        </div>
      </MotionReveal>
    </section>
  )
}
