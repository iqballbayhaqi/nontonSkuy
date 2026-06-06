"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  children: React.ReactNode;
  gap?: number;
}

export default function ScrollableRow({ children, gap = 12 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft]   = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", update); ro.disconnect(); };
  }, [update]);

  // Auto-scroll to focused item (TV remote D-pad navigation)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function onFocusIn(e: FocusEvent) {
      const target = e.target as HTMLElement;
      if (!el || !el.contains(target)) return;
      const card = target.closest<HTMLElement>("[data-movie-card]") ?? target;
      const containerLeft = el.getBoundingClientRect().left;
      const cardLeft = card.getBoundingClientRect().left;
      const cardRight = card.getBoundingClientRect().right;
      const containerRight = containerLeft + el.clientWidth;
      if (cardRight > containerRight) {
        el.scrollBy({ left: cardRight - containerRight + 16, behavior: "smooth" });
      } else if (cardLeft < containerLeft) {
        el.scrollBy({ left: cardLeft - containerLeft - 16, behavior: "smooth" });
      }
    }
    el.addEventListener("focusin", onFocusIn);
    return () => el.removeEventListener("focusin", onFocusIn);
  }, []);

  // D-pad left/right: manually move focus between cards so TV remote works
  function handleRowKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const el = ref.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>("a[data-movie-card]"));
    if (!cards.length) return;
    const focused = document.activeElement as HTMLElement;
    const idx = cards.indexOf(focused);
    // If nothing in this row is focused, enter at first/last card
    const next =
      e.key === "ArrowRight"
        ? idx === -1 ? cards[0] : cards[idx + 1]
        : idx === -1 ? cards[cards.length - 1] : cards[idx - 1];
    if (next) {
      e.preventDefault();
      e.stopPropagation();
      next.focus();
    }
  }

  function scroll(dir: "left" | "right") {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  }

  return (
    <div className="relative group/row" onKeyDown={handleRowKeyDown}>
      {/* Left arrow — tabIndex={-1} so TV remote skips it */}
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll kiri"
        tabIndex={-1}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full shadow-lg transition-all duration-200
          ${canLeft ? "opacity-100 pointer-events-auto -translate-x-3" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(13,27,42,0.92)", border: "1px solid rgba(29,111,232,0.35)" }}
      >
        <ChevronLeft size={18} className="text-white" />
      </button>

      {/* Scrollable container */}
      <div
        ref={ref}
        className="flex overflow-x-auto scrollbar-hide pb-2"
        style={{ gap, scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>

      {/* Right arrow — tabIndex={-1} so TV remote skips it */}
      <button
        onClick={() => scroll("right")}
        aria-label="Scroll kanan"
        tabIndex={-1}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full shadow-lg transition-all duration-200
          ${canRight ? "opacity-100 pointer-events-auto translate-x-3" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(13,27,42,0.92)", border: "1px solid rgba(29,111,232,0.35)" }}
      >
        <ChevronRight size={18} className="text-white" />
      </button>
    </div>
  );
}
