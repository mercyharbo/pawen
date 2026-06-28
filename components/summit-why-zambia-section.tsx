import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const exploreItems = [
  "Victoria Falls",
  "Zambia's safari and wildlife experiences",
  "local culture, cuisine, and creativity",
  "one of Southern Africa's most welcoming destinations",
] as const;

const exploreChipClass =
  "rounded-full bg-accent/14 px-5 py-1 text-center text-xs leading-5 text-background/78";

export function SummitWhyZambiaSection() {
  return (
    <section
      className="bg-summit-dark px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28"
      aria-labelledby="summit-why-zambia-heading"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 lg:gap-12">
        <h2
          id="summit-why-zambia-heading"
          className="font-melodrama text-4xl font-semibold leading-[0.98] text-champagne-gold lg:text-5xl xl:text-4xl 2xl:text-6xl 3xl:text-6xl"
        >
          Why Zambia? Why Now?
        </h2>

        <div className="grid w-full gap-3 lg:grid-cols-3 lg:gap-4">
          <article className="relative aspect-square overflow-hidden rounded-3xl bg-card">
            <Image
              src="/images/city.jpg"
              alt="Lusaka city skyline at night"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background/45"
              aria-hidden="true"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-background px-5 py-4 text-primary sm:px-6 sm:py-5">
              <p className="text-base  leading-6 sm:text-lg sm:leading-7">
                Zambia is fast becoming a gateway to Africa&apos;s next economic
                chapter, driven by growth in trade, infrastructure, innovation,
                mining, energy, and regional connectivity.
              </p>
            </div>
          </article>

          <article className="flex aspect-square flex-col justify-center gap-7 rounded-3xl bg-champagne-gold px-6 py-8 text-background sm:px-10">
            <p className="2xl:text-lg leading-tight">
              For African women leaders, this is a chance to gather exactly
              where new conversations, investments, and collaborations are
              taking shape.
            </p>
            <p className="2xl:text-lg leading-6 text-[#424242]">
              Known for its peace, warmth, and hospitality, Zambia offers the
              perfect setting for meaningful connection and strategic dialogue,
              on stage and off it.
            </p>
          </article>

          <article className="relative aspect-square overflow-hidden bg-transparent text-background">
            <div className="relative z-10 flex h-[52%] flex-col gap-6 rounded-3xl bg-primary px-6 py-7 sm:px-10">
              <div className="flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-full bg-background/6 text-background">
                  <ArrowUpRight className="size-5" aria-hidden="true" />
                </span>
                <p className="text-base  leading-6">Explore</p>
              </div>
              <h3 className="text-2xl  leading-tight sm:text-4xl lg:text-2xl 2xl:text-3xl">
                Extend your stay and explore:
              </h3>
            </div>

            <div className="relative z-0 h-[48%] translate-y-0 overflow-hidden rounded-3xl bg-primary px-6 py-8 sm:px-10">
              <div className="flex flex-col items-center gap-5">
                <div className="flex w-max items-center justify-center gap-5">
                  <span className={exploreChipClass}>{exploreItems[0]}</span>
                  <span className={exploreChipClass}>{exploreItems[1]}</span>
                  <span className={exploreChipClass} aria-hidden="true">
                    {exploreItems[2]}
                  </span>
                </div>

                <div className="flex w-max -translate-x-24 items-center justify-center gap-5 sm:-translate-x-32">
                  <span className={exploreChipClass} aria-hidden="true">
                    {exploreItems[1]}
                  </span>
                  <span className={exploreChipClass}>{exploreItems[2]}</span>
                  <span className={exploreChipClass} aria-hidden="true">
                    {exploreItems[3]}
                  </span>
                </div>

                <div className="flex w-full items-center justify-center">
                  <span className={exploreChipClass}>{exploreItems[3]}</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
