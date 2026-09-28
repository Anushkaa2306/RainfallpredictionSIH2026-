import { Link } from "@tanstack/react-router";
import { CloudRain, MapPin } from "lucide-react";
import { useState } from "react";
import { Panel } from "../components/dashboard/Panel";
import { AreaRiskCard } from "../features/flood-risk/AreaRiskCard";
import { FloodProbability } from "../features/flood-risk/FloodProbability";
import { ModelStatus } from "../features/flood-risk/ModelStatus";
import { RiskDrivers } from "../features/flood-risk/RiskDrivers";
import { RiskExplanation } from "../features/flood-risk/RiskExplanation";
import { RiskLevel } from "../features/flood-risk/RiskLevel";
import { RiskMap } from "../features/flood-risk/RiskMap";
import { RiskTimeline } from "../features/flood-risk/RiskTimeline";
import { demoRiskThresholds, riskSourceStatuses } from "../features/flood-risk/risk.utils";
import { getFloodRiskGrid, getFloodRiskPrediction } from "../services/predictionApi";
import { useRiskPrediction } from "../hooks/useRiskPrediction";

type RiskView = "hazard" | "impact";

export function FloodRiskIntelligence() {
  const [selectedZoneId, setSelectedZoneId] = useState("palasia");
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [view, setView] = useState<RiskView>("hazard");
  const { zones, activeZone } = useRiskPrediction(selectedZoneId);
  const prediction = getFloodRiskPrediction(activeZone.id, selectedTimeIndex);
  const riskGrid = getFloodRiskGrid(selectedTimeIndex);

  return (
    <div className="space-y-5 p-4 md:p-6">
      <header className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase text-warning">
            <span className="size-2 rounded-full bg-warning" />
            Deterministic demo scenario · not live
          </div>
          <h1 className="font-display text-2xl font-semibold md:text-3xl">
            Flood risk intelligence
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Explore how illustrative rainfall scenarios relate to location-specific flood
            probability. Inundation depth is modeled separately.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative block min-w-56">
            <MapPin className="absolute left-3 top-2.5 size-4 text-primary" />
            <select
              aria-label="Select monitored area"
              value={activeZone.id}
              onChange={(event) => setSelectedZoneId(event.target.value)}
              className="h-10 w-full appearance-none rounded-md border border-border bg-card pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              {zones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.area}
                </option>
              ))}
            </select>
          </label>
          <Link
            to="/"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-card px-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <CloudRain className="size-4" />
            Rainfall overview
          </Link>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border xl:grid-cols-4">
        <div className="bg-card p-3">
          <div className="text-[10px] uppercase text-muted-foreground">Selected probability</div>
          <div className="mt-1 flex items-baseline gap-1">
            <strong className="font-display text-2xl">{prediction.probability}%</strong>
            <RiskLevel risk={prediction.level} />
          </div>
        </div>
        <div className="bg-card p-3">
          <div className="text-[10px] uppercase text-muted-foreground">Risk trend</div>
          <div className="mt-2 font-display text-xl">{prediction.trend}</div>
        </div>
        <div className="bg-card p-3">
          <div className="text-[10px] uppercase text-muted-foreground">Time to high threshold</div>
          <div className="mt-2 font-display text-xl">
            {prediction.timeToHighMinutes === null
              ? "Outside window"
              : prediction.timeToHighMinutes === 0
                ? "Now"
                : `~${prediction.timeToHighMinutes} min`}
          </div>
        </div>
        <div className="bg-card p-3">
          <div className="text-[10px] uppercase text-muted-foreground">Peak demo risk</div>
          <div className="mt-2 font-display text-xl">{prediction.peakRiskTime}</div>
        </div>
      </section>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.8fr)]">
        <div className="grid gap-5">
          <Panel
            title="Spatial flood risk"
            detail="Illustrative 8 × 8 interpolated probability grid · selectable areas"
            className="overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2">
              <div
                className="inline-flex rounded-md border border-border bg-secondary/60 p-0.5"
                role="group"
                aria-label="Risk map mode"
              >
                <button
                  type="button"
                  aria-pressed={view === "hazard"}
                  onClick={() => setView("hazard")}
                  className={`rounded-sm px-3 py-1.5 text-xs ${view === "hazard" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  Flood hazard
                </button>
                <button
                  type="button"
                  aria-pressed={view === "impact"}
                  onClick={() => setView("impact")}
                  className={`rounded-sm px-3 py-1.5 text-xs ${view === "impact" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  Impact risk
                </button>
              </div>
              <span className="text-[10px] text-muted-foreground">
                {view === "hazard" ? "Probability · 0–100%" : "Exposure layer"}
              </span>
            </div>
            {view === "hazard" ? (
              <RiskMap
                grid={riskGrid}
                zones={zones}
                selectedZoneId={activeZone.id}
                onZoneSelect={setSelectedZoneId}
              />
            ) : (
              <div className="grid h-[360px] place-items-center bg-secondary/35 p-6 text-center sm:h-[440px]">
                <div className="max-w-sm">
                  <div className="text-sm font-semibold">Impact risk is unavailable</div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Population, road, hospital, school, and critical-infrastructure exposure inputs
                    are not connected. Hazard probability is not a substitute for impact risk.
                  </p>
                </div>
              </div>
            )}
            <div className="border-t border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-muted-foreground">0%</span>
                <div
                  className="h-2 flex-1 rounded-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #2a9d8f 0%, #e9c46a 25%, #f4a261 50%, #e76f51 75%, #b42336 100%)",
                  }}
                />
                <span className="text-[9px] text-muted-foreground">100%</span>
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground">
                Cells are spatially interpolated from four demo zones; they are not measured
                grid-cell predictions.
              </p>
            </div>
          </Panel>

          <Panel
            title="Risk evolution"
            detail="Select a horizon to update the map and area summary"
          >
            <RiskTimeline
              forecast={prediction.forecast}
              selectedIndex={selectedTimeIndex}
              onSelect={setSelectedTimeIndex}
            />
          </Panel>
        </div>

        <div className="grid gap-5">
          <AreaRiskCard zone={activeZone} prediction={prediction} />
          <Panel title="Contributing factors" detail="Source status, not model feature weights">
            <div className="p-4">
              <RiskDrivers drivers={prediction.drivers} />
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-2">
        <Panel
          title="Why this area is at risk"
          detail="Interpretation of the selected demo scenario"
        >
          <RiskExplanation prediction={prediction} areaName={activeZone.name} />
          <div className="border-t border-border px-4 py-3 text-[10px] text-muted-foreground">
            Demo classification ranges: Low &lt;25%, Moderate 25–49%, High 50–74%, Critical ≥75%.
            These thresholds are illustrative and not calibrated.
          </div>
        </Panel>
        <Panel title="Model & data status" detail="No live feeds or trained risk model connected">
          <ModelStatus sources={riskSourceStatuses} />
        </Panel>
      </div>
    </div>
  );
}
