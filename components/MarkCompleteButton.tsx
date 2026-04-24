"use client";

import { useProgress } from "@/lib/progress-context";

export function MarkCompleteButton({ day }: { day: number }) {
  const { progress, hydrated, markDayComplete, unmarkDayComplete } = useProgress();
  const completed = hydrated && progress.completedDays.includes(day);

  return (
    <div className="mt-10">
      {completed ? (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] px-4 py-3">
          <span className="text-[var(--color-accent)] font-bold flex items-center gap-2">
            <span aria-hidden="true">✓</span>
            <span>Day {day} complete</span>
          </span>
          <button
            type="button"
            onClick={() => unmarkDayComplete(day)}
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] underline underline-offset-2 self-start sm:self-auto"
          >
            Undo
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => markDayComplete(day)}
          disabled={!hydrated}
          className="inline-flex items-center justify-center gap-2 rounded px-5 py-3 bg-[var(--color-accent)] text-[var(--color-surface)] font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Mark Day {day} complete
        </button>
      )}
    </div>
  );
}
