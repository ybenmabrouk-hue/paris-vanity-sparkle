import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import logoBlack from "@/assets/dahlia-logo-black.svg.asset.json";

export function Header() {
  const items = useCartStore((s) => s.items);
  const setOpen = useCartStore((s) => s.setOpen);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-background/70 backdrop-blur-md border-b border-border/40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" aria-label="Dahlia — home" className="flex items-center">
          <img src={logoBlack.url} alt="Dahlia" className="h-8 md:h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-10 eyebrow">
          <Link to="/collection" className="hover:text-accent transition-colors">
            Shop
          </Link>
          <a href="#story" className="hover:text-accent transition-colors">
            About
          </a>
          <a href="mailto:hello@dahlia-paris.com" className="hover:text-accent transition-colors">
            Contact
          </a>
        </nav>

        <button
          onClick={() => setOpen(true)}
          className="relative flex items-center gap-2 eyebrow hover:text-accent transition-colors"
          aria-label="Open cart"
        >
          <ShoppingBag className="h-5 w-5" strokeWidth={1.4} />
          <span className="hidden sm:inline">Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 h-5 min-w-5 px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-medium flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
