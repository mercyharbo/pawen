"use client";

import { useEffect, useRef, useState } from "react";
import type { NominationFormState } from "@/app/nominations/actions";
import type { SelectGroup } from "@/lib/nomination-form-data";
import {
  errorClass,
  errorId,
  fieldError,
  RequiredLabel,
} from "@/components/ui/form-field";

type CustomSelectProps = {
  label: string;
  name: string;
  options: string[] | SelectGroup[];
  state: NominationFormState;
};

export function CustomSelect({
  label,
  name,
  options,
  state,
}: CustomSelectProps) {
  const error = fieldError(state, name);
  const buttonId = `${name}-button`;
  const labelId = `${name}-label`;
  const listboxId = `${name}-listbox`;
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const groupedOptions =
    typeof options[0] === "string"
      ? [{ label: "", options: options as string[] }]
      : (options as SelectGroup[]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!selectRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="relative flex flex-col gap-2" ref={selectRef}>
      <label htmlFor={buttonId} id={labelId}>
        <RequiredLabel>{label}</RequiredLabel>
      </label>
      <input
        id={`${name}-value`}
        name={name}
        readOnly
        type="hidden"
        value={value}
      />
      <button
        aria-controls={listboxId}
        aria-describedby={error ? errorId(name) : undefined}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-invalid={error ? "true" : "false"}
        aria-labelledby={`${labelId} ${buttonId}`}
        className={`flex w-full items-center justify-between gap-4 border px-4 py-3 text-left text-sm outline-none transition-colors duration-300 ${
          error
            ? "border-red-500 bg-background/70 text-muted-beige hover:border-red-500"
            : open
            ? "border-champagne-gold bg-charcoal text-foreground"
            : "border-premium-gold/20 bg-background/70 text-muted-beige hover:border-champagne-gold"
        }`}
        id={buttonId}
        onClick={() => setOpen((current) => !current)}
        role="combobox"
        type="button"
      >
        <span className={value ? "text-foreground" : "text-soft-gray"}>
          {value || "Select one"}
        </span>
        <span aria-hidden="true" className="text-champagne-gold">
          {open ? "-" : "+"}
        </span>
      </button>
      {open ? (
        <div
          className="absolute left-0 top-[calc(100%+0.5rem)] z-30 max-h-72 w-full overflow-y-auto border border-premium-gold/30 bg-soft-black p-2 shadow-2xl shadow-black/50 [scrollbar-color:var(--premium-gold)_var(--background)] [scrollbar-width:thin]"
          id={listboxId}
          role="listbox"
        >
          {groupedOptions.map((group) => (
            <div key={group.label || name} className="grid gap-1" role="group">
              {group.label ? (
                <div className="px-3 py-2 font-serif text-sm text-champagne-gold" role="presentation">
                  {group.label}
                </div>
              ) : null}
              {group.options.map((option) => (
                <button
                  aria-selected={value === option}
                  className="px-3 py-2 text-left text-sm text-muted-beige transition-colors duration-200 hover:bg-premium-gold hover:text-background"
                  key={option}
                  onClick={() => {
                    setValue(option);
                    setOpen(false);
                  }}
                  role="option"
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          ))}
        </div>
      ) : null}
      {error ? (
        <span className={errorClass} id={errorId(name)}>
          {error}
        </span>
      ) : null}
    </div>
  );
}
