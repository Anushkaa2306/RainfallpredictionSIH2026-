import type { RainfallForecastPoint } from "./rainfall.types";

export function RainfallMetrics({ rainfall }: { rainfall: RainfallForecastPoint[] }) {
  const current = rainfall.find((point) => point.actual !== null)?.actual ?? undefined;
  const peak = rainfall.reduce<RainfallForecastPoint | undefined>(
    (highest, point) => (!highest || point.forecast > highest.forecast ? point : highest),
    undefined,
  );
  const metrics = [
    {
      label: "Current intensity",
      value: current === undefined ? "—" : String(current),
      unit: "mm/hr",
      detail: "Observed · trend unavailable",
    },
    { label: "Accumulation", value: "—", unit: "mm", detail: "Not supplied by demo feed" },
    {
      label: "Forecast peak",
      value: peak ? String(peak.forecast) : "—",
      unit: "mm/hr",
      detail: peak ? `Expected ${peak.t.toLowerCase()}` : "No forecast available",
    },
    { label: "Storm movement", value: "—", unit: "", detail: "Radar motion unavailable" },
  ];

  return (
    <dl className="grid grid-cols-2 gap-2 p-3 md:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="min-w-0 border-l-2 border-primary/50 pl-3">
          <dt className="text-[10px] text-muted-foreground">{metric.label}</dt>
          <dd className="mt-1 flex items-baseline gap-1">
            <strong className="font-display text-xl">{metric.value}</strong>
            {metric.unit && (
              <span className="text-[10px] text-muted-foreground">{metric.unit}</span>
            )}
          </dd>
          <div className="mt-1 text-[10px] text-muted-foreground">{metric.detail}</div>
        </div>
      ))}
    </dl>
  );
}
