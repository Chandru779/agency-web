export function HeroVisual() {
  return (
    <div
      className="hero-visual relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-white/10 bg-ink/80 sm:aspect-[5/4] lg:aspect-square"
      aria-hidden="true"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 520 520"
        fill="none"
      >
        <path
          d="M70 160C140 160 150 250 250 250C350 250 360 360 450 360"
          className="hero-flow text-teal-400/50"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M90 380C160 380 180 220 280 220C380 220 390 120 460 120"
          className="text-white/20 hero-flow hero-flow-delayed"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle cx="70" cy="160" r="4" className="fill-teal-400/80" />
        <circle cx="250" cy="250" r="4" className="fill-white/70" />
        <circle cx="450" cy="360" r="4" className="fill-teal-400/80" />
        <circle cx="90" cy="380" r="3.5" className="fill-white/40" />
        <circle cx="280" cy="220" r="3.5" className="fill-white/40" />
        <circle cx="460" cy="120" r="3.5" className="fill-white/40" />
      </svg>

      <div className="hero-panel hero-panel-a absolute top-[9%] left-[8%] w-[min(58%,18rem)] rounded-md border border-white/12 bg-ink-soft/80 p-4 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-white/55 uppercase">
            Product surface
          </p>
          <span className="size-1.5 rounded-full bg-teal-400/80" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["Requests", "Latency", "Coverage"].map((label) => (
            <div
              key={label}
              className="rounded-sm border border-white/8 bg-white/3 px-2 py-2"
            >
              <p className="font-mono text-[11px] leading-none tracking-[0.08em] text-white/50 uppercase">
                {label}
              </p>
              <div className="mt-2 h-8">
                <svg viewBox="0 0 64 24" className="h-full w-full">
                  <path
                    d="M0 18 C10 16 14 8 22 10 C30 12 34 4 42 6 C50 8 54 14 64 8"
                    className="stroke-teal-300/70"
                    fill="none"
                    strokeWidth="1.4"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 h-16 overflow-hidden rounded-sm border border-white/8">
          <div className="flex h-full items-end gap-1 px-2 pb-2">
            {[32, 48, 28, 64, 40, 72, 36, 58, 44, 80, 52, 68].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-sm bg-white/12"
                  style={{ height: `${height}%` }}
                />
              ),
            )}
          </div>
        </div>
      </div>

      <div className="hero-panel hero-panel-b absolute top-[42%] right-[7%] w-[min(52%,16rem)] rounded-md border border-white/12 bg-ink/85 p-4 backdrop-blur-sm">
        <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-white/55 uppercase">
          System map
        </p>
        <ul className="mt-3 space-y-2 font-mono text-[11px] text-white/70">
          <li className="flex items-center justify-between border-b border-white/8 pb-2">
            <span>api.gateway</span>
            <span className="text-teal-300/80">ready</span>
          </li>
          <li className="flex items-center justify-between border-b border-white/8 pb-2">
            <span>auth.service</span>
            <span className="text-white/40">evented</span>
          </li>
          <li className="flex items-center justify-between">
            <span>data.platform</span>
            <span className="text-white/40">replicated</span>
          </li>
        </ul>
      </div>

      <div className="hero-panel hero-panel-c absolute right-[10%] bottom-[8%] left-[12%] max-w-[16rem] rounded-md border border-white/12 bg-ink/85 p-4 backdrop-blur-sm">
        <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-white/55 uppercase">
          Delivery
        </p>
        <div className="mt-3 space-y-2">
          {["Discover", "Architect", "Build"].map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-teal-300/80">
                0{index + 1}
              </span>
              <span className="text-xs text-white/80">{step}</span>
              <span className="ml-auto h-px flex-1 bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
