"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { loveWall } from "@/lib/content-v1";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* v1 love wall, upgraded per client feedback 2026-07-09: quote cards carry
   member headshots (black initials circle when none is on file), an accent
   quote mark, and a hover lift; one featured
   quote goes dark navy for contrast; photo cards read as real clip
   thumbnails (center play, duration chip, caption scrim); and the three
   columns drift at slightly different rates while scrolling (scrub-driven,
   so the wall idles still, is flush at section center, and reduced motion
   gets the static layout). Aura washes sit behind the grid. */

type Quote = (typeof loveWall.quotes)[number];
type Photo = (typeof loveWall.photos)[number];

type Item =
  | ({ kind: "quote"; featured?: boolean } & Quote)
  | ({ kind: "photo"; cls: string; video: boolean } & Photo);

const q = (i: number, featured = false): Item => ({
  kind: "quote",
  featured,
  ...loveWall.quotes[i],
});
const p = (i: number, cls: string, video = false): Item => ({
  kind: "photo",
  ...loveWall.photos[i],
  cls,
  video,
});

/* hand-balanced masonry: photos scattered at varied sizes through every
   column; the flex-1 photo in each column absorbs the height difference so
   all three columns still end flush. 8 real quotes, pillars interleaved so
   no column reads as one topic. */
const COLUMNS: Item[][] = [
  [q(0), p(0, "h-72", true), q(3), p(3, "flex-1 min-h-[200px]", true), q(4)],
  [p(1, "h-52"), q(1), q(7, true), p(4, "flex-1 min-h-[240px]")],
  [q(2), p(2, "flex-1 min-h-[260px]", true), q(5), q(6)],
];

/* px of drift per column at the section's scroll extremes; zero crossing at
   section center keeps the flush-bottom rectangle intact where it matters */
const DRIFT = [18, -30, 14];

const cardShadow =
  "shadow-[0_1px_2px_rgba(10,37,64,0.05),0_10px_28px_rgba(10,37,64,0.07)]";
const cardHover =
  "transition duration-300 hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(10,37,64,0.06),0_18px_44px_rgba(10,37,64,0.12)]";

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("");
}

function QuoteCard({ item }: { item: Extract<Item, { kind: "quote" }> }) {
  const dark = item.featured;
  return (
    <figure
      data-reveal-item
      className={`relative rounded-brand border p-6 ${cardShadow} ${cardHover} ${
        dark
          ? "bg-[#0b0d12] border-[#0b0d12] text-white"
          : "bg-white border-line/70 hover:border-accent/35"
      }`}
    >
      <svg
        width="26"
        height="20"
        viewBox="0 0 26 20"
        fill="currentColor"
        aria-hidden
        className={dark ? "text-white/25" : "text-accent/30"}
      >
        <path d="M0 20V11.6C0 4.9 3.7 1 10.4 0l1.2 3.1c-3.6.9-5.4 2.8-5.6 5.9H11V20H0zm15 0V11.6C15 4.9 18.7 1 25.4 0l.6 3.1c-3.6.9-5.4 2.8-5.6 5.9H26V20H15z" opacity=".9" transform="scale(0.95)" />
      </svg>
      <blockquote
        className={`mt-3 font-display tracking-tight ${
          dark ? "text-xl md:text-[1.35rem] leading-snug" : "text-[17px] leading-snug"
        }`}
      >
        {item.q}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="relative size-9 shrink-0 overflow-hidden rounded-full">
          {item.avatar ? (
            <Image src={item.avatar} alt="" fill sizes="36px" className="object-cover" />
          ) : (
            /* no headshot on file: plain black initials circle */
            <span className="absolute inset-0 flex items-center justify-center bg-[#0b0d12] text-[10px] font-semibold text-white/95">
              {initials(item.name)}
            </span>
          )}
        </span>
        <span>
          <span className="block text-sm font-medium">{item.name}</span>
          <span className={`block text-xs ${dark ? "text-white/55" : "text-muted"}`}>
            {item.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function ClipCard({ item }: { item: Extract<Item, { kind: "photo" }> }) {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  /* hover-to-play: muted clip fades in over the poster photo and loops;
     leaving pauses it. Reduced motion keeps the static poster. */
  const enter = () => {
    const v = vidRef.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.currentTime = 0;
    setPlaying(true);
    v.play().catch(() => setPlaying(false));
  };
  const leave = () => {
    vidRef.current?.pause();
    setPlaying(false);
  };

  return (
    <div
      data-reveal-item
      onMouseEnter={item.videoSrc ? enter : undefined}
      onMouseLeave={item.videoSrc ? leave : undefined}
      className={`group relative overflow-hidden rounded-brand border border-line/70 ${item.cls} ${cardShadow} ${cardHover}`}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
        className="object-cover transition duration-700 group-hover:scale-[1.045]"
      />
      {item.videoSrc && (
        <video
          ref={vidRef}
          src={item.videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 via-black/25 to-transparent"
      />
      <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 text-white">
        <span className="text-xs font-medium leading-tight [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">
          {item.caption}
        </span>
        {item.video && item.duration && (
          <span className="shrink-0 rounded-full bg-black/45 px-2 py-0.5 text-[11px] tabular-nums backdrop-blur">
            {item.duration}
          </span>
        )}
      </div>
      {item.video && (
        <span
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            playing ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-white/85 text-ink shadow-lg backdrop-blur transition duration-300 group-hover:scale-110 group-hover:bg-white">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M3.5 2v10l8.5-5-8.5-5z" />
            </svg>
          </span>
        </span>
      )}
    </div>
  );
}

export default function LoveWallV1() {
  const sectionRef = useRef<HTMLElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      colRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: DRIFT[i] },
          {
            y: -DRIFT[i],
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-soft border-y border-line">
      {/* faint aura washes so the wall doesn't sit on a flat field */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[6%] top-[12%] h-[440px] w-[440px] rounded-full blur-3xl"
          style={{ background: "var(--aura-a)" }}
        />
        <div
          className="absolute right-[4%] bottom-[8%] h-[400px] w-[400px] rounded-full blur-3xl"
          style={{ background: "var(--aura-b)" }}
        />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 py-28">
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight text-center">
            {loveWall.headline}
          </h2>
          <p className="mt-3 text-muted text-center">{loveWall.sub}</p>
        </Reveal>

        <Reveal
          staggerChildren={0.05}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 items-stretch"
        >
          {COLUMNS.map((column, ci) => (
            <div
              key={ci}
              ref={(el) => {
                colRefs.current[ci] = el;
              }}
              className="flex flex-col gap-5"
            >
              {column.map((item, i) =>
                item.kind === "quote" ? (
                  <QuoteCard key={i} item={item} />
                ) : (
                  <ClipCard key={i} item={item} />
                )
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
