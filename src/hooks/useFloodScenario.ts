import { useState } from "react";
import { getInundationScenario } from "../features/inundation/inundation.utils";

export function useFloodScenario(locationId: string, initialIndex = 0) {
  const [timeIndex, setTimeIndex] = useState(initialIndex);
  const prediction = getInundationScenario(locationId, timeIndex);

  return { timeIndex, setTimeIndex, ...prediction };
}
