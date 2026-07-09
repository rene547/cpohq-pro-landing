import Link from "next/link";
import { variants, type VariantId } from "@/lib/variants";

/* Review-only chrome so Joseph and Lucas can hop between directions.
   Deleted when a direction is picked. */
export default function VariantSwitcher({ current }: { current: VariantId }) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 rounded-full bg-black/80 text-white backdrop-blur px-2 py-1.5 shadow-xl">
      {variants.map((v) => (
        <Link
          key={v.id}
          href={`/${v.id}`}
          title={`${v.name}: ${v.note}`}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
            v.id === current ? "bg-white text-black" : "hover:bg-white/15"
          }`}
        >
          {v.id.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
