import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <span className="sr-only">miqode</span>
      <span
        aria-hidden="true"
        className="inline-flex items-baseline font-heading text-[24px] leading-none font-medium tracking-tighter lowercase"
      >
        <span className="text-[1.06em] font-semibold tracking-[-0.07em]">m</span>
        <span>i</span>
        <span className="relative inline-block font-normal text-brand">
          q
          <span className="absolute bottom-px left-[0.72em] h-px w-[0.32em] bg-current" />
        </span>
        <span>ode</span>
      </span>
    </span>
  );
}
