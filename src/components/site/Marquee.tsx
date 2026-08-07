import { useState } from "react";
import { Play, Pause } from "lucide-react";

const MESSAGES = [
  "🤍 Spacieuse pour le maquillage, les soins et la toilette 🤍",
  "✨ Vue dans POPSUGAR, New York Magazine, Forbes et plus encore ✨",
  "🖌️ Nouveau ! Design à compartiments pour pinceaux 🖌️",
];

const SPEEDS = [
  { label: "0.5x", duration: 24 },
  { label: "1x", duration: 12 },
  { label: "2x", duration: 6 },
  { label: "3x", duration: 3 },
];

export function Marquee() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedIndex, setSpeedIndex] = useState(1);

  // duplicate for seamless loop
  const items = [...MESSAGES, ...MESSAGES, ...MESSAGES, ...MESSAGES];
  const duration = SPEEDS[speedIndex].duration;

  return (
    <div className="w-full overflow-hidden border-y border-black/10 bg-background">
      <div className="max-w-[1500px] mx-auto px-4 md:px-10 relative">
        <div
          className={`marquee-track flex items-center whitespace-nowrap py-5 md:py-6 ${!isPlaying ? "marquee-paused" : ""}`}
          style={{ animationDuration: `${duration}s` }}
        >
          {items.map((m, i) => (
            <span
              key={i}
              className="mx-10 text-base md:text-lg tracking-wide text-black leading-none"
            >
              {m}
            </span>
          ))}
        </div>

        <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 flex items-center gap-1 md:gap-2">
          <div className="hidden sm:flex items-center gap-1">
            {SPEEDS.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setSpeedIndex(i)}
                aria-label={`Régler la vitesse ${s.label}`}
                aria-pressed={speedIndex === i}
                className={`h-7 px-2 text-[10px] tracking-wider border rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black ${
                  speedIndex === i
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-black/20 hover:border-black"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? "Mettre en pause le défilement" : "Lancer le défilement"}
            className="h-8 w-8 flex items-center justify-center bg-white border border-black/20 rounded-sm text-black hover:border-black transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" fill="currentColor" />
            ) : (
              <Play className="w-4 h-4" fill="currentColor" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
