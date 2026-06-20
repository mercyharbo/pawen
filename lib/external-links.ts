import "server-only";

export const externalLinks = {
  nominations: "/nominations",
  jotformNominations:
    process.env.JOTFORM_NOMINATIONS_URL ??
    "https://form.jotform.com/261237854446059",
  tickets: process.env.SELAR_TICKETS_URL ?? "https://selar.com/81eky71031",
} as const;
