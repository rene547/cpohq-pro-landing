import Image from "next/image";
import { investorBanner } from "@/lib/content-v1";

/* v1 investor bar: sits above the navbar inside Landing's sticky stack and
   persists through the whole page (client call 2026-07-09; it previously
   collapsed after the hero). All firm logos render white on the brand blue. */

const FIRMS: { name: string; file: string; height: string }[] = [
  { name: "EQT", file: "eqt-white.svg", height: "h-[13px]" },
  { name: "Menlo Ventures", file: "menlo-ventures-white.svg", height: "h-4" },
  { name: "Accel", file: "accel-white.svg", height: "h-3.5" },
];

const ANGELS = [
  "adam-grant.jpg",
  "investor-2.jpg",
  "lorna-hagen.jpg",
  "nir-eyal.jpg",
];

/* brand blue (matches --accent in .theme-v1) */
const BAR_BG = "#336cf0";

export default function TopBarV1() {
  return (
    <div style={{ backgroundColor: BAR_BG }} className="h-10">
      <div className="mx-auto flex h-10 max-w-[1200px] items-center justify-center gap-3 px-6">
        <div className="flex shrink-0 -space-x-1.5">
          {ANGELS.map((file) => (
            <Image
              key={file}
              src={`/investors/${file}`}
              alt=""
              width={22}
              height={22}
              className="rounded-full ring-2 ring-[#336cf0]"
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
          <span className="text-xs text-white/70">+ 100s more</span>
        </div>
      </div>
    </div>
  );
}
