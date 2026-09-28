import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CtaSection } from "@/components/sections/cta";
import { processSteps } from "@/content/process";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How miqode delivers software: discover, define, architect, build, launch, and grow — with transparent scope and communication.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="From idea to production, without the fog."
        description="A six-stage path designed for clarity. You always know what we are doing, why we are doing it, and what ‘done’ means."
      />
      <Section>
        <Container>
          <ol className="divide-y divide-border">
            {processSteps.map((step, index) => (
              <li
                key={step.number}
                className="grid gap-3 py-8 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-6 lg:grid-cols-[7rem_minmax(0,0.8fr)_minmax(0,1.2fr)] lg:py-9"
              >
                <p className="font-mono text-xs font-medium tracking-[0.18em] text-brand">
                  {step.number}
                </p>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {step.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.summary}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground sm:col-span-2 lg:col-span-1 lg:pt-1">
                  {step.detail}
                </p>
                <span className="sr-only">
                  Step {index + 1} of {processSteps.length}
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <CtaSection />
    </>
  );
}
