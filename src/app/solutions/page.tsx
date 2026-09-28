import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { eyebrowClass } from "@/components/ui/eyebrow";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CtaSection } from "@/components/sections/cta";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Software engineering for startups, growing businesses, established companies, and agency partners.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Different companies. Same standard of engineering."
        description="The problem changes with the stage of the business. The requirement does not: software that is useful, maintainable, and ready to grow."
      />
      <Section>
        <Container>
          <div className="divide-y divide-border">
            {solutions.map((item) => (
              <article
                key={item.id}
                id={item.id}
                className="scroll-mt-24 grid gap-4 py-8 lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-8 lg:py-10"
              >
                <p className={`${eyebrowClass} text-brand`}>{item.audience}</p>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {item.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.needs.map((need) => (
                      <li
                        key={need}
                        className="border border-border px-2.5 py-1 text-xs leading-5 text-muted-foreground sm:text-sm"
                      >
                        {need}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <CtaSection />
    </>
  );
}
