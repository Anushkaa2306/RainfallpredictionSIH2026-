import type { FloodRisk, RiskTrend } from "./risk.types";
import { RiskLevel } from "./RiskLevel";

export function FloodProbability({
  probability,
  level,
  trend,
  featured = false,
}: {
  probability: number;
  level?: FloodRisk;
  trend?: RiskTrend;
  featured?: boolean;
}) {
  const clampedProbability = Math.max(0, Math.min(100, probability));

  if (featured) {
    return (
      <section aria-label="Selected-area flood probability">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-[10px] font-semibold uppercase text-muted-foreground">
              Flood probability
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <strong className="font-display text-5xl leading-none">{clampedProbability}</strong>
              <span className="text-xl text-muted-foreground">%</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {level && <RiskLevel risk={level} />}
            {trend && <span className="text-xs text-muted-foreground">{trend}</span>}
          </div>
        </div>
        <div
          className="mt-4 h-2 overflow-hidden rounded-full bg-secondary"
          role="meter"
          aria-label="Flood probability"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={clampedProbability}
        >
          <div
            className="h-full rounded-full bg-warning transition-[width] duration-500"
            style={{ width: `${clampedProbability}%` }}
          />
        </div>
      </section>
    );
  }

  return (
    <div className="min-w-24">
      <div className="mb-1 flex items-center justify-between gap-2 text-xs">
        <span className="font-medium">{clampedProbability}%</span>
        <span className="text-[10px] text-muted-foreground">probability</span>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-secondary"
        role="meter"
        aria-label="Flood probability"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clampedProbability}
      >
        <div
          className="h-full rounded-full bg-warning"
          style={{ width: `${clampedProbability}%` }}
        />
      </div>
    </div>
  );
}
