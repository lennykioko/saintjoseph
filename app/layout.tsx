import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { ProgressProvider } from "@/lib/progress-context";
import { SidebarProvider } from "@/components/sidebar-context";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { PathTracker } from "@/components/PathTracker";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://saintjoseph-33.vercel.app";
const siteName = "33 Days with St. Joseph";
const siteDescription =
  "A 33-day consecration to St. Joseph — daily prayers, reflections, scripture, and daily challenges.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  generator: "Next.js",
  keywords: [
    "St. Joseph",
    "Saint Joseph",
    "33-day consecration",
    "consecration to St. Joseph",
    "Catholic prayers",
    "Fr. Donald Calloway",
    "daily prayers",
    "Litany of St. Joseph",
    "Act of Consecration",
    "Catholic devotion",
  ],
  authors: [{ name: "33 Days with St. Joseph" }],
  creator: "33 Days with St. Joseph",
  publisher: "33 Days with St. Joseph",
  category: "religion",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
    locale: "en_US",
    images: [
      {
        url: "/saintjoseph.jpeg",
        width: 558,
        height: 933,
        alt: "St. Joseph, Terror of Demons — painting by Bernadette Carstensen (2020), commissioned by Fr. Donald Calloway, MIC",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/saintjoseph.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/saintjoseph.jpeg",
    apple: "/saintjoseph.jpeg",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  inLanguage: "en-US",
  potentialAction: {
    "@type": "ReadAction",
    target: `${siteUrl}/introduction`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ProgressProvider>
          <SidebarProvider>
            <PathTracker />
            <a href="#main" className="skip-link">
              Skip to content
            </a>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <div className="flex flex-1">
                <Sidebar />
                <main
                  id="main"
                  className="flex-1 min-w-0 px-5 py-10 sm:px-8 sm:py-12 lg:px-12"
                >
                  <div className="mx-auto max-w-170">{children}</div>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}
