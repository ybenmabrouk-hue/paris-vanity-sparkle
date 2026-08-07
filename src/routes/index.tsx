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
          alt="Dahlia — hero éditorial, suite d'hôtel"
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
            Découvrir
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5 product cards in one row with swatches ---------- */
type ColorSwatch = { name: string; swatch: string };

const COLOR_SWATCHES: ColorSwatch[] = [
  { name: "Noir", swatch: "#1a1614" },
  { name: "Marron", swatch: "#6b4a2b" },
  { name: "Bordeaux", swatch: "#5c1a2a" },
  { name: "Rose", swatch: "#e8b8c8" },
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
            La collection commence dans notre atelier. Façonnée par un regard
            parisien et travaillée selon un savoir-faire moderne du cuir,
            chaque vanity case est conçue pour accueillir les petits rituels
            qui vous accompagnent.
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
        <span>En stock, expédition immédiate</span>
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
          Sublimez votre rituel beauté
        </h2>
        <p
          style={{
            marginBlockStart: "1.25rem",
            fontSize: "1rem",
            lineHeight: 1.6,
          }}
        >
          Dahlia est une marque de vie moderne portée par le cuir, façonnée
          autour des rituels du quotidien et du voyage, où les objets que vous
          emportez deviennent partie intégrante de votre vie. Petites séries.
          Réfléchis. Faits pour durer.
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
          L'édition limitée Lizard
        </h2>
        <p
          style={{
            marginBlockStart: "1.25rem",
            fontSize: "1rem",
            lineHeight: 1.6,
          }}
        >
          Rose et beige, réinventés en cuir vegan gaufré façon lézard. La même
          silhouette Dahlia, sublimée par une nouvelle échelle de texture —
          pour celles qui collectionnent l'exception.
        </p>
        <Link
          to="/lizard"
          className="inline-block mt-6 border-b border-burgundy/90 pb-1 hover:opacity-80 transition-opacity"
          style={{
            fontSize: "13px",
            letterSpacing: "0.14em",
          }}
        >
          Découvrir l'édition lizard
        </Link>
      </div>
    </section>
  );
}
