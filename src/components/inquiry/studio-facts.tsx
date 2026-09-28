import { addressLines, site } from "@/lib/site";

const facts = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Phone", value: site.phone, href: site.phoneHref },
  { label: "Hours", value: site.hours },
  { label: "Response", value: site.responseTime },
] as const;

export function StudioFacts() {
  const lines = addressLines();

  return (
    <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
      {facts.map((fact) => (
        <div key={fact.label} className="bg-background px-5 py-5 sm:px-6">
          <p className="font-mono text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
            {fact.label}
          </p>
          {"href" in fact ? (
            <a
              href={fact.href}
              className="mt-2 block text-sm text-foreground underline-offset-4 hover:underline"
            >
              {fact.value}
            </a>
          ) : (
            <p className="mt-2 text-sm text-foreground">{fact.value}</p>
          )}
        </div>
      ))}
      <div className="bg-background px-5 py-5 sm:col-span-2 sm:px-6">
        <p className="font-mono text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Studio
        </p>
        <address className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-foreground not-italic">
          {lines.map((line, index) => (
            <span key={line} className="inline-flex items-baseline gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-muted-foreground">
                  ·
                </span>
              ) : null}
              {line}
            </span>
          ))}
        </address>
      </div>
    </div>
  );
}
