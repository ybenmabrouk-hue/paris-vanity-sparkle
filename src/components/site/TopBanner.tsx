import { useBannerStore } from "@/stores/bannerStore";

export function TopBanner() {
  const color = useBannerStore((s) => s.color);
  const textColor = useBannerStore((s) => s.textColor);
  return (
    <div
      className="w-full text-center py-2.5 text-[12px] tracking-[0.08em] transition-colors duration-500"
      style={{
        backgroundColor: color ?? "#EDC7C7",
        color: textColor ?? "#1a1a1a",
      }}
    >
      Worldwide Delivery
    </div>
  );
}
