"use client";

import SearchBar from "@/components/SearchBar";
import { useUnits } from "@/components/UnitsProvider";
import { siteConfig } from "@/lib/site";
import type { GeoResult } from "@/lib/weather";
import { useEffect, useState } from "react";

interface Props {
  onSelect: (city: GeoResult) => void;
  onUseLocation: () => void;
  loadingLocation: boolean;
  onRefresh: () => void;
  refreshing: boolean;
}

export default function Header({
  onSelect,
  onUseLocation,
  loadingLocation,
  onRefresh,
  refreshing,
}: Props) {
  // Give the bar a solid backdrop once the page scrolls under it, so the
  // search field stays readable over bright background photos.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 -mx-4 px-4 py-3 transition-colors duration-300 sm:-mx-6 sm:px-6 ${
        scrolled ? "bg-slate-950/40 backdrop-blur-xl" : ""
      }`}
    >
      <a
        href="#main-content"
        className="sr-only rounded-lg bg-white px-4 py-2 font-medium text-slate-900 focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-40"
      >
        Skip to forecast
      </a>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 sm:flex-row sm:gap-5">
        {/* The page's single h1 — the visible mark plus a crawlable summary. */}
        <h1 className="flex shrink-0 items-center gap-2 self-start sm:self-auto">
          <span className="text-2xl" aria-hidden="true">
            🌤️
          </span>
          <span className="text-xl font-semibold tracking-tight">
            {siteConfig.name}
          </span>
          <span className="sr-only">
            — live weather forecast, hourly updates and a 7-day outlook for any
            city
          </span>
        </h1>

        <div className="flex w-full items-center gap-2 sm:justify-end">
          <SearchBar
            onSelect={onSelect}
            onUseLocation={onUseLocation}
            loadingLocation={loadingLocation}
          />
          <RefreshButton onRefresh={onRefresh} refreshing={refreshing} />
          <UnitToggle />
        </div>
      </div>
    </header>
  );
}

function RefreshButton({
  onRefresh,
  refreshing,
}: {
  onRefresh: () => void;
  refreshing: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onRefresh}
      disabled={refreshing}
      title="Refresh forecast"
      aria-label="Refresh forecast"
      className="glass grid h-[50px] w-[50px] shrink-0 place-items-center rounded-2xl text-white/85 transition hover:bg-white/20 disabled:opacity-60"
    >
      <svg
        className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M21 12a9 9 0 1 1-2.64-6.36" />
        <path d="M21 3v6h-6" />
      </svg>
    </button>
  );
}

function UnitToggle() {
  const { system, setSystem } = useUnits();

  return (
    <div
      role="group"
      aria-label="Temperature units"
      className="glass flex h-[50px] shrink-0 items-center rounded-2xl p-1"
    >
      {(
        [
          { value: "metric", label: "°C", title: "Celsius, km/h" },
          { value: "imperial", label: "°F", title: "Fahrenheit, mph" },
        ] as const
      ).map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setSystem(option.value)}
          title={option.title}
          aria-pressed={system === option.value}
          className={`h-full rounded-xl px-3 text-sm font-medium transition ${
            system === option.value
              ? "bg-white/25 text-white"
              : "text-white/60 hover:text-white/90"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
