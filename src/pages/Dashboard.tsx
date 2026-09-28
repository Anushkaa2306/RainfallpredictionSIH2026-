import { Link } from "@tanstack/react-router";
import { ArrowRight, Hospital, MapPin } from "lucide-react";
import { useState } from "react";
import { CriticalServices } from "../components/emergency/CriticalServices";
import { Panel } from "../components/dashboard/Panel";
import { FloodRiskMap } from "../components/map/FloodRiskMap";
import { RainfallOutlook } from "../components/prediction/RainfallOutlook";
import { WarningBanner } from "../components/warning/WarningBanner";
import hero from "../assets/hero.png";
import { indiaNetwork, metrics } from "../data/demo/flood-risk";
import { useMapLayers } from "../hooks/useMapLayers";
import { useRiskPrediction } from "../hooks/useRiskPrediction";
import { useSafeRoute } from "../hooks/useSafeRoute";
import { getSafeRoute } from "../services/routeApi";
import { RoutePlanner } from "../features/safe-routes/RoutePlanner";
import { FloodProbability } from "../features/flood-risk/FloodProbability";
import { RiskLevel } from "../features/flood-risk/RiskLevel";
import { RiskDrivers } from "../features/flood-risk/RiskDrivers";

export function Dashboard() {
  const [acknowledged, setAcknowledged] = useState(false);
  const [selectedZoneId, setSelectedZoneId] = useState("palasia");
  const { layers, toggleLayer } = useMapLayers();
  const { routeReady, findSafeRoute } = useSafeRoute();
  const { zones, activeZone } = useRiskPrediction(selectedZoneId);
  const safeRoute = getSafeRoute();

  return <div className="p-4 md:p-6">
    <section className="relative mb-5 overflow-hidden rounded-lg border border-border">
      <img src={hero} alt="Indore monsoon flood resilience overview across the city" width={1920} height={800} className="h-52 w-full object-cover md:h-72" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-background/10" />
      <div className="absolute bottom-0 left-0 max-w-2xl p-5 md:p-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">FloodWatch AI · India network · Indore</p>
        <h2 className="mt-2 font-display text-xl font-semibold leading-tight md:text-5xl">Real-time flood intelligence for all India</h2>
        <p className="mt-2 text-sm text-muted-foreground">Live rainfall risk, waterlogging outlooks, and life-saving route guidance for Indore, with a scalable model ready for the wider national network.</p>
      </div>
    </section>
    <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
      <div><div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground"><span className="size-2 rounded-full bg-critical radar-pulse" />LIVE · Updated 42 seconds ago</div><h1 className="font-display text-2xl font-semibold md:text-3xl">Flood risk overview</h1><p className="mt-1 text-sm text-muted-foreground">Indore, Madhya Pradesh · Sunday, 28 September</p></div>
      <label className="relative block w-full xl:w-80"><MapPin className="absolute left-3 top-2.5 size-4 text-primary" /><select value={selectedZoneId} onChange={(event) => setSelectedZoneId(event.target.value)} className="h-10 w-full appearance-none rounded-md border border-border bg-secondary pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring">{zones.map((zone) => <option key={zone.id} value={zone.id}>{zone.area}</option>)}</select></label>
    </div>

    <WarningBanner zoneName={activeZone.name} acknowledged={acknowledged} onAcknowledge={() => setAcknowledged(true)} />

    <div className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
      {metrics.map(({ icon: Icon, label, value, unit, note, tone }) => <div key={label} className="rounded-lg border border-border bg-card p-4"><div className="flex items-center justify-between text-xs text-muted-foreground"><span>{label}</span><Icon className={`size-4 ${tone}`} /></div><div className="mt-3 flex items-end gap-1"><strong className="font-display text-3xl">{value}</strong><span className="mb-1 text-xs text-muted-foreground">{unit}</span></div><div className={`mt-2 text-xs ${tone}`}>{note}</div></div>)}
    </div>

    <div className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
      <Panel title="Real-time telemetry map" detail={`Zone feed · ${activeZone.name} selected`} className="overflow-hidden">
        <div className="relative min-h-[420px] overflow-hidden bg-panel">
          <FloodRiskMap selectedZoneId={selectedZoneId} onZoneSelect={setSelectedZoneId} />

          <div className="absolute left-3 top-3 flex flex-col gap-2 rounded-md border border-border bg-background/90 p-2 backdrop-blur-sm">{["Flood risk","Roads","Shelters","Hospitals"].map((layer) => <label key={layer} className="flex cursor-pointer items-center gap-2 text-xs"><input type="checkbox" checked={layers.includes(layer)} onChange={() => toggleLayer(layer)} className="accent-[var(--primary)]" />{layer}</label>)}</div>

          <div className="absolute left-3 bottom-4 rounded-md border border-border bg-background/90 px-3 py-2 text-[10px] font-medium text-foreground shadow-lg backdrop-blur-sm">
            <div className="mb-1.5 font-semibold uppercase tracking-[0.12em] text-muted-foreground">Selected area</div>
            <div className="text-sm font-semibold text-foreground">{activeZone.name}</div>
            <div className="mt-1 text-[10px] text-muted-foreground">{activeZone.risk} risk · {activeZone.level}</div>
          </div>

          <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-md border border-border bg-background/90 px-3 py-2 text-[10px] font-medium text-foreground shadow-lg backdrop-blur-sm"><span className="size-2 rounded-full bg-safe animate-pulse" />Live data feed</div>
          <div className="absolute right-4 top-3 flex flex-wrap gap-2 rounded-md border border-border bg-background/90 px-3 py-2 text-[10px] shadow-lg backdrop-blur-sm"><span><i className="mr-1 inline-block size-2 rounded-full bg-safe" />Low</span><span><i className="mr-1 inline-block size-2 rounded-full bg-warning" />High</span><span><i className="mr-1 inline-block size-2 rounded-full bg-critical" />Critical</span></div>
        </div>
      </Panel>
      <div className="grid gap-5"><RainfallOutlook /><RoutePlanner route={safeRoute} ready={routeReady} onFindRoute={findSafeRoute} /></div>
    </div>

    <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
      <Panel title="Monitored zones" detail="Predicted maximum within 3 hours"><div className="overflow-x-auto"><table className="w-full min-w-[640px] text-left text-sm"><thead className="bg-secondary/60 text-[10px] uppercase text-muted-foreground"><tr><th className="px-4 py-2">Area</th><th>Risk</th><th>Flood chance</th><th>Peak depth</th><th></th></tr></thead><tbody>{zones.map((zone) => <tr key={zone.name} className="border-t border-border"><td className="px-4 py-3 font-medium">{zone.name}</td><td><RiskLevel risk={zone.risk} /></td><td><FloodProbability probability={Number.parseInt(zone.chance, 10)} /></td><td>{zone.level}</td><td><Link to="/inundation" className="text-primary"><ArrowRight className="size-4" /></Link></td></tr>)}</tbody></table></div></Panel>
      <div className="grid content-start gap-5"><Panel title="National network" detail="India-wide readiness index"><div className="space-y-3 p-3">{indiaNetwork.map((city) => <div key={city.region} className="flex items-center justify-between rounded-md border border-border bg-secondary/60 p-3"><div><div className="text-sm font-medium">{city.region}</div><div className="text-[11px] text-muted-foreground">{city.trend} · {city.severity} risk load</div></div><span className={`rounded-sm px-2 py-1 text-[10px] font-bold ${city.risk === "High" ? "bg-warning/15 text-warning" : city.risk === "Moderate" ? "bg-primary/15 text-primary" : "bg-safe/15 text-safe"}`}>{city.risk}</span></div>)}</div></Panel><Panel title="Risk drivers" detail="Model feature attribution"><div className="p-4"><RiskDrivers /></div></Panel></div>
    </div>

    <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
      <CriticalServices />
      <Panel title="Live data source" detail="Operational feed from network sensors"><div className="space-y-3 p-4 text-sm text-muted-foreground"><div className="rounded-md border border-border bg-secondary/60 p-3"><div className="font-medium text-foreground">Rain gauges</div><div className="mt-1">12 active sensors · 97.4% uptime</div></div><div className="rounded-md border border-border bg-secondary/60 p-3"><div className="font-medium text-foreground">Smart drains</div><div className="mt-1">7 of 9 channels reporting flow above threshold</div></div><div className="rounded-md border border-border bg-secondary/60 p-3"><div className="font-medium text-foreground">Evacuation command</div><div className="mt-1">3 shelters opened · 1,240 residents alerted</div></div></div></Panel>
    </div>
  </div>;
}
