import stopDiggingVideo from "@/assets/stop-digging.mp4.asset.json";

/**
 * Reassurance + storytelling section.
 * Left: title + copy (with breathing room from the edge).
 * Right: stop digging video, scaled down and centered.
 */
export function StopDigging() {
  return (
    <section className="mt-16 md:mt-24 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,38%)] items-stretch gap-10 md:gap-0">
        {/* Left — copy */}
        <div className="flex items-center px-6 md:pl-[6vw] md:pr-10 py-10 md:py-0">
          <div className="max-w-[440px]">
            <h2
              className="font-garamond text-foreground leading-[0.95] tracking-[-0.01em]"
              style={{ fontSize: "clamp(56px, 8vw, 120px)" }}
            >
              Stop
              <br />
              Digging.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-foreground/75 max-w-[380px]">
              No more rummaging through a bottomless pouch for the one lipstick
              you actually need. Every piece has its place — brushes upright,
              skincare visible, essentials within reach.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/75 max-w-[380px]">
              Designed in Paris, built to end the daily search.
            </p>
          </div>
        </div>

        {/* Right — stop digging video, scaled down and centered */}
        <div className="flex items-center justify-center w-full h-full bg-muted p-6 md:p-10 lg:p-14 overflow-hidden">
          <video
            src={stopDiggingVideo.url}
            autoPlay
            muted
            loop
            playsInline
            className="max-h-[360px] md:max-h-[420px] w-auto max-w-full object-contain rounded-[2px]"
            aria-label="Hand digging through a makeup pouch"
          />
        </div>
      </div>
    </section>
  );
}
