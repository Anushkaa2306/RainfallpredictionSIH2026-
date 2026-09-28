import { useState } from "react";

export function useSafeRoute() {
  const [routeReady, setRouteReady] = useState(false);

  return {
    routeReady,
    findSafeRoute: () => setRouteReady(true),
  };
}