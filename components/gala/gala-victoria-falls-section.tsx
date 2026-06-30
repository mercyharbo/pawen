import { MotionReveal } from "@/components/motion-reveal";
import Image from "next/image";

export function GalaVictoriaFallsSection() {
  return (
    <section
      aria-labelledby="gala-victoria-falls-heading"
      className="bg-background px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28"
    >
      <MotionReveal
        className="relative mx-auto flex min-h-[34rem] w-full max-w-7xl overflow-hidden rounded-sm px-6 py-16 sm:px-10 lg:min-h-[40rem] lg:px-16"
        variant="image-reveal"
      >
        <Image
          src="/images/IMG-8.jpg"
          alt="Victoria Falls waterfall landscape"
          fill
          sizes="(min-width: 1280px) 80rem, 100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/62" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-background/15 via-background/30 to-background/35"
          aria-hidden="true"
        />

        <div className="relative z-10 m-auto flex w-full max-w-3xl flex-col gap-8 text-left">
          <h2
            id="gala-victoria-falls-heading"
            className="text-center font-melodrama text-4xl font-semibold text-champagne-gold sm:text-5xl lg:text-6xl"
          >
            Extend Your Stay: The PAWEN
            
            Victoria Falls Experience
          </h2>

          <div className="flex flex-col gap-4 font-brand text-sm leading-6 text-primary sm:text-base sm:leading-7">
            <p>
              One of the Seven Natural Wonders of the World. Curated for the
              PAWEN community.
            </p>
            <p>
              After the celebration in Lusaka, join us on a journey to Victoria
              Falls, the breathtaking natural wonder shared between Zambia and
              Zimbabwe.
            </p>
            <p>
              This optional group trip is curated exclusively for the PAWEN
              community by a trusted travel partner, with a thoughtfully
              designed itinerary that includes guided tours of the Falls, sunset
              experiences, and time to connect with the women you have just
              spent the week celebrating.
            </p>
            <p>
              It is the perfect way to extend your time in Zambia, deepen the
              friendships made at the Awards, and step into one of Africa&apos;s
              most spectacular landscapes alongside fellow leaders, founders,
              and changemakers.
            </p>
            <p>
              With 20+ Pan-African board and executive search firms in the room,
              Exhibitors, Entrepreneurs, Women in leadership and Board
              executives from across 35 countries in Africa, you will leave with
            </p>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
