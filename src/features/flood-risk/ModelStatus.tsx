import { AlertTriangle, Check, CircleDashed } from "lucide-react";
import type { RiskSourceStatus } from "./risk.types";

export function ModelStatus({ sources }: { sources: RiskSourceStatus[] }) {
  return (
    <section className="p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-sm font-semibold">Model & input status</h2>
          <p className="mt-0.5 text-[10px] text-muted-foreground">
            Scenario lookup · not a trained model
          </p>
        </div>
        <span className="rounded-sm bg-warning/15 px-2 py-1 text-[9px] font-bold uppercase text-warning">
          Demo · uncalibrated
        </span>
      </div>
      <div className="grid gap-x-4 sm:grid-cols-2 xl:grid-cols-3">
        {sources.map((source) => {
          const Icon = source.state === "demo" ? AlertTriangle : CircleDashed;
          const tone = source.state === "demo" ? "text-warning" : "text-muted-foreground";
          return (
            <div
              key={source.name}
              className="flex min-w-0 items-start gap-2 border-t border-border py-2.5"
            >
              <Icon className={`mt-0.5 size-3.5 shrink-0 ${tone}`} />
              <div className="min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-xs font-medium">{source.name}</span>
                  <span className={`shrink-0 text-[9px] font-semibold ${tone}`}>
                    {source.status}
                  </span>
                </div>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{source.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex items-center gap-2 border-t border-border pt-3 text-[10px] text-muted-foreground">
        <Check className="size-3.5 text-safe" />
        Demo prediction available{" "}
        <span className="ml-auto">Calibration: unavailable · Coverage: not measured</span>
      </div>
    </section>
  );
}
