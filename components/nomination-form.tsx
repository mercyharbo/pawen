"use client";

import { motion } from "framer-motion";
import { useActionState, useTransition } from "react";
import useSWR from "swr";
import {
  type NominationFormState,
  submitNomination,
} from "@/app/nominations/actions";
import { CustomSelect } from "@/components/ui/custom-select";
import {
  Field,
  RequiredLabel,
  errorClass,
  errorId,
  fieldError,
  inputClass,
} from "@/components/ui/form-field";
import { FileUpload } from "@/components/ui/file-upload";
import { RadioGroup } from "@/components/ui/radio-group";
import {
  categoryGroups,
  confirmations,
  discoverySources,
  fallbackAfricanCountries,
  nominationTargets,
  relationships,
} from "@/lib/nomination-form-data";

const initialState: NominationFormState = {
  status: "idle",
  message: "",
};

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to load countries.");
  }

  return (await response.json()) as { countries: string[] };
};

function CategoryField({ state }: { state: NominationFormState }) {
  return (
    <CustomSelect
      label="Which category are you nominating for?"
      name="category"
      options={categoryGroups}
      state={state}
    />
  );
}

export function NominationForm() {
  const [state, formAction, pending] = useActionState(
    submitNomination,
    initialState,
  );
  const [isTransitionPending, startTransition] = useTransition();
  const isSubmitting = pending || isTransitionPending;
  const { data } = useSWR("/api/countries", fetcher, {
    fallbackData: { countries: fallbackAfricanCountries },
  });
  const countries = data?.countries ?? fallbackAfricanCountries;

  return (
    <motion.form
      className="grid gap-10"
      encType="multipart/form-data"
      initial={{ opacity: 0, y: 28 }}
      key={state.resetKey ?? "nomination-form"}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        startTransition(() => {
          formAction(formData);
        });
      }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <section className="grid gap-6 border border-premium-gold/20 bg-background/80 p-5 sm:p-8">
        <div className="grid gap-5">
          <CategoryField state={state} />
          <RadioGroup
            label="Are you nominating yourself or someone else?"
            name="nominatingFor"
            options={nominationTargets}
            state={state}
          />
        </div>
      </section>

      <section className="grid gap-6 border border-premium-gold/20 bg-soft-black/70 p-5 sm:p-8">
        <div className="grid gap-2">
          <p className="text-sm text-champagne-gold">Step 01</p>
          <h2 className="font-serif text-3xl text-foreground">
            Nominator details
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="First name" name="nominatorFirstName" state={state} />
          <Field label="Last name" name="nominatorLastName" state={state} />
          <Field
            label="Email address"
            name="nominatorEmail"
            type="email"
            state={state}
          />
          <Field label="Phone / WhatsApp" name="nominatorPhone" state={state} />
          <CustomSelect
            label="Relationship to nominee"
            name="relationship"
            options={relationships}
            state={state}
          />
        </div>
      </section>

      <section className="grid gap-6 border border-premium-gold/20 bg-background/80 p-5 sm:p-8">
        <div className="grid gap-2">
          <p className="text-sm text-champagne-gold">Step 02</p>
          <h2 className="font-serif text-3xl text-foreground">
            Nominee information
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="First name" name="nomineeFirstName" state={state} />
          <Field label="Last name" name="nomineeLastName" state={state} />
          <Field
            label="Email address"
            name="nomineeEmail"
            type="email"
            state={state}
          />
          <Field label="Phone number" name="nomineePhone" state={state} />
          <CustomSelect
            label="Country of residence"
            name="country"
            options={countries}
            state={state}
          />
          <Field
            label="Role and organisation"
            name="roleOrganisation"
            state={state}
          />
          <Field
            label="LinkedIn profile URL"
            name="linkedinUrl"
            placeholder="www.linkedin.com/in/name"
            state={state}
          />
          <Field
            label="Instagram, Facebook, TikTok or X URL"
            name="socialUrl"
            placeholder="www.instagram.com/name"
            state={state}
          />
          <Field
            label="Website"
            name="website"
            required={false}
            placeholder="www.example.com"
            state={state}
          />
        </div>
      </section>

      <section className="grid gap-6 border border-premium-gold/20 bg-soft-black/70 p-5 sm:p-8">
        <div className="grid gap-2">
          <p className="text-sm text-champagne-gold">Step 03</p>
          <h2 className="font-serif text-3xl text-foreground">
            Story and evidence
          </h2>
        </div>
        <label className="flex flex-col gap-2" htmlFor="whyDeserving-field">
          <RequiredLabel>Why does she deserve this award?</RequiredLabel>
          <textarea
            aria-describedby={
              fieldError(state, "whyDeserving")
                ? errorId("whyDeserving")
                : "whyDeserving-help"
            }
            aria-invalid={fieldError(state, "whyDeserving") ? "true" : "false"}
            className={`${inputClass} min-h-48 resize-y ${
              fieldError(state, "whyDeserving")
                ? "border-red-500 focus:border-red-500"
                : ""
            }`}
            id="whyDeserving-field"
            name="whyDeserving"
            placeholder="Tell us her story with specific achievements, leadership, impact, and evidence."
          />
          {fieldError(state, "whyDeserving") ? (
            <span className={errorClass} id={errorId("whyDeserving")}>
              {fieldError(state, "whyDeserving")}
            </span>
          ) : (
            <span className="text-xs leading-5 text-soft-gray" id="whyDeserving-help">
              Aim for 200-500 words. Specific examples and numbers carry more
              weight than general praise.
            </span>
          )}
        </label>
        <FileUpload state={state} />
        <CustomSelect
          label="How did you hear about The PAWEN Awards?"
          name="discoverySource"
          options={discoverySources}
          state={state}
        />
      </section>

      <section className="flex flex-col gap-3 border border-premium-gold/20 bg-background/80 p-5 sm:p-8">
        <fieldset
          aria-describedby={
            fieldError(state, "confirmations")
              ? errorId("confirmations")
              : undefined
          }
          className="flex flex-col gap-3"
        >
          <legend className="pb-3">
            <RequiredLabel>Confirmations</RequiredLabel>
          </legend>
          {confirmations.map((confirmation, index) => {
            const id = `confirmation-${index}`;

            return (
            <label
              htmlFor={id}
              key={confirmation}
              className="flex items-start gap-3 text-sm leading-6 text-muted-beige"
            >
              <input
                aria-invalid={
                  fieldError(state, "confirmations") ? "true" : "false"
                }
                className="size-4 shrink-0 accent-premium-gold"
                id={id}
                name="confirmations"
                type="checkbox"
                value={confirmation}
              />
              <span>{confirmation}</span>
            </label>
            );
          })}
        </fieldset>
        {fieldError(state, "confirmations") ? (
          <span className={errorClass} id={errorId("confirmations")}>
            {fieldError(state, "confirmations")}
          </span>
        ) : null}

        {state.message ? (
          <p
            className={`border px-4 py-3 text-sm ${
              state.status === "success"
                ? "border-premium-gold/40 text-champagne-gold"
                : "border-red-500/50 text-red-500"
            }`}
            aria-live="polite"
            role={state.status === "error" ? "alert" : "status"}
          >
            {state.message}
          </p>
        ) : null}

        <button
          className="bg-premium-gold px-6 py-3 text-sm font-semibold text-background transition-colors duration-300 hover:bg-champagne-gold disabled:cursor-not-allowed disabled:bg-dark-gold disabled:text-background/70"
          type="submit"
          disabled={isSubmitting}
          aria-label={
            isSubmitting ? "Submitting nomination" : "Submit nomination"
          }
        >
          {isSubmitting ? "Submitting..." : "Submit nomination"}
        </button>
      </section>
    </motion.form>
  );
}
