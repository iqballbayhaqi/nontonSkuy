/**
 * Returns true when running inside an Android TV / Fire TV / Smart TV browser.
 * Uses UA string as primary signal; falls back to capability heuristics.
 * Safe to call only on the client (window must exist).
 */
export function isAndroidTv(): boolean {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent;

  // Explicit TV UA strings
  if (/Android TV|BRAVIA|HbbTV|SmartTV|SMART-TV|Tizen|Web0S|webOS|CrKey/i.test(ua)) return true;
  // Amazon Fire TV (AFTT, AFTMM, AFTS, etc.)
  if (/AFT[A-Z0-9]/i.test(ua)) return true;

  // Heuristic fallback: large screen + no fine pointer + no touch
  // (covers TV browsers that don't advertise themselves in UA)
  if (typeof window === "undefined") return false;
  const largeScreen = window.screen.width >= 1280;
  const noFinePointer = window.matchMedia("(pointer: coarse), (pointer: none)").matches;
  const noTouch = !("ontouchstart" in window) && navigator.maxTouchPoints === 0;

  return largeScreen && noFinePointer && noTouch;
}
