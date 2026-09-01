"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[#21002f] p-6 text-white">
        <div className="flex max-w-md flex-col items-center gap-6 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-white/10 text-[#d4af37]">
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
            <h2 className="text-2xl font-bold text-[#d4af37]">
              Something went wrong
            </h2>
            <p className="text-sm leading-6 text-white/80">
              An unexpected error occurred. Please try reloading the application.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className="h-11 cursor-pointer rounded-full bg-[#d4af37] px-8 text-xs font-semibold text-[#21002f] transition hover:opacity-90"
              onClick={() => reset()}
              type="button"
            >
              Try again
            </button>
            <button
              className="h-11 cursor-pointer rounded-full border border-white/50 bg-transparent px-8 text-xs font-semibold text-white transition hover:bg-white/10"
              onClick={() => (window.location.href = "/")}
              type="button"
            >
              Go Home
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
