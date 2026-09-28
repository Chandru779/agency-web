import { Container } from "@/components/layout/container";
import { Section, SectionHeading, homeBandSpacing } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { principles } from "@/content/principles";

export function WhyUsSection() {
  return (
    <Section className={homeBandSpacing}>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why us"
            title="How we work with you."
            description="We do not compete on slogans. These are the operating principles behind the engagement."
          />
        </Reveal>
        <div className="mt-10 grid gap-x-10 gap-y-10 border-t border-border pt-8 sm:grid-cols-2 lg:mt-12 lg:gap-y-12 lg:pt-10">
          {principles.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05} as="article">
              <p className="font-mono text-[11px] font-medium tracking-[0.18em] text-muted-foreground tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
