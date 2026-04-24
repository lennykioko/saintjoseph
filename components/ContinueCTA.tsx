"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useProgress } from "@/lib/progress-context";

export function ContinueCTA() {
  const { progress, hydrated } = useProgress();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const showContinue =
    mounted && hydrated && progress.lastVisitedPath && progress.lastVisitedPath !== "/";

  const continueLabel = (() => {
    if (!showContinue || !progress.lastVisitedPath) return null;
    const m = progress.lastVisitedPath.match(/^\/day\/(\d+)$/);
    if (m) return `Continue — Day ${m[1]}`;
    if (progress.lastVisitedPath === "/introduction") return "Continue — Introduction";
    if (progress.lastVisitedPath === "/act-of-consecration") return "Continue — Act of Consecration";
    if (progress.lastVisitedPath === "/litany") return "Continue — Litany";
    if (progress.lastVisitedPath === "/endnotes") return "Continue — Endnotes";
    return "Continue where you left off";
  })();

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      {showContinue && progress.lastVisitedPath ? (
        <>
          <Link
            href={progress.lastVisitedPath}
            className="inline-flex items-center justify-center rounded px-6 py-3 bg-[var(--color-accent)] text-[var(--color-surface)] font-bold no-underline hover:opacity-90"
          >
            {continueLabel}
          </Link>
          <Link
            href="/day/1"
            className="inline-flex items-center justify-center rounded px-6 py-3 border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] font-semibold no-underline text-[var(--color-text)]"
          >
            Start over from Day 1
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/day/1"
            className="inline-flex items-center justify-center rounded px-6 py-3 bg-[var(--color-accent)] text-[var(--color-surface)] font-bold no-underline hover:opacity-90"
          >
            Start with Day 1
          </Link>
          <Link
            href="/introduction"
            className="inline-flex items-center justify-center rounded px-6 py-3 border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] font-semibold no-underline text-[var(--color-text)]"
          >
            Read the Introduction
          </Link>
        </>
      )}
    </div>
  );
}
