"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { TOTAL_DAYS } from "@/lib/page-order";
import { useProgress } from "@/lib/progress-context";
import { useSidebar } from "./sidebar-context";

type IndicatorStatus = "not-started" | "current" | "completed";

function indicatorLabel(status: IndicatorStatus): string {
  switch (status) {
    case "not-started":
      return "Not started";
    case "current":
      return "Current";
    case "completed":
      return "Completed";
  }
}

function Indicator({ status }: { status: IndicatorStatus }) {
  const color =
    status === "completed"
      ? "text-[var(--color-accent)]"
      : status === "current"
        ? "text-[var(--color-accent)]"
        : "text-[var(--color-text-muted)]/50";
  const glyph = status === "completed" ? "✓" : status === "current" ? "●" : "○";
  return (
    <span className={`inline-block w-4 text-center text-sm ${color}`} aria-hidden="true">
      {glyph}
      <span className="sr-only">{indicatorLabel(status)}</span>
    </span>
  );
}

function SidebarContent() {
  const pathname = usePathname();
  const { progress, hydrated, resetProgress } = useProgress();
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    const match = pathname?.match(/^\/day\/(\d+)$/);
    if (!match) return;
    const day = parseInt(match[1], 10);
    const el = document.getElementById(`sidebar-day-${day}`);
    if (el) {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [pathname, hydrated]);

  function dayStatus(day: number): IndicatorStatus {
    if (!hydrated) return "not-started";
    if (progress.completedDays.includes(day)) return "completed";
    if (pathname === `/day/${day}`) return "current";
    if (progress.currentDay === day) return "current";
    return "not-started";
  }

  function linkClass(path: string, extra = "") {
    const active = pathname === path;
    return [
      "block rounded px-3 py-2 text-[15px] no-underline",
      active
        ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)] font-bold"
        : "text-[var(--color-text)] hover:bg-[var(--color-accent-soft)]/60",
      extra,
    ].join(" ");
  }

  function onReset() {
    if (window.confirm("Reset your progress? This will clear completed days and cannot be undone.")) {
      resetProgress();
    }
  }

  return (
    <nav
      id="site-sidebar"
      ref={navRef}
      aria-label="Daily prayers"
      className="h-full flex flex-col bg-[var(--color-surface)]"
    >
      <div className="flex-1 overflow-y-auto px-3 py-6">
        <Link
          href="/introduction"
          className={linkClass("/introduction", "font-semibold")}
          aria-current={pathname === "/introduction" ? "page" : undefined}
        >
          Introduction
        </Link>

        <div className="mt-6 mb-2 px-3 text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
          The 33 Days
        </div>
        <ul className="space-y-0.5">
          {Array.from({ length: TOTAL_DAYS }, (_, i) => {
            const day = i + 1;
            const path = `/day/${day}`;
            const active = pathname === path;
            const status = dayStatus(day);
            return (
              <li key={day} id={`sidebar-day-${day}`}>
                <Link
                  href={path}
                  className={linkClass(path, "flex items-center gap-2")}
                  aria-current={active ? "page" : undefined}
                >
                  <Indicator status={status} />
                  <span>Day {day}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 space-y-0.5">
          <Link
            href="/act-of-consecration"
            className={linkClass("/act-of-consecration", "font-semibold")}
            aria-current={pathname === "/act-of-consecration" ? "page" : undefined}
          >
            Act of Consecration
          </Link>
          <Link
            href="/litany"
            className={linkClass("/litany", "font-semibold")}
            aria-current={pathname === "/litany" ? "page" : undefined}
          >
            Litany of St. Joseph
          </Link>
          <Link
            href="/endnotes"
            className={linkClass("/endnotes", "font-semibold")}
            aria-current={pathname === "/endnotes" ? "page" : undefined}
          >
            Endnotes
          </Link>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] px-5 py-3">
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] underline underline-offset-2"
        >
          Reset progress
        </button>
      </div>
    </nav>
  );
}

export function Sidebar() {
  const { open, setOpen } = useSidebar();

  return (
    <>
      <aside className="hidden lg:block w-[280px] shrink-0 border-r border-[var(--color-border)] sticky top-16 h-[calc(100vh-4rem)]">
        <SidebarContent />
      </aside>

      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          tabIndex={open ? 0 : -1}
          className="absolute inset-0 bg-black/40"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 h-full w-[280px] max-w-[85vw] bg-[var(--color-surface)] shadow-lg transition-transform ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <SidebarContent />
        </div>
      </div>
    </>
  );
}
