import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useMemo, useState, Suspense } from "react";
import { Loader2, Minus, Plus } from "lucide-react";
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

function ProductDetail({ handle }: { handle: string }) {
  const { data: product } = useSuspenseQuery(productQueryOptions(handle));
  const images = product.images.edges;
  const variants = product.variants.edges;
  const [variantId, setVariantId] = useState(variants[0]?.node.id);
  const [qty, setQty] = useState(1);

  const selectedVariant = useMemo(
    () => variants.find((v) => v.node.id === variantId)?.node ?? variants[0]?.node,
    [variantId, variants],
  );

  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  // Reconstruct a ShopifyProduct wrapper so cart items keep the expected shape.
  const productWrap: ShopifyProduct = { node: product };

  const handleAdd = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: productWrap,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: qty,
      selectedOptions: selectedVariant.selectedOptions ?? [],
    });
  };

  return (
    <article className="px-6 md:px-10 pt-10 pb-24">
      <div className="max-w-[1600px] mx-auto">
        <nav className="eyebrow text-muted-foreground mb-8">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/collection" className="hover:text-accent">Collection</Link>
          <span className="mx-2">/</span>
          <span>{product.title}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {images.length === 0 ? (
              <div
                role="img"
                aria-label={`${product.title} — product image`}
                className="aspect-[4/5] bg-muted border border-dashed border-border flex items-center justify-center text-muted-foreground md:col-span-2"
              >
                <span className="eyebrow text-xs">Product image</span>
              </div>
            ) : (
              images.map((img, i) => (
                <div
                  key={img.node.url}
                  className={`aspect-[4/5] bg-muted overflow-hidden ${
                    images.length > 1 && i === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  <img
                    src={img.node.url}
                    alt={img.node.altText ?? product.title}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            )}
          </div>

          <div className="md:sticky md:top-24 md:self-start">
            <div className="eyebrow text-muted-foreground">Vanity Case</div>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight mt-3">
              {product.title}
            </h1>
            <div className="text-2xl font-serif mt-4">
              {selectedVariant && formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
            </div>

            <div
              className="prose prose-neutral mt-8 text-muted-foreground leading-relaxed whitespace-pre-line max-w-none"
            >
              {product.description || "A Maison Yasmine vanity case."}
            </div>

            {product.options.map((opt) => {
              if (opt.values.length <= 1 && opt.name.toLowerCase() === "title") return null;
              return (
                <div key={opt.name} className="mt-8">
                  <div className="eyebrow mb-3">{opt.name}</div>
                  <div className="flex flex-wrap gap-2">
                    {opt.values.map((value) => {
                      const match = variants.find((v) =>
                        v.node.selectedOptions.some(
                          (o) => o.name === opt.name && o.value === value,
                        ),
                      );
                      const isActive = selectedVariant?.selectedOptions.some(
                        (o) => o.name === opt.name && o.value === value,
                      );
                      return (
                        <button
                          key={value}
                          onClick={() => match && setVariantId(match.node.id)}
                          disabled={!match?.node.availableForSale}
                          className={`px-4 py-2 border text-sm transition-colors ${
                            isActive
                              ? "border-foreground bg-foreground text-background"
                              : "border-border hover:border-foreground"
                          } disabled:opacity-40 disabled:line-through`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="mt-10 flex items-stretch gap-3">
              <div className="flex items-center border border-border">
                <button
                  className="w-11 h-12 flex items-center justify-center hover:bg-muted"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center">{qty}</span>
                <button
                  className="w-11 h-12 flex items-center justify-center hover:bg-muted"
                  onClick={() => setQty(qty + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                disabled={isLoading || !selectedVariant?.availableForSale}
                className="flex-1 h-12 bg-foreground text-background eyebrow hover:bg-accent transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : selectedVariant?.availableForSale ? (
                  "Add to bag"
                ) : (
                  "Sold out"
                )}
              </button>
            </div>

            <div className="mt-10 pt-8 border-t border-border/60 grid grid-cols-2 gap-4 text-xs text-muted-foreground">
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
