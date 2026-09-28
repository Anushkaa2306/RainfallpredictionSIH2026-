export type InundationTimelinePoint = {
  hour: string;
  depth: string;
  affected: string;
};

export type InundationRoadStatus = "At risk" | "Inundated" | "Passable";

export type AffectedRoad = {
  id: string;
  name: string;
  status: InundationRoadStatus;
  waterDepthM: number;
};

export type InundationFrameDefinition = {
  key: "now" | "1h" | "2h" | "3h" | "6h";
  label: "Now" | "+1h" | "+2h" | "+3h" | "+6h";
  offsetMinutes: number;
  maxDepthM: number;
  affectedAreaKm2: number;
  affectedBuildings: number;
  roads: AffectedRoad[];
};

export type InundationScenarioDefinition = {
  locationId: string;
  locationName: string;
  catchmentName: string;
  arrivalMinutes: number | null;
  status: "demo";
  frames: InundationFrameDefinition[];
};

export type InundationFrame = InundationFrameDefinition & {
  depthGrid: number[][];
};

export type ResolvedInundationScenario = {
  scenario: InundationScenarioDefinition;
  frames: InundationFrame[];
  frame: InundationFrame;
  peakFrame: InundationFrame;
  timeToImpactMinutes: number | null;
};

export type InundationDepthBand = {
  label: string;
  range: string;
  minDepthM: number;
  color: string;
};
