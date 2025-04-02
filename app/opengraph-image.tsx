import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const alt = "My Blog Website";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#1a365d",
        }}
      >
        My Amazing Blog
      </div>
    ),
    { ...size }
  );
}
