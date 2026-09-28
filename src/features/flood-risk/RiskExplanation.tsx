import type { FloodRiskPrediction } from "./risk.types";

export function RiskExplanation({
  prediction,
  areaName,
}: {
  prediction: FloodRiskPrediction;
  areaName: string;
}) {
  const rainfallDriver = prediction.drivers.find((driver) => driver.state === "demo");

  return (
    <section className="p-4">
      <h2 className="font-display text-sm font-semibold">Why is {areaName} at risk?</h2>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        This probability is read from a deterministic Indore demo scenario. It is not yet calculated
        by a fused rainfall, terrain, drainage, soil, and history model.
      </p>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="border-l-2 border-warning pl-3">
          <dt className="text-[10px] font-semibold uppercase text-muted-foreground">
            Rainfall input
          </dt>
          <dd className="mt-1 text-sm font-medium">{rainfallDriver?.value ?? "Unavailable"}</dd>
          <dd className="text-[10px] text-muted-foreground">Demo forecast at selected horizon</dd>
        </div>
        <div className="border-l-2 border-border pl-3">
          <dt className="text-[10px] font-semibold uppercase text-muted-foreground">
            Physical context
          </dt>
          <dd className="mt-1 text-sm font-medium">Not connected</dd>
          <dd className="text-[10px] text-muted-foreground">
            Terrain, drainage, soil, and historical inputs are missing
          </dd>
        </div>
      </dl>
    </section>
  );
}
