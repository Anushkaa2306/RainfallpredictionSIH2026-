import { inundationScenarios } from "../../data/demo/inundation";
import type {
  InundationDepthBand,
  InundationFrame,
  InundationScenarioDefinition,
  ResolvedInundationScenario,
} from "./inundation.types";

export const inundationDepthBands: InundationDepthBand[] = [
  { label: "Shallow", range: "0.01–0.2 m", minDepthM: 0.01, color: "#4a9ec2" },
  { label: "Moderate", range: "0.2–0.8 m", minDepthM: 0.2, color: "#e6a343" },
  { label: "Deep", range: "0.8–1.5 m", minDepthM: 0.8, color: "#df674b" },
  { label: "Very deep", range: "1.5+ m", minDepthM: 1.5, color: "#bd3445" },
];

const gridSize = 10;
const basinCenters: Record<string, [number, number]> = {
  palasia: [0.48, 0.54],
  "vijay-nagar": [0.62, 0.42],
  rajwada: [0.4, 0.66],
  annapurna: [0.3, 0.38],
};

function createDepthGrid(maxDepthM: number, locationId: string, frameIndex: number) {
  const [centerX, centerY] = basinCenters[locationId] ?? [0.5, 0.5];
  const spread = 0.1 + Math.min(maxDepthM / 1.3, 1) * 0.42;
  const stretch = 0.82 + ((frameIndex + locationId.length) % 4) * 0.08;

  const intensityGrid = Array.from({ length: gridSize }, (_, row) =>
    Array.from({ length: gridSize }, (_, column) => {
      const x = (column + 0.5) / gridSize;
      const y = (row + 0.5) / gridSize;
      const distance = Math.sqrt(((x - centerX) / stretch) ** 2 + (y - centerY) ** 2);
      return distance >= spread ? 0 : (1 - distance / spread) ** 0.72;
    }),
  );
  const maxIntensity = Math.max(...intensityGrid.flat());

  return intensityGrid.map((row) =>
    row.map((intensity) =>
      maxIntensity === 0 ? 0 : Math.round(((maxDepthM * intensity) / maxIntensity) * 100) / 100,
    ),
  );
}

function resolveDefinition(locationId: string): InundationScenarioDefinition {
  return inundationScenarios[locationId] ?? inundationScenarios["palasia"]!;
}

export function getInundationScenario(
  locationId: string,
  selectedIndex: number,
): ResolvedInundationScenario {
  const scenario = resolveDefinition(locationId);
  const frames: InundationFrame[] = scenario.frames.map((frame, index) => ({
    ...frame,
    depthGrid: createDepthGrid(frame.maxDepthM, scenario.locationId, index),
  }));
  const safeIndex = Math.max(0, Math.min(selectedIndex, frames.length - 1));
  const frame = frames[safeIndex] ?? frames[0]!;
  const peakFrame = frames.reduce(
    (peak, candidate) => (candidate.maxDepthM > peak.maxDepthM ? candidate : peak),
    frames[0]!,
  );
  const timeToImpactMinutes =
    scenario.arrivalMinutes === null
      ? null
      : Math.max(0, scenario.arrivalMinutes - frame.offsetMinutes);

  return { scenario, frames, frame, peakFrame, timeToImpactMinutes };
}

export function getInundationDepthBand(depthM: number) {
  return [...inundationDepthBands].reverse().find((band) => depthM >= band.minDepthM);
}
