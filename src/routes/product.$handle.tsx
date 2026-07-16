import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useMemo, useState, Suspense } from "react";
import { Loader2, Heart, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [activeImage, setActiveImage] = useState(0);

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

        <div className="grid lg:grid-cols-[80px_minmax(0,1fr)_minmax(340px,420px)] gap-3 lg:gap-8 xl:gap-12">
          {/* Thumbnails — vertical rail */}
          <div className="hidden lg:flex flex-col gap-3">
            {images.slice(0, 8).map((img, i) => (
              <button
                key={img.node.url}
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
                className={`aspect-square bg-muted overflow-hidden rounded-[4px] transition-opacity ${
                  activeImage === i ? "opacity-100 ring-1 ring-foreground/70" : "opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img.node.url} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>

          {/* Main image — large, étoile proportions */}
          <div className="relative bg-muted rounded-[4px] overflow-hidden aspect-square lg:aspect-[4/3.2]">
            {images[activeImage] ? (
              <img
                key={images[activeImage].node.url}
                src={images[activeImage].node.url}
                alt={images[activeImage].node.altText ?? product.title}
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" strokeWidth={1.25} />
                </button>
                <button
                  onClick={() => setActiveImage((i) => (i + 1) % images.length)}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                >
                  <ChevronRight className="h-6 w-6" strokeWidth={1.25} />
                </button>
              </>
            )}
          </div>

          {/* Mobile thumbnail strip */}
          <div className="lg:hidden flex gap-2 overflow-x-auto -mx-4 px-4 pb-1 order-last">
            {images.slice(0, 8).map((img, i) => (
              <button
                key={img.node.url}
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
                className={`shrink-0 h-16 w-16 bg-muted overflow-hidden rounded-[4px] transition-opacity ${
                  activeImage === i ? "opacity-100 ring-1 ring-foreground/70" : "opacity-70"
                }`}
              >
                <img src={img.node.url} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
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
