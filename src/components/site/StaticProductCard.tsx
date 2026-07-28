import { Link } from "@tanstack/react-router";
import { formatPrice, type StaticProduct } from "@/lib/staticProducts";
import { ImageSlot } from "@/components/site/ImageSlot";

const COLOR_SWATCHES: Record<string, string> = {
  black: "#111111",
  beige: "#d9c6a5",
  brown: "#6b4a2b",
  pink: "#e8b5c0",
  burgundy: "#6b1f2b",
};

function swatchColor(value: string): string {
  return COLOR_SWATCHES[value.toLowerCase()] ?? "#cccccc";
}

export function StaticProductCard({ product }: { product: StaticProduct }) {
  const img1 = product.images[0];
  const img2 = product.images[1] ?? img1;
  const price = product.variants[0]?.price ?? { amount: "0", currencyCode: "USD" };

  return (
    <Link
      to="/product/$handle"
      params={{ handle: product.handle }}
      className="group block"
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-muted">
        {img1?.url ? (
          <>
            <img
              src={img1.url}
              alt={img1.altText ?? product.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
            {img2?.url && (
              <img
                src={img2.url}
                alt={img2.altText ?? product.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <ImageSlot
            label={`${product.title} — product image`}
            caption="Product image"
            className="absolute inset-0 border-0"
          />
        )}
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
        <div className="flex flex-wrap gap-2 mt-3">
          {product.colors.map((color) => (
            <span
              key={color}
              aria-label={color}
              title={color}
              className="inline-block rounded-full border border-foreground/20"
              style={{ width: "14px", height: "14px", backgroundColor: swatchColor(color) }}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
