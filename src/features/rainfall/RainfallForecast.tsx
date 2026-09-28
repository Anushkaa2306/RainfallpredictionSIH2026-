import { Panel } from "../../components/dashboard/Panel";
import { getRainfallOutlook } from "../../services/weatherApi";
import { RainfallChart } from "./RainfallChart";
import { RainfallMetrics } from "./RainfallMetrics";

export function RainfallForecast() {
  const rainfall = getRainfallOutlook();

  return <Panel title="Rainfall intelligence" detail="Observed conditions and 6-hour outlook">
    <RainfallMetrics rainfall={rainfall} />
    <RainfallChart rainfall={rainfall} />
    <p className="border-t border-border px-4 py-2 text-[10px] text-muted-foreground">Deterministic demo forecast · calibrated uncertainty and source provenance are not connected.</p>
  </Panel>;
}