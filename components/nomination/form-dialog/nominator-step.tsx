"use client";

import type { NominationFormState } from "@/app/nominations/actions";
import { fieldError, errorId } from "@/components/nomination/form-dialog/field-errors";
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
import { relationships } from "@/lib/nomination-form-data";
import { useNomination } from "@/lib/stores/nomination-dialog-store";
import { cn } from "@/lib/utils";

export function NominatorStep({ state }: { state: NominationFormState }) {
  const { nextStep, previousStep, relationship, setField } = useNomination();
  const firstNameError = fieldError(state, "nominatorFirstName");
  const lastNameError = fieldError(state, "nominatorLastName");
  const emailError = fieldError(state, "nominatorEmail");
  const phoneError = fieldError(state, "nominatorPhone");
  const relationshipError = fieldError(state, "relationship");

  return (
    <div className="flex flex-col gap-7">
      <StepProgress step="nominator" />
      <DialogTitle className="text-2xl font-semibold text-accent">
        Nominator Details
      </DialogTitle>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-3" htmlFor="nominatorFirstName-dialog-field">
          <span className="text-sm font-semibold text-primary">First Name</span>
          <Input
            aria-describedby={firstNameError ? errorId("nominatorFirstName") : undefined}
            aria-invalid={firstNameError ? "true" : "false"}
            className={cn(
              "h-12 rounded-full border border-background bg-white px-6 text-base text-background placeholder:text-gray-400 focus-visible:ring-background/25 dark:bg-white",
              firstNameError ? "ring-3 ring-destructive/40" : "",
            )}
            id="nominatorFirstName-dialog-field"
            name="nominatorFirstName"
            placeholder="Enter First Name"
          />
          {firstNameError ? (
            <span className="text-xs text-destructive" id={errorId("nominatorFirstName")}>
              {firstNameError}
            </span>
          ) : null}
        </label>
        <label className="flex flex-col gap-3" htmlFor="nominatorLastName-dialog-field">
          <span className="text-sm font-semibold text-primary">Last Name</span>
          <Input
            aria-describedby={lastNameError ? errorId("nominatorLastName") : undefined}
            aria-invalid={lastNameError ? "true" : "false"}
            className={cn(
              "h-12 rounded-full border border-background bg-white px-6 text-base text-background placeholder:text-gray-400 focus-visible:ring-background/25 dark:bg-white",
              lastNameError ? "ring-3 ring-destructive/40" : "",
            )}
            id="nominatorLastName-dialog-field"
            name="nominatorLastName"
            placeholder="Enter Last Name"
          />
          {lastNameError ? (
            <span className="text-xs text-destructive" id={errorId("nominatorLastName")}>
              {lastNameError}
            </span>
          ) : null}
        </label>
        <label className="flex flex-col gap-3" htmlFor="nominatorEmail-dialog-field">
          <span className="text-sm font-semibold text-primary">Email Address</span>
          <Input
            aria-describedby={emailError ? errorId("nominatorEmail") : undefined}
            aria-invalid={emailError ? "true" : "false"}
            className={cn(
              "h-12 rounded-full border border-background bg-white px-6 text-base text-background placeholder:text-gray-400 focus-visible:ring-background/25 dark:bg-white",
              emailError ? "ring-3 ring-destructive/40" : "",
            )}
            id="nominatorEmail-dialog-field"
            name="nominatorEmail"
            placeholder="Enter Email"
            type="email"
          />
          {emailError ? (
            <span className="text-xs text-destructive" id={errorId("nominatorEmail")}>
              {emailError}
            </span>
          ) : null}
        </label>
        <label className="flex flex-col gap-3" htmlFor="nominatorPhone-dialog-field">
          <span className="text-sm font-semibold text-primary">Phone / Whatsapp</span>
          <Input
            aria-describedby={phoneError ? errorId("nominatorPhone") : undefined}
            aria-invalid={phoneError ? "true" : "false"}
            className={cn(
              "h-12 rounded-full border border-background bg-white px-6 text-base text-background placeholder:text-gray-400 focus-visible:ring-background/25 dark:bg-white",
              phoneError ? "ring-3 ring-destructive/40" : "",
            )}
            id="nominatorPhone-dialog-field"
            name="nominatorPhone"
            placeholder="Enter Phone"
          />
          {phoneError ? (
            <span className="text-xs text-destructive" id={errorId("nominatorPhone")}>
              {phoneError}
            </span>
          ) : null}
        </label>
        <div className="md:col-span-2">
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-semibold text-primary"
              htmlFor="relationship-dialog-select"
            >
              Relationship to Nominee
            </label>
            <Select
              name="relationship"
              value={relationship || null}
              onValueChange={(value) => setField("relationship", value ?? "")}
            >
              <SelectTrigger
                aria-describedby={relationshipError ? errorId("relationship") : undefined}
                aria-invalid={relationshipError ? "true" : "false"}
                className={cn(
                  "h-12 w-full rounded-full border border-background bg-white px-6 text-base text-background focus-visible:ring-background/25 [&_svg]:text-background",
                  relationshipError ? "ring-3 ring-destructive/40" : "",
                )}
                id="relationship-dialog-select"
              >
                <SelectValue
                  className={relationship ? "text-background" : "text-gray-400"}
                  placeholder="Select Relationship"
                />
              </SelectTrigger>
              <SelectContent className="scrollbar-hide bg-white text-background">
                <SelectGroup>
                  {relationships.map((option) => (
                    <SelectItem
                      className="text-background focus:bg-accent focus:text-background"
                      key={option}
                      value={option}
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {relationshipError ? (
              <span className="text-xs text-destructive" id={errorId("relationship")}>
                {relationshipError}
              </span>
            ) : null}
          </div>
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
          className="h-12 w-full rounded-full bg-accent px-10 text-background hover:!scale-100 hover:bg-accent/90 active:!translate-y-0 active:!scale-100 sm:w-36"
          onClick={nextStep}
          type="button"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
