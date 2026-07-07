"use server";

import {
  applyToSpeakSchema,
  exhibitionBoothSchema,
  summitRegistrationSchema,
} from "@/lib/event-form-schema";

export type EventFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
  resetKey?: string;
};

type SubmitJotformOptions = {
  fieldValues: Record<string, string>;
  files?: Array<{
    fieldName: string;
    file: File;
  }>;
  formId: string;
  successMessage: string;
};

const jotformApiKey = process.env.JOTFORM_API_KEY;

function getString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function getOptionalFile(formData: FormData, key: string) {
  const value = formData.get(key);

  return value instanceof File && value.size > 0 ? value : undefined;
}

function flattenErrors(error: zodFlattenable) {
  return Object.fromEntries(
    Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
      key,
      value?.[0] ?? "This field is invalid.",
    ]),
  );
}

type zodFlattenable = {
  flatten: () => {
    fieldErrors: Record<string, string[] | undefined>;
  };
};

function splitDate(value: string) {
  const [year = "", month = "", day = ""] = value.split("-");

  return { day, month, year };
}

async function readJotformError(response: Response) {
  const text = await response.text();

  if (!text) {
    return "";
  }

  try {
    const data = JSON.parse(text) as {
      content?: unknown;
      message?: string;
      responseCode?: number;
    };

    return JSON.stringify({
      content: data.content,
      message: data.message,
      responseCode: data.responseCode,
    });
  } catch {
    return text.slice(0, 500);
  }
}

async function submitJotform({
  fieldValues,
  files = [],
  formId,
  successMessage,
}: SubmitJotformOptions): Promise<EventFormState> {
  if (!jotformApiKey) {
    return {
      status: "error",
      message:
        "This form is ready. Add JOTFORM_API_KEY to enable live submissions.",
    };
  }

  const body = new FormData();

  for (const [fieldName, value] of Object.entries(fieldValues)) {
    if (value) {
      body.append(fieldName, value);
    }
  }

  for (const item of files) {
    body.append(item.fieldName, item.file, item.file.name);
  }

  try {
    const response = await fetch(
      `https://api.jotform.com/form/${formId}/submissions?apiKey=${jotformApiKey}`,
      {
        method: "POST",
        body,
      },
    );

    if (!response.ok) {
      const details = await readJotformError(response);

      console.error("Jotform event submission failed", {
        details,
        formId,
        status: response.status,
        statusText: response.statusText,
      });

      return {
        status: "error",
        message: "We could not submit the form right now. Please try again.",
      };
    }

    return {
      status: "success",
      message: successMessage,
      resetKey: crypto.randomUUID(),
    };
  } catch (error) {
    console.error("Jotform event submission request failed", {
      error,
      formId,
    });

    return {
      status: "error",
      message: "We could not submit the form right now. Please try again.",
    };
  }
}

