import { cn } from "@/lib/utils";

/**
 * Accessible empty video slot used until real footage is provided.
 */
export function VideoSlot({
  label,
  className,
  caption,
}: {
  label: string;
  className?: string;
  caption?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex items-center justify-center bg-muted text-muted-foreground",
        "border border-dashed border-border",
        className,
      )}
    >
      <span className="eyebrow text-xs px-4 text-center">
        {caption ?? "vidéo à venir"}
      </span>
    </div>
  );
}
