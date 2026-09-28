import { ImageResponse } from "next/og";

import { mqMarkPaths } from "@/components/brand/mq-paths";

export const alt = "miqode — We build software that moves businesses forward.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0d0c",
          color: "#f4f4f2",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
            <path
              d={mqMarkPaths.stem}
              stroke="#f4f4f2"
              strokeWidth="2.15"
              strokeLinejoin="miter"
              strokeLinecap="square"
              strokeMiterlimit="2.4"
            />
            <path
              d={mqMarkPaths.bowl}
              stroke="#f4f4f2"
              strokeWidth="2.15"
              strokeLinecap="square"
            />
            <path
              d={mqMarkPaths.tail}
              stroke="#f4f4f2"
              strokeWidth="2.15"
              strokeLinecap="square"
            />
          </svg>
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              letterSpacing: "-0.05em",
              fontFamily: "sans-serif",
            }}
          >
            miqode
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.1,
              fontWeight: 600,
              fontFamily: "sans-serif",
              maxWidth: 900,
              letterSpacing: "-0.03em",
            }}
          >
            We build software that moves businesses forward.
          </div>
          <div
            style={{
              fontSize: 24,
              color: "rgba(244,244,242,0.62)",
              fontFamily: "sans-serif",
              maxWidth: 760,
            }}
          >
            Software engineering partner for startups and growing businesses.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
