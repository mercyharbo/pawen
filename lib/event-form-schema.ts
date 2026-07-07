import { z } from "zod";
import { speakerConfirmations } from "@/lib/event-form-data";

const requiredText = z.string().trim().min(1, "This field is required.");
const optionalText = z.string().trim();
const requiredEmail = requiredText.email("Enter a valid email address.");

const dateString = requiredText.refine(
  (value) => !Number.isNaN(new Date(`${value}T00:00:00`).getTime()),
  "Enter a valid date.",
);

export const summitRegistrationSchema = z.object({
  firstName: requiredText,
  lastName: requiredText,
  dateOfBirth: dateString,
  email: requiredEmail,
  phone: requiredText,
  country: requiredText,
  organisation: optionalText,
  role: optionalText,
  visaRequirement: requiredText,
  dietaryRestrictions: optionalText,
  accessibilityRequirements: optionalText,
  discoverySource: optionalText,
});

export const exhibitionBoothSchema = z.object({
  firstName: requiredText,
  lastName: requiredText,
  email: requiredEmail,
  phone: requiredText,
  businessName: requiredText,
  country: requiredText,
  websiteOrSocial: optionalText,
  industry: requiredText,
  businessDescription: requiredText.max(
    1500,
    "Keep the business description concise.",
  ),
  boothType: requiredText,
  exhibitedBefore: requiredText,
  exhibitionGoal: requiredText.max(1200, "Keep the exhibition goal concise."),
  discoverySource: optionalText,
});

export const applyToSpeakSchema = z.object({
  firstName: requiredText,
  lastName: requiredText,
  email: requiredEmail,
  phone: requiredText,
  country: requiredText,
  nationality: requiredText,
  organisation: requiredText,
  role: requiredText,
  professionalBio: requiredText,
  linkedinUrl: requiredText,
  headshotFile: z
    .custom<File | undefined>(
      (file) => file === undefined || file instanceof File,
      "Upload a valid file.",
    )
    .refine((file) => file && file.size > 0, "Upload your headshot photo.")
    .refine(
      (file) => !file || file.size <= 10 * 1024 * 1024,
      "Headshot photo must be 10MB or smaller.",
    ),
  sessionTitle: requiredText,
  sessionTopic: requiredText,
  sessionFormat: requiredText,
  sessionAbstract: requiredText,
  speakerFit: requiredText,
  spokenBefore: requiredText,
  previousSpeakingDetails: optionalText,
  accommodationSupport: requiredText,
  visaRequirement: requiredText,
  confirmations: z
    .array(z.string())
    .refine(
      (values) =>
        Object.values(speakerConfirmations).every((confirmation) =>
          values.includes(confirmation),
        ),
      "Please accept all confirmations.",
    ),
});

export type SummitRegistrationPayload = z.infer<
  typeof summitRegistrationSchema
>;
export type ExhibitionBoothPayload = z.infer<typeof exhibitionBoothSchema>;
export type ApplyToSpeakPayload = z.infer<typeof applyToSpeakSchema>;
