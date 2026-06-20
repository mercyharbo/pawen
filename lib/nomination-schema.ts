import { z } from "zod";
import { confirmations } from "@/lib/nomination-form-data";

const requiredText = z.string().trim().min(1, "This field is required.");
const requiredEmail = requiredText.email("Enter a valid email address.");

export const nominationSchema = z.object({
  category: requiredText,
  nominatingFor: requiredText,
  nominatorFirstName: requiredText,
  nominatorLastName: requiredText,
  nominatorEmail: requiredEmail,
  nominatorPhone: requiredText,
  relationship: requiredText,
  nomineeFirstName: requiredText,
  nomineeLastName: requiredText,
  nomineeEmail: requiredEmail,
  nomineePhone: requiredText,
  country: requiredText,
  roleOrganisation: requiredText,
  linkedinUrl: requiredText,
  socialUrl: requiredText,
  website: z.string().trim(),
  whyDeserving: requiredText,
  discoverySource: requiredText,
  confirmations: z
    .array(z.string())
    .length(confirmations.length, "Please accept both confirmations."),
  supportingEvidenceFile: z
    .custom<File | undefined>(
      (file) => file === undefined || file instanceof File,
      "Upload a valid file.",
    )
    .refine(
      (file) => !file || file.size <= 10 * 1024 * 1024,
      "Supporting evidence must be 10MB or smaller.",
    ),
});

export type NominationPayload = z.infer<typeof nominationSchema>;
