"use client";

import type { NominationFormState } from "@/app/nominations/actions";
import { errorId, fieldError } from "@/components/nomination/form-dialog/field-errors";
import { StepProgress } from "@/components/nomination/form-dialog/step-progress";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { confirmations, discoverySources } from "@/lib/nomination-form-data";
import { useNomination } from "@/lib/stores/nomination-dialog-store";
import { cn } from "@/lib/utils";

export function StoryStep({
  isSubmitting,
  state,
}: {
  isSubmitting: boolean;
  state: NominationFormState;
}) {
  const {
    confirmations: confirmationsValue,
    discoverySource,
    previousStep,
    setConfirmation,
    setField,
    supportingEvidenceName,
    whyDeserving,
  } = useNomination();
  const storyError = fieldError(state, "whyDeserving");
  const fileError = fieldError(state, "supportingEvidence");
  const discoverySourceError = fieldError(state, "discoverySource");
  const confirmationError = fieldError(state, "confirmations");

  return (
    <div className="flex flex-col gap-6">
      <StepProgress step="story" />
      <DialogTitle className="text-2xl font-semibold text-accent">
        Story and Evidence
      </DialogTitle>

      <label className="flex flex-col gap-2" htmlFor="whyDeserving-dialog-field">
        <span className="text-sm font-semibold text-primary">
          Why does she deserve this award? *
        </span>
        <Textarea
          aria-describedby={storyError ? errorId("whyDeserving") : "story-help"}
          aria-invalid={storyError ? "true" : "false"}
          className={cn(
            "min-h-28 resize-none rounded-[2rem] border border-background bg-white px-5 py-5 text-base text-background placeholder:text-gray-400 focus-visible:ring-background/25 dark:bg-white",
            storyError ? "ring-3 ring-destructive/40" : "",
          )}
          id="whyDeserving-dialog-field"
          name="whyDeserving"
          onChange={(event) =>
            setField("whyDeserving", event.currentTarget.value)
          }
          placeholder="Tell us story with specific achievements, leadership, impact, and evidence."
          value={whyDeserving}
        />
        {storyError ? (
          <span className="text-xs text-destructive" id={errorId("whyDeserving")}>
            {storyError}
          </span>
        ) : (
          <span className="text-xs leading-5 text-primary/70" id="story-help">
            Aim for 200-500 words. Specific examples and numbers carry more
            weight than general praise.
          </span>
        )}
      </label>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-primary">
          Supporting evidence
        </span>
        <div
          className={cn(
            "flex min-h-32 flex-col items-center justify-center gap-4 rounded-[2rem] border border-background bg-white px-5 py-6 text-center dark:bg-white",
            fileError ? "ring-3 ring-destructive/40" : "",
          )}
        >
          <span className="font-bold text-background">Upload a file</span>
          <span className="text-sm text-gray-400">
            PDF, DOC, DOCX, JPG, PNG, or ZIP. Maximum 10MB.
          </span>
          <label
            className="cursor-pointer rounded-full bg-accent px-7 py-3 text-xs font-bold text-background"
            htmlFor="supportingEvidence-dialog-field"
          >
            Choose file
          </label>
          <span className="max-w-full break-words text-xs text-gray-500">
            {supportingEvidenceName}
          </span>
          <input
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
            aria-describedby={
              fileError ? errorId("supportingEvidence") : undefined
            }
            aria-invalid={fileError ? "true" : "false"}
            className="sr-only"
            id="supportingEvidence-dialog-field"
            name="supportingEvidence"
            onChange={(event) =>
              setField(
                "supportingEvidenceName",
                event.currentTarget.files?.[0]?.name ?? "No file chosen",
              )
            }
            type="file"
          />
        </div>
        {fileError ? (
          <span
            className="text-xs text-destructive"
            id={errorId("supportingEvidence")}
          >
            {fileError}
          </span>
        ) : (
          <span className="text-xs leading-5 text-primary/70">
            Supporting documents help the judges see her work clearly. Quality
            matters more than quantity.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-semibold text-primary"
          htmlFor="discoverySource-dialog-select"
        >
          How did you hear about The PAWEN Awards? *
        </label>
        <Select
          name="discoverySource"
          value={discoverySource || null}
          onValueChange={(value) => setField("discoverySource", value ?? "")}
        >
          <SelectTrigger
            aria-describedby={
              discoverySourceError ? errorId("discoverySource") : undefined
            }
            aria-invalid={discoverySourceError ? "true" : "false"}
            className={cn(
              "h-12 w-full rounded-full border border-background bg-white px-6 text-base text-background focus-visible:ring-background/25 [&_svg]:text-background",
              discoverySourceError ? "ring-3 ring-destructive/40" : "",
            )}
            id="discoverySource-dialog-select"
          >
            <SelectValue
              className={discoverySource ? "text-background" : "text-gray-400"}
              placeholder="Select One"
            />
          </SelectTrigger>
          <SelectContent className="scrollbar-hide bg-white text-background">
            <SelectGroup>
              {discoverySources.map((option) => (
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
        {discoverySourceError ? (
          <span
            className="text-xs text-destructive"
            id={errorId("discoverySource")}
          >
            {discoverySourceError}
          </span>
        ) : null}
      </div>

      <fieldset
        aria-describedby={confirmationError ? errorId("confirmations") : undefined}
        className="flex flex-col gap-3"
      >
        {confirmations.map((confirmation) => {
          const checked = confirmationsValue.includes(confirmation);

          return (
            <label
              className="flex items-start gap-3 text-sm leading-6 text-primary"
              htmlFor={`dialog-${confirmation}`}
              key={confirmation}
            >
              <Checkbox
                aria-invalid={confirmationError ? "true" : "false"}
                checked={checked}
                className="size-5 rounded-[4px] border border-primary bg-white data-checked:bg-accent data-checked:text-background"
                id={`dialog-${confirmation}`}
                onCheckedChange={(nextChecked) =>
                  setConfirmation(confirmation, nextChecked)
                }
              />
              <span>{confirmation}</span>
              {checked ? (
                <input
                  name="confirmations"
                  type="hidden"
                  value={confirmation}
                />
              ) : null}
            </label>
          );
        })}
        {confirmationError ? (
          <span className="text-xs text-destructive" id={errorId("confirmations")}>
            {confirmationError}
          </span>
        ) : null}
      </fieldset>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          className="h-12 w-full rounded-full border border-primary bg-transparent px-10 text-primary hover:!scale-100 hover:bg-primary/10 active:!translate-y-0 active:!scale-100 sm:w-36"
          onClick={previousStep}
          type="button"
        >
          Back
        </Button>
        <Button
          className="h-12 w-full rounded-full bg-accent px-10 text-background hover:!scale-100 hover:bg-accent/90 active:!translate-y-0 active:!scale-100 disabled:bg-accent/70 sm:w-fit"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Submitting..." : "Submit Nomination"}
        </Button>
      </div>
    </div>
  );
}
