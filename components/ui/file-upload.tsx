"use client";

import { useState } from "react";
import type { NominationFormState } from "@/app/nominations/actions";
import {
  errorClass,
  errorId,
  fieldError,
  labelClass,
} from "@/components/ui/form-field";

type FileUploadProps = {
  state: NominationFormState;
};

export function FileUpload({ state }: FileUploadProps) {
  const [fileName, setFileName] = useState("No file chosen");
  const error = fieldError(state, "supportingEvidence");

  return (
    <div className="flex flex-col gap-2">
      <span className={labelClass} id="supportingEvidence-label">
        Supporting evidence
      </span>
      <div
        aria-describedby={
          error ? errorId("supportingEvidence") : "supportingEvidence-help"
        }
        aria-labelledby="supportingEvidence-label"
        className="flex min-h-32 flex-col items-center justify-center gap-4 border border-premium-gold/25 bg-background/70 px-4 py-6 text-center text-sm text-muted-beige transition-colors duration-300 hover:border-champagne-gold"
      >
        <span className="font-medium text-champagne-gold">Upload a file</span>
        <span className="text-xs text-soft-gray" id="supportingEvidence-help">
          PDF, DOC, DOCX, JPG, PNG, or ZIP. Maximum 10MB.
        </span>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <label
            className="cursor-pointer bg-premium-gold px-4 py-2 text-sm font-medium text-background transition-colors duration-300 hover:bg-champagne-gold"
            htmlFor="supportingEvidence"
          >
            Choose file
          </label>
          <span className="max-w-sm break-words text-left text-xs text-soft-gray">
            {fileName}
          </span>
          <input
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
            aria-describedby={
              error ? errorId("supportingEvidence") : "supportingEvidence-help"
            }
            aria-invalid={error ? "true" : "false"}
            aria-labelledby="supportingEvidence-label"
            className="sr-only"
            id="supportingEvidence"
            name="supportingEvidence"
            onChange={(event) => {
              setFileName(
                event.currentTarget.files?.[0]?.name ?? "No file chosen",
              );
            }}
            type="file"
          />
        </div>
      </div>
      {error ? (
        <span className={errorClass} id={errorId("supportingEvidence")}>
          {error}
        </span>
      ) : (
        <span className="text-xs leading-5 text-soft-gray">
          Supporting documents help the judges see her work clearly. Quality
          matters more than quantity.
        </span>
      )}
    </div>
  );
}
