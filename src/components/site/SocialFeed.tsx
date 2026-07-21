import { ImageSlot } from "@/components/site/ImageSlot";

const TILES = Array.from({ length: 6 });

export function SocialFeed() {
  return (
    <section
      className="bg-background"
      style={{
        paddingBlockStart: "clamp(2.5rem, 2.0122rem + 2.0813vw, 4rem)",
        paddingBlockEnd: "clamp(2.5rem, 2.0122rem + 2.0813vw, 4rem)",
      }}
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="text-center px-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="font-garamond inline-block hover:opacity-70 transition"
            style={{ fontSize: "clamp(40px, 7vw, 72px)", lineHeight: 1.1 }}
          >
            With dahlia
          </a>
          <p
            className="mt-3 text-muted-foreground"
            style={{ fontSize: "14px", lineHeight: "20px" }}
          >
            A case for beauty, since 2016.
          </p>
        </div>

        <div
          className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-6"
          style={{ gap: "clamp(8px, 1vw, 16px)" }}
        >
          {TILES.map((_, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label={`View Dahlia post ${i + 1} on Instagram`}
              className="relative block aspect-square overflow-hidden bg-secondary group transition-shadow duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span aria-hidden="true" className="absolute inset-0">
                <ImageSlot
                  label={`Instagram ${i + 1}`}
                  caption={`@dahlia ${i + 1}`}
                  className="absolute inset-0 border-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/5"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
