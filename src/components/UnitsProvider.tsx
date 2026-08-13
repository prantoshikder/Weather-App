"use client";

import {
  isUnitSystem,
  UNIT_STORAGE_KEY,
  type UnitSystem,
} from "@/lib/units";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface UnitsContextValue {
  system: UnitSystem;
  setSystem: (system: UnitSystem) => void;
  toggle: () => void;
}

const UnitsContext = createContext<UnitsContextValue | null>(null);

export default function UnitsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Always start metric so server and client render the same markup; the stored
  // preference is applied right after mount.
  const [system, setSystemState] = useState<UnitSystem>("metric");

  useEffect(() => {
    const stored = window.localStorage.getItem(UNIT_STORAGE_KEY);
    if (isUnitSystem(stored)) setSystemState(stored);
  }, []);

  const setSystem = useCallback((next: UnitSystem) => {
    setSystemState(next);
    try {
      window.localStorage.setItem(UNIT_STORAGE_KEY, next);
    } catch {
      // Private-mode / storage-disabled browsers: the choice just won't persist.
    }
  }, []);

  const toggle = useCallback(
    () => setSystem(system === "metric" ? "imperial" : "metric"),
    [system, setSystem]
  );

  const value = useMemo(
    () => ({ system, setSystem, toggle }),
    [system, setSystem, toggle]
  );

  return <UnitsContext value={value}>{children}</UnitsContext>;
}

export function useUnits(): UnitsContextValue {
  const ctx = useContext(UnitsContext);
  if (!ctx) throw new Error("useUnits must be used inside <UnitsProvider>");
  return ctx;
}
