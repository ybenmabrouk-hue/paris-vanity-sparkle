import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "What fits inside the vanity case?",
    answer:
      "The case is designed to hold your full beauty routine including foundation, powders, skincare, brushes and daily essentials while still remaining compact and elegant. Everything fits without feeling bulky.",
  },
  {
    question: "Does the case keep its shape even when full?",
    answer:
      "Yes. The structured silhouette is engineered to stay perfectly in shape whether it is on your vanity, inside your handbag or in your suitcase. No collapsing. No bending.",
  },
  {
    question: "Is the inside easy to clean?",
    answer:
      "Absolutely. The vanity case features an innovative easy clean lining that allows you to wipe away makeup residue or spills effortlessly. It is designed for real everyday use.",
  },
  {
    question: "How do the removable compartments work?",
    answer:
      "The interior includes removable dividers so you can customize the space to match your routine. Keep brushes separate, organize skincare or create one large open compartment. The case adapts to you.",
  },
  {
    question: "Is the zipper secure and high quality?",
    answer:
      "Yes. The premium zipper is smooth, durable and designed to stay securely closed, protecting your essentials whether at home or on the go.",
  },
  {
    question: "What if it is not right for me?",
    answer:
      "You can return the case within 14 days of delivery as long as it is unused and in its original condition.",
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
