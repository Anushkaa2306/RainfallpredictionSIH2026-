import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, CheckCircle2, CloudRain, Droplets, Hospital, MapPin, Navigation, Radio, School, ShieldCheck, Waves, Wind } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "../components/button";
import hero from "../assets/hero.png";

const metrics = [
  { icon: CloudRain, label: "Rainfall now", value: "38", unit: "mm/hr", note: "↑ 14 in 30 min", tone: "text-primary" },
  { icon: Waves, label: "Flood probability", value: "76", unit: "%", note: "High risk", tone: "text-critical" },
  { icon: Droplets, label: "Peak depth", value: "1.4", unit: "m", note: "Expected 18:15", tone: "text-warning" },
  { icon: Wind, label: "Storm movement", value: "24", unit: "km/h", note: "Westerly", tone: "text-safe" },
];

const indiaNetwork = [
  { region: "Indore", risk: "High", severity: "2.2x", trend: "Rising" },
  { region: "Bhopal", risk: "Moderate", severity: "1.4x", trend: "Stable" },
  { region: "Nagpur", risk: "Moderate", severity: "1.1x", trend: "Watch" },
  { region: "Mumbai", risk: "Low", severity: "0.8x", trend: "Recovering" },
];

const services = [
  { icon: School, name: "Vijay Nagar Shelter", meta: "1.6 km · 168 spaces", tone: "text-safe" },
  { icon: Hospital, name: "Choithram Hospital", meta: "2.1 km · ER open", tone: "text-primary" },
  { icon: Radio, name: "Indore Control Room", meta: "1916 · 24 hours", tone: "text-warning" },
];

const rainfall = [
  { t: "Now", actual: 38, forecast: 38 }, { t: "+1h", actual: null, forecast: 54 }, { t: "+2h", actual: null, forecast: 68 },
  { t: "+3h", actual: null, forecast: 61 }, { t: "+4h", actual: null, forecast: 43 }, { t: "+5h", actual: null, forecast: 26 }, { t: "+6h", actual: null, forecast: 18 },
];

const zones = [
  { id: "palasia", name: "Palasia", risk: "Critical", chance: "82%", level: "1.3 m", area: "Palasia, Indore", lng: 75.8712, lat: 22.7207 },
  { id: "vijay-nagar", name: "Vijay Nagar", risk: "High", chance: "71%", level: "0.9 m", area: "Vijay Nagar, Indore", lng: 75.8954, lat: 22.7549 },
  { id: "rajwada", name: "Rajwada", risk: "Moderate", chance: "49%", level: "0.5 m", area: "Rajwada, Indore", lng: 75.8756, lat: 22.7173 },
  { id: "annapurna", name: "Annapurna", risk: "Low", chance: "21%", level: "< 0.2 m", area: "Annapurna, Indore", lng: 75.8534, lat: 22.6942 },
];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "FloodWatch AI — India Monsoon Risk" },
    { name: "description", content: "Live rainfall, flood probability, warnings, and safe-route guidance for Indore and the wider India resilience network." },
    { property: "og:title", content: "FloodWatch AI — India Monsoon Risk" },
    { property: "og:description", content: "Live rainfall, flood probability, warnings, and safe-route guidance for Indore and the wider India resilience network." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Dashboard,
});

function Panel({ title, detail, children, className = "" }: { title: string; detail?: string; children: React.ReactNode; className?: string }) {
  return <section className={`rounded-lg border border-border bg-card ${className}`}><header className="flex items-center justify-between border-b border-border px-4 py-3"><div><h2 className="font-display text-sm font-semibold">{title}</h2>{detail && <p className="mt-0.5 text-[11px] text-muted-foreground">{detail}</p>}</div></header>{children}</section>;
}

