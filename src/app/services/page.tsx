import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CtaSection } from "@/components/sections/cta";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Product development, business software, AI and automation, and software modernization — engineering services for startups and growing businesses.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Software built around the problem."
        description="We sell outcomes, not hours. Each service is a way to turn a business constraint into a system that can ship, operate, and grow."
      />
      <Section>
        <Container>
          <div className="divide-y divide-border">
          {services.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="scroll-mt-24 grid gap-4 py-8 lg:grid-cols-[6.5rem_minmax(0,1fr)] lg:gap-8 lg:py-10"
            >
              <p className="font-mono text-xs font-medium tracking-[0.18em] text-brand">
                {service.number}
              </p>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.examples.map((example) => (
                    <li
                      key={example}
                      className="border border-border px-2.5 py-1 text-xs leading-5 text-muted-foreground sm:text-sm"
                    >
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Looking for a specific industry or engagement model?{" "}
            <Link href="/solutions" className="underline underline-offset-4">
              See solutions by audience
            </Link>
            .
          </p>
        </Container>
      </Section>
      <CtaSection />
    </>
  );
}
