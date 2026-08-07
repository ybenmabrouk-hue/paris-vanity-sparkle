import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Collection — Dahlia" },
      { name: "description", content: "Vanity cases Dahlia — fabriqués à la main à Paris." },
      { property: "og:title", content: "Collection — Dahlia" },
      { property: "og:description", content: "Vanity cases Dahlia — fabriqués à la main à Paris." },
    ],
  }),
  component: () => <Navigate to="/vanity-cases" />,
});
