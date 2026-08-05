import { cn } from "@/lib/utils";

/**
 * Accessible empty image slot used until real photography is provided.
 * Renders a styled placeholder with a descriptive label announced to
 * assistive tech via role="img" + aria-label.
 */
export function ImageSlot({
  label,
  className,
  caption,
  style,
}: {
  label: string;
  className?: string;
  caption?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      style={style}
      className={cn(
        "flex items-center justify-center bg-muted text-muted-foreground",
        "border border-dashed border-border",
        className,
      )}
    >
      <span className="eyebrow text-xs px-4 text-center">
        {caption ?? "image coming soon"}
      </span>
    </div>
  );
}
