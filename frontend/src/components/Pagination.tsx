"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  basePath: string;
}

export default function Pagination({ currentPage, hasNext, hasPrev, basePath }: Props) {
  const router = useRouter();

  function go(page: number) {
    const sep = basePath.includes("?") ? "&" : "?";
    router.push(`${basePath}${sep}page=${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="flex items-center justify-center gap-3 mt-10">
      <button
        onClick={() => go(currentPage - 1)}
        disabled={!hasPrev}
        className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ background: hasPrev ? "#1d6fe8" : "rgba(255,255,255,0.07)", color: "white" }}
      >
        <ChevronLeft size={16} /> Sebelumnya
      </button>

      <span className="text-sm text-slate-400">Halaman {currentPage}</span>

      <button
        onClick={() => go(currentPage + 1)}
        disabled={!hasNext}
        className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ background: hasNext ? "#1d6fe8" : "rgba(255,255,255,0.07)", color: "white" }}
      >
        Selanjutnya <ChevronRight size={16} />
      </button>
    </div>
  );
}
