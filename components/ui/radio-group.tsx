import type { NominationFormState } from "@/app/nominations/actions";
import {
  errorClass,
  errorId,
  fieldError,
  RequiredLabel,
} from "@/components/ui/form-field";

type RadioGroupProps = {
  label: string;
  name: string;
  options: string[];
  state: NominationFormState;
};

export function RadioGroup({ label, name, options, state }: RadioGroupProps) {
  const error = fieldError(state, name);
  const describedBy = error ? errorId(name) : undefined;

  return (
    <fieldset
      aria-describedby={describedBy}
      aria-invalid={error ? "true" : "false"}
      className="space-y-4"
    >
      <legend>
        <RequiredLabel>{label}</RequiredLabel>
      </legend>
      <div className="grid gap-2">
        {options.map((option, index) => {
          const id = `${name}-${index}`;

          return (
          <label
            htmlFor={id}
            key={option}
            className="flex items-center gap-3 text-sm text-muted-beige"
          >
            <input
              className="size-4 accent-premium-gold"
              id={id}
              name={name}
              type="radio"
              value={option}
            />
            <span>{option}</span>
          </label>
          );
        })}
      </div>
      {error ? (
        <span className={errorClass} id={errorId(name)}>
          {error}
        </span>
      ) : null}
    </fieldset>
  );
}
