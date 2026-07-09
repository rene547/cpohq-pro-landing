import Image from "next/image";
import { loveWall } from "@/lib/content";
import Reveal from "@/components/Reveal";

type Item =
  | { kind: "quote"; q: string; name: string; role: string }
  | { kind: "photo"; src: string; alt: string; video?: boolean };

/* Interleave quotes and photos so the masonry reads as mixed media.
   Photos marked video get a play affordance; real clips swap in when
   Lucas sends the Elevate footage (hover-to-play, Unify style). */
function buildItems(): Item[] {
  const items: Item[] = [];
  const quotes = [...loveWall.quotes];
  const photos = [...loveWall.photos];
  let qi = 0;
  let pi = 0;
  while (qi < quotes.length || pi < photos.length) {
    for (let k = 0; k < 2 && qi < quotes.length; k++) {
      items.push({ kind: "quote", ...quotes[qi++] });
    }
    if (pi < photos.length) {
      items.push({ kind: "photo", ...photos[pi], video: pi % 2 === 0 });
      pi++;
    }
  }
  return items;
}

export default function LoveWall() {
  const items = buildItems();

  return (
    <section className="bg-soft border-y border-line">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight text-center">
            {loveWall.headline}
          </h2>
          <p className="mt-3 text-muted text-center">{loveWall.sub}</p>
        </Reveal>

        <Reveal staggerChildren={0.06} className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
          {items.map((item, i) =>
            item.kind === "quote" ? (
              <figure
                key={i}
                data-reveal-item
                className="break-inside-avoid rounded-brand bg-card border border-line p-6"
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
                className="group break-inside-avoid relative overflow-hidden rounded-brand border border-line"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={640}
                  height={800}
                  className="w-full h-auto object-cover transition duration-500 group-hover:scale-[1.03]"
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
        </Reveal>
      </div>
    </section>
  );
}
