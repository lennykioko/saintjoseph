import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type DayFrontmatter = {
  day: number;
  theme: string;
};

export async function loadDayFrontmatter(day: number): Promise<DayFrontmatter | null> {
  const filePath = path.join(
    CONTENT_ROOT,
    "days",
    `${day.toString().padStart(2, "0")}.mdx`,
  );
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = matter(raw);
    const { day: d, theme } = parsed.data as Partial<DayFrontmatter>;
    if (typeof d !== "number" || typeof theme !== "string") return null;
    return { day: d, theme };
  } catch {
    return null;
  }
}
