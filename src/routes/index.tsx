import { createFileRoute, Link } from "@tanstack/react-router";

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

/* ---------- Single product card with color swatches ---------- */
type ColorSwatch = { name: string; swatch: string };

const COLOR_SWATCHES: ColorSwatch[] = [
  { name: "Black", swatch: "#1a1614" },
  { name: "Brown", swatch: "#6b4a2b" },
  { name: "Burgundy", swatch: "#5c1a2a" },
  { name: "Pink", swatch: "#e8b8c8" },
  { name: "Beige", swatch: "#d9c4a6" },
];

function CollectionCarousel() {
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

        <VanityProductCard />
      </div>
    </section>
  );
}

function VanityProductCard() {
  return (
    <Link to="/collection" className="group block max-w-md">
      <div className="text-[15px] md:text-[16px] leading-[22px]">
        The Vanity Case
      </div>
      <div
        className="text-muted-foreground text-[13px] md:text-[14px]"
        style={{ marginTop: "8px" }}
      >
        $70
      </div>
      <div
        className="flex items-center gap-2"
        style={{ marginTop: "14px" }}
      >
        {COLOR_SWATCHES.map((c, i) => (
          <span
            key={c.name}
            aria-label={c.name}
            title={c.name}
            className="inline-block rounded-full"
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: c.swatch,
              boxShadow: i === 0
                ? "0 0 0 1px hsl(var(--foreground)), 0 0 0 3px hsl(var(--background)), 0 0 0 4px hsl(var(--foreground))"
                : "inset 0 0 0 1px rgba(0,0,0,0.08)",
            }}
          />
        ))}
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
