import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { ImageSlot } from "@/components/site/ImageSlot";
import { formatPrice, type StaticProduct } from "@/lib/staticProducts";
import { STATIC_PRODUCTS } from "@/lib/staticProducts";
import monogrammeWhite from "@/assets/dahlia-monogramme-white.png.asset.json";

export const Route = createFileRoute("/lizard")({
  head: () => ({
    meta: [
      { title: "The Lizard Collection — Dahlia" },
      { name: "description", content: "A limited pair of vanity cases in lizard-embossed vegan leather, finished in petal pink and warm beige." },
      { property: "og:title", content: "The Lizard Collection — Dahlia" },
      { property: "og:description", content: "A limited pair of vanity cases in lizard-embossed vegan leather, finished in petal pink and warm beige." },
    ],
  }),
  component: LizardPage,
});

const LIZARD_PINK = "#EDC7C7";
const LIZARD_BEIGE = "#d9c6a5";

function LizardPage() {
  const lizardProduct = STATIC_PRODUCTS["vanity-case-lizard"];

  return (
    <div>
      {/* Hero banner */}
      <section
        className="bg-petale text-burgundy"
        style={{
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
              width: "clamp(100px, 16vw, 220px)",
              height: "auto",
            }}
          />
          <h1
            className="font-garamond"
            style={{
              fontWeight: 300,
              letterSpacing: "0.01em",
              marginBlockStart: "1.25rem",
              fontSize: "clamp(36px, 5.5vw, 64px)",
              lineHeight: 1.05,
            }}
          >
            A little wild, beautifully kept
          </h1>
          <p
            style={{
              marginBlockStart: "1.25rem",
              fontSize: "1rem",
              lineHeight: 1.6,
            }}
          >
            Lizard-embossed leather brings a subtle edge to the Dahlia ritual — a
            tactile finish, made for the shelf, the suitcase, and everywhere in between.
          </p>
        </div>
      </section>

      {/* Petal pink — text left, image right */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center px-6 md:px-10 py-16 md:py-24 bg-background">
          <div className="max-w-md">
            <p className="eyebrow uppercase text-muted-foreground">Lizard Pink</p>
            <h2
              className="font-garamond text-black mt-4"
              style={{
                fontWeight: 300,
                letterSpacing: "0.01em",
                fontSize: "clamp(30px, 4vw, 48px)",
                lineHeight: 1.1,
              }}
            >
              Petal pink, made to travel
            </h2>
            <p
              className="mt-5 text-muted-foreground"
              style={{ fontSize: "15px", lineHeight: 1.7 }}
            >
              A reserved place for the pink lizard vanity case photography — styled
              with the quiet confidence of a piece you reach for every day.
            </p>
          </div>
        </div>
        <div className="relative min-h-[400px] md:min-h-[600px] bg-petale">
          <ImageSlot
            label="Petal pink lizard vanity case campaign image"
            caption="Pink lizard campaign image"
            className="absolute inset-0 border-0 bg-petale text-foreground"
          />
        </div>
      </section>

      {/* Warm beige — image left, text right */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative min-h-[400px] md:min-h-[600px]" style={{ backgroundColor: LIZARD_BEIGE }}>
          <ImageSlot
            label="Warm beige lizard vanity case campaign image"
            caption="Beige lizard campaign image"
            className="absolute inset-0 border-0 text-foreground"
            style={{ backgroundColor: LIZARD_BEIGE }}
          />
        </div>
        <div className="flex items-center justify-center px-6 md:px-10 py-16 md:py-24 bg-background">
          <div className="max-w-md">
            <p className="eyebrow uppercase text-muted-foreground">Lizard Beige</p>
            <h2
              className="font-garamond text-black mt-4"
              style={{
                fontWeight: 300,
                letterSpacing: "0.01em",
                fontSize: "clamp(30px, 4vw, 48px)",
                lineHeight: 1.1,
              }}
            >
              Warm beige, quietly considered
            </h2>
            <p
              className="mt-5 text-muted-foreground"
              style={{ fontSize: "15px", lineHeight: 1.7 }}
            >
              A reserved place for beige lizard vanity case photography — a softer
              study in texture, craftsmanship, and travel-ready ritual.
            </p>
          </div>
        </div>
      </section>

      {/* The collection — two product cards */}
      <section className="bg-background px-6 md:px-10" style={{ paddingBlock: "clamp(60px, 8vw, 120px)" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-xl mb-12 md:mb-16">
            <p className="eyebrow uppercase text-muted-foreground">The Lizard Collection</p>
            <h2
              className="font-garamond text-black mt-4"
              style={{
                fontWeight: 300,
                letterSpacing: "0.01em",
                fontSize: "clamp(30px, 4vw, 48px)",
                lineHeight: 1.1,
              }}
            >
              A softer kind of statement
            </h2>
            <p
              className="mt-5 text-muted-foreground"
              style={{ fontSize: "15px", lineHeight: 1.7 }}
            >
              A limited pair of vanity cases in lizard-embossed leather, finished
              in petal pink and warm beige for rituals that travel beautifully.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <LizardProductCard
              product={lizardProduct}
              color="Rose"
              bgColor={LIZARD_PINK}
            />
            <LizardProductCard
              product={lizardProduct}
              color="Beige"
              bgColor={LIZARD_BEIGE}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function LizardProductCard({
  product,
  color,
  bgColor,
}: {
  product: StaticProduct;
  color: string;
  bgColor: string;
}) {
  const price = product.variants.find((v) => v.color === color)?.price ??
    product.variants[0]?.price ?? { amount: "0", currencyCode: "USD" };

  return (
    <Link to="/product/$handle" params={{ handle: product.handle }} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden">
        <ImageSlot
          label={`${product.title} — ${color}`}
          caption={color}
          className="absolute inset-0 border-0 text-foreground"
          style={{ backgroundColor: bgColor }}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <div className="flex justify-between items-start gap-1">
          <div style={{ fontSize: "15px", lineHeight: "20px" }}>
            {product.title}
            <br />
            <span className="text-muted-foreground" style={{ fontSize: "13px" }}>
              {product.subtitle}
            </span>
          </div>
          <div
            className="text-muted-foreground whitespace-nowrap"
            style={{ fontSize: "14px", lineHeight: "20px" }}
          >
            {formatPrice(price.amount, price.currencyCode)}
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-1.5 text-[12px] text-foreground/80">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#3ea564]" aria-hidden />
          <span>Limited stock available</span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <Star className="w-3 h-3 fill-foreground text-foreground" aria-hidden />
          <span>4.9 stars</span>
        </div>
      </div>
    </Link>
  );
}
