import type { ComponentProps } from "react";
import Link from "next/link";
import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "href"> &
  VariantProps<typeof buttonVariants> & {
    href: string;
  };

export function ButtonLink({
  href,
  variant = "default",
  size = "lg",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = cn(
    buttonVariants({ variant, size }),
    "h-11 rounded-md px-5 text-sm",
    className,
  );

  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
