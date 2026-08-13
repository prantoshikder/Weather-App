const LOCAL_URL = "http://localhost:3000";

/**
 * Resolve the public origin, in order of preference:
 *   1. NEXT_PUBLIC_SITE_URL — your own domain
 *   2. the Vercel production domain, then the per-deployment domain
 *   3. localhost
 *
 * Every candidate is treated as unset when blank. A variable that exists but
 * holds an empty string is the common case on hosting dashboards, and `??`
 * would happily pass "" straight through to `new URL()` — which throws
 * ERR_INVALID_URL and fails the build while collecting page data.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;
    // Vercel supplies a bare host ("my-app.vercel.app") with no protocol.
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    try {
      return new URL(withProtocol).origin;
    } catch {
      // Malformed value — fall through rather than break the build.
    }
  }

  return LOCAL_URL;
}

/**
 * Central place for the values that feed metadata, sitemap, robots, manifest
 * and structured data. Set NEXT_PUBLIC_SITE_URL in production so canonical
 * URLs, OG images and the sitemap point at the real domain.
 */
export const siteConfig = {
  name: "Aura",
  title: "Aura — Live Weather Forecast & 7-Day Outlook",
  shortDescription:
    "Live weather, hourly updates and a 7-day forecast for any city in the world.",
  description:
    "Aura is a fast, free weather app with live conditions, an hourly outlook and a 7-day forecast for any city — plus feels-like temperature, humidity, wind, UV index and precipitation. No sign-up, no API key.",
  url: resolveSiteUrl(),
  locale: "en_US",
  themeColor: "#0b1120",
  keywords: [
    "weather",
    "weather app",
    "weather forecast",
    "live weather",
    "hourly forecast",
    "7 day forecast",
    "temperature today",
    "local weather",
    "UV index",
    "wind speed",
    "precipitation",
  ],
  author: {
    name: "Pranto Shikder",
    // The canonical identity link — portfolio first, profiles as `sameAs`.
    url: "https://prantoshikder.vercel.app",
    github: "https://github.com/prantoshikder",
  },
  repo: "https://github.com/prantoshikder/Weather-App",
  sources: [
    {
      name: "Open-Meteo",
      url: "https://open-meteo.com",
      description: "Weather data",
    },
    {
      name: "Unsplash",
      url: "https://unsplash.com",
      description: "Photography",
    },
  ],
} as const;

/** Absolute URL helper — metadata and the sitemap need fully-qualified links. */
export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
