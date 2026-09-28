import type { RiskForecastPoint } from "./risk.types";
import { classifyDemoRisk } from "./risk.utils";
import { RiskLevel } from "./RiskLevel";

export function RiskTimeline({
  forecast,
  selectedIndex,
  onSelect,
}: {
  forecast: RiskForecastPoint[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <section aria-label="Flood risk forecast timeline" className="p-4">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-sm font-semibold">Risk evolution</h2>
        <span className="text-[10px] text-muted-foreground">
          Illustrative scenario · 6-hour horizon
        </span>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {forecast.map((point, index) => {
          const selected = index === selectedIndex;
          return (
            <button
              type="button"
              key={point.key}
              aria-pressed={selected}
              onClick={() => onSelect(index)}
              className={`min-w-0 rounded-md border px-1 py-2 text-center transition-colors ${selected ? "border-primary bg-primary/10" : "border-border bg-secondary/50 hover:bg-secondary"}`}
            >
              <span className="block text-[10px] text-muted-foreground">{point.label}</span>
              <strong className="mt-1 block font-display text-lg">{point.probability}%</strong>
              <span className="mt-1 flex justify-center">
                <RiskLevel risk={classifyDemoRisk(point.probability)} />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
