import Image from "next/image";
import { logoBar, logos } from "@/lib/content";
import type { Variant } from "@/lib/variants";

/* Full-bleed, per Joseph: stretch across the viewport, smaller logos, 2-3 rows. */
export default function LogoBar({ variant }: { variant: Variant }) {
  const half = Math.ceil(logos.length / 2);
  const rows = [logos.slice(0, half), logos.slice(half)];

  return (
    <section className="border-y border-line py-10 overflow-hidden">
      <p className="text-center text-sm text-muted mb-8">{logoBar.line}</p>

      {variant.logoMarquee ? (
        <div className="marquee space-y-6">
          {rows.map((row, i) => (
            <div key={i} className="overflow-hidden">
              <div className={`marquee-track gap-14 pr-14 ${i === 1 ? "reverse" : ""}`}>
                {[...row, ...row].map((logo, j) => (
                  <Image
                    key={`${logo.name}-${j}`}
                    src={logo.file}
                    alt={j < row.length ? logo.name : ""}
                    aria-hidden={j >= row.length}
                    width={90}
                    height={24}
                    className="h-5 w-auto shrink-0 opacity-55 grayscale hover:opacity-100 hover:grayscale-0 transition"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-x-10 gap-y-8 items-center">
          {logos.slice(0, 32).map((logo) => (
            <Image
              key={logo.name}
              src={logo.file}
              alt={logo.name}
              width={90}
              height={24}
              className="h-5 w-auto mx-auto opacity-55 grayscale"
            />
          ))}
        </div>
      )}
    </section>
  );
}
