import { ImageSlot } from "@/components/site/ImageSlot";

export function Editorial() {
  return (
    <section className="bg-white">
      {/* Intro */}
      <div
        className="px-6 md:px-10"
        style={{ paddingBlock: "clamp(45px, 8vw, 90px)" }}
      >
        <div className="max-w-[1200px] mx-auto text-center">
          <p
            className="text-[11px] md:text-[12px] uppercase text-muted-foreground"
            style={{ letterSpacing: "0.24em" }}
          >
            An editorial — Hôtel Balzac, Paris
          </p>
          <h2
            className="font-garamond text-black mt-4"
            style={{
              fontWeight: 300,
              letterSpacing: "0.01em",
              fontSize: "clamp(36px, 5.5vw, 64px)",
              lineHeight: 1.05,
            }}
          >
            A room, a ritual, a vanity case
          </h2>
          <p
            className="mx-auto mt-5 text-muted-foreground"
            style={{
              maxWidth: "38rem",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            Photographed in the quiet suites of Hôtel Balzac, Dahlia is captured
            the way it is lived — between morning light, a marble vanity, and
            the small gestures that make a place feel like your own.
          </p>
        </div>
      </div>

      {/* Chapter 1 — Beauty routine elevation */}
      <div className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 text-center md:text-left" style={{ paddingBlock: "clamp(45px, 6vw, 70px)" }}>
          <p
            className="text-[11px] md:text-[12px] uppercase text-muted-foreground"
            style={{ letterSpacing: "0.24em" }}
          >
            Chapter I — The routine
          </p>
          <h3
            className="font-garamond text-black mt-4"
            style={{
              fontWeight: 300,
              letterSpacing: "0.01em",
              fontSize: "clamp(30px, 4vw, 48px)",
              lineHeight: 1.1,
            }}
          >
            An elevated beauty ritual
          </h3>
          <p
            className="mt-5 text-muted-foreground max-w-[38rem]"
            style={{ fontSize: "15px", lineHeight: 1.7 }}
          >
            Serums lined up on marble. A brush placed with intention. The
            vanity case becomes the object around which the moment is built —
            turning a routine into a ritual you look forward to, wherever you
            wake up.
          </p>
        </div>
        <div className="grid grid-cols-2">
          <ImageSlot
            label="Chapter I — a mess of beauty products scattered before the ritual"
            caption="Before — the mess"
            className="w-full aspect-[3/4] md:aspect-auto md:min-h-[640px] border-0"
          />
          <ImageSlot
            label="Chapter I — model getting ready using the Dahlia vanity case"
            caption="After — the ritual"
            className="w-full aspect-[3/4] md:aspect-auto md:min-h-[640px] border-0"
          />
        </div>
      </div>

      {/* Chapter I — supporting duo (sept fragrances style, touching) */}
      <div className="grid grid-cols-2">
        <ImageSlot
          label="Chapter I — supporting editorial image 1"
          caption="Hôtel Balzac"
          className="w-full aspect-[4/5] border-0"
        />
        <ImageSlot
          label="Chapter I — supporting editorial image 2"
          caption="Hôtel Balzac"
          className="w-full aspect-[4/5] border-0"
        />
      </div>

      {/* Chapter 2 — Easy packing / space */}
      <div className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 text-center md:text-left" style={{ paddingBlock: "clamp(45px, 6vw, 70px)" }}>
          <p
            className="text-[11px] md:text-[12px] uppercase text-muted-foreground"
            style={{ letterSpacing: "0.24em" }}
          >
            Chapter II — The travel
          </p>
          <h3
            className="font-garamond text-black mt-4"
            style={{
              fontWeight: 300,
              letterSpacing: "0.01em",
              fontSize: "clamp(30px, 4vw, 48px)",
              lineHeight: 1.1,
            }}
          >
            Everything, in its place
          </h3>
          <p
            className="mt-5 text-muted-foreground max-w-[38rem]"
            style={{ fontSize: "15px", lineHeight: 1.7 }}
          >
            Designed with generous depth and a considered interior, the
            vanity case holds makeup, skincare and toiletries side by side —
            so packing takes minutes and nothing gets lost along the way.
          </p>
        </div>
        <div className="grid grid-cols-2">
          <img
            src={ritualOpenImage.url}
            alt="Chapter II — the open Dahlia vanity case, organized with beauty essentials"
            className="w-full h-full object-cover aspect-[3/4] md:aspect-auto md:min-h-[640px]"
          />
          <img
            src={ritualImage.url}
            alt="Chapter II — a Dahlia vanity case on a hotel bed with beauty essentials"
            className="w-full h-full object-cover aspect-[3/4] md:aspect-auto md:min-h-[640px]"
          />
        </div>
      </div>

      {/* Chapter II — supporting duo (sept fragrances style, touching) */}
      <div className="grid grid-cols-2">
        <ImageSlot
          label="Chapter II — supporting editorial image 1"
          caption="Hôtel Balzac"
          className="w-full aspect-[4/5] border-0"
        />
        <ImageSlot
          label="Chapter II — supporting editorial image 2"
          caption="Hôtel Balzac"
          className="w-full aspect-[4/5] border-0"
        />
      </div>

      {/* Full-bleed editorial image */}
      <div className="w-full aspect-[16/9] md:aspect-[21/9]">
        <ImageSlot
          label="Hôtel Balzac — full-bleed editorial (2400×1030)"
          caption="Hôtel Balzac"
          className="w-full h-full border-0"
        />
      </div>
    </section>
  );
}
