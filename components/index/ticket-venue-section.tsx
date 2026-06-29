import { Button } from "@/components/ui/button";
import { MotionReveal } from "@/components/motion-reveal";
import Image from "next/image";
import Link from "next/link";

type TicketVenueSectionProps = {
  ticketsUrl: string;
};

export function TicketVenueSection({ ticketsUrl }: TicketVenueSectionProps) {
  return (
    <section
      className="relative isolate overflow-hidden bg-background px-5 py-16 text-foreground sm:px-8 lg:px-10"
      aria-labelledby="ticket-venue-heading"
    >
      <div className="relative mx-auto flex min-h-96 w-full max-w-7xl overflow-hidden rounded-md bg-card px-5 py-16 sm:px-8 lg:min-h-128 lg:px-10">
        <MotionReveal
          ariaHidden
          className="absolute inset-0"
          variant="image-reveal"
        >
          <Image
            src="/images/ticket-image.jpg"
            alt=""
            fill
            sizes="(min-width: 1280px) 80rem, 100vw"
            className="object-cover object-center"
          />
        </MotionReveal>
        <div className="absolute inset-0 bg-background/78" aria-hidden="true" />
        <div
          className="absolute inset-0 shadow-[inset_0_0_9rem_var(--color-background)]"
          aria-hidden="true"
        />

        <MotionReveal className="relative z-10 m-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <p className="font-brand text-xs font-medium leading-5 text-accent">
            13-14 November 2026.
          </p>
          <h2
            id="ticket-venue-heading"
            className="font-brand text-4xl font-normal leading-tight text-primary sm:text-5xl lg:text-3xl xl:text-5xl 2xl:text-6xl 3xl:text-6xl"
          >
            INTERCONTINENTAL HOTEL, LUSAKA, ZAMBIA.
          </h2>
          <Button
            render={<Link href={ticketsUrl} />}
            className="h-12 rounded-full bg-accent px-8 text-sm font-medium text-accent-foreground hover:bg-accent/90"
          >
            Get Tickets
          </Button>
        </MotionReveal>
      </div>
    </section>
  );
}
