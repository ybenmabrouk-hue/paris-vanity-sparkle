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
        <h1 className="font-serif text-6xl">page not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          the page you're looking for has wandered off.
        </p>
        <div className="mt-8">
          <Link to="/" className="eyebrow underline underline-offset-4 hover:text-accent">
            return home
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
        <h1 className="font-serif text-3xl">something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">please try again.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="eyebrow px-6 py-3 bg-foreground text-background hover:bg-accent transition-colors"
          >
            try again
          </button>
          <a href="/" className="eyebrow px-6 py-3 border border-border hover:bg-muted">
            go home
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
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dahlia — Vanity Cases Made in Paris" },
      {
        name: "description",
        content:
          "Dahlia crafts refined vanity cases in Paris — small-batch, made to travel and to keep.",
      },
      { name: "author", content: "Dahlia" },
      { property: "og:title", content: "Dahlia — Vanity Cases Made in Paris" },
      {
        property: "og:description",
        content: "Refined vanity cases, crafted in small batches in Paris.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
    <html lang="en">
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
