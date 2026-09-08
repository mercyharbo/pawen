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
  "2m x 2m Micro-SME Booth — 12,000 ZMW / $600 USD",
  "3m x 3m Standard Booth — 17,000 ZMW / $850 USD",
  "3m x 3m Standard Corner Booth — 22,000 ZMW / $1,100 USD",
  "6m x 3m Corporate Booth — 25,000 ZMW / $1,250 USD",
  "6m x 3m Corporate Corner Booth — 30,000 ZMW / $1,500 USD",
  "6m x 6m Premium Booth — 45,000 ZMW / $2,250 USD",
] as const;

export type BoothPackage = {
  id: string;
  name: string;
  dimensions: string;
  category: string;
  priceZmw: string;
  priceUsd: string;
  corner?: boolean;
  featured?: boolean;
  tag?: string;
  formValue: (typeof boothTypeOptions)[number];
  description: string;
  inclusions: readonly string[];
};

export const boothPackages: readonly BoothPackage[] = [
  {
    id: "micro-sme",
    name: "Micro-SME Booth",
    dimensions: "2m x 2m",
    category: "Micro-SME",
    priceZmw: "12,000 ZMW",
    priceUsd: "$600 USD",
    tag: "Emerging Enterprises",
    formValue: "2m x 2m Micro-SME Booth — 12,000 ZMW / $600 USD",
    description:
      "Tailored for early-stage and micro-enterprises ready to showcase products and connect with partners.",
    inclusions: [
      "2m x 2m Shell scheme exhibition space",
      "Fascia board with company name",
      "1 table and 2 chairs",
      "Power outlet & spotlight",
      "1 exhibitor badge",
      "Listing in official summit directory",
    ],
  },
  {
    id: "standard",
    name: "Standard Booth",
    dimensions: "3m x 3m",
    category: "Standard",
    priceZmw: "17,000 ZMW",
    priceUsd: "$850 USD",
    tag: "Most Popular",
    featured: true,
    formValue: "3m x 3m Standard Booth — 17,000 ZMW / $850 USD",
    description:
      "Our most popular option for established businesses looking for prime brand exposure and foot traffic.",
    inclusions: [
      "3m x 3m Shell scheme exhibition space",
      "Fascia board with company name",
      "1 table and 2 chairs",
      "Power outlet & 2 spotlights",
      "2 exhibitor badges",
      "Listing in official summit directory",
    ],
  },
  {
    id: "standard-corner",
    name: "Standard Corner Booth",
    dimensions: "3m x 3m",
    category: "Standard Corner",
    priceZmw: "22,000 ZMW",
    priceUsd: "$1,100 USD",
    corner: true,
    tag: "Dual Frontage",
    formValue: "3m x 3m Standard Corner Booth — 22,000 ZMW / $1,100 USD",
    description:
      "Corner position with dual-aisle exposure ensuring maximum visibility and attendee engagement.",
    inclusions: [
      "3m x 3m Prime corner exhibition space",
      "Dual open sides for high visibility",
      "Fascia board with company name",
      "1 table and 2 chairs",
      "Power outlet & spotlights",
      "2 exhibitor badges",
      "Listing in official summit directory",
    ],
  },
  {
    id: "corporate",
    name: "Corporate Booth",
    dimensions: "6m x 3m",
    category: "Corporate",
    priceZmw: "25,000 ZMW",
    priceUsd: "$1,250 USD",
    tag: "High Visibility",
    formValue: "6m x 3m Corporate Booth — 25,000 ZMW / $1,250 USD",
    description:
      "Double-width space designed for growth-stage companies and corporations presenting multiple products or services.",
    inclusions: [
      "6m x 3m Shell scheme exhibition space",
      "Fascia board with company branding",
      "2 tables and 4 chairs",
      "Multiple power outlets & spotlights",
      "3 exhibitor badges",
      "Enhanced directory listing & brand mention",
    ],
  },
  {
    id: "corporate-corner",
    name: "Corporate Corner Booth",
    dimensions: "6m x 3m",
    category: "Corporate Corner",
    priceZmw: "30,000 ZMW",
    priceUsd: "$1,500 USD",
    corner: true,
    tag: "Prime Corporate",
    formValue: "6m x 3m Corporate Corner Booth — 30,000 ZMW / $1,500 USD",
    description:
      "Prominent corner placement with high-traffic flow for established brands and institutions.",
    inclusions: [
      "6m x 3m Corner exhibition space",
      "Dual-aisle open frontage",
      "Fascia board with company branding",
      "2 tables and 4 chairs",
      "Multiple power outlets & spotlights",
      "4 exhibitor badges",
      "Featured mention in official summit directory",
    ],
  },
  {
    id: "premium",
    name: "Premium Booth",
    dimensions: "6m x 6m",
    category: "Premium",
    priceZmw: "45,000 ZMW",
    priceUsd: "$2,250 USD",
    tag: "Flagship Presence",
    featured: true,
    formValue: "6m x 6m Premium Booth — 45,000 ZMW / $2,250 USD",
    description:
      "Expansive 36m² flagship presence for industry leaders, headline exhibitors, and major institutions.",
    inclusions: [
      "6m x 6m Expansive exhibition space (island/prominent position)",
      "Premium branding & custom layout allowance",
      "Furnished setup (tables, chairs, lounge seating)",
      "Dedicated power supply & premium lighting",
      "6 exhibitor badges",
      "Dedicated summit social media feature & VIP networking access",
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
