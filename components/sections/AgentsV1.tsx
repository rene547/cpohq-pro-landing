import { agents } from "@/lib/content-v1";
import Reveal from "@/components/Reveal";

/* v1 fork of Agents.tsx. Copy is frozen (client: do not change wording);
   this is a visual pass only. The section sits in a large rounded card:
   copy on the left, an isometric tile field on the right. The field is one
   continuous 2D-projected grid (rotate + squash, labels counter-rotated
   back to level; no preserve-3d), masked at the edges so it reads as a
   cropped system surface. The blue You tile is the hero at the center and
   the seven agents sit on its neighboring cells, so the swarm reads as one
   connected grid. Raised tiles get thickness from an offset slab beneath
   the face. Motion: halo breathe on You, a faint staggered sheen rippling
   across the surface, tiny drift on agent tiles, small hover lifts.
   Reduced-motion goes still. All CSS, still a server component. */

const GRID = 7;
const CENTER = 3;
const SIDE = 15; /* tile side, % of field width (diamond is SIDE * sqrt2) */
const RATIO = 0.58; /* isometric vertical squash */
const GAP = 1.02; /* near-touching: the grid reads as one surface */
const ASPECT = 0.8; /* field height / width */

/* [row, col, label] -- a full-tile ring around the center: one cell of
   surface between every agent and You, so labels never crowd
   (south cell left open so the composition breathes) */
const AGENT_POS: [number, number, string][] = [
  [2, 2, "Org"],
  [1, 3, "Talent"],
  [2, 4, "Comp"],
  [3, 5, "Rec"],
  [5, 3, "Eng"],
  [4, 2, "L&D"],
  [3, 1, "Data"],
];

const DIAMOND = SIDE * Math.SQRT2;

const CELLS = Array.from({ length: GRID * GRID }, (_, i) => {
  const row = Math.floor(i / GRID);
  const col = i % GRID;
  const agentIdx = AGENT_POS.findIndex(([r, c]) => r === row && c === col);
  const isYou = row === CENTER && col === CENTER;
  return {
    key: `${row}-${col}`,
    label: agentIdx >= 0 ? AGENT_POS[agentIdx][2] : null,
    isYou,
    x: +(50 + (col - row) * (DIAMOND / 2) * GAP).toFixed(2),
    y: +(50 + ((row + col - 2 * CENTER) * (DIAMOND * RATIO) * GAP) / 2 / ASPECT).toFixed(2),
    /* lower rows paint over higher ones; the You tile floats above all */
    z: isYou ? 40 : (row + col) * 2,
    /* the sheen ripples diagonally: delay follows the grid diagonal */
    sheenDelay: +((row + col) * 0.35).toFixed(2),
    /* de-synced drift so agent tiles never move in lockstep */
    bobDelay: agentIdx >= 0 ? +(-(agentIdx * 1.4)).toFixed(1) : 0,
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
      aria-label="A grid of tiles: seven AI agents surrounding one people leader"
    >
      <div className="v1a-field-glow" aria-hidden />
      {CELLS.map((t) => (
        <div
          key={t.key}
          className={"v1a-cell" + (t.isYou ? " v1a-cell-you" : "")}
          style={{ left: `${t.x}%`, top: `${t.y}%`, zIndex: t.z }}
        >
          <div
            className={"v1a-bob" + (t.label ? " v1a-bob-live" : "")}
            style={t.label ? { animationDelay: `${t.bobDelay}s` } : undefined}
          >
            <div className="v1a-block">
              {(t.label || t.isYou) && (
                <div
                  className={"v1a-depth" + (t.isYou ? " v1a-depth-you" : "")}
                />
              )}
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
                ) : (
                  <span
                    className="v1a-sheen"
                    style={{ animationDelay: `${t.sheenDelay}s` }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
