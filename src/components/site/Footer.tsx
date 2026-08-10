import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { z } from "zod";
import { subscribeToNewsletter } from "@/lib/newsletter.functions";

const emailSchema = z.object({
  email: z.string().trim().email({ message: "Veuillez entrer une adresse e-mail valide" }).max(255),
});

export function Footer() {
  return (
    <footer className="bg-petale text-foreground">
      <div
        className="mx-auto max-w-[1600px] px-6 md:px-10"
        style={{ paddingBlockStart: "clamp(48px, 6vw, 88px)", paddingBlockEnd: "clamp(32px, 4vw, 56px)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: newsletter */}
          <div className="max-w-xl">
            <p
              className="font-sans"
              style={{ fontSize: "14px", lineHeight: "22px" }}
            >
              Inscrivez-vous pour bénéficier de 15 $ de réduction sur votre premier achat et soyez les premiers informés de tout ce qui touche à Dahlia : ventes exclusives, nouveautés, événements et plus encore. Rejoignez le cercle privé.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>

          {/* Right: link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:justify-self-end lg:pl-16 lg:border-l lg:border-foreground/20 w-full">
            <ul className="space-y-4" style={{ fontSize: "14px", lineHeight: "20px" }}>
              <li><Link to="/about" className="hover:opacity-60 transition">À propos</Link></li>
              <li><Link to="/partenariats" className="hover:opacity-60 transition">Partenariats</Link></li>
              <li><a href="#" className="hover:opacity-60 transition">Compte</a></li>
              <li><a href="mailto:hello@dahlia-paris.com" className="hover:opacity-60 transition">Contact</a></li>
              <li><a href="#" className="hover:opacity-60 transition">Avis</a></li>
            </ul>
            <ul className="space-y-4" style={{ fontSize: "14px", lineHeight: "20px" }}>
              <li><a href="#" className="hover:opacity-60 transition">Livraison et retours</a></li>
              <li><a href="#" className="hover:opacity-60 transition">Garantie</a></li>
              <li><a href="#" className="hover:opacity-60 transition">Effectuer un retour</a></li>
              <li><a href="#" className="hover:opacity-60 transition">Conditions générales</a></li>
              <li><a href="#" className="hover:opacity-60 transition">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:opacity-60 transition">Droit de rétractation UE</a></li>
            </ul>
            <ul className="space-y-4" style={{ fontSize: "14px", lineHeight: "20px" }}>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-60 transition">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:opacity-60 transition">Facebook</a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:opacity-60 transition">Tiktok</a></li>
            </ul>
          </div>
        </div>

        <div
          className="mt-16 pt-6 border-t border-foreground/20 flex flex-wrap justify-between gap-4"
          style={{ fontSize: "11px", lineHeight: "16px", letterSpacing: "0.04em" }}
        >
          <p>© {new Date().getFullYear()}&nbsp;Dahlia. Tous droits réservés.</p>
          <p className="font-garamond">Imaginé à Paris.</p>
        </div>
      </div>
    </footer>
  );
}

function NewsletterForm() {
  const subscribe = useServerFn(subscribeToNewsletter);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");

    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      setStatus("error");
      setMessage(result.error.errors[0].message);
      return;
    }

    try {
      await subscribe({ data: { email: result.data.email } });
      setStatus("success");
      setMessage("Merci de votre inscription.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-stretch gap-3">
          <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre e-mail"
          aria-label="Adresse e-mail pour la newsletter"
          className="flex-1 bg-transparent border border-foreground/70 px-4 py-3 outline-none placeholder:text-foreground/60 italic font-sans focus:border-foreground transition"
          style={{ fontSize: "14px", lineHeight: "20px" }}
          maxLength={255}
        />
        <button
          type="submit"
          className="bg-foreground text-background px-10 py-3 hover:opacity-80 transition"
          style={{ fontSize: "13px", letterSpacing: "0.06em" }}
        >
          Envoyer
        </button>
      </div>
      {status !== "idle" && (
        <p
          className={`mt-3 ${status === "success" ? "opacity-70" : "text-destructive"}`}
          style={{ fontSize: "12px", lineHeight: "16px" }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
