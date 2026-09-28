import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { eyebrowClass } from "@/components/ui/eyebrow";
import { SectionWave } from "@/components/visuals/section-wave";

export function CtaSection() {
  return (
    <section className="cta-atmosphere relative overflow-hidden text-[#f4f4f2]">
      <SectionWave variant="enter" />
      <Container className="relative z-10 pt-16 pb-8 sm:pt-20 sm:pb-10 lg:pt-24 lg:pb-10">
        <Reveal className="max-w-2xl">
          <p className={`${eyebrowClass} text-teal-300/80`}>
            Next step
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Have a software problem worth solving?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">
            Tell us what you are building. We will help you understand the best
            path from idea to production.
          </p>
          <div className="mt-8">
            <ButtonLink
              href="/start"
              className="bg-[#f4f4f2] text-[#0c0d0c] hover:bg-white"
            >
              Start a Project
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
