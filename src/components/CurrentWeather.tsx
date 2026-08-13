"use client";

import { describeWeather, type CurrentWeather, type GeoResult } from "@/lib/weather";

interface Props {
  city: GeoResult;
  current: CurrentWeather;
  timezone: string;
}

export default function CurrentWeatherCard({ city, current, timezone }: Props) {
  const condition = describeWeather(current.weatherCode, current.isDay);

  const localTime = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  }).format(new Date(current.time));

  return (
    <section className="animate-float-up glass rounded-3xl p-7 sm:p-9">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {city.name}
          </h1>
          <p className="mt-1 text-sm text-white/70">
            {[city.admin1, city.country].filter(Boolean).join(", ")}
          </p>
          <p className="mt-0.5 text-sm text-white/55">{localTime}</p>
        </div>
        <span className="text-6xl leading-none drop-shadow-lg sm:text-7xl">
          {condition.icon}
        </span>
      </div>

      <div className="mt-6 flex items-end gap-4">
        <span className="text-7xl font-extralight leading-none tracking-tighter sm:text-8xl">
          {current.temperature}°
        </span>
        <div className="mb-2">
          <p className="text-lg font-medium">{condition.label}</p>
          <p className="text-sm text-white/70">
            Feels like {current.apparentTemperature}°
          </p>
        </div>
      </div>
    </section>
  );
}
