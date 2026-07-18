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
              className="font-sans"
              style={{ fontSize: "14px", lineHeight: "22px" }}
            >
              sign up for $15 off your first purchase and be the first to hear
              about all things dahlia: exclusive sales, new arrivals, events and
              more. join the inner circle.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>

          {/* Right: link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:justify-self-end lg:pl-16 lg:border-l lg:border-foreground/20 w-full">
            <ul className="space-y-4" style={{ fontSize: "14px", lineHeight: "20px" }}>
              <li><Link to="/about" className="hover:opacity-60 transition">about us</Link></li>
              <li><a href="#" className="hover:opacity-60 transition">account</a></li>
              <li><a href="mailto:hello@dahlia-paris.com" className="hover:opacity-60 transition">contact</a></li>
              <li><a href="#" className="hover:opacity-60 transition">dahlia hub</a></li>
              <li><a href="#" className="hover:opacity-60 transition">e-gift card</a></li>
              <li><a href="#" className="hover:opacity-60 transition">reviews</a></li>
            </ul>
            <ul className="space-y-4" style={{ fontSize: "14px", lineHeight: "20px" }}>
              <li><Link to="/shipping" className="hover:opacity-60 transition">shipping & returns</Link></li>
              <li><a href="#" className="hover:opacity-60 transition">warranty</a></li>
              <li><a href="#" className="hover:opacity-60 transition">make a return</a></li>
              <li><Link to="/privacy" className="hover:opacity-60 transition">terms & conditions</Link></li>
              <li><Link to="/privacy" className="hover:opacity-60 transition">privacy policy</Link></li>
              <li><a href="#" className="hover:opacity-60 transition">eu right of withdrawal</a></li>
            </ul>
            <ul className="space-y-4" style={{ fontSize: "14px", lineHeight: "20px" }}>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-60 transition">instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:opacity-60 transition">facebook</a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:opacity-60 transition">tiktok</a></li>
              <li><a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:opacity-60 transition">pinterest</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:opacity-60 transition">youtube</a></li>
            </ul>
          </div>
        </div>

        <div
          className="mt-16 pt-6 border-t border-foreground/20 flex flex-wrap justify-between gap-4"
          style={{ fontSize: "11px", lineHeight: "16px", letterSpacing: "0.04em" }}
        >
          <p>© {new Date().getFullYear()} dahlia. all rights reserved.</p>
          <p className="font-garamond">imagined in paris. crafted by hand.</p>
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
          placeholder="your email"
          aria-label="Email address for newsletter"
          className="flex-1 bg-transparent border border-foreground/70 px-4 py-3 outline-none placeholder:text-foreground/60 italic font-sans focus:border-foreground transition"
          style={{ fontSize: "14px", lineHeight: "20px" }}
          maxLength={255}
        />
        <button
          type="submit"
          className="bg-foreground text-background px-10 py-3 hover:opacity-80 transition"
          style={{ fontSize: "13px", letterSpacing: "0.06em" }}
        >
          submit
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
