import type { NominationFormState } from "@/app/nominations/actions";
import { cn } from "@/lib/utils";

export function StatusMessage({ state }: { state: NominationFormState }) {
  if (!state.message) {
    return null;
  }

  return (
    <p
      className={cn(
        "rounded-2xl px-4 py-3 text-sm",
        state.status === "success"
          ? "bg-background text-accent"
          : "bg-destructive/15 text-destructive",
      )}
      aria-live="polite"
      role={state.status === "error" ? "alert" : "status"}
    >
      {state.message}
    </p>
  );
}
