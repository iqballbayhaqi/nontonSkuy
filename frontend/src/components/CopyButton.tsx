"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 p-1.5 rounded-lg transition-colors hover:bg-white/10"
      title="Salin link"
    >
      {copied
        ? <Check size={14} className="text-green-400" />
        : <Copy size={14} className="text-slate-400" />}
    </button>
  );
}
