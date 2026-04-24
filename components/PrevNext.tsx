"use client";

import Link from "next/link";
import { getNext, getPrev } from "@/lib/page-order";
import { useProgress } from "@/lib/progress-context";

export function PrevNext({ path }: { path: string }) {
  const prev = getPrev(path);
  const next = getNext(path);
  const { progress, hydrated } = useProgress();

  const match = path.match(/^\/day\/(\d+)$/);
  const currentDay = match ? parseInt(match[1], 10) : null;
  const highlightNext =
    hydrated && currentDay !== null && progress.completedDays.includes(currentDay);

  return (
    <nav
      aria-label="Previous and next pages"
      className="mt-16 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between"
    >
      {prev ? (
        <Link
          href={prev.path}
          className="group inline-flex items-center gap-2 px-4 py-3 rounded border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] no-underline text-left"
        >
          <span aria-hidden="true" className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]">
            ←
          </span>
          <span className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
              Previous
            </span>
            <span className="text-[15px] font-semibold text-[var(--color-text)]">
              {prev.label}
            </span>
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={next.path}
          className={[
            "group inline-flex items-center gap-2 px-4 py-3 rounded border no-underline text-right sm:text-right ml-auto",
            highlightNext
              ? "bg-[var(--color-accent)] text-[var(--color-surface)] border-[var(--color-accent)]"
              : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text)]",
          ].join(" ")}
        >
          <span className="flex flex-col">
            <span
              className={[
                "text-[11px] uppercase tracking-wider",
                highlightNext ? "text-[var(--color-surface)]/80" : "text-[var(--color-text-muted)]",
              ].join(" ")}
            >
              Next
            </span>
            <span className="text-[15px] font-semibold">{next.label}</span>
          </span>
          <span
            aria-hidden="true"
            className={
              highlightNext
                ? "text-[var(--color-surface)]"
                : "text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]"
            }
          >
            →
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}
