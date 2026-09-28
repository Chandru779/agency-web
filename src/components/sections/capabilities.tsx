import { Container } from "@/components/layout/container";
import { Section, SectionHeading, homeBandSpacing } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { capabilities } from "@/content/capabilities";

export function CapabilitiesSection() {
  return (
    <Section className={`${homeBandSpacing} bg-muted/45`}>
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Capabilities"
              title="Engineering depth, applied to the problem."
              description="We do not sell a catalogue of tools. We bring the capabilities required to design, build, and operate serious software."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="grid gap-px border border-border bg-border sm:grid-cols-2">
              {capabilities.map((item) => (
                <li key={item.title} className="bg-background px-5 py-5 sm:px-6">
                  <h3 className="text-sm font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
