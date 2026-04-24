import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ScriptureLink } from "@/components/ScriptureLink";

function Cite({ children }: { children: ReactNode }) {
  return <span className="scripture-citation">{children}</span>;
}

function FootnoteRef({ id }: { id: string }) {
  return (
    <sup>
      <Link href={`/endnotes#ref-${id}`} aria-label={`Endnote ${id}`}>
        {id}
      </Link>
    </sup>
  );
}

function A({ href, children, ...rest }: ComponentProps<"a">) {
  if (!href) return <a {...rest}>{children}</a>;
  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={rest.className} id={rest.id}>
      {children}
    </Link>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: A,
    Cite,
    FootnoteRef,
    ScriptureLink,
    ...components,
  };
}
