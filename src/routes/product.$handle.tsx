import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useMemo, useState, Suspense } from "react";
import { Loader2, Heart } from "lucide-react";
import { fetchProductByHandle, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

const productQueryOptions = (handle: string) =>
  queryOptions({
    queryKey: ["product", handle],
    queryFn: async () => {
      const p = await fetchProductByHandle(handle);
      if (!p) throw notFound();
      return p;
    },
  });

export const Route = createFileRoute("/product/$handle")({
  head: ({ params, loaderData }) => {
    const p = loaderData as Awaited<ReturnType<typeof fetchProductByHandle>> | undefined;
    const title = p?.title ?? "Product";
    const desc = p?.description?.slice(0, 155) ?? "A Dahlia vanity case.";
    const img = p?.images.edges[0]?.node.url;
    return {
      meta: [
        { title: `${title} — Dahlia` },
        { name: "description", content: desc },
        { property: "og:title", content: `${title} — Dahlia` },
        { property: "og:description", content: desc },
        ...(img ? [{ property: "og:image", content: img }, { name: "twitter:image", content: img }] : []),
      ],
      links: [{ rel: "canonical", href: `/product/${params.handle}` }],
    };
  },
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(productQueryOptions(params.handle)),
  component: ProductPage,
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-serif text-4xl">Piece not found</h1>
      <p className="text-muted-foreground mt-2">This vanity case couldn't be located.</p>
      <Link to="/collection" className="eyebrow mt-8 underline underline-offset-4 hover:text-accent">
        Back to the collection
      </Link>
    </div>
  );
}

function ProductPage() {
  const { handle } = Route.useParams();
  return (
    <Suspense fallback={<div className="h-screen" />}>
      <ProductDetail handle={handle} />
    </Suspense>
  );
}

/* Map color option values to swatch hex. */
const COLOR_SWATCHES: Record<string, string> = {
  black: "#111111",
  beige: "#d9c6a5",
  brown: "#6b4a2b",
  pink: "#e8b5c0",
  burgundy: "#6b1f2b",
};

function swatchColor(value: string): string {
  return COLOR_SWATCHES[value.toLowerCase()] ?? "#cccccc";
}

function ProductDetail({ handle }: { handle: string }) {
  const { data: product } = useSuspenseQuery(productQueryOptions(handle));
  const images = product.images.edges;
  const variants = product.variants.edges;
  const [variantId, setVariantId] = useState(variants[0]?.node.id);
  const [qty] = useState(1);

  const selectedVariant = useMemo(
    () => variants.find((v) => v.node.id === variantId)?.node ?? variants[0]?.node,
    [variantId, variants],
  );

  const colorOption = product.options.find((o) => o.name.toLowerCase() === "color" || o.name.toLowerCase() === "colour");
  const selectedColor = selectedVariant?.selectedOptions.find(
    (o) => o.name.toLowerCase() === "color" || o.name.toLowerCase() === "colour",
  )?.value;

  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const productWrap: ShopifyProduct = { node: product };
  const inStock = !!selectedVariant?.availableForSale;

  const handleAdd = async () => {
    if (!selectedVariant || !inStock) return;
    await addItem({
      product: productWrap,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: qty,
      selectedOptions: selectedVariant.selectedOptions ?? [],
    });
  };

  const handleNotify = () => {
    alert("We'll let you know when this piece is back.");
  };


  return (
    <article className="px-4 md:px-10 pt-10 pb-24 bg-background">
      <div className="max-w-[1500px] mx-auto">
        <nav className="eyebrow text-muted-foreground mb-8 text-xs">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/collection" className="hover:text-accent">Collection</Link>
          <span className="mx-2">/</span>
          <span>{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,460px)] gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-3 w-20 shrink-0">
              {images.slice(0, 6).map((img, i) => (
                <button
                  key={img.node.url}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`aspect-square bg-muted overflow-hidden border transition-colors ${
                    activeImage === i ? "border-foreground" : "border-transparent hover:border-border"
                  }`}
                >
                  <img
                    src={img.node.url}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="relative flex-1 bg-muted aspect-square overflow-hidden">
              {mainImage ? (
                <img
                  key={mainImage.node.url}
                  src={mainImage.node.url}
                  alt={mainImage.node.altText ?? product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground eyebrow text-xs">
                  Product image
                </div>
              )}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((i) => (i - 1 + images.length) % images.length)}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-background/80 hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setActiveImage((i) => (i + 1) % images.length)}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-background/80 hover:bg-background transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Info panel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-serif text-4xl md:text-5xl leading-none">
                {product.title}
              </h1>
              <button
                aria-label="Add to wishlist"
                className="shrink-0 h-10 w-10 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <div className="text-lg mt-6">
              {selectedVariant &&
                formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
            </div>

            {colorOption && (
              <div className="mt-10">
                <div className="text-sm mb-4">
                  Colour: <span className="text-muted-foreground">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {colorOption.values.map((value) => {
                    const match = variants.find((v) =>
                      v.node.selectedOptions.some(
                        (o) => o.name === colorOption.name && o.value === value,
                      ),
                    );
                    const isActive = selectedColor === value;
                    const disabled = !match;
                    return (
                      <button
                        key={value}
                        onClick={() => match && setVariantId(match.node.id)}
                        disabled={disabled}
                        aria-label={value}
                        title={value}
                        className={`relative h-9 w-9 rounded-full border transition-all ${
                          isActive
                            ? "border-foreground ring-1 ring-foreground ring-offset-2 ring-offset-background"
                            : "border-foreground/20 hover:border-foreground/60"
                        } disabled:opacity-30`}
                        style={{ backgroundColor: swatchColor(value) }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-10 space-y-3">
              <button
                onClick={handleAdd}
                disabled={isLoading || !inStock}
                className="w-full h-14 border border-foreground uppercase tracking-[0.2em] text-sm hover:bg-foreground hover:text-background transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-foreground flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Add to cart"
                )}
              </button>

              {!inStock && (
                <button
                  onClick={handleNotify}
                  className="w-full h-14 bg-muted text-foreground/70 uppercase tracking-[0.2em] text-sm hover:bg-muted/80 transition-colors"
                >
                  Notify me when available
                </button>
              )}
            </div>

            <div className="mt-10 text-sm leading-relaxed text-foreground/80 whitespace-pre-line">
              {product.description || "A Dahlia vanity case."}
            </div>

            <div className="mt-10 pt-8 border-t border-foreground/15 grid grid-cols-2 gap-6 text-xs text-muted-foreground">
              <div>
                <div className="eyebrow text-foreground mb-1">Shipping</div>
                Worldwide. Free above €300.
              </div>
              <div>
                <div className="eyebrow text-foreground mb-1">Made</div>
                By hand in Paris, in small batches.
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
