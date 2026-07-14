import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { z } from "zod";
import { subscribeToNewsletter } from "@/lib/newsletter.functions";

const emailSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255),
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
              className="font-serif"
              style={{ fontSize: "14px", lineHeight: "22px" }}
            >
              Sign up for $15 off your first purchase and to be the first to hear
              about all things Dahlia: exclusive sales, new arrivals, events and
              more. Join the inner circle.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>

          {/* Right: link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:justify-self-end lg:pl-16 lg:border-l lg:border-foreground/20 w-full">
            <ul className="space-y-4" style={{ fontSize: "14px", lineHeight: "20px" }}>
              <li><Link to="/about" className="hover:opacity-60 transition">About Us</Link></li>
              <li><a href="#" className="hover:opacity-60 transition">Account</a></li>
              <li><a href="mailto:hello@dahlia-paris.com" className="hover:opacity-60 transition">Contact</a></li>
              <li><a href="#" className="hover:opacity-60 transition">Dahlia Hub</a></li>
              <li><a href="#" className="hover:opacity-60 transition">E-Gift Card</a></li>
              <li><a href="#" className="hover:opacity-60 transition">Reviews</a></li>
            </ul>
            <ul className="space-y-4" style={{ fontSize: "14px", lineHeight: "20px" }}>
              <li><Link to="/shipping" className="hover:opacity-60 transition">Shipping & Returns</Link></li>
              <li><a href="#" className="hover:opacity-60 transition">Warranty</a></li>
              <li><a href="#" className="hover:opacity-60 transition">Make A Return</a></li>
              <li><Link to="/privacy" className="hover:opacity-60 transition">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:opacity-60 transition">Privacy Policy</Link></li>
              <li><a href="#" className="hover:opacity-60 transition">EU Right of Withdrawal</a></li>
            </ul>
            <ul className="space-y-4" style={{ fontSize: "14px", lineHeight: "20px" }}>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-60 transition">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:opacity-60 transition">Facebook</a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:opacity-60 transition">TikTok</a></li>
              <li><a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:opacity-60 transition">Pinterest</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:opacity-60 transition">Youtube</a></li>
            </ul>
          </div>
        </div>

        <div
          className="mt-16 pt-6 border-t border-foreground/20 flex flex-wrap justify-between gap-4"
          style={{ fontSize: "11px", lineHeight: "16px", letterSpacing: "0.04em" }}
        >
          <p>© {new Date().getFullYear()} Dahlia. All rights reserved.</p>
          <p>Imagined in Paris. Crafted by hand.</p>
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
      setMessage("Thank you for subscribing.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
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
          placeholder="Your email"
          aria-label="Email address for newsletter"
          className="flex-1 bg-transparent border border-foreground/70 px-4 py-3 outline-none placeholder:text-foreground/60 italic font-serif focus:border-foreground transition"
          style={{ fontSize: "14px", lineHeight: "20px" }}
          maxLength={255}
        />
        <button
          type="submit"
          className="bg-foreground text-background px-10 py-3 hover:opacity-80 transition"
          style={{ fontSize: "13px", letterSpacing: "0.06em" }}
        >
          Submit
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
