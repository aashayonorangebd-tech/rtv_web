// ─── Root Layout ─────────────────────────────────────────────────────────────
// Sets HTML lang="bn", applies FOUC-prevention script before hydration,
// wraps the app in ThemeProvider, and renders the Header + main content.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Script from "next/script";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
      <body className="min-h-full flex flex-col px-[85px] py-[10px]">
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem("theme")||"system",r=t==="system"?(window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"):t;document.documentElement.classList.remove("light","dark"),document.documentElement.classList.add(r),document.documentElement.style.colorScheme=r}catch(e){}})()`}
        </Script>
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
