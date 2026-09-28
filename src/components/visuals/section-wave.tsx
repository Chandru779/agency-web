type SectionWaveProps = {
  variant?: "exit" | "enter";
};

export const heroWaveBand = "h-[clamp(8rem,22vw,13rem)]";

const curve =
  "M0 108 C240 118 480 112 700 82 C920 50 1120 32 1280 36 C1360 38 1410 52 1440 64";

export function SectionWave({ variant = "exit" }: SectionWaveProps) {
  return (
    <div
      className={
        variant === "exit"
          ? `pointer-events-none absolute inset-x-0 bottom-0 z-20 ${heroWaveBand}`
          : "pointer-events-none absolute inset-x-0 top-0 z-20 h-[clamp(3.25rem,7vw,5rem)]"
      }
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
      >
        {variant === "exit" ? (
          <path d={`${curve} L1440 180 L0 180 Z`} fill="var(--background)" />
        ) : (
          <path
            d="M0 0 L1440 0 L1440 64 C1410 52 1360 38 1280 36 C1120 32 920 50 700 82 C480 112 240 118 0 108 Z"
            fill="var(--background)"
          />
        )}
      </svg>
    </div>
  );
}
