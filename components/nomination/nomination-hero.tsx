"use client";

import { MotionReveal } from "@/components/motion-reveal";
import { Button } from "@/components/ui/button";
import { useNomination } from "@/lib/stores/nomination-dialog-store";
import Image from "next/image";
import Link from "next/link";

export function NominationHero() {
  const { openDialog } = useNomination();

  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-7.875rem)] overflow-hidden px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28"
      aria-labelledby="nominations-hero-heading"
    >
      <MotionReveal
        ariaHidden
        className="absolute inset-0"
        variant="image-reveal"
      >
        <Image
          src="/images/IMG-6.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </MotionReveal>
      <div
        className="absolute inset-0 bg-pawen-brand-color/35"
        aria-hidden="true"
      />

      <MotionReveal className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-7 text-center">
        <div className="flex flex-col items-center gap-6">
          <h1
            id="nominations-hero-heading"
            className="max-w-3xl font-melodrama text-5xl font-semibold leading-[0.98] text-primary sm:text-6xl lg:text-7xl"
          >
            Nominate the African
            <br />
            Women Shaping
            <br />
            Our World
          </h1>
          <p className="max-w-2xl font-brand text-sm leading-6 text-white md:text-lg md:leading-8 lg:text-base lg:leading-7 2xl:text-base 3xl:text-lg 3xl:leading-8">
            Celebrate the founders, intrapreneurs, and leaders redefining business
            <br className="hidden sm:block" />
            and career across Africa and the diaspora.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 w-full sm:w-auto lg:w-auto sm:flex-row">
          <Button
            className="h-11 sm:min-w-32 lg:w-auto w-full rounded-full bg-accent px-8 text-xs font-medium text-background hover:bg-accent/90"
            onClick={openDialog}
            type="button"
          >
            Nomination
          </Button>
          <Button
            asChild
            className="h-11 sm:min-w-40 lg:w-auto w-full rounded-full bg-primary px-8 text-xs font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Link href="#award-categories">Award Categories</Link>
          </Button>
        </div>
      </MotionReveal>
    </section>
  );
}
