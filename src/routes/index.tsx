import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { fetchProducts, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { ImageSlot } from "@/components/site/ImageSlot";
import logoBlack from "@/assets/dahlia-logo-black.svg.asset.json";

const productsQuery = queryOptions({
  queryKey: ["products", "home"],
  queryFn: () => fetchProducts(12),
});

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  component: Home,
});

function Home() {
  return (
    <div>
      <Banner />
      <Suspense fallback={<div className="h-96" />}>
        <VolOneCollection />
      </Suspense>
      <TextBanner />
    </div>
  );
}

/* ---------- Sept-style image banner with outline CTA ---------- */
function Banner() {
  return (
    <section className="relative -mt-16">
      <div className="relative w-full aspect-[16/9] md:aspect-[32/17] overflow-hidden bg-secondary">
        <ImageSlot
          label="Dahlia — hero banner (3200×1700)"
          caption="Hero banner"
          className="absolute inset-0 border-0"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-[42px] md:pb-[80px] px-6 text-center">
          <img
            src={logoBlack.url}
            alt="Dahlia"
            className="max-w-[300px] md:max-w-[540px] w-auto invert brightness-0 opacity-95 mb-8 md:mb-10"
          />
          <Link
            to="/collection"
            className="inline-flex items-center justify-center border border-white text-white capitalize hover:bg-white hover:text-foreground transition-colors"
            style={{
              fontSize: "14px",
              lineHeight: "16px",
              height: "38px",
              padding: "12px 26px",
              letterSpacing: "0.02em",
            }}
          >
            Shop Vol. One
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Sept-style featured collection carousel ---------- */
function VolOneCollection() {
  const { data: products } = useSuspenseQuery(productsQuery);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges, products.length]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (!products.length) {
    return (
      <section
        className="px-6 md:px-10"
        style={{ paddingBlock: "clamp(45px, 8vw, 80px)" }}
      >
        <div className="max-w-[1600px] mx-auto text-center">
          <h2 className="font-serif text-[20px] md:text-[24px] leading-[26px] font-bold">
            Vol. One
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Add products in Shopify to populate the collection.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="px-6 md:px-10"
      style={{ paddingBlock: "clamp(45px, 8vw, 80px)" }}
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-6 md:mb-8 text-center md:text-left">
          <h2 className="font-serif font-bold text-[20px] md:text-[24px] leading-[26px] tracking-tight">
            Vol. One
          </h2>
          <p className="mt-3 text-[12px] md:text-[15px] leading-[15px] md:leading-[22px] text-muted-foreground max-w-2xl mx-auto md:mx-0">
            The collection begins at our atelier. Shaped by a Parisian eye and
            crafted through modern leatherwork, each vanity case is designed to
            hold the small rituals that travel with you.
          </p>
        </div>

        <div className="relative group">
          <div
            ref={scrollerRef}
            className="flex gap-3 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((p) => (
              <div
                key={p.node.id}
                data-card
                className="snap-start shrink-0 w-[74vw] md:w-[calc((100%-3rem)/3)]"
              >
                <CarouselCard product={p} />
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollBy(-1)}
            disabled={!canPrev}
            className="hidden md:flex absolute left-2 top-[38%] -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full bg-background/90 border border-border opacity-0 group-hover:opacity-100 transition disabled:opacity-0"
          >
            <svg width="16" viewBox="0 0 16 18" fill="none">
              <path d="M11 1 3 9l8 8" stroke="currentColor" strokeLinecap="square" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollBy(1)}
            disabled={!canNext}
            className="hidden md:flex absolute right-2 top-[38%] -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full bg-background/90 border border-border opacity-0 group-hover:opacity-100 transition disabled:opacity-0"
          >
            <svg width="16" viewBox="0 0 16 18" fill="none">
              <path d="m5 17 8-8-8-8" stroke="currentColor" strokeLinecap="square" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function CarouselCard({ product }: { product: ShopifyProduct }) {
  const p = product.node;
  const img1 = p.images.edges[0]?.node;
  const img2 = p.images.edges[1]?.node ?? img1;
  const price = p.priceRange.minVariantPrice;

  return (
    <Link
      to="/product/$handle"
      params={{ handle: p.handle }}
      className="group block"
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-muted">
        {img1 ? (
          <>
            <img
              src={img1.url}
              alt={img1.altText ?? p.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
            {img2 && (
              <img
                src={img2.url}
                alt={img2.altText ?? p.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <ImageSlot label={p.title} caption="Product" className="absolute inset-0 border-0" />
        )}
      </div>
      <div
        className="flex justify-between items-start gap-1"
        style={{ marginTop: "20px" }}
      >
        <div className="text-[14px] md:text-[15px] leading-[20px]">
          {p.title}
          <br />
          <span className="text-muted-foreground text-[12px] md:text-[13px]">
            Vanity Case / Petit
          </span>
        </div>
        <div className="text-muted-foreground text-[13px] md:text-[14px] whitespace-nowrap">
          {formatPrice(price.amount, price.currencyCode)}
        </div>
      </div>
    </Link>
  );
}

/* ---------- Sept-style rich-text banner ---------- */
function TextBanner() {
  return (
    <section
      className="text-center px-6"
      style={{
        paddingBlockStart: "clamp(42px, 6vw, 80px)",
        paddingBlockEnd: "clamp(52px, 10vw, 140px)",
      }}
    >
      <div className="max-w-[560px] mx-auto">
        <img
          src={logoBlack.url}
          alt=""
          aria-hidden
          className="mx-auto"
          style={{ width: "clamp(34px, 6vw, 44px)", height: "auto" }}
        />
        <h2
          className="font-serif font-bold uppercase tracking-[0.02em]"
          style={{
            marginBlockStart: "clamp(56px, 8vw, 96px)",
            fontSize: "clamp(10px, 1.4vw, 20px)",
            lineHeight: "clamp(15px, 1.8vw, 26px)",
          }}
        >
          Imagined in Paris. Crafted by hand
        </h2>
        <p
          className="mt-6"
          style={{
            fontSize: "clamp(12px, 1.4vw, 20px)",
            lineHeight: "clamp(15px, 1.8vw, 26px)",
          }}
        >
          Dahlia is a modern leather-led lifestyle brand shaped around the
          rituals of self and travel, where the objects you carry become part
          of everyday life. Small batch. Considered. Made to keep.
        </p>
      </div>
    </section>
  );
}
