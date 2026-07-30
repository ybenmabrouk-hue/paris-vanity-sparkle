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
      "Shaped by a Parisian eye and crafted through modern leatherwork, the Dahlia vanity case is designed to hold the small rituals that travel with you.\n\nSpacious enough for makeup, skincare and toiletries, with a washable interior and a signature handle.",
    category: "vanity-case",
    categoryLabel: "Vanity Cases",
    categoryHref: "/vanity-cases",
    colorOptionName: "Colour",
    colors: ["Black", "Espresso", "Burgundy"],
    images: [
      { url: "", altText: "Vanity case — black", color: "Black" },
      { url: "", altText: "Vanity case — espresso", color: "Espresso" },
      { url: "", altText: "Vanity case — burgundy", color: "Burgundy" },
    ],
    variants: [
      { id: "vc-black", title: "Black", color: "Black", price: usd("70.00"), availableForSale: true },
      { id: "vc-espresso", title: "Espresso", color: "Espresso", price: usd("70.00"), availableForSale: true },
      { id: "vc-burgundy", title: "Burgundy", color: "Burgundy", price: usd("70.00"), availableForSale: false },
    ],
  },
  "vanity-case-lizard": {
    handle: "vanity-case-lizard",
    title: "The Vanity Case — Lizard",
    subtitle: "Vanity case / lizard leather",
    description:
      "The same Parisian silhouette, cut in lizard-embossed leather. Beige and Rose are crafted exclusively in this finish — a fine, sculpted grain that catches the light differently at every angle.\n\nSpacious enough for makeup, skincare and toiletries, with a washable interior and a signature handle.",
    category: "vanity-case",
    categoryLabel: "Vanity Cases",
    categoryHref: "/vanity-cases",
    colorOptionName: "Colour",
    colors: ["Beige", "Rose"],
    images: [
      { url: "", altText: "Lizard vanity case — beige", color: "Beige" },
      { url: "", altText: "Lizard vanity case — rose", color: "Rose" },
    ],
    variants: [
      { id: "vcl-beige", title: "Beige", color: "Beige", price: usd("85.00"), availableForSale: true },
      { id: "vcl-rose", title: "Rose", color: "Rose", price: usd("85.00"), availableForSale: true },
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
