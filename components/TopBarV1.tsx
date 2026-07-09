"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { investorBanner } from "@/lib/content-v1";

/* v1 investor bar: sits above the navbar inside Landing's sticky stack and
   collapses once the hero ([data-hero]) scrolls out of view. Collapsing
   shrinks the document above the trigger point, which gives the reappear
   threshold a natural 40px hysteresis -- no flicker at the boundary. */

const FIRMS: { name: string; file: string; height: string }[] = [
  { name: "EQT", file: "eqt.svg", height: "h-[13px]" },
  { name: "Menlo Ventures", file: "menlo-ventures-white.svg", height: "h-4" },
];

/* near-black, not pure #000 -- reads as black without the harshness */
const BAR_BG = "#0b0d12";

const ANGELS = ["adam-grant.jpg", "investor-2.jpg"];

export default function TopBarV1() {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    const onScroll = () => {
      if (hero) setPast(hero.getBoundingClientRect().bottom <= 0);
      else setPast(window.scrollY > window.innerHeight * 0.65);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={past}
      style={{ backgroundColor: BAR_BG }}
      className={`overflow-hidden transition-[height] duration-300 ease-out motion-reduce:transition-none ${
        past ? "h-0" : "h-10"
      }`}
    >
      <div className="mx-auto flex h-10 max-w-[1200px] items-center justify-center gap-3 px-6">
        <div className="flex shrink-0 -space-x-1.5">
          {ANGELS.map((file) => (
            <Image
              key={file}
              src={`/investors/${file}`}
              alt=""
              width={22}
              height={22}
              className="rounded-full ring-2 ring-[#0b0d12]"
            />
          ))}
        </div>
        <p className="whitespace-nowrap text-xs text-white/85 sm:text-sm">
          {investorBanner.line}
        </p>
        <span className="hidden h-4 w-px bg-white/25 sm:block" aria-hidden />
        <div className="hidden items-center gap-4 sm:flex">
          {FIRMS.map((f) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={f.name}
              src={`/investors/${f.file}`}
              alt={f.name}
              className={`${f.height} w-auto`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
