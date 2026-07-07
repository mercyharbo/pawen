import { MotionReveal } from "@/components/motion-reveal";
import { Star } from "lucide-react";
import Image from "next/image";

const expectationItems = [
  "A curated pan-African audience",
  "High-value networking opportunities",
  "Brand exposure before, during, and after the summit",
  "Access to decision-makers and ecosystem leaders",
  "A professionally curated exhibition experience",
  "A powerful environment for collaboration and growth",
] as const;

export function ExhibitionExpectSection() {
  return (
    <section
      aria-labelledby="exhibition-expect-heading"
      className="bg-[linear-gradient(180deg,var(--color-pawen-brand-color)_0%,var(--color-pawen-brand-color)_42%,rgba(28,6,45,0.82)_58%,var(--background)_74%,var(--background)_100%)] px-5 py-10 text-primary sm:px-8 lg:px-10 lg:py-16"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-8 xl:gap-12">
        <MotionReveal className="flex flex-col gap-8">
          <h2
            id="exhibition-expect-heading"
            className="font-melodrama text-4xl font-semibold leading-[0.98] text-accent sm:text-5xl lg:text-5xl 2xl:text-5xl 3xl:text-5xl"
          >
            What You Can Expect
          </h2>

          <ul className="flex flex-col border-y border-primary/10">
            {expectationItems.map((item) => (
              <li
                className="flex items-center gap-3 border-b border-primary/10 py-4 last:border-b-0"
                key={item}
              >
                <Star
                  className="size-4 shrink-0 fill-accent text-accent"
                  aria-hidden="true"
                />
                <span className="font-brand text-sm leading-6 text-primary/86">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </MotionReveal>

        <MotionReveal
          className="group relative aspect-[1.18] w-full max-w-xl overflow-hidden rounded-xl bg-card lg:justify-self-end"
          delay={0.08}
          variant="image-reveal"
        >
          <Image
            src="/images/what_to_expect.jpg"
            alt="PAWEN exhibition attendees networking at the summit"
            fill
            sizes="(min-width: 1024px) 44vw, 100vw"
            className="object-cover object-top grayscale transition duration-500 group-hover:grayscale-0"
          />
        </MotionReveal>
      </div>
    </section>
  );
}
