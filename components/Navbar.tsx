"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useProgress } from "@/lib/progress-context";
import { TOTAL_DAYS } from "@/lib/page-order";
import { MobileMenuButton } from "./MobileMenuButton";

export function Navbar() {
  const { progress, hydrated } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const completed = progress.completedDays.length;

  return (
    <header
      className="sticky top-0 z-30 h-16 border-b border-border bg-surface"
      role="banner"
    >
      <div className="h-full flex items-center gap-3 px-4 sm:px-6">
        <MobileMenuButton />
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span
            aria-hidden="true"
            className="text-accent text-xl leading-none"
          >
            ✠
          </span>
          <span className="font-extrabold text-[18px] tracking-tight text-text">
            33 Days with St. Joseph
          </span>
        </Link>
        <div className="ml-auto text-sm text-text-muted font-semibold tabular-nums">
          {mounted && hydrated ? (
            <span>
              <span className="text-accent">{completed}</span>
              <span className="opacity-60">/</span>
              <span>{TOTAL_DAYS}</span>
              <span className="ml-1 hidden sm:inline">complete</span>
            </span>
          ) : (
            <span className="opacity-0">0/33</span>
          )}
        </div>
      </div>
    </header>
  );
}
