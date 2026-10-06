import type { Metadata, MetadataRoute } from "next";

import { site } from "@/lib/site";

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export const indexablePaths = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/solutions", changeFrequency: "monthly", priority: 0.8 },
  { path: "/process", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/start", changeFrequency: "monthly", priority: 0.6 },
] as const satisfies ReadonlyArray<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}>;

export function absoluteUrl(path = "/") {
  if (path === "/") return site.url;
  return `${site.url}${path}`;
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
};

export function organizationJsonLd() {
  const organizationId = `${site.url}/#organization`;
  const websiteId = `${site.url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": organizationId,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        logo: absoluteUrl("/brand/miqode-mark-2048.png"),
        image: absoluteUrl("/opengraph-image"),
        email: site.email,
        telephone: site.phone,
        description: site.description,
        slogan: site.tagline,
        foundingDate: String(site.founder.foundedYear),
        founder: {
          "@type": "Person",
          name: site.founder.name,
          jobTitle: "Founder",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: site.address.city },
          { "@type": "Country", name: "India" },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: site.email,
          telephone: site.phone,
          areaServed: "IN",
          availableLanguage: "English",
        },
        serviceType: [
          "Product development",
          "SaaS development",
          "Custom business software",
          "AI-powered applications",
          "Software modernization",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": organizationId },
      },
    ],
  };
}
