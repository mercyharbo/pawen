import { MotionReveal } from "@/components/motion-reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type GalaFinalCtaSectionProps = {
  ticketsUrl: string;
};

export function GalaFinalCtaSection({ ticketsUrl }: GalaFinalCtaSectionProps) {
  return (
    <section
      aria-labelledby="gala-final-cta-heading"
      className="relative isolate overflow-hidden bg-background px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden font-melodrama text-[18rem] font-bold leading-none text-primary/[0.03] sm:text-[24rem] lg:text-[34rem]"
        aria-hidden="true"
      >
        <span className="translate-y-8">PAWEN</span>
      </div>

      <MotionReveal className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-7 text-center">
        <div className="flex flex-col items-center gap-5">
          <h2
            id="gala-final-cta-heading"
            className="font-melodrama text-5xl font-medium leading-[0.98] text-primary sm:text-6xl lg:text-7xl"
          >
            SEE YOU IN LUSAKA.
          </h2>
          <p className="max-w-xl font-brand text-sm leading-6 text-accent md:text-lg md:leading-8 lg:text-base lg:leading-7 2xl:text-base 3xl:text-lg 3xl:leading-8">
            One night. One room. The women shaping Africa&apos;s next decade.
            <br />
            Be in the room.
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            className="h-11 w-full rounded-full bg-accent px-8 text-xs font-medium text-background hover:bg-accent/90 sm:w-auto"
          >
            <Link href={ticketsUrl}>Get Gala Ticket</Link>
          </Button>
          <Button
            asChild
            className="h-11 w-full rounded-full bg-primary px-8 text-xs font-medium text-background hover:bg-primary/90 sm:w-auto"
          >
            <Link href={ticketsUrl}>Book a Table</Link>
          </Button>
          <Button
            asChild
            className="h-11 w-full rounded-full border border-primary/70 bg-transparent px-8 text-xs font-medium text-primary hover:bg-primary hover:text-background sm:w-auto"
          >
            <Link href={ticketsUrl}>Become a Sponsor</Link>
          </Button>
        </div>
      </MotionReveal>
    </section>
  );
}
