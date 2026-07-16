import { create } from "zustand";
import { confirmations } from "@/lib/nomination-form-data";

export type NominationDialogStep = "intro" | "nominator" | "nominee" | "story";

type NominationDialogValues = {
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
  discoverySource: string;
  confirmations: string[];
  supportingEvidenceName: string;
};

type NominationDialogStore = NominationDialogValues & {
  fieldErrors: Record<string, string>;
  isOpen: boolean;
  step: NominationDialogStep;
  applySelfNominationDefaults: () => void;
  closeDialog: () => void;
  nextStep: () => void;
  openDialog: () => void;
  previousStep: () => void;
  resetDialog: () => void;
  setConfirmation: (confirmation: string, checked: boolean) => void;
  setField: <Field extends keyof NominationDialogValues>(
    field: Field,
    value: NominationDialogValues[Field],
  ) => void;
  setFieldErrors: (fieldErrors: Record<string, string>) => void;
  setStep: (step: NominationDialogStep) => void;
};

const initialValues: NominationDialogValues = {
  category: "",
  nominatingFor: "",
  nominatorFirstName: "",
  nominatorLastName: "",
  nominatorEmail: "",
  nominatorPhone: "",
  relationship: "",
  nomineeFirstName: "",
  nomineeLastName: "",
  nomineeEmail: "",
  nomineePhone: "",
  country: "",
  roleOrganisation: "",
  linkedinUrl: "",
  socialUrl: "",
  website: "",
  whyDeserving: "",
  discoverySource: "",
  confirmations: [],
  supportingEvidenceName: "No file chosen",
};

const orderedSteps: NominationDialogStep[] = [
  "intro",
  "nominator",
  "nominee",
  "story",
];

export const useNomination = create<NominationDialogStore>(
  (set, get) => ({
    ...initialValues,
    fieldErrors: {},
    isOpen: false,
    step: "intro",
    applySelfNominationDefaults: () =>
      set((state) => {
        if (state.nominatingFor !== "I am nominating myself") {
          return {};
        }

        return {
          nomineeEmail: state.nomineeEmail || state.nominatorEmail,
          nomineeFirstName: state.nomineeFirstName || state.nominatorFirstName,
          nomineeLastName: state.nomineeLastName || state.nominatorLastName,
          nomineePhone: state.nomineePhone || state.nominatorPhone,
          relationship: state.relationship || "Self",
        };
      }),
    closeDialog: () => set({ isOpen: false }),
    nextStep: () => {
      const currentIndex = orderedSteps.indexOf(get().step);
      const nextStep = orderedSteps[Math.min(currentIndex + 1, orderedSteps.length - 1)];

      set({ step: nextStep });
    },
    openDialog: () => set({ isOpen: true }),
    previousStep: () => {
      const currentIndex = orderedSteps.indexOf(get().step);
      const previousStep = orderedSteps[Math.max(currentIndex - 1, 0)];

      set({ step: previousStep });
    },
    resetDialog: () => set({ ...initialValues, fieldErrors: {}, step: "intro" }),
    setConfirmation: (confirmation, checked) =>
      set((state) => {
        const nextConfirmations = checked
          ? Array.from(new Set([...state.confirmations, confirmation]))
          : state.confirmations.filter((item) => item !== confirmation);

        return {
          confirmations: confirmations.filter((item) =>
            nextConfirmations.includes(item),
          ),
          fieldErrors: Object.fromEntries(
            Object.entries(state.fieldErrors).filter(
              ([field]) => field !== "confirmations",
            ),
          ),
        };
      }),
    setField: (field, value) =>
      set((state) => ({
        [field]: value,
        fieldErrors: Object.fromEntries(
          Object.entries(state.fieldErrors).filter(([name]) => name !== field),
        ),
      })),
    setFieldErrors: (fieldErrors) => set({ fieldErrors }),
    setStep: (step) => set({ step }),
  }),
);

export const useNominationDialogStore = useNomination;
