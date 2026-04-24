export type PageEntry =
  | { kind: "static"; path: string; label: string; short?: string }
  | { kind: "day"; day: number; path: string; label: string };

export const TOTAL_DAYS = 33;

const staticBefore: PageEntry[] = [
  { kind: "static", path: "/introduction", label: "Introduction" },
];

const staticAfter: PageEntry[] = [
  { kind: "static", path: "/act-of-consecration", label: "Act of Consecration", short: "Act of Consecration" },
  { kind: "static", path: "/litany", label: "Litany of St. Joseph", short: "Litany" },
  { kind: "static", path: "/endnotes", label: "Endnotes" },
];

const days: PageEntry[] = Array.from({ length: TOTAL_DAYS }, (_, i) => {
  const day = i + 1;
  return {
    kind: "day",
    day,
    path: `/day/${day}`,
    label: `Day ${day}`,
  };
});

export const pageOrder: PageEntry[] = [
  ...staticBefore,
  ...days,
  ...staticAfter,
];

export function findIndex(path: string): number {
  return pageOrder.findIndex((p) => p.path === path);
}

export function getPrev(path: string): PageEntry | null {
  const i = findIndex(path);
  if (i <= 0) return null;
  return pageOrder[i - 1];
}

export function getNext(path: string): PageEntry | null {
  const i = findIndex(path);
  if (i < 0 || i >= pageOrder.length - 1) return null;
  return pageOrder[i + 1];
}
