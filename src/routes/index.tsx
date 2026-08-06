import { createFileRoute, Link } from "@tanstack/react-router";

import { ImageSlot } from "@/components/site/ImageSlot";
import { SocialFeed } from "@/components/site/SocialFeed";
import { ReassuranceIcons } from "@/components/site/ReassuranceIcons";
import { Editorial } from "@/components/site/Editorial";
import { ProductReviews } from "@/components/site/ProductReviews";
import { FAQ } from "@/components/site/FAQ";
import { LizardSections } from "@/components/site/LizardSections";

import logoBlack from "@/assets/dahlia-logo-black.svg.asset.json";
import monogrammeWhite from "@/assets/dahlia-monogramme-white.png.asset.json";
import heroBanner from "@/assets/hero-balzac.jpg.asset.json";




export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      <Banner />
      <CollectionCarousel />
      <TextBanner />
      <Editorial />
      <LizardBanner />
      <LizardSections />

      <SocialFeed />
      <ReassuranceIcons />
      <FAQ />
    </div>
  );
}

/* ---------- Sept-style image banner with outline CTA ---------- */
function Banner() {
  return (
    <section className="relative -mt-16">
      <div className="relative w-full aspect-[16/9] md:aspect-[32/17] overflow-hidden bg-secondary">
        <img
          src={heroBanner.url}
          alt="Dahlia — editorial hero, hotel suite"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/15" />

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-[42px] md:pb-[80px] px-6 text-center">
          <img
            src={logoBlack.url}
            alt="Dahlia"
            className="max-w-[300px] md:max-w-[540px] w-auto invert brightness-0 opacity-95 mb-8 md:mb-10"
          />
          <Link
            to="/vanity-cases"
            className="inline-block text-white border-b border-white/90 pb-1 hover:opacity-80 transition-opacity"
            style={{
              fontSize: "13px",
              letterSpacing: "0.14em",
            }}
          >
            Shop now
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5 product cards in one row with swatches ---------- */
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
        <div className="mb-8 md:mb-12 text-left">
          <h2 className="font-garamond text-black leading-[1.05] tracking-tight" style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, letterSpacing: "0.01em" }}>
            Collection
          </h2>
          <p className="mt-2 md:mt-3 text-[14px] md:text-[18px] leading-[20px] md:leading-[26px] text-muted-foreground max-w-3xl">
            The collection begins at our atelier. Shaped by a Parisian eye and
            crafted through modern leatherwork, each vanity case is designed to
            hold the small rituals that travel with you.
          </p>
        </div>

        <div className="grid grid-cols-5 gap-3 md:gap-6">
          {COLOR_SWATCHES.map((c) => (
            <VanityProductCard key={c.name} card={c} />
          ))}

        </div>
      </div>
    </section>
  );
}

function VanityProductCard({ card }: { card: ColorSwatch }) {
  return (
    <Link to="/vanity-cases" className="group block">
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
        className="text-[14px] md:text-[15px] leading-[20px]"
        style={{ marginTop: "16px" }}
      >
        The Vanity Case
      </div>
      <div
        className="text-muted-foreground text-[12px] md:text-[13px]"
        style={{ marginTop: "4px" }}
      >
        $70
      </div>
      <div className="flex items-center gap-1.5 mt-1.5 text-[12px] text-foreground/80">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#3ea564]" aria-hidden />
        <span>In stock for immediate dispatch</span>
      </div>
      <ProductReviews className="mt-[10px]" />
    </Link>
  );
}




/* ---------- Sept-style rich-text banner ---------- */
function TextBanner() {
  return (
    <section
      className="text-white"
      style={{
        backgroundColor: "#320F13",
        // sept .section-spacing → 2.5rem (mobile) to 4rem (desktop),
        // plus the 1.5625rem block-start compensation
        paddingBlockStart: "calc(clamp(2.5rem, 2.0122rem + 2.0813vw, 4rem) + 1.5625rem)",
        paddingBlockEnd: "clamp(2.5rem, 2.0122rem + 2.0813vw, 4rem)",
      }}
    >
      <div
        className="mx-auto text-center"
        style={{
          // sept .container--xs → 42.5rem, gutter 1.25rem → 3rem
          maxWidth: "55rem",
          paddingInline: "clamp(1.25rem, 0.6707rem + 2.4390vw, 3rem)",
        }}
      >
        <img
          src={monogrammeWhite.url}
          alt=""
          aria-hidden
          className="block mx-auto"
          style={{
            width: "clamp(140px, 22vw, 320px)",
            height: "auto",
            transform: "translateX(-8%)",
          }}
        />
        <h2
          className="font-garamond"
          style={{
            fontWeight: 300,
            letterSpacing: "0.01em",
            marginBlockStart: "1.25rem",
            fontSize: "clamp(40px, 6vw, 72px)",
            lineHeight: 1.05,
            whiteSpace: "nowrap",
          }}
        >
          Elevate your beauty routine
        </h2>
        <p
          style={{
            marginBlockStart: "1.25rem",
            fontSize: "1rem",
            lineHeight: 1.6,
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

/* ---------- Pink Lizard limited-edition banner ---------- */
function LizardBanner() {
  return (
    <section
      className="bg-petale text-burgundy"
      style={{
        // sept .section-spacing → 2.5rem (mobile) to 4rem (desktop),
        // plus the 1.5625rem block-start compensation
        paddingBlockStart: "calc(clamp(2.5rem, 2.0122rem + 2.0813vw, 4rem) + 1.5625rem)",
        paddingBlockEnd: "clamp(2.5rem, 2.0122rem + 2.0813vw, 4rem)",
      }}
    >
      <div
        className="mx-auto text-center"
        style={{
          maxWidth: "55rem",
          paddingInline: "clamp(1.25rem, 0.6707rem + 2.4390vw, 3rem)",
        }}
      >
        <img
          src={monogrammeWhite.url}
          alt=""
          aria-hidden
          className="block mx-auto"
          style={{
            width: "clamp(140px, 22vw, 320px)",
            height: "auto",
            transform: "translateX(-8%)",
            filter: "invert(1)",
          }}
        />
        <h2
          className="font-garamond"
          style={{
            fontWeight: 300,
            letterSpacing: "0.01em",
            marginBlockStart: "1.25rem",
            fontSize: "clamp(40px, 6vw, 72px)",
            lineHeight: 1.05,
            whiteSpace: "nowrap",
          }}
        >
          The Lizard limited edition
        </h2>
        <p
          style={{
            marginBlockStart: "1.25rem",
            fontSize: "1rem",
            lineHeight: 1.6,
          }}
        >
          Pink and beige, reimagined in lizard-embossed vegan leather. The same
          Dahlia silhouette, raised with a new scale of texture — for those who
          collect the exception.
        </p>
        <Link
          to="/lizard"
          className="inline-block mt-6 border-b border-burgundy/90 pb-1 hover:opacity-80 transition-opacity"
          style={{
            fontSize: "13px",
            letterSpacing: "0.14em",
          }}
        >
          Shop the lizard edition
        </Link>
      </div>
    </section>
  );
}
