import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { z } from "zod";
import { Facebook, Instagram } from "lucide-react";
import logoBlack from "@/assets/dahlia-logo-black.svg.asset.json";
import atHandle from "@/assets/dahlia-at-handle.png.asset.json";
import { ImageSlot } from "@/components/site/ImageSlot";
import { subscribeToNewsletter } from "@/lib/newsletter.functions";

const emailSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255),
});

export function Footer() {
  return (
    <footer className="text-foreground">
      {/* Instagram social feed (kept in footer only, Sept-style spacing) */}
      <div
        className="mx-auto max-w-[1600px] px-6 md:px-10 bg-background"
        style={{ paddingBlockStart: "clamp(45px, 6vw, 80px)", paddingBlockEnd: "clamp(30px, 4vw, 56px)" }}
      >
        <SocialFeed />
      </div>

      {/* Sept-style 4-block footer */}
      <div className="bg-petale">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10" style={{ paddingBlockEnd: "clamp(30px, 4vw, 56px)" }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Block 1: logo + newsletter + brand statement */}
          <div className="md:col-span-1">
            <img
              src={logoBlack.url}
              alt="Dahlia"
              className="w-auto"
              style={{ maxWidth: "min(340px, 100%)", height: "auto" }}
            />
            <div className="mt-6 md:mt-8 space-y-4 md:space-y-5">
              <p
                className="font-serif font-medium"
                style={{ fontSize: "14px", lineHeight: "20px" }}
              >
                Enter the world of Dahlia
              </p>
              <NewsletterForm />
              <p
                className="text-muted-foreground"
                style={{ fontSize: "12px", lineHeight: "18px" }}
              >
                Dahlia is a small-batch vanity case studio imagined in Paris and
                crafted by hand. Shaped by a Parisian eye and expressed through
                modern leatherwork, we create considered, made-to-keep pieces
                designed for modern ritual and everyday wear.
              </p>
            </div>
          </div>

          {/* Block 2: links */}
          <div className="md:col-span-1">
            <ul className="space-y-2.5" style={{ fontSize: "14px", lineHeight: "20px" }}>
              <li><Link to="/about" className="opacity-70 hover:opacity-100 transition">About</Link></li>
              <li><a href="mailto:hello@dahlia-paris.com" className="opacity-70 hover:opacity-100 transition">Contact</a></li>
              <li><Link to="/faq" className="opacity-70 hover:opacity-100 transition">FAQ</Link></li>
              <li><Link to="/shipping" className="opacity-70 hover:opacity-100 transition">Shipping & Refund Policy</Link></li>
              <li><Link to="/privacy" className="opacity-70 hover:opacity-100 transition">Privacy & Terms of Service</Link></li>
            </ul>
          </div>

          {/* Block 3: business hours */}
          <div className="md:col-span-1">
            <div
              className="text-muted-foreground space-y-4"
              style={{ fontSize: "14px", lineHeight: "20px" }}
            >
              <p>
                Business Hours<br />Mon – Fri 10am – 6pm CET
              </p>
              <p>
                Atelier & Logistics<br />+33 1 42 00 00 00
              </p>
            </div>
          </div>

          {/* Block 4: emails + social */}
          <div className="md:col-span-1">
            <div
              className="text-muted-foreground space-y-4"
              style={{ fontSize: "14px", lineHeight: "20px" }}
            >
              <p>
                Press & Partnerships<br />press@dahlia-paris.com
              </p>
              <p>
                Customer Care<br />care@dahlia-paris.com
              </p>
            </div>
            <ul className="mt-6 flex items-center gap-4">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on Facebook"
                  className="opacity-70 hover:opacity-100 transition"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on Instagram"
                  className="opacity-70 hover:opacity-100 transition"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Aside line */}
        <div
          className="mt-12 md:mt-16 flex flex-wrap justify-between gap-4 text-muted-foreground"
          style={{ fontSize: "10px", lineHeight: "15px", letterSpacing: "0.02em" }}
        >
          <p>© {new Date().getFullYear()} — Dahlia</p>
          <p>Designed in Paris with love</p>
        </div>
      </div>
      </div>
    </footer>
  );
}

function SocialFeed() {
  const posts = [
    { label: "Dahlia — social post 1", caption: "Post 1" },
    { label: "Dahlia — social post 2", caption: "Post 2" },
    { label: "Dahlia — social post 3", caption: "Post 3" },
    { label: "Dahlia — social post 4", caption: "Post 4" },
    { label: "Dahlia — social post 5", caption: "Post 5" },
    { label: "Dahlia — social post 6", caption: "Post 6" },
  ];

  return (
    <div className="text-center">
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noreferrer"
        aria-label="@dahlia on Instagram"
        className="inline-block hover:opacity-70 transition-opacity"
      >
        <img
          src={atHandle.url}
          alt="@dahlia"
          className="w-auto mx-auto"
          style={{ height: "clamp(48px, 8vw, 96px)" }}
        />
      </a>
      <p
        className="mt-3 text-muted-foreground"
        style={{ fontSize: "14px", lineHeight: "20px", letterSpacing: "0.02em" }}
      >
        Elevate your beauty routine
      </p>
      <div className="mt-8 md:mt-10 grid grid-cols-6 gap-2 md:gap-4">
        {posts.map((post) => (
          <ImageSlot
            key={post.label}
            label={post.label}
            caption={post.caption}
            className="aspect-square w-full border-0"
          />
        ))}
      </div>
    </div>
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
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="relative flex items-center bg-transparent border-b border-border/70">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          aria-label="Email address for newsletter"
          className="w-full bg-transparent py-2.5 pr-8 outline-none placeholder:text-muted-foreground"
          style={{ fontSize: "14px", lineHeight: "20px" }}
          maxLength={255}
        />
        <button
          type="submit"
          aria-label="Subscribe to newsletter"
          className="absolute right-0 h-full flex items-center px-1 text-accent hover:opacity-70 transition"
        >
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M-1.6881e-07 4.97792L-2.17599e-07 3.86176L6.69697 3.86176L3.62752 0.792318L4.42 -0.000156596L8.84 4.41984L4.42 8.83984L3.62753 8.04737L6.69697 4.97792L-1.6881e-07 4.97792Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      {status !== "idle" && (
        <p
          className={`mt-2 ${status === "success" ? "text-muted-foreground" : "text-destructive"}`}
          style={{ fontSize: "12px", lineHeight: "15px" }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
