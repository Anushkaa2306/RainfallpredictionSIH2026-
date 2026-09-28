import { createFileRoute } from "@tanstack/react-router";
import { Authority as AuthorityPage } from "../pages/Authority";

export const Route = createFileRoute("/authority")({
  head: () => ({ meta: [{ title: "Authority Workspace — FloodWatch AI" }] }),
  component: AuthorityPage,
});
