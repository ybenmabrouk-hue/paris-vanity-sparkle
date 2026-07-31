import { createFileRoute } from "@tanstack/react-router";
import { ImageSlot } from "@/components/site/ImageSlot";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Dahlia — Vanity Cases Imagined in Paris" },
      {
        name: "description",
        content:
          "Dahlia is a Paris atelier crafting vanity cases for beauty rituals at home and away — small batches, considered interiors, timeless silhouettes.",
      },
      { property: "og:title", content: "About Dahlia — Vanity Cases Imagined in Paris" },
      {
        property: "og:description",
        content:
          "The story behind Dahlia: an atelier in Paris designing vanity cases for the way beauty is really lived.",
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
            label="Dahlia atelier — vanity case photographed in Paris"
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
              About Dahlia
            </h1>
            <div className="mt-6 space-y-5 text-muted-foreground" style={{ fontSize: "15px", lineHeight: 1.75 }}>
              <p>
                Dahlia is a Paris atelier designing vanity cases for the way
                beauty is really lived — between a bathroom shelf, a hotel
                marble counter, and a suitcase closed in a hurry.
              </p>
              <p>
                Founded on a simple frustration — endless digging through a
                bottomless pouch — each case is built around a considered
                interior: brushes upright, skincare visible, essentials within
                reach.
              </p>
              <p>
                We work in small batches, in vegan leather chosen for its
                supple grain and its resistance to daily use, with a washable
                lining that keeps the inside as clean as the day you opened it.
              </p>
              <p>
                Imagined in Paris. Crafted by hand. Made to travel, and to
                keep.
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
            A routine becomes a ritual when everything has its place
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
              The founder
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
              A Parisian eye, a traveller's habits
            </h2>
            <div className="mt-6 space-y-5 text-muted-foreground" style={{ fontSize: "15px", lineHeight: 1.75 }}>
              <p>
                Dahlia was born between two suitcases — from a love of French
                savoir-faire and a life spent moving between cities, hotels and
                early flights.
              </p>
              <p>
                Every detail is decided the way a wardrobe is: quietly, with
                intention. A clean silhouette, a signature handle, nothing
                decorative and nothing disposable.
              </p>
              <p>
                The name is a nod to the flower — structured petals, generous
                volume, and an elegance that never asks for attention.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full order-1 md:order-2">
          <ImageSlot
            label="Dahlia founder portrait — photographed in Paris"
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
                title: "Made in small batches",
                copy: "Cut and finished by hand, in limited runs — so each case gets the attention it deserves.",
              },
              {
                title: "Designed to last",
                copy: "A timeless silhouette in a supple vegan leather, chosen to age well with daily use.",
              },
              {
                title: "Thought for real routines",
                copy: "A washable interior and a layout built around brushes, skincare and toiletries together.",
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
          label="Dahlia — full-bleed closing editorial image"
          caption="Dahlia — Paris"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
