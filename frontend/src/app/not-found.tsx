import Link from "next/link";
import { Film, Home, Search } from "lucide-react";
import BackButton from "@/components/BackButton";

export const metadata = { title: "404 – Halaman Tidak Ditemukan | nontonSkuy" };

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Background blur decoration */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, #1d6fe8 0%, transparent 70%)",
        }}
      />

      {/* 404 number */}
      <div
        className="text-[120px] md:text-[180px] font-extrabold leading-none select-none"
        style={{
          background: "linear-gradient(135deg, #1d6fe8 0%, #3b82f6 40%, #1e3a8a 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          opacity: 0.25,
        }}
      >
        404
      </div>

      {/* Icon */}
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 -mt-8"
        style={{
          background: "rgba(29,111,232,0.15)",
          border: "1px solid rgba(29,111,232,0.3)",
        }}
      >
        <Film size={36} className="text-blue-400" />
      </div>

      {/* Text */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-slate-400 text-sm md:text-base max-w-sm mb-8">
        Halaman yang kamu cari tidak ada atau sudah dipindahkan.
        Coba kembali ke beranda atau cari film lain.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: "#1d6fe8" }}
        >
          <Home size={16} /> Ke Beranda
        </Link>
        <Link
          href="/search"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80 active:scale-95"
          style={{
            background: "rgba(255,255,255,0.07)",
            color: "#94a3b8",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Search size={16} /> Cari Film
        </Link>
      </div>

      <BackButton />
    </div>
  );
}
