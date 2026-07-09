import { agents } from "@/lib/content-v1";
import Reveal from "@/components/Reveal";

/* v1 fork of Agents.tsx. Copy is frozen (client: do not change wording);
   this is a visual pass only. The section sits in a large rounded card:
   copy on the left, an isometric tile field on the right. The field is a
   2D projection (rotate + squash, labels counter-rotated back to level),
   not preserve-3d, so paint order is deterministic and text stays crisp.
   Motion is minimal: the blue You tile's halo breathes, agent tiles drift
   gently, tiles lift a touch on hover. Reduced-motion goes still. All CSS,
   still a server component. */

const GRID = 5;
const CENTER = 2;
const SIDE = 13; /* tile side, % of field width (diamond is SIDE * sqrt2) */
const RATIO = 0.58; /* isometric vertical squash */
const GAP = 1.08; /* spacing factor between tile centers */
const ASPECT = 0.78; /* field height / width */

/* [row, col, label] -- a balanced ring around the center tile */
const AGENT_POS: [number, number, string][] = [
  [1, 0, "Comp"],
  [0, 1, "Org"],
  [0, 3, "Talent"],
  [3, 0, "Data"],
  [1, 4, "Rec"],
  [4, 1, "Eng"],
  [3, 3, "L&D"],
];

const DIAMOND = SIDE * Math.SQRT2;

const CELLS = Array.from({ length: GRID * GRID }, (_, i) => {
  const row = Math.floor(i / GRID);
  const col = i % GRID;
  const agentIdx = AGENT_POS.findIndex(([r, c]) => r === row && c === col);
  const isYou = row === CENTER && col === CENTER;
  const dist = Math.hypot(row - CENTER, col - CENTER);
  return {
    key: `${row}-${col}`,
    label: agentIdx >= 0 ? AGENT_POS[agentIdx][2] : null,
    isYou,
    x: +(50 + (col - row) * (DIAMOND / 2) * GAP).toFixed(2),
    y: +(50 + ((row + col - 2 * CENTER) * (DIAMOND * RATIO) * GAP) / 2 / ASPECT).toFixed(2),
    /* lower rows paint over higher ones; the You tile floats above all */
    z: isYou ? 10 : row + col,
    /* empty tiles fade toward the edges of the field */
    fade: isYou || agentIdx >= 0 ? 1 : +Math.max(0.35, 1 - dist * 0.22).toFixed(2),
    /* de-synced drift so agent tiles never move in lockstep */
    delay: agentIdx >= 0 ? +(-(agentIdx * 1.2)).toFixed(1) : 0,
  };
});

export default function AgentsV1() {
  return (
    <section id={agents.id} className="v1a mx-auto max-w-6xl px-6 py-28 scroll-mt-16">
      <div className="v1a-card">
        <div className="relative grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal delay={0.05} staggerChildren={0.09}>
            <h2
              data-reveal-item
              className="font-display text-3xl md:text-4xl tracking-tight text-balance"
            >
              {agents.headline}
            </h2>
            <p data-reveal-item className="mt-4 text-lg text-muted max-w-md">
              {agents.sub}
            </p>
            <ul className="v1a-points mt-9">
              {agents.points.map((p) => (
                <li key={p.title} data-reveal-item className="v1a-point">
                  <span className="v1a-mark" aria-hidden>
                    <span className="v1a-mark-dot" />
                  </span>
                  <div className="v1a-point-body">
                    <h3 className="v1a-point-title">{p.title}</h3>
                    <p className="v1a-point-line">{p.line}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <IsoField />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function IsoField() {
  return (
    <div
      className="v1a-field"
      role="img"
      aria-label="Seven AI agents arranged around one people leader"
    >
      <div className="v1a-field-glow" aria-hidden />
      {CELLS.map((t) => (
        <div
          key={t.key}
          className={"v1a-cell" + (t.isYou ? " v1a-cell-you" : "")}
          style={
            {
              left: `${t.x}%`,
              top: `${t.y}%`,
              zIndex: t.z,
              "--fade": t.fade,
            } as React.CSSProperties
          }
        >
          <div
            className={"v1a-bob" + (t.label ? " v1a-bob-live" : "")}
            style={t.label ? { animationDelay: `${t.delay}s` } : undefined}
          >
            <div
              className={
                "v1a-tile" +
                (t.isYou ? " v1a-tile-you" : t.label ? " v1a-tile-agent" : "")
              }
            >
              {t.isYou ? (
                <span className="v1a-label v1a-label-you">You</span>
              ) : t.label ? (
                <span className="v1a-label">
                  <span className="v1a-label-dot" />
                  {t.label}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
