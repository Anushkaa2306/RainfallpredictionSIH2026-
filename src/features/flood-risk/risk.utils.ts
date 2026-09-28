import type {
  FloodRisk,
  FloodRiskZone,
  RiskForecastPoint,
  RiskGrid,
  RiskGridFeature,
  RiskSourceStatus,
} from "./risk.types";

export const riskForecastTimes: Omit<RiskForecastPoint, "probability">[] = [
  { key: "now", label: "Now", offsetMinutes: 0 },
  { key: "1h", label: "+1h", offsetMinutes: 60 },
  { key: "2h", label: "+2h", offsetMinutes: 120 },
  { key: "3h", label: "+3h", offsetMinutes: 180 },
  { key: "6h", label: "+6h", offsetMinutes: 360 },
];

export const demoRiskThresholds = {
  moderate: 25,
  high: 50,
  critical: 75,
} as const;

export function classifyDemoRisk(probability: number): FloodRisk {
  if (probability >= demoRiskThresholds.critical) return "Critical";
  if (probability >= demoRiskThresholds.high) return "High";
  if (probability >= demoRiskThresholds.moderate) return "Moderate";
  return "Low";
}

export function getTimeToThreshold(
  forecast: RiskForecastPoint[],
  selectedIndex: number,
  threshold: number,
): number | null {
  const selected = forecast[selectedIndex];
  if (!selected) return null;
  if (selected.probability >= threshold) return 0;

  for (let index = selectedIndex + 1; index < forecast.length; index += 1) {
    const next = forecast[index];
    const previous = forecast[index - 1];
    if (!next || !previous || next.probability < threshold) continue;
    const progress = (threshold - previous.probability) / (next.probability - previous.probability);
    return Math.round(
      previous.offsetMinutes + progress * (next.offsetMinutes - previous.offsetMinutes),
    );
  }

  return null;
}

export function createRiskGrid(
  zones: FloodRiskZone[],
  probabilities: Record<string, number>,
): RiskGrid {
  const features: RiskGridFeature[] = [];
  const west = 75.84;
  const east = 75.92;
  const south = 22.685;
  const north = 22.78;
  const columns = 8;
  const rows = 8;
  const cellWidth = (east - west) / columns;
  const cellHeight = (north - south) / rows;

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const westEdge = west + column * cellWidth;
      const eastEdge = westEdge + cellWidth;
      const southEdge = south + row * cellHeight;
      const northEdge = southEdge + cellHeight;
      const centerLng = (westEdge + eastEdge) / 2;
      const centerLat = (southEdge + northEdge) / 2;
      let weightedProbability = 0;
      let totalWeight = 0;
      let nearestZone: FloodRiskZone | undefined;
      let nearestDistance = Number.POSITIVE_INFINITY;

      for (const zone of zones) {
        const distance = (centerLng - zone.lng) ** 2 + (centerLat - zone.lat) ** 2;
        const weight = 1 / Math.max(distance, 0.000005);
        weightedProbability += (probabilities[zone.id] ?? 0) * weight;
        totalWeight += weight;
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestZone = zone;
        }
      }

      if (!nearestZone) continue;
      const cellId = row * columns + column;
      features.push({
        type: "Feature",
        id: cellId,
        properties: {
          cellId,
          zoneId: nearestZone.id,
          probability: Math.round(weightedProbability / totalWeight),
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [westEdge, southEdge],
              [eastEdge, southEdge],
              [eastEdge, northEdge],
              [westEdge, northEdge],
              [westEdge, southEdge],
            ],
          ],
        },
      });
    }
  }

  return { type: "FeatureCollection", features };
}

export const riskSourceStatuses: RiskSourceStatus[] = [
  {
    name: "Rainfall forecast",
    status: "Demo series",
    detail: "Deterministic values; not a live feed",
    state: "demo",
  },
  {
    name: "Terrain & elevation",
    status: "Not connected",
    detail: "No elevation raster or terrain features",
    state: "unavailable",
  },
  {
    name: "Drainage network",
    status: "Not connected",
    detail: "No capacity or blockage observations",
    state: "unavailable",
  },
  {
    name: "Soil & surface",
    status: "Not connected",
    detail: "No soil moisture or land-cover data",
    state: "unavailable",
  },
  {
    name: "Historical floods",
    status: "Not connected",
    detail: "No event archive is configured",
    state: "unavailable",
  },
  {
    name: "Exposure",
    status: "Not connected",
    detail: "No population or infrastructure model",
    state: "unavailable",
  },
];
