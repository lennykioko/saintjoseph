export type Progress = {
  completedDays: number[];
  currentDay: number | null;
  lastVisitedPath: string | null;
};

const KEY = "stjoseph:progress";

const defaultProgress: Progress = {
  completedDays: [],
  currentDay: null,
  lastVisitedPath: null,
};

function hasStorage(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

export function readProgress(): Progress {
  if (!hasStorage()) return defaultProgress;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return {
      completedDays: Array.isArray(parsed.completedDays) ? parsed.completedDays.filter((n) => Number.isInteger(n)) : [],
      currentDay: typeof parsed.currentDay === "number" ? parsed.currentDay : null,
      lastVisitedPath: typeof parsed.lastVisitedPath === "string" ? parsed.lastVisitedPath : null,
    };
  } catch {
    return defaultProgress;
  }
}

function writeProgress(next: Progress): void {
  if (!hasStorage()) return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Silently degrade when storage is unavailable (e.g. private mode).
  }
}

export function markDayComplete(day: number): Progress {
  const prev = readProgress();
  if (prev.completedDays.includes(day)) return prev;
  const next = { ...prev, completedDays: [...prev.completedDays, day].sort((a, b) => a - b) };
  writeProgress(next);
  return next;
}

export function unmarkDayComplete(day: number): Progress {
  const prev = readProgress();
  const next = { ...prev, completedDays: prev.completedDays.filter((d) => d !== day) };
  writeProgress(next);
  return next;
}

export function setCurrentDay(day: number): Progress {
  const prev = readProgress();
  if (prev.currentDay === day) return prev;
  const next = { ...prev, currentDay: day };
  writeProgress(next);
  return next;
}

export function setLastVisitedPath(path: string): Progress {
  const prev = readProgress();
  if (prev.lastVisitedPath === path) return prev;
  const next = { ...prev, lastVisitedPath: path };
  writeProgress(next);
  return next;
}

export function resetProgress(): Progress {
  writeProgress(defaultProgress);
  return defaultProgress;
}
