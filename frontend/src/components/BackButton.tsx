"use client";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <button
      onClick={() => history.back()}
      className="mt-6 flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 transition-colors"
    >
      <ArrowLeft size={13} /> Kembali ke halaman sebelumnya
    </button>
  );
}
