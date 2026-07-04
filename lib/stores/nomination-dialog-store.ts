import { create } from "zustand";
import { confirmations } from "@/lib/nomination-form-data";

export type NominationDialogStep = "intro" | "nominator" | "nominee" | "story";

type NominationDialogValues = {
  category: string;
  nominatingFor: string;
  relationship: string;
  country: string;
  discoverySource: string;
  confirmations: string[];
  supportingEvidenceName: string;
};

type NominationDialogStore = NominationDialogValues & {
  isOpen: boolean;
  step: NominationDialogStep;
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
  setStep: (step: NominationDialogStep) => void;
};

const initialValues: NominationDialogValues = {
  category: "",
  nominatingFor: "",
  relationship: "",
  country: "",
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
    isOpen: false,
    step: "intro",
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
    resetDialog: () => set({ ...initialValues, step: "intro" }),
    setConfirmation: (confirmation, checked) =>
      set((state) => {
        const nextConfirmations = checked
          ? Array.from(new Set([...state.confirmations, confirmation]))
          : state.confirmations.filter((item) => item !== confirmation);

        return {
          confirmations: confirmations.filter((item) =>
            nextConfirmations.includes(item),
          ),
        };
      }),
    setField: (field, value) => set({ [field]: value }),
    setStep: (step) => set({ step }),
  }),
);

export const useNominationDialogStore = useNomination;
