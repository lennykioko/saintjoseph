import type { Metadata } from "next";
import Content, { frontmatter } from "@/content/introduction.mdx";
import { PageHeader } from "@/components/DayHeader";
import { PrevNext } from "@/components/PrevNext";
import { mdxComponents } from "@/mdx-components";

const fm = (frontmatter ?? {}) as { title?: string; author?: string };

export const metadata: Metadata = {
  title: `${fm.title ?? "Introduction"} — 33 Days with St. Joseph`,
};

export default function IntroductionPage() {
  return (
    <article>
      <PageHeader eyebrow={fm.author ? `By ${fm.author}` : undefined} title={fm.title ?? "Introduction"} />
      <div className="prose">
        <Content components={mdxComponents} />
      </div>
      <PrevNext path="/introduction" />
    </article>
  );
}
