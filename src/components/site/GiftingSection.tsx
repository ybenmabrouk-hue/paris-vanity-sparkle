import { ImageSlot } from "@/components/site/ImageSlot";

/**
 * Gifting storytelling section.
 * Left: title + copy (with breathing room from the edge).
 * Right: visual placeholder for gifting imagery.
 */
export function GiftingSection() {
  return (
    <section className="mt-16 md:mt-24 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,50%)] items-stretch gap-10 md:gap-0">
        {/* Left — copy */}
        <div className="flex items-center px-6 md:pl-[6vw] md:pr-10 py-10 md:py-0">
          <div className="max-w-[440px]">
            <h2
              className="font-garamond text-foreground leading-[1.05] tracking-[0.01em]"
              style={{ fontSize: "clamp(48px, 6vw, 96px)" }}
            >
              Offrez
              <br />
              en cadeau.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-foreground/75 max-w-[380px]">
              Chaque vanity case peut être accompagné d'un soin d'emballage
              cadeau pensé pour surprendre. Un geste simple, un effet immédiat.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/75 max-w-[380px]">
              Ajoutez la Boîte Gifting (+8 EUR) à la validation du panier et
              recevez votre pièce prête à offrir.
            </p>
          </div>
        </div>

        {/* Right — visual */}
        <div className="flex items-center justify-center w-full h-full min-h-[400px] md:min-h-[600px] bg-muted p-4 md:p-8 overflow-hidden">
          <ImageSlot
            label="Visuel section Gifting"
            caption="Image cadeau à ajouter"
            className="w-full h-full max-w-[440px] max-h-[540px] border-0"
          />
        </div>
      </div>
    </section>
  );
}
