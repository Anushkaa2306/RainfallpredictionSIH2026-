import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, CheckCircle2, CloudRain, Crosshair, Droplets, Hospital, MapPin, Navigation, Radio, School, ShieldCheck, Waves, Wind } from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "../components/button";

const rainfall = [
  { t: "Now", actual: 28, forecast: 28 }, { t: "+1h", actual: null, forecast: 42 }, { t: "+2h", actual: null, forecast: 58 },
  { t: "+3h", actual: null, forecast: 46 }, { t: "+4h", actual: null, forecast: 31 }, { t: "+5h", actual: null, forecast: 18 }, { t: "+6h", actual: null, forecast: 11 },
];
const zones = [
  { name: "Koramangala", risk: "Critical", chance: "84%", level: "1.2 m" },
  { name: "HSR Layout", risk: "High", chance: "68%", level: "0.8 m" },
  { name: "BTM Layout", risk: "Moderate", chance: "42%", level: "0.4 m" },
  { name: "Indiranagar", risk: "Low", chance: "18%", level: "< 0.2 m" },
];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Live Flood Risk — FloodWatch AI" },
    { name: "description", content: "Live rainfall, flood probability, warnings, and safe-route guidance for Bengaluru." },
    { property: "og:title", content: "Live Flood Risk — FloodWatch AI" },
    { property: "og:description", content: "Live rainfall, flood probability, warnings, and safe-route guidance for Bengaluru." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Dashboard,
});

function Panel({ title, detail, children, className = "" }: { title: string; detail?: string; children: React.ReactNode; className?: string }) {
  return <section className={`rounded-lg border border-border bg-card ${className}`}><header className="flex items-center justify-between border-b border-border px-4 py-3"><div><h2 className="font-display text-sm font-semibold">{title}</h2>{detail && <p className="mt-0.5 text-[11px] text-muted-foreground">{detail}</p>}</div></header>{children}</section>;
}

