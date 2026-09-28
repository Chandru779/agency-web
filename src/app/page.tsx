import type { Metadata } from "next";

import { CapabilitiesSection } from "@/components/sections/capabilities";
import { CtaSection } from "@/components/sections/cta";
import { HeroSection } from "@/components/sections/hero";
import { PositioningSection } from "@/components/sections/positioning";
import { ProcessSection } from "@/components/sections/process";
import { ServicesSection } from "@/components/sections/services";
import { WhyUsSection } from "@/components/sections/why-us";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${site.name} — ${site.tagline}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <HeroSection />
      <PositioningSection />
      <ServicesSection />
      <CapabilitiesSection />
      <ProcessSection />
      <WhyUsSection />
      <CtaSection />
    </>
  );
}
