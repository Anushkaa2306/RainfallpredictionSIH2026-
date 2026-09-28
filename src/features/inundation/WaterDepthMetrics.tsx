import type { InundationFrame } from "./inundation.types";

function formatTimeToImpact(minutes: number | null, frame: InundationFrame) {
  if (minutes === null) return "Not projected";
  if (minutes === 0) return frame.offsetMinutes > 0 ? "Inundation underway" : "Now";
  if (minutes < 60) return `~${minutes} min`;
  return `~${Math.floor(minutes / 60)}h ${minutes % 60 ? `${minutes % 60}m` : ""}`.trim();
}

export function WaterDepthMetrics({
  frame,
  peakFrame,
  timeToImpactMinutes,
}: {
  frame: InundationFrame;
  peakFrame: InundationFrame;
  timeToImpactMinutes: number | null;
}) {
  const metrics = [
    { label: "Depth at selected time", value: `${frame.maxDepthM.toFixed(2)} m` },
    { label: "Peak depth", value: `${peakFrame.maxDepthM.toFixed(2)} m` },
    { label: "Peak time", value: peakFrame.label },
    { label: "Affected area", value: `${frame.affectedAreaKm2.toFixed(1)} km²` },
    { label: "Time to impact", value: formatTimeToImpact(timeToImpactMinutes, frame) },
  ];

  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-y border-border py-3 sm:grid-cols-3 xl:grid-cols-5">
      {metrics.map((metric) => (
        <div key={metric.label} className="min-w-0 border-l-2 border-primary/50 pl-3">
          <dt className="text-[9px] font-medium uppercase text-muted-foreground">{metric.label}</dt>
          <dd className="mt-1 truncate font-display text-lg font-semibold">{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}
