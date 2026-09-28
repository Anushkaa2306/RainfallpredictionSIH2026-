import { CloudRain, Droplets, Waves, Wind } from "lucide-react";

export const metrics = [
  { icon: CloudRain, label: "Rainfall now", value: "38", unit: "mm/hr", note: "↑ 14 in 30 min", tone: "text-primary" },
  { icon: Waves, label: "Flood probability", value: "76", unit: "%", note: "High risk", tone: "text-critical" },
  { icon: Droplets, label: "Peak depth", value: "1.4", unit: "m", note: "Expected 18:15", tone: "text-warning" },
  { icon: Wind, label: "Storm movement", value: "24", unit: "km/h", note: "Westerly", tone: "text-safe" },
];

export const indiaNetwork = [
  { region: "Indore", risk: "High", severity: "2.2x", trend: "Rising" },
  { region: "Bhopal", risk: "Moderate", severity: "1.4x", trend: "Stable" },
  { region: "Nagpur", risk: "Moderate", severity: "1.1x", trend: "Watch" },
  { region: "Mumbai", risk: "Low", severity: "0.8x", trend: "Recovering" },
];

export const zones = [
  { id: "palasia", name: "Palasia", risk: "Critical", chance: "82%", level: "1.3 m", area: "Palasia, Indore", lng: 75.8712, lat: 22.7207 },
  { id: "vijay-nagar", name: "Vijay Nagar", risk: "High", chance: "71%", level: "0.9 m", area: "Vijay Nagar, Indore", lng: 75.8954, lat: 22.7549 },
  { id: "rajwada", name: "Rajwada", risk: "Moderate", chance: "49%", level: "0.5 m", area: "Rajwada, Indore", lng: 75.8756, lat: 22.7173 },
  { id: "annapurna", name: "Annapurna", risk: "Low", chance: "21%", level: "< 0.2 m", area: "Annapurna, Indore", lng: 75.8534, lat: 22.6942 },
];