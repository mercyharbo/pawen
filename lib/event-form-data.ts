export const eventCountryOptions = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Australia",
  "Austria",
  "Bangladesh",
  "Belgium",
  "Botswana",
  "Brazil",
  "Burkina Faso",
  "Cameroon",
  "Canada",
  "China",
  "Egypt",
  "Ethiopia",
  "France",
  "Ghana",
  "India",
  "Italy",
  "Japan",
  "Kenya",
  "Lesotho",
  "Malawi",
  "Mauritius",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Netherlands",
  "Nigeria",
  "Rwanda",
  "Senegal",
  "South Africa",
  "Tanzania",
  "Uganda",
  "United Kingdom",
  "United States",
  "Zambia",
  "Zimbabwe",
  "Other",
] as const;

export const nationalityOptions = [
  "Angolan",
  "Botswanan",
  "British",
  "Cameroonian",
  "Canadian",
  "Egyptian",
  "Ethiopian",
  "Ghanaian",
  "Kenyan",
  "Malawian",
  "Moroccan",
  "Mozambican",
  "Namibian",
  "Nigerian",
  "Rwandan",
  "Senegalese",
  "South African",
  "Tanzanian",
  "Ugandan",
  "American",
  "Zambian",
  "Zimbabwean",
  "Other",
] as const;

export const discoveryOptions = [
  "Social Media",
  "Email",
  "Referral",
  "Website",
  "Other",
] as const;

export const visaOptions = ["Yes", "No", "Not sure"] as const;

export const yesNoOptions = ["Yes", "No"] as const;

export const industryOptions = [
  "Agribusiness",
  "Fashion & Textiles",
  "Financial Services",
  "Technology",
  "Beauty & Wellness",
  "Consumer Goods",
  "Professional Services",
  "Other",
] as const;

export const boothTypeOptions = [
  "2m x 2m Micro SME Booth (Full Booth + Branding) — 7,000 ZMW / $360 USD",
  "2m x 2m Micro SME Booth (Floor Space Only) — 3,500 ZMW / $180 USD",
  "3m x 3m Standard Booth (Full Booth + Branding) — 11,000 ZMW / $565 USD",
  "3m x 3m Standard Booth (Floor Space Only) — 5,500 ZMW / $282 USD",
  "3m x 3m Standard Corner Booth (Full Booth + Branding) — 13,000 ZMW / $670 USD",
  "3m x 3m Standard Corner Booth (Floor Space Only) — 6,500 ZMW / $334 USD",
  "6m x 3m Corporate Booth (Full Booth + Branding) — 20,000 ZMW / $1,025 USD",
  "6m x 3m Corporate Booth (Floor Space Only) — 8,000 ZMW / $410 USD",
  "6m x 3m Corporate Corner Booth (Full Booth + Branding) — 25,000 ZMW / $1,285 USD",
  "6m x 3m Corporate Corner Booth (Floor Space Only) — 11,000 ZMW / $564 USD",
  "6m x 6m Premium Booth (Full Booth + Branding) — 35,000 ZMW / $1,795 USD",
  "6m x 6m Premium Booth (Floor Space Only) — 15,000 ZMW / $770 USD",
] as const;

export const exhibitionRatesFootnote =
  "*Floor Space Only provides the allocated exhibition space without PAWEN-provided booth structure or branding or Furniture. Exhibitors will be responsible for their own booth setup within event guidelines.";

export type BoothPackage = {
  id: string;
  name: string;
  dimensions: string;
  category: string;
  fullBoothPriceZmw: string;
  fullBoothPriceUsd: string;
  floorSpacePriceZmw: string;
  floorSpacePriceUsd: string;
  priceZmw: string;
  priceUsd: string;
  corner?: boolean;
  featured?: boolean;
  tag?: string;
  formValue: (typeof boothTypeOptions)[number];
  fullBoothFormValue: (typeof boothTypeOptions)[number];
  floorSpaceFormValue: (typeof boothTypeOptions)[number];
  description: string;
  inclusions: readonly string[];
  floorSpaceInclusions: readonly string[];
};