export async function submitSummitRegistration(
  _previousState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const parsed = summitRegistrationSchema.safeParse({
    firstName: getString(formData, "firstName"),
    lastName: getString(formData, "lastName"),
    dateOfBirth: getString(formData, "dateOfBirth"),
    email: getString(formData, "email"),
    phone: getString(formData, "phone"),
    country: getString(formData, "country"),
    organisation: getString(formData, "organisation"),
    role: getString(formData, "role"),
    visaRequirement: getString(formData, "visaRequirement"),
    dietaryRestrictions: getString(formData, "dietaryRestrictions"),
    accessibilityRequirements: getString(formData, "accessibilityRequirements"),
    discoverySource: getString(formData, "discoverySource"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors: flattenErrors(parsed.error),
    };
  }

  const birthDate = splitDate(parsed.data.dateOfBirth);

  return submitJotform({
    formId: "261856147280057",
    successMessage: "Registration received. Thank you for joining the summit.",
    fieldValues: {
      "submission[2_first]": parsed.data.firstName,
      "submission[2_last]": parsed.data.lastName,
      "submission[3_month]": birthDate.month,
      "submission[3_day]": birthDate.day,
      "submission[3_year]": birthDate.year,
      "submission[4]": parsed.data.email,
      "submission[5_full]": parsed.data.phone,
      "submission[6]": parsed.data.country,
      "submission[7]": parsed.data.organisation,
      "submission[8]": parsed.data.role,
      "submission[9]": parsed.data.visaRequirement,
      "submission[10]": parsed.data.dietaryRestrictions,
      "submission[11]": parsed.data.accessibilityRequirements,
      "submission[12]": parsed.data.discoverySource,
    },
  });
}

export async function submitExhibitionBooth(
  _previousState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const parsed = exhibitionBoothSchema.safeParse({
    firstName: getString(formData, "firstName"),
    lastName: getString(formData, "lastName"),
    email: getString(formData, "email"),
    phone: getString(formData, "phone"),
    businessName: getString(formData, "businessName"),
    country: getString(formData, "country"),
    websiteOrSocial: getString(formData, "websiteOrSocial"),
    industry: getString(formData, "industry"),
    businessDescription: getString(formData, "businessDescription"),
    boothType: getString(formData, "boothType"),
    exhibitedBefore: getString(formData, "exhibitedBefore"),
    exhibitionGoal: getString(formData, "exhibitionGoal"),
    discoverySource: getString(formData, "discoverySource"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors: flattenErrors(parsed.error),
    };
  }

  return submitJotform({
    formId: "261857762803062",
    successMessage:
      "Booth request received. The PAWEN team will follow up shortly.",
    fieldValues: {
      "submission[2_first]": parsed.data.firstName,
      "submission[2_last]": parsed.data.lastName,
      "submission[3]": parsed.data.email,
      "submission[4_full]": parsed.data.phone,
      "submission[5]": parsed.data.businessName,
      "submission[6]": parsed.data.country,
      "submission[7]": parsed.data.websiteOrSocial,
      "submission[8]": parsed.data.industry,
      "submission[9]": parsed.data.businessDescription,
      "submission[11]": parsed.data.boothType,
      "submission[12]": parsed.data.exhibitedBefore,
      "submission[13]": parsed.data.exhibitionGoal,
      "submission[14]": parsed.data.discoverySource,
    },
  });
}

export async function submitApplyToSpeak(
  _previousState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const parsed = applyToSpeakSchema.safeParse({
    firstName: getString(formData, "firstName"),
    lastName: getString(formData, "lastName"),
    email: getString(formData, "email"),
    phone: getString(formData, "phone"),
    country: getString(formData, "country"),
    nationality: getString(formData, "nationality"),
    organisation: getString(formData, "organisation"),
    role: getString(formData, "role"),
    professionalBio: getString(formData, "professionalBio"),
    linkedinUrl: getString(formData, "linkedinUrl"),
    headshotFile: getOptionalFile(formData, "headshotFile"),
    sessionTitle: getString(formData, "sessionTitle"),
    sessionTopic: getString(formData, "sessionTopic"),
    sessionFormat: getString(formData, "sessionFormat"),
    sessionAbstract: getString(formData, "sessionAbstract"),
    speakerFit: getString(formData, "speakerFit"),
    spokenBefore: getString(formData, "spokenBefore"),
    previousSpeakingDetails: getString(formData, "previousSpeakingDetails"),
    accommodationSupport: getString(formData, "accommodationSupport"),
    visaRequirement: getString(formData, "visaRequirement"),
    confirmations: formData
      .getAll("confirmations")
      .filter((value): value is string => typeof value === "string"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors: flattenErrors(parsed.error),
    };
  }

  const headshotFile = parsed.data.headshotFile;

  if (!headshotFile) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors: {
        headshotFile: "Upload your headshot photo.",
      },
    };
  }

  return submitJotform({
    formId: "261856835417063",
    successMessage:
      "Speaker application received. Thank you for sharing your proposal.",
    fieldValues: {
      "submission[3_first]": parsed.data.firstName,
      "submission[3_last]": parsed.data.lastName,
      "submission[4]": parsed.data.email,
      "submission[5_full]": parsed.data.phone,
      "submission[6]": parsed.data.country,
      "submission[7]": parsed.data.nationality,
      "submission[8]": parsed.data.organisation,
      "submission[9]": parsed.data.role,
      "submission[10]": parsed.data.professionalBio,
      "submission[11]": parsed.data.linkedinUrl,
      "submission[14]": parsed.data.sessionTitle,
      "submission[15]": parsed.data.sessionTopic,
      "submission[16]": parsed.data.sessionFormat,
      "submission[17]": parsed.data.sessionAbstract,
      "submission[18]": parsed.data.speakerFit,
      "submission[20]": parsed.data.spokenBefore,
      "submission[21]": parsed.data.previousSpeakingDetails,
      "submission[24]": parsed.data.accommodationSupport,
      "submission[25]": parsed.data.visaRequirement,
      "submission[27][]": parsed.data.confirmations[0] ?? "",
      "submission[28][]": parsed.data.confirmations[1] ?? "",
      "submission[29][]": parsed.data.confirmations[2] ?? "",
    },
    files: [
      {
        fieldName: "submission[13][]",
        file: headshotFile,
      },
    ],
  });
}
