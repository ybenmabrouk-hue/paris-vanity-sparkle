import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Suspense } from "react";
import { fetchProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/site/ProductCard";

const brushesQuery = queryOptions({
  queryKey: ["products", "brushes"],
  queryFn: () => fetchProducts(50, 'product_type:"Brushes"'),
});

export const Route = createFileRoute("/brushes")({
  head: () => ({
    meta: [
      { title: "Brushes — Dahlia" },
      {
        name: "description",
        content: "Dahlia brushes — designed for precision, made to last.",
      },
      { property: "og:title", content: "Brushes — Dahlia" },
      {
        property: "og:description",
        content: "Dahlia brushes — designed for precision, made to last.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(brushesQuery),
  component: BrushesPage,
});

function BrushesPage() {
  return (
    <div>
      <header
        className="px-6 md:px-10 text-center md:text-left"
        style={{ paddingBlockStart: "clamp(45px, 7vw, 96px)", paddingBlockEnd: "clamp(30px, 4vw, 56px)" }}
      >
        <div className="max-w-[1600px] mx-auto">
          <h1
            className="font-garamond text-black tracking-tight"
            style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, letterSpacing: "0.01em", lineHeight: "1.05" }}
          >
            Brushes
          </h1>
          <p
            className="mt-3 max-w-2xl mx-auto md:mx-0 text-muted-foreground"
            style={{ fontSize: "clamp(12px, 1vw, 15px)", lineHeight: "clamp(15px, 1.6vw, 22px)" }}
          >
            A curated edit of brushes for face, eyes, and detail work — chosen
            to pair seamlessly with the Dahlia ritual.
          </p>
        </div>
      </header>
      <Suspense fallback={<div className="h-96" />}>
        <Grid />
      </Suspense>
    </div>
  );
}

function Grid() {
  const { data: products } = useSuspenseQuery(brushesQuery);

  return (
    <section
      className="px-6 md:px-10"
      style={{ paddingBlockEnd: "clamp(52px, 10vw, 140px)" }}
    >
      <div className="max-w-[1600px] mx-auto">
        {products.length === 0 ? (
          <div className="border border-dashed border-border py-24 text-center">
            <p className="font-serif text-2xl">No products found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Add Brushes products in Shopify to populate this section.
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 md:grid-cols-3"
            style={{ columnGap: "24px", rowGap: "clamp(32px, 4vw, 64px)" }}
          >
            {products.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
