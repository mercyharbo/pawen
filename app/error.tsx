"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error caught by boundary:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 text-center text-primary">
      <div className="flex max-w-md flex-col items-center gap-6 rounded-2xl border border-accent/20 bg-[#21002f] p-8 shadow-2xl">
        <div className="flex size-14 items-center justify-center rounded-full bg-accent/20 text-accent">
          <svg
            className="size-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-melodrama text-2xl font-semibold text-accent">
            Something went wrong
          </h2>
          <p className="text-sm leading-6 text-primary/80">
            We encountered a temporary problem loading this page or processing your request. Please try again.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            className="h-11 rounded-full bg-accent px-8 text-xs font-semibold text-background hover:bg-accent/90"
            onClick={() => reset()}
          >
            Try again
          </Button>
          <Button
            className="h-11 rounded-full border border-primary/50 bg-transparent px-8 text-xs font-semibold text-primary hover:bg-primary/10"
            onClick={() => (window.location.href = "/")}
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
