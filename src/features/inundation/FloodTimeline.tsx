import type { InundationTimelinePoint } from "./inundation.types";

export function FloodTimeline({ points, selectedIndex, onSelect }: { points: InundationTimelinePoint[]; selectedIndex: number; onSelect: (index: number) => void }) {
  const selectedPoint = points[selectedIndex] ?? points[0];
  if (!selectedPoint) return null;

  return <section className="rounded-lg border border-border bg-card p-4">
    <div className="flex items-center gap-2"><h2 className="font-display text-sm font-semibold">Forecast time</h2></div>
    <div className="mt-4 text-center"><strong className="font-display text-4xl">{selectedPoint.hour}</strong><p className="mt-1 text-xs text-muted-foreground">Projected maximum water depth: {selectedPoint.depth}</p></div>
    <input aria-label="Flood forecast time" className="mt-5 w-full accent-[var(--primary)]" type="range" min="0" max={points.length - 1} value={selectedIndex} onChange={(event) => onSelect(Number(event.target.value))} />
    <div className="mt-2 flex justify-between text-[9px] text-muted-foreground"><span>{points[0]?.hour.toUpperCase()}</span><span>{points[Math.floor((points.length - 1) / 2)]?.hour.toUpperCase()}</span><span>{points[points.length - 1]?.hour.toUpperCase()}</span></div>
  </section>;
}