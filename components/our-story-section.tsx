"use client";

import { MotionReveal } from "@/components/motion-reveal";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const sponsorLogos = [
  {
    src: "/images/sponsor (1).jpg",
    alt: "Stejarri Country Club",
  },
  {
    src: "/images/sponsor (1).png",
    alt: "JYH International Architects",
  },
  {
    src: "/images/sponsor (2).jpg",
    alt: "Jets 100",
  },
  {
    src: "/images/sponsor (2).png",
    alt: "Peacebird",
  },
  {
    src: "/images/sponsor (3).png",
    alt: "Milk",
  },
  {
    src: "/images/sponsor (4).png",
    alt: "ROW",
  },
] as const;

export function OurStorySection() {
  return (
    <section
      className="bg-background px-5 py-20 text-foreground sm:px-8 lg:px-10 lg:py-28"
      id="our-story-details"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-14">
        <MotionReveal className="flex max-w-4xl flex-col items-center gap-8 text-center">
          <h2 className="font-brand text-4xl font-bold leading-tight text-accent sm:text-5xl">
            Our Story
          </h2>
          <div className="flex max-w-3xl flex-col gap-1 text-sm leading-5 text-primary">
            <p>
              History is shaped by people whose vision, leadership and
              determination move society forward.
            </p>
            <p>
              Across Africa and the diaspora, women are building businesses,
              transforming industries, strengthening institutions and creating
              opportunities that will influence generations to come.
            </p>
            <p>
              The PAWEN Awards was established to honour those achievements and
              ensure they receive the recognition they deserve. Because
              exceptional achievement should not simply be celebrated in the
              moment. It should be recorded, remembered and held up as part of
              the continent&apos;s story.
            </p>
            <p>This is the legacy the PAWEN Awards was built to protect.</p>
          </div>
        </MotionReveal>

        <MotionReveal
          className="relative w-full max-w-5xl overflow-hidden rounded-md bg-card"
          variant="image-reveal"
        >
          <Image
            src="/images/our-story.jpg"
            alt="PAWEN speaker presenting at the awards and summit"
            width={2048}
            height={1365}
            className="h-auto w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-accent/80 mix-blend-color"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-background/10"
            aria-hidden="true"
          />
        </MotionReveal>

        <MotionReveal className="w-full max-w-5xl overflow-hidden">
          <Marquee
            autoFill
            gradient={false}
            pauseOnHover
            speed={34}
            className="overflow-hidden"
          >
            {sponsorLogos.map((logo) => (
              <div
                className="flex min-h-16 min-w-40 items-center justify-center px-6"
                key={logo.src}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={160}
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            ))}
          </Marquee>
        </MotionReveal>
      </div>
    </section>
  );
}
