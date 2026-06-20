import type { ReactNode } from "react";
import type { NominationFormState } from "@/app/nominations/actions";

export const inputClass =
  "w-full border border-premium-gold/20 bg-background/70 px-4 py-3 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-soft-gray focus:border-champagne-gold";

export const labelClass = "text-sm font-medium text-muted-beige";
export const errorClass = "text-xs text-red-500";

export function fieldError(state: NominationFormState, name: string) {
  return state.fieldErrors?.[name];
}

export function errorId(name: string) {
  return `${name}-error`;
}

export function RequiredLabel({
  children,
  required = true,
}: {
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <span className={labelClass}>
      {children}
      {required ? (
        <>
          <span aria-hidden="true" className="text-red-500">
            {" "}
            *
          </span>
          <span className="sr-only"> required</span>
        </>
      ) : null}
    </span>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  state: NominationFormState;
};

export function Field({
  label,
  name,
  type = "text",
  required = true,
  placeholder,
  state,
}: FieldProps) {
  const error = fieldError(state, name);
  const id = `${name}-field`;
  const describedBy = error ? errorId(name) : undefined;

  return (
    <label className="flex flex-col gap-2" htmlFor={id}>
      <RequiredLabel required={required}>{label}</RequiredLabel>
      <input
        aria-describedby={describedBy}
        aria-invalid={error ? "true" : "false"}
        className={`${inputClass} ${error ? "border-red-500 focus:border-red-500" : ""}`}
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
      />
      {error ? (
        <span className={errorClass} id={errorId(name)}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
