import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MiniPlayer from "@/components/MiniPlayer";
import { PipProvider } from "@/context/PipContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "nontonSkuy – Nonton Film Online",
  description: "Nonton film streaming gratis sub indo",
  manifest: "/manifest.json",
  themeColor: "#3b82f6",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "nontonSkuy",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={inter.variable}>
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-screen" style={{ background: "#060d17", fontFamily: "var(--font-inter), 'Helvetica Neue', Arial, sans-serif" }}>
        <PipProvider>
          <Navbar />
          <main>{children}</main>
          <footer className="text-center py-8 text-xs text-slate-600 mt-16">
            © 2025 nontonSkuy. For educational purposes only.
          </footer>
          <MiniPlayer />
        </PipProvider>
      </body>
    </html>
  );
}
