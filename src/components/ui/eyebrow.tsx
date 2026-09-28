import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const eyebrowClass =
  "font-mono text-[11px] font-medium tracking-[0.18em] uppercase";

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn(eyebrowClass, "text-brand", className)}>{children}</p>
  );
}
