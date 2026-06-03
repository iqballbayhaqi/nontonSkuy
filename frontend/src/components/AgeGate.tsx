"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";

const STORAGE_KEY = "ns_age_confirmed";

export default function AgeGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [confirmed, setConfirmed] = useState<boolean | null>(null);

  useEffect(() => {
    setConfirmed(sessionStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  function confirm() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setConfirmed(true);
  }

  function deny() {
    router.push("/");
  }

  if (confirmed === null) return null;

  if (!confirmed) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(6,13,23,0.97)" }}>
        <div
          className="w-full max-w-sm rounded-2xl p-8 text-center flex flex-col items-center gap-5"
          style={{ background: "#0d1b2a", border: "1px solid rgba(220,38,38,0.4)" }}
        >
          <span
            className="text-2xl font-extrabold px-4 py-1.5 rounded-lg"
            style={{ background: "#dc2626", color: "#fff" }}
          >
            18+
          </span>
          <ShieldAlert size={40} className="text-red-500" />
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Verifikasi Usia</h2>
            <p className="text-slate-400 text-sm">
              Halaman ini mengandung konten dewasa. Apakah kamu berusia 18 tahun ke atas?
            </p>
          </div>
          <div className="flex gap-3 w-full">
            <button
              onClick={deny}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-slate-300 transition-colors hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              Tidak
            </button>
            <button
              onClick={confirm}
              className="flex-1 py-2.5 rounded-lg text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: "#dc2626" }}
            >
              Ya, saya 18+
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
