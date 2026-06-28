import { Button } from "@/components/ui/button";
import { MotionReveal } from "@/components/motion-reveal";
import Image from "next/image";
import Link from "next/link";

type StorySectionProps = {
  supportUrl: string;
};

const experiences = [
  {
    title: "PAWEN Leadership Summit",
    copy: "Where Africa's women leaders gather for strategic conversations and purposeful growth.",
    image: "/images/IMG (1).jpg",
  },
  {
    title: "PAWEN Trade Exhibition",
    copy: "Where women-led businesses meet buyers, investors, partners and new markets.",
    image: "/images/IMG (3).jpg",
  },
  {
    title: "The PAWEN Award Gala",
    copy: "A night honouring the women shaping the continent through vision, leadership and enterprise.",
    image: "/images/IMG (2).jpg",
  },
] as const;

export function StorySection({ supportUrl }: StorySectionProps) {
  return (
    <section
      className='relative isolate overflow-hidden bg-background px-5 py-20 text-foreground sm:px-8 lg:px-10 lg:py-28'
      id='our-story'
    >
      <div className='relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-68'>
        <div className='grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28 xl:gap-36 2xl:gap-50'>
          <MotionReveal
            className='flex justify-center lg:justify-end'
            variant='scale-in'
          >
            <Image
              src='/images/award.png'
              alt='The PAWEN Awards trophy'
              width={1373}
              height={4096}
              className='h-auto w-36 sm:w-44 lg:w-52'
              priority
            />
          </MotionReveal>

          <MotionReveal className='flex max-w-xl flex-col gap-5'>
            <h2 className='font-brand text-4xl font-bold leading-tight text-primary sm:text-5xl'>
              History Is Shaped by{' '}
              <span className='text-accent'>Those Who Lead</span>
            </h2>
            <div className='flex max-w-lg flex-col gap-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8'>
              <p>
                The PAWEN Awards is Africa&apos;s premier platform celebrating
                and recognising women whose leadership, innovation and influence
                are shaping the continent&apos;s future.
              </p>
              <p>
                This is where achievement is recognised. Influence is amplified.
                Legacy is established.
              </p>
            </div>
          </MotionReveal>
        </div>

        <div className='flex flex-col gap-10'>
          <MotionReveal className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
            <h2 className='max-w-2xl font-brand text-4xl font-bold leading-tight text-accent sm:text-5xl'>
              Three experiences,
              <br />
              Two days, <span className='text-primary'>One Platform:</span>
            </h2>
            <Button
              render={<Link href={supportUrl} />}
              className='h-11 w-fit rounded-full bg-accent px-8 text-sm font-medium text-accent-foreground hover:bg-accent/90'
            >
              View More
            </Button>
          </MotionReveal>

          <div className='grid gap-5 md:grid-cols-3'>
            {experiences.map((experience, index) => (
              <MotionReveal
                as='article'
                className='group flex flex-col gap-4'
                delay={index * 0.08}
                key={experience.title}
                variant='image-reveal'
              >
                <div className='relative aspect-square overflow-hidden rounded-md bg-card'>
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    sizes='(min-width: 768px) 33vw, 100vw'
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                  />
                  <div
                    className='absolute inset-0 bg-accent/80 mix-blend-color'
                    aria-hidden='true'
                  />
                  <div
                    className='absolute inset-0 bg-background/10'
                    aria-hidden='true'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <h3 className='font-brand text-lg font-bold leading-6 text-accent'>
                    {experience.title}
                  </h3>
                  <p className='text-sm leading-6 text-primary'>
                    {experience.copy}
                  </p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
