import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { eyebrowClass } from "@/components/ui/eyebrow";
import { addressLines, footerNav, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0c0d0c] text-[#f4f4f2]">
      <Container className="pt-8 pb-6 sm:pt-10 sm:pb-8">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex rounded-sm text-background focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-background/40"
              aria-label="miqode home"
            >
              <Logo />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-background/70">
              {site.shortDescription} We help companies turn complex problems
              into software that is useful, maintainable, and ready to scale.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7 md:grid-cols-3">
            <div>
              <p className={`${eyebrowClass} text-background/55`}>Services</p>
              <ul className="mt-5 space-y-3">
                {footerNav.services.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-background/80 transition-colors hover:text-background focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-background/40"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={`${eyebrowClass} text-background/55`}>Company</p>
              <ul className="mt-5 space-y-3">
                {footerNav.company.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-background/80 transition-colors hover:text-background focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-background/40"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={`${eyebrowClass} text-background/55`}>Contact</p>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm text-background/80 transition-colors hover:text-background focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-background/40"
                  >
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={site.phoneHref}
                    className="text-sm text-background/80 transition-colors hover:text-background focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-background/40"
                  >
                    {site.phone}
                  </a>
                </li>
                {addressLines().map((line) => (
                  <li key={line} className="text-sm leading-6 text-background/70">
                    {line}
                  </li>
                ))}
                <li>
                  <Link
                    href="/start"
                    className="text-sm text-background/80 transition-colors hover:text-background focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-background/40"
                  >
                    Start a project
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-background/50">
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-background/50">
            Software engineering for startups and growing businesses.
          </p>
        </div>
      </Container>
    </footer>
  );
}
