import { createFileRoute } from "@tanstack/react-router";
import { InundationPage as InundationContent } from "../pages/Inundation";

export const Route = createFileRoute("/inundation")({
  ssr: false,
  head: () => ({ meta: [
    { title: "Inundation Prediction — FloodWatch AI" },
    { name: "description", content: "Interactive 3D flood-depth prediction and affected infrastructure outlook." },
    { property: "og:title", content: "Inundation Prediction — FloodWatch AI" },
    { property: "og:description", content: "Interactive 3D flood-depth prediction and affected infrastructure outlook." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: InundationContent,
});
