import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ImageSlot } from "@/components/site/ImageSlot";
import logoBlack from "@/assets/dahlia-logo-black.svg.asset.json";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      <Banner />
      <CollectionCarousel />
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
            className="inline-flex items-center justify-center rounded-full border border-white/90 text-white capitalize hover:bg-white hover:text-foreground transition-colors backdrop-blur-[1px]"
            style={{
              fontSize: "14px",
              lineHeight: "16px",
              height: "42px",
              padding: "0 32px",
              letterSpacing: "0.01em",
              borderWidth: "1px",
            }}
          >
            Shop the Collection
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5 color cards, Sept-style featured carousel ---------- */
type ColorCard = {
  name: string;
  swatch: string;
  price: string;
};

const COLOR_CARDS: ColorCard[] = [
  { name: "Black", swatch: "#1a1614", price: "€480" },
  { name: "Brown", swatch: "#6b4a2b", price: "€480" },
  { name: "Burgundy", swatch: "#5c1a2a", price: "€480" },
  { name: "Pink", swatch: "#e8b8c8", price: "€480" },
  { name: "Beige", swatch: "#d9c4a6", price: "€480" },
];

function CollectionCarousel() {
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
  }, [updateEdges]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      className="px-6 md:px-10"
      style={{ paddingBlock: "clamp(45px, 8vw, 80px)" }}
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-6 md:mb-8 text-center md:text-left">
          <h2 className="font-serif font-bold text-[20px] md:text-[24px] leading-[26px] tracking-tight">
            Collection
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
            {COLOR_CARDS.map((c) => (
              <div
                key={c.name}
                data-card
                className="snap-start shrink-0 w-[74vw] md:w-[calc((100%-4.5rem)/4)] lg:w-[calc((100%-6rem)/5)]"
              >
                <ColorProductCard card={c} />
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

function ColorProductCard({ card }: { card: ColorCard }) {
  return (
    <Link to="/collection" className="group block">
      <div
        className="relative w-full aspect-[4/5] overflow-hidden"
        style={{ backgroundColor: card.swatch }}
      >
        <ImageSlot
          label={`The Vanity Case — ${card.name}`}
          caption={card.name}
          className="absolute inset-0 border-0 bg-transparent text-white/70"
        />
      </div>
      <div
        className="flex justify-between items-start gap-1"
        style={{ marginTop: "20px" }}
      >
        <div className="text-[14px] md:text-[15px] leading-[20px]">
          The Vanity Case
          <br />
          <span className="text-muted-foreground text-[12px] md:text-[13px]">
            {card.name}
          </span>
        </div>
        <div className="text-muted-foreground text-[13px] md:text-[14px] whitespace-nowrap">
          {card.price}
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
