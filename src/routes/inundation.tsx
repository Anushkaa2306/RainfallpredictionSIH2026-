import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Building2, Clock3, Droplets, Info, Maximize2, Navigation, School, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/button";
import { TerrainScene } from "../components/terrain-scene";

export const Route = createFileRoute("/inundation")({
  ssr: false,
  head: () => ({ meta: [
    { title: "Inundation Prediction — FloodWatch AI" },
    { name: "description", content: "Interactive 3D flood-depth prediction and affected infrastructure outlook." },
    { property: "og:title", content: "Inundation Prediction — FloodWatch AI" },
    { property: "og:description", content: "Interactive 3D flood-depth prediction and affected infrastructure outlook." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: InundationPage,
});

const timeline = [
  { hour: "Now", depth: "0.42 m", affected: "1.8 km²" }, { hour: "+1h", depth: "0.68 m", affected: "2.6 km²" },
  { hour: "+2h", depth: "0.94 m", affected: "3.4 km²" }, { hour: "+3h", depth: "1.20 m", affected: "4.1 km²" },
  { hour: "+4h", depth: "0.88 m", affected: "3.3 km²" }, { hour: "+6h", depth: "0.36 m", affected: "1.4 km²" },
];

const fallbackPoint = { hour: "Now", depth: "0.42 m", affected: "1.8 km²" };
const infrastructure = [
  { icon: Building2, label: "Residential buildings", count: "312", note: "47 critical" },
  { icon: School, label: "Schools & shelters", count: "6", note: "2 inaccessible" },
  { icon: Droplets, label: "Stormwater drains", count: "18", note: "11 overloaded" },
];

function InundationPage() {
  const [timeIndex, setTimeIndex] = useState(3);
  const point = timeline[timeIndex] ?? fallbackPoint;
  return <div className="p-4 md:p-6">
    <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><Link to="/" className="mb-3 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" />Risk overview</Link><h1 className="font-display text-2xl font-semibold md:text-3xl">Inundation prediction</h1><p className="mt-1 text-sm text-muted-foreground">Koramangala basin · AI terrain model · 10 m resolution</p></div><div className="flex gap-2"><Button variant="secondary"><Maximize2 className="size-4" />Expand view</Button><Button><Navigation className="size-4" />Plan route</Button></div></div>

    <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
      <section className="overflow-hidden rounded-lg border border-border bg-card">
        <header className="flex items-center justify-between border-b border-border px-4 py-3"><div><h2 className="font-display text-sm font-semibold">Predicted flood extent</h2><p className="mt-0.5 text-[11px] text-muted-foreground">Drag to rotate · Scroll to zoom</p></div><div className="flex items-center gap-2 text-xs"><span className="size-2 rounded-full bg-warning radar-pulse" /><span>{point.hour} scenario</span></div></header>
        <div className="relative h-[55vh] min-h-[430px]"><TerrainScene level={timeIndex} /><div className="pointer-events-none absolute left-3 top-3 rounded-md border border-border bg-background/85 p-3 backdrop-blur"><div className="text-[10px] uppercase text-muted-foreground">Peak depth</div><div className="mt-1 font-display text-2xl font-semibold text-warning">{point.depth}</div><div className="mt-1 text-[11px] text-muted-foreground">Affected {point.affected}</div></div><div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center gap-3 rounded-md border border-border bg-background/85 p-3 backdrop-blur"><span className="text-[10px] text-muted-foreground">DEPTH</span><div className="h-2 flex-1 rounded-full bg-linear-to-r from-primary via-warning to-critical"/><div className="flex gap-3 text-[9px] text-muted-foreground"><span>0.2 m</span><span>0.8 m</span><span>1.5+ m</span></div></div></div>
      </section>

      <div className="space-y-5">
        <section className="rounded-lg border border-border bg-card p-4"><div className="flex items-center gap-2"><Clock3 className="size-4 text-primary" /><h2 className="font-display text-sm font-semibold">Forecast time</h2></div><div className="mt-4 text-center"><strong className="font-display text-4xl">{point.hour}</strong><p className="mt-1 text-xs text-muted-foreground">Saturday · {timeIndex === 0 ? "16:20" : `${16 + timeIndex}:20`}</p></div><input className="mt-5 w-full accent-[var(--primary)]" type="range" min="0" max="5" value={timeIndex} onChange={(event) => setTimeIndex(Number(event.target.value))}/><div className="mt-2 flex justify-between text-[9px] text-muted-foreground"><span>NOW</span><span>+3H</span><span>+6H</span></div></section>
        <section className="rounded-lg border border-critical/40 bg-critical/10 p-4"><div className="flex gap-3"><TriangleAlert className="size-5 shrink-0 text-critical"/><div><h2 className="text-sm font-semibold">312 buildings at risk</h2><p className="mt-1 text-xs text-muted-foreground">47 are projected to experience water above ground-floor threshold.</p></div></div></section>
        <section className="rounded-lg border border-border bg-card"><header className="border-b border-border px-4 py-3"><h2 className="font-display text-sm font-semibold">Affected infrastructure</h2></header><div className="divide-y divide-border">{infrastructure.map(({ icon: Icon, label, count, note }) => <div key={label} className="flex items-center gap-3 p-4"><span className="grid size-8 place-items-center rounded-md bg-secondary"><Icon className="size-4 text-primary"/></span><div className="min-w-0 flex-1"><div className="text-xs font-medium">{label}</div><div className="text-[10px] text-muted-foreground">{note}</div></div><strong className="font-display text-lg">{count}</strong></div>)}</div></section>
        <div className="flex gap-2 rounded-md border border-border bg-secondary/50 p-3 text-[11px] text-muted-foreground"><Info className="size-4 shrink-0 text-primary"/><p>Prediction combines terrain, drainage capacity, observed rainfall, radar nowcasts, and historical flood reports. Confidence: 87%.</p></div>
      </div>
    </div>
  </div>;
}
