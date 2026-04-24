import type { Metadata } from "next";
import Content, { frontmatter } from "@/content/litany.mdx";
import { PageHeader } from "@/components/DayHeader";
import { PrevNext } from "@/components/PrevNext";
import { useMDXComponents } from "@/mdx-components";

const fm = (frontmatter ?? {}) as { title?: string };

export const metadata: Metadata = {
  title: `${fm.title ?? "Litany of St. Joseph"} — 33 Days with St. Joseph`,
};

export default function LitanyPage() {
  const components = useMDXComponents({});
  return (
    <article>
      <PageHeader title={fm.title ?? "Litany of St. Joseph"} />
      <div className="prose">
        <Content components={components} />
      </div>
      <PrevNext path="/litany" />
    </article>
  );
}
