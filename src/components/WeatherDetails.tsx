"use client";

import { useUnits } from "@/components/UnitsProvider";
import {
  formatPrecipitation,
  formatPressure,
  formatTemp,
  formatWind,
} from "@/lib/units";
import { windDirectionLabel, type CurrentWeather } from "@/lib/weather";

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="glass flex items-center gap-3 rounded-2xl p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15 text-white/90">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-white/55">{label}</p>
        <p className="truncate text-lg font-medium">{value}</p>
      </div>
    </div>
  );
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export default function WeatherDetails({ current }: { current: CurrentWeather }) {
  const { system } = useUnits();

  const items = [
    {
      label: "Feels like",
      value: formatTemp(current.apparentTemperature, system),
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" {...stroke}>
          <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
        </svg>
      ),
    },
    {
      label: "Humidity",
      value: `${current.humidity}%`,
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" {...stroke}>
          <path d="M12 2.7s6 6.3 6 10.3a6 6 0 0 1-12 0c0-4 6-10.3 6-10.3z" />
        </svg>
      ),
    },
    {
      label: "Wind",
      value: `${formatWind(current.windSpeed, system)} ${windDirectionLabel(current.windDirection)}`,
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" {...stroke}>
          <path d="M3 8h11a3 3 0 1 0-3-3M3 16h15a3 3 0 1 1-3 3" />
        </svg>
      ),
    },
    {
      label: "UV index",
      value: `${current.uvIndex}`,
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" {...stroke}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
        </svg>
      ),
    },
    {
      label: "Pressure",
      value: formatPressure(current.pressure, system),
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" {...stroke}>
          <path d="M12 21a9 9 0 1 0-9-9" />
          <path d="M12 12 8 8" />
        </svg>
      ),
    },
    {
      label: "Precipitation",
      value: formatPrecipitation(current.precipitation, system),
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" {...stroke}>
          <path d="M16 13a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.5 1.5A3.5 3.5 0 0 0 6 13" />
          <path d="M8 18v2M12 18v3M16 18v2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((it) => (
        <Detail key={it.label} {...it} />
      ))}
    </section>
  );
}
