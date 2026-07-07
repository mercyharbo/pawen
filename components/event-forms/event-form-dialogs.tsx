"use client";

import {
  type WheelEvent,
  useActionState,
  useEffect,
  useId,
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
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
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

function handleFormWheel(event: WheelEvent<HTMLFormElement>) {
  const form = event.currentTarget;

  if (form.scrollHeight <= form.clientHeight) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  form.scrollTop += event.deltaY;
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
  required = false,
  type = "text",
}: {
  state: EventFormState;
  className?: string;
  label: string;
  name: string;
  required?: boolean;
  type?: string;
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
        type={type}
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
  placeholder,
  required = false,
}: {
  state: EventFormState;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
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
        placeholder={placeholder}
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
  options,
  placeholder = "Select One",
  required = false,
}: {
  state: EventFormState;
  label: string;
  name: string;
  options: readonly string[];
  placeholder?: string;
  required?: boolean;
}) {
  const id = useId();
  const error = fieldError(state, name);
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-primary" htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      <Select
        value={value || null}
        onValueChange={(nextValue) => setValue(nextValue ?? "")}
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
        <SelectContent className="scrollbar-hide bg-white text-background">
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
  state,
  label,
  name,
}: {
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
          onChange={(event) =>
            setFileName(event.currentTarget.files?.[0]?.name ?? "No file chosen")
          }
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
  state,
}: {
  state: EventFormState;
}) {
  const error = fieldError(state, "confirmations");
  const [values, setValues] = useState<string[]>([]);

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
              onCheckedChange={(nextChecked) =>
                setValues((currentValues) =>
                  nextChecked
                    ? Array.from(new Set([...currentValues, confirmation]))
                    : currentValues.filter((item) => item !== confirmation),
                )
              }
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
  const [isTransitionPending, startTransition] = useTransition();
  const { activeDialog, closeDialog, nextStep, previousStep, resetDialog, step } =
    useEventDialog();
  const steps = getEventDialogSteps("summit");
  const isSubmitting = pending || isTransitionPending;
  const isOpen = activeDialog === "summit";

  useStepErrorRouting(state, summitErrorStepMap);

  useEffect(() => {
    if (state.status === "success") {
      resetDialog();
    }
  }, [resetDialog, state.status]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent
        className="h-fit max-h-[76vh] overflow-hidden rounded-lg bg-[#21002f] text-primary ring-0 sm:max-w-2xl"
        showCloseButton
      >
        <form
          className="scrollbar-hide flex max-h-[calc(76vh-2rem)] flex-col gap-5 overflow-x-hidden overflow-y-auto overscroll-contain p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          key={state.resetKey ?? "summit-registration-form"}
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
          <StatusMessage state={state} />
          <div
            className={cn(
              "grid gap-4 sm:grid-cols-2",
              step === "summit-personal" ? "" : "hidden",
            )}
          >
              <TextField label="First Name" name="firstName" required state={state} />
              <TextField label="Last Name" name="lastName" required state={state} />
              <TextField
                label="Date of Birth"
                name="dateOfBirth"
                required
                state={state}
                type="date"
              />
              <TextField
                label="Email Address"
                name="email"
                required
                state={state}
                type="email"
              />
              <TextField label="Phone Number" name="phone" required state={state} />
              <SelectField
                label="Country of Residence"
                name="country"
                options={eventCountryOptions}
                required
                state={state}
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
                state={state}
              />
              <TextField label="Job Title or Role" name="role" state={state} />
              <SelectField
                label="Do you require a visa to enter Zambia?"
                name="visaRequirement"
                options={visaOptions}
                required
                state={state}
              />
              <SelectField
                label="How did you hear about the Summit?"
                name="discoverySource"
                options={discoveryOptions}
                state={state}
              />
              <TextField
                label="Dietary Restrictions or Allergies"
                name="dietaryRestrictions"
                state={state}
              />
              <TextField
                label="Accessibility Requirements"
                name="accessibilityRequirements"
                state={state}
              />
          </div>
          <FormActions
            isFirstStep={step === steps[0]}
            isLastStep={step === steps[steps.length - 1]}
            isSubmitting={isSubmitting}
            nextStep={nextStep}
            previousStep={previousStep}
            submitLabel="Submit Registration"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ExhibitionBoothDialog() {
  const [state, formAction, pending] = useActionState(
    submitExhibitionBooth,
    initialState,
  );
  const [isTransitionPending, startTransition] = useTransition();
  const { activeDialog, closeDialog, nextStep, previousStep, resetDialog, step } =
    useEventDialog();
  const steps = getEventDialogSteps("exhibition");
  const isSubmitting = pending || isTransitionPending;
  const isOpen = activeDialog === "exhibition";

  useStepErrorRouting(state, exhibitionErrorStepMap);

  useEffect(() => {
    if (state.status === "success") {
      resetDialog();
    }
  }, [resetDialog, state.status]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent
        className="h-fit max-h-[76vh] overflow-hidden rounded-lg bg-[#21002f] text-primary ring-0 sm:max-w-2xl"
        showCloseButton
      >
        <form
          className="scrollbar-hide flex max-h-[calc(76vh-2rem)] flex-col gap-5 overflow-x-hidden overflow-y-auto overscroll-contain p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          key={state.resetKey ?? "exhibition-booth-form"}
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
          <StatusMessage state={state} />
          <div
            className={cn(
              "grid gap-4 sm:grid-cols-2",
              step === "exhibition-contact" ? "" : "hidden",
            )}
          >
              <TextField label="First Name" name="firstName" required state={state} />
              <TextField label="Last Name" name="lastName" required state={state} />
              <TextField
                label="Email Address"
                name="email"
                required
                state={state}
                type="email"
              />
              <TextField label="Phone Number" name="phone" required state={state} />
              <TextField
                label="Business or Organisation Name"
                name="businessName"
                required
                state={state}
              />
              <SelectField
                label="Country of Operation"
                name="country"
                options={eventCountryOptions}
                required
                state={state}
              />
              <TextField
                className="sm:col-span-2"
                label="Website or Social Media Link"
                name="websiteOrSocial"
                state={state}
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
                  options={industryOptions}
                  required
                  state={state}
                />
                <SelectField
                  label="Booth Type"
                  name="boothType"
                  options={boothTypeOptions}
                  required
                  state={state}
                />
                <SelectField
                  label="Have you exhibited at a similar event before?"
                  name="exhibitedBefore"
                  options={yesNoOptions}
                  required
                  state={state}
                />
                <SelectField
                  label="How did you hear about the PAWEN Exhibition?"
                  name="discoverySource"
                  options={discoveryOptions}
                  state={state}
                />
              </div>
              <TextareaField
                label="Brief Description of Your Business"
                name="businessDescription"
                placeholder="Tell us what your business does."
                required
                state={state}
              />
              <TextareaField
                label="What do you hope to achieve by exhibiting at PAWEN?"
                name="exhibitionGoal"
                placeholder="Share your goals for visibility, sales, partnerships, or networking."
                required
                state={state}
              />
          </div>
          <FormActions
            isFirstStep={step === steps[0]}
            isLastStep={step === steps[steps.length - 1]}
            isSubmitting={isSubmitting}
            nextStep={nextStep}
            previousStep={previousStep}
            submitLabel="Submit Booth Request"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ApplyToSpeakDialog() {
  const [state, formAction, pending] = useActionState(
    submitApplyToSpeak,
    initialState,
  );
  const [isTransitionPending, startTransition] = useTransition();
  const { activeDialog, closeDialog, nextStep, previousStep, resetDialog, step } =
    useEventDialog();
  const steps = getEventDialogSteps("speaker");
  const isSubmitting = pending || isTransitionPending;
  const isOpen = activeDialog === "speaker";

  useStepErrorRouting(state, speakerErrorStepMap);

  useEffect(() => {
    if (state.status === "success") {
      resetDialog();
    }
  }, [resetDialog, state.status]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent
        className="h-fit max-h-[76vh] overflow-hidden rounded-lg bg-[#21002f] text-primary ring-0 sm:max-w-3xl"
        showCloseButton
      >
        <form
          className="scrollbar-hide flex max-h-[calc(76vh-2rem)] flex-col gap-5 overflow-x-hidden overflow-y-auto overscroll-contain p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          encType="multipart/form-data"
          key={state.resetKey ?? "apply-to-speak-form"}
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
          <StatusMessage state={state} />
          <div
            className={cn(
              "grid gap-4 sm:grid-cols-2",
              step === "speaker-details" ? "" : "hidden",
            )}
          >
              <TextField label="First Name" name="firstName" required state={state} />
              <TextField label="Last Name" name="lastName" required state={state} />
              <TextField
                label="Email Address"
                name="email"
                required
                state={state}
                type="email"
              />
              <TextField label="Phone Number" name="phone" required state={state} />
              <SelectField
                label="Country of Residence"
                name="country"
                options={eventCountryOptions}
                required
                state={state}
              />
              <SelectField
                label="Nationality"
                name="nationality"
                options={nationalityOptions}
                required
                state={state}
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
                  required
                  state={state}
                />
                <TextField
                  label="Job Title or Role"
                  name="role"
                  required
                  state={state}
                />
                <TextField
                  className="sm:col-span-2"
                  label="LinkedIn Profile URL"
                  name="linkedinUrl"
                  required
                  state={state}
                />
              </div>
              <TextareaField
                label="Professional Bio"
                name="professionalBio"
                placeholder="Share your professional background and areas of expertise."
                required
                state={state}
              />
              <FileField
                label="Headshot Photo"
                name="headshotFile"
                state={state}
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
                  required
                  state={state}
                />
                <SelectField
                  label="Session Topic Area"
                  name="sessionTopic"
                  options={sessionTopicOptions}
                  required
                  state={state}
                />
                <SelectField
                  label="Preferred Session Format"
                  name="sessionFormat"
                  options={sessionFormatOptions}
                  required
                  state={state}
                />
              </div>
              <TextareaField
                label="Session Abstract or Description"
                name="sessionAbstract"
                placeholder="Describe the session focus, audience, and key takeaways."
                required
                state={state}
              />
              <TextareaField
                label="Why are you the right speaker for this topic?"
                name="speakerFit"
                placeholder="Share your relevant experience, perspective, or evidence."
                required
                state={state}
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
                  options={yesNoOptions}
                  required
                  state={state}
                />
                <SelectField
                  label="Will you require accommodation support?"
                  name="accommodationSupport"
                  options={yesNoOptions}
                  required
                  state={state}
                />
                <SelectField
                  label="Do you require a visa to enter Zambia?"
                  name="visaRequirement"
                  options={visaOptions}
                  required
                  state={state}
                />
              </div>
              <TextareaField
                label="If yes, share links or details of previous speaking engagements"
                name="previousSpeakingDetails"
                placeholder="Paste links or summarize relevant previous sessions."
                state={state}
              />
              <ConfirmationGroup state={state} />
          </div>
          <FormActions
            isFirstStep={step === steps[0]}
            isLastStep={step === steps[steps.length - 1]}
            isSubmitting={isSubmitting}
            nextStep={nextStep}
            previousStep={previousStep}
            submitLabel="Submit Application"
          />
        </form>
      </DialogContent>
    </Dialog>
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
