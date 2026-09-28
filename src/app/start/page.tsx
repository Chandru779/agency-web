import type { Metadata } from "next";
import Link from "next/link";

import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { StudioFacts } from "@/components/inquiry/studio-facts";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { engagementSteps } from "@/content/leadership";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Tell miqode what you are building. Share your email and phone number and we reply within one business day.",
  alternates: { canonical: "/start" },
};

export default function StartPage() {
  return (
    <>
      <PageHero
        eyebrow="Start a project"
        title="Tell us what you are building."
        description="A short brief is enough. The note below is ready to edit. Add how we should reach you, and we will reply with a clear next step."
      />
      <Section>
        <Container className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <InquiryForm id="start-project" variant="page" />
          <aside className="space-y-8 lg:sticky lg:top-24">
            <div>
              <Eyebrow>What happens next</Eyebrow>
              <ol className="mt-5 space-y-5">
                {engagementSteps.map((step, index) => (
                  <li key={step.title} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                    <span className="font-mono text-xs tracking-widest text-brand tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-sm font-semibold tracking-tight">
                        {step.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <StudioFacts />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Prefer to read how we work first?{" "}
              <Link href="/process" className="text-foreground underline underline-offset-4">
                See the process
              </Link>
              . Questions about the studio are on the{" "}
              <Link href="/about" className="text-foreground underline underline-offset-4">
                about page
              </Link>
              . You can also write {site.email} directly.
            </p>
          </aside>
        </Container>
      </Section>
    </>
  );
}
