// Open-Meteo is queried in metric, so every value in `WeatherBundle` is °C,
// km/h, mm and hPa. Conversion happens at display time only — never in state —
// so switching units can't drift the underlying data.

export type UnitSystem = "metric" | "imperial";

export const UNIT_STORAGE_KEY = "aura:units";

export function isUnitSystem(value: unknown): value is UnitSystem {
  return value === "metric" || value === "imperial";
}

/** Rounded temperature in the active system, as a number. */
export function convertTemp(celsius: number, system: UnitSystem): number {
  return Math.round(system === "imperial" ? celsius * (9 / 5) + 32 : celsius);
}

/** `21°` — degree sign only, for dense readouts like the hourly strip. */
export function formatTemp(celsius: number, system: UnitSystem): string {
  return `${convertTemp(celsius, system)}°`;
}

/** `21°C` — with the scale letter, for headline figures. */
export function formatTempWithUnit(celsius: number, system: UnitSystem): string {
  return `${convertTemp(celsius, system)}°${system === "imperial" ? "F" : "C"}`;
}

export function formatWind(kmh: number, system: UnitSystem): string {
  return system === "imperial"
    ? `${Math.round(kmh * 0.621371)} mph`
    : `${Math.round(kmh)} km/h`;
}

export function formatPrecipitation(mm: number, system: UnitSystem): string {
  return system === "imperial"
    ? `${(mm * 0.0393701).toFixed(2)} in`
    : `${mm} mm`;
}

export function formatPressure(hPa: number, system: UnitSystem): string {
  return system === "imperial"
    ? `${(hPa * 0.02953).toFixed(2)} inHg`
    : `${hPa} hPa`;
}
