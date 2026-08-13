"use client";

import { useCallback, useEffect, useState } from "react";
import {
  describeWeather,
  getWeather,
  type GeoResult,
  type WeatherBundle,
} from "@/lib/weather";
import Background from "@/components/Background";
import SearchBar from "@/components/SearchBar";
import CurrentWeatherCard from "@/components/CurrentWeather";
import WeatherDetails from "@/components/WeatherDetails";
import HourlyForecast from "@/components/HourlyForecast";
import DailyForecast from "@/components/DailyForecast";

const DEFAULT_CITY: GeoResult = {
  id: 2643743,
  name: "London",
  latitude: 51.5074,
  longitude: -0.1278,
  country: "United Kingdom",
  country_code: "GB",
  admin1: "England",
  timezone: "Europe/London",
};

export default function Home() {
  const [city, setCity] = useState<GeoResult>(DEFAULT_CITY);
  const [weather, setWeather] = useState<WeatherBundle | null>(null);
  const [loading, setLoading] = useState(true);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (target: GeoResult) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(target.latitude, target.longitude);
      setWeather(data);
      setCity(target);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  // Resolve a position into a city via reverse geocoding, then load weather.
  const loadByCoords = useCallback(
    async (latitude: number, longitude: number) => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?latitude=${latitude}&longitude=${longitude}&count=1&language=en&format=json`
        );
        const data = await res.json();
        const place = data.results?.[0];
        await load({
          id: place?.id ?? 0,
          name: place?.name ?? "My location",
          latitude,
          longitude,
          country: place?.country ?? "",
          country_code: place?.country_code ?? "",
          admin1: place?.admin1,
          timezone: place?.timezone ?? "auto",
        });
      } catch {
        await load({
          ...DEFAULT_CITY,
          id: 0,
          name: "My location",
          latitude,
          longitude,
          country: "",
          admin1: undefined,
        });
      }
    },
    [load]
  );

  // Request the device location. `silent` skips error UI / fallback for the
  // initial auto-detect, where we quietly fall back to the default city.
  const useLocation = useCallback(
    (silent = false) => {
      if (!navigator.geolocation) {
        if (silent) load(DEFAULT_CITY);
        else setError("Geolocation is not supported by your browser");
        return;
      }
      setLocating(true);
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          await loadByCoords(pos.coords.latitude, pos.coords.longitude);
          setLocating(false);
        },
        () => {
          setLocating(false);
          if (silent) load(DEFAULT_CITY);
          else setError("Unable to retrieve your location");
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 }
      );
    },
    [load, loadByCoords]
  );

  // On first load, try to center on the user's current location automatically.
  useEffect(() => {
    useLocation(true);
  }, [useLocation]);

  const group = weather
    ? describeWeather(weather.current.weatherCode, weather.current.isDay).group
    : "clear";
  const isDay = weather?.current.isDay ?? true;

  return (
    <>
      <Background group={group} isDay={isDay} />

      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
        <header className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-2xl">🌤️</span>
            <span className="text-xl font-semibold tracking-tight">Aura</span>
          </div>
          <SearchBar
            onSelect={load}
            onUseLocation={() => useLocation(false)}
            loadingLocation={locating}
          />
        </header>

        {error && (
          <div className="glass rounded-2xl border-red-300/30 bg-red-500/15 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        )}

        {loading && !weather ? (
          <LoadingState />
        ) : weather ? (
          <div className="flex flex-col gap-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <CurrentWeatherCard
                city={city}
                current={weather.current}
                timezone={weather.timezone}
              />
              <div className="flex flex-col justify-center">
                <WeatherDetails current={weather.current} />
              </div>
            </div>

            <HourlyForecast hourly={weather.hourly} timezone={weather.timezone} />
            <DailyForecast daily={weather.daily} timezone={weather.timezone} />
          </div>
        ) : null}

        <footer className="mt-auto pt-6 text-center text-xs text-white/50">
          Weather by Open-Meteo · Photography by Unsplash
        </footer>
      </main>
    </>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col gap-6">
      <div className="glass h-56 animate-pulse rounded-3xl" />
      <div className="glass h-40 animate-pulse rounded-3xl" />
      <div className="glass h-72 animate-pulse rounded-3xl" />
    </div>
  );
}