export const boothPackages: readonly BoothPackage[] = [
  {
    id: "micro-sme",
    name: "Micro SME Booth",
    dimensions: "2m × 2m",
    category: "Micro SME",
    fullBoothPriceZmw: "7,000 ZMW",
    fullBoothPriceUsd: "$360 USD",
    floorSpacePriceZmw: "3,500 ZMW",
    floorSpacePriceUsd: "$180 USD",
    priceZmw: "7,000 ZMW",
    priceUsd: "$360 USD",
    tag: "Emerging Enterprises",
    formValue:
      "2m x 2m Micro SME Booth (Full Booth + Branding) — 7,000 ZMW / $360 USD",
    fullBoothFormValue:
      "2m x 2m Micro SME Booth (Full Booth + Branding) — 7,000 ZMW / $360 USD",
    floorSpaceFormValue:
      "2m x 2m Micro SME Booth (Floor Space Only) — 3,500 ZMW / $180 USD",
    description:
      "Tailored for early-stage and micro-enterprises ready to showcase products and connect with partners.",
    inclusions: [
      "2m × 2m Shell scheme exhibition space & branding",
      "Fascia board with company name",
      "1 table and 2 chairs",
      "Power outlet & spotlight",
      "1 exhibitor badge",
      "Listing in official summit directory",
    ],
    floorSpaceInclusions: [
      "2m × 2m Allocated exhibition floor space only",
      "1 exhibitor badge",
      "Listing in official summit directory",
      "Exhibitor responsible for own booth setup & furniture",
    ],
  },
  {
    id: "standard",
    name: "Standard Booth",
    dimensions: "3m × 3m",
    category: "Standard",
    fullBoothPriceZmw: "11,000 ZMW",
    fullBoothPriceUsd: "$565 USD",
    floorSpacePriceZmw: "5,500 ZMW",
    floorSpacePriceUsd: "$282 USD",
    priceZmw: "11,000 ZMW",
    priceUsd: "$565 USD",
    tag: "Most Popular",
    featured: true,
    formValue:
      "3m x 3m Standard Booth (Full Booth + Branding) — 11,000 ZMW / $565 USD",
    fullBoothFormValue:
      "3m x 3m Standard Booth (Full Booth + Branding) — 11,000 ZMW / $565 USD",
    floorSpaceFormValue:
      "3m x 3m Standard Booth (Floor Space Only) — 5,500 ZMW / $282 USD",
    description:
      "Our most popular option for established businesses looking for prime brand exposure and foot traffic.",
    inclusions: [
      "3m × 3m Shell scheme exhibition space & branding",
      "Fascia board with company name",
      "1 table and 2 chairs",
      "Power outlet & 2 spotlights",
      "2 exhibitor badges",
      "Listing in official summit directory",
    ],
    floorSpaceInclusions: [
      "3m × 3m Allocated exhibition floor space only",
      "2 exhibitor badges",
      "Listing in official summit directory",
      "Exhibitor responsible for own booth setup & furniture",
    ],
  },
  {
    id: "standard-corner",
    name: "Standard Corner Booth",
    dimensions: "3m × 3m",
    category: "Standard Corner",
    fullBoothPriceZmw: "13,000 ZMW",
    fullBoothPriceUsd: "$670 USD",
    floorSpacePriceZmw: "6,500 ZMW",
    floorSpacePriceUsd: "$334 USD",
    priceZmw: "13,000 ZMW",
    priceUsd: "$670 USD",
    corner: true,
    tag: "Dual Frontage",
    formValue:
      "3m x 3m Standard Corner Booth (Full Booth + Branding) — 13,000 ZMW / $670 USD",
    fullBoothFormValue:
      "3m x 3m Standard Corner Booth (Full Booth + Branding) — 13,000 ZMW / $670 USD",
    floorSpaceFormValue:
      "3m x 3m Standard Corner Booth (Floor Space Only) — 6,500 ZMW / $334 USD",
    description:
      "Corner position with dual-aisle exposure ensuring maximum visibility and attendee engagement.",
    inclusions: [
      "3m × 3m Prime corner exhibition space & branding",
      "Dual open sides for high visibility",
      "Fascia board with company name",
      "1 table and 2 chairs",
      "Power outlet & spotlights",
      "2 exhibitor badges",
      "Listing in official summit directory",
    ],
    floorSpaceInclusions: [
      "3m × 3m Corner allocated floor space only",
      "Dual open sides for high visibility",
      "2 exhibitor badges",
      "Listing in official summit directory",
      "Exhibitor responsible for own booth setup & furniture",
    ],
  },
  {
    id: "corporate",
    name: "Corporate Booth",
    dimensions: "6m × 3m",
    category: "Corporate",
    fullBoothPriceZmw: "20,000 ZMW",
    fullBoothPriceUsd: "$1,025 USD",
    floorSpacePriceZmw: "8,000 ZMW",
    floorSpacePriceUsd: "$410 USD",
    priceZmw: "20,000 ZMW",
    priceUsd: "$1,025 USD",
    tag: "High Visibility",
    formValue:
      "6m x 3m Corporate Booth (Full Booth + Branding) — 20,000 ZMW / $1,025 USD",
    fullBoothFormValue:
      "6m x 3m Corporate Booth (Full Booth + Branding) — 20,000 ZMW / $1,025 USD",
    floorSpaceFormValue:
      "6m x 3m Corporate Booth (Floor Space Only) — 8,000 ZMW / $410 USD",
    description:
      "Double-width space designed for growth-stage companies and corporations presenting multiple products or services.",
    inclusions: [
      "6m × 3m Shell scheme exhibition space & branding",
      "Fascia board with company branding",
      "2 tables and 4 chairs",
      "Multiple power outlets & spotlights",
      "3 exhibitor badges",
      "Enhanced directory listing & brand mention",
    ],
    floorSpaceInclusions: [
      "6m × 3m Allocated exhibition floor space only",
      "3 exhibitor badges",
      "Enhanced directory listing & brand mention",
      "Exhibitor responsible for own booth setup & furniture",
    ],
  },
  {
    id: "corporate-corner",
    name: "Corporate Corner Booth",
    dimensions: "6m × 3m",
    category: "Corporate Corner",
    fullBoothPriceZmw: "25,000 ZMW",
    fullBoothPriceUsd: "$1,285 USD",
    floorSpacePriceZmw: "11,000 ZMW",
    floorSpacePriceUsd: "$564 USD",
    priceZmw: "25,000 ZMW",
    priceUsd: "$1,285 USD",
    corner: true,
    tag: "Prime Corporate",
    formValue:
      "6m x 3m Corporate Corner Booth (Full Booth + Branding) — 25,000 ZMW / $1,285 USD",
    fullBoothFormValue:
      "6m x 3m Corporate Corner Booth (Full Booth + Branding) — 25,000 ZMW / $1,285 USD",
    floorSpaceFormValue:
      "6m x 3m Corporate Corner Booth (Floor Space Only) — 11,000 ZMW / $564 USD",
    description:
      "Prominent corner placement with high-traffic flow for established brands and institutions.",
    inclusions: [
      "6m × 3m Corner exhibition space & branding",
      "Dual-aisle open frontage",
      "Fascia board with company branding",
      "2 tables and 4 chairs",
      "Multiple power outlets & spotlights",
      "4 exhibitor badges",
      "Featured mention in official summit directory",
    ],
    floorSpaceInclusions: [
      "6m × 3m Corner allocated floor space only",
      "Dual-aisle open frontage",
      "4 exhibitor badges",
      "Featured mention in official summit directory",
      "Exhibitor responsible for own booth setup & furniture",
    ],
  },
  {
    id: "premium",
    name: "Premium Booth",
    dimensions: "6m × 6m",
    category: "Premium",
    fullBoothPriceZmw: "35,000 ZMW",
    fullBoothPriceUsd: "$1,795 USD",
    floorSpacePriceZmw: "15,000 ZMW",
    floorSpacePriceUsd: "$770 USD",
    priceZmw: "35,000 ZMW",
    priceUsd: "$1,795 USD",
    tag: "Flagship Presence",
    featured: true,
    formValue:
      "6m x 6m Premium Booth (Full Booth + Branding) — 35,000 ZMW / $1,795 USD",
    fullBoothFormValue:
      "6m x 6m Premium Booth (Full Booth + Branding) — 35,000 ZMW / $1,795 USD",
    floorSpaceFormValue:
      "6m x 6m Premium Booth (Floor Space Only) — 15,000 ZMW / $770 USD",
    description:
      "Expansive 36m² flagship presence for industry leaders, headline exhibitors, and major institutions.",
    inclusions: [
      "6m × 6m Expansive exhibition space & full branding (island/prominent position)",
      "Premium branding & custom layout allowance",
      "Furnished setup (tables, chairs, lounge seating)",
      "Dedicated power supply & premium lighting",
      "6 exhibitor badges",
      "Dedicated summit social media feature & VIP networking access",
    ],
    floorSpaceInclusions: [
      "6m × 6m Expansive floor space only (island/prominent position)",
      "6 exhibitor badges",
      "Dedicated summit social media feature & VIP networking access",
      "Exhibitor responsible for own booth setup & furniture",
    ],
  },
];

export const sessionTopicOptions = [
  "Leadership & Governance",
  "Entrepreneurship & Business Growth",
  "Finance & Investment",
  "Policy & Advocacy",
  "Technology & Innovation",
  "Personal Branding",
  "Other",
] as const;

export const sessionFormatOptions = [
  "Keynote",
  "Panel Discussion",
  "Fireside Chat",
  "Workshop",
  "Masterclass",
] as const;

export const speakerConfirmations = {
  availability:
    "I confirm I am available to attend in person on the summit dates in November 2026",
  terms:
    "I understand that speaking engagements at the PAWEN Summit are unpaid and I have reviewed the accommodation terms above",
  consent:
    "I agree to receive communications from PAWEN regarding this application",
} as const;
