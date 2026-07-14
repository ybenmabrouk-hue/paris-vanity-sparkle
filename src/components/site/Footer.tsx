import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-background">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-script text-4xl leading-none">Maison Yasmine</div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
            Vanity cases crafted in Paris. A quiet ritual for the objects you love —
            designed to travel, to keep, to pass on.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-4 text-muted-foreground">Shop</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/collection" className="hover:text-accent">The Collection</Link></li>
            <li><Link to="/collection" className="hover:text-accent">New arrivals</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-4 text-muted-foreground">Maison</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#story" className="hover:text-accent">Our story</a></li>
            <li><a href="mailto:hello@maisonyasmine.com" className="hover:text-accent">Contact</a></li>
            <li><a href="#" className="hover:text-accent">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-6 text-xs text-muted-foreground flex flex-wrap justify-between gap-4">
          <div>© {new Date().getFullYear()} Maison Yasmine — Paris</div>
          <div>Fait à Paris avec soin</div>
        </div>
      </div>
    </footer>
  );
}
