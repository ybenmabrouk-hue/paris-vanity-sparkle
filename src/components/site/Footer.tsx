import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { z } from "zod";
import { ArrowRight, Facebook, Instagram } from "lucide-react";
import logoBlack from "@/assets/dahlia-logo-black.svg.asset.json";
import { ImageSlot } from "@/components/site/ImageSlot";
import { subscribeToNewsletter } from "@/lib/newsletter.functions";

const emailSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255),
});

export function Footer() {
  return (
    <footer className="bg-background text-foreground">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-24">
        <SocialFeed />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-x-8">
          {/* Logo */}
          <div className="md:col-span-5">
            <img
              src={logoBlack.url}
              alt="Dahlia"
              className="h-24 md:h-32 w-auto"
            />
          </div>

          {/* Navigation: right blank space, top row on desktop */}
          <div className="md:col-span-7 md:flex md:justify-end">
            <div>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/about" className="hover:text-accent transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <a href="mailto:hello@dahlia-paris.com" className="hover:text-accent transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-accent transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/shipping" className="hover:text-accent transition-colors">
                    Shipping & Refund Policy
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-accent transition-colors">
                    Privacy & Terms of Service
                  </Link>
                </li>
              </ul>
              <div className="mt-8 flex items-center gap-4">
                <a
                  href="https://facebook.com"
                  aria-label="Facebook"
                  className="hover:text-accent transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  aria-label="Instagram"
                  className="hover:text-accent transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter and brand statement */}
          <div className="md:col-span-5">
            <h3 className="font-sans text-base md:text-lg font-medium tracking-wide">
              Enter the world of Dahlia
            </h3>
            <NewsletterForm />
            <p className="mt-8 max-w-md text-sm text-muted-foreground leading-relaxed">
              Dahlia is a small-batch vanity case studio imagined in Paris and
              crafted by hand. Shaped by a Parisian eye and expressed through
              modern leatherwork, each piece is designed to hold the small
              rituals that travel with you.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-6 text-xs text-muted-foreground flex flex-wrap justify-between gap-4">
          <div>© 2026 Dahlia<br /><br /></div>
          <div>Designed in Paris with love</div>
        </div>
      </div>
    </footer>
  );
}

function SocialFeed() {
  const posts = [
    { label: "Dahlia vanity case — social post 1", caption: "Post 1" },
    { label: "Dahlia vanity case — social post 2", caption: "Post 2" },
    { label: "Dahlia vanity case — social post 3", caption: "Post 3" },
    { label: "Dahlia vanity case — social post 4", caption: "Post 4" },
    { label: "Dahlia vanity case — social post 5", caption: "Post 5" },
    { label: "Dahlia vanity case — social post 6", caption: "Post 6" },
  ];

  return (
    <section className="mb-16 md:mb-24 text-center">
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noreferrer"
        className="inline-block font-['Times_New_Roman',_Times,_serif] text-5xl md:text-7xl hover:text-accent transition-colors"
      >
        @dahlia
      </a>
      <p className="mt-3 text-sm md:text-base text-muted-foreground">
        Elevate your beauty routine
      </p>

      <div className="mt-10 grid grid-cols-6 gap-3 md:gap-4">
        {posts.map((post) => (
          <ImageSlot
            key={post.label}
            label={post.label}
            caption={post.caption}
            className="aspect-square w-full border-0"
          />
        ))}
      </div>
    </section>
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
      setMessage("Thank you for subscribing.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 max-w-md">
      <div className="relative flex items-center bg-card border border-border rounded-md overflow-hidden">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          aria-label="Email address for newsletter"
          className="w-full bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-muted-foreground"
          maxLength={255}
        />
        <button
          type="submit"
          aria-label="Subscribe to newsletter"
          className="px-4 py-3.5 hover:text-accent transition-colors"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
      {status !== "idle" && (
        <p
          className={`mt-2 text-xs ${status === "success" ? "text-muted-foreground" : "text-destructive"}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
