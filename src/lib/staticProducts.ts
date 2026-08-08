/**
 * Static product catalog used for design purposes only.
 * The developer will replace this with a real backend integration later.
 */

export interface StaticVariant {
  id: string;
  title: string;
  color: string;
  price: { amount: string; currencyCode: string };
  availableForSale: boolean;
}

export interface StaticProduct {
  handle: string;
  title: string;
  subtitle: string;
  description: string;
  category: "vanity-case";
  categoryLabel: string;
  categoryHref: "/vanity-cases";
  images: { url: string; altText: string; color?: string }[];
  colorOptionName: string;
  colors: string[];
  variants: StaticVariant[];
}

const usd = (amount: string) => ({ amount, currencyCode: "USD" });

export const STATIC_PRODUCTS: Record<string, StaticProduct> = {
  "vanity-case": {
    handle: "vanity-case",
    title: "The Vanity Case",
    subtitle: "Vanity case / petit",
    description:
      "Façonné par un regard parisien et travaillé selon un savoir-faire moderne du cuir, le vanity case Dahlia est conçu pour accueillir les petits rituels qui vous accompagnent.\n\nDisponible en cuir lisse (Noir, Expresso, Bordeaux) et en édition Lizard, un cuir gaufré façon lézard (Beige, Rose).\n\nSuffisamment spacieux pour le maquillage, les soins et les produits de toilette, avec un intérieur lavable et une poignée signature.",
    category: "vanity-case",
    categoryLabel: "Vanity Cases",
    categoryHref: "/vanity-cases",
    colorOptionName: "Couleur",
    colors: ["Noir", "Expresso", "Bordeaux", "Beige", "Rose"],
    images: [
      { url: "", altText: "Vanity case — noir", color: "Noir" },
      { url: "", altText: "Vanity case — expresso", color: "Expresso" },
      { url: "", altText: "Vanity case — bordeaux", color: "Bordeaux" },
      { url: "", altText: "Vanity case lizard — beige", color: "Beige" },
      { url: "", altText: "Vanity case lizard — rose", color: "Rose" },
    ],
    variants: [
      { id: "vc-black", title: "Noir", color: "Noir", price: usd("70.00"), availableForSale: true },
      { id: "vc-espresso", title: "Expresso", color: "Expresso", price: usd("70.00"), availableForSale: true },
      { id: "vc-burgundy", title: "Bordeaux", color: "Bordeaux", price: usd("70.00"), availableForSale: false },
      { id: "vc-beige", title: "Beige — Lizard", color: "Beige", price: usd("85.00"), availableForSale: true },
      { id: "vc-rose", title: "Rose — Lizard", color: "Rose", price: usd("85.00"), availableForSale: true },
    ],
  },
};

export function getStaticProduct(handle: string): StaticProduct | null {
  return STATIC_PRODUCTS[handle] ?? null;
}

export function formatPrice(amount: string | number, currencyCode: string) {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(num);
  } catch {
    return `${currencyCode} ${num.toFixed(2)}`;
  }
}
