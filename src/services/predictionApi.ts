import { riskForecasts, zones } from "../data/demo/flood-risk";
import { rainfall } from "../data/demo/rainfall";
import {
  classifyDemoRisk,
  createRiskGrid,
  demoRiskThresholds,
  getTimeToThreshold,
  riskForecastTimes,
} from "../features/flood-risk/risk.utils";
import type { FloodRiskPrediction, RiskForecastPoint } from "../features/flood-risk/risk.types";
import { getInundationScenario } from "../features/inundation/inundation.utils";
import type {
  InundationTimelinePoint,
  ResolvedInundationScenario,
} from "../features/inundation/inundation.types";

export function getFloodRiskAreas() {
  return zones;
}

export function getInundationPrediction(
  locationId: string,
  selectedIndex: number,
): ResolvedInundationScenario {
  return getInundationScenario(locationId, selectedIndex);
}

export function getInundationTimeline(locationId = "palasia"): InundationTimelinePoint[] {
  return getInundationScenario(locationId, 0).frames.map((frame) => ({
    hour: frame.label,
    depth: `${frame.maxDepthM.toFixed(2)} m`,
    affected: `${frame.affectedAreaKm2.toFixed(1)} km²`,
  }));
}

export function getFloodRiskPrediction(
  locationId: string,
  selectedIndex: number,
): FloodRiskPrediction {
  const zone = zones.find((item) => item.id === locationId) ?? zones[0];
  if (!zone) throw new Error("Flood risk data contains no monitored zones.");

  const probabilities = riskForecasts[zone.id] ?? [];
  const forecast: RiskForecastPoint[] = riskForecastTimes.map((time, index) => ({
    ...time,
    probability: probabilities[index] ?? 0,
  }));
  const selected = forecast[selectedIndex] ?? forecast[0];
  if (!selected) throw new Error("Flood risk forecast contains no time steps.");
  const next = forecast[Math.min(selectedIndex + 1, forecast.length - 1)];
  const rainfallPoint = rainfall[selectedIndex];
  const peak = forecast.reduce(
    (highest, point) => (point.probability > highest.probability ? point : highest),
    forecast[0]!,
  );

  return {
    locationId: zone.id,
    probability: selected.probability,
    level: classifyDemoRisk(selected.probability),
    trend:
      !next || next.probability === selected.probability
        ? "Stable"
        : next.probability > selected.probability
          ? "Rising"
          : "Falling",
    validFor: "Illustrative scenario · not an operational forecast",
    timeToHighMinutes: getTimeToThreshold(forecast, selectedIndex, demoRiskThresholds.high),
    timeToCriticalMinutes: getTimeToThreshold(forecast, selectedIndex, demoRiskThresholds.critical),
    peakRiskTime: peak.label,
    forecast,
    drivers: [
      {
        label: "Rainfall forecast",
        value: rainfallPoint ? `${rainfallPoint.forecast} mm/hr` : "Unavailable",
        detail: "Deterministic demo series; not a live observation",
        state: "demo",
      },
      {
        label: "Terrain, drainage, soil & history",
        value: "Not connected",
        detail: "No environmental feature inputs are currently available",
        state: "unavailable",
      },
    ],
  };
}

export function getFloodRiskGrid(selectedIndex: number) {
  const probabilities = Object.fromEntries(
    zones.map((zone) => [zone.id, riskForecasts[zone.id]?.[selectedIndex] ?? 0]),
  );
  return createRiskGrid(zones, probabilities);
}
