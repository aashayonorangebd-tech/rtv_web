import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";
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
          <Header />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
