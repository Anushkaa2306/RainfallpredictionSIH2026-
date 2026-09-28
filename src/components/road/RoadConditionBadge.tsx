import type { RoadCondition } from "../../features/road-intelligence/road.types";

const styles: Record<RoadCondition, string> = {
  Open: "bg-safe/15 text-safe",
  Waterlogged: "bg-warning/15 text-warning",
  Closed: "bg-critical/15 text-critical",
};

export function RoadConditionBadge({ condition }: { condition: RoadCondition }) {
  return <span className={`rounded-sm px-2 py-1 text-[10px] font-bold ${styles[condition]}`}>{condition}</span>;
}