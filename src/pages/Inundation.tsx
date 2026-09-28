import { Link } from "@tanstack/react-router";
import { ArrowLeft, Info, Maximize2, Navigation, TriangleAlert } from "lucide-react";
import { Button } from "../components/ui/button";
import { FloodTimeline } from "../features/inundation/FloodTimeline";
import { InundationMap } from "../features/inundation/InundationMap";
import { WaterDepthLayer } from "../features/inundation/WaterDepthLayer";
import { infrastructure, timeline } from "../data/demo/inundation";
import { useFloodScenario } from "../hooks/useFloodScenario";

export function InundationPage() {
  const { timeIndex, setTimeIndex, point } = useFloodScenario();
  return <div className="p-4 md:p-6">
    <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><Link to="/" className="mb-3 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" />Risk overview</Link><h1 className="font-display text-2xl font-semibold md:text-3xl">Inundation prediction</h1><p className="mt-1 text-sm text-muted-foreground">Koramangala basin · AI terrain model · 10 m resolution</p></div><div className="flex gap-2"><Button variant="secondary"><Maximize2 className="size-4" />Expand view</Button><Button><Navigation className="size-4" />Plan route</Button></div></div>

    <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
      <section className="overflow-hidden rounded-lg border border-border bg-card">
        <header className="flex items-center justify-between border-b border-border px-4 py-3"><div><h2 className="font-display text-sm font-semibold">Predicted flood extent</h2><p className="mt-0.5 text-[11px] text-muted-foreground">Drag to rotate · Scroll to zoom</p></div><div className="flex items-center gap-2 text-xs"><span className="size-2 rounded-full bg-warning radar-pulse" /><span>{point.hour} scenario</span></div></header>
        <div className="relative"><InundationMap level={timeIndex} /><WaterDepthLayer depth={point.depth} affected={point.affected} /></div>
      </section>

      <div className="space-y-5">
        <FloodTimeline points={timeline} selectedIndex={timeIndex} onSelect={setTimeIndex} />
        <section className="rounded-lg border border-critical/40 bg-critical/10 p-4"><div className="flex gap-3"><TriangleAlert className="size-5 shrink-0 text-critical"/><div><h2 className="text-sm font-semibold">312 buildings at risk</h2><p className="mt-1 text-xs text-muted-foreground">47 are projected to experience water above ground-floor threshold.</p></div></div></section>
        <section className="rounded-lg border border-border bg-card"><header className="border-b border-border px-4 py-3"><h2 className="font-display text-sm font-semibold">Affected infrastructure</h2></header><div className="divide-y divide-border">{infrastructure.map(({ icon: Icon, label, count, note }) => <div key={label} className="flex items-center gap-3 p-4"><span className="grid size-8 place-items-center rounded-md bg-secondary"><Icon className="size-4 text-primary"/></span><div className="min-w-0 flex-1"><div className="text-xs font-medium">{label}</div><div className="text-[10px] text-muted-foreground">{note}</div></div><strong className="font-display text-lg">{count}</strong></div>)}</div></section>
        <div className="flex gap-2 rounded-md border border-border bg-secondary/50 p-3 text-[11px] text-muted-foreground"><Info className="size-4 shrink-0 text-primary"/><p>Prediction combines terrain, drainage capacity, observed rainfall, radar nowcasts, and historical flood reports. Confidence: 87%.</p></div>
      </div>
    </div>
  </div>;
}
