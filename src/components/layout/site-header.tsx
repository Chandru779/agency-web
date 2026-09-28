"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { Menu } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigation } from "@/lib/site";
import { cn } from "@/lib/utils";

function subscribeToScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  window.addEventListener("resize", onStoreChange);
  return () => {
    window.removeEventListener("scroll", onStoreChange);
    window.removeEventListener("resize", onStoreChange);
  };
}

function getPastHeroSnapshot() {
  const hero = document.querySelector(".hero-atmosphere");
  const heroHeight =
    hero instanceof HTMLElement ? hero.offsetHeight : window.innerHeight;
  return window.scrollY >= heroHeight - 200;
}

function getPastHeroServerSnapshot() {
  return false;
}

export function SiteHeader() {
  const pathname = usePathname();
  const pastHero = useSyncExternalStore(
    subscribeToScroll,
    getPastHeroSnapshot,
    getPastHeroServerSnapshot,
  );
  const overlay = pathname === "/" && !pastHero;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-md transition-colors",
        overlay
          ? "border-transparent bg-[#0c0d0c]/50 text-[#f4f4f2]"
          : cn(
              "bg-background/95 text-foreground",
              pastHero || pathname !== "/" ? "border-border" : "border-transparent",
            ),
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 rounded-sm text-current transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-label="miqode home"
        >
          <Logo />
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {navigation.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  overlay
                    ? active
                      ? "text-[#f2f1ed]"
                      : "text-white/72 hover:text-[#f2f1ed]"
                    : active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href="/start"
            className={cn(
              "hidden sm:inline-flex",
              overlay && "bg-[#f2f1ed] text-ink hover:bg-white",
            )}
          >
            Start a Project
          </ButtonLink>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "lg:hidden",
                    overlay &&
                      "border-white/20 bg-transparent text-[#f2f1ed] hover:bg-white/10 hover:text-[#f2f1ed]",
                  )}
                  aria-label="Open menu"
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="flex h-full w-[min(100%,20rem)] flex-col p-0">
              <SheetHeader className="border-b border-border">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Logo />
              </SheetHeader>
              <nav className="flex flex-1 flex-col gap-1 p-4" aria-label="Mobile">
                {navigation.map((item) => (
                  <SheetClose
                    key={item.href}
                    render={
                      <Link
                        href={item.href}
                        className="rounded-md px-3 py-3 text-base text-foreground hover:bg-muted"
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto border-t border-border p-4">
                <ButtonLink href="/start" className="w-full">
                  Start a Project
                </ButtonLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
