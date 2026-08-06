"use client";

import {
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  submitApplyToSpeak,
  submitExhibitionBooth,
  submitSummitRegistration,
  type EventFormState,
} from "@/app/events/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  boothTypeOptions,
  discoveryOptions,
  eventCountryOptions,
  industryOptions,
  nationalityOptions,
  sessionFormatOptions,
  sessionTopicOptions,
  speakerConfirmations,
  visaOptions,
  yesNoOptions,
} from "@/lib/event-form-data";
import {
  type EventDialogStep,
  getEventDialogSteps,
  useEventDialog,
} from "@/lib/stores/event-dialog-store";
import { cn } from "@/lib/utils";

const initialState: EventFormState = {
  status: "idle",
  message: "",
};

type EventFormValues = Record<string, string>;
type EventFormErrors = Record<string, string>;

const requiredMessage = "This field is required.";

const summitErrorStepMap: Record<string, EventDialogStep> = {
  firstName: "summit-personal",
  lastName: "summit-personal",
  dateOfBirth: "summit-personal",
  email: "summit-personal",
  phone: "summit-personal",
  country: "summit-personal",
  organisation: "summit-attendance",
  role: "summit-attendance",
  visaRequirement: "summit-attendance",
  dietaryRestrictions: "summit-attendance",
  accessibilityRequirements: "summit-attendance",
  discoverySource: "summit-attendance",
};

const exhibitionErrorStepMap: Record<string, EventDialogStep> = {
  firstName: "exhibition-contact",
  lastName: "exhibition-contact",
  email: "exhibition-contact",
  phone: "exhibition-contact",
  businessName: "exhibition-contact",
  country: "exhibition-contact",
  websiteOrSocial: "exhibition-contact",
  industry: "exhibition-interest",
  businessDescription: "exhibition-interest",
  boothType: "exhibition-interest",
  exhibitedBefore: "exhibition-interest",
  exhibitionGoal: "exhibition-interest",
  discoverySource: "exhibition-interest",
};

const speakerErrorStepMap: Record<string, EventDialogStep> = {
  firstName: "speaker-details",
  lastName: "speaker-details",
  email: "speaker-details",
  phone: "speaker-details",
  country: "speaker-details",
  nationality: "speaker-details",
  organisation: "speaker-profile",
  role: "speaker-profile",
  professionalBio: "speaker-profile",
  linkedinUrl: "speaker-profile",
  headshotFile: "speaker-profile",
  sessionTitle: "speaker-session",
  sessionTopic: "speaker-session",
  sessionFormat: "speaker-session",
  sessionAbstract: "speaker-session",
  speakerFit: "speaker-session",
  spokenBefore: "speaker-logistics",
  previousSpeakingDetails: "speaker-logistics",
  accommodationSupport: "speaker-logistics",
  visaRequirement: "speaker-logistics",
  confirmations: "speaker-logistics",
};

function errorId(name: string) {
  return `event-${name}-error`;
}

function fieldError(state: EventFormState, name: string) {
  return state.fieldErrors?.[name];
}

function requiredField(value: string) {
  return value.trim() ? "" : requiredMessage;
}

function omitFieldError(errors: EventFormErrors, name: string) {
  return Object.fromEntries(
    Object.entries(errors).filter(([field]) => field !== name),
  );
}

function fileField(form: HTMLFormElement, name: string) {
  const value = new FormData(form).get(name);

  return value instanceof File && value.size > 0 ? "" : requiredMessage;
}

function getDisplayedState(
  state: EventFormState,
  fieldErrors: EventFormErrors,
) {
  if (state.status === "success") {
    return initialState;
  }

  if (Object.keys(fieldErrors).length === 0) {
    return state;
  }

  return {
    status: "error" as const,
    message: "Please review the highlighted fields.",
    fieldErrors: {
      ...state.fieldErrors,
      ...fieldErrors,
    },
  };
}

function EventSuccessDialog({
  message,
  onDismiss,
  open,
  title,
}: {
  message: string;
  onDismiss: () => void;
  open: boolean;
  title: string;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onDismiss();
        }
      }}
    >
      <DialogContent className="max-w-md rounded-lg bg-[#21002f] p-8 text-primary ring-0">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <DialogTitle className="text-2xl font-semibold text-accent">
              {title}
            </DialogTitle>
            <DialogDescription className="text-sm leading-6 text-primary">
              {message}
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
  );
}

function StatusMessage({ state }: { state: EventFormState }) {
  if (!state.message) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-lg border px-4 py-3 text-sm leading-6",
        state.status === "success"
          ? "border-accent bg-accent/15 text-accent"
          : "border-destructive bg-destructive/15 text-primary",
      )}
      role="status"
    >
      {state.message}
    </div>
  );
}

