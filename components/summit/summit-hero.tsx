import { Button } from "@/components/ui/button";
import { MotionReveal } from "@/components/motion-reveal";
import Image from "next/image";
import Link from "next/link";

type SummitHeroProps = {
  exhibitUrl: string;
  registerUrl: string;
  speakUrl: string;
};

export function SummitHero({
  exhibitUrl,
  registerUrl,
  speakUrl,
}: SummitHeroProps) {
  return (
    <section
      id="summit"
      aria-labelledby="summit-hero-heading"
      className="relative isolate min-h-[calc(100svh-7.875rem)] overflow-hidden bg-background px-5 py-20 text-foreground sm:px-8 lg:px-10 lg:py-28"
    >
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-background/60"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-background/0 via-background/80 to-background"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-32 text-center sm:gap-36 lg:gap-44">
        <MotionReveal className="flex flex-col items-center gap-8">
          <div className="flex max-w-4xl flex-col items-center gap-5">
            <h1
              id="summit-hero-heading"
              className="font-melodrama text-4xl font-bold leading-tight text-champagne-gold sm:text-5xl lg:text-5xl xl:text-5xl 2xl:text-6xl 3xl:text-6xl"
            >
              The 2026 PAWEN Summit <br className="hidden sm:block" />&amp;
              Exhibition
            </h1>

            <div className="flex flex-col items-center gap-3 font-brand text-base leading-7 text-muted-beige sm:text-xl lg:text-2xl">
              <p>The Power Shift: African Women Leading in a Transformed World</p>
              <p className="flex flex-col items-center gap-2 sm:flex-row sm:gap-5">
                <span>Friday, 13 November 2026</span>
                <span aria-hidden="true" className="hidden sm:inline">
                  |
                </span>
                <span>InterContinental Hotel, Lusaka, Zambia</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              className="h-11 min-w-32 rounded-full bg-champagne-gold px-8 text-xs font-medium text-background hover:bg-champagne-gold/90"
            >
              <Link href={registerUrl}>Register</Link>
            </Button>
            <Button
              asChild
              className="h-11 min-w-36 rounded-full bg-primary px-8 text-xs font-medium text-primary-foreground hover:bg-primary/90"
            >
              <Link href={exhibitUrl}>Apply to Exhibit</Link>
            </Button>
            <Button
              asChild
              className="h-11 min-w-36 rounded-full border-primary/80 bg-transparent px-8 text-xs font-medium text-primary hover:border-champagne-gold hover:bg-champagne-gold hover:text-background"
            >
              <Link href={speakUrl}>Apply to Speak</Link>
            </Button>
          </div>
        </MotionReveal>

        <MotionReveal
          className="max-w-4xl font-brand text-2xl font-normal leading-tight text-muted-beige sm:text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl 3xl:text-3xl"
          delay={0.1}
        >
          <p>
            Africa is entering a new era of transformation, powered by
            technology, capital, innovation, and shifting global influence. The
            women who lead now will shape what comes next.
          </p>
          <p>
            The PAWEN Summit 2026 brings together Africa&apos;s most influential
            women, leaders, founders, executives, investors, policymakers, and
            changemakers, in Zambia for one defining conversation about the
            future of leadership, business, and opportunity on the continent.
          </p>
          <p>
            This is where ambitious women come to build powerful connections,
            access new opportunities, gain strategic insight, expand across
            markets, and position themselves for Africa&apos;s next chapter of
            growth.
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
