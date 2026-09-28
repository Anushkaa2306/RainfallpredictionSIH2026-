import type { InundationFrame } from "./inundation.types";

export function InundationTimeline({
  frames,
  selectedIndex,
  onSelect,
}: {
  frames: InundationFrame[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <nav aria-label="Inundation forecast timeline" className="grid grid-cols-5 gap-1 sm:gap-2">
      {frames.map((frame, index) => {
        const selected = index === selectedIndex;
        return (
          <button
            key={frame.key}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(index)}
            className={`min-w-0 border-t-2 px-1 py-2 text-left transition-colors ${selected ? "border-primary text-foreground" : "border-border text-muted-foreground hover:border-muted-foreground"}`}
          >
            <span className="block text-[10px] font-semibold sm:text-xs">{frame.label}</span>
            <span className="mt-1 block truncate text-[9px] sm:text-[10px]">
              {frame.maxDepthM.toFixed(2)} m · {frame.affectedAreaKm2.toFixed(1)} km²
            </span>
          </button>
        );
      })}
    </nav>
  );
}
