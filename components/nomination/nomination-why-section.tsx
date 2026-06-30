import { MotionReveal } from "@/components/motion-reveal";
import Image from "next/image";

export function NominationWhySection() {
  return (
    <section
      aria-labelledby="nomination-why-heading"
      className="relative isolate overflow-hidden bg-background px-5 py-24 text-primary sm:px-8 lg:px-10 lg:py-32"
    >
      <MotionReveal
        ariaHidden
        className="absolute inset-0"
        variant="image-reveal"
      >
        <Image
          src="/clip-path.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </MotionReveal>
      <div className="absolute inset-0 bg-background/18" aria-hidden="true" />

      <MotionReveal className="relative z-10 mx-auto flex min-h-96 w-full max-w-4xl flex-col items-center justify-center gap-6 text-center lg:min-h-[32rem]">
        <h2
          id="nomination-why-heading"
          className="font-melodrama text-4xl font-medium leading-[0.98] text-primary sm:text-5xl lg:text-6xl"
        >
          Why Nominate
        </h2>
        <p className="max-w-3xl font-brand text-lg leading-8 text-muted-beige sm:text-xl sm:leading-8 lg:text-2xl lg:leading-9">
          The women leading Africa forward are everywhere: in boardrooms and at
          decision-making tables, building startups and scaling enterprises,
          leading public institutions and reshaping entire industries. The
          question has never been whether they exist. It&apos;s whether their
          work is known, celebrated, and easy for the world to find.
        </p>
      </MotionReveal>
    </section>
  );
}
