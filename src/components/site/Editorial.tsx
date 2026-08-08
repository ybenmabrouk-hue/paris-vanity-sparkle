import { ImageSlot } from "@/components/site/ImageSlot";

export function Editorial() {
  return (
    <section className="bg-white">
      {/* Intro */}
      <div
        className="px-6 md:px-10"
        style={{ paddingBlock: "clamp(45px, 8vw, 90px)" }}
      >
        <div className="max-w-[1200px] mx-auto text-center">
          <p
            className="text-[11px] md:text-[12px] uppercase text-muted-foreground"
            style={{ letterSpacing: "0.24em" }}
          >
            Un éditorial — Hôtel Balzac, Paris
          </p>
          <h2
            className="font-garamond text-black mt-4"
            style={{
              fontWeight: 300,
              letterSpacing: "0.01em",
              fontSize: "clamp(36px, 5.5vw, 64px)",
              lineHeight: 1.05,
            }}
          >
            Une chambre, un rituel, une vanity case
          </h2>
          <p
            className="mx-auto mt-5 text-muted-foreground"
            style={{
              maxWidth: "38rem",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            Photographiée dans les suites paisibles de l'Hôtel Balzac, Dahlia est saisie
            telle qu'elle est vécue — entre lumière du matin, coiffeuse en marbre et
            les petits gestes qui font qu'un lieu devient le vôtre.
          </p>
        </div>
      </div>

      {/* Chapter 1 — Beauty routine elevation */}
      <div className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 text-center md:text-left" style={{ paddingBlock: "clamp(45px, 6vw, 70px)" }}>
          <p
            className="text-[11px] md:text-[12px] uppercase text-muted-foreground"
            style={{ letterSpacing: "0.24em" }}
          >
            Chapitre I — Le rituel
          </p>
          <h3
            className="font-garamond text-black mt-4"
            style={{
              fontWeight: 300,
              letterSpacing: "0.01em",
              fontSize: "clamp(30px, 4vw, 48px)",
              lineHeight: 1.1,
            }}
          >
            Un rituel beauté sublimé
          </h3>
          <p
            className="mt-5 text-muted-foreground max-w-[38rem]"
            style={{ fontSize: "15px", lineHeight: 1.7 }}
          >
            Des sérums alignés sur le marbre. Un pinceau posé avec intention. La
            vanity case devient l'objet autour duquel le moment se construit —
            transformant une routine en un rituel que l'on attend avec impatience, où que
            l'on se réveille.
          </p>
        </div>
        <div className="grid grid-cols-2">
          <ImageSlot
            label="Chapitre I — un désordre de produits de beauté avant le rituel"
            caption="Avant — le désordre"
            className="w-full aspect-[3/4] md:aspect-auto md:min-h-[640px] border-0"
          />
          <ImageSlot
            label="Chapitre I — un mannequin se préparant avec la vanity case Dahlia"
            caption="Après — le rituel"
            className="w-full aspect-[3/4] md:aspect-auto md:min-h-[640px] border-0"
          />
        </div>
      </div>

      {/* Chapter I — supporting duo (sept fragrances style, touching) */}
      <div className="grid grid-cols-2">
        <ImageSlot
          label="Chapitre I — image éditoriale complémentaire 1"
          caption="Hôtel Balzac"
          className="w-full aspect-[4/5] border-0"
        />
        <ImageSlot
          label="Chapitre I — image éditoriale complémentaire 2"
          caption="Hôtel Balzac"
          className="w-full aspect-[4/5] border-0"
        />
      </div>

      <div className="w-full aspect-[16/9] md:aspect-[21/9]">
        <ImageSlot
          label="Hôtel Balzac — éditorial pleine page (2400×1030)"
          caption="Hôtel Balzac"
          className="w-full h-full border-0"
        />
      </div>
    </section>
  );
}
