import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "33 Days with St. Joseph",
  description:
    "A 33-day consecration to St. Joseph — daily prayers, reflections, scripture, and daily challenges.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body>
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
