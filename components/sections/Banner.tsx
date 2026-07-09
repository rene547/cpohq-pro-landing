import { investorBanner } from "@/lib/content";

/* Investor logos + angel headshots land here when Lucas sends them.
   Placeholder slots are styled to read as intentional in the meantime. */
export default function Banner() {
  return (
    <div className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <span className="text-sm text-muted">{investorBanner.line}</span>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2" aria-hidden>
            {["A", "B", "C", "D", "E"].map((c) => (
              <span
                key={c}
                className="w-6 h-6 rounded-full bg-soft border border-line flex items-center justify-center text-[10px] text-muted"
              >
                {c}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3" aria-hidden>
            {[16, 20, 14, 18].map((w, i) => (
              <span
                key={i}
                className="h-3 rounded-sm bg-soft border border-line"
                style={{ width: `${w * 4}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
