import { Navigation } from "lucide-react";
import type { SafeRoute } from "./route.types";
import { RouteRisk } from "./RouteRisk";

export function SafeRouteCard({
  route,
  ready,
  onFindRoute,
}: {
  route: SafeRoute;
  ready: boolean;
  onFindRoute: () => void;
}) {
  return (
    <div className="p-4">
      <button
        type="button"
        onClick={onFindRoute}
        className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        <Navigation className="size-4" />
        {ready ? "Refresh safe route" : "Find safe route"}
      </button>
      {ready ? (
        <RouteRisk route={route} />
      ) : (
        <p className="mt-3 text-xs text-muted-foreground">
          Nearest listed shelter: {route.nearestShelter}, {route.distance} away.
        </p>
      )}
    </div>
  );
}
