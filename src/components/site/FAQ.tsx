import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "Que peut contenir la trousse de toilette ?",
    answer:
      "La trousse est conçue pour accueillir toute votre routine beauté, fond de teint, poudres, soins, pinceaux et essentiels du quotidien, tout en restant compacte et élégante. Tout trouve sa place sans encombrement.",
  },
  {
    question: "La trousse garde-t-elle sa forme même une fois remplie ?",
    answer:
      "Oui. La silhouette structurée est conçue pour conserver parfaitement sa forme, que ce soit sur votre coiffeuse, dans votre sac ou dans votre valise. Aucun affaissement. Aucune déformation.",
  },
  {
    question: "L'intérieur est-il facile à nettoyer ?",
    answer:
      "Absolument. La trousse est dotée d'une doublure innovante facile à nettoyer, permettant d'essuyer résidus de maquillage ou éclaboussures sans effort. Elle est pensée pour un usage vraiment quotidien.",
  },
  {
    question: "Comment fonctionnent les compartiments amovibles ?",
    answer:
      "L'intérieur comprend des séparateurs amovibles permettant de personnaliser l'espace selon votre routine. Séparez vos pinceaux, organisez vos soins ou créez un grand compartiment ouvert. La trousse s'adapte à vous.",
  },
  {
    question: "La fermeture éclair est-elle sûre et de qualité ?",
    answer:
      "Oui. La fermeture éclair haut de gamme est fluide, durable et conçue pour rester bien fermée, protégeant vos essentiels à la maison comme en déplacement.",
  },
  {
    question: "Et si elle ne me convient pas ?",
    answer:
      "Vous pouvez retourner la trousse dans les 14 jours suivant la livraison, à condition qu'elle soit inutilisée et dans son état d'origine.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="w-full bg-white px-6 md:px-12 lg:px-20 py-16 md:py-24">
      <div className="max-w-[1000px] mx-auto">
        <h2 className="font-garamond italic text-3xl md:text-4xl lg:text-[42px] leading-[1.05] tracking-[0.01em] text-foreground mb-10 md:mb-14">
          FAQ
        </h2>

        <div className="flex flex-col gap-3">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#f8f8f8] rounded-sm overflow-hidden"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-5 py-5 md:px-7 md:py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-[15px] md:text-[16px] leading-[1.35] tracking-[0.01em] text-foreground pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`shrink-0 w-5 h-5 text-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 md:px-7 md:pb-6 text-[14px] md:text-[15px] leading-[1.6] tracking-[0.01em] text-foreground/80">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
