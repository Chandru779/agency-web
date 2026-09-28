const DEFAULT_SITE_URL = "https://miqode.com";

function resolveSiteUrl(value: string | undefined) {
  const candidate = value?.trim();
  if (!candidate) return DEFAULT_SITE_URL;

  try {
    const url = new URL(candidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return DEFAULT_SITE_URL;
    }
    return url.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const site = {
  name: "miqode",
  legalName: "miqode",
  tagline: "We build software that moves businesses forward.",
  shortDescription:
    "Software engineering partner for startups and growing businesses.",
  description:
    "From SaaS products and AI-powered applications to custom business platforms, miqode turns complex problems into scalable software.",
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  email: "miqode@gmail.com",
  phone: "+91 63618 52500",
  phoneHref: "tel:+916361852500",
  hours: "Monday to Monday, 10:00–18:30 IST",
  responseTime: "Within one business day",
  locale: "en_US",
  address: {
    studio: "miqode Studio",
    street:
      "2nd floor, Outer Ring Road, 3rd Block, BDA Layout, Co-working space, 2nd Stage, Nagarbhavi",
    city: "Bengaluru",
    region: "Karnataka",
    postalCode: "560091",
    country: "India",
  },
  founder: {
    name: "Chandrashekar",
    foundedYear: 2025,
    codingYears: 7,
    engineeringYears: 12,
  },
  coFounder: {
    codingYears: 10,
    engineeringYears: 15,
  },
  headOfEngineering: {
    techYears: 10,
    previously: ["Flipkart"] as const,
  },
  teamSize: "5–10",
} as const;

export const navigation = [
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
] as const;

export const footerNav = {
  services: [
    { href: "/services#product-development", label: "Product development" },
    { href: "/services#business-software", label: "Business software" },
    { href: "/services#ai-automation", label: "AI & automation" },
    { href: "/services#modernization", label: "Modernization" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/process", label: "Process" },
    { href: "/services", label: "Services" },
  ],
} as const;

export function addressLines() {
  const { address } = site;
  return [
    "2nd floor, Outer Ring Rd",
    "3rd Block, BDA Layout",
    "Co-working space",
    "2nd Stage, Nagarbhavi",
    `${address.city} ${address.postalCode}`,
  ];
}

export const socials: readonly { href: string; label: string }[] = [];
