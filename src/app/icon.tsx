import { ImageResponse } from "next/og";

import { mqMarkPaths } from "@/components/brand/mq-paths";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0d0c",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
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
      </div>
    ),
    { ...size },
  );
}
