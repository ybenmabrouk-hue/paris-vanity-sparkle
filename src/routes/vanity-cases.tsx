import { createFileRoute } from "@tanstack/react-router";
import { STATIC_PRODUCTS } from "@/lib/staticProducts";
import { StaticProductCard } from "@/components/site/StaticProductCard";

export const Route = createFileRoute("/vanity-cases")({
  head: () => ({
    meta: [
      { title: "Vanity Cases — Dahlia" },
      { name: "description", content: "Vanity cases Dahlia — façonnés par un regard parisien et fabriqués à la main." },
      { property: "og:title", content: "Vanity Cases — Dahlia" },
      { property: "og:description", content: "Vanity cases Dahlia — façonnés par un regard parisien et fabriqués à la main." },
    ],
  }),
  component: VanityCasesPage,
});

function VanityCasesPage() {
  const products = [STATIC_PRODUCTS["vanity-case"]];


  return (
    <div>
      <header
        className="px-6 md:px-10 text-center md:text-left"
        style={{ paddingBlockStart: "clamp(45px, 7vw, 96px)", paddingBlockEnd: "clamp(30px, 4vw, 56px)" }}
      >
        <div className="max-w-[1600px] mx-auto">
          <h1
            className="font-garamond text-black tracking-tight"
            style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, letterSpacing: "0.01em", lineHeight: "1.05" }}
          >
            Vanity Cases
          </h1>
          <p
            className="mt-3 max-w-2xl mx-auto md:mx-0 text-muted-foreground"
            style={{ fontSize: "clamp(12px, 1vw, 15px)", lineHeight: "clamp(15px, 1.6vw, 22px)" }}
          >
            La collection commence dans notre atelier. Façonnée par un regard
            parisien et travaillée selon un savoir-faire moderne du cuir,
            chaque pièce est conçue pour accueillir les petits rituels qui
            vous accompagnent.
          </p>
        </div>
      </header>

      <section
        className="px-6 md:px-10"
        style={{ paddingBlockEnd: "clamp(52px, 10vw, 140px)" }}
      >
        <div className="max-w-[1600px] mx-auto">
          <div
            className="grid grid-cols-2 md:grid-cols-3"
            style={{ columnGap: "24px", rowGap: "clamp(32px, 4vw, 64px)" }}
          >
            {products.map((p) => (
              <StaticProductCard key={p.handle} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
