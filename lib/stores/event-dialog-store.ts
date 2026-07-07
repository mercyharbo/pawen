import { create } from "zustand";

export type EventDialogType = "summit" | "exhibition" | "speaker";

export type EventDialogStep =
  | "summit-personal"
  | "summit-attendance"
  | "exhibition-contact"
  | "exhibition-interest"
  | "speaker-details"
  | "speaker-profile"
  | "speaker-session"
  | "speaker-logistics";

const orderedSteps: Record<EventDialogType, EventDialogStep[]> = {
  summit: ["summit-personal", "summit-attendance"],
  exhibition: ["exhibition-contact", "exhibition-interest"],
  speaker: [
    "speaker-details",
    "speaker-profile",
    "speaker-session",
    "speaker-logistics",
  ],
};

type EventDialogStore = {
  activeDialog: EventDialogType | null;
  step: EventDialogStep;
  closeDialog: () => void;
  nextStep: () => void;
  openDialog: (dialog: EventDialogType) => void;
  previousStep: () => void;
  resetDialog: () => void;
  setStep: (step: EventDialogStep) => void;
};

export const useEventDialog = create<EventDialogStore>((set, get) => ({
  activeDialog: null,
  step: "summit-personal",
  closeDialog: () => set({ activeDialog: null }),
  nextStep: () => {
    const { activeDialog, step } = get();

    if (!activeDialog) {
      return;
    }

    const steps = orderedSteps[activeDialog];
    const currentIndex = steps.indexOf(step);

    set({ step: steps[Math.min(currentIndex + 1, steps.length - 1)] });
  },
  openDialog: (dialog) =>
    set({
      activeDialog: dialog,
      step: orderedSteps[dialog][0],
    }),
  previousStep: () => {
    const { activeDialog, step } = get();

    if (!activeDialog) {
      return;
    }

    const steps = orderedSteps[activeDialog];
    const currentIndex = steps.indexOf(step);

    set({ step: steps[Math.max(currentIndex - 1, 0)] });
  },
  resetDialog: () => {
    const { activeDialog } = get();

    if (!activeDialog) {
      return;
    }

    set({ step: orderedSteps[activeDialog][0] });
  },
  setStep: (step) => set({ step }),
}));

export function getEventDialogSteps(dialog: EventDialogType) {
  return orderedSteps[dialog];
}
