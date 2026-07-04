"use server";

import { z } from "zod";

export type NewsletterFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
  resetKey?: string;
};

const newsletterSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name."),
  lastName: z.string().trim().min(1, "Enter your last name."),
  email: z.string().trim().email("Enter a valid email address."),
});

const newsletterFormId = "261843554997070";
const newsletterSubmitUrl = `https://submit.jotform.com/submit/${newsletterFormId}`;

function getString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function flattenErrors(errors: ReturnType<typeof newsletterSchema.safeParse>) {
  if (errors.success) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(errors.error.flatten().fieldErrors).map(([key, value]) => [
      key,
      value?.[0] ?? "This field is invalid.",
    ]),
  );
}

async function readJotformError(response: Response) {
  const text = await response.text();

  return text.slice(0, 500);
}

export async function submitNewsletterSignup(
  _previousState: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  const parsed = newsletterSchema.safeParse({
    firstName: getString(formData, "firstName"),
    lastName: getString(formData, "lastName"),
    email: getString(formData, "email"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      fieldErrors: flattenErrors(parsed),
    };
  }

  const body = new FormData();

  body.set("formID", newsletterFormId);
  body.set("q2_q2_fullname0[first]", parsed.data.firstName);
  body.set("q2_q2_fullname0[last]", parsed.data.lastName);
  body.set("q3_q3_email1", parsed.data.email);
  body.set("website", "");
  body.set("simple_spc", `${newsletterFormId}-${newsletterFormId}`);
  body.set("submitSource", "website");

  try {
    const response = await fetch(newsletterSubmitUrl, {
      method: "POST",
      body,
    });

    if (!response.ok) {
      const details = await readJotformError(response);

      console.error("Jotform newsletter submission failed", {
        formId: newsletterFormId,
        status: response.status,
        statusText: response.statusText,
        details,
      });

      return {
        status: "error",
        message:
          "We could not subscribe you right now. Please try again shortly.",
      };
    }

    return {
      status: "success",
      message: "You are subscribed. Thank you for joining the PAWEN community.",
      resetKey: crypto.randomUUID(),
    };
  } catch (error) {
    console.error("Jotform newsletter submission request failed", {
      formId: newsletterFormId,
      error,
    });

    return {
      status: "error",
      message: "We could not subscribe you right now. Please try again shortly.",
    };
  }
}
