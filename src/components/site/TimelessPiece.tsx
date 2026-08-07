import timelessPieceVideo from "@/assets/timeless-piece.mp4.asset.json";

/**
 * Craftsmanship storytelling section.
 * Left: timeless piece video, scaled down and centered.
 * Right: title + copy (with breathing room from the edge).
 */
export function TimelessPiece() {
  return (
    <section className="mt-16 md:mt-24 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,50%)_minmax(0,1fr)] items-stretch gap-10 md:gap-0">
        {/* Left — timeless piece video, scaled down and centered */}
        <div className="flex items-center justify-center w-full h-full min-h-[400px] md:min-h-[600px] bg-muted p-4 md:p-8 overflow-hidden">
          <video
            src={timelessPieceVideo.url}
            autoPlay
            muted
            loop
            playsInline
            className="max-h-[320px] md:max-h-[540px] w-auto max-w-full object-contain rounded-[2px]"
            aria-label="Vanity case craftsmanship and vegan leather detail"
          />
        </div>

        {/* Right — copy */}
        <div className="flex items-center px-6 md:pl-12 md:pr-[6vw] py-10 md:py-0 md:justify-end">
          <div className="max-w-[440px]">
            <h2
              className="font-garamond text-foreground leading-[1.05] tracking-[0.01em]"
              style={{ fontSize: "clamp(48px, 6vw, 96px)" }}
            >
              A timeless
              <br />
              Piece.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-foreground/75 max-w-[380px]">
              A quiet silhouette, clean lines and a signature handle — designed
              to look as considered on a hotel vanity as it does in your
              suitcase. Nothing decorative, nothing disposable.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/75 max-w-[380px]">
              Cut and finished by hand in a vegan leather chosen for its supple
              grain and its resistance to daily use. Craftsmanship you feel the
              moment you pick it up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
