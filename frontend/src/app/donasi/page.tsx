import { Heart, Coffee, ExternalLink, Copy } from "lucide-react";
import type { Metadata } from "next";
import CopyButton from "@/components/CopyButton";

export const metadata: Metadata = {
  title: "Dukung Pengembang – nontonSkuy",
  description: "Dukung pengembangan nontonSkuy dengan donasi melalui Saweria.",
};

const SAWERIA_URL = "https://saweria.co/Baleeeee";
const SAWERIA_QR  = "https://saweria.co/widgets/qr?streamKey=e01ce7f561711ff0c68927f6ebbf4546";

export default function DonasiPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(236,72,153,0.08) 0%, transparent 70%)" }}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-md rounded-2xl p-8 flex flex-col items-center gap-6 text-center"
        style={{ background: "#0d1b2a", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(236,72,153,0.15)", border: "1px solid rgba(236,72,153,0.3)" }}
        >
          <Heart size={30} className="text-pink-400" fill="currentColor" />
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl font-extrabold text-white mb-2">Dukung Pengembang</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            nontonSkuy dibuat dan dikelola secara sukarela. Jika kamu menikmati layanan ini,
            pertimbangkan untuk memberikan dukungan agar pengembangan bisa terus berlanjut.
          </p>
        </div>

        {/* QR Code */}
        <div className="rounded-xl overflow-hidden" style={{ width: 200, height: 200 }}>
          <iframe
            src={SAWERIA_QR}
            width={200}
            height={200}
            style={{ border: "none", display: "block" }}
            title="QR Code Saweria"
          />
        </div>

        <p className="text-slate-500 text-xs">Scan QR code di atas atau klik tombol di bawah</p>

        {/* Saweria link */}
        <a
          href={SAWERIA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: "linear-gradient(135deg, #ec4899 0%, #f97316 100%)" }}
        >
          <Coffee size={18} />
          Donasi via Saweria
          <ExternalLink size={14} />
        </a>

        {/* Copy link */}
        <div className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <span className="flex-1 text-xs text-slate-400 text-left truncate">{SAWERIA_URL}</span>
          <CopyButton text={SAWERIA_URL} />
        </div>

        {/* Note */}
        <p className="text-slate-600 text-xs">
          Setiap donasi sangat berarti, tidak peduli nominalnya. Terima kasih! 🙏
        </p>
      </div>

      {/* Decorative hearts */}
      <div className="mt-8 flex items-center gap-2 text-slate-700 text-xs">
        <Heart size={12} fill="currentColor" className="text-pink-900" />
        <span>Dibuat dengan ❤️ untuk komunitas streaming Indonesia</span>
        <Heart size={12} fill="currentColor" className="text-pink-900" />
      </div>
    </div>
  );
}
