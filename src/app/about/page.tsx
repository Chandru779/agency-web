import type { Metadata } from "next";
import Link from "next/link";

import { StudioFacts } from "@/components/inquiry/studio-facts";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CtaSection } from "@/components/sections/cta";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button-link";
import {
  aboutPhilosophy,
  aiPractice,
  nextWork,
  people,
} from "@/content/about";
import { engagementSteps } from "@/content/leadership";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "miqode was founded in 2025 to build software for what comes next — experienced engineers, modern AI, and systems designed to evolve.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const { founder } = site;

  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built differently. Built for what comes next."
        description={`miqode was founded in ${founder.foundedYear} with a simple belief: software should be more than functional. It should be built for the future.`}
      />
      <Section>
        <Container className="space-y-10 lg:space-y-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
            <div>
              <Eyebrow>Founded {founder.foundedYear}</Eyebrow>
              <p className="mt-4 text-lg leading-relaxed text-foreground/90">
                We did not start miqode to deliver ordinary websites, repetitive
                dashboards, or software that is outdated the day it ships.
              </p>
            </div>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                We started it because we enjoy building technology. The next
                generation of software will be more intelligent, more connected,
                and more AI-native. We approach every product with modern
                engineering and AI in mind — not as a label added at the end,
                but as a capability that can change how the product works.
              </p>
              <p>
                We are a team of engineers who combine deep engineering
                experience with modern AI to turn ambitious ideas and complex
                business problems into products that can actually run.
              </p>
            </div>
          </div>

          <dl className="grid gap-px border border-border bg-border sm:grid-cols-3">
            <div className="bg-background px-6 py-6">
              <dt className="font-mono text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                Founded
              </dt>
              <dd className="mt-2 text-2xl font-semibold tracking-tight">
                {founder.foundedYear}
              </dd>
              <dd className="mt-1 text-sm text-muted-foreground">
                {site.address.city}, {site.address.country}
              </dd>
            </div>
            <div className="bg-background px-6 py-6">
              <dt className="font-mono text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                Team
              </dt>
              <dd className="mt-2 text-2xl font-semibold tracking-tight">
                {site.teamSize}
              </dd>
              <dd className="mt-1 text-sm text-muted-foreground">
                Engineering-focused
              </dd>
            </div>
            <div className="bg-background px-6 py-6">
              <dt className="font-mono text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                Practice
              </dt>
              <dd className="mt-2 text-2xl font-semibold tracking-tight">
                AI-assisted
              </dd>
              <dd className="mt-1 text-sm text-muted-foreground">
                Judgment stays with engineers
              </dd>
            </div>
          </dl>

          <div className="grid gap-8 border-t border-border pt-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
            <div>
              <Eyebrow>How we engineer</Eyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                We are not just developers.
              </h2>
            </div>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                We are engineers who like to build. The team has worked across
                startups, product companies, enterprise-scale applications, and
                more than one industry — from understanding a problem and
                designing the architecture to building, scaling, integrating,
                and improving systems in production.
              </p>
              <p>
                AI is part of how we engineer. We use it to research, prototype,
                implement, test, review, and move faster. We are not vibe
                coders. AI is an accelerator, not a substitute for engineering
                judgment. It amplifies experienced engineers: human reasoning,
                architecture, product thinking, and technical expertise, with
                the speed of modern tools.
              </p>
            </div>
          </div>

          <div>
            <Eyebrow>People</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              The people behind miqode.
            </h2>
            <div className="mt-6 divide-y divide-border border-y border-border">
              {people.map((person) => (
                <article
                  key={person.id}
                  className="grid gap-3 py-6 sm:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] sm:items-start sm:gap-10 lg:py-7"
                >
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {person.name ?? person.role}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {person.name ? person.role : person.tenure}
                    </p>
                    {person.name ? (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {person.tenure}
                      </p>
                    ) : null}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {person.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-8 border-t border-border pt-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
            <div>
              <Eyebrow>The team</Eyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Small team. Serious engineering.
              </h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                miqode works as a {site.teamSize} person engineering-focused
                team: experienced engineers and people who care about the
                technology. We keep the team lean on purpose. Difficult
                software does not automatically need a large organization.
              </p>
              <p>
                Experienced engineers, modern practice, AI-assisted development,
                and the right architecture let a focused team do work that used
                to take a much larger one. The size keeps us close to the
                technology, quick to move, and fast to decide.
              </p>
              <p className="text-base font-medium text-foreground/90">
                Small enough to move fast. Experienced enough to build
                seriously.
              </p>
            </div>
          </div>

          <div>
            <Eyebrow>AI in the work</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Engineering with AI at the core.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              AI is changing how software is built, and we want to be part of
              that change. We use it through the engineering workflow to
              accelerate the work — not to skip it.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {aiPractice.map((item) => (
                <li
                  key={item}
                  className="border border-border px-2.5 py-1 text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 border border-border bg-muted/40 p-6 sm:p-8">
              <p className="text-base font-medium leading-relaxed text-foreground/90">
                AI should make great engineers better — not replace engineering
                thinking.
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                We do not generate code and ship it. We understand the problem,
                design the system, validate the approach, use AI to accelerate
                execution, and take responsibility for the product. That is the
                difference between AI-assisted engineering and simply generating
                code.
              </p>
            </div>
          </div>

          <div>
            <Eyebrow>What we want to build</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Building what comes next.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              We are interested in software that belongs to the next generation.
              We do not build technology only because it can be built. We want
              to understand why it should exist, what problem it solves, and
              how technology makes that solution better.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {nextWork.map((item) => (
                <li
                  key={item}
                  className="border border-border px-2.5 py-1 text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Eyebrow>Philosophy</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              How we decide what to build.
            </h2>
            <div className="mt-6 grid gap-8 border-t border-border pt-6 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-8">
              {aboutPhilosophy.map((item, index) => (
                <article key={item.title}>
                  <p className="font-mono text-[11px] font-medium tracking-[0.18em] text-muted-foreground tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-8 border-t border-border pt-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
            <div>
              <Eyebrow>Long term</Eyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                We are building miqode for the long term.
              </h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                miqode is not only a way to deliver projects. We want a company
                that keeps exploring new technology, solves meaningful problems,
                creates intelligent products, and eventually builds products of
                its own. We will describe those products as ours only when they
                exist.
              </p>
              <p className="text-base font-medium text-foreground/90">
                We are here to turn ambitious ideas into technology that can
                actually exist.
              </p>
            </div>
          </div>

          <div className="grid gap-8 border-t border-border pt-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
            <div>
              <Eyebrow>Starting a project</Eyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Three steps, then the real work.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                You do not need a specification. You need a problem worth
                solving and a way for us to reach you.
              </p>
              <ButtonLink href="/start" className="mt-6">
                Start a project
              </ButtonLink>
            </div>
            <ol className="space-y-5">
              {engagementSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-b border-border pb-5 last:border-b-0 last:pb-0"
                >
                  <span className="font-mono text-xs tracking-widest text-brand tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <Eyebrow>Studio</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Where to reach us.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              The studio is in {site.address.city}. Client work is not limited
              to the city — we work with teams wherever the product is. Phone
              and street details below are the public contact for the studio.
            </p>
            <div className="mt-6">
              <StudioFacts />
            </div>
          </div>

          <div className="border border-border bg-muted/40 p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight">
              How we talk about the work
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Case studies and testimonials appear when a client has agreed to
              them. Until then, this site describes the practice — the
              services, the process, and the people accountable for delivery.
              If you want references for a specific kind of system,{" "}
              <Link
                href="/start"
                className="text-foreground underline underline-offset-4"
              >
                start a project
              </Link>{" "}
              and ask. We will tell you what we have done, and what we have not.
            </p>
          </div>
        </Container>
      </Section>
      <CtaSection />
    </>
  );
}
