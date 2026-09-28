export type FloodRisk = "Critical" | "High" | "Moderate" | "Low";
export type RiskTrend = "Rising" | "Stable" | "Falling";
export type RiskSourceState = "demo" | "unavailable";

export type RiskForecastPoint = {
  key: string;
  label: string;
  offsetMinutes: number;
  probability: number;
};

export type FloodRiskZone = {
  id: string;
  name: string;
  area: string;
  risk: FloodRisk;
  chance: string;
  level: string;
  lng: number;
  lat: number;
};

export type RiskDriver = {
  label: string;
  value: string;
  detail: string;
  state: RiskSourceState;
};

export type RiskSourceStatus = {
  name: string;
  status: string;
  detail: string;
  state: RiskSourceState;
};

export type FloodRiskPrediction = {
  locationId: string;
  probability: number;
  level: FloodRisk;
  trend: RiskTrend;
  validFor: string;
  timeToHighMinutes: number | null;
  timeToCriticalMinutes: number | null;
  peakRiskTime: string;
  forecast: RiskForecastPoint[];
  drivers: RiskDriver[];
};

export type RiskGridFeatureProperties = {
  cellId: number;
  zoneId: string;
  probability: number;
};

export type RiskGridFeature = {
  type: "Feature";
  id: number;
  properties: RiskGridFeatureProperties;
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
};

export type RiskGrid = {
  type: "FeatureCollection";
  features: RiskGridFeature[];
};
