import { createFileRoute } from "@tanstack/react-router";
import { LizardSections } from "@/components/site/LizardSections";
import monogrammeWhite from "@/assets/dahlia-monogramme-white.png.asset.json";

export const Route = createFileRoute("/lizard")({
  head: () => ({
    meta: [
      { title: "La collection Lizard — Dahlia" },
      { name: "description", content: "Un duo limité de vanity cases en cuir végan gaufré effet lézard, décliné en rose pétale et beige chaud." },
      { property: "og:title", content: "La collection Lizard — Dahlia" },
      { property: "og:description", content: "Un duo limité de vanity cases en cuir végan gaufré effet lézard, décliné en rose pétale et beige chaud." },
    ],
  }),
  component: LizardPage,
});

function LizardPage() {
  return (
    <div>
      {/* Hero banner */}
      <section
        className="bg-petale text-burgundy"
        style={{
          paddingBlockStart: "calc(clamp(2.5rem, 2.0122rem + 2.0813vw, 4rem) + 1.5625rem)",
          paddingBlockEnd: "clamp(2.5rem, 2.0122rem + 2.0813vw, 4rem)",
        }}
      >
        <div
          className="mx-auto text-center"
          style={{
            maxWidth: "55rem",
            paddingInline: "clamp(1.25rem, 0.6707rem + 2.4390vw, 3rem)",
          }}
        >
          <img
            src={monogrammeWhite.url}
            alt=""
            aria-hidden
            className="block mx-auto"
            style={{
              width: "clamp(100px, 16vw, 220px)",
              height: "auto",
            }}
          />
          <h1
            className="font-garamond"
            style={{
              fontWeight: 300,
              letterSpacing: "0.01em",
              marginBlockStart: "1.25rem",
              fontSize: "clamp(36px, 5.5vw, 64px)",
              lineHeight: 1.05,
            }}
          >
            Un brin sauvage, joliment tenu
          </h1>
          <p
            style={{
              marginBlockStart: "1.25rem",
              fontSize: "1rem",
              lineHeight: 1.6,
            }}
          >
            Le cuir gaufré effet lézard apporte une touche subtile au rituel
            Dahlia — une finition texturée, faite pour l'étagère, la valise,
            et tout ce qui se trouve entre les deux.
          </p>
        </div>
      </section>

      <LizardSections />
    </div>
  );
}
