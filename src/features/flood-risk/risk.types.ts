export type FloodRisk = "Critical" | "High" | "Moderate" | "Low";

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
};