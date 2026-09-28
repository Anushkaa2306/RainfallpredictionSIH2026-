import { Map } from "lucide-react";
import { Panel } from "../components/dashboard/Panel";
import { RoadRiskPanel } from "../features/road-intelligence/RoadRiskPanel";

export function RoadIntelligence() {
  return <div className="space-y-5 p-4 md:p-6">
    <header><p className="text-xs font-semibold uppercase text-primary">Indore · Road network</p><h1 className="mt-1 font-display text-2xl font-semibold md:text-3xl">Road intelligence</h1><p className="mt-1 text-sm text-muted-foreground">Flood-related closures and waterlogging reports.</p></header>
    <RoadRiskPanel />
    <Panel title="Coverage area" detail="Indore, Madhya Pradesh"><div className="flex items-center gap-3 p-4 text-sm text-muted-foreground"><Map className="size-4 text-primary" />Road geometry can be added under src/data/geojson when verified data is available.</div></Panel>
  </div>;
}