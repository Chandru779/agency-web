import { Container } from "@/components/layout/container";
import { Section, homeBandSpacing } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PositioningVisual } from "@/components/visuals/positioning-visual";

export function PositioningSection() {
  return (
    <Section className={`${homeBandSpacing} border-b border-border`}>
      <Container>
        <Reveal className="grid items-start gap-10 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
          <div>
            <Eyebrow>Positioning</Eyebrow>
            <PositioningVisual className="mt-6 sm:mt-8" />
          </div>
          <div>
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.6rem] lg:leading-tight">
              Technology should solve business problems — not create new ones.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              We combine product thinking with disciplined engineering. The
              result is software that is useful on day one, maintainable after
              launch, and structured to scale when the business does.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              That means fewer throwaway builds, clearer scope, and systems that
              still make sense a year later.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
