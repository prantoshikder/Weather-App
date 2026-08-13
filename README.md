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

## 🚀 Getting started

```bash
npm install
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

## 📝 Notes

- Weather data: [Open-Meteo](https://open-meteo.com) (free, no key).
- Photography: [Unsplash](https://unsplash.com) (stable direct image URLs).
# Weather-App
