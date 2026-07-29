import { ImageSlot } from "./ImageSlot";

/**
 * Craftsmanship storytelling section.
 * Left: two photos side-by-side, touching, flush to the left edge.
 * Right: title + copy (with breathing room from the edge).
 */
export function TimelessPiece() {
  return (
    <section className="mt-16 md:mt-24 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,58%)_minmax(0,1fr)] items-stretch gap-10 md:gap-0">
        {/* Left — two photos touching, flush to the left edge */}
        <div className="flex w-full h-full">
          <div className="flex-1 aspect-[3/4] md:aspect-auto bg-muted overflow-hidden">
            <ImageSlot
              label="Image — vanity case craftsmanship detail"
              className="h-full w-full"
              caption="Image — craftsmanship detail"
            />
          </div>
          <div className="flex-1 aspect-[3/4] md:aspect-auto bg-muted overflow-hidden">
            <ImageSlot
              label="Image — vegan leather material close-up"
              className="h-full w-full"
              caption="Image — vegan leather"
            />
          </div>
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
