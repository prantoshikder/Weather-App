// Weather data layer powered by the free Open-Meteo API (no API key required).
// Docs: https://open-meteo.com/en/docs

export interface GeoResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string;
  timezone: string;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  weatherCode: number;
  isDay: boolean;
  uvIndex: number;
  precipitation: number;
  time: string;
}

export interface HourlyEntry {
  time: string;
  temperature: number;
  weatherCode: number;
  precipitationProbability: number;
}

export interface DailyEntry {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  sunrise: string;
  sunset: string;
  precipitationProbability: number;
}

export interface WeatherBundle {
  current: CurrentWeather;
  hourly: HourlyEntry[];
  daily: DailyEntry[];
  timezone: string;
}

export interface WeatherCondition {
  label: string;
  icon: string; // emoji used as a lightweight glyph
  group: WeatherGroup;
}

export type WeatherGroup =
  | "clear"
  | "clouds"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "thunder";

// WMO Weather interpretation codes mapped to friendly labels + glyphs.
const WEATHER_CODES: Record<number, Omit<WeatherCondition, "icon"> & { dayIcon: string; nightIcon: string }> = {
  0: { label: "Clear sky", group: "clear", dayIcon: "☀️", nightIcon: "🌙" },
  1: { label: "Mainly clear", group: "clear", dayIcon: "🌤️", nightIcon: "🌙" },
  2: { label: "Partly cloudy", group: "clouds", dayIcon: "⛅", nightIcon: "☁️" },
  3: { label: "Overcast", group: "clouds", dayIcon: "☁️", nightIcon: "☁️" },
  45: { label: "Fog", group: "fog", dayIcon: "🌫️", nightIcon: "🌫️" },
  48: { label: "Rime fog", group: "fog", dayIcon: "🌫️", nightIcon: "🌫️" },
  51: { label: "Light drizzle", group: "drizzle", dayIcon: "🌦️", nightIcon: "🌧️" },
  53: { label: "Drizzle", group: "drizzle", dayIcon: "🌦️", nightIcon: "🌧️" },
  55: { label: "Dense drizzle", group: "drizzle", dayIcon: "🌧️", nightIcon: "🌧️" },
  56: { label: "Freezing drizzle", group: "drizzle", dayIcon: "🌧️", nightIcon: "🌧️" },
  57: { label: "Freezing drizzle", group: "drizzle", dayIcon: "🌧️", nightIcon: "🌧️" },
  61: { label: "Light rain", group: "rain", dayIcon: "🌦️", nightIcon: "🌧️" },
  63: { label: "Rain", group: "rain", dayIcon: "🌧️", nightIcon: "🌧️" },
  65: { label: "Heavy rain", group: "rain", dayIcon: "🌧️", nightIcon: "🌧️" },
  66: { label: "Freezing rain", group: "rain", dayIcon: "🌧️", nightIcon: "🌧️" },
  67: { label: "Freezing rain", group: "rain", dayIcon: "🌧️", nightIcon: "🌧️" },
  71: { label: "Light snow", group: "snow", dayIcon: "🌨️", nightIcon: "🌨️" },
  73: { label: "Snow", group: "snow", dayIcon: "❄️", nightIcon: "❄️" },
  75: { label: "Heavy snow", group: "snow", dayIcon: "❄️", nightIcon: "❄️" },
  77: { label: "Snow grains", group: "snow", dayIcon: "🌨️", nightIcon: "🌨️" },
  80: { label: "Rain showers", group: "rain", dayIcon: "🌦️", nightIcon: "🌧️" },
  81: { label: "Rain showers", group: "rain", dayIcon: "🌧️", nightIcon: "🌧️" },
  82: { label: "Violent showers", group: "rain", dayIcon: "⛈️", nightIcon: "⛈️" },
  85: { label: "Snow showers", group: "snow", dayIcon: "🌨️", nightIcon: "🌨️" },
  86: { label: "Snow showers", group: "snow", dayIcon: "❄️", nightIcon: "❄️" },
  95: { label: "Thunderstorm", group: "thunder", dayIcon: "⛈️", nightIcon: "⛈️" },
  96: { label: "Thunderstorm + hail", group: "thunder", dayIcon: "⛈️", nightIcon: "⛈️" },
  99: { label: "Thunderstorm + hail", group: "thunder", dayIcon: "⛈️", nightIcon: "⛈️" },
};

export function describeWeather(code: number, isDay = true): WeatherCondition {
  const entry = WEATHER_CODES[code] ?? WEATHER_CODES[3];
  return {
    label: entry.label,
    group: entry.group,
    icon: isDay ? entry.dayIcon : entry.nightIcon,
  };
}

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export async function searchCities(query: string): Promise<GeoResult[]> {
  if (!query.trim()) return [];
  const url = `${GEO_URL}?name=${encodeURIComponent(query)}&count=6&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Could not search for cities");
  const data = await res.json();
  return (data.results ?? []) as GeoResult[];
}

export async function getWeather(lat: number, lon: number): Promise<WeatherBundle> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,uv_index,precipitation",
    hourly: "temperature_2m,weather_code,precipitation_probability",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max",
    timezone: "auto",
    forecast_days: "7",
  });

  const res = await fetch(`${FORECAST_URL}?${params.toString()}`);
  if (!res.ok) throw new Error("Could not load weather data");
  const data = await res.json();

  const c = data.current;
  const current: CurrentWeather = {
    temperature: Math.round(c.temperature_2m),
    apparentTemperature: Math.round(c.apparent_temperature),
    humidity: c.relative_humidity_2m,
    windSpeed: Math.round(c.wind_speed_10m),
    windDirection: c.wind_direction_10m,
    pressure: Math.round(c.surface_pressure),
    weatherCode: c.weather_code,
    isDay: c.is_day === 1,
    uvIndex: Math.round(c.uv_index ?? 0),
    precipitation: c.precipitation ?? 0,
    time: c.time,
  };

  const nowIndex = data.hourly.time.findIndex((t: string) => t >= c.time);
  const start = nowIndex === -1 ? 0 : nowIndex;
  const hourly: HourlyEntry[] = data.hourly.time
    .slice(start, start + 24)
    .map((time: string, i: number) => ({
      time,
      temperature: Math.round(data.hourly.temperature_2m[start + i]),
      weatherCode: data.hourly.weather_code[start + i],
      precipitationProbability: data.hourly.precipitation_probability[start + i] ?? 0,
    }));

  const daily: DailyEntry[] = data.daily.time.map((date: string, i: number) => ({
    date,
    weatherCode: data.daily.weather_code[i],
    tempMax: Math.round(data.daily.temperature_2m_max[i]),
    tempMin: Math.round(data.daily.temperature_2m_min[i]),
    sunrise: data.daily.sunrise[i],
    sunset: data.daily.sunset[i],
    precipitationProbability: data.daily.precipitation_probability_max[i] ?? 0,
  }));

  return { current, hourly, daily, timezone: data.timezone };
}

export function windDirectionLabel(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}
