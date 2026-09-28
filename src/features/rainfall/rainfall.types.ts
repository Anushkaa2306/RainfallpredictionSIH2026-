export type RainfallForecastPoint = {
  t: string;
  actual: number | null;
  forecast: number;
};

export type RainfallMetric = {
  label: string;
  value: string;
  unit?: string;
  detail: string;
};