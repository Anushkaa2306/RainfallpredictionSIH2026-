import { createFileRoute } from "@tanstack/react-router";
import { FloodRiskIntelligence as FloodRiskPage } from "../pages/FloodRiskIntelligence";

export const Route = createFileRoute("/flood-risk")({
  head: () => ({ meta: [{ title: "Flood Risk Intelligence — FloodWatch AI" }] }),
  component: FloodRiskPage,
});
