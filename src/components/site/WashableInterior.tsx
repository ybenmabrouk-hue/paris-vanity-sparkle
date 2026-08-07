import eraseTheTracesVideo from "@/assets/erase-the-traces.mp4.asset.json";

/**
 * Reassurance section: the washable interior.
 * Left: video showing the interior being wiped clean.
 * Right: title + copy (with breathing room from the edge).
 */
export function WashableInterior() {
  return (
    <section className="mt-16 md:mt-24 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,50%)_minmax(0,1fr)] items-stretch gap-10 md:gap-0">
        {/* Left — video */}
        <div className="flex items-center justify-center w-full h-full min-h-[400px] md:min-h-[600px] bg-muted p-4 md:p-8 overflow-hidden">
          <video
            src={eraseTheTracesVideo.url}
            autoPlay
            muted
            loop
            playsInline
            className="max-h-[320px] md:max-h-[540px] w-auto max-w-full object-contain rounded-[2px]"
            aria-label="Intérieur lavable nettoyé avec un mouchoir et de l'eau"
          />
        </div>

        {/* Right — copy */}
        <div className="flex items-center px-6 md:pl-12 md:pr-[6vw] py-10 md:py-0 md:justify-end">
          <div className="max-w-[440px]">
            <h2
              className="font-garamond text-foreground leading-[1.05] tracking-[0.01em]"
              style={{ fontSize: "clamp(48px, 6vw, 96px)" }}
            >
              Effacez les
              <br />
              Traces.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-foreground/75 max-w-[380px]">
              Traces de maquillage, coulures de fond de teint, résidus de
              poudre ? Ils s'effacent en quelques secondes. La doublure
              intérieure est entièrement lavable avec un simple mouchoir et de
              l'eau — sans tache, sans trace, sans stress.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/75 max-w-[380px]">
              Pensé pour rester aussi propre que le jour où vous l'avez ouvert.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
