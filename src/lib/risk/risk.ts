export type FloodRisk = "Critical" | "High" | "Moderate" | "Low";

const riskColors: Record<FloodRisk, string> = {
  Critical: "#ef4444",
  High: "#f59e0b",
  Moderate: "#60a5fa",
  Low: "#22c55e",
};

export function getRiskColor(risk: string) {
  return riskColors[risk as FloodRisk] ?? "#64748b";
}