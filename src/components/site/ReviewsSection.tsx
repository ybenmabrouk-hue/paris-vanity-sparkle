import { useEffect, useMemo, useRef, useState } from "react";

type Review = {
  id: string;
  author: string;
  location?: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified?: boolean;
  photos?: string[];
};

const SEED_REVIEWS: Review[] = [
  {
    id: "1",
    author: "camille l.",
    location: "paris, fr",
    rating: 5,
    title: "the one i always take with me",
    body: "it finally replaced the three pouches i used to travel with. everything fits and i can actually find things.",
    date: "june 12, 2026",
    verified: true,
    photos: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
    ],
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
    photos: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80",
    ],
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
    photos: [
      "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=600&q=80",
    ],
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

function Stars({
  value,
  size = 14,
  interactive = false,
  onChange,
}: {
  value: number;
  size?: number;
  interactive?: boolean;
  onChange?: (v: number) => void;
}) {
  return (
    <div className="inline-flex items-center gap-[2px]" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= Math.round(value);
        const star = (
          <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.25"
            className="text-black"
          >
            <path d="M10 1.5l2.6 5.3 5.9.85-4.25 4.14 1 5.86L10 14.9l-5.25 2.76 1-5.86L1.5 7.65l5.9-.85L10 1.5z" />
          </svg>
        );
        return interactive ? (
          <button
            key={i}
            type="button"
            onClick={() => onChange?.(i)}
            className="p-0.5 hover:opacity-80"
            aria-label={`rate ${i} stars`}
          >
            {star}
          </button>
        ) : (
          <span key={i}>{star}</span>
        );
      })}
    </div>
  );
}

