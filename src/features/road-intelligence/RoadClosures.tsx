import type { RoadAlert } from "./road.types";
import { RoadConditionCard } from "./RoadConditionCard";

export function RoadClosures({ roads = [] }: { roads?: RoadAlert[] }) {
  if (roads.length === 0)
    return (
      <p className="p-5 text-center text-xs text-muted-foreground">
        No verified road closures or waterlogging reports are connected.
      </p>
    );
  return (
    <div className="space-y-3 p-4">
      {roads.map((road) => (
        <RoadConditionCard key={road.id} road={road} />
      ))}
    </div>
  );
}