function StepProgress({
  currentStep,
  labels,
  steps,
}: {
  currentStep: EventDialogStep;
  labels: Partial<Record<EventDialogStep, string>>;
  steps: EventDialogStep[];
}) {
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2" aria-hidden="true">
        {steps.map((item, index) => (
          <span
            className={cn(
              "h-1.5 flex-1 rounded-full",
              index <= currentIndex ? "bg-accent" : "bg-primary/20",
            )}
            key={item}
          />
        ))}
      </div>
      <p className="text-xs font-medium text-primary/75">
        Step {currentIndex + 1} of {steps.length}: {labels[currentStep]}
      </p>
    </div>
  );
}

function FormIntro({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <DialogTitle className="text-2xl font-semibold leading-tight text-accent">
        {title}
      </DialogTitle>
      <DialogDescription className="text-sm font-medium leading-6 text-primary">
        {description}
      </DialogDescription>
    </div>
  );
}

function TextField({
  state,
  className,
  label,
  name,
  onValueChange,
  required = false,
  type = "text",
  value,
}: {
  state: EventFormState;
  className?: string;
  label: string;
  name: string;
  onValueChange?: (name: string, value: string) => void;
  required?: boolean;
  type?: string;
  value?: string;
}) {
  const id = useId();
  const error = fieldError(state, name);

  return (
    <label className={cn("flex flex-col gap-2", className)} htmlFor={id}>
      <span className="text-sm font-semibold text-primary">
        {label}
        {required ? " *" : ""}
      </span>
      <Input
        aria-describedby={error ? errorId(name) : undefined}
        aria-invalid={error ? "true" : "false"}
        className="h-12 rounded-full border-background bg-white px-5 text-base text-background placeholder:text-gray-400 focus-visible:ring-background/25 dark:bg-white"
        id={id}
        name={name}
        onChange={(event) => onValueChange?.(name, event.currentTarget.value)}
        type={type}
        value={value}
      />
      {error ? (
        <span className="text-xs text-destructive" id={errorId(name)}>
          {error}
        </span>
      ) : null}
    </label>
  );
}

function TextareaField({
  state,
  label,
  name,
  onValueChange,
  placeholder,
  required = false,
  value,
}: {
  state: EventFormState;
  label: string;
  name: string;
  onValueChange?: (name: string, value: string) => void;
  placeholder?: string;
  required?: boolean;
  value?: string;
}) {
  const id = useId();
  const error = fieldError(state, name);

  return (
    <label className="flex flex-col gap-2" htmlFor={id}>
      <span className="text-sm font-semibold text-primary">
        {label}
        {required ? " *" : ""}
      </span>
      <Textarea
        aria-describedby={error ? errorId(name) : undefined}
        aria-invalid={error ? "true" : "false"}
        className="h-28 min-h-28 resize-none rounded-[2rem] border-background bg-white px-5 py-4 text-base text-background placeholder:text-gray-400 focus-visible:ring-background/25 [field-sizing:fixed] dark:bg-white"
        id={id}
        name={name}
        onChange={(event) => onValueChange?.(name, event.currentTarget.value)}
        placeholder={placeholder}
        value={value}
      />
      {error ? (
        <span className="text-xs text-destructive" id={errorId(name)}>
          {error}
        </span>
      ) : null}
    </label>
  );
}

function SelectField({
  state,
  label,
  name,
  onValueChange,
  options,
  placeholder = "Select One",
  required = false,
  value = "",
}: {
  state: EventFormState;
  label: string;
  name: string;
  onValueChange?: (name: string, value: string) => void;
  options: readonly string[];
  placeholder?: string;
  required?: boolean;
  value?: string;
}) {
  const id = useId();
  const error = fieldError(state, name);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-primary" htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      <Select
        value={value || null}
        onValueChange={(nextValue) => onValueChange?.(name, nextValue ?? "")}
      >
        <SelectTrigger
          aria-describedby={error ? errorId(name) : undefined}
          aria-invalid={error ? "true" : "false"}
          className="h-12 w-full rounded-full border-background bg-white px-5 text-base text-background focus-visible:ring-background/25 [&_svg]:text-background"
          id={id}
        >
          <SelectValue
            className={value ? "text-background" : "text-gray-400"}
            placeholder={placeholder}
          />
        </SelectTrigger>
        <SelectContent className="bg-white text-background">
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                className="text-background focus:bg-accent focus:text-background"
                key={option}
                value={option}
              >
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <input name={name} type="hidden" value={value} />
      {error ? (
        <span className="text-xs text-destructive" id={errorId(name)}>
          {error}
        </span>
      ) : null}
    </div>
  );
}

