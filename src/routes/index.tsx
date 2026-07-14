import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Suspense } from "react";
import { fetchProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/site/ProductCard";
import { ImageSlot } from "@/components/site/ImageSlot";

const productsQuery = queryOptions({
  queryKey: ["products", "home"],
  queryFn: () => fetchProducts(6),
});

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  component: Home,
});

function Home() {
  return (
    <div>
      <Hero />
      <Suspense fallback={<div className="h-96" />}>
        <FeaturedProducts />
      </Suspense>
      <Story />
      <Ethos />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative -mt-16 grid md:grid-cols-2 min-h-screen">
      <ImageSlot
        label="Maison Yasmine vanity case — hero image"
        caption="Hero image"
        className="order-2 md:order-1 min-h-[40vh] md:min-h-screen"
      />
      <div className="relative order-1 md:order-2 min-h-[70vh] md:min-h-screen bg-secondary">
        <ImageSlot
          label="Editorial portrait"
          caption="Editorial portrait"
          className="absolute inset-0 border-0 bg-secondary"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end md:justify-center pb-16 md:pb-0 px-8">
          <div className="text-center max-w-md">
            <div className="font-script text-5xl md:text-7xl leading-[0.9]">
              Small batch,
              <br />
              made in Paris.
            </div>
            <Link
              to="/collection"
              className="mt-10 inline-block bg-foreground text-background px-10 py-4 eyebrow hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Shop the Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const { data: products } = useSuspenseQuery(productsQuery);

  return (
    <section className="py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16 mb-16">
          <div>
            <div className="eyebrow text-muted-foreground mb-4">The Collection</div>
            <h2 className="font-serif text-5xl md:text-6xl leading-[0.95]">
              Vol. One
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-xl md:pt-4">
            Volume one begins at our atelier. Shaped by a Parisian eye and crafted from
            hand-selected leathers, each vanity case is designed to hold the small
            rituals that make a life your own.
          </p>
        </div>

        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14">
            {products.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            to="/collection"
            className="eyebrow underline underline-offset-8 decoration-1 hover:text-accent"
          >
            View all pieces
          </Link>
        </div>
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-border py-24 text-center">
      <p className="font-serif text-2xl">No products found</p>
      <p className="text-sm text-muted-foreground mt-2">
        Add products in Shopify to populate the collection.
      </p>
    </div>
  );
}

function Story() {
  return (
    <section id="story" className="px-6 md:px-10 py-24 md:py-32 bg-secondary/40">
      <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <ImageSlot
          label="Inside a Maison Yasmine vanity case"
          caption="Atelier image"
          className="aspect-[4/3] w-full"
        />
        <div>
          <div className="eyebrow text-muted-foreground mb-4">Notre Maison</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
            Objects that hold the everyday.
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Founded in Paris by Yasmine, our maison began with a single question:
            what if the pieces we carry every day were made with the same care
            as the ones we save for a lifetime?
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Each vanity case is assembled by hand in our atelier, from leathers
            chosen for the way they age.
          </p>
        </div>
      </div>
    </section>
  );
}

function Ethos() {
  const items = [
    { t: "Made in Paris", d: "Assembled by hand in our atelier, in small numbered batches." },
    { t: "Made to last", d: "Full-grain leathers, brass hardware, structured to travel." },
    { t: "Made to keep", d: "Each piece is designed to age with you, not against you." },
  ];
  return (
    <section className="px-6 md:px-10 py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-12">
        {items.map((i) => (
          <div key={i.t} className="text-center md:text-left">
            <div className="font-script text-3xl mb-3">{i.t}</div>
            <p className="text-muted-foreground leading-relaxed">{i.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
