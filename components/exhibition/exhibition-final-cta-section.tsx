import { Button } from "@/components/ui/button";
import { MotionReveal } from "@/components/motion-reveal";
import Image from "next/image";
import Link from "next/link";

type ExhibitionFinalCtaSectionProps = {
  exhibitUrl: string;
  registerUrl: string;
};

export function ExhibitionFinalCtaSection({
  exhibitUrl,
  registerUrl,
}: ExhibitionFinalCtaSectionProps) {
  return (
    <section
      aria-labelledby="exhibition-final-cta-heading"
      className="relative isolate overflow-hidden bg-background px-5 py-24 text-primary sm:px-8 lg:px-10 lg:py-32"
    >
      {/* <Image
        src="/clip-path.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-background/28" aria-hidden="true" /> */}

      <MotionReveal className="relative z-10 mx-auto flex min-h-[28rem] w-full max-w-5xl flex-col items-center justify-center gap-8 text-center">
        <div className="flex flex-col items-center gap-7">
          <h2
            id="exhibition-final-cta-heading"
            className="font-melodrama text-5xl font-medium leading-[0.98] text-primary sm:text-6xl lg:text-7xl"
          >
            PUT YOUR BRAND IN THE
            <br />
            ROOM WHERE AFRICA&apos;S
            <br />
            FUTURE IS BEING SHAPED
          </h2>
          <p className="max-w-xl text-sm leading-5 text-champagne-gold sm:text-base sm:leading-6">
            The women building Africa&apos;s next economy will be in Zambia.
            Make sure your business is seen by them.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            className="h-11 min-w-36 rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
          >
            <Link href={exhibitUrl}>Apply to Exhibit</Link>
          </Button>
          <Button
            asChild
            className="h-11 min-w-44 rounded-full bg-champagne-gold px-8 text-background hover:bg-champagne-gold/90"
          >
            <Link href={registerUrl}>Register for the Summit</Link>
          </Button>
        </div>
      </MotionReveal>
    </section>
  );
}
