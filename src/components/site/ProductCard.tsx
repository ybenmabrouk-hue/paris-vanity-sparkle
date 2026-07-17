import { Link } from "@tanstack/react-router";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { ImageSlot } from "@/components/site/ImageSlot";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const p = product.node;
  const img1 = p.images.edges[0]?.node;
  const img2 = p.images.edges[1]?.node ?? img1;
  const price = p.priceRange.minVariantPrice;

  return (
    <Link
      to="/product/$handle"
      params={{ handle: p.handle }}
      className="group block"
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-muted">
        {img1 ? (
          <>
            <img
              src={img1.url}
              alt={img1.altText ?? p.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
            {img2 && (
              <img
                src={img2.url}
                alt={img2.altText ?? p.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <ImageSlot
            label={`${p.title} — product image`}
            caption="Product image"
            className="absolute inset-0 border-0"
          />
        )}
      </div>
      <div
        className="flex justify-between items-start gap-1"
        style={{ marginTop: "20px" }}
      >
        <div style={{ fontSize: "15px", lineHeight: "20px" }}>
          {p.title}
          <br />
          <span className="text-muted-foreground" style={{ fontSize: "13px" }}>
            vanity case / petit
          </span>
        </div>
        <div
          className="text-muted-foreground whitespace-nowrap"
          style={{ fontSize: "14px", lineHeight: "20px" }}
        >
          {formatPrice(price.amount, price.currencyCode)}
        </div>
      </div>
    </Link>
  );
}
