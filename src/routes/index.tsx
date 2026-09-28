import { createFileRoute } from "@tanstack/react-router";
import { Dashboard as DashboardPage } from "../pages/Dashboard";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "FloodWatch AI — India Monsoon Risk" },
    { name: "description", content: "Live rainfall, flood probability, warnings, and safe-route guidance for Indore and the wider India resilience network." },
    { property: "og:title", content: "FloodWatch AI — India Monsoon Risk" },
    { property: "og:description", content: "Live rainfall, flood probability, warnings, and safe-route guidance for Indore and the wider India resilience network." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: DashboardPage,
});
