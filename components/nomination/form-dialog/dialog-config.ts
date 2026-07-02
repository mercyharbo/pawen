import type { NominationFormState } from "@/app/nominations/actions";
import type { NominationDialogStep } from "@/lib/stores/nomination-dialog-store";

export const initialState: NominationFormState = {
  status: "idle",
  message: "",
};

export const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to load countries.");
  }

  return (await response.json()) as { countries: string[] };
};

export const stepItems: {
  key: Exclude<NominationDialogStep, "intro">;
  label: string;
}[] = [
  { key: "nominator", label: "Nominator Details" },
  { key: "nominee", label: "Nominee Info" },
  { key: "story", label: "Story" },
];

export const errorStepMap: Record<string, NominationDialogStep> = {
  category: "intro",
  nominatingFor: "intro",
  nominatorFirstName: "nominator",
  nominatorLastName: "nominator",
  nominatorEmail: "nominator",
  nominatorPhone: "nominator",
  relationship: "nominator",
  nomineeFirstName: "nominee",
  nomineeLastName: "nominee",
  nomineeEmail: "nominee",
  nomineePhone: "nominee",
  country: "nominee",
  roleOrganisation: "nominee",
  linkedinUrl: "nominee",
  socialUrl: "nominee",
  website: "nominee",
  whyDeserving: "story",
  supportingEvidence: "story",
  discoverySource: "story",
  confirmations: "story",
};
