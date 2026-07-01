import { MotionReveal } from "@/components/motion-reveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type NominationKeyDatesSectionProps = {
  ticketsUrl: string;
};

const keyDates = [
  { label: "Nominations open:", value: "1 July 2026" },
  { label: "Judging and evaluation", value: "August-October 2026" },
  { label: "Summit and Exhibition", value: "13 November 2026" },
  { label: "Nominations Close:", value: "11 August 2026" },
  { label: "Awards Gala: 14 November 2026", value: "14 November 2026" },
] as const;

export function NominationKeyDatesSection({
  ticketsUrl,
}: NominationKeyDatesSectionProps) {
  return (
    <section
      aria-labelledby="nomination-key-dates-heading"
      className="relative isolate overflow-hidden bg-background px-5 py-16 text-primary sm:px-8 lg:px-10"
    >
      <div className="relative mx-auto flex min-h-96 w-full max-w-7xl overflow-hidden rounded-md bg-card px-5 py-16 sm:px-8 lg:min-h-128 lg:px-20">
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
        <div className="absolute inset-0 bg-background/82" aria-hidden="true" />
        <div
          className="absolute inset-0 shadow-[inset_0_0_9rem_var(--color-background)]"
          aria-hidden="true"
        />

        <MotionReveal className="relative z-10 flex w-full max-w-5xl flex-col justify-center gap-7">
          <h2
            id="nomination-key-dates-heading"
            className="text-5xl font-medium leading-[0.98] text-primary md:text-4xl lg:text-6xl"
          >
            KEY DATES
          </h2>

          <div className="grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {keyDates.map((item, index) => (
              <MotionReveal
                className="flex flex-col gap-2"
                delay={index * 0.05}
                key={item.label}
              >
                <h3 className="font-brand text-base font-medium leading-6 text-champagne-gold">
                  {item.label}
                </h3>
                <p className="font-brand text-base leading-6 text-primary">
                  {item.value}
                </p>
              </MotionReveal>
            ))}
          </div>

          <Button
            asChild
            className="h-11 w-fit rounded-full bg-champagne-gold px-8 text-xs font-medium text-background hover:bg-champagne-gold/90"
          >
            <Link href={ticketsUrl}>Get Tickets</Link>
          </Button>
        </MotionReveal>
      </div>
    </section>
  );
}
