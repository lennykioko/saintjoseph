import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOTAL_DAYS } from "@/lib/page-order";
import { DayHeader } from "@/components/DayHeader";
import { MarkCompleteButton } from "@/components/MarkCompleteButton";
import { PrevNext } from "@/components/PrevNext";
import { useMDXComponents } from "@/mdx-components";
import type { ComponentType } from "react";

type Params = { day: string };

export function generateStaticParams(): Params[] {
  return Array.from({ length: TOTAL_DAYS }, (_, i) => ({ day: String(i + 1) }));
}

type DayModule = {
  default: ComponentType<{ components?: ReturnType<typeof useMDXComponents> }>;
  frontmatter?: { day?: number; theme?: string };
};

async function loadDay(day: number): Promise<DayModule | null> {
  const padded = day.toString().padStart(2, "0");
  try {
    return (await import(`@/content/days/${padded}.mdx`)) as DayModule;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { day: dayStr } = await params;
  const day = parseInt(dayStr, 10);
  if (!Number.isInteger(day) || day < 1 || day > TOTAL_DAYS) return { title: "Not found" };
  const mod = await loadDay(day);
  const theme = mod?.frontmatter?.theme ?? "";
  return {
    title: `Day ${day}${theme ? `: ${theme}` : ""} — 33 Days with St. Joseph`,
  };
}

export default async function DayPage({ params }: { params: Promise<Params> }) {
  const { day: dayStr } = await params;
  const day = parseInt(dayStr, 10);
  if (!Number.isInteger(day) || day < 1 || day > TOTAL_DAYS) notFound();
  const mod = await loadDay(day);
  if (!mod) notFound();
  const MDXContent = mod.default;
  const theme = mod.frontmatter?.theme ?? `Day ${day}`;
  const components = useMDXComponents({});

  return (
    <article>
      <DayHeader day={day} theme={theme} />
      <div className="prose">
        <MDXContent components={components} />
      </div>
      <MarkCompleteButton day={day} />
      <PrevNext path={`/day/${day}`} />
    </article>
  );
}
