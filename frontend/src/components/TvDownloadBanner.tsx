"use client";
import { useState } from "react";
import { Tv, Download, X } from "lucide-react";

export default function TvDownloadBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="mx-4 md:mx-8 lg:mx-16 mt-4 rounded-xl flex items-center gap-4 px-5 py-4 relative"
      style={{
        background: "linear-gradient(135deg, rgba(22,163,74,0.15) 0%, rgba(15,118,110,0.15) 100%)",
        border: "1px solid rgba(22,163,74,0.35)",
      }}
    >
      {/* Icon */}
      <div
        className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: "rgba(22,163,74,0.2)" }}
      >
        <Tv size={22} className="text-green-400" />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white leading-tight">
          nontonSkuy tersedia di Android TV &amp; Google TV
        </p>
        <p className="text-xs text-slate-400 mt-0.5">
          Install APK langsung dan nikmati streaming di TV kamu
        </p>
      </div>

      {/* Download button */}
      <a
        href="/nontonSkuy-tv.apk"
        download="nontonSkuy-tv.apk"
        className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all hover:opacity-90 active:scale-95"
        style={{ background: "linear-gradient(135deg, #16a34a, #0d9488)", color: "#fff" }}
      >
        <Download size={15} />
        <span className="hidden sm:inline">Download APK</span>
        <span className="sm:hidden">Download</span>
      </a>

      {/* Dismiss */}
      <button
        onClick={() => setDismissed(true)}
        className="shrink-0 p-1 rounded-full text-slate-500 hover:text-slate-300 transition-colors"
        aria-label="Tutup"
      >
        <X size={16} />
      </button>
    </div>
  );
}
