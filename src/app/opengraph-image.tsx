import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social preview card, generated at build time. Kept to plain flex/inline
 * styles because Satori (the renderer behind ImageResponse) supports only a
 * subset of CSS — no Tailwind classes here.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #1e3a8a 0%, #0b1120 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div style={{ fontSize: 64 }}>🌤️</div>
          <div style={{ fontSize: 48, fontWeight: 600, letterSpacing: "-0.02em" }}>
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: "900px",
            }}
          >
            Live weather &amp; 7-day forecast
          </div>
          <div style={{ fontSize: 32, color: "rgba(255,255,255,0.72)", maxWidth: "900px" }}>
            {siteConfig.shortDescription}
          </div>
        </div>

        <div style={{ fontSize: 26, color: "rgba(255,255,255,0.5)" }}>
          Free · No sign-up · Powered by Open-Meteo
        </div>
      </div>
    ),
    size
  );
}