function Dashboard() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Record<string, maplibregl.Marker>>({});
  const [acknowledged, setAcknowledged] = useState(false);
  const [selectedZoneId, setSelectedZoneId] = useState("palasia");
  const [route, setRoute] = useState(false);
  const [layers, setLayers] = useState(["Flood risk", "Roads"]);

  const toggleLayer = (name: string) => setLayers((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  const activeZone = zones.find((zone) => zone.id === selectedZoneId) ?? zones[0];

  const createZoneMarker = (zone: (typeof zones)[number], isSelected: boolean) => {
    const riskColors: Record<string, string> = {
      Critical: "#ef4444",
      High: "#f59e0b",
      Moderate: "#60a5fa",
      Low: "#22c55e",
    };

    const el = document.createElement("button");
    el.type = "button";
    el.style.border = "none";
    el.style.background = "transparent";
    el.style.cursor = "pointer";
    el.style.padding = "0";
    el.style.display = "block";
    el.style.font = "inherit";
    el.style.position = "relative";

    el.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px; transform:translate(-50%, -50%);">
        <span style="display:inline-block; width:${isSelected ? 15 : 12}px; height:${isSelected ? 15 : 12}px; border-radius:9999px; border:2px solid rgba(255,255,255,0.96); background:${riskColors[zone.risk as keyof typeof riskColors]}; box-shadow:${isSelected ? "0 0 0 8px rgba(239,68,68,0.15), 0 14px 26px rgba(15,23,42,0.22)" : "0 0 0 6px rgba(148,163,184,0.12), 0 10px 20px rgba(15,23,42,0.18)"};"></span>
        <span style="display:inline-flex; align-items:center; justify-content:center; padding:5px 10px; border-radius:9999px; background:rgba(255,255,255,0.88); border:1px solid rgba(15,23,42,0.08); color:#111827; font-size:10px; font-weight:700; letter-spacing:0.04em; box-shadow:0 8px 20px rgba(15,23,42,0.12); white-space:nowrap;">${zone.name}</span>
      </div>
    `;

    el.addEventListener("click", () => setSelectedZoneId(zone.id));

    return el;
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
      center: [75.8727, 22.7196],
      zoom: 12.3,
      pitch: 0,
      antialias: true,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true, showZoom: true }), "top-right");
    map.addControl(new maplibregl.ScaleControl(), "bottom-left");
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");
    mapRef.current = map;

    const renderMarkers = () => {
      Object.values(markersRef.current).forEach((marker) => marker.remove());
      markersRef.current = {};

      zones.forEach((zone) => {
        const el = createZoneMarker(zone, zone.id === selectedZoneId);

        const marker = new maplibregl.Marker({
          element: el,
          anchor: "center",
        })
          .setLngLat([zone.lng, zone.lat])
          .addTo(map);

        markersRef.current[zone.id] = marker;
      });
    };

    renderMarkers();

    return () => {
      Object.values(markersRef.current).forEach((marker) => marker.remove());
      markersRef.current = {};
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const zone = zones.find((item) => item.id === selectedZoneId) ?? zones[0];

    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    zones.forEach((item) => {
      const el = createZoneMarker(item, item.id === selectedZoneId);

      const marker = new maplibregl.Marker({
        element: el,
        anchor: "center",
      })
        .setLngLat([item.lng, item.lat])
        .addTo(map);

      markersRef.current[item.id] = marker;
    });

    map.flyTo({
      center: [zone.lng, zone.lat],
      zoom: 12.7,
      essential: true,
      pitch: 0,
    });
  }, [selectedZoneId]);

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

    <section className="mb-5 grid gap-4 border-l-4 border-critical bg-critical/10 p-4 md:grid-cols-[1fr_auto] md:items-center">
      <div className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-md bg-critical text-critical-foreground"><AlertTriangle className="size-5" /></span><div><div className="text-xs font-bold uppercase text-critical">Severe urban flood warning · Until 19:30</div><h2 className="mt-1 font-display text-lg font-semibold">Avoid travel through {activeZone.name} and nearby low-lying drains</h2><p className="mt-1 max-w-3xl text-sm text-muted-foreground">Rapid water rise is expected within 40 minutes. Keep emergency vehicles away from low-lying crossings and move residents to elevated shelters.</p></div></div>
      <Button onClick={() => setAcknowledged(true)} variant={acknowledged ? "secondary" : "danger"}>{acknowledged ? <CheckCircle2 className="size-4" /> : null}{acknowledged ? "Acknowledged" : "Acknowledge warning"}</Button>
    </section>

    <div className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
      {metrics.map(({ icon: Icon, label, value, unit, note, tone }) => <div key={label} className="rounded-lg border border-border bg-card p-4"><div className="flex items-center justify-between text-xs text-muted-foreground"><span>{label}</span><Icon className={`size-4 ${tone}`} /></div><div className="mt-3 flex items-end gap-1"><strong className="font-display text-3xl">{value}</strong><span className="mb-1 text-xs text-muted-foreground">{unit}</span></div><div className={`mt-2 text-xs ${tone}`}>{note}</div></div>)}
    </div>

    <div className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
      <Panel title="Real-time telemetry map" detail={`Zone feed · ${activeZone.name} selected`} className="overflow-hidden">
        <div className="relative min-h-[420px] overflow-hidden bg-panel">
          <div ref={mapContainerRef} className="h-[420px] w-full" aria-label="MapLibre flood risk map of Indore" />

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
      <div className="grid gap-5">
        <Panel title="6-hour rainfall outlook" detail="AI ensemble · 87% confidence"><div className="h-56 p-3"><ResponsiveContainer width="100%" height="100%"><AreaChart data={rainfall}><defs><linearGradient id="rain" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.55}/><stop offset="100%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="var(--border)" vertical={false}/><XAxis dataKey="t" tick={{fill:"var(--muted-foreground)",fontSize:10}} axisLine={false} tickLine={false}/><YAxis tick={{fill:"var(--muted-foreground)",fontSize:10}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:6}}/><Area type="monotone" dataKey="forecast" stroke="var(--primary)" strokeWidth={2} fill="url(#rain)" /></AreaChart></ResponsiveContainer></div></Panel>
        <Panel title="Get to safety" detail="Routes avoid flooded and low-lying roads"><div className="p-4"><div className="mb-3 flex gap-2"><Button className="flex-1" onClick={() => setRoute(true)}><Navigation className="size-4" />Find safe route</Button><Button variant="secondary" size="icon" aria-label="Emergency services"><Hospital className="size-4" /></Button></div>{route ? <div className="rounded-md border border-safe/40 bg-safe/10 p-3"><div className="flex items-center gap-2 text-sm font-semibold text-safe"><ShieldCheck className="size-4" />Route ready · 12 min</div><p className="mt-1 text-xs text-muted-foreground">Via 80 Feet Road to National Games Village shelter. Avoid Ejipura Main Road.</p></div> : <p className="text-xs text-muted-foreground">Your nearest open shelter is National Games Village, 1.8 km away.</p>}</div></Panel>
      </div>
    </div>

    <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
      <Panel title="Monitored zones" detail="Predicted maximum within 3 hours"><div className="overflow-x-auto"><table className="w-full min-w-[580px] text-left text-sm"><thead className="bg-secondary/60 text-[10px] uppercase text-muted-foreground"><tr><th className="px-4 py-2">Area</th><th>Risk</th><th>Flood chance</th><th>Peak depth</th><th></th></tr></thead><tbody>{zones.map((zone) => <tr key={zone.name} className="border-t border-border"><td className="px-4 py-3 font-medium">{zone.name}</td><td><span className={`rounded-sm px-2 py-1 text-[10px] font-bold ${zone.risk === "Critical" ? "bg-critical/15 text-critical" : zone.risk === "High" ? "bg-warning/15 text-warning" : zone.risk === "Moderate" ? "bg-primary/15 text-primary" : "bg-safe/15 text-safe"}`}>{zone.risk}</span></td><td>{zone.chance}</td><td>{zone.level}</td><td><Link to="/inundation" className="text-primary"><ArrowRight className="size-4" /></Link></td></tr>)}</tbody></table></div></Panel>
      <Panel title="National network" detail="India-wide readiness index"><div className="space-y-3 p-3">{indiaNetwork.map((city) => <div key={city.region} className="flex items-center justify-between rounded-md border border-border bg-secondary/60 p-3"><div><div className="text-sm font-medium">{city.region}</div><div className="text-[11px] text-muted-foreground">{city.trend} · {city.severity} risk load</div></div><span className={`rounded-sm px-2 py-1 text-[10px] font-bold ${city.risk === "High" ? "bg-warning/15 text-warning" : city.risk === "Moderate" ? "bg-primary/15 text-primary" : "bg-safe/15 text-safe"}`}>{city.risk}</span></div>)}</div></Panel>
    </div>

    <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
      <Panel title="Nearby critical services" detail="Verified availability"><div className="divide-y divide-border">{services.map(({ icon: Icon, name, meta, tone }) => <div key={name} className="flex items-center gap-3 p-4"><span className="grid size-9 place-items-center rounded-md bg-secondary"><Icon className={`size-4 ${tone}`} /></span><div><div className="text-sm font-medium">{name}</div><div className="text-xs text-muted-foreground">{meta}</div></div></div>)}</div></Panel>
      <Panel title="Live data source" detail="Operational feed from network sensors"><div className="space-y-3 p-4 text-sm text-muted-foreground"><div className="rounded-md border border-border bg-secondary/60 p-3"><div className="font-medium text-foreground">Rain gauges</div><div className="mt-1">12 active sensors · 97.4% uptime</div></div><div className="rounded-md border border-border bg-secondary/60 p-3"><div className="font-medium text-foreground">Smart drains</div><div className="mt-1">7 of 9 channels reporting flow above threshold</div></div><div className="rounded-md border border-border bg-secondary/60 p-3"><div className="font-medium text-foreground">Evacuation command</div><div className="mt-1">3 shelters opened · 1,240 residents alerted</div></div></div></Panel>
    </div>
  </div>;
}
