import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { ImageSlot } from "@/components/site/ImageSlot";
import { formatPrice, type StaticProduct } from "@/lib/staticProducts";
import { STATIC_PRODUCTS } from "@/lib/staticProducts";

export const LIZARD_PINK = "#EDC7C7";
export const LIZARD_BEIGE = "#d9c6a5";

export function LizardSections() {
  const lizardProduct = STATIC_PRODUCTS["vanity-case-lizard"];

  return (
    <>
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
              Rose pétale, faite pour voyager
            </h2>
            <p
              className="mt-5 text-muted-foreground"
              style={{ fontSize: "15px", lineHeight: 1.7 }}
            >
              Un emplacement réservé pour la photographie de la vanity case lézard rose — mise en scène
              avec l'assurance discrète d'un objet que l'on saisit chaque jour.
            </p>
          </div>
        </div>
        <div className="relative min-h-[400px] md:min-h-[600px] bg-petale">
          <ImageSlot
            label="Image de campagne de la vanity case lézard rose pétale"
            caption="Image de campagne lézard rose"
            className="absolute inset-0 border-0 bg-petale text-foreground"
          />
        </div>
      </section>

      {/* Warm beige — image left, text right */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div
          className="relative min-h-[400px] md:min-h-[600px]"
          style={{ backgroundColor: LIZARD_BEIGE }}
        >
          <ImageSlot
            label="Image de campagne de la vanity case lézard beige chaud"
            caption="Image de campagne lézard beige"
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
              Beige chaud, pensé avec discrétion
            </h2>
            <p
              className="mt-5 text-muted-foreground"
              style={{ fontSize: "15px", lineHeight: 1.7 }}
            >
              Un emplacement réservé pour la photographie de la vanity case lézard beige — une étude
              plus douce de texture, de savoir-faire et de rituel prêt à voyager.
            </p>
          </div>
        </div>
      </section>

      {/* The collection — two product cards */}
      <section
        className="bg-background px-6 md:px-10"
        style={{ paddingBlock: "clamp(60px, 8vw, 120px)" }}
      >
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
              Une déclaration plus douce
            </h2>
            <p
              className="mt-5 text-muted-foreground"
              style={{ fontSize: "15px", lineHeight: 1.7 }}
            >
              Une paire limitée de vanity cases en cuir gaufré lézard, déclinées
              en rose pétale et beige chaud pour des rituels qui voyagent avec élégance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <LizardProductCard product={lizardProduct} color="Rose" bgColor={LIZARD_PINK} />
            <LizardProductCard product={lizardProduct} color="Beige" bgColor={LIZARD_BEIGE} />
          </div>
        </div>
      </section>
    </>
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
          <span>Stock limité disponible</span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <Star className="w-3 h-3 fill-foreground text-foreground" aria-hidden />
          <span>4,9 étoiles</span>
        </div>
      </div>
    </Link>
  );
}
