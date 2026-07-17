import { ImageSlot } from "./ImageSlot";

/**
 * Reassurance section: the washable interior.
 * Left: image of the interior being wiped clean.
 * Right: title + copy (with breathing room from the edge).
 */
export function WashableInterior() {
  return (
    <section className="mt-16 md:mt-24 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,58%)_minmax(0,1fr)] items-stretch gap-10 md:gap-0">
        {/* Left — image */}
        <div className="w-full">
          <div className="aspect-[3/4] bg-muted overflow-hidden">
            <ImageSlot
              label="image — washable interior with tissue and water"
              className="h-full w-full"
              caption="image — washable interior"
            />
          </div>
        </div>

        {/* Right — copy */}
        <div className="flex items-center px-6 md:pl-12 md:pr-[6vw] py-10 md:py-0 md:justify-end">
          <div className="max-w-[440px]">
            <h2
              className="font-sans font-light italic text-foreground leading-[1.05] tracking-[0.01em]"
              style={{ fontSize: "clamp(48px, 6vw, 96px)" }}
            >
              erase the
              <br />
              traces.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-foreground/75 max-w-[380px]">
              makeup smudges, foundation spills, and powder residue? they wipe
              away in seconds. the interior lining is fully washable with just a
              tissue and water — no stain, no trace, no stress.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/75 max-w-[380px]">
              designed to stay as clean as the day you opened it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
