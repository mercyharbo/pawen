"use client";

import { MotionReveal } from "@/components/motion-reveal";
import { NominationFormDialog } from "@/components/nomination/nomination-form-dialog";
import { Button } from "@/components/ui/button";
import { useNomination } from "@/lib/stores/nomination-dialog-store";
import Image from "next/image";

export function NominationFormCtaSection() {
  const { openDialog } = useNomination();

  return (
    <section
      aria-labelledby="nomination-form-heading"
      className="relative isolate overflow-hidden bg-background px-5 py-10 text-primary sm:px-8 lg:px-10 lg:py-16"
      id="nomination-form"
    >
      <Image
        src="/clip-path.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover object-center opacity-45"
        aria-hidden="true"
      />

      <MotionReveal className="relative z-10 mx-auto flex min-h-64 w-full max-w-3xl flex-col items-center justify-center gap-7 text-center">
        <h2
          id="nomination-form-heading"
          className="max-w-xl text-4xl font-medium leading-tight text-primary sm:text-5xl lg:text-6xl"
        >
          NOMINATE YOUR FAVORITE NOW!
        </h2>
        <Button
          className="h-11 rounded-full bg-accent px-8 text-xs font-medium text-background hover:bg-accent/90"
          onClick={openDialog}
          type="button"
        >
          Nomination form
        </Button>
      </MotionReveal>

      <NominationFormDialog />
    </section>
  );
}
