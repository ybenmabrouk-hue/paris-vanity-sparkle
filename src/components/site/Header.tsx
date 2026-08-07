import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import logoBlack from "@/assets/dahlia-logo-black.svg.asset.json";

export function Header() {
  const items = useCartStore((s) => s.items);
  const setOpen = useCartStore((s) => s.setOpen);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className="fixed top-10 inset-x-0 z-40 bg-background">
      <div className="mx-auto max-w-[1800px] px-8 md:px-12 h-24 flex items-center justify-between">
        <Link to="/" aria-label="Dahlia — accueil" className="flex items-center">
          <img src={logoBlack.url} alt="Dahlia" className="h-10 md:h-12 w-auto" />
        </Link>

        <nav className="flex items-center gap-10 md:gap-14 font-sans font-normal text-[12px] tracking-[0.03em]">
          <Link to="/vanity-cases" className="hover:opacity-60 transition-opacity">
            Trousses de toilette
          </Link>
          <Link to="/about" className="hover:opacity-60 transition-opacity">
            À propos
          </Link>

          <a href="#login" className="hover:opacity-60 transition-opacity">
            Connexion
          </a>
          <button
            onClick={() => setOpen(true)}
            className="relative flex items-center hover:opacity-60 transition-opacity"
            aria-label="Ouvrir le panier"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.4} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 h-5 min-w-5 px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-medium flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
