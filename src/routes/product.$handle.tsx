import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useEffect, useMemo, useState, Suspense } from "react";
import { Loader2, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchProductByHandle, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useBannerStore } from "@/stores/bannerStore";
import { ProductReviews } from "@/components/site/ProductReviews";
import { UGCGallery } from "@/components/site/UGCGallery";
import { Marquee } from "@/components/site/Marquee";
import { StopDigging } from "@/components/site/StopDigging";
import { WashableInterior } from "@/components/site/WashableInterior";
import { LifestyleStory } from "@/components/site/LifestyleStory";
import { ReassuranceIcons } from "@/components/site/ReassuranceIcons";
import { ReviewsSection } from "@/components/site/ReviewsSection";

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
        { name: "Description", content: desc },
        { property: "og:title", content: `${title} — Dahlia` },
        { property: "og:description", content: desc },
        ...(img ? [{ property: "og:image", content: img }, { name: "Twitter:image", content: img }] : []),
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
      <h1 className="font-garamond text-4xl">Piece not found</h1>
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

/* Choose light or dark text for a given hex swatch for readability. */
function textColorForSwatch(value: string): string {
  const hex = swatchColor(value).replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#111111" : "#ffffff";
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

  // Detect the color option: prefer named "color"/"colour", otherwise fall back
  // to any option whose values match known color swatch names.
  const isColorName = (v: string) => v.toLowerCase() in COLOR_SWATCHES;
  const colorOption =
    product.options.find((o) => ["color", "colour"].includes(o.name.toLowerCase())) ??
    product.options.find((o) => o.values.some(isColorName));
  const selectedColor = colorOption
    ? selectedVariant?.selectedOptions.find((o) => o.name === colorOption.name)?.value
    : undefined;

  // When the selected color changes, switch the main image to match (by altText, then by index).
  useEffect(() => {
    if (!selectedColor || images.length === 0) return;
    const needle = selectedColor.toLowerCase();
    const byAlt = images.findIndex((img) =>
      (img.node.altText ?? "").toLowerCase().includes(needle),
    );
    if (byAlt >= 0) {
      setActiveImage(byAlt);
      return;
    }
    if (colorOption) {
      const idx = colorOption.values.findIndex((v) => v.toLowerCase() === needle);
      if (idx >= 0 && idx < images.length) setActiveImage(idx);
    }
  }, [selectedColor, colorOption, images]);

  // Sync top banner color with selected swatch.
  const setBannerColor = useBannerStore((s) => s.setColor);
  useEffect(() => {
    if (!selectedColor) return;
    setBannerColor(swatchColor(selectedColor), textColorForSwatch(selectedColor));
    return () => setBannerColor(null, null);
  }, [selectedColor, setBannerColor]);

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

        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(300px,390px)] xl:grid-cols-[minmax(0,940px)_420px] gap-8 md:gap-10 xl:gap-16 items-start">
          {/* Left side — thumbnails next to the main product image */}
          <div className="grid md:grid-cols-[72px_minmax(0,1fr)] gap-3 md:gap-5">
            <div className="hidden md:flex flex-col gap-3">
              {images.slice(0, 8).map((img, i) => (
                <button
                  key={img.node.url}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`aspect-[4/5] bg-muted overflow-hidden rounded-[2px] transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground ${
                    activeImage === i ? "opacity-100" : "opacity-55 hover:opacity-100"
                  }`}
                >
                  <img src={img.node.url} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>

            <div className="relative bg-muted rounded-[2px] overflow-hidden aspect-[4/5] md:min-h-[620px]">
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground"
                  >
                    <ChevronLeft className="h-6 w-6" strokeWidth={1.25} />
                  </button>
                  <button
                    onClick={() => setActiveImage((i) => (i + 1) % images.length)}
                    aria-label="Next image"
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground"
                  >
                    <ChevronRight className="h-6 w-6" strokeWidth={1.25} />
                  </button>
                </>
              )}
            </div>

            <div className="md:hidden flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
              {images.slice(0, 8).map((img, i) => (
                <button
                  key={img.node.url}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`shrink-0 h-16 w-13 bg-muted overflow-hidden rounded-[2px] transition-opacity ${
                    activeImage === i ? "opacity-100 ring-1 ring-foreground/70" : "opacity-70"
                  }`}
                >
                  <img src={img.node.url} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* Right side — product information */}
          <div className="md:sticky md:top-24 md:self-start">
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-garamond text-[34px] leading-none">
                {product.title}
              </h1>
              <button
                aria-label="Add to wishlist"
                className="shrink-0 h-10 w-10 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="text-[15px]">
                {selectedVariant &&
                  formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
              </div>
              <ProductReviews />
            </div>


            {colorOption && (
              <div className="mt-8">
                <div className="text-[13px] mb-4">
                  Colour: <span className="text-muted-foreground">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {colorOption.values.map((value) => {
                    const match = variants.find((v) =>
                      v.node.selectedOptions.some(
                        (o) => O.name === colorOption.name && o.value === value,
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

            <div className="mt-8 space-y-3">
              <button
                onClick={handleAdd}
                disabled={isLoading || !inStock}
                className="w-full h-13 border border-transparent tracking-[0.14em] text-[12px] transition-colors duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={
                  selectedColor
                    ? {
                        backgroundColor: swatchColor(selectedColor),
                        color: textColorForSwatch(selectedColor),
                        // Persist the same paint for both rest and hover states.
                        "--btn-bg": swatchColor(selectedColor),
                        "--btn-fg": textColorForSwatch(selectedColor),
                      } as React.CSSProperties
                    : { backgroundColor: "#111111", color: "#ffffff" }
                }
                onMouseEnter={(e) => {
                  const target = e.currentTarget;
                  if (selectedColor) {
                    target.style.backgroundColor = "var(--btn-bg)";
                    target.style.color = "var(--btn-fg)";
                    target.style.filter = "brightness(0.95)";
                  }
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget;
                  if (selectedColor) {
                    target.style.backgroundColor = "var(--btn-bg)";
                    target.style.color = "var(--btn-fg)";
                    target.style.filter = "none";
                  }
                }}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "add to cart"
                )}
              </button>


              {!inStock && (
                <button
                  onClick={handleNotify}
                  className="w-full h-13 bg-muted text-foreground/70 tracking-[0.14em] text-[12px] hover:bg-muted/80 transition-colors"
                >
                  Notify me when available
                </button>
              )}
            </div>

            <div className="mt-8 text-[13px] leading-relaxed text-foreground/80 whitespace-pre-line">
              {product.description || "A Dahlia vanity case."}
            </div>

          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-24">
        <Marquee />
      </div>

      <div className="mt-16 md:mt-24">
        <UGCGallery />
      </div>

      <StopDigging />

      <WashableInterior />

      <LifestyleStory />

      <ReassuranceIcons />

      <ReviewsSection />
    </article>
  );
}
