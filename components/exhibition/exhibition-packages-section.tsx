"use client";

import { MotionReveal } from "@/components/motion-reveal";
import { Button } from "@/components/ui/button";
import {
  boothPackages,
  exhibitionRatesFootnote,
  type BoothPackage,
} from "@/lib/event-form-data";
import { useEventDialog } from "@/lib/stores/event-dialog-store";
import { Check, Info, LayoutGrid, Store, Table } from "lucide-react";
import { useState } from "react";

type PackageTier = "full-booth" | "floor-space";
type ViewMode = "cards" | "table";

export function ExhibitionPackagesSection() {
  const openDialog = useEventDialog((store) => store.openDialog);
  const [selectedTier, setSelectedTier] = useState<PackageTier>("full-booth");
  const [viewMode, setViewMode] = useState<ViewMode>("cards");

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
            brand presence, and market goals. Choose between a turnkey{" "}
            <span className="font-semibold text-accent">
              Full Booth + Branding
            </span>{" "}
            setup or an allocated{" "}
            <span className="font-semibold text-accent">Floor Space Only*</span>.
          </p>

          {/* Controls: Tier Switcher and View Switcher */}
          <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-between w-full max-w-3xl">
            {/* Package Tier Switcher */}
            <div
              className="inline-flex rounded-full border border-primary/20 bg-background/50 p-1"
              role="tablist"
              aria-label="Exhibition Package Tiers"
            >
              <button
                type="button"
                role="tab"
                aria-selected={selectedTier === "full-booth"}
                onClick={() => setSelectedTier("full-booth")}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                  selectedTier === "full-booth"
                    ? "bg-accent text-background shadow-md"
                    : "text-primary/70 hover:text-primary"
                }`}
              >
                Full Booth + Branding
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={selectedTier === "floor-space"}
                onClick={() => setSelectedTier("floor-space")}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                  selectedTier === "floor-space"
                    ? "bg-accent text-background shadow-md"
                    : "text-primary/70 hover:text-primary"
                }`}
              >
                Floor Space Only*
              </button>
            </div>

            {/* View Mode Switcher */}
            <div
              className="inline-flex items-center gap-1 rounded-full border border-primary/15 bg-background/30 p-1"
              role="group"
              aria-label="View format"
            >
              <button
                type="button"
                onClick={() => setViewMode("cards")}
                aria-pressed={viewMode === "cards"}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  viewMode === "cards"
                    ? "bg-accent/20 text-accent border border-accent/40"
                    : "text-primary/60 hover:text-primary"
                }`}
              >
                <LayoutGrid className="size-3.5" aria-hidden="true" />
                <span>Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                aria-pressed={viewMode === "table"}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  viewMode === "table"
                    ? "bg-accent/20 text-accent border border-accent/40"
                    : "text-primary/60 hover:text-primary"
                }`}
              >
                <Table className="size-3.5" aria-hidden="true" />
                <span>Rates Table</span>
              </button>
            </div>
          </div>
        </MotionReveal>

        {/* View Mode: Cards */}
        {viewMode === "cards" ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {boothPackages.map((pkg, index) => {
              const isHighlighted = pkg.featured || pkg.corner;
              const activePriceZmw =
                selectedTier === "full-booth"
                  ? pkg.fullBoothPriceZmw
                  : pkg.floorSpacePriceZmw;
              const activePriceUsd =
                selectedTier === "full-booth"
                  ? pkg.fullBoothPriceUsd
                  : pkg.floorSpacePriceUsd;
              const altPriceZmw =
                selectedTier === "full-booth"
                  ? pkg.floorSpacePriceZmw
                  : pkg.fullBoothPriceZmw;
              const altPriceUsd =
                selectedTier === "full-booth"
                  ? pkg.floorSpacePriceUsd
                  : pkg.fullBoothPriceUsd;
              const activeFormValue =
                selectedTier === "full-booth"
                  ? pkg.fullBoothFormValue
                  : pkg.floorSpaceFormValue;
              const activeInclusions =
                selectedTier === "full-booth"
                  ? pkg.inclusions
                  : pkg.floorSpaceInclusions;

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

                    {/* Pricing Box */}
                    <div className="my-6 rounded-xl border border-primary/10 bg-primary/5 p-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-xs font-semibold text-primary/60 uppercase tracking-wider">
                          {selectedTier === "full-booth"
                            ? "Full Booth + Branding"
                            : "Floor Space Only*"}
                        </span>
                        <span className="text-xs font-medium text-accent">
                          Dual Currency
                        </span>
                      </div>
                      <div className="mt-2 flex flex-col gap-0.5">
                        <span className="font-melodrama text-2xl font-bold tracking-tight text-accent sm:text-3xl">
                          {activePriceZmw}
                        </span>
                        <span className="text-sm font-semibold text-primary/85 sm:text-base">
                          / {activePriceUsd}
                        </span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-primary/10 flex items-center justify-between text-xs text-primary/70">
                        <span>
                          {selectedTier === "full-booth"
                            ? "Floor Space Only*:"
                            : "Full Booth + Branding:"}
                        </span>
                        <span className="font-semibold text-accent">
                          {altPriceZmw} / {altPriceUsd}
                        </span>
                      </div>
                    </div>

                    {/* Inclusions */}
                    <div className="flex flex-col gap-2.5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">
                        {selectedTier === "full-booth"
                          ? "Package Includes:"
                          : "Floor Space Details:"}
                      </p>
                      <ul className="flex flex-col gap-2">
                        {activeInclusions.map((inclusion) => (
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
                      onClick={() => handleBookBooth(activeFormValue)}
                      type="button"
                    >
                      {selectedTier === "full-booth"
                        ? "Book Full Booth"
                        : "Book Floor Space"}
                    </Button>
                  </div>
                </MotionReveal>
              );
            })}
          </div>
        ) : (
          /* View Mode: Rates Table */
          <MotionReveal className="w-full overflow-hidden rounded-2xl border border-primary/20 bg-background/30 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-primary/15 bg-primary/5 text-xs font-semibold uppercase tracking-wider text-accent">
                    <th scope="col" className="py-4 px-5">
                      Exhibition Package
                    </th>
                    <th scope="col" className="py-4 px-5">
                      Space
                    </th>
                    <th scope="col" className="py-4 px-5">
                      Full Booth + Branding
                    </th>
                    <th scope="col" className="py-4 px-5">
                      Floor Space Only*
                    </th>
                    <th scope="col" className="py-4 px-5 text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/10 text-sm">
                  {boothPackages.map((pkg) => (
                    <tr
                      key={pkg.id}
                      className="transition-colors hover:bg-accent/5"
                    >
                      <td className="py-4 px-5 font-semibold text-primary">
                        <div className="flex flex-col gap-0.5">
                          <span>{pkg.name}</span>
                          {pkg.tag && (
                            <span className="w-fit rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent uppercase tracking-wider">
                              {pkg.tag}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-5 font-mono text-sm text-accent">
                        {pkg.dimensions}
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex flex-col">
                          <span className="font-semibold text-primary">
                            {pkg.fullBoothPriceZmw}
                          </span>
                          <span className="text-xs text-primary/70">
                            / {pkg.fullBoothPriceUsd}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex flex-col">
                          <span className="font-semibold text-primary">
                            {pkg.floorSpacePriceZmw}
                          </span>
                          <span className="text-xs text-primary/70">
                            / {pkg.floorSpacePriceUsd}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-right">
                        <div className="inline-flex flex-wrap justify-end gap-2">
                          <Button
                            size="sm"
                            className="h-8 rounded-full bg-accent px-3.5 text-xs font-semibold text-background hover:bg-accent/90"
                            onClick={() =>
                              handleBookBooth(pkg.fullBoothFormValue)
                            }
                            type="button"
                          >
                            Book Full
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 rounded-full border-primary/30 px-3 text-xs font-medium text-primary hover:bg-primary/10"
                            onClick={() =>
                              handleBookBooth(pkg.floorSpaceFormValue)
                            }
                            type="button"
                          >
                            Book Space
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </MotionReveal>
        )}

        {/* Footnote Notice */}
        <MotionReveal className="flex items-start justify-center gap-2.5 rounded-xl border border-primary/15 bg-background/20 p-4 text-center sm:text-left sm:p-5">
          <Info
            className="size-4 shrink-0 text-accent mt-0.5 hidden sm:block"
            aria-hidden="true"
          />
          <p className="font-brand text-xs leading-relaxed text-primary/80 sm:text-sm">
            {exhibitionRatesFootnote}
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
