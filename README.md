# 🌤️ Aura — Modern Weather App

A sleek, modern weather application built with **Next.js 15 (App Router)**, **React 19**,
**TypeScript**, and **Tailwind CSS v4**. It features live forecasts and beautiful,
condition-aware Unsplash photography that changes with the weather and time of day.

## ✨ Features

- **Live weather** via the free [Open-Meteo API](https://open-meteo.com) — no API key required.
- **City search** with debounced autocomplete (geocoding).
- **Use my location** button (browser geolocation + reverse geocoding).
- **Current conditions**: temperature, feels-like, humidity, wind, UV index, pressure, precipitation.
- **Next 24 hours** horizontal hourly strip.
- **7-day forecast** with min/max temperature range bars.
- **Dynamic backgrounds**: curated high-quality Unsplash photos selected by weather
  condition and day/night, with a smooth cross-fade and readability overlay.
- **Glassmorphism UI**, responsive layout, and subtle entrance animations.
- **SEO ready**: canonical URL, Open Graph/Twitter cards, generated social image,
  `robots.txt`, `sitemap.xml`, PWA manifest and JSON-LD structured data.

## 🚀 Getting started

```bash
npm install
cp .env.example .env.local   # then set NEXT_PUBLIC_SITE_URL
npm run dev      # start the dev server at http://localhost:3000
```

Build for production:

```bash
npm run build
npm run start
```

## 🧱 Project structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout + metadata
│   ├── page.tsx          # Main page (state, data fetching, geolocation)
│   └── globals.css       # Tailwind + glass/animation utilities
├── components/
│   ├── Background.tsx     # Cross-fading Unsplash background + overlay
│   ├── SearchBar.tsx      # Debounced city search + location button
│   ├── CurrentWeather.tsx # Hero current-conditions card
│   ├── WeatherDetails.tsx # Detail metric tiles
│   ├── HourlyForecast.tsx # 24-hour strip
│   └── DailyForecast.tsx  # 7-day forecast with range bars
└── lib/
    ├── weather.ts         # Open-Meteo client + WMO weather-code mapping
    └── unsplash.ts        # Condition → background image/overlay mapping
```

## 🔍 SEO

All SEO values live in one place — `src/lib/site.ts` (name, title, description,
keywords, author). Edit that file and every consumer updates:

| Route / file | What it does |
| --- | --- |
| `app/layout.tsx` | Title template, description, keywords, canonical, OG + Twitter tags, robots directives, `WebApplication` / `WebSite` JSON-LD |
| `app/robots.ts` | `/robots.txt` with the sitemap reference |
| `app/sitemap.ts` | `/sitemap.xml` |
| `app/manifest.ts` | `/manifest.webmanifest` for installable PWA |
| `app/opengraph-image.tsx` | 1200×630 social card, generated at build time |
| `components/SeoContent.tsx` | Crawlable intro copy + FAQ with `FAQPage` JSON-LD |

> **Important:** set `NEXT_PUBLIC_SITE_URL` to your real domain before
> deploying. Without it, canonical URLs, OG images and the sitemap fall back to
> `http://localhost:3000`.

After deploying, submit `https://your-domain.com/sitemap.xml` in Google Search
Console and validate the structured data with the
[Rich Results Test](https://search.google.com/test/rich-results).

## 📝 Notes

- Weather data: [Open-Meteo](https://open-meteo.com) (free, no key).
- Photography: [Unsplash](https://unsplash.com) (stable direct image URLs).
- The forecast is fetched in the browser, so it is not part of the server-rendered
  HTML. `SeoContent` provides the static text crawlers index.
# Weather-App
