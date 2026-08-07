import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "../components/site/Header";
import { TopBanner } from "../components/site/TopBanner";

import { Footer } from "../components/site/Footer";
import { CartDrawer } from "../components/site/CartDrawer";
import { useCartSync } from "../hooks/useCartSync";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-6xl">Page introuvable</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          La page que vous cherchez s'est égarée.
        </p>
        <div className="mt-8">
          <Link to="/" className="eyebrow underline underline-offset-4 hover:text-accent">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl">Une erreur est survenue</h1>
        <p className="mt-2 text-sm text-muted-foreground">Veuillez réessayer.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="eyebrow px-6 py-3 bg-foreground text-background hover:bg-accent transition-colors"
          >
            Réessayer
          </button>
          <a href="/" className="eyebrow px-6 py-3 border border-border hover:bg-muted">
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "Viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dahlia — Vanity cases fabriquées à Paris" },
      {
        name: "Description",
        content:
          "Dahlia façonne des vanity cases raffinées à Paris — petites séries, faites pour voyager et pour durer.",
      },
      { name: "Author", content: "Dahlia" },
      { property: "og:title", content: "Dahlia — Vanity cases fabriquées à Paris" },
      {
        property: "og:description",
        content: "Des vanity cases raffinées, façonnées en petites séries à Paris.",
      },
      { property: "og:type", content: "website" },
      { name: "Twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Hanken+Grotesk:wght@300;400;500;600;700&family=Caveat:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function AppShell() {
  useCartSync();
  return (
    <>
      <div className="fixed top-0 inset-x-0 z-50">
        <TopBanner />
      </div>
      <div className="pt-10">
        <Header />
        <main className="pt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
      <CartDrawer />
      <Toaster position="top-center" />
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell />
    </QueryClientProvider>
  );
}
