"use client";

import { useEffect, useState } from "react";
import { backgroundFor, overlayFor } from "@/lib/unsplash";
import type { WeatherGroup } from "@/lib/weather";

interface Props {
  group: WeatherGroup;
  isDay: boolean;
}

// Layered background: a condition-aware Unsplash photo with a smooth cross-fade,
// plus a gradient overlay that keeps foreground content readable.
export default function Background({ group, isDay }: Props) {
  const url = backgroundFor(group, isDay);
  const overlay = overlayFor(group, isDay);
  const [layers, setLayers] = useState<string[]>([url]);

  useEffect(() => {
    setLayers((prev) => {
      if (prev[prev.length - 1] === url) return prev;
      return [...prev.slice(-1), url];
    });
  }, [url]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0b1120]">
      {layers.map((layer, i) => (
        <div
          key={layer + i}
          className="bg-fade absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${layer}")`,
            opacity: i === layers.length - 1 ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0" style={{ background: overlay }} />
    </div>
  );
}
