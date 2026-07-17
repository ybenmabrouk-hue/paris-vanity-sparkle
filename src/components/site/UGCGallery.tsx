import { Play } from "lucide-react";

// UGC video sources — replace src with uploaded video URLs (e.g. Lovable Asset CDN)
type UGC = { src?: string; poster?: string; handle?: string };

const UGC_VIDEOS: UGC[] = [
  { handle: "@dahlia" },
  { handle: "@dahlia" },
  { handle: "@dahlia" },
  { handle: "@dahlia" },
  { handle: "@dahlia" },
];

export function UGCGallery() {
  return (
    <section className="w-full bg-background py-14 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2
          className="font-sans text-center mb-6 md:mb-8 text-black font-bold"
          style={{
            fontSize: "clamp(18px, 2.2vw, 28px)",
            letterSpacing: "0.04em",
            lineHeight: 1.1,
          }}
        >
          the dahlia vanity case &amp; you
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {UGC_VIDEOS.map((v, i) => (
            <div
              key={i}
              className="relative aspect-[9/16] overflow-hidden rounded-sm bg-muted group"
            >
              {v.src ? (
                <video
                  src={v.src}
                  poster={v.poster}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  autoPlay
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-foreground/40">
                  <Play className="w-8 h-8" strokeWidth={1.25} />
                  <span className="text-[11px] tracking-[0.14em]">
                    video {i + 1}
                  </span>
                </div>
              )}
              {v.handle && (
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white/95 drop-shadow">
                  <span className="italic">{v.handle}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
