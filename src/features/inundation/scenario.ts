import { fallbackPoint, timeline } from "../../data/demo/inundation";

export function getInundationScenario(index: number) {
  return timeline[index] ?? fallbackPoint;
}