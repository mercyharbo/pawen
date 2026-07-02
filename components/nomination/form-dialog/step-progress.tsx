import { ChevronRight } from "lucide-react";
import { stepItems } from "@/components/nomination/form-dialog/dialog-config";
import type { NominationDialogStep } from "@/lib/stores/nomination-dialog-store";
import { cn } from "@/lib/utils";

export function StepProgress({ step }: { step: NominationDialogStep }) {
  const activeIndex = Math.max(
    stepItems.findIndex((item) => item.key === step),
    0,
  );

  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-background/45 pb-7">
      {stepItems.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <div className="flex items-center gap-4" key={item.key}>
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full text-sm font-bold",
                  isActive
                    ? "bg-background text-primary"
                    : "bg-dark-gold/25 text-background/50",
                )}
              >
                {index + 1}
              </span>
              <span
                className={cn(
                  "text-sm font-bold sm:text-base",
                  isActive ? "text-background" : "text-background/50",
                )}
              >
                {item.label}
              </span>
            </div>
            {index < stepItems.length - 1 ? (
              <ChevronRight
                className="size-5 text-background"
                aria-hidden="true"
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
