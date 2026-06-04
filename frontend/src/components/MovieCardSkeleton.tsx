export default function MovieCardSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div
        className="rounded-lg"
        style={{ aspectRatio: "2/3", background: "rgba(255,255,255,0.06)" }}
      />
      <div className="mt-2 h-3 rounded" style={{ background: "rgba(255,255,255,0.06)", width: "85%" }} />
      <div className="mt-1.5 h-2.5 rounded" style={{ background: "rgba(255,255,255,0.04)", width: "55%" }} />
    </div>
  );
}
