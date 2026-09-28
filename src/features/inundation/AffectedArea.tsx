import { CircleAlert, Route as RouteIcon } from "lucide-react";
import type { InundationFrame } from "./inundation.types";

const roadStyles = {
  Inundated: "bg-critical/15 text-critical",
  "At risk": "bg-warning/15 text-warning",
  Passable: "bg-safe/15 text-safe",
} as const;

export function AffectedArea({ frame }: { frame: InundationFrame }) {
  return (
    <section className="min-w-0">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="font-display text-sm font-semibold">Affected roads</h2>
        <span className="text-[10px] text-muted-foreground">
          {frame.affectedBuildings} buildings in demo extent
        </span>
      </div>
      {frame.roads.length > 0 ? (
        <ul className="divide-y divide-border border-y border-border">
          {frame.roads.map((road) => (
            <li key={road.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
              <div className="flex min-w-0 items-center gap-2">
                <RouteIcon className="size-3.5 shrink-0 text-muted-foreground" />
                <span className="truncate text-xs font-medium">{road.name}</span>
                <span className="text-[10px] text-muted-foreground">
                  {road.waterDepthM.toFixed(2)} m
                </span>
              </div>
              <span
                className={`rounded-sm px-2 py-1 text-[9px] font-bold uppercase ${roadStyles[road.status]}`}
              >
                {road.status}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center gap-2 border-y border-border py-3 text-xs text-muted-foreground">
          <CircleAlert className="size-4 shrink-0" />
          No affected roads in this demo frame.
        </div>
      )}
    </section>
  );
}
