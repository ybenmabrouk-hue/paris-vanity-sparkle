import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Suspense } from "react";
import { fetchProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/site/ProductCard";

const collectionQuery = queryOptions({
  queryKey: ["products", "collection"],
  queryFn: () => fetchProducts(50),
});

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Collection — Dahlia" },
      {
        name: "description",
        content: "The Collection — Dahlia vanity cases, made by hand in Paris.",
      },
      { property: "og:title", content: "Collection — Dahlia" },
      {
        property: "og:description",
        content: "The Collection — Dahlia vanity cases, made by hand in Paris.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(collectionQuery),
  component: CollectionPage,
});

function CollectionPage() {
  return (
    <div>
      <header
        className="px-6 md:px-10 text-center md:text-left"
        style={{ paddingBlockStart: "clamp(45px, 7vw, 96px)", paddingBlockEnd: "clamp(30px, 4vw, 56px)" }}
      >
        <div className="max-w-[1600px] mx-auto">
          <h1
            className="font-serif font-bold tracking-tight"
            style={{ fontSize: "clamp(20px, 2.5vw, 24px)", lineHeight: "26px" }}
          >
            Collection
          </h1>
          <p
            className="mt-3 max-w-2xl mx-auto md:mx-0 text-muted-foreground"
            style={{ fontSize: "clamp(12px, 1vw, 15px)", lineHeight: "clamp(15px, 1.6vw, 22px)" }}
          >
            The collection begins at our atelier. Shaped by a Parisian eye and
            crafted through modern leatherwork, each piece is designed to hold
            the small rituals that travel with you.
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
  const { data: products } = useSuspenseQuery(collectionQuery);

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
              Add products in Shopify to populate the collection.
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
