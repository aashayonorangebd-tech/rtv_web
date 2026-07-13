// ─── Root Layout ─────────────────────────────────────────────────────────────
// Sets HTML lang="bn", applies FOUC-prevention script before hydration,
// wraps the app in ThemeProvider, and renders the Header + main content.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";

import ThemeProvider from "@/components/ThemeProvider";
import { ActiveCategoryProvider } from "@/components/ActiveCategoryProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AnchorAd from "@/components/AnchorAd";
import "./globals.css";

export const metadata: Metadata = {
  title: "RTV Bangladesh | Source for the Latest News & Entertainment",
  description: "RTV Online - Bangladesh news portal",
  icons: {
    icon: "/rtv-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning className="h-full">
      <body className="min-h-full flex flex-col">

        <ThemeProvider>
          <ActiveCategoryProvider>
            <Header />
            <main className="flex-1 px-5 sm:px-0 mt-4 overflow-hidden">{children}</main>
            <Footer />
            <ScrollToTop />
            <AnchorAd />
          </ActiveCategoryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
