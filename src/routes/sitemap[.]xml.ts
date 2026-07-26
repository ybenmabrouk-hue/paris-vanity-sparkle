import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { fetchProducts } from "@/lib/shopify";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        let productPaths: string[] = [];
        try {
          const products = await fetchProducts(100);
          productPaths = products.map((p) => `/product/${p.node.handle}`);
        } catch (e) {
          console.error("sitemap products fetch failed", e);
        }
        const paths = ["/", "/collection", "/vanity-cases", "/brushes", ...productPaths];
        const urls = paths.map(
          (p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`,
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
