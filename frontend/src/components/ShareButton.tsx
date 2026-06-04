"use client";
import { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

interface Props {
  title: string;
  url?: string;
}

export default function ShareButton({ title, url }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareUrl = url ?? window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
        return;
      } catch {}
    }
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
      style={{ background: "rgba(255,255,255,0.07)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      {copied ? <Check size={16} className="text-green-400" /> : <Share2 size={16} />}
      {copied ? "Tersalin!" : "Bagikan"}
    </button>
  );
}
