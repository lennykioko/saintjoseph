"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useProgress } from "@/lib/progress-context";

export function PathTracker() {
  const pathname = usePathname();
  const { hydrated, setLastVisitedPath, setCurrentDay } = useProgress();

  useEffect(() => {
    if (!hydrated || !pathname) return;
    if (pathname === "/") return;
    setLastVisitedPath(pathname);
    const match = pathname.match(/^\/day\/(\d+)$/);
    if (match) {
      const day = parseInt(match[1], 10);
      if (day >= 1 && day <= 33) {
        setCurrentDay(day);
      }
    }
  }, [pathname, hydrated, setLastVisitedPath, setCurrentDay]);

  return null;
}
