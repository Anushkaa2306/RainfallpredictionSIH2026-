import { Panel } from "../../components/dashboard/Panel";
import type { SafeRoute } from "./route.types";
import { SafeRouteCard } from "./SafeRouteCard";

export function RoutePlanner({
  route,
  ready,
  onFindRoute,
}: {
  route: SafeRoute;
  ready: boolean;
  onFindRoute: () => void;
}) {
  return (
    <Panel title="Get to safety" detail="Route guidance from deterministic demo data">
      <SafeRouteCard route={route} ready={ready} onFindRoute={onFindRoute} />
    </Panel>
  );
}
