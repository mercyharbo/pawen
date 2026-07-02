import { MotionReveal } from "@/components/motion-reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type GalaSponsorSectionProps = {
  sponsorUrl: string;
};

export function GalaSponsorSection({ sponsorUrl }: GalaSponsorSectionProps) {
  return (
    <section
      aria-labelledby="gala-sponsor-heading"
      className="bg-background px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28"
    >
      <MotionReveal className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div
          className="min-h-80 rounded-xl bg-primary sm:min-h-96 lg:min-h-[22rem]"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-8">
          <div className="flex max-w-xl flex-col gap-8">
            <h2
              id="gala-sponsor-heading"
              className="text-4xl font-semibold leading-tight text-champagne-gold sm:text-4xl lg:text-4xl 2xl:text-5xl"
            >
              Sponsor the Night Africa Celebrates Her Women
            </h2>
            <p className="font-brand text-sm leading-6 text-primary sm:text-base sm:leading-7">
              The PAWEN Awards Gala is one of the most strategically valuable
              nights on the African business calendar, bringing together
              founders, executives, investors, policymakers, and the cultural
              voices shaping the continent&apos;s narrative. Whether you are
              positioning your brand alongside African women leaders,
              championing a category that aligns with your mandate, or hosting
              clients in a room they will remember for years, the Gala is built
              for visionary partners.
            </p>
          </div>

          <Button
            asChild
            className="h-11 w-full rounded-full bg-champagne-gold px-8 text-xs font-medium text-background hover:bg-champagne-gold/90 sm:w-fit"
          >
            <Link href={sponsorUrl}>Become a 2026 Sponsor</Link>
          </Button>
        </div>
      </MotionReveal>
    </section>
  );
}
