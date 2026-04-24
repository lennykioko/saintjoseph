import type { Metadata } from "next";
import Content, { frontmatter } from "@/content/endnotes.mdx";
import { PageHeader } from "@/components/DayHeader";
import { PrevNext } from "@/components/PrevNext";
import { mdxComponents } from "@/mdx-components";

const fm = (frontmatter ?? {}) as { title?: string };

export const metadata: Metadata = {
  title: `${fm.title ?? "Endnotes"} — 33 Days with St. Joseph`,
};

export default function EndnotesPage() {
  return (
    <article>
      <PageHeader title={fm.title ?? "Endnotes"} />
      <div className="prose">
        <Content components={mdxComponents} />
      </div>
      <PrevNext path="/endnotes" />
    </article>
  );
}
