import Image from "next/image";
import { loveWall } from "@/lib/content";
import Reveal from "@/components/Reveal";

/* v0 love wall: white cards with a soft shadow, and explicit columns whose
   photo cards flex to absorb height differences -- every column bottoms out
   on the same line, so the bento reads as one clean rectangle. */

type Quote = (typeof loveWall.quotes)[number];
type Photo = (typeof loveWall.photos)[number] & { video?: boolean };

type Item =
  | ({ kind: "quote" } & Quote)
  | ({ kind: "photo"; cls: string } & Photo);

const q = (i: number): Item => ({ kind: "quote", ...loveWall.quotes[i] });
const p = (i: number, cls: string, video = false): Item => ({
  kind: "photo",
  ...loveWall.photos[i],
  cls,
  video,
});

/* hand-balanced masonry: photos scattered at varied sizes through every
   column; the flex-1 photo in each column absorbs the height difference so
   all three columns still end flush */
const COLUMNS: Item[][] = [
  [q(0), p(0, "h-72", true), q(3), p(3, "flex-1 min-h-[200px]"), q(6)],
  [p(1, "h-52"), q(1), q(4), q(7), p(4, "flex-1 min-h-[240px]")],
  [q(2), p(2, "flex-1 min-h-[260px]", true), q(5), q(8), q(9)],
];

const cardShadow =
  "shadow-[0_1px_2px_rgba(10,37,64,0.05),0_10px_28px_rgba(10,37,64,0.07)]";

export default function LoveWallV0() {
  return (
    <section className="bg-soft border-y border-line">
      <div className="mx-auto max-w-[1200px] px-6 py-24">
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight text-center">
            {loveWall.headline}
          </h2>
          <p className="mt-3 text-muted text-center">{loveWall.sub}</p>
        </Reveal>

        <Reveal staggerChildren={0.05} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {COLUMNS.map((column, ci) => (
            <div key={ci} className="flex flex-col gap-5">
              {column.map((item, i) =>
                item.kind === "quote" ? (
                  <figure
                    key={i}
                    data-reveal-item
                    className={`rounded-brand bg-white border border-line/70 p-6 ${cardShadow}`}
                  >
                    <blockquote className="leading-relaxed">“{item.q}”</blockquote>
                    <figcaption className="mt-4 flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-soft border border-line flex items-center justify-center text-xs text-muted">
                        {item.name.split(" ").map((w) => w[0]).join("")}
                      </span>
                      <span>
                        <span className="block text-sm font-medium">{item.name}</span>
                        <span className="block text-xs text-muted">{item.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                ) : (
                  <div
                    key={i}
                    data-reveal-item
                    className={`group relative overflow-hidden rounded-brand border border-line/70 ${item.cls} ${cardShadow}`}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    {item.video && (
                      <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/55 text-white text-xs px-3 py-1.5 backdrop-blur">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
                          <path d="M2 1.5v7l6-3.5-6-3.5z" />
                        </svg>
                        Clip plays on hover
                      </span>
                    )}
                  </div>
                )
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
