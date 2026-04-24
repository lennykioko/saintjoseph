import type { MetadataRoute } from "next";
import { pageOrder } from "@/lib/page-order";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://33dayswithstjoseph.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const home: MetadataRoute.Sitemap[number] = {
    url: siteUrl,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
  };
  const pages: MetadataRoute.Sitemap = pageOrder.map((p) => ({
    url: `${siteUrl}${p.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p.kind === "day" ? 0.8 : 0.7,
  }));
  return [home, ...pages];
}
