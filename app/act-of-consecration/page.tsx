import type { Metadata } from "next";
import Content, { frontmatter } from "@/content/act-of-consecration.mdx";
import { PageHeader } from "@/components/DayHeader";
import { PrevNext } from "@/components/PrevNext";
import { mdxComponents } from "@/mdx-components";

const fm = (frontmatter ?? {}) as { title?: string };

export const metadata: Metadata = {
  title: `${fm.title ?? "Act of Consecration"} — 33 Days with St. Joseph`,
};

export default function ActOfConsecrationPage() {
  return (
    <article>
      <PageHeader title={fm.title ?? "Act of Consecration to St. Joseph"} />
      <div className="prose">
        <Content components={mdxComponents} />
      </div>
      <PrevNext path="/act-of-consecration" />
    </article>
  );
}
