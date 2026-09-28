import type { FloodRisk } from "./risk.types";

const riskStyles: Record<FloodRisk, string> = {
  Critical: "bg-critical/15 text-critical",
  High: "bg-warning/15 text-warning",
  Moderate: "bg-primary/15 text-primary",
  Low: "bg-safe/15 text-safe",
};

export function RiskLevel({ risk }: { risk: FloodRisk }) {
  return <span className={`inline-flex rounded-sm px-2 py-1 text-[10px] font-bold ${riskStyles[risk]}`}>{risk}</span>;
}