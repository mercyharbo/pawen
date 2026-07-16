"use client";

import {
  type WheelEvent,
  useActionState,
  useEffect,
  useState,
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  confirmations,
  fallbackAfricanCountries,
} from "@/lib/nomination-form-data";
import { useNomination } from "@/lib/stores/nomination-dialog-store";

const storedFormFields = [
  "category",
  "nominatingFor",
  "nominatorFirstName",
  "nominatorLastName",
  "nominatorEmail",
  "nominatorPhone",
  "relationship",
  "nomineeFirstName",
  "nomineeLastName",
  "nomineeEmail",
  "nomineePhone",
  "country",
  "roleOrganisation",
  "linkedinUrl",
  "socialUrl",
  "website",
  "whyDeserving",
  "discoverySource",
] as const;

function requiredField(value: string) {
  return value.trim() ? "" : "This field is required.";
}

export function NominationFormDialog() {
  const [state, formAction, pending] = useActionState(
    submitNomination,
    initialState,
  );
  const [dismissedSuccessKey, setDismissedSuccessKey] = useState<
    string | undefined
  >();
  const [isTransitionPending, startTransition] = useTransition();
  const isSubmitting = pending || isTransitionPending;
  const successKey =
    state.status === "success" ? (state.resetKey ?? state.message) : undefined;
  const isSuccessDialogOpen = Boolean(
    successKey && dismissedSuccessKey !== successKey,
  );
  const { data } = useSWR("/api/countries", fetcher, {
    fallbackData: { countries: fallbackAfricanCountries },
  });
  const countries = data?.countries ?? fallbackAfricanCountries;
  const {
    applySelfNominationDefaults,
    closeDialog,
    fieldErrors,
    isOpen,
    nextStep,
    resetDialog,
    setFieldErrors,
    setStep,
    step,
  } = useNomination();
  const displayedState: typeof state =
    state.status === "success"
      ? initialState
      : Object.keys(fieldErrors).length > 0
      ? {
          status: "error",
          message: "Please review the highlighted fields.",
          fieldErrors: {
            ...state.fieldErrors,
            ...fieldErrors,
          },
        }
      : state;

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
      closeDialog();
      resetDialog();
    }
  }, [closeDialog, resetDialog, state.message, state.status]);

  function handleFormWheel(event: WheelEvent<HTMLFormElement>) {
    const form = event.currentTarget;

    if (form.scrollHeight <= form.clientHeight) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    form.scrollTop += event.deltaY;
  }

  function validateCurrentStep() {
    const values = useNomination.getState();
    const nextErrors: Record<string, string> = {};

    if (step === "intro") {
      const categoryError = requiredField(values.category);
      const targetError = requiredField(values.nominatingFor);

      if (categoryError) {
        nextErrors.category = categoryError;
      }

      if (targetError) {
        nextErrors.nominatingFor = targetError;
      }
    }

    if (step === "nominee") {
      const firstNameError = requiredField(values.nomineeFirstName);
      const lastNameError = requiredField(values.nomineeLastName);
      const countryError = requiredField(values.country);

      if (firstNameError) {
        nextErrors.nomineeFirstName = firstNameError;
      }

      if (lastNameError) {
        nextErrors.nomineeLastName = lastNameError;
      }

      if (countryError) {
        nextErrors.country = countryError;
      }
    }

    if (step === "story") {
      const storyError = requiredField(values.whyDeserving);
      const discoverySourceError = requiredField(values.discoverySource);

      if (storyError) {
        nextErrors.whyDeserving = storyError;
      }

      if (discoverySourceError) {
        nextErrors.discoverySource = discoverySourceError;
      }

      if (values.confirmations.length !== confirmations.length) {
        nextErrors.confirmations = "Please accept both confirmations.";
      }
    }

    setFieldErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleNextStep() {
    if (!validateCurrentStep()) {
      return;
    }

    if (step === "nominator") {
      applySelfNominationDefaults();
    }

    nextStep();
  }

  function getSubmissionFormData(form: HTMLFormElement) {
    const values = useNomination.getState();
    const formData = new FormData(form);

    for (const field of storedFormFields) {
      formData.set(field, values[field]);
    }

    formData.delete("confirmations");
    for (const confirmation of values.confirmations) {
      formData.append("confirmations", confirmation);
    }

    return formData;
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent
          className="h-fit max-h-[70vh] overflow-hidden rounded-lg bg-[#21002f] text-primary ring-0 sm:max-w-2xl"
          showCloseButton
        >
          <form
            className="scrollbar-hide flex max-h-[calc(70vh-2rem)] flex-col gap-5 overflow-x-hidden overflow-y-auto overscroll-contain p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            encType="multipart/form-data"
            key={state.resetKey ?? "nomination-dialog-form"}
            noValidate
            onWheel={handleFormWheel}
            onSubmit={(event) => {
              event.preventDefault();

              if (!validateCurrentStep()) {
                return;
              }

              const formData = getSubmissionFormData(event.currentTarget);

              startTransition(() => {
                formAction(formData);
              });
            }}
          >
            <StatusMessage state={displayedState} />
            {step === "intro" ? (
              <IntroStep onNext={handleNextStep} state={displayedState} />
            ) : null}
            {step === "nominator" ? (
              <NominatorStep onNext={handleNextStep} state={displayedState} />
            ) : null}
            {step === "nominee" ? (
              <NomineeStep
                countries={countries}
                onNext={handleNextStep}
                state={displayedState}
              />
            ) : null}
            {step === "story" ? (
              <StoryStep isSubmitting={isSubmitting} state={displayedState} />
            ) : null}
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isSuccessDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setDismissedSuccessKey(successKey);
          }
        }}
      >
        <DialogContent className="max-w-md rounded-lg bg-[#21002f] p-8 text-primary ring-0">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <DialogTitle className="text-2xl font-semibold text-accent">
                Nomination submitted
              </DialogTitle>
              <DialogDescription className="text-sm leading-6 text-primary">
                {state.message}
              </DialogDescription>
            </div>
            <div className="flex justify-end">
              <DialogClose render={<Button className="rounded-full px-8" />}>
                Close
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
