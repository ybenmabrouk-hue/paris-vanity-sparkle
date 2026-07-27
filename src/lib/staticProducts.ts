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
  category: "vanity-case" | "brush";
  categoryLabel: string;
  categoryHref: "/vanity-cases" | "/brushes";
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
    colors: ["Black", "Beige", "Brown", "Pink", "Burgundy"],
    images: [
      { url: "", altText: "Vanity case — black", color: "Black" },
      { url: "", altText: "Vanity case — beige", color: "Beige" },
      { url: "", altText: "Vanity case — brown", color: "Brown" },
      { url: "", altText: "Vanity case — pink", color: "Pink" },
      { url: "", altText: "Vanity case — burgundy", color: "Burgundy" },
    ],
    variants: [
      { id: "vc-black", title: "Black", color: "Black", price: usd("70.00"), availableForSale: true },
      { id: "vc-beige", title: "Beige", color: "Beige", price: usd("70.00"), availableForSale: true },
      { id: "vc-brown", title: "Brown", color: "Brown", price: usd("70.00"), availableForSale: true },
      { id: "vc-pink", title: "Pink", color: "Pink", price: usd("70.00"), availableForSale: true },
      { id: "vc-burgundy", title: "Burgundy", color: "Burgundy", price: usd("70.00"), availableForSale: false },
    ],
  },
  brush: {
    handle: "brush",
    title: "The Brush",
    subtitle: "Brush / signature",
    description:
      "A signature Dahlia brush, designed for precision and made to last. Soft bristles and a hand-finished handle, shaped to pair seamlessly with the Dahlia ritual.\n\nUse for face, eyes or detail work.",
    category: "brush",
    categoryLabel: "Brushes",
    categoryHref: "/brushes",
    colorOptionName: "Finish",
    colors: ["Black", "Beige", "Brown"],
    images: [
      { url: "", altText: "Brush — black", color: "Black" },
      { url: "", altText: "Brush — beige", color: "Beige" },
      { url: "", altText: "Brush — brown", color: "Brown" },
    ],
    variants: [
      { id: "br-black", title: "Black", color: "Black", price: usd("38.00"), availableForSale: true },
      { id: "br-beige", title: "Beige", color: "Beige", price: usd("38.00"), availableForSale: true },
      { id: "br-brown", title: "Brown", color: "Brown", price: usd("38.00"), availableForSale: false },
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
