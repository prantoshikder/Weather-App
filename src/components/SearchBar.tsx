"use client";

import { useEffect, useRef, useState } from "react";
import { searchCities, type GeoResult } from "@/lib/weather";

interface Props {
  onSelect: (city: GeoResult) => void;
  onUseLocation: () => void;
  loadingLocation: boolean;
}

export default function SearchBar({ onSelect, onUseLocation, loadingLocation }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoResult[]>([]);
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Debounced city lookup.
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const id = setTimeout(async () => {
      setSearching(true);
      try {
        const found = await searchCities(query);
        setResults(found);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => clearTimeout(id);
  }, [query]);

  // Close the dropdown when clicking outside.
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function choose(city: GeoResult) {
    onSelect(city);
    setQuery("");
    setResults([]);
    setOpen(false);
  }

  return (
    <div ref={boxRef} className="relative w-full max-w-xl">
      <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
        <svg
          className="h-5 w-5 shrink-0 text-white/70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" strokeLinecap="round" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length && setOpen(true)}
          placeholder="Search for a city…"
          className="w-full bg-transparent text-base text-white placeholder-white/50 outline-none"
        />
        <button
          onClick={onUseLocation}
          title="Use my location"
          className="shrink-0 rounded-xl bg-white/15 p-2 text-white/90 transition hover:bg-white/25"
        >
          {loadingLocation ? (
            <span className="block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (results.length > 0 || searching) && (
        <div className="glass-strong custom-scroll absolute z-20 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl">
          {searching && results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-white/70">Searching…</div>
          ) : (
            results.map((city) => (
              <button
                key={city.id}
                onClick={() => choose(city)}
                className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left transition hover:bg-white/15"
              >
                <span className="font-medium text-white">{city.name}</span>
                <span className="text-sm text-white/60">
                  {[city.admin1, city.country].filter(Boolean).join(", ")}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
