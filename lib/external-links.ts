import "server-only";

export const externalLinks = {
  nominations: "/nominations",
  jotformNominations:
    process.env.JOTFORM_NOMINATIONS_URL ??
    "https://form.jotform.com/261237854446059",
  tickets: process.env.SELAR_TICKETS_URL ?? "https://selar.com/81eky71031",
  summitRegistration: "https://form.jotform.com/261856147280057",
  applyToSpeak: "https://form.jotform.com/261856835417063",
  bookExhibition: "https://form.jotform.com/261857762803062",
  supportOurWork: "https://selar.com/showlove/pawen",
  documentaryVideo: "https://youtu.be/pHUizhvB_s0",
  documentaryEmbed: "https://www.youtube.com/embed/pHUizhvB_s0",
  communitySubscribe: "https://pawencommunity.substack.com/subscribe",
} as const;
