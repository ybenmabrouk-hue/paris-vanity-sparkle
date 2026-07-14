import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Suspense } from "react";
import { fetchProducts, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { ImageSlot } from "@/components/site/ImageSlot";
import logoBlack from "@/assets/dahlia-logo-black.svg.asset.json";

const productsQuery = queryOptions({
  queryKey: ["products", "home"],
  queryFn: () => fetchProducts(1),
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
        <VolOne />
      </Suspense>
      <BrandStatement />
      <Suspense fallback={<div className="h-96" />}>
        <ProductFeature />
      </Suspense>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative -mt-16 grid md:grid-cols-2 min-h-screen">
      <ImageSlot
        label="Dahlia vanity cases — hero still life"
        caption="Hero — product still life"
        className="order-2 md:order-1 min-h-[50vh] md:min-h-screen border-0 bg-secondary"
      />
      <ImageSlot
        label="Editorial portrait"
        caption="Editorial portrait"
        className="order-1 md:order-2 min-h-[70vh] md:min-h-screen border-0 bg-muted"
      />

      {/* Overlay: script headline + CTA, centered across both panels */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-script text-6xl md:text-8xl leading-[0.9] text-background mix-blend-difference">
          Small Batch
          <br />
          <span className="italic">Fine Vanity Cases</span>
        </h1>
        <Link
          to="/collection"
          className="pointer-events-auto mt-10 inline-block bg-background text-foreground px-10 py-4 eyebrow hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Shop Vol. One
        </Link>
      </div>
    </section>
  );
}

function VolOne() {
  const { data: products } = useSuspenseQuery(productsQuery);
  const product = products[0];

  return (
    <section className="py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-16 md:mb-20 max-w-2xl">
          <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
            Collection
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-foreground/80">
            The collection begins at our atelier. Shaped by a Parisian eye and
            crafted through modern leatherwork, each vanity case is designed to
            hold the small rituals that travel with you.
          </p>
        </div>

        {!product ? <EmptyState /> : <ColorTiles product={product} />}
      </div>
    </section>
  );
}

function ColorTiles({ product }: { product: ShopifyProduct }) {
  const p = product.node;
  const price = p.priceRange.minVariantPrice;
  const colorOption = p.options.find((o) => /colou?r/i.test(o.name));

  // Build up to 5 color entries. Prefer real color variants; pad with
  // placeholder slots so the layout always emphasises the 5-colour offer.
  const colorVariants = p.variants.edges
    .map((v) => {
      const co = v.node.selectedOptions.find((o) => /colou?r/i.test(o.name));
      return co ? { color: co.value, variant: v.node } : null;
    })
    .filter((x): x is { color: string; variant: typeof p.variants.edges[number]["node"] } => x !== null);

  const uniqueByColor = Array.from(
    new Map(colorVariants.map((c) => [c.color, c])).values(),
  );

  const placeholderColors = ["Noir", "Crème", "Camel", "Terracotta", "Bordeaux"];
  const tiles: Array<{ color: string; image?: { url: string; altText: string | null } }> = [];

  for (let i = 0; i < 5; i++) {
    const real = uniqueByColor[i];
    if (real) {
      tiles.push({
        color: real.color,
        image: p.images.edges[i]?.node ?? p.images.edges[0]?.node,
      });
    } else {
      tiles.push({
        color: colorOption?.values[i] ?? placeholderColors[i],
        image: p.images.edges[i]?.node ?? p.images.edges[0]?.node,
      });
    }
  }

  return (
    <div className="grid grid-cols-5 gap-x-3 md:gap-x-6">
      {tiles.map((tile) => (
        <Link
          key={tile.color}
          to="/product/$handle"
          params={{ handle: p.handle }}
          className="group block"
        >
          <div className="relative aspect-[3/4] overflow-hidden bg-muted">
            {tile.image ? (
              <img
                src={tile.image.url}
                alt={tile.image.altText ?? `The Vanity Case — ${tile.color}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <ImageSlot
                label={`The Vanity Case — ${tile.color}`}
                caption={tile.color}
                className="absolute inset-0 border-0"
              />
            )}
          </div>
          <div className="mt-5">
            <h3 className="font-serif text-lg md:text-xl leading-tight">
              The Vanity Case
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {tile.color} — {formatPrice(price.amount, price.currencyCode)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-border py-24 text-center max-w-md mx-auto">
      <p className="font-serif text-2xl">No products found</p>
      <p className="text-sm text-muted-foreground mt-2">
        Add a product in Shopify to populate the collection.
      </p>
    </div>
  );
}


function BrandStatement() {
  return (
    <section id="story" className="px-6 md:px-10 py-24 md:py-32 bg-secondary/40 text-center">
      <div className="max-w-2xl mx-auto">
        <img src={logoBlack.url} alt="Dahlia" className="h-14 md:h-16 w-auto mx-auto mb-8" />
        <p className="eyebrow text-muted-foreground mb-6">
          Imagined in Paris. Crafted by hand.
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-foreground/80">
          Dahlia is a modern leather-led lifestyle brand shaped around the
          rituals of self and travel, where the objects you carry become part of
          everyday life. Small batch. Considered. Made to keep.
        </p>
      </div>
    </section>
  );
}

function ProductFeature() {
  const { data: products } = useSuspenseQuery(productsQuery);
  const product = products[0]?.node;
  if (!product) return null;

  return (
    <section className="px-6 md:px-10 py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-center">
        <ImageSlot
          label={`${product.title} — editorial image`}
          caption="Editorial image"
          className="aspect-[4/5] w-full border-0"
        />
        <div className="max-w-md">
          <h3 className="font-serif text-5xl md:text-6xl leading-[0.95] mb-6">
            {product.title}
          </h3>
          <p className="text-lg leading-relaxed text-muted-foreground mb-8">
            {product.description ||
              "A refined vanity case, structured to travel and made to keep. Assembled by hand in our Paris atelier from full-grain leather."}
          </p>
          <Link
            to="/product/$handle"
            params={{ handle: product.handle }}
            className="eyebrow underline underline-offset-8 decoration-1 hover:text-accent"
          >
            Discover Now
          </Link>
        </div>
      </div>
    </section>
  );
}
