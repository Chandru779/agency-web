import { cn } from "@/lib/utils";

const cx = 146;
const slabW = 98;
const slabH = 18;

const layers = [
  { label: "Day one", y: 150 },
  { label: "Launch", y: 208 },
  { label: "Scale", y: 266 },
] as const;

const signals = [
  [64, 54],
  [116, 34],
  [176, 58],
  [228, 40],
] as const;

function slabFace(y: number) {
  return `M ${cx - slabW} ${y} L ${cx} ${y - slabH} L ${cx + slabW} ${y} L ${cx} ${y + slabH} Z`;
}

function slabLip(y: number) {
  const t = 6;
  return `M ${cx - slabW} ${y} L ${cx} ${y + slabH} L ${cx + slabW} ${y} L ${cx + slabW} ${y + t} L ${cx} ${y + slabH + t} L ${cx - slabW} ${y + t} Z`;
}

export function PositioningVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-360/304 w-full max-w-88",
        className,
      )}
      aria-hidden="true"
    >
      <div className="positioning-grid pointer-events-none absolute inset-0" />
      <svg
        viewBox="48 8 360 304"
        className="relative size-full overflow-visible"
        fill="none"
      >
        <path
          d="M64 54 C 88 72, 98 22, 116 34 C 140 50, 154 74, 176 58 C 198 42, 210 28, 228 40"
          className="stroke-foreground/25"
          strokeWidth="1"
        />
        <path
          d="M84 76 C 124 46, 158 80, 206 62"
          className="stroke-foreground/18"
          strokeWidth="1"
        />
        <path
          d="M116 34 C 126 64, 138 84, 146 104"
          className="stroke-brand/45"
          strokeWidth="1"
        />
        <path
          d="M176 58 C 166 76, 156 90, 146 104"
          className="stroke-brand/45"
          strokeWidth="1"
        />

        {layers.map((layer) => (
          <path
            key={`${layer.label}-lip`}
            d={slabLip(layer.y)}
            className="fill-foreground/5"
          />
        ))}
        {layers.map((layer) => (
          <path
            key={`${layer.label}-face`}
            d={slabFace(layer.y)}
            className="fill-background stroke-foreground/28"
            strokeWidth="1"
          />
        ))}

        <path
          d={`M${cx} 104 V294`}
          className="stroke-foreground/15"
          strokeWidth="1"
        />
        <path
          d={`M${cx} 104 V294`}
          className="positioning-flow stroke-brand"
          strokeWidth="1.25"
        />

        {signals.map(([x, y]) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="3.5"
            className="fill-background stroke-foreground/45"
            strokeWidth="1"
          />
        ))}

        <circle cx={cx} cy="104" r="3.25" className="fill-brand" />
        {layers.map((layer) => (
          <circle
            key={`${layer.label}-node`}
            cx={cx}
            cy={layer.y}
            r="3"
            className="fill-background stroke-brand"
            strokeWidth="1.25"
          />
        ))}
        <circle cx={cx} cy="294" r="2.25" className="fill-brand/80" />

        {layers.map((layer) => (
          <g key={layer.label}>
            <path
              d={`M${cx + slabW} ${layer.y} H318`}
              className="stroke-foreground/20"
              strokeWidth="1"
            />
            <text
              x="326"
              y={layer.y}
              dominantBaseline="middle"
              fontSize="12"
              letterSpacing="1.6"
              className="fill-muted-foreground font-mono uppercase"
            >
              {layer.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