function Dashboard() {
  const [acknowledged, setAcknowledged] = useState(false);
  const [area, setArea] = useState("Koramangala, Bengaluru");
  const [route, setRoute] = useState(false);
  const [layers, setLayers] = useState(["Flood risk", "Roads"]);
  const toggleLayer = (name: string) => setLayers((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);

  return <div className="p-4 md:p-6">
    <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
      <div><div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground"><span className="size-2 rounded-full bg-critical radar-pulse" />LIVE · Updated 42 seconds ago</div><h1 className="font-display text-2xl font-semibold md:text-3xl">Flood risk overview</h1><p className="mt-1 text-sm text-muted-foreground">Bengaluru Urban District · Saturday, 26 September</p></div>
      <label className="relative block w-full xl:w-80"><MapPin className="absolute left-3 top-2.5 size-4 text-primary" /><select value={area} onChange={(event) => setArea(event.target.value)} className="h-10 w-full appearance-none rounded-md border border-border bg-secondary pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"><option>Koramangala, Bengaluru</option><option>HSR Layout, Bengaluru</option><option>BTM Layout, Bengaluru</option></select></label>
    </div>

    <section className="mb-5 grid gap-4 border-l-4 border-critical bg-critical/10 p-4 md:grid-cols-[1fr_auto] md:items-center">
      <div className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-md bg-critical text-critical-foreground"><AlertTriangle className="size-5" /></span><div><div className="text-xs font-bold uppercase text-critical">Severe flood warning · Until 19:30</div><h2 className="mt-1 font-display text-lg font-semibold">Avoid travel through Koramangala 4th Block</h2><p className="mt-1 max-w-3xl text-sm text-muted-foreground">Rapid water rise is expected within 45 minutes. Move vehicles to higher ground and keep away from storm drains.</p></div></div>
      <Button onClick={() => setAcknowledged(true)} variant={acknowledged ? "secondary" : "danger"}>{acknowledged ? <CheckCircle2 className="size-4" /> : null}{acknowledged ? "Acknowledged" : "Acknowledge warning"}</Button>
    </section>

    <div className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
      {[
        [CloudRain, "Rainfall now", "28", "mm/hr", "↑ 12 in 30 min", "text-primary"],
        [Waves, "Flood probability", "84", "%", "Critical", "text-critical"],
        [Droplets, "Peak depth", "1.2", "m", "Expected 17:45", "text-warning"],
        [Wind, "Storm movement", "18", "km/h", "North-east", "text-safe"],
      ].map(([Icon, label, value, unit, note, tone]) => <div key={String(label)} className="rounded-lg border border-border bg-card p-4"><div className="flex items-center justify-between text-xs text-muted-foreground"><span>{label as string}</span><Icon className={`size-4 ${tone}`} /></div><div className="mt-3 flex items-end gap-1"><strong className="font-display text-3xl">{value as string}</strong><span className="mb-1 text-xs text-muted-foreground">{unit as string}</span></div><div className={`mt-2 text-xs ${tone}`}>{note as string}</div></div>)}
    </div>

    <div className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
      <Panel title="Live flood intelligence" detail="Forecast overlay · 16:20 local" className="overflow-hidden">
        <div className="relative min-h-[420px] overflow-hidden bg-panel">
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)", backgroundSize: "36px 36px" }} />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 440" aria-label="Flood risk map of Bengaluru"><path d="M-30 350 C120 260 170 330 295 230 S520 115 840 185" fill="none" stroke="var(--cyan)" strokeWidth="16" opacity=".5"/><path d="M0 85 L170 160 L265 130 L390 220 L520 195 L770 350" fill="none" stroke="var(--muted-foreground)" strokeWidth="4" opacity=".55"/><path d="M90 410 L150 300 L260 275 L340 150 L520 55" fill="none" stroke="var(--muted-foreground)" strokeWidth="3" opacity=".45"/><path d="M245 215 C300 145 465 145 520 230 C570 310 430 370 320 335 C245 312 205 270 245 215Z" fill="var(--critical)" opacity=".38"/><path d="M190 180 C280 80 520 90 610 225 C675 330 530 410 310 390 C145 375 92 290 190 180Z" fill="var(--warning)" opacity=".17"/></svg>
          {[{x:"43%",y:"53%",label:"KORAMANGALA",critical:true},{x:"65%",y:"67%",label:"HSR LAYOUT",critical:false},{x:"28%",y:"70%",label:"BTM LAYOUT",critical:false}].map((pin) => <div key={pin.label} className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{left:pin.x,top:pin.y}}><span className={`mx-auto block size-4 rounded-full border-4 ${pin.critical ? "border-critical bg-critical/40" : "border-warning bg-warning/40"}`} /><span className="mt-1 block bg-background/80 px-1.5 py-0.5 text-[9px] font-bold">{pin.label}</span></div>)}
          <div className="absolute left-3 top-3 flex flex-col gap-2 rounded-md border border-border bg-background/90 p-2">{["Flood risk","Roads","Shelters","Hospitals"].map((layer) => <label key={layer} className="flex cursor-pointer items-center gap-2 text-xs"><input type="checkbox" checked={layers.includes(layer)} onChange={() => toggleLayer(layer)} className="accent-[var(--primary)]" />{layer}</label>)}</div>
          <Button size="icon" variant="secondary" className="absolute bottom-4 right-4" aria-label="Center map"><Crosshair className="size-4" /></Button>
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 rounded-md border border-border bg-background/90 px-3 py-2 text-[10px]"><span><i className="mr-1 inline-block size-2 rounded-full bg-safe" />Low</span><span><i className="mr-1 inline-block size-2 rounded-full bg-warning" />High</span><span><i className="mr-1 inline-block size-2 rounded-full bg-critical" />Critical</span></div>
        </div>
      </Panel>
      <div className="grid gap-5">
        <Panel title="6-hour rainfall outlook" detail="AI ensemble · 87% confidence"><div className="h-56 p-3"><ResponsiveContainer width="100%" height="100%"><AreaChart data={rainfall}><defs><linearGradient id="rain" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.55}/><stop offset="100%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="var(--border)" vertical={false}/><XAxis dataKey="t" tick={{fill:"var(--muted-foreground)",fontSize:10}} axisLine={false} tickLine={false}/><YAxis tick={{fill:"var(--muted-foreground)",fontSize:10}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:6}}/><Area type="monotone" dataKey="forecast" stroke="var(--primary)" strokeWidth={2} fill="url(#rain)" /></AreaChart></ResponsiveContainer></div></Panel>
        <Panel title="Get to safety" detail="Routes avoid flooded and low-lying roads"><div className="p-4"><div className="mb-3 flex gap-2"><Button className="flex-1" onClick={() => setRoute(true)}><Navigation className="size-4" />Find safe route</Button><Button variant="secondary" size="icon" aria-label="Emergency services"><Hospital className="size-4" /></Button></div>{route ? <div className="rounded-md border border-safe/40 bg-safe/10 p-3"><div className="flex items-center gap-2 text-sm font-semibold text-safe"><ShieldCheck className="size-4" />Route ready · 12 min</div><p className="mt-1 text-xs text-muted-foreground">Via 80 Feet Road to National Games Village shelter. Avoid Ejipura Main Road.</p></div> : <p className="text-xs text-muted-foreground">Your nearest open shelter is National Games Village, 1.8 km away.</p>}</div></Panel>
      </div>
    </div>

    <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
      <Panel title="Monitored zones" detail="Predicted maximum within 3 hours"><div className="overflow-x-auto"><table className="w-full min-w-[580px] text-left text-sm"><thead className="bg-secondary/60 text-[10px] uppercase text-muted-foreground"><tr><th className="px-4 py-2">Area</th><th>Risk</th><th>Flood chance</th><th>Peak depth</th><th></th></tr></thead><tbody>{zones.map((zone) => <tr key={zone.name} className="border-t border-border"><td className="px-4 py-3 font-medium">{zone.name}</td><td><span className={`rounded-sm px-2 py-1 text-[10px] font-bold ${zone.risk === "Critical" ? "bg-critical/15 text-critical" : zone.risk === "High" ? "bg-warning/15 text-warning" : zone.risk === "Moderate" ? "bg-primary/15 text-primary" : "bg-safe/15 text-safe"}`}>{zone.risk}</span></td><td>{zone.chance}</td><td>{zone.level}</td><td><Link to="/inundation" className="text-primary"><ArrowRight className="size-4" /></Link></td></tr>)}</tbody></table></div></Panel>
      <Panel title="Nearby critical services" detail="Verified availability"><div className="divide-y divide-border">{[[School,"NGV Emergency Shelter","1.8 km · 142 spaces","text-safe"],[Hospital,"St. John’s Hospital","2.4 km · ER open","text-primary"],[Radio,"BBMP Control Room","1916 · 24 hours","text-warning"]].map(([Icon,name,meta,tone]) => <div key={String(name)} className="flex items-center gap-3 p-4"><span className="grid size-9 place-items-center rounded-md bg-secondary"><Icon className={`size-4 ${tone}`} /></span><div><div className="text-sm font-medium">{name as string}</div><div className="text-xs text-muted-foreground">{meta as string}</div></div></div>)}</div></Panel>
    </div>
  </div>;
}
