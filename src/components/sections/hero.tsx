import { ButtonLink } from "@/components/ui/button-link";
import { eyebrowClass } from "@/components/ui/eyebrow";
import { HeroVisual } from "@/components/visuals/hero-visual";
import { SectionWave, heroWaveBand } from "@/components/visuals/section-wave";
import { site } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="hero-atmosphere relative -mt-16 flex min-h-svh flex-col overflow-hidden pt-16 text-[#f4f4f2]">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-5 pt-10 pb-6 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:px-8 lg:pt-8">
        <div className="hero-copy">
          <p className={`inline-flex items-center gap-3 text-teal-300/85 ${eyebrowClass}`}>
            Software engineering partner
            <span className="hidden h-px w-8 bg-teal-300/45 sm:block" />
          </p>
          <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            {site.tagline.endsWith("forward.") ? (
              <>
                {site.tagline.slice(0, -"forward.".length)}
                <span className="text-teal-300">forward.</span>
              </>
            ) : (
              site.tagline
            )}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">
            From SaaS products and AI-powered applications to custom business
            platforms, we turn complex problems into scalable software.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink
              href="/start"
              className="bg-[#f4f4f2] text-[#0c0d0c] hover:bg-white"
            >
              Start a Project
            </ButtonLink>
            <ButtonLink
              href="/process"
              variant="outline"
              className="border-white/18 bg-transparent text-[#f4f4f2] hover:bg-white/8 hover:text-white"
            >
              See our process
            </ButtonLink>
          </div>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-white/60">
            For startups and growing businesses that need a serious engineering
            partner — not a freelancer, and not a feature factory.
          </p>
        </div>
        <div className="hero-visual-enter relative min-w-0">
          <div className="pointer-events-none absolute -top-8 -right-10 h-2/3 w-2/3 rounded-full bg-teal-400/18 blur-3xl" />
          <HeroVisual />
        </div>
      </div>
      <div className={`relative z-20 -mt-10 shrink-0 sm:-mt-12 lg:-mt-16 ${heroWaveBand}`}>
        <SectionWave />
      </div>
    </section>
  );
}
