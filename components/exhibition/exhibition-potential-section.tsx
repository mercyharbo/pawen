import { MotionReveal } from "@/components/motion-reveal";
import Image from "next/image";

export function ExhibitionPotentialSection() {
  return (
    <section
      aria-labelledby="exhibition-potential-heading"
      className="relative isolate flex min-h-[38rem] items-center overflow-hidden bg-background px-5 py-24 text-background sm:px-8 lg:min-h-[46rem] lg:px-10 lg:py-36"
    >
      <MotionReveal
        ariaHidden
        className="absolute inset-0"
        variant="image-reveal"
      >
        <Image
          src="/images/IMG (1).jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </MotionReveal>
      <div
        className="absolute inset-0 bg-champagne-gold/40"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-background/30" aria-hidden="true" />
      <div
        className="absolute inset-0 shadow-[inset_0_0_10rem_var(--color-background)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl justify-center">
        <div className="grid w-full gap-4 md:grid-cols-2 md:items-stretch">
          <MotionReveal
            as="article"
            className="flex flex-col justify-center gap-5 rounded-2xl bg-champagne-gold px-6 py-8 sm:px-8 lg:px-10"
          >
            <h2
              id="exhibition-potential-heading"
              className="max-w-lg text-3xl font-medium leading-tight text-background sm:text-3xl lg:text-3xl"
            >
              More Than Foot Traffic. Real Business Potential.
            </h2>
            <p className="font-brand text-sm leading-6 text-background sm:text-base sm:leading-7">
              The PAWEN Exhibition is designed to help women-led businesses
              generate leads and sales, increase brand awareness, attract
              strategic partnerships, connect with distributors and retailers,
              enter new African markets, and build credibility and visibility
              at a continental level. This is not just about having a booth. It
              is about positioning your business where Africa&apos;s
              future-focused leaders and buyers will be.
            </p>
          </MotionReveal>

          <MotionReveal
            as="article"
            className="flex flex-col justify-center gap-5 rounded-2xl bg-primary px-6 py-8 text-background sm:px-8 lg:px-10"
            delay={0.08}
          >
            <h3 className="text-3xl font-medium leading-tight sm:text-3xl lg:text-3xl">
              Why Zambia?
            </h3>
            <p className="font-brand text-sm leading-6 sm:text-base sm:leading-7">
              Zambia is emerging as one of Africa&apos;s most promising
              destinations for growth and investment, strategically positioned
              at the heart of Southern Africa. For exhibitors, this creates
              unique opportunities to explore new regional markets, build
              cross-border relationships, connect with businesses across
              Southern, Central, and East Africa, and gain early visibility in a
              rapidly growing ecosystem. Combined with Zambia&apos;s warmth,
              accessibility, and business-friendly environment, PAWEN 2026
              offers the ideal setting to expand both your network and your
              market reach.
            </p>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
