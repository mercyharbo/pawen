import { MotionReveal } from "@/components/motion-reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const winnerGroups = [
  {
    year: "2023",
    description: "The women honoured in our inaugural celebration",
    winnerLabel: "2023 Winners",
    highlightLabel: "2023 Highlight",
  },
  {
    year: "2025",
    description: "Last year's class of changemakers",
    winnerLabel: "2025 Winners",
    highlightLabel: "2025 Highlight",
  },
] as const;

export function GalaPastWinnersSection() {
  return (
    <section
      id="hall-of-fame"
      aria-labelledby="gala-past-winners-heading"
      className="bg-background px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <MotionReveal className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2
            id="gala-past-winners-heading"
            className="font-melodrama text-4xl font-semibold leading-[0.98] text-champagne-gold sm:text-5xl lg:text-6xl"
          >
            PAWEN Awards Past Winners
          </h2>

          <Button
            asChild
            className="h-11 w-fit rounded-full bg-champagne-gold px-8 text-xs font-medium text-background hover:bg-champagne-gold/90"
          >
            <Link href="#hall-of-fame">View Full Hall of Fame</Link>
          </Button>
        </MotionReveal>

        <div className="grid gap-8 lg:grid-cols-2">
          {winnerGroups.map((group, index) => (
            <MotionReveal
              as="article"
              className="flex flex-col gap-6"
              delay={index * 0.08}
              key={group.year}
            >
              <div className="flex flex-col gap-2">
                <h3 className="font-melodrama text-4xl font-medium leading-none text-primary sm:text-5xl">
                  {group.year}
                </h3>
                <p className="font-brand text-base leading-7 text-primary sm:text-lg">
                  {group.description}
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="flex min-h-80 items-center justify-center rounded-2xl bg-champagne-gold px-6 py-8 text-center font-brand text-sm font-medium text-background sm:min-h-96">
                  {group.winnerLabel}
                </div>
                <div className="flex min-h-80 items-center justify-center rounded-2xl bg-champagne-gold px-6 py-8 text-center font-brand text-sm font-medium text-background sm:min-h-96">
                  {group.winnerLabel}
                </div>
                <div className="flex min-h-36 items-center justify-center rounded-2xl bg-champagne-gold px-6 py-8 text-center font-brand text-sm font-medium text-background sm:col-span-2 sm:min-h-40">
                  {group.highlightLabel}
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
