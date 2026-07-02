"use client";

import {
  type WheelEvent,
  useActionState,
  useEffect,
  useTransition,
} from "react";
import useSWR from "swr";
import { submitNomination } from "@/app/nominations/actions";
import {
  errorStepMap,
  fetcher,
  initialState,
} from "@/components/nomination/form-dialog/dialog-config";
import { IntroStep } from "@/components/nomination/form-dialog/intro-step";
import { NominatorStep } from "@/components/nomination/form-dialog/nominator-step";
import { NomineeStep } from "@/components/nomination/form-dialog/nominee-step";
import { StatusMessage } from "@/components/nomination/form-dialog/status-message";
import { StoryStep } from "@/components/nomination/form-dialog/story-step";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { fallbackAfricanCountries } from "@/lib/nomination-form-data";
import { useNominationDialogStore } from "@/lib/stores/nomination-dialog-store";

export function NominationFormDialog() {
  const [state, formAction, pending] = useActionState(
    submitNomination,
    initialState,
  );
  const [isTransitionPending, startTransition] = useTransition();
  const isSubmitting = pending || isTransitionPending;
  const { data } = useSWR("/api/countries", fetcher, {
    fallbackData: { countries: fallbackAfricanCountries },
  });
  const countries = data?.countries ?? fallbackAfricanCountries;
  const isOpen = useNominationDialogStore((store) => store.isOpen);
  const step = useNominationDialogStore((store) => store.step);
  const closeDialog = useNominationDialogStore((store) => store.closeDialog);
  const resetDialog = useNominationDialogStore((store) => store.resetDialog);
  const setStep = useNominationDialogStore((store) => store.setStep);

  useEffect(() => {
    if (state.status !== "error" || !state.fieldErrors) {
      return;
    }

    const firstErrorStep = Object.keys(state.fieldErrors)
      .map((field) => errorStepMap[field])
      .find(Boolean);

    if (firstErrorStep) {
      setStep(firstErrorStep);
    }
  }, [setStep, state.fieldErrors, state.status]);

  useEffect(() => {
    if (state.status === "success") {
      resetDialog();
    }
  }, [resetDialog, state.status]);

  function handleFormWheel(event: WheelEvent<HTMLFormElement>) {
    const form = event.currentTarget;

    if (form.scrollHeight <= form.clientHeight) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    form.scrollTop += event.deltaY;
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent
        className="h-fit max-h-[70vh] overflow-hidden rounded-lg bg-champagne-gold text-background ring-0 sm:max-w-2xl"
        showCloseButton
      >
        <form
          className="scrollbar-hide flex max-h-[calc(70vh-2rem)] p-5 flex-col gap-5 overflow-x-hidden overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          encType="multipart/form-data"
          key={state.resetKey ?? "nomination-dialog-form"}
          noValidate
          onWheel={handleFormWheel}
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);

            startTransition(() => {
              formAction(formData);
            });
          }}
        >
          <StatusMessage state={state} />
          {step === "intro" ? <IntroStep state={state} /> : null}
          {step === "nominator" ? <NominatorStep state={state} /> : null}
          {step === "nominee" ? (
            <NomineeStep countries={countries} state={state} />
          ) : null}
          {step === "story" ? (
            <StoryStep isSubmitting={isSubmitting} state={state} />
          ) : null}
        </form>
      </DialogContent>
    </Dialog>
  );
}
