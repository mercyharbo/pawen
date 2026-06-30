import { MotionReveal } from "@/components/motion-reveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function GalaNightSection() {
  return (
    <section
      aria-labelledby="gala-night-heading"
      className="bg-background px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8">
        <MotionReveal>
          <h2
            id="gala-night-heading"
            className="font-melodrama text-4xl font-semibold leading-[0.98] text-champagne-gold sm:text-5xl lg:text-6xl"
          >
            What the Night Holds
          </h2>
        </MotionReveal>

        <MotionReveal
          className="relative min-h-[24rem] w-full overflow-hidden rounded-2xl bg-champagne-gold text-background sm:min-h-[28rem] lg:min-h-[30rem]"
          delay={0.08}
          variant="image-reveal"
        >
          <Image
            src="/images/IMG-7.png"
            alt="PAWEN award winner holding a trophy"
            fill
            sizes="(min-width: 1280px) 72rem, 100vw"
            className="origin-right scale-125 object-cover object-right"
          />
          <div
            className="absolute inset-0 bg-champagne-gold/10"
            aria-hidden="true"
          />

          <div className="relative z-10 flex min-h-[24rem] w-full max-w-lg flex-col justify-center gap-8 px-6 py-10 sm:min-h-[28rem] sm:px-12 lg:min-h-[30rem] lg:px-20">
            <div className="flex flex-col gap-5">
              <h3 className="font-melodrama text-5xl font-medium leading-[0.98] text-background sm:text-6xl lg:text-7xl">
                25 Awards
              </h3>
              <p className="max-w-sm font-brand text-base font-medium leading-7 text-background sm:text-lg sm:leading-8">
                Across 4 Categories Recognising African women in
                entrepreneurship, corporate leadership, and impact and public
                service.
              </p>
            </div>

            <Button
              asChild
              className="h-11 w-full max-w-xs rounded-full bg-background px-8 text-xs font-medium text-primary hover:bg-background/90"
            >
              <Link href="/nominations#award-categories">View All Categories</Link>
            </Button>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
