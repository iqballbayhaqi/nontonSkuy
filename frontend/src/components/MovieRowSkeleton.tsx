import MovieCardSkeleton from "./MovieCardSkeleton";

export default function MovieRowSkeleton({ title = "" }: { title?: string }) {
  return (
    <section className="px-4 md:px-8 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        {title ? (
          <h2 className="text-base font-bold text-white">{title}</h2>
        ) : (
          <div className="h-5 w-32 rounded animate-pulse" style={{ background: "rgba(255,255,255,0.08)" }} />
        )}
        <div className="h-4 w-16 rounded animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
      </div>
      {/* Cards */}
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="shrink-0" style={{ width: 120 }}>
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    </section>
  );
}
