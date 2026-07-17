const MESSAGES = [
  "🤍 Spacious enough for makeup, skincare & toiletries 🤍",
  "✨ As seen in POPSUGAR, New York Magazine, Forbes & more ✨",
  "🖌️ New! Brush layout design 🖌️",
];

export function Marquee() {
  // duplicate for seamless loop
  const items = [...MESSAGES, ...MESSAGES, ...MESSAGES, ...MESSAGES];
  return (
    <div className="w-full overflow-hidden border-y border-black/10 bg-background">
      <div className="marquee-track flex whitespace-nowrap py-4">
        {items.map((m, i) => (
          <span
            key={i}
            className="mx-10 text-base md:text-lg tracking-wide text-black"
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
