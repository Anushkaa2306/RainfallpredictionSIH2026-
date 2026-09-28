import { getFloodRiskAreas } from "../services/predictionApi";

export function useRiskPrediction(selectedZoneId: string) {
  const zones = getFloodRiskAreas();
  if (zones.length === 0) throw new Error("Flood risk data contains no monitored zones.");
  const activeZone = zones.find((zone) => zone.id === selectedZoneId) ?? zones[0]!;
  return { zones, activeZone };
}