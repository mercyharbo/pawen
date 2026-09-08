"use client";

import { MotionReveal } from "@/components/motion-reveal";
import { Button } from "@/components/ui/button";
import { boothPackages, type BoothPackage } from "@/lib/event-form-data";
import { useEventDialog } from "@/lib/stores/event-dialog-store";
import { Check, Store } from "lucide-react";

export function ExhibitionPackagesSection() {
  const openDialog = useEventDialog((store) => store.openDialog);

  function handleBookBooth(formValue: BoothPackage["formValue"]) {
    openDialog("exhibition", { boothType: formValue });
  }

  return (
    <section
      aria-labelledby="exhibition-packages-heading"
      className="relative isolate overflow-hidden bg-pawen-brand-color px-5 py-12 text-primary sm:px-8 lg:px-10 lg:py-20"
      id="booth-packages"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
        <MotionReveal className="flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            <Store className="size-3.5" aria-hidden="true" />
            <span>Booth Packages & Pricing</span>
          </div>
          <h2
            id="exhibition-packages-heading"
            className="font-melodrama text-3xl font-semibold leading-tight text-accent sm:text-5xl lg:text-5xl 2xl:text-6xl"
          >
            Choose Your Exhibition Space
          </h2>
          <p className="max-w-2xl font-brand text-sm leading-6 text-primary/85 sm:text-base sm:leading-7">
            Select the booth package that best suits your enterprise scale,
            brand presence, and market goals. All packages are priced in Zambian
            Kwacha (ZMW) and US Dollars (USD).
          </p>
        </MotionReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {boothPackages.map((pkg, index) => {
            const isHighlighted = pkg.featured || pkg.corner;

            return (
              <MotionReveal
                as="article"
                className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:border-accent hover:shadow-lg sm:p-8 ${
                  isHighlighted
                    ? "border-accent/80 bg-accent/5 shadow-accent/5"
                    : "border-primary/20 bg-background/20"
                }`}
                delay={index * 0.05}
                key={pkg.id}
                variant="scale-in"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                      {pkg.dimensions}
                    </span>
                    {pkg.tag && (
                      <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold text-background uppercase tracking-wide">
                        {pkg.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold leading-snug text-primary">
                    {pkg.name}
                  </h3>
                  <p className="mt-2 font-brand text-xs leading-5 text-primary/75 sm:text-sm">
                    {pkg.description}
                  </p>

                  <div className="my-6 rounded-xl border border-primary/10 bg-primary/5 p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs font-semibold text-primary/60 uppercase tracking-wider">
                        Rate
                      </span>
                      <span className="text-xs font-medium text-accent">
                        Dual Currency
                      </span>
                    </div>
                    <div className="mt-2 flex flex-col gap-0.5">
                      <span className="font-melodrama text-2xl font-bold tracking-tight text-accent sm:text-3xl">
                        {pkg.priceZmw}
                      </span>
                      <span className="text-sm font-semibold text-primary/85 sm:text-base">
                        / {pkg.priceUsd}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">
                      Package Includes:
                    </p>
                    <ul className="flex flex-col gap-2">
                      {pkg.inclusions.map((inclusion) => (
                        <li
                          className="flex items-start gap-2.5 text-xs leading-5 text-primary/80 sm:text-sm"
                          key={inclusion}
                        >
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-accent"
                            aria-hidden="true"
                          />
                          <span>{inclusion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-primary/10">
                  <Button
                    className={`w-full h-11 rounded-full font-semibold transition-all ${
                      isHighlighted
                        ? "bg-accent text-background hover:bg-accent/90"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                    onClick={() => handleBookBooth(pkg.formValue)}
                    type="button"
                  >
                    Book This Booth
                  </Button>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
