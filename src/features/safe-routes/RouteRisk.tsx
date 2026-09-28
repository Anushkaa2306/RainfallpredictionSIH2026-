import type { SafeRoute } from "./route.types";

export function RouteRisk({ route }: { route: SafeRoute }) {
  return (
    <div className="mt-3 rounded-md border border-safe/40 bg-safe/10 p-3">
      <div className="text-sm font-semibold text-safe">Route ready · {route.duration}</div>
      <p className="mt-1 text-xs text-muted-foreground">{route.directions}</p>
    </div>
  );
}
