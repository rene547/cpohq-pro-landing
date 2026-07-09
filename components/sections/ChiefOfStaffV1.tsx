import { chiefOfStaff } from "@/lib/content-v1";
import Reveal from "@/components/Reveal";
import AsciiField from "@/components/AsciiField";

/* v0 chief of staff: Bond's "to-do list you've been dreaming of" grammar --
   big headline + short lead, then alternating text/visual rows. Visuals are
   black cards carrying the hero's faint ASCII texture (white) with a blue
   glow rising from the bottom, one product mock per point. */

export default function ChiefOfStaffV1() {
  const rows = [
    { point: chiefOfStaff.points[0], visual: <BriefMock /> },
    { point: chiefOfStaff.points[1], visual: <DraftMock /> },
    { point: chiefOfStaff.points[2], visual: <ContextMock /> },
  ];

  return (
    <section id={chiefOfStaff.id} className="scroll-mt-16 bg-soft border-y border-line">
      <div className="mx-auto max-w-[1200px] px-6 py-28">
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight max-w-2xl">
            {chiefOfStaff.headline}
          </h2>
          <p className="mt-5 text-lg text-muted max-w-xl">{chiefOfStaff.sub}</p>
        </Reveal>

        <div className="mt-20 space-y-24">
          {rows.map(({ point, visual }, i) => (
            <Reveal key={point.title}>
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div className={i % 2 ? "md:order-2" : ""}>
                  <h3 className="font-display text-2xl md:text-3xl tracking-tight">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-muted leading-relaxed max-w-sm">{point.line}</p>
                </div>
                <DarkCard order={i % 2 ? "md:order-1" : ""}>{visual}</DarkCard>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function DarkCard({ children, order }: { children: React.ReactNode; order: string }) {
  return (
    <div
      className={`${order} relative overflow-hidden rounded-[24px] bg-[#0b0d12] min-h-[360px] flex items-center justify-center p-8 shadow-[0_24px_60px_-24px_rgba(11,13,18,0.5)]`}
    >
      <AsciiField
        className="absolute inset-0 h-full w-full"
        color="255, 255, 255"
        baseAlpha={0.07}
      />
      {/* blue horizon glow, the Bond amber recolored */}
      <div
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[130%] h-48 blur-2xl"
        style={{ background: "radial-gradient(ellipse at center, rgba(51,108,240,0.5), transparent 70%)" }}
        aria-hidden
      />
      <div className="relative w-full max-w-sm">{children}</div>
    </div>
  );
}

/* ---- mock 1: the morning brief ---- */
function BriefMock() {
  const { mock } = chiefOfStaff;
  return (
    <div className="rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur p-5">
      <p className="text-white/90 font-medium">{mock.greeting}</p>
      <p className="text-white/45 text-xs mt-0.5">{mock.subline}</p>
      <ul className="mt-4 space-y-2">
        {mock.todos.map((t) => (
          <li
            key={t.label}
            className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.06] px-3 py-2.5"
          >
            <span className="flex items-center gap-2.5 text-xs text-white/80">
              <span className="size-3.5 rounded border border-white/25" aria-hidden />
              {t.label}
            </span>
            <span className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-semibold rounded-full bg-[#336CF0]/30 text-[#9db9ff] px-2 py-0.5">
                {t.tag}
              </span>
              <span className="text-[10px] text-white/35">{t.source}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---- mock 2: the draft, ready for your pass ---- */
function DraftMock() {
  const widths = ["82%", "94%", "71%", "88%", "45%"];
  return (
    <div className="rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-white/90 font-medium text-sm">Draft · Board update</p>
        <span className="text-[10px] text-white/35">2 min ago</span>
      </div>
      <div className="mt-4 space-y-2.5">
        {widths.map((w, i) => (
          <div key={i} className="h-2 rounded-full bg-white/12" style={{ width: w }} />
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium rounded-full bg-emerald-400/15 text-emerald-300 px-2.5 py-1">
          <span className="size-1.5 rounded-full bg-emerald-300" aria-hidden />
          Ready for your pass
        </span>
        <span className="text-[10px] text-white/35">Slides attached</span>
      </div>
    </div>
  );
}

/* ---- mock 3: knows your org ---- */
function ContextMock() {
  const goals = [
    { label: "Close exec comp review", done: true },
    { label: "Ship AI enablement rollout", done: true },
    { label: "Q3 engagement survey", done: false },
  ];
  return (
    <div className="rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur p-5">
      <p className="text-white/90 font-medium text-sm">Your context</p>
      <p className="text-white/45 text-xs mt-0.5">Goals this quarter</p>
      <ul className="mt-4 space-y-2">
        {goals.map((g) => (
          <li key={g.label} className="flex items-center gap-2.5 rounded-lg bg-white/[0.06] px-3 py-2.5 text-xs text-white/80">
            <span
              className={`size-3.5 rounded flex items-center justify-center ${
                g.done ? "bg-[#336CF0]" : "border border-white/25"
              }`}
              aria-hidden
            >
              {g.done && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4.2l1.8 1.8 3.2-4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            {g.label}
          </li>
        ))}
      </ul>
      <p className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium rounded-full bg-amber-400/15 text-amber-300 px-2.5 py-1">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
          <path d="M5 1L9.3 8.5H0.7L5 1z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
        </svg>
        Slipping: engagement survey is 6 days behind
      </p>
    </div>
  );
}
