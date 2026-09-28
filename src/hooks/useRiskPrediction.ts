import { getFloodRiskAreas } from "../services/predictionApi";

export function useRiskPrediction(selectedZoneId: string) {
  const zones = getFloodRiskAreas();
  const activeZone = zones.find((zone) => zone.id === selectedZoneId) ?? zones[0];
  return { zones, activeZone };
}