const PAGE_SIZE = 4;

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(SEED_REVIEWS);
  const [sort, setSort] = useState<"recent" | "highest" | "lowest">("recent");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [writing, setWriting] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  // draft state
  const [dRating, setDRating] = useState(5);
  const [dAuthor, setDAuthor] = useState("");
  const [dTitle, setDTitle] = useState("");
  const [dBody, setDBody] = useState("");
  const [dPhotos, setDPhotos] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      dPhotos.forEach((u) => {
        if (u.startsWith("blob:")) URL.revokeObjectURL(u);
      });
    };
  }, [dPhotos]);

  const { average, total, breakdown } = useMemo(() => {
    const total = reviews.length;
    const sum = reviews.reduce((a, r) => a + r.rating, 0);
    const breakdown = [5, 4, 3, 2, 1].map((n) => ({
      stars: n,
      count: reviews.filter((r) => r.rating === n).length,
    }));
    return { average: total ? sum / total : 0, total, breakdown };
  }, [reviews]);

  const sorted = useMemo(() => {
    const list = [...reviews];
    if (sort === "highest") list.sort((a, b) => b.rating - a.rating);
    else if (sort === "lowest") list.sort((a, b) => a.rating - b.rating);
    else list.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    return list;
  }, [reviews, sort]);

  const photoGallery = useMemo(
    () => reviews.flatMap((r) => (r.photos ?? []).map((src) => ({ src, id: r.id }))),
    [reviews]
  );

  function onFiles(files: FileList | null) {
    if (!files) return;
    const urls = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 6 - dPhotos.length)
      .map((f) => URL.createObjectURL(f));
    setDPhotos((p) => [...p, ...urls]);
  }

  function removePhoto(idx: number) {
    setDPhotos((p) => {
      const url = p[idx];
      if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
      return p.filter((_, i) => i !== idx);
    });
  }

  function submitReview(e: React.FormEvent) {
    e.preventDefault();
    if (!dAuthor.trim() || !dTitle.trim() || !dBody.trim()) return;
    const review: Review = {
      id: `u-${Date.now()}`,
      author: dAuthor.trim().toLowerCase(),
      rating: dRating,
      title: dTitle.trim(),
      body: dBody.trim(),
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" }).toLowerCase(),
      photos: dPhotos.length ? dPhotos : undefined,
    };
    setReviews((r) => [review, ...r]);
    setDRating(5);
    setDAuthor("");
    setDTitle("");
    setDBody("");
    setDPhotos([]);
    setWriting(false);
  }

  return (
    <section className="w-full bg-white text-black">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <header className="text-center mb-12 md:mb-16">
          <h2
            className="font-sans italic"
            style={{ fontWeight: 300, fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "0.01em" }}
          >
            reviews
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_auto] gap-12 md:gap-20 border-y border-black/10 py-10 md:py-14 mb-8">
          <div className="flex flex-col items-start">
            <div className="text-[64px] leading-none font-sans" style={{ fontWeight: 300 }}>
              {average.toFixed(1)}
            </div>
            <div className="mt-3">
              <Stars value={average} size={18} />
            </div>
            <div className="mt-2 text-sm text-black/60">based on {total} reviews</div>
          </div>

          <div className="flex flex-col gap-2 justify-center max-w-md">
            {breakdown.map(({ stars, count }) => {
              const pct = total ? (count / total) * 100 : 0;
              return (
                <div key={stars} className="grid grid-cols-[60px_1fr_40px] items-center gap-3 text-sm">
                  <span className="flex items-center gap-1">
                    {stars}
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 1.5l2.6 5.3 5.9.85-4.25 4.14 1 5.86L10 14.9l-5.25 2.76 1-5.86L1.5 7.65l5.9-.85L10 1.5z" />
                    </svg>
                  </span>
                  <span className="h-[6px] bg-black/10 relative overflow-hidden">
                    <span className="absolute inset-y-0 left-0 bg-black" style={{ width: `${pct}%` }} />
                  </span>
                  <span className="text-black/60 tabular-nums">{count}</span>
                </div>
              );
            })}
          </div>

          <div className="flex md:items-center">
            <button
              onClick={() => setWriting((w) => !w)}
              className="border border-black px-6 py-3 text-sm hover:bg-black hover:text-white transition-colors whitespace-nowrap"
            >
              {writing ? "cancel" : "write a review"}
            </button>
          </div>
        </div>

        {/* photo gallery strip */}
        {photoGallery.length > 0 && (
          <div className="mb-10">
            <div className="text-sm text-black/60 mb-3">customer photos ({photoGallery.length})</div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {photoGallery.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(p.src)}
                  className="shrink-0 w-24 h-24 md:w-28 md:h-28 overflow-hidden bg-black/5"
                >
                  <img src={p.src} alt="customer photo" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* write review form */}
        {writing && (
          <form onSubmit={submitReview} className="border border-black/10 p-6 md:p-8 mb-10 grid gap-5">
            <div>
              <label className="text-sm text-black/60 block mb-2">your rating</label>
              <Stars value={dRating} size={22} interactive onChange={setDRating} />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <label className="text-sm">
                <span className="text-black/60 block mb-1">your name</span>
                <input
                  type="text"
                  value={dAuthor}
                  onChange={(e) => setDAuthor(e.target.value)}
                  className="w-full bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black"
                  required
                />
              </label>
              <label className="text-sm">
                <span className="text-black/60 block mb-1">title</span>
                <input
                  type="text"
                  value={dTitle}
                  onChange={(e) => setDTitle(e.target.value)}
                  className="w-full bg-transparent border-b border-black/20 py-2 focus:outline-none focus:border-black"
                  required
                />
              </label>
            </div>
            <label className="text-sm">
              <span className="text-black/60 block mb-1">your review</span>
              <textarea
                value={dBody}
                onChange={(e) => setDBody(e.target.value)}
                rows={4}
                className="w-full bg-transparent border border-black/20 p-3 focus:outline-none focus:border-black resize-none"
                required
              />
            </label>

            <div>
              <div className="text-sm text-black/60 mb-2">add photos ({dPhotos.length}/6)</div>
              <div className="flex flex-wrap gap-3">
                {dPhotos.map((src, i) => (
                  <div key={i} className="relative w-20 h-20 overflow-hidden bg-black/5">
                    <img src={src} alt="upload preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black text-white text-xs leading-none flex items-center justify-center"
                      aria-label="remove photo"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {dPhotos.length < 6 && (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="w-20 h-20 border border-dashed border-black/30 text-xs text-black/60 hover:border-black hover:text-black flex items-center justify-center"
                  >
                    + photo
                  </button>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    onFiles(e.target.files);
                    e.target.value = "";
                  }}
                  className="hidden"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button type="submit" className="border border-black bg-black text-white px-6 py-3 text-sm hover:opacity-90">
                submit review
              </button>
              <button type="button" onClick={() => setWriting(false)} className="border border-black/20 px-6 py-3 text-sm hover:border-black">
                cancel
              </button>
            </div>
          </form>
        )}

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

        <ul className="divide-y divide-black/10 border-t border-black/10">
          {sorted.slice(0, visible).map((r) => (
            <li key={r.id} className="py-8 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-12">
              <div className="text-sm">
                <div className="font-medium">{r.author}</div>
                {r.location && <div className="text-black/60 mt-0.5">{r.location}</div>}
                {r.verified && <div className="text-black/60 mt-2 text-xs">✓ verified buyer</div>}
                <div className="text-black/60 mt-2 text-xs">{r.date}</div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Stars value={r.rating} />
                </div>
                <h3 className="text-base font-medium mb-1">{r.title}</h3>
                <p className="text-sm text-black/70 leading-relaxed">{r.body}</p>
                {r.photos && r.photos.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {r.photos.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setLightbox(src)}
                        className="w-20 h-20 md:w-24 md:h-24 overflow-hidden bg-black/5"
                      >
                        <img src={src} alt={`review photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                      </button>
                    ))}
                  </div>
                )}
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

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="review photo" className="max-w-full max-h-full object-contain" />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white text-2xl leading-none"
            aria-label="close"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}
