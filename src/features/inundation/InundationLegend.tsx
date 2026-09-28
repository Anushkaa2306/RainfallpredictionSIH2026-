import { inundationDepthBands } from "./inundation.utils";

export function InundationLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-sm border border-white/15 bg-background/80 px-3 py-2 text-foreground shadow-lg backdrop-blur">
      <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
        Water depth
      </span>
      {inundationDepthBands.map((band) => (
        <span key={band.label} className="inline-flex items-center gap-1.5 text-[9px]">
          <i className="size-2.5 rounded-[2px]" style={{ backgroundColor: band.color }} />
          <span>{band.range}</span>
        </span>
      ))}
    </div>
  );
}
