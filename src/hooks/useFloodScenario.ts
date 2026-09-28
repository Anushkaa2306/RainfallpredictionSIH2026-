import { useState } from "react";
import { getInundationScenario } from "../features/inundation/scenario";

export function useFloodScenario(initialIndex = 3) {
  const [timeIndex, setTimeIndex] = useState(initialIndex);
  const point = getInundationScenario(timeIndex);

  return { timeIndex, setTimeIndex, point };
}