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
  featured?: boolean;
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
    featured: true,
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
      className="bg-background px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8">
        <MotionReveal className="flex max-w-3xl flex-col items-center gap-6 text-center">
          <h2
            id="gala-tickets-heading"
            className="font-melodrama text-4xl font-semibold leading-[0.98] text-champagne-gold sm:text-5xl lg:text-6xl"
          >
            Tickets &amp; Tables
          </h2>
          <p className="font-brand text-lg leading-8 text-primary sm:text-xl">
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
              className={[
                "flex min-h-80 flex-col gap-10 rounded-2xl border px-6 py-8 sm:px-8",
                card.featured
                  ? "border-champagne-gold bg-champagne-gold text-background"
                  : "border-primary/10 bg-card text-primary",
              ].join(" ")}
              delay={index * 0.08}
              key={card.title}
            >
              <div className="flex flex-col gap-6">
                <div
                  className={[
                    "flex size-7 items-center justify-center rounded-full border",
                    card.featured
                      ? "border-background/30 text-background"
                      : "border-primary/15 text-muted-beige",
                  ].join(" ")}
                >
                  <Ticket className="size-3.5" aria-hidden="true" />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-melodrama text-3xl font-medium leading-none">
                    {card.title}
                  </h3>
                  <p
                    className={[
                      "font-brand text-xs leading-5",
                      card.featured ? "text-background" : "text-muted-beige",
                    ].join(" ")}
                  >
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between gap-8">
                <ul className="flex flex-col gap-3 font-brand text-sm leading-5">
                  {card.features.map((feature) => (
                    <li className="flex items-start gap-2" key={feature}>
                      <Star
                        className={[
                          "size-3.5 shrink-0",
                          card.featured
                            ? "fill-background text-background"
                            : "fill-champagne-gold text-champagne-gold",
                        ].join(" ")}
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={[
                    "h-11 w-full rounded-full px-6 text-xs font-medium",
                    card.featured
                      ? "bg-background text-primary hover:bg-background/90"
                      : "border border-primary/80 bg-transparent text-primary hover:bg-primary hover:text-background",
                  ].join(" ")}
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
