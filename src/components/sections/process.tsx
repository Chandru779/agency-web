"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/layout/container";
import { Section, SectionHeading, homeBandSpacing } from "@/components/layout/section";
import { processSteps } from "@/content/process";

export function ProcessSection() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="process" className={`${homeBandSpacing} border-y border-border`}>
      <Container>
        <SectionHeading
          eyebrow="Process"
          title="A delivery path you can follow."
          description="Six stages from understanding the problem to growing the product. Visible progress, clear decisions, no theatre."
        />
        <div className="relative mt-10 border-t border-border lg:mt-12">
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[1.15rem] hidden w-px bg-border sm:block"
          />
          <ol>
          {processSteps.map((step, index) => (
            <motion.li
              key={step.number}
              className="relative grid gap-2 border-b border-border py-5 last:border-b-0 sm:grid-cols-[5.5rem_minmax(0,0.7fr)_minmax(0,1.3fr)] sm:items-baseline sm:gap-8 sm:py-6"
              initial={
                reduceMotion ? false : { opacity: 1, y: 14 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.45,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="font-mono text-xs tracking-widest text-brand tabular-nums">
                {step.number}
              </span>
              <h3 className="text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.summary}
              </p>
            </motion.li>
          ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
