import { MotionReveal } from "@/components/motion-reveal";
import { Button } from "@/components/ui/button";
import { Star, Ticket } from "lucide-react";
import Link from "next/link";

type GalaTicketsSectionProps = {
  ticketsUrl: string;
};

type TicketCard = {
  title: string;
  description: string;
  features: string[];
  action: string;
};

const ticketCards: TicketCard[] = [
  {
    title: "Individual Ticket",
    description: "One seat at the 2026 Gala",
    features: [
      "The full awards ceremony",
      "Dinner & drinks",
      "Access to the after-party",
    ],
    action: "Get Your Individual Ticket",
  },
  {
    title: "Table of Ten",
    description: "Bring your team, network, or guests",
    features: [
      "A full table for ten attendees",
      "Priority seating",
      "Recognition in the programme",
      "A bottle of champagne to celebrate",
    ],
    action: "Book a Table of Ten",
  },
  {
    title: "Sponsor Table",
    description: "Align your brand with the night",
    features: [
      "Branded table placement",
      "Prominent recognition in the programme",
      "On-stage recognition",
      "Brand alignment with the night",
    ],
    action: "Sponsor a Table",
  },
];

export function GalaTicketsSection({ ticketsUrl }: GalaTicketsSectionProps) {
  return (
    <section
      id="tickets-and-tables"
      aria-labelledby="gala-tickets-heading"
      className="px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8">
        <MotionReveal className="flex max-w-3xl flex-col items-center gap-6 text-center">
          <h2
            id="gala-tickets-heading"
            className="font-melodrama text-4xl font-semibold leading-[0.98] text-champagne-gold sm:text-5xl lg:text-6xl"
          >
            Tickets &amp; Tables
          </h2>
          <p className="font-brand text-sm leading-6 text-primary md:text-lg md:leading-8 lg:text-base lg:leading-7 2xl:text-base 3xl:text-lg 3xl:leading-8">
            Three ways to be in the room.
            <br />
            Finalists and their nominators receive complimentary tickets to the
            Gala
          </p>
        </MotionReveal>

        <div className="grid w-full gap-4 lg:grid-cols-3">
          {ticketCards.map((card, index) => (
            <MotionReveal
              as="article"
              className="group/ticket-card flex min-h-80 flex-col gap-10 rounded-2xl border border-primary/10 bg-card px-6 py-8 text-primary transition-colors duration-500 ease-out hover:border-champagne-gold hover:bg-champagne-gold hover:text-background focus-within:border-champagne-gold focus-within:bg-champagne-gold focus-within:text-background sm:px-8"
              delay={index * 0.08}
              key={card.title}
            >
              <div className="flex flex-col gap-6">
                <div className="flex size-7 items-center justify-center rounded-full border border-primary/15 text-muted-beige transition-colors duration-500 ease-out group-hover/ticket-card:border-background/30 group-hover/ticket-card:text-background group-focus-within/ticket-card:border-background/30 group-focus-within/ticket-card:text-background">
                  <Ticket className="size-3.5" aria-hidden="true" />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-melodrama text-3xl font-medium leading-none">
                    {card.title}
                  </h3>
                  <p className="font-brand text-xs leading-5 text-muted-beige transition-colors duration-500 ease-out group-hover/ticket-card:text-background group-focus-within/ticket-card:text-background">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between gap-8">
                <ul className="flex flex-col gap-3 font-brand text-sm leading-5">
                  {card.features.map((feature) => (
                    <li className="flex items-start gap-2" key={feature}>
                      <Star
                        className="size-3.5 shrink-0 fill-champagne-gold text-champagne-gold transition-colors duration-500 ease-out group-hover/ticket-card:fill-background group-hover/ticket-card:text-background group-focus-within/ticket-card:fill-background group-focus-within/ticket-card:text-background"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="h-11 w-full rounded-full border border-primary/80 bg-transparent px-6 text-xs font-medium text-primary transition-colors duration-500 ease-out hover:bg-primary hover:text-background group-hover/ticket-card:border-background group-hover/ticket-card:bg-background group-hover/ticket-card:text-primary group-focus-within/ticket-card:border-background group-focus-within/ticket-card:bg-background group-focus-within/ticket-card:text-primary"
                >
                  <Link href={ticketsUrl}>{card.action}</Link>
                </Button>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
