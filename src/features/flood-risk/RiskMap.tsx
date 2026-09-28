import type { FloodRiskZone, RiskGrid } from "./risk.types";

function probabilityColor(probability: number) {
  if (probability >= 75) return "#b42336";
  if (probability >= 50) return "#e76f51";
  if (probability >= 25) return "#e9c46a";
  return "#2a9d8f";
}

export function RiskMap({
  grid,
  zones,
  selectedZoneId,
  onZoneSelect,
}: {
  grid: RiskGrid;
  zones: FloodRiskZone[];
  selectedZoneId: string;
  onZoneSelect: (zoneId: string) => void;
}) {
  return (
    <div
      className="grid min-h-[360px] place-items-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_rgba(70,125,108,0.12),_transparent_72%)] p-4 sm:min-h-[440px]"
      role="group"
      aria-label={`Illustrative flood probability grid for Indore. ${zones.length} selectable areas.`}
    >
      <div className="w-full max-w-[560px]">
        <div className="mb-2 flex justify-between text-[9px] font-medium uppercase text-muted-foreground">
          <span>North · Indore</span>
          <span>Demo spatial field</span>
        </div>
        <div className="grid aspect-square grid-cols-8 grid-rows-8 gap-1 rounded-md border border-border/70 bg-background/75 p-2 shadow-sm sm:gap-1.5 sm:p-3">
          {grid.features.map((feature) => {
            const { cellId, probability, zoneId } = feature.properties;
            const zone = zones.find((item) => item.id === zoneId);
            const selected = zoneId === selectedZoneId;
            const column = cellId % 8;
            const row = 7 - Math.floor(cellId / 8);

            return (
              <button
                key={cellId}
                type="button"
                aria-label={`${zone?.name ?? "Area"}, ${probability}% illustrative flood probability`}
                aria-pressed={selected}
                title={`${zone?.name ?? "Area"}: ${probability}% demo probability`}
                onClick={() => onZoneSelect(zoneId)}
                className={`min-h-0 min-w-0 rounded-[3px] border transition-[filter,transform] hover:z-10 hover:brightness-110 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-foreground ${selected ? "border-foreground shadow-[inset_0_0_0_1px_rgba(255,255,255,0.8)]" : "border-white/40"}`}
                style={{
                  gridColumnStart: column + 1,
                  gridRowStart: row + 1,
                  backgroundColor: probabilityColor(probability),
                  opacity: 0.55 + probability / 220,
                }}
              />
            );
          })}
        </div>
        <div className="mt-2 flex justify-between text-[9px] font-medium uppercase text-muted-foreground">
          <span>West</span>
          <span>East</span>
        </div>
      </div>
    </div>
  );
}
