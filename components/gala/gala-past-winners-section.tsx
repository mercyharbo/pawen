import { MotionReveal } from "@/components/motion-reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const winnerGroups = [
  {
    year: "2023",
    description: "The women honoured in our inaugural celebration",
    winners: Array.from({ length: 4 }, () => "2023 Winners"),
    highlights: Array.from({ length: 3 }, () => "2023 Highlight"),
  },
  {
    year: "2024",
    description: "The women celebrated in our second year",
    winners: Array.from({ length: 4 }, () => "2024 Winners"),
    highlights: Array.from({ length: 3 }, () => "2024 Highlight"),
  },
  {
    year: "2025",
    description: "Last year's class of changemakers",
    winners: Array.from({ length: 4 }, () => "2025 Winners"),
    highlights: Array.from({ length: 3 }, () => "2025 Highlight"),
  },
] as const;

export function GalaPastWinnersSection() {
  return (
    <section
      id="hall-of-fame"
      aria-labelledby="gala-past-winners-heading"
      className="px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10">
        <MotionReveal className="flex flex-col items-center gap-3 text-center">
          <h2
            id="gala-past-winners-heading"
            className="font-melodrama text-4xl font-semibold leading-tight text-champagne-gold sm:text-5xl lg:text-6xl"
          >
            PAWEN Awards Past Winners
          </h2>
          <p className="font-brand text-lg leading-7 text-primary sm:text-2xl">
            The women honoured in our inaugural celebration
          </p>
        </MotionReveal>

        <Tabs defaultValue={winnerGroups[0].year} className="w-full items-center gap-8">
          <TabsList aria-label="Past winners by year">
            {winnerGroups.map((group) => (
              <TabsTrigger key={group.year} value={group.year}>
                {group.year}
              </TabsTrigger>
            ))}
          </TabsList>

          {winnerGroups.map((group) => (
            <TabsContent
              className="w-full"
              key={group.year}
              value={group.year}
            >
              <div className="flex flex-col gap-2">
                <div className="grid w-full gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {group.winners.map((label, index) => (
                    <div
                      className="flex min-h-72 items-center justify-center rounded-xl bg-gray-200 px-6 py-8 text-center font-brand text-base leading-6 text-background sm:min-h-96"
                      key={`${group.year}-winner-${index}`}
                    >
                      {label}
                    </div>
                  ))}
                </div>

                <div className="grid w-full gap-2 sm:grid-cols-3">
                  {group.highlights.map((label, index) => (
                    <div
                      className="flex min-h-36 items-center justify-center rounded-xl bg-gray-200 px-6 py-8 text-center font-brand text-base leading-6 text-background sm:min-h-44"
                      key={`${group.year}-highlight-${index}`}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
