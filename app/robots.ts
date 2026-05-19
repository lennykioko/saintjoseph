import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://saintjoseph-33.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "facebookexternalhit", allow: "/" },
      { userAgent: "facebookcatalog", allow: "/" },
      { userAgent: "meta-externalagent", allow: "/" },
      { userAgent: "WhatsApp", allow: "/" },
      { userAgent: "Twitterbot", allow: "/" },
      { userAgent: "LinkedInBot", allow: "/" },
      { userAgent: "Slackbot", allow: "/" },
      { userAgent: "Discordbot", allow: "/" },
      { userAgent: "TelegramBot", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Googlebot-Image", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
