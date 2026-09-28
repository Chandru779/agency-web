import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col justify-center px-5 py-24 sm:px-6 lg:px-8">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        This page is not here.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The URL may have changed, or it never existed. Head back to the agency
        site.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/start" variant="outline">
          Start a Project
        </ButtonLink>
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        Or browse{" "}
        <Link href="/services" className="underline underline-offset-4">
          services
        </Link>
        .
      </p>
    </div>
  );
}
