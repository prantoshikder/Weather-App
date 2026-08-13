"use client";

import { describeWeather, type HourlyEntry } from "@/lib/weather";

interface Props {
  hourly: HourlyEntry[];
  timezone: string;
}

export default function HourlyForecast({ hourly, timezone }: Props) {
  return (
    <section className="glass rounded-3xl p-5">
      <h2 className="mb-4 px-1 text-sm font-semibold uppercase tracking-wide text-white/70">
        Next 24 hours
      </h2>
      <div className="custom-scroll flex gap-3 overflow-x-auto pb-2">
        {hourly.map((h, i) => {
          const cond = describeWeather(h.weatherCode, true);
          const hour =
            i === 0
              ? "Now"
              : new Intl.DateTimeFormat("en-US", {
                  hour: "numeric",
                  timeZone: timezone,
                }).format(new Date(h.time));
          return (
            <div
              key={h.time}
              className="flex min-w-[68px] flex-col items-center gap-2 rounded-2xl bg-white/10 px-3 py-4 text-center"
            >
              <span className="text-xs text-white/70">{hour}</span>
              <span className="text-2xl">{cond.icon}</span>
              <span className="text-base font-medium">{h.temperature}°</span>
              {h.precipitationProbability > 0 && (
                <span className="text-[11px] text-sky-300">
                  {h.precipitationProbability}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
