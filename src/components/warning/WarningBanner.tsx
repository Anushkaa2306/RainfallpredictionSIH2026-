import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";

export function WarningBanner({ zoneName, acknowledged, onAcknowledge }: { zoneName: string; acknowledged: boolean; onAcknowledge: () => void }) {
  return <section className="mb-5 grid gap-4 border-l-4 border-critical bg-critical/10 p-4 md:grid-cols-[1fr_auto] md:items-center">
    <div className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-md bg-critical text-critical-foreground"><AlertTriangle className="size-5" /></span><div><div className="text-xs font-bold uppercase text-critical">Severe urban flood warning · Until 19:30</div><h2 className="mt-1 font-display text-lg font-semibold">Avoid travel through {zoneName} and nearby low-lying drains</h2><p className="mt-1 max-w-3xl text-sm text-muted-foreground">Rapid water rise is expected within 40 minutes. Keep emergency vehicles away from low-lying crossings and move residents to elevated shelters.</p></div></div>
    <Button onClick={onAcknowledge} variant={acknowledged ? "secondary" : "danger"}>{acknowledged ? <CheckCircle2 className="size-4" /> : null}{acknowledged ? "Acknowledged" : "Acknowledge warning"}</Button>
  </section>;
}