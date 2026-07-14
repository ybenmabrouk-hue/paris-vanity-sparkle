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
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
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
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 scale-[1.02]"
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
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl leading-tight">{p.title}</h3>
          <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
            Vanity Case
          </p>
        </div>
        <div className="text-sm">{formatPrice(price.amount, price.currencyCode)}</div>
      </div>
    </Link>
  );
}
