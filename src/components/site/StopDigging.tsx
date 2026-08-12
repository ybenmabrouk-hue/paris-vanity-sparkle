import stopDiggingVideo from "@/assets/stop-digging.mp4.asset.json";

/**
 * Reassurance + storytelling section.
 * Left: title + copy (with breathing room from the edge).
 * Right: stop digging video, scaled down and centered.
 */
export function StopDigging() {
  return (
    <section className="mt-16 md:mt-24 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,50%)] items-stretch gap-10 md:gap-0">
        {/* Left — copy */}
        <div className="flex items-center px-6 md:pl-[6vw] md:pr-10 py-10 md:py-0">
          <div className="max-w-[440px]">
            <h2
              className="font-garamond text-foreground leading-[0.95] tracking-[-0.01em]"
              style={{ fontSize: "clamp(56px, 8vw, 120px)" }}
            >
              Tout
              <br />
              à portée de main.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-foreground/75 max-w-[380px]">
              Fini de fouiller dans une vanity case sans fond pour trouver le seul
              rouge à lèvres dont vous avez besoin. Chaque objet a sa place —
              pinceaux debout, soins visibles, essentiels à portée de main.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/75 max-w-[380px]">
              Conçu à Paris, pensé pour mettre fin à la recherche quotidienne.
            </p>
          </div>
        </div>

        {/* Right — stop digging video, scaled down and centered */}
        <div className="flex items-center justify-center w-full h-full min-h-[400px] md:min-h-[600px] bg-muted p-4 md:p-8 overflow-hidden">
          <video
            src={stopDiggingVideo.url}
            autoPlay
            muted
            loop
            playsInline
            className="max-h-[320px] md:max-h-[540px] w-auto max-w-full object-contain rounded-[2px]"
            aria-label="Main fouillant dans une vanity case de maquillage"
          />
        </div>
      </div>
    </section>
  );
}
