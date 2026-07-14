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
      { title: "The Collection — Dahlia" },
      {
        name: "description",
        content: "Browse the full collection of Dahlia vanity cases — crafted in Paris.",
      },
      { property: "og:title", content: "The Collection — Dahlia" },
      {
        property: "og:description",
        content: "Browse the full collection of Dahlia vanity cases — crafted in Paris.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(collectionQuery),
  component: CollectionPage,
});

function CollectionPage() {
  return (
    <div>
      <header className="px-6 md:px-10 pt-20 pb-14 border-b border-border/60">
        <div className="max-w-[1600px] mx-auto">
          <div className="eyebrow text-muted-foreground mb-6">Vol. One</div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] max-w-3xl">
            The Collection
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Every piece from Maison Yasmine, made by hand in our Paris atelier.
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
    <section className="px-6 md:px-10 py-16 md:py-20">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="eyebrow text-muted-foreground">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </div>
          <div className="eyebrow text-muted-foreground hidden md:block">
            Sorted by newest
          </div>
        </div>

        {products.length === 0 ? (
          <div className="border border-dashed border-border py-24 text-center">
            <p className="font-serif text-2xl">No products found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Add products in Shopify to populate the collection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-16">
            {products.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
