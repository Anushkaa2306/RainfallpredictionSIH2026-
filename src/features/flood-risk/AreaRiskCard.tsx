import { ArrowRight, Clock3, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Panel } from "../../components/dashboard/Panel";
import type { FloodRiskPrediction, FloodRiskZone } from "./risk.types";
import { FloodProbability } from "./FloodProbability";

function formatMinutes(minutes: number | null) {
  if (minutes === null) return "Outside forecast";
  if (minutes === 0) return "Now";
  if (minutes < 60) return `~${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `~${hours}h ${remainingMinutes.toString().padStart(2, "0")}m`;
}

export function AreaRiskCard({
  zone,
  prediction,
}: {
  zone: FloodRiskZone;
  prediction: FloodRiskPrediction;
}) {
  return (
    <Panel title="Selected area" detail={`${zone.area} · demo scenario`}>
      <div className="space-y-4 p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="size-4 text-primary" />
          <span>{zone.name}, Indore</span>
        </div>
        <FloodProbability
          probability={prediction.probability}
          level={prediction.level}
          trend={prediction.trend}
          featured
        />
        <dl className="grid grid-cols-2 gap-3 border-y border-border py-3">
          <div>
            <dt className="text-[10px] text-muted-foreground">Time to high</dt>
            <dd className="mt-1 text-sm font-semibold">
              {formatMinutes(prediction.timeToHighMinutes)}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] text-muted-foreground">Time to critical</dt>
            <dd className="mt-1 text-sm font-semibold">
              {formatMinutes(prediction.timeToCriticalMinutes)}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] text-muted-foreground">Peak demo risk</dt>
            <dd className="mt-1 text-sm font-semibold">{prediction.peakRiskTime}</dd>
          </div>
          <div>
            <dt className="text-[10px] text-muted-foreground">Forecast window</dt>
            <dd className="mt-1 text-sm font-semibold">6 hours</dd>
          </div>
        </dl>
        <Link
          to="/inundation"
          search={{ locationId: zone.id }}
          className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          View inundation prediction <ArrowRight className="size-4" />
        </Link>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <Clock3 className="size-3.5" />
          {prediction.validFor}
        </div>
      </div>
    </Panel>
  );
}
