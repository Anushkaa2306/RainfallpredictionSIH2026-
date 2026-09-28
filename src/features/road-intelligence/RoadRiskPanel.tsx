import { AlertTriangle } from "lucide-react";
import { Panel } from "../../components/dashboard/Panel";
import type { RoadAlert } from "./road.types";
import { RoadClosures } from "./RoadClosures";

export function RoadRiskPanel({ roads = [] }: { roads?: RoadAlert[] }) {
  const hasReports = roads.length > 0;
  return <Panel title="Road conditions" detail={hasReports ? `${roads.length} reported segments` : "Awaiting a verified road-status feed"}>
    {!hasReports && <div className="flex items-center gap-3 border-b border-border px-4 py-3 text-xs text-muted-foreground"><AlertTriangle className="size-4 shrink-0 text-warning" /><span>Road conditions are unavailable until an authoritative closure or waterlogging feed is configured.</span></div>}
    <RoadClosures roads={roads} />
  </Panel>;
}