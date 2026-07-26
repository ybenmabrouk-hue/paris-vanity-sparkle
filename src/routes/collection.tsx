import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Collection — Dahlia" },
      { name: "description", content: "Dahlia vanity cases and brushes — made by hand in Paris." },
      { property: "og:title", content: "Collection — Dahlia" },
      { property: "og:description", content: "Dahlia vanity cases and brushes — made by hand in Paris." },
    ],
  }),
  component: () => <Navigate to="/vanity-cases" />,
});
