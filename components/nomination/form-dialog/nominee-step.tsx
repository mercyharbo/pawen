"use client";

import type { NominationFormState } from "@/app/nominations/actions";
import { errorId, fieldError } from "@/components/nomination/form-dialog/field-errors";
import { StepProgress } from "@/components/nomination/form-dialog/step-progress";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNomination } from "@/lib/stores/nomination-dialog-store";
import { cn } from "@/lib/utils";

export function NomineeStep({
  countries,
  state,
}: {
  countries: string[];
  state: NominationFormState;
}) {
  const { country, nextStep, previousStep, setField } = useNomination();
  const firstNameError = fieldError(state, "nomineeFirstName");
  const lastNameError = fieldError(state, "nomineeLastName");
  const emailError = fieldError(state, "nomineeEmail");
  const phoneError = fieldError(state, "nomineePhone");
  const countryError = fieldError(state, "country");
  const roleError = fieldError(state, "roleOrganisation");
  const linkedinError = fieldError(state, "linkedinUrl");
  const socialError = fieldError(state, "socialUrl");
  const websiteError = fieldError(state, "website");

  return (
    <div className="flex flex-col gap-6">
      <StepProgress step="nominee" />
      <DialogTitle className="text-2xl font-semibold text-champagne-gold">
        Nominee Information
      </DialogTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-3" htmlFor="nomineeFirstName-dialog-field">
          <span className="text-sm font-semibold text-primary">First Name</span>
          <Input
            aria-describedby={firstNameError ? errorId("nomineeFirstName") : undefined}
            aria-invalid={firstNameError ? "true" : "false"}
            className={cn(
              "h-12 rounded-full border border-background bg-white px-6 text-base text-background placeholder:text-gray-400 focus-visible:ring-background/25 dark:bg-white",
              firstNameError ? "ring-3 ring-destructive/40" : "",
            )}
            id="nomineeFirstName-dialog-field"
            name="nomineeFirstName"
            placeholder="Enter First Name"
          />
          {firstNameError ? (
            <span className="text-xs text-destructive" id={errorId("nomineeFirstName")}>
              {firstNameError}
            </span>
          ) : null}
        </label>
        <label className="flex flex-col gap-3" htmlFor="nomineeLastName-dialog-field">
          <span className="text-sm font-semibold text-primary">Last Name</span>
          <Input
            aria-describedby={lastNameError ? errorId("nomineeLastName") : undefined}
            aria-invalid={lastNameError ? "true" : "false"}
            className={cn(
              "h-12 rounded-full border border-background bg-white px-6 text-base text-background placeholder:text-gray-400 focus-visible:ring-background/25 dark:bg-white",
              lastNameError ? "ring-3 ring-destructive/40" : "",
            )}
            id="nomineeLastName-dialog-field"
            name="nomineeLastName"
            placeholder="Enter Last Name"
          />
          {lastNameError ? (
            <span className="text-xs text-destructive" id={errorId("nomineeLastName")}>
              {lastNameError}
            </span>
          ) : null}
        </label>
        <label className="flex flex-col gap-3" htmlFor="nomineeEmail-dialog-field">
          <span className="text-sm font-semibold text-primary">Email Address</span>
          <Input
            aria-describedby={emailError ? errorId("nomineeEmail") : undefined}
            aria-invalid={emailError ? "true" : "false"}
            className={cn(
              "h-12 rounded-full border border-background bg-white px-6 text-base text-background placeholder:text-gray-400 focus-visible:ring-background/25 dark:bg-white",
              emailError ? "ring-3 ring-destructive/40" : "",
            )}
            id="nomineeEmail-dialog-field"
            name="nomineeEmail"
            placeholder="Enter Email"
            type="email"
          />
          {emailError ? (
            <span className="text-xs text-destructive" id={errorId("nomineeEmail")}>
              {emailError}
            </span>
          ) : null}
        </label>
        <label className="flex flex-col gap-3" htmlFor="nomineePhone-dialog-field">
          <span className="text-sm font-semibold text-primary">Phone / Whatsapp</span>
          <Input
            aria-describedby={phoneError ? errorId("nomineePhone") : undefined}
            aria-invalid={phoneError ? "true" : "false"}
            className={cn(
              "h-12 rounded-full border border-background bg-white px-6 text-base text-background placeholder:text-gray-400 focus-visible:ring-background/25 dark:bg-white",
              phoneError ? "ring-3 ring-destructive/40" : "",
            )}
            id="nomineePhone-dialog-field"
            name="nomineePhone"
            placeholder="Enter Phone"
          />
          {phoneError ? (
            <span className="text-xs text-destructive" id={errorId("nomineePhone")}>
              {phoneError}
            </span>
          ) : null}
        </label>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-primary" htmlFor="country-dialog-select">
            Country of Residence
          </label>
          <Select
            name="country"
            value={country || null}
            onValueChange={(value) => setField("country", value ?? "")}
          >
            <SelectTrigger
              aria-describedby={countryError ? errorId("country") : undefined}
              aria-invalid={countryError ? "true" : "false"}
              className={cn(
                "h-12 w-full rounded-full border border-background bg-white px-6 text-base text-background focus-visible:ring-background/25 [&_svg]:text-background",
                countryError ? "ring-3 ring-destructive/40" : "",
              )}
              id="country-dialog-select"
            >
              <SelectValue
                className={country ? "text-background" : "text-gray-400"}
                placeholder="Enter Country"
              />
            </SelectTrigger>
            <SelectContent className="scrollbar-hide bg-white text-background">
              <SelectGroup>
                {countries.map((option) => (
                  <SelectItem
                    className="text-background focus:bg-champagne-gold focus:text-background"
                    key={option}
                    value={option}
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {countryError ? (
            <span className="text-xs text-destructive" id={errorId("country")}>
              {countryError}
            </span>
          ) : null}
        </div>
        <label className="flex flex-col gap-3" htmlFor="roleOrganisation-dialog-field">
          <span className="text-sm font-semibold text-primary">Role and Organization</span>
          <Input
            aria-describedby={roleError ? errorId("roleOrganisation") : undefined}
            aria-invalid={roleError ? "true" : "false"}
            className={cn(
              "h-12 rounded-full border border-background bg-white px-6 text-base text-background placeholder:text-gray-400 focus-visible:ring-background/25 dark:bg-white",
              roleError ? "ring-3 ring-destructive/40" : "",
            )}
            id="roleOrganisation-dialog-field"
            name="roleOrganisation"
            placeholder="Enter Role"
          />
          {roleError ? (
            <span className="text-xs text-destructive" id={errorId("roleOrganisation")}>
              {roleError}
            </span>
          ) : null}
        </label>
        <label className="flex flex-col gap-3" htmlFor="linkedinUrl-dialog-field">
          <span className="text-sm font-semibold text-primary">Linkedin Profile URL</span>
          <Input
            aria-describedby={linkedinError ? errorId("linkedinUrl") : undefined}
            aria-invalid={linkedinError ? "true" : "false"}
            className={cn(
              "h-12 rounded-full border border-background bg-white px-6 text-base text-background placeholder:text-gray-400 focus-visible:ring-background/25 dark:bg-white",
              linkedinError ? "ring-3 ring-destructive/40" : "",
            )}
            id="linkedinUrl-dialog-field"
            name="linkedinUrl"
            placeholder="www.linkedin.com/in/name"
          />
          {linkedinError ? (
            <span className="text-xs text-destructive" id={errorId("linkedinUrl")}>
              {linkedinError}
            </span>
          ) : null}
        </label>
        <label className="flex flex-col gap-3" htmlFor="socialUrl-dialog-field">
          <span className="text-sm font-semibold text-primary">Instagram, Facebook, Tiktok, X</span>
          <Input
            aria-describedby={socialError ? errorId("socialUrl") : undefined}
            aria-invalid={socialError ? "true" : "false"}
            className={cn(
              "h-12 rounded-full border border-background bg-white px-6 text-base text-background placeholder:text-gray-400 focus-visible:ring-background/25 dark:bg-white",
              socialError ? "ring-3 ring-destructive/40" : "",
            )}
            id="socialUrl-dialog-field"
            name="socialUrl"
            placeholder="www.instagram.com/name"
          />
          {socialError ? (
            <span className="text-xs text-destructive" id={errorId("socialUrl")}>
              {socialError}
            </span>
          ) : null}
        </label>
        <div className="md:col-span-2">
          <label className="flex flex-col gap-3" htmlFor="website-dialog-field">
            <span className="text-sm font-semibold text-primary">Website</span>
            <Input
              aria-describedby={websiteError ? errorId("website") : undefined}
              aria-invalid={websiteError ? "true" : "false"}
              className={cn(
                "h-12 rounded-full border border-background bg-white px-6 text-base text-background placeholder:text-gray-400 focus-visible:ring-background/25 dark:bg-white",
                websiteError ? "ring-3 ring-destructive/40" : "",
              )}
              id="website-dialog-field"
              name="website"
              placeholder="www.example.com"
            />
            {websiteError ? (
              <span className="text-xs text-destructive" id={errorId("website")}>
                {websiteError}
              </span>
            ) : null}
          </label>
        </div>
      </div>
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          className="h-12 w-full rounded-full border border-primary bg-transparent px-10 text-primary hover:!scale-100 hover:bg-primary/10 active:!translate-y-0 active:!scale-100 sm:w-36"
          onClick={previousStep}
          type="button"
        >
          Back
        </Button>
        <Button
          className="h-12 w-full rounded-full bg-champagne-gold px-10 text-background hover:!scale-100 hover:bg-champagne-gold/90 active:!translate-y-0 active:!scale-100 sm:w-36"
          onClick={nextStep}
          type="button"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
