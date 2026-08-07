import { Star } from "lucide-react";

type ProductReviewsProps = {
  rating?: number;
  label?: string;
  className?: string;
};

export function ProductReviews({
  rating = 4.9,
  label = "étoiles",
  className = "",
}: ProductReviewsProps) {
  return (
    <div
      className={`flex items-center gap-2 text-[12px] md:text-[13px] ${className}`}
    >
      <Star
        className="w-[14px] h-[14px] fill-foreground text-foreground"
        aria-hidden
      />
      <span>
        {rating} {label}
      </span>
    </div>
  );
}
