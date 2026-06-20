export type SelectGroup = {
  label: string;
  options: string[];
};

export const relationships = [
  "Self",
  "Colleague",
  "Manager / employer",
  "Mentor",
  "Friend / peer",
  "Family member",
  "Industry contact",
  "Client / customer",
  "Other",
];

export const nominationTargets = [
  "I am nominating myself",
  "I am nominating someone else",
];

export const categoryGroups: SelectGroup[] = [
  {
    label: "Entrepreneurship Excellence Awards",
    options: [
      "Technology Entrepreneur of the Year",
      "Digital Entrepreneur of the Year",
      "Real Estate Entrepreneur of the Year",
      "Agribusiness Entrepreneur of the Year",
      "Creative Entrepreneur of the Year",
      "Social Impact Entrepreneur of the Year",
      "Emerging Entrepreneur of the Year",
    ],
  },
  {
    label: "Leadership Excellence Awards",
    options: [
      "CEO of the Year",
      "Boardroom Leader of the Year",
      "Finance Leader of the Year",
      "Technology Leader of the Year",
      "People Leader of the Year",
      "Product Leader of the Year",
      "Brand Leader of the Year",
    ],
  },
  {
    label: "Impact Leadership Awards",
    options: [
      "Public Service Leader of the Year",
      "Health Leader of the Year",
      "Education Leader of the Year",
      "Innovation Leader of the Year",
      "Investor of the Year",
      "Economic Empowerment Leader of the Year",
    ],
  },
];

export const discoverySources = [
  "PAWEN website or community",
  "Social media",
  "Word of mouth / referral",
  "Email / newsletter",
  "News article or media",
  "A previous PAWENpreneur Awards event",
  "Other",
];

export const confirmations = [
  "I confirm the information provided is accurate to the best of my knowledge.",
  "I consent to PAWEN contacting the nominee and/or nominator regarding this nomination, and to the use of submitted information for the purposes of the awards.",
];

export const fallbackAfricanCountries = [
  "Algeria",
  "Angola",
  "Benin",
  "Botswana",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cameroon",
  "Central African Republic",
  "Chad",
  "Comoros",
  "Congo (Republic of the)",
  "Congo (Democratic Republic of the)",
  "Cote d'Ivoire",
  "Djibouti",
  "Egypt",
  "Equatorial Guinea",
  "Eritrea",
  "Eswatini",
  "Ethiopia",
  "Gabon",
  "Gambia",
  "Ghana",
  "Guinea",
  "Guinea-Bissau",
  "Kenya",
  "Lesotho",
  "Liberia",
  "Libya",
  "Madagascar",
  "Malawi",
  "Mali",
  "Mauritania",
  "Mauritius",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Niger",
  "Nigeria",
  "Rwanda",
  "Sao Tome and Principe",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Sudan",
  "Tanzania",
  "Togo",
  "Tunisia",
  "Uganda",
  "Zambia",
  "Zimbabwe",
  "Diaspora - please specify",
];
