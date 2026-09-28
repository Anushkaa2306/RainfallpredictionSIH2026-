import { createFileRoute } from "@tanstack/react-router";
import { RoadIntelligence as RoadIntelligencePage } from "../pages/RoadIntelligence";

export const Route = createFileRoute("/road-intelligence")({
  head: () => ({ meta: [{ title: "Road Intelligence — FloodWatch AI" }] }),
  component: RoadIntelligencePage,
});
