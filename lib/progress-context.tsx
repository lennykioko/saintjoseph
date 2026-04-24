"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  type Progress,
  markDayComplete as storeMarkDayComplete,
  readProgress,
  resetProgress as storeResetProgress,
  setCurrentDay as storeSetCurrentDay,
  setLastVisitedPath as storeSetLastVisitedPath,
  unmarkDayComplete as storeUnmarkDayComplete,
} from "./progress";

type ProgressContextValue = {
  progress: Progress;
  hydrated: boolean;
  markDayComplete: (day: number) => void;
  unmarkDayComplete: (day: number) => void;
  setCurrentDay: (day: number) => void;
  setLastVisitedPath: (path: string) => void;
  resetProgress: () => void;
};

const initialProgress: Progress = {
  completedDays: [],
  currentDay: null,
  lastVisitedPath: null,
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<Progress>(initialProgress);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(readProgress());
    setHydrated(true);
  }, []);

  const markDayComplete = useCallback((day: number) => {
    setProgress(storeMarkDayComplete(day));
  }, []);
  const unmarkDayComplete = useCallback((day: number) => {
    setProgress(storeUnmarkDayComplete(day));
  }, []);
  const setCurrentDay = useCallback((day: number) => {
    setProgress(storeSetCurrentDay(day));
  }, []);
  const setLastVisitedPath = useCallback((path: string) => {
    setProgress(storeSetLastVisitedPath(path));
  }, []);
  const resetProgress = useCallback(() => {
    setProgress(storeResetProgress());
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        hydrated,
        markDayComplete,
        unmarkDayComplete,
        setCurrentDay,
        setLastVisitedPath,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return ctx;
}
