import { Info } from "lucide-react";
import { Panel } from "../../components/dashboard/Panel";
import { useFloodScenario } from "../../hooks/useFloodScenario";
import { AffectedArea } from "./AffectedArea";
import { InundationLegend } from "./InundationLegend";
import { InundationMap } from "./InundationMap";
import { InundationTimeline } from "./InundationTimeline";
import { WaterDepthMetrics } from "./WaterDepthMetrics";

export function InundationPrediction({ locationId }: { locationId: string }) {
  const { timeIndex, setTimeIndex, scenario, frames, frame, peakFrame, timeToImpactMinutes } =
    useFloodScenario(locationId);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <div className="text-[10px] font-semibold uppercase text-muted-foreground">
            Selected catchment
          </div>
          <h2 className="mt-1 font-display text-lg font-semibold">{scenario.catchmentName}</h2>
        </div>
        <span className="rounded-sm bg-warning/15 px-2 py-1 text-[9px] font-bold uppercase text-warning">
          Deterministic demo · not a live model
        </span>
      </div>

      <WaterDepthMetrics
        frame={frame}
        peakFrame={peakFrame}
        timeToImpactMinutes={timeToImpactMinutes}
      />

      <section
        aria-label="Spatial inundation visualization"
        className="relative isolate h-[56svh] min-h-[400px] overflow-hidden rounded-md border border-border bg-[#0b151b] sm:min-h-[480px]"
      >
        <InundationMap frame={frame} />
        <div className="pointer-events-none absolute left-3 top-3 z-10 max-w-[70%] rounded-sm border border-white/15 bg-background/80 px-3 py-2 text-foreground shadow-lg backdrop-blur">
          <div className="text-[9px] font-semibold uppercase text-muted-foreground">
            Water spread · {frame.label}
          </div>
          <div className="mt-1 text-xs font-medium">
            {scenario.locationName} · peak cell {frame.maxDepthM.toFixed(2)} m
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3 z-10 flex justify-center">
          <InundationLegend />
        </div>
      </section>

      <Panel
        title="Inundation evolution"
        detail="Select a horizon to update water extent, depth, area, and road impact"
      >
        <div className="p-3 sm:p-4">
          <InundationTimeline frames={frames} selectedIndex={timeIndex} onSelect={setTimeIndex} />
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(260px,0.7fr)]">
        <Panel title="Impact footprint" detail={`Selected horizon · ${frame.label}`}>
          <div className="p-4">
            <AffectedArea frame={frame} />
          </div>
        </Panel>
        <div className="flex items-start gap-2 border-l-2 border-primary/50 px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0 text-primary" />
          <p>
            Water cells, depths, and road impacts are deterministic illustrative data. Terrain,
            drainage, and rainfall inputs are not connected to a hydrological model.
          </p>
        </div>
      </div>
    </div>
  );
}
