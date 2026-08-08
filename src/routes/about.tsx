import { createFileRoute } from "@tanstack/react-router";
import { ImageSlot } from "@/components/site/ImageSlot";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À propos de Dahlia — Vanity cases imaginées à Paris" },
      {
        name: "description",
        content:
          "Dahlia est un atelier parisien qui façonne des vanity cases pour les rituels beauté, chez soi comme en voyage — petites séries, intérieurs pensés, silhouettes intemporelles.",
      },
      { property: "og:title", content: "À propos de Dahlia — Vanity cases imaginées à Paris" },
      {
        property: "og:description",
        content:
          "L'histoire de Dahlia : un atelier parisien qui dessine des vanity cases au plus près de la réalité des rituels beauté.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="bg-white">
      {/* Chapter — About Dahlia (image left, text right) */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-stretch">
        <div className="w-full">
          <ImageSlot
            label="Atelier Dahlia — vanity case photographiée à Paris"
            caption="Atelier — Paris"
            className="w-full aspect-[5/6] border-0"
          />
        </div>

        <div className="flex items-center px-6 md:px-[6vw] py-14 md:py-0">
          <div className="max-w-[34rem]">
            <h1
              className="font-garamond text-black"
              style={{
                fontWeight: 300,
                letterSpacing: "0.01em",
                fontSize: "clamp(36px, 5vw, 60px)",
                lineHeight: 1.05,
              }}
            >
              À propos de Dahlia
            </h1>
            <div className="mt-6 space-y-5 text-muted-foreground" style={{ fontSize: "15px", lineHeight: 1.75 }}>
              <p>
                Dahlia est un atelier parisien qui dessine des vanity cases au
                plus près de la réalité des rituels beauté — entre une étagère
                de salle de bain, un plan de marbre d'hôtel et une valise
                fermée à la hâte.
              </p>
              <p>
                Née d'une frustration simple — fouiller sans fin dans une
                vanity case sans fond — chaque vanity case est pensée autour d'un
                intérieur réfléchi : pinceaux debout, soins visibles,
                essentiels à portée de main.
              </p>
              <p>
                Nous travaillons en petites séries, dans un cuir végan choisi
                pour son grain souple et sa résistance à l'usage quotidien,
                avec une doublure lavable qui garde l'intérieur aussi propre
                qu'au premier jour.
              </p>
              <p>
                Imaginée à Paris. Façonnée à la main. Faite pour voyager, et
                pour durer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Burgundy quote band — brand identity */}
      <section style={{ backgroundColor: "#320F13" }}>
        <div
          className="mx-auto max-w-[42.5rem] px-6 text-center"
          style={{ paddingBlock: "clamp(2.5rem, 6vw, 4rem)" }}
        >
          <p
            className="font-garamond"
            style={{
              color: "#EDC7C7",
              fontWeight: 300,
              letterSpacing: "0.01em",
              fontSize: "clamp(26px, 3.4vw, 40px)",
              lineHeight: 1.2,
            }}
          >
            Une routine devient un rituel quand chaque chose a sa place
          </p>
        </div>
      </section>

      {/* Chapter — Founder (text left, image right) */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-stretch">
        <div className="flex items-center px-6 md:px-[6vw] py-14 md:py-0 order-2 md:order-1">
          <div className="max-w-[34rem]">
            <p
              className="text-[11px] md:text-[12px] uppercase text-muted-foreground"
              style={{ letterSpacing: "0.24em" }}
            >
              La fondatrice
            </p>
            <h2
              className="font-garamond text-black mt-4"
              style={{
                fontWeight: 300,
                letterSpacing: "0.01em",
                fontSize: "clamp(30px, 4vw, 48px)",
                lineHeight: 1.1,
              }}
            >
              Un regard parisien, des habitudes de voyageuse
            </h2>
            <div className="mt-6 space-y-5 text-muted-foreground" style={{ fontSize: "15px", lineHeight: 1.75 }}>
              <p>
                Dahlia est née entre deux valises — d'un amour du savoir-faire
                français et d'une vie passée à se déplacer entre villes,
                hôtels et vols matinaux.
              </p>
              <p>
                Chaque détail est décidé comme on compose une garde-robe :
                sans bruit, avec intention. Une silhouette épurée, une poignée
                signature, rien de décoratif et rien de jetable.
              </p>
              <p>
                Le nom est un clin d'œil à la fleur — pétales structurés,
                volume généreux, et une élégance qui ne cherche jamais à se
                faire remarquer.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full order-1 md:order-2">
          <ImageSlot
            label="Portrait de la fondatrice de Dahlia — photographié à Paris"
            caption="Portrait — Paris"
            className="w-full aspect-[5/6] border-0"
          />
        </div>
      </section>

      {/* Values — petale band */}
      <section style={{ backgroundColor: "#EDC7C7" }}>
        <div
          className="mx-auto max-w-[1200px] px-6 md:px-10"
          style={{ paddingBlock: "clamp(2.5rem, 6vw, 4rem)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {[
              {
                title: "Fabriquée en petites séries",
                copy: "Coupée et finie à la main, en séries limitées — pour que chaque vanity case reçoive l'attention qu'elle mérite.",
              },
              {
                title: "Pensée pour durer",
                copy: "Une silhouette intemporelle en cuir végan souple, choisi pour bien vieillir à l'usage quotidien.",
              },
              {
                title: "Pensée pour de vraies routines",
                copy: "Un intérieur lavable et une organisation pensée pour accueillir pinceaux, soins et accessoires ensemble.",
              },
            ].map((v) => (
              <div key={v.title}>
                <h3
                  className="font-garamond text-black"
                  style={{
                    fontWeight: 300,
                    letterSpacing: "0.01em",
                    fontSize: "clamp(24px, 2.6vw, 32px)",
                    lineHeight: 1.1,
                  }}
                >
                  {v.title}
                </h3>
                <p className="mt-3 text-black/70" style={{ fontSize: "15px", lineHeight: 1.7 }}>
                  {v.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-bleed closing image */}
      <div className="w-full aspect-[16/9] md:aspect-[21/9]">
        <ImageSlot
          label="Dahlia — image éditoriale de clôture pleine page"
          caption="Dahlia — Paris"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
