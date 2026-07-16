"use server";

import { submitJotformNomination } from "@/lib/jotform";
import { nominationSchema } from "@/lib/nomination-schema";

export type NominationFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
  resetKey?: string;
};

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalFile(formData: FormData, key: string) {
  const value = formData.get(key);
  return value instanceof File && value.size > 0 ? value : undefined;
}

function flattenErrors(errors: ReturnType<typeof nominationSchema.safeParse>) {
  if (errors.success) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(errors.error.flatten().fieldErrors).map(([key, value]) => {
      const field = key === "supportingEvidenceFile" ? "supportingEvidence" : key;

      return [field, value?.[0] ?? "This field is invalid."];
    }),
  );
}

export async function submitNomination(
  _previousState: NominationFormState,
  formData: FormData,
): Promise<NominationFormState> {
  const parsed = nominationSchema.safeParse({
    category: getString(formData, "category"),
    nominatingFor: getString(formData, "nominatingFor"),
    nominatorFirstName: getString(formData, "nominatorFirstName"),
    nominatorLastName: getString(formData, "nominatorLastName"),
    nominatorEmail: getString(formData, "nominatorEmail"),
    nominatorPhone: getString(formData, "nominatorPhone"),
    relationship: getString(formData, "relationship"),
    nomineeFirstName: getString(formData, "nomineeFirstName"),
    nomineeLastName: getString(formData, "nomineeLastName"),
    nomineeEmail: getString(formData, "nomineeEmail"),
    nomineePhone: getString(formData, "nomineePhone"),
    country: getString(formData, "country"),
    roleOrganisation: getString(formData, "roleOrganisation"),
    linkedinUrl: getString(formData, "linkedinUrl"),
    socialUrl: getString(formData, "socialUrl"),
    website: getString(formData, "website"),
    whyDeserving: getString(formData, "whyDeserving"),
    discoverySource: getString(formData, "discoverySource"),
    confirmations: formData
      .getAll("confirmations")
      .filter((value): value is string => typeof value === "string"),
    supportingEvidenceFile: getOptionalFile(formData, "supportingEvidence"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors: flattenErrors(parsed),
    };
  }

  const result = await submitJotformNomination(parsed.data);

  return {
    status: result.ok ? "success" : "error",
    message: result.message,
    resetKey: result.ok ? crypto.randomUUID() : undefined,
  };
}
