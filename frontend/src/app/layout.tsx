import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "nontonSkuy – Nonton Film Online",
  description: "Nonton film streaming gratis sub indo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="min-h-screen" style={{ background: "#060d17", fontFamily: "var(--font-inter), 'Helvetica Neue', Arial, sans-serif" }}>
        <Navbar />
        <main>{children}</main>
        <footer className="text-center py-8 text-xs text-slate-600 mt-16">
          © 2025 nontonSkuy. For educational purposes only.
        </footer>
      </body>
    </html>
  );
}
