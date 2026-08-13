"use client";

import { describeWeather, type DailyEntry } from "@/lib/weather";

interface Props {
  daily: DailyEntry[];
  timezone: string;
}

export default function DailyForecast({ daily, timezone }: Props) {
  // Overall range across the week to scale the temperature bars.
  const min = Math.min(...daily.map((d) => d.tempMin));
  const max = Math.max(...daily.map((d) => d.tempMax));
  const span = Math.max(max - min, 1);

  return (
    <section className="glass rounded-3xl p-5">
      <h2 className="mb-3 px-1 text-sm font-semibold uppercase tracking-wide text-white/70">
        7-day forecast
      </h2>
      <div className="flex flex-col">
        {daily.map((d, i) => {
          const cond = describeWeather(d.weatherCode, true);
          const day =
            i === 0
              ? "Today"
              : new Intl.DateTimeFormat("en-US", {
                  weekday: "short",
                  timeZone: timezone,
                }).format(new Date(d.date));
          const left = ((d.tempMin - min) / span) * 100;
          const width = ((d.tempMax - d.tempMin) / span) * 100;
          return (
            <div
              key={d.date}
              className="grid grid-cols-[3.5rem_2rem_1fr] items-center gap-3 border-t border-white/10 py-3 first:border-t-0 sm:grid-cols-[4.5rem_2.5rem_1fr]"
            >
              <span className="text-sm font-medium text-white/85">{day}</span>
              <span className="text-xl" title={cond.label}>
                {cond.icon}
              </span>
              <div className="flex items-center gap-3">
                <span className="w-8 text-right text-sm text-white/55">
                  {d.tempMin}°
                </span>
                <div className="relative h-1.5 flex-1 rounded-full bg-white/15">
                  <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-sky-300 to-amber-300"
                    style={{ left: `${left}%`, width: `${Math.max(width, 6)}%` }}
                  />
                </div>
                <span className="w-8 text-sm font-medium">{d.tempMax}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
