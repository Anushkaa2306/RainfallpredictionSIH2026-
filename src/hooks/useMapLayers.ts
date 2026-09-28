import { useState } from "react";

export function useMapLayers(initialLayers = ["Flood risk", "Roads"]) {
  const [layers, setLayers] = useState(initialLayers);

  const toggleLayer = (name: string) => {
    setLayers((current) => current.includes(name)
      ? current.filter((item) => item !== name)
      : [...current, name]);
  };

  return { layers, toggleLayer };
}