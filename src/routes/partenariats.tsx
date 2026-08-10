import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { ImageSlot } from "@/components/site/ImageSlot";

export const Route = createFileRoute("/partenariats")({
  head: () => ({
    meta: [
      { title: "Partenariats & affiliation — Dahlia" },
      {
        name: "description",
        content:
          "Rejoignez le programme de partenariats et d'affiliation Dahlia : commissions, codes personnalisés et vanity cases offertes pour les créatrices et créateurs beauté.",
      },
      { property: "og:title", content: "Partenariats & affiliation — Dahlia" },
      {
        property: "og:description",
        content:
          "Candidatez au programme de partenariats et d'affiliation Dahlia — commissions, codes personnalisés et collaborations éditoriales.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/partenariats" }],
  }),
  component: PartnershipsPage,
});

const applicationSchema = z.object({
  name: z.string().trim().min(2, { message: "Veuillez indiquer votre nom" }).max(100),
  email: z.string().trim().email({ message: "Veuillez entrer une adresse e-mail valide" }).max(255),
  instagram: z.string().trim().min(2, { message: "Veuillez indiquer votre profil principal" }).max(120),
  audience: z.string().trim().max(60).optional(),
  country: z.string().trim().max(80).optional(),
  message: z.string().trim().min(20, { message: "Décrivez votre univers en quelques lignes" }).max(1000),
});

const PILLARS = [
  {
    title: "Commissions",
    body: "Une commission sur chaque commande générée via votre lien d'affiliation, suivie mois par mois.",
  },
  {
    title: "Code personnalisé",
    body: "Un code de réduction à votre nom, offert à votre communauté pour son premier vanity case.",
  },
  {
    title: "Pièces offertes",
    body: "Des vanity cases sélectionnées pour vos contenus, selon les collections et les saisons.",
  },
  {
    title: "Éditorial",
    body: "Des collaborations plus longues : shootings, séries de contenus, éditions limitées.",
  },
];

function PartnershipsPage() {
  return (
    <div className="bg-white">
      {/* Hero — text left, image right */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-stretch">
        <div className="flex items-center px-6 md:px-[6vw] py-14 md:py-24">
          <div className="max-w-[34rem]">
            <p className="eyebrow uppercase text-muted-foreground">Partenariats</p>
            <h1
              className="font-garamond text-black mt-4"
              style={{
                fontWeight: 300,
                letterSpacing: "0.01em",
                fontSize: "clamp(32px, 4.4vw, 52px)",
                lineHeight: 1.1,
              }}
            >
              Créons ensemble
            </h1>
            <p className="mt-6 text-muted-foreground" style={{ fontSize: "15px", lineHeight: 1.75 }}>
              Dahlia collabore avec des créatrices et créateurs beauté, voyage et lifestyle qui
              partagent notre goût des objets justes. Programme d'affiliation, contenus rémunérés,
              collaborations éditoriales : dites-nous ce que vous imaginez.
            </p>
            <a
              href="#candidature"
              className="inline-flex items-center mt-8 border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-colors"
              style={{ fontSize: "13px", letterSpacing: "0.06em" }}
            >
              Déposer une candidature
            </a>
          </div>
        </div>
        <div className="w-full bg-petale">
          <ImageSlot
            label="Créatrice avec la vanity case Dahlia — image de campagne partenariats"
            caption="Image partenariats"
            className="w-full h-full min-h-[380px] md:min-h-[640px] border-0 bg-petale text-foreground"
          />
        </div>
      </section>

      {/* Pillars */}
      <section className="px-6 md:px-10" style={{ paddingBlock: "clamp(56px, 8vw, 110px)" }}>
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="font-garamond text-black"
            style={{
              fontWeight: 300,
              letterSpacing: "0.01em",
              fontSize: "clamp(28px, 3.6vw, 44px)",
              lineHeight: 1.1,
            }}
          >
            Ce que nous proposons
          </h2>
          <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {PILLARS.map((p, i) => (
              <div key={p.title} className="border-t border-foreground/15 pt-5">
                <p className="text-muted-foreground" style={{ fontSize: "12px", letterSpacing: "0.08em" }}>
                  0{i + 1}
                </p>
                <h3 className="mt-3" style={{ fontSize: "15px", lineHeight: "22px" }}>
                  {p.title}
                </h3>
                <p className="mt-2 text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.7 }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="candidature" className="bg-petale px-6 md:px-10" style={{ paddingBlock: "clamp(56px, 8vw, 110px)" }}>
        <div className="max-w-[820px] mx-auto">
          <h2
            className="font-garamond text-black"
            style={{
              fontWeight: 300,
              letterSpacing: "0.01em",
              fontSize: "clamp(28px, 3.6vw, 44px)",
              lineHeight: 1.1,
            }}
          >
            Votre candidature
          </h2>
          <p className="mt-4 text-foreground/70" style={{ fontSize: "15px", lineHeight: 1.75 }}>
            Nous lisons chaque candidature et revenons vers les profils retenus sous sept jours.
          </p>
          <div className="mt-10">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </div>
  );
}

const fieldClass =
  "w-full bg-transparent border border-foreground/40 px-4 py-3 outline-none placeholder:text-foreground/50 font-sans focus:border-foreground transition";

function ApplicationForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    instagram: "",
    audience: "",
    country: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = applicationSchema.safeParse(values);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border border-foreground/30 px-6 py-10 text-center">
        <p className="font-garamond text-black" style={{ fontSize: "26px", lineHeight: 1.2 }}>
          Merci — votre candidature est bien reçue
        </p>
        <p className="mt-3 text-foreground/70" style={{ fontSize: "14px", lineHeight: 1.7 }}>
          Notre équipe revient vers vous à l'adresse indiquée.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5" style={{ fontSize: "14px" }}>
      <Field label="Nom et prénom" error={errors.name}>
        <input className={fieldClass} value={values.name} onChange={set("name")} maxLength={100} placeholder="Camille Martin" />
      </Field>
      <Field label="E-mail" error={errors.email}>
        <input type="email" className={fieldClass} value={values.email} onChange={set("email")} maxLength={255} placeholder="vous@email.com" />
      </Field>
      <Field label="Instagram / TikTok" error={errors.instagram}>
        <input className={fieldClass} value={values.instagram} onChange={set("instagram")} maxLength={120} placeholder="@votreprofil" />
      </Field>
      <Field label="Communauté (abonnés)" error={errors.audience}>
        <input className={fieldClass} value={values.audience} onChange={set("audience")} maxLength={60} placeholder="12 000" />
      </Field>
      <Field label="Pays" error={errors.country} className="sm:col-span-2">
        <input className={fieldClass} value={values.country} onChange={set("country")} maxLength={80} placeholder="France" />
      </Field>
      <Field label="Votre univers et votre projet avec Dahlia" error={errors.message} className="sm:col-span-2">
        <textarea
          className={`${fieldClass} min-h-[140px] resize-y`}
          value={values.message}
          onChange={set("message")}
          maxLength={1000}
          placeholder="Parlez-nous de votre contenu, de votre communauté et du format de collaboration que vous imaginez."
        />
      </Field>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="bg-foreground text-background px-10 py-3 hover:opacity-80 transition"
          style={{ fontSize: "13px", letterSpacing: "0.06em" }}
        >
          Envoyer ma candidature
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block mb-2 text-foreground/80" style={{ fontSize: "13px" }}>
        {label}
      </span>
      {children}
      {error && (
        <span className="block mt-2 text-destructive" style={{ fontSize: "12px" }}>
          {error}
        </span>
      )}
    </label>
  );
}
