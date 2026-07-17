import { useMemo, useState } from "react";

type Review = {
  id: string;
  author: string;
  location?: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified?: boolean;
};

const REVIEWS: Review[] = [
  {
    id: "1",
    author: "camille l.",
    location: "paris, fr",
    rating: 5,
    title: "the one i always take with me",
    body: "it finally replaced the three pouches i used to travel with. everything fits and i can actually find things.",
    date: "june 12, 2026",
    verified: true,
  },
  {
    id: "2",
    author: "sophie b.",
    location: "london, uk",
    rating: 5,
    title: "beautiful object, thoughtful design",
    body: "the interior wipes clean with water. no more foundation stains ruining the lining after a month.",
    date: "may 28, 2026",
    verified: true,
  },
  {
    id: "3",
    author: "alexandra p.",
    location: "new york, us",
    rating: 4,
    title: "worth it",
    body: "on the pricier side but the craft shows. i wish it came with a small mirror inside.",
    date: "may 03, 2026",
    verified: true,
  },
  {
    id: "4",
    author: "inès r.",
    location: "milan, it",
    rating: 5,
    title: "gifted to my sister — bought a second",
    body: "she loved it so much i had to order mine. the burgundy is even prettier in person.",
    date: "april 21, 2026",
    verified: true,
  },
  {
    id: "5",
    author: "marie d.",
    rating: 5,
    title: "no more digging",
    body: "flat opening is a game changer. brushes stay in place and nothing gets lost at the bottom.",
    date: "april 09, 2026",
    verified: true,
  },
  {
    id: "6",
    author: "juliette m.",
    location: "paris, fr",
    rating: 4,
    title: "chic and practical",
    body: "compact enough for a weekend, holds a surprising amount.",
    date: "march 30, 2026",
  },
];

function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <div className="inline-flex items-center gap-[2px]" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={i <= Math.round(value) ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.25"
          className="text-black"
        >
          <path d="M10 1.5l2.6 5.3 5.9.85-4.25 4.14 1 5.86L10 14.9l-5.25 2.76 1-5.86L1.5 7.65l5.9-.85L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

const PAGE_SIZE = 4;

export function ReviewsSection() {
  const [sort, setSort] = useState<"recent" | "highest" | "lowest">("recent");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const { average, total, breakdown } = useMemo(() => {
    const total = REVIEWS.length;
    const sum = REVIEWS.reduce((a, r) => a + r.rating, 0);
    const breakdown = [5, 4, 3, 2, 1].map((n) => ({
      stars: n,
      count: REVIEWS.filter((r) => r.rating === n).length,
    }));
    return { average: sum / total, total, breakdown };
  }, []);

  const sorted = useMemo(() => {
    const list = [...REVIEWS];
    if (sort === "highest") list.sort((a, b) => b.rating - a.rating);
    else if (sort === "lowest") list.sort((a, b) => a.rating - b.rating);
    else list.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    return list;
  }, [sort]);

  return (
    <section className="w-full bg-white text-black">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <header className="text-center mb-12 md:mb-16">
          <p className="text-[11px] tracking-[0.18em] text-black/60 mb-3">reviews</p>
          <h2
            className="font-sans italic"
            style={{ fontWeight: 300, fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "0.01em" }}
          >
            what people are saying
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 md:gap-20 border-y border-black/10 py-10 md:py-14 mb-12 md:mb-16">
          {/* summary */}
          <div className="flex flex-col items-start">
            <div className="text-[64px] leading-none font-sans" style={{ fontWeight: 300 }}>
              {average.toFixed(1)}
            </div>
            <div className="mt-3">
              <Stars value={average} size={18} />
            </div>
            <div className="mt-2 text-sm text-black/60">based on {total} reviews</div>
          </div>

          {/* breakdown */}
          <div className="flex flex-col gap-2 justify-center max-w-md">
            {breakdown.map(({ stars, count }) => {
              const pct = total ? (count / total) * 100 : 0;
              return (
                <button
                  key={stars}
                  className="grid grid-cols-[60px_1fr_40px] items-center gap-3 text-left text-sm hover:opacity-80"
                >
                  <span className="flex items-center gap-1">
                    {stars}
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 1.5l2.6 5.3 5.9.85-4.25 4.14 1 5.86L10 14.9l-5.25 2.76 1-5.86L1.5 7.65l5.9-.85L10 1.5z" />
                    </svg>
                  </span>
                  <span className="h-[6px] bg-black/10 relative overflow-hidden">
                    <span
                      className="absolute inset-y-0 left-0 bg-black"
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                  <span className="text-black/60 tabular-nums">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* sort */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-sm text-black/60">{total} reviews</span>
          <label className="text-sm flex items-center gap-2">
            <span className="text-black/60">sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="bg-transparent border-b border-black/20 py-1 pr-6 focus:outline-none focus:border-black"
            >
              <option value="recent">most recent</option>
              <option value="highest">highest rated</option>
              <option value="lowest">lowest rated</option>
            </select>
          </label>
        </div>

        {/* list */}
        <ul className="divide-y divide-black/10 border-t border-black/10">
          {sorted.slice(0, visible).map((r) => (
            <li key={r.id} className="py-8 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-12">
              <div className="text-sm">
                <div className="font-medium">{r.author}</div>
                {r.location && <div className="text-black/60 mt-0.5">{r.location}</div>}
                {r.verified && (
                  <div className="text-black/60 mt-2 text-xs">✓ verified buyer</div>
                )}
                <div className="text-black/60 mt-2 text-xs">{r.date}</div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Stars value={r.rating} />
                </div>
                <h3 className="text-base font-medium mb-1">{r.title}</h3>
                <p className="text-sm text-black/70 leading-relaxed">{r.body}</p>
              </div>
            </li>
          ))}
        </ul>

        {visible < sorted.length && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="border border-black px-8 py-3 text-sm hover:bg-black hover:text-white transition-colors"
            >
              load more reviews
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
