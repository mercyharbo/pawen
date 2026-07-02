import type { NominationFormState } from "@/app/nominations/actions";

export function fieldError(state: NominationFormState, name: string) {
  return state.fieldErrors?.[name];
}

export function errorId(name: string) {
  return `${name}-dialog-error`;
}
