import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section, SectionHeading, homeBandSpacing } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { services } from "@/content/services";

export function ServicesSection() {
  return (
    <Section id="services" className={homeBandSpacing}>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="What we build"
            description="Four ways we help companies turn operational problems and product ideas into software that can last."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.06} as="article">
              <Link
                href={`/services#${service.id}`}
                className="group flex h-full flex-col border border-border bg-card p-6 transition-colors hover:border-foreground/20 hover:bg-muted/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-brand">
                    {service.number}
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.summary}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {service.examples.slice(0, 4).map((example) => (
                    <li
                      key={example}
                      className="border border-border px-2.5 py-1 text-xs leading-5 text-muted-foreground"
                    >
                      {example}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
