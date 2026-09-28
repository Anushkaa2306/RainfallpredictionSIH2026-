import { Panel } from "../dashboard/Panel";
import { getEmergencyServices } from "../../services/emergencyApi";

export function CriticalServices() {
  const services = getEmergencyServices();
  return <Panel title="Nearby critical services" detail="Verified availability"><div className="divide-y divide-border">{services.map(({ icon: Icon, name, meta, tone }) => <div key={name} className="flex items-center gap-3 p-4"><span className="grid size-9 place-items-center rounded-md bg-secondary"><Icon className={`size-4 ${tone}`} /></span><div><div className="text-sm font-medium">{name}</div><div className="text-xs text-muted-foreground">{meta}</div></div></div>)}</div></Panel>;
}