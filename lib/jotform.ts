import "server-only";

export type JotformNominationPayload = {
  category: string;
  nominatingFor: string;
  nominatorFirstName: string;
  nominatorLastName: string;
  nominatorEmail: string;
  nominatorPhone: string;
  relationship: string;
  nomineeFirstName: string;
  nomineeLastName: string;
  nomineeEmail: string;
  nomineePhone: string;
  country: string;
  roleOrganisation: string;
  linkedinUrl: string;
  socialUrl: string;
  website: string;
  whyDeserving: string;
  supportingEvidenceFile?: File;
  discoverySource: string;
  confirmations: string[];
};

const jotformConfig = {
  apiKey: process.env.JOTFORM_API_KEY,
  formId: process.env.JOTFORM_FORM_ID ?? "261237854446059",
};

const fieldMap = {
  category: "submission[25]",
  nominatingFor: "submission[30]",
  nominatorFirstName: "submission[17_first]",
  nominatorLastName: "submission[17_last]",
  nominatorEmail: "submission[18]",
  nominatorPhone: "submission[33]",
  relationship: "submission[19]",
  nomineeFirstName: "submission[7_first]",
  nomineeLastName: "submission[7_last]",
  nomineeEmail: "submission[8]",
  nomineePhone: "submission[34]",
  country: "submission[9]",
  roleOrganisation: "submission[10]",
  linkedinUrl: "submission[11]",
  socialUrl: "submission[26]",
  website: "submission[12]",
  whyDeserving: "submission[14]",
  discoverySource: "submission[21]",
} as const;

async function readJotformError(response: Response) {
  const text = await response.text();

  if (!text) {
    return "";
  }

  try {
    const data = JSON.parse(text) as {
      message?: string;
      content?: unknown;
      responseCode?: number;
    };

    return JSON.stringify({
      content: data.content,
      message: data.message,
      responseCode: data.responseCode,
    });
  } catch {
    return text;
  }
}

export async function submitJotformNomination(
  payload: JotformNominationPayload,
) {
  if (!jotformConfig.apiKey) {
    return {
      ok: false,
      setupMissing: true,
      message:
        "The nominations form is ready. Add JOTFORM_API_KEY to enable live submissions.",
    };
  }

  const body = new FormData();

  for (const [key, fieldName] of Object.entries(fieldMap)) {
    body.set(fieldName, payload[key as keyof typeof fieldMap]);
  }

  body.set("submission[22][]", payload.confirmations[0] ?? "");
  if (payload.confirmations[1]) {
    body.append("submission[22][]", payload.confirmations[1]);
  }

  if (payload.supportingEvidenceFile && payload.supportingEvidenceFile.size > 0) {
    body.append(
      "submission[15][]",
      payload.supportingEvidenceFile,
      payload.supportingEvidenceFile.name,
    );
  }

  const response = await fetch(
    `https://api.jotform.com/form/${jotformConfig.formId}/submissions?apiKey=${jotformConfig.apiKey}`,
    {
      method: "POST",
      body,
    },
  );

  if (!response.ok) {
    const errorDetails = await readJotformError(response);

    console.error("Jotform nomination submission failed", {
      formId: jotformConfig.formId,
      status: response.status,
      statusText: response.statusText,
      details: errorDetails,
    });

    return {
      ok: false,
      setupMissing: false,
      message:
        "We could not submit the nomination right now. Please try again shortly.",
    };
  }

  return {
    ok: true,
    setupMissing: false,
    message: "Nomination received. Thank you for helping us honour her work.",
  };
}