function FileField({
  onFileChange,
  state,
  label,
  name,
}: {
  onFileChange?: (name: string) => void;
  state: EventFormState;
  label: string;
  name: string;
}) {
  const id = useId();
  const error = fieldError(state, name);
  const [fileName, setFileName] = useState("No file chosen");

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-primary">{label} *</span>
      <div
        className={cn(
          "flex min-h-32 flex-col items-center justify-center gap-4 rounded-[2rem] border border-background bg-white px-5 py-6 text-center dark:bg-white",
          error ? "ring-3 ring-destructive/40" : "",
        )}
      >
        <span className="font-bold text-background">Upload a photo</span>
        <span className="text-sm text-gray-500">
          JPG, PNG, or WEBP. Maximum 10MB.
        </span>
        <label
          className="cursor-pointer rounded-full bg-accent px-7 py-3 text-xs font-bold text-background"
          htmlFor={id}
        >
          Choose file
        </label>
        <span className="max-w-full break-words text-xs text-gray-500">
          {fileName}
        </span>
        <input
          accept=".jpg,.jpeg,.png,.webp"
          aria-describedby={error ? errorId(name) : undefined}
          aria-invalid={error ? "true" : "false"}
          className="sr-only"
          id={id}
          name={name}
          onChange={(event) => {
            setFileName(
              event.currentTarget.files?.[0]?.name ?? "No file chosen",
            );
            onFileChange?.(name);
          }}
          type="file"
        />
      </div>
      {error ? (
        <span className="text-xs text-destructive" id={errorId(name)}>
          {error}
        </span>
      ) : null}
    </div>
  );
}

function ConfirmationGroup({
  onValuesChange,
  state,
  values,
}: {
  onValuesChange?: (values: string[]) => void;
  state: EventFormState;
  values: string[];
}) {
  const error = fieldError(state, "confirmations");

  return (
    <fieldset
      aria-describedby={error ? errorId("confirmations") : undefined}
      className="flex flex-col gap-3"
    >
      {Object.values(speakerConfirmations).map((confirmation, index) => {
        const checked = values.includes(confirmation);
        const id = `speaker-confirmation-${index}`;

        return (
          <label
            className="flex items-start gap-3 text-sm leading-6 text-primary"
            htmlFor={id}
            key={confirmation}
          >
            <Checkbox
              aria-invalid={error ? "true" : "false"}
              checked={checked}
              className="size-5 rounded-[4px] border-primary bg-white data-checked:bg-accent data-checked:text-background"
              id={id}
              onCheckedChange={(nextChecked) => {
                const nextValues = nextChecked
                  ? Array.from(new Set([...values, confirmation]))
                  : values.filter((item) => item !== confirmation);

                onValuesChange?.(nextValues);
              }}
            />
            <span>{confirmation}</span>
            {checked ? (
              <input name="confirmations" type="hidden" value={confirmation} />
            ) : null}
          </label>
        );
      })}
      {error ? (
        <span className="text-xs text-destructive" id={errorId("confirmations")}>
          {error}
        </span>
      ) : null}
    </fieldset>
  );
}

function FormActions({
  isFirstStep,
  isSubmitting,
  isLastStep,
  previousStep,
  nextStep,
  submitLabel,
}: {
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting: boolean;
  nextStep: () => void;
  previousStep: () => void;
  submitLabel: string;
}) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      {!isFirstStep ? (
        <Button
          className="h-12 w-full rounded-full border border-primary bg-transparent px-10 text-primary hover:!scale-100 hover:bg-primary/10 active:!translate-y-0 active:!scale-100 sm:w-36"
          onClick={previousStep}
          type="button"
        >
          Back
        </Button>
      ) : null}
      {isLastStep ? (
        <Button
          className="h-12 w-full rounded-full bg-accent px-10 text-background hover:!scale-100 hover:bg-accent/90 active:!translate-y-0 active:!scale-100 disabled:bg-accent/70 sm:w-fit"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Submitting..." : submitLabel}
        </Button>
      ) : (
        <Button
          className="h-12 w-full rounded-full bg-accent px-10 text-background hover:!scale-100 hover:bg-accent/90 active:!translate-y-0 active:!scale-100 sm:w-36"
          onClick={nextStep}
          type="button"
        >
          Next
        </Button>
      )}
    </div>
  );
}

function useStepErrorRouting(
  state: EventFormState,
  map: Record<string, EventDialogStep>,
) {
  const setStep = useEventDialog((store) => store.setStep);

  useEffect(() => {
    if (state.status !== "error" || !state.fieldErrors) {
      return;
    }

    const firstErrorStep = Object.keys(state.fieldErrors)
      .map((field) => map[field])
      .find(Boolean);

    if (firstErrorStep) {
      setStep(firstErrorStep);
    }
  }, [map, setStep, state.fieldErrors, state.status]);
}

