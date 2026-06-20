import type { Metadata } from "next";
import { NominationForm } from "@/components/nomination-form";

export const metadata: Metadata = {
  title: "Nominations | The PAWEN Awards & Summit 2026",
  description:
    "Submit a nomination for The PAWEN Awards & Summit 2026 without leaving the PAWEN website.",
};

export default function NominationsPage() {
  return (
    <section className="flex justify-center bg-background px-5 py-16 text-foreground sm:px-8 lg:px-10">
      <div className="grid w-full max-w-6xl gap-12">
        <div className="grid gap-6 border-b border-premium-gold/20 pb-10">
          <p className="text-sm text-champagne-gold">
            The PAWEN Awards & Summit 2026
          </p>
          <h1 className="max-w-4xl font-serif text-5xl leading-none text-foreground sm:text-6xl lg:text-7xl">
            Nominate a woman shaping business, leadership and impact.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-beige">
            Use this secure PAWEN nomination form to share her story. Your
            submission stays on this website and is sent to the awards team for
            review.
          </p>
        </div>
        <NominationForm />
      </div>
    </section>
  );
}
