// Curated, high-quality Unsplash photographs mapped to weather conditions.
// Using stable direct image URLs (images.unsplash.com) means no API key is
// required and the photos are guaranteed to load with optimized sizing.
import type { WeatherGroup } from "./weather";

type TimeOfDay = "day" | "night";

const UNSPLASH_PARAMS = "?auto=format&fit=crop&w=2000&q=80";

const BACKGROUNDS: Record<WeatherGroup, Record<TimeOfDay, string>> = {
  clear: {
    day: "https://images.unsplash.com/photo-1601297183305-6df142704ea2",
    night: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a",
  },
  clouds: {
    day: "https://images.unsplash.com/photo-1505533321630-975218a5f66f",
    night: "https://images.unsplash.com/photo-1499956827185-0d63ee78a910",
  },
  fog: {
    day: "https://images.unsplash.com/photo-1487621167305-5d248087c724",
    night: "https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee",
  },
  drizzle: {
    day: "https://images.unsplash.com/photo-1556485689-33e55ab56127",
    night: "https://images.unsplash.com/photo-1428592953211-077101b2021b",
  },
  rain: {
    day: "https://images.unsplash.com/photo-1519692933481-e162a57d6721",
    night: "https://images.unsplash.com/photo-1501691223387-dd0500403074",
  },
  snow: {
    day: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d",
    night: "https://images.unsplash.com/photo-1547754980-3df97fed72a8",
  },
  thunder: {
    day: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28",
    night: "https://images.unsplash.com/photo-1429552077091-836152271555",
  },
};

export function backgroundFor(group: WeatherGroup, isDay: boolean): string {
  const tod: TimeOfDay = isDay ? "day" : "night";
  return `${BACKGROUNDS[group][tod]}${UNSPLASH_PARAMS}`;
}

// A soft color overlay (gradient) layered on top of the photo so foreground
// text stays readable across every condition.
export function overlayFor(group: WeatherGroup, isDay: boolean): string {
  if (!isDay) {
    return "linear-gradient(160deg, rgba(8,12,30,0.55) 0%, rgba(8,12,30,0.82) 100%)";
  }
  const tints: Record<WeatherGroup, string> = {
    clear: "linear-gradient(160deg, rgba(28,80,150,0.35) 0%, rgba(10,30,70,0.72) 100%)",
    clouds: "linear-gradient(160deg, rgba(40,55,80,0.45) 0%, rgba(15,25,45,0.78) 100%)",
    fog: "linear-gradient(160deg, rgba(60,70,85,0.45) 0%, rgba(25,35,50,0.8) 100%)",
    drizzle: "linear-gradient(160deg, rgba(30,50,80,0.5) 0%, rgba(12,25,45,0.82) 100%)",
    rain: "linear-gradient(160deg, rgba(20,40,70,0.55) 0%, rgba(8,18,38,0.85) 100%)",
    snow: "linear-gradient(160deg, rgba(70,90,120,0.4) 0%, rgba(20,35,60,0.78) 100%)",
    thunder: "linear-gradient(160deg, rgba(25,25,50,0.6) 0%, rgba(8,8,25,0.88) 100%)",
  };
  return tints[group];
}
