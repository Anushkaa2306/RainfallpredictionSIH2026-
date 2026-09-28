import { Building2, Droplets, School } from "lucide-react";

export const timeline = [
  { hour: "Now", depth: "0.42 m", affected: "1.8 km²" },
  { hour: "+1h", depth: "0.68 m", affected: "2.6 km²" },
  { hour: "+2h", depth: "0.94 m", affected: "3.4 km²" },
  { hour: "+3h", depth: "1.20 m", affected: "4.1 km²" },
  { hour: "+4h", depth: "0.88 m", affected: "3.3 km²" },
  { hour: "+6h", depth: "0.36 m", affected: "1.4 km²" },
];

export const fallbackPoint = { hour: "Now", depth: "0.42 m", affected: "1.8 km²" };

export const infrastructure = [
  { icon: Building2, label: "Residential buildings", count: "312", note: "47 critical" },
  { icon: School, label: "Schools & shelters", count: "6", note: "2 inaccessible" },
  { icon: Droplets, label: "Stormwater drains", count: "18", note: "11 overloaded" },
];