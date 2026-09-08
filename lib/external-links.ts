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
  hotelBooking: "https://www.ideaform.app/f/iKriLY",
  hotelBookingCode: "PAWEN2026",
  hotelWebsite: "https://grandpalace.co.zm/",
  holidayInnBooking:
    "https://www.ihg.com/holidayinn/hotels/us/en/find-hotels/select-roomrate?fromRedirect=true&qSrt=sBR&qErm=false&qSlH=LUNLU&qRms=1&qAdlt=1&qChld=0&qCiD=12&qCiMy=102026&qCoD=15&qCoMy=102026&qGrpCd=PAN&setPMCookies=true&qSHBrC=HI&qDest=Cnr%20Birdcage%20Walk%20and%20Haile%20Selassie%20Avenue,%20Lusaka,%20ZM&qpMbw=0&qpMn=1&srb_u=1&qRmFltr=",
} as const;
