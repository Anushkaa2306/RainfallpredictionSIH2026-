import { RoadConditionBadge } from "../../components/road/RoadConditionBadge";
import type { RoadAlert } from "./road.types";
import { RoadImage } from "./RoadImage";

export function RoadConditionCard({ road }: { road: RoadAlert }) {
  return <article className="grid gap-3 rounded-md border border-border bg-card p-3 sm:grid-cols-[140px_1fr]">
    <RoadImage src={road.imageUrl} alt={`Road condition at ${road.name}`} />
    <div className="min-w-0"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-sm font-semibold">{road.name}</h3><RoadConditionBadge condition={road.condition} /></div><p className="mt-1 text-xs text-muted-foreground">{road.area}</p><p className="mt-2 text-[10px] text-muted-foreground">Updated {road.updatedAt}</p></div>
  </article>;
}