function SummitRegistrationDialog() {
  const [state, formAction, pending] = useActionState(
    submitSummitRegistration,
    initialState,
  );
  const [fieldErrors, setFieldErrors] = useState<EventFormErrors>({});
  const [fieldValues, setFieldValues] = useState<EventFormValues>({});
  const [dismissedSuccessKey, setDismissedSuccessKey] = useState<
    string | undefined
  >();
  const [isTransitionPending, startTransition] = useTransition();
  const { activeDialog, closeDialog, nextStep, previousStep, resetDialog, step } =
    useEventDialog();
  const steps = getEventDialogSteps("summit");
  const isSubmitting = pending || isTransitionPending;
  const isOpen = activeDialog === "summit";
  const successKey =
    state.status === "success" ? (state.resetKey ?? state.message) : undefined;
  const isSuccessDialogOpen = Boolean(
    successKey && dismissedSuccessKey !== successKey,
  );
  const displayedState = getDisplayedState(state, fieldErrors);

  useStepErrorRouting(state, summitErrorStepMap);

  useEffect(() => {
    if (state.status === "success") {
      resetDialog();
      closeDialog();
    }
  }, [closeDialog, resetDialog, state.status]);

  function handleValueChange(name: string, value: string) {
    setFieldValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
    setFieldErrors((currentErrors) => {
      return omitFieldError(currentErrors, name);
    });
  }

  function validateStep(nextStepName: EventDialogStep) {
    const requiredFields =
      nextStepName === "summit-personal"
        ? ["firstName", "lastName", "dateOfBirth", "email", "phone", "country"]
        : ["visaRequirement"];
    const nextErrors = Object.fromEntries(
      requiredFields
        .map((field) => [field, requiredField(fieldValues[field] ?? "")])
        .filter(([, error]) => error),
    );

    setFieldErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleNextStep() {
    if (validateStep(step)) {
      nextStep();
    }
  }

  function handleSuccessDismiss() {
    setDismissedSuccessKey(successKey);
    setFieldErrors({});
    setFieldValues({});
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent
          className="h-fit max-h-[76vh] overflow-hidden rounded-lg bg-[#21002f] text-primary ring-0 sm:max-w-2xl"
          showCloseButton
      >
        <form
          className="flex max-h-[calc(76vh-2rem)] flex-col gap-5 overflow-x-hidden overflow-y-auto overscroll-contain p-5"
          data-lenis-prevent
          key={state.resetKey ?? "summit-registration-form"}
          noValidate
          onSubmit={(event) => {
            event.preventDefault();

            if (!validateStep(step)) {
              return;
            }

            const formData = new FormData(event.currentTarget);

            startTransition(() => {
              formAction(formData);
            });
          }}
        >
          <FormIntro
            title="Summit Registration"
            description="Complete your registration for the 2026 PAWEN Summit."
          />
          <StepProgress
            currentStep={step}
            labels={{
              "summit-personal": "Personal Details",
              "summit-attendance": "Attendance Details",
            }}
            steps={steps}
          />
          <StatusMessage state={displayedState} />
          <div
            className={cn(
              "grid gap-4 sm:grid-cols-2",
              step === "summit-personal" ? "" : "hidden",
            )}
          >
              <TextField
                label="First Name"
                name="firstName"
                onValueChange={handleValueChange}
                required
                state={displayedState}
                value={fieldValues.firstName ?? ""}
              />
              <TextField
                label="Last Name"
                name="lastName"
                onValueChange={handleValueChange}
                required
                state={displayedState}
                value={fieldValues.lastName ?? ""}
              />
              <TextField
                label="Date of Birth"
                name="dateOfBirth"
                onValueChange={handleValueChange}
                required
                state={displayedState}
                type="date"
                value={fieldValues.dateOfBirth ?? ""}
              />
              <TextField
                label="Email Address"
                name="email"
                onValueChange={handleValueChange}
                required
                state={displayedState}
                type="email"
                value={fieldValues.email ?? ""}
              />
              <TextField
                label="Phone Number"
                name="phone"
                onValueChange={handleValueChange}
                required
                state={displayedState}
                value={fieldValues.phone ?? ""}
              />
              <SelectField
                label="Country of Residence"
                name="country"
                onValueChange={handleValueChange}
                options={eventCountryOptions}
                required
                state={displayedState}
                value={fieldValues.country ?? ""}
              />
          </div>
          <div
            className={cn(
              "grid gap-4 sm:grid-cols-2",
              step === "summit-attendance" ? "" : "hidden",
            )}
          >
              <TextField
                label="Organisation or Company Name"
                name="organisation"
                onValueChange={handleValueChange}
                state={displayedState}
                value={fieldValues.organisation ?? ""}
              />
              <TextField
                label="Job Title or Role"
                name="role"
                onValueChange={handleValueChange}
                state={displayedState}
                value={fieldValues.role ?? ""}
              />
              <SelectField
                label="Do you require a visa to enter Zambia?"
                name="visaRequirement"
                onValueChange={handleValueChange}
                options={visaOptions}
                required
                state={displayedState}
                value={fieldValues.visaRequirement ?? ""}
              />
              <SelectField
                label="How did you hear about the Summit?"
                name="discoverySource"
                onValueChange={handleValueChange}
                options={discoveryOptions}
                state={displayedState}
                value={fieldValues.discoverySource ?? ""}
              />
              <TextField
                label="Dietary Restrictions or Allergies"
                name="dietaryRestrictions"
                onValueChange={handleValueChange}
                state={displayedState}
                value={fieldValues.dietaryRestrictions ?? ""}
              />
              <TextField
                label="Accessibility Requirements"
                name="accessibilityRequirements"
                onValueChange={handleValueChange}
                state={displayedState}
                value={fieldValues.accessibilityRequirements ?? ""}
              />
          </div>
          <FormActions
            isFirstStep={step === steps[0]}
            isLastStep={step === steps[steps.length - 1]}
            isSubmitting={isSubmitting}
            nextStep={handleNextStep}
            previousStep={previousStep}
            submitLabel="Submit Registration"
          />
        </form>
        </DialogContent>
      </Dialog>
      <EventSuccessDialog
        message={state.message}
        onDismiss={handleSuccessDismiss}
        open={isSuccessDialogOpen}
        title="Registration submitted"
      />
    </>
  );
}

function ExhibitionBoothDialog() {
  const [state, formAction, pending] = useActionState(
    submitExhibitionBooth,
    initialState,
  );
  const [fieldErrors, setFieldErrors] = useState<EventFormErrors>({});
  const [fieldValues, setFieldValues] = useState<EventFormValues>({});
  const [dismissedSuccessKey, setDismissedSuccessKey] = useState<
    string | undefined
  >();
  const [isTransitionPending, startTransition] = useTransition();
  const { activeDialog, closeDialog, nextStep, previousStep, resetDialog, step } =
    useEventDialog();
  const steps = getEventDialogSteps("exhibition");
  const isSubmitting = pending || isTransitionPending;
  const isOpen = activeDialog === "exhibition";
  const successKey =
    state.status === "success" ? (state.resetKey ?? state.message) : undefined;
  const isSuccessDialogOpen = Boolean(
    successKey && dismissedSuccessKey !== successKey,
  );
  const displayedState = getDisplayedState(state, fieldErrors);

  useStepErrorRouting(state, exhibitionErrorStepMap);

  useEffect(() => {
    if (state.status === "success") {
      resetDialog();
      closeDialog();
    }
  }, [closeDialog, resetDialog, state.status]);

  function handleValueChange(name: string, value: string) {
    setFieldValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
    setFieldErrors((currentErrors) => {
      return omitFieldError(currentErrors, name);
    });
  }

  function validateStep(nextStepName: EventDialogStep) {
    const requiredFields =
      nextStepName === "exhibition-contact"
        ? [
            "firstName",
            "lastName",
            "email",
            "phone",
            "businessName",
            "country",
          ]
        : [
            "industry",
            "boothType",
            "exhibitedBefore",
            "businessDescription",
            "exhibitionGoal",
          ];
    const nextErrors = Object.fromEntries(
      requiredFields
        .map((field) => [field, requiredField(fieldValues[field] ?? "")])
        .filter(([, error]) => error),
    );

    setFieldErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleNextStep() {
    if (validateStep(step)) {
      nextStep();
    }
  }

  function handleSuccessDismiss() {
    setDismissedSuccessKey(successKey);
    setFieldErrors({});
    setFieldValues({});
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent
          className="h-fit max-h-[76vh] overflow-hidden rounded-lg bg-[#21002f] text-primary ring-0 sm:max-w-2xl"
          showCloseButton
      >
        <form
          className="flex max-h-[calc(76vh-2rem)] flex-col gap-5 overflow-x-hidden overflow-y-auto overscroll-contain p-5"
          data-lenis-prevent
          key={state.resetKey ?? "exhibition-booth-form"}
          noValidate
          onSubmit={(event) => {
            event.preventDefault();

            if (!validateStep(step)) {
              return;
            }

            const formData = new FormData(event.currentTarget);

            startTransition(() => {
              formAction(formData);
            });
          }}
        >
          <FormIntro
            title="Book Exhibition Booth"
            description="Share your business details and booth interest with the PAWEN team."
          />
          <StepProgress
            currentStep={step}
            labels={{
              "exhibition-contact": "Contact and Business",
              "exhibition-interest": "Booth Interest",
            }}
            steps={steps}
          />
          <StatusMessage state={displayedState} />
          <div
            className={cn(
              "grid gap-4 sm:grid-cols-2",
              step === "exhibition-contact" ? "" : "hidden",
            )}
          >
              <TextField
                label="First Name"
                name="firstName"
                onValueChange={handleValueChange}
                required
                state={displayedState}
                value={fieldValues.firstName ?? ""}
              />
              <TextField
                label="Last Name"
                name="lastName"
                onValueChange={handleValueChange}
                required
                state={displayedState}
                value={fieldValues.lastName ?? ""}
              />
              <TextField
                label="Email Address"
                name="email"
                onValueChange={handleValueChange}
                required
                state={displayedState}
                type="email"
                value={fieldValues.email ?? ""}
              />
              <TextField
                label="Phone Number"
                name="phone"
                onValueChange={handleValueChange}
                required
                state={displayedState}
                value={fieldValues.phone ?? ""}
              />
              <TextField
                label="Business or Organisation Name"
                name="businessName"
                onValueChange={handleValueChange}
                required
                state={displayedState}
                value={fieldValues.businessName ?? ""}
              />
              <SelectField
                label="Country of Operation"
                name="country"
                onValueChange={handleValueChange}
                options={eventCountryOptions}
                required
                state={displayedState}
                value={fieldValues.country ?? ""}
              />
              <TextField
                className="sm:col-span-2"
                label="Website or Social Media Link"
                name="websiteOrSocial"
                onValueChange={handleValueChange}
                state={displayedState}
                value={fieldValues.websiteOrSocial ?? ""}
              />
          </div>
          <div
            className={cn(
              "flex flex-col gap-4",
              step === "exhibition-interest" ? "" : "hidden",
            )}
          >
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="Industry or Sector"
                  name="industry"
                  onValueChange={handleValueChange}
                  options={industryOptions}
                  required
                  state={displayedState}
                  value={fieldValues.industry ?? ""}
                />
                <SelectField
                  label="Booth Type"
                  name="boothType"
                  onValueChange={handleValueChange}
                  options={boothTypeOptions}
                  required
                  state={displayedState}
                  value={fieldValues.boothType ?? ""}
                />
                <SelectField
                  label="Have you exhibited at a similar event before?"
                  name="exhibitedBefore"
                  onValueChange={handleValueChange}
                  options={yesNoOptions}
                  required
                  state={displayedState}
                  value={fieldValues.exhibitedBefore ?? ""}
                />
                <SelectField
                  label="How did you hear about the PAWEN Exhibition?"
                  name="discoverySource"
                  onValueChange={handleValueChange}
                  options={discoveryOptions}
                  state={displayedState}
                  value={fieldValues.discoverySource ?? ""}
                />
              </div>
              <TextareaField
                label="Brief Description of Your Business"
                name="businessDescription"
                onValueChange={handleValueChange}
                placeholder="Tell us what your business does."
                required
                state={displayedState}
                value={fieldValues.businessDescription ?? ""}
              />
              <TextareaField
                label="What do you hope to achieve by exhibiting at PAWEN?"
                name="exhibitionGoal"
                onValueChange={handleValueChange}
                placeholder="Share your goals for visibility, sales, partnerships, or networking."
                required
                state={displayedState}
                value={fieldValues.exhibitionGoal ?? ""}
              />
          </div>
          <FormActions
            isFirstStep={step === steps[0]}
            isLastStep={step === steps[steps.length - 1]}
            isSubmitting={isSubmitting}
            nextStep={handleNextStep}
            previousStep={previousStep}
            submitLabel="Submit Booth Request"
          />
        </form>
        </DialogContent>
      </Dialog>
      <EventSuccessDialog
        message={state.message}
        onDismiss={handleSuccessDismiss}
        open={isSuccessDialogOpen}
        title="Booth request submitted"
      />
    </>
  );
}

function ApplyToSpeakDialog() {
  const [state, formAction, pending] = useActionState(
    submitApplyToSpeak,
    initialState,
  );
  const [confirmationValues, setConfirmationValues] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<EventFormErrors>({});
  const [fieldValues, setFieldValues] = useState<EventFormValues>({});
  const [dismissedSuccessKey, setDismissedSuccessKey] = useState<
    string | undefined
  >();
  const formRef = useRef<HTMLFormElement>(null);
  const [isTransitionPending, startTransition] = useTransition();
  const { activeDialog, closeDialog, nextStep, previousStep, resetDialog, step } =
    useEventDialog();
  const steps = getEventDialogSteps("speaker");
  const isSubmitting = pending || isTransitionPending;
  const isOpen = activeDialog === "speaker";
  const successKey =
    state.status === "success" ? (state.resetKey ?? state.message) : undefined;
  const isSuccessDialogOpen = Boolean(
    successKey && dismissedSuccessKey !== successKey,
  );
  const displayedState = getDisplayedState(state, fieldErrors);

  useStepErrorRouting(state, speakerErrorStepMap);

  useEffect(() => {
    if (state.status === "success") {
      resetDialog();
      closeDialog();
    }
  }, [closeDialog, resetDialog, state.status]);

  function clearFieldError(name: string) {
    setFieldErrors((currentErrors) => {
      return omitFieldError(currentErrors, name);
    });
  }

  function handleValueChange(name: string, value: string) {
    setFieldValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
    clearFieldError(name);
  }

  function handleConfirmationsChange(values: string[]) {
    setConfirmationValues(values);
    clearFieldError("confirmations");
  }

  function validateStep(nextStepName: EventDialogStep) {
    const requiredFields =
      nextStepName === "speaker-details"
        ? ["firstName", "lastName", "email", "phone", "country", "nationality"]
        : nextStepName === "speaker-profile"
          ? ["organisation", "role", "linkedinUrl", "professionalBio"]
          : nextStepName === "speaker-session"
            ? [
                "sessionTitle",
                "sessionTopic",
                "sessionFormat",
                "sessionAbstract",
                "speakerFit",
              ]
            : ["spokenBefore", "accommodationSupport", "visaRequirement"];
    const nextErrors: EventFormErrors = Object.fromEntries(
      requiredFields
        .map((field) => [field, requiredField(fieldValues[field] ?? "")])
        .filter(([, error]) => error),
    );

    if (nextStepName === "speaker-profile" && formRef.current) {
      const headshotError = fileField(formRef.current, "headshotFile");

      if (headshotError) {
        nextErrors.headshotFile = "Upload your headshot photo.";
      }
    }

    if (
      nextStepName === "speaker-logistics" &&
      !Object.values(speakerConfirmations).every((confirmation) =>
        confirmationValues.includes(confirmation),
      )
    ) {
      nextErrors.confirmations = "Please accept all confirmations.";
    }

    setFieldErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleNextStep() {
    if (validateStep(step)) {
      nextStep();
    }
  }

  function handleSuccessDismiss() {
    setDismissedSuccessKey(successKey);
    setConfirmationValues([]);
    setFieldErrors({});
    setFieldValues({});
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent
          className="h-fit max-h-[76vh] overflow-hidden rounded-lg bg-[#21002f] text-primary ring-0 sm:max-w-3xl"
          showCloseButton
      >
        <form
          className="flex max-h-[calc(76vh-2rem)] flex-col gap-5 overflow-x-hidden overflow-y-auto overscroll-contain p-5"
          data-lenis-prevent
          encType="multipart/form-data"
          key={state.resetKey ?? "apply-to-speak-form"}
          noValidate
          ref={formRef}
          onSubmit={(event) => {
            event.preventDefault();

            if (!validateStep(step)) {
              return;
            }

            const formData = new FormData(event.currentTarget);

            startTransition(() => {
              formAction(formData);
            });
          }}
        >
          <FormIntro
            title="Apply to Speak"
            description="Share your profile and proposed session for the 2026 PAWEN Summit."
          />
          <StepProgress
            currentStep={step}
            labels={{
              "speaker-details": "Speaker Details",
              "speaker-profile": "Professional Profile",
              "speaker-session": "Session Proposal",
              "speaker-logistics": "Logistics and Confirmation",
            }}
            steps={steps}
          />
          <StatusMessage state={displayedState} />
          <div
            className={cn(
              "grid gap-4 sm:grid-cols-2",
              step === "speaker-details" ? "" : "hidden",
            )}
          >
              <TextField
                label="First Name"
                name="firstName"
                onValueChange={handleValueChange}
                required
                state={displayedState}
                value={fieldValues.firstName ?? ""}
              />
              <TextField
                label="Last Name"
                name="lastName"
                onValueChange={handleValueChange}
                required
                state={displayedState}
                value={fieldValues.lastName ?? ""}
              />
              <TextField
                label="Email Address"
                name="email"
                onValueChange={handleValueChange}
                required
                state={displayedState}
                type="email"
                value={fieldValues.email ?? ""}
              />
              <TextField
                label="Phone Number"
                name="phone"
                onValueChange={handleValueChange}
                required
                state={displayedState}
                value={fieldValues.phone ?? ""}
              />
              <SelectField
                label="Country of Residence"
                name="country"
                onValueChange={handleValueChange}
                options={eventCountryOptions}
                required
                state={displayedState}
                value={fieldValues.country ?? ""}
              />
              <SelectField
                label="Nationality"
                name="nationality"
                onValueChange={handleValueChange}
                options={nationalityOptions}
                required
                state={displayedState}
                value={fieldValues.nationality ?? ""}
              />
          </div>
          <div
            className={cn(
              "flex flex-col gap-4",
              step === "speaker-profile" ? "" : "hidden",
            )}
          >
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="Organisation or Company Name"
                  name="organisation"
                  onValueChange={handleValueChange}
                  required
                  state={displayedState}
                  value={fieldValues.organisation ?? ""}
                />
                <TextField
                  label="Job Title or Role"
                  name="role"
                  onValueChange={handleValueChange}
                  required
                  state={displayedState}
                  value={fieldValues.role ?? ""}
                />
                <TextField
                  className="sm:col-span-2"
                  label="LinkedIn Profile URL"
                  name="linkedinUrl"
                  onValueChange={handleValueChange}
                  required
                  state={displayedState}
                  value={fieldValues.linkedinUrl ?? ""}
                />
              </div>
              <TextareaField
                label="Professional Bio"
                name="professionalBio"
                onValueChange={handleValueChange}
                placeholder="Share your professional background and areas of expertise."
                required
                state={displayedState}
                value={fieldValues.professionalBio ?? ""}
              />
              <FileField
                label="Headshot Photo"
                name="headshotFile"
                onFileChange={clearFieldError}
                state={displayedState}
              />
          </div>
          <div
            className={cn(
              "flex flex-col gap-4",
              step === "speaker-session" ? "" : "hidden",
            )}
          >
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="Proposed Session Title"
                  name="sessionTitle"
                  onValueChange={handleValueChange}
                  required
                  state={displayedState}
                  value={fieldValues.sessionTitle ?? ""}
                />
                <SelectField
                  label="Session Topic Area"
                  name="sessionTopic"
                  onValueChange={handleValueChange}
                  options={sessionTopicOptions}
                  required
                  state={displayedState}
                  value={fieldValues.sessionTopic ?? ""}
                />
                <SelectField
                  label="Preferred Session Format"
                  name="sessionFormat"
                  onValueChange={handleValueChange}
                  options={sessionFormatOptions}
                  required
                  state={displayedState}
                  value={fieldValues.sessionFormat ?? ""}
                />
              </div>
              <TextareaField
                label="Session Abstract or Description"
                name="sessionAbstract"
                onValueChange={handleValueChange}
                placeholder="Describe the session focus, audience, and key takeaways."
                required
                state={displayedState}
                value={fieldValues.sessionAbstract ?? ""}
              />
              <TextareaField
                label="Why are you the right speaker for this topic?"
                name="speakerFit"
                onValueChange={handleValueChange}
                placeholder="Share your relevant experience, perspective, or evidence."
                required
                state={displayedState}
                value={fieldValues.speakerFit ?? ""}
              />
          </div>
          <div
            className={cn(
              "flex flex-col gap-4",
              step === "speaker-logistics" ? "" : "hidden",
            )}
          >
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="Have you spoken at a similar summit or conference before?"
                  name="spokenBefore"
                  onValueChange={handleValueChange}
                  options={yesNoOptions}
                  required
                  state={displayedState}
                  value={fieldValues.spokenBefore ?? ""}
                />
                <SelectField
                  label="Will you require accommodation support?"
                  name="accommodationSupport"
                  onValueChange={handleValueChange}
                  options={yesNoOptions}
                  required
                  state={displayedState}
                  value={fieldValues.accommodationSupport ?? ""}
                />
                <SelectField
                  label="Do you require a visa to enter Zambia?"
                  name="visaRequirement"
                  onValueChange={handleValueChange}
                  options={visaOptions}
                  required
                  state={displayedState}
                  value={fieldValues.visaRequirement ?? ""}
                />
              </div>
              <TextareaField
                label="If yes, share links or details of previous speaking engagements"
                name="previousSpeakingDetails"
                onValueChange={handleValueChange}
                placeholder="Paste links or summarize relevant previous sessions."
                state={displayedState}
                value={fieldValues.previousSpeakingDetails ?? ""}
              />
              <ConfirmationGroup
                onValuesChange={handleConfirmationsChange}
                state={displayedState}
                values={confirmationValues}
              />
          </div>
          <FormActions
            isFirstStep={step === steps[0]}
            isLastStep={step === steps[steps.length - 1]}
            isSubmitting={isSubmitting}
            nextStep={handleNextStep}
            previousStep={previousStep}
            submitLabel="Submit Application"
          />
        </form>
        </DialogContent>
      </Dialog>
      <EventSuccessDialog
        message={state.message}
        onDismiss={handleSuccessDismiss}
        open={isSuccessDialogOpen}
        title="Speaker application submitted"
      />
    </>
  );
}

export function EventFormDialogs() {
  return (
    <>
      <SummitRegistrationDialog />
      <ExhibitionBoothDialog />
      <ApplyToSpeakDialog />
    </>
  );
}
