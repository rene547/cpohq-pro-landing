import { agents } from "@/lib/content-v1";
import Reveal from "@/components/Reveal";

/* v1 fork of Agents.tsx. Copy is frozen (client: do not change wording);
   the graphic follows the client spec exactly: AgentSwarmIsometric is an
   iso-stage holding one plane rotated into isometric perspective with
   rotateX(55deg) rotateZ(-45deg). The plane is deliberately FLAT (no
   preserve-3d), so it projects to a single 2D matrix: paint order is DOM
   order and nothing can z-fight. Tiles are absolutely positioned on a
   5x5 grid in plane space; labels live inside their tiles and apply the
   exact 2D inverse of the plane projection (rotate(45deg) scaleY(1/cos55))
   so they render level and crisp and move with their tile. The blue You
   tile is the hero at the center; seven agents sit on the compass cells
   around it. CSS keyframes only: pulsing glow on You, gentle float on
   agents, small hover lifts. Reduced-motion goes still. Server component. */

const GRID = 5;
const TILE = 18; /* tile side, % of plane */
const PITCH = 20; /* cell pitch, % of plane */
const YOU = { row: 2, col: 2, size: 24 };

/* Client-specified compass layout around the center. Screen directions
   under rotateX(55deg) rotateZ(-45deg), starting from (r, c):
   N=(r-1,c+1)  NE=(r,c+1)  E=(r+1,c+1)  SE=(r+1,c)
   S=(r+1,c-1)  SW=(r,c-1)  W=(r-1,c-1)  (NW left empty) */
const AGENTS: { row: number; col: number; label: string }[] = [
  { row: 1, col: 3, label: "Org" } /*    top          */,
  { row: 2, col: 3, label: "Talent" } /* top-right    */,
  { row: 3, col: 3, label: "Rec" } /*    right        */,
  { row: 3, col: 2, label: "Eng" } /*    bottom-right */,
  { row: 3, col: 1, label: "L&D" } /*    bottom       */,
  { row: 2, col: 1, label: "Data" } /*   bottom-left  */,
  { row: 1, col: 1, label: "Comp" } /*   left         */,
];

/* center a tile of the given size inside its pitch cell */
const cellStyle = (row: number, col: number, size = TILE) => ({
  left: `${col * PITCH + (PITCH - size) / 2}%`,
  top: `${row * PITCH + (PITCH - size) / 2}%`,
  width: `${size}%`,
  height: `${size}%`,
});

/* base cells painted back-to-front (screen depth is row - col); the You
   tile is appended last so the hero always paints on top */
const BASE_CELLS = Array.from({ length: GRID * GRID }, (_, i) => {
  const row = Math.floor(i / GRID);
  const col = i % GRID;
  const agentIdx = AGENTS.findIndex((a) => a.row === row && a.col === col);
  return {
    key: `${row}-${col}`,
    row,
    col,
    label: agentIdx >= 0 ? AGENTS[agentIdx].label : null,
    /* de-synced float so agent tiles never move in lockstep */
    delay: agentIdx >= 0 ? +(-(agentIdx * 1.3)).toFixed(1) : 0,
  };
})
  .filter((c) => !(c.row === YOU.row && c.col === YOU.col))
  .sort((a, b) => a.row - a.col - (b.row - b.col) || a.row - b.row);

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
            <AgentSwarmIsometric />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function AgentSwarmIsometric() {
  return (
    <div
      className="v1a-stage"
      role="img"
      aria-label="An isometric tile field: seven AI agents arranged around one people leader"
    >
      <div className="v1a-plane" aria-hidden>
        {BASE_CELLS.map((t) => (
          <div key={t.key} className="v1a-cell" style={cellStyle(t.row, t.col)}>
            {t.label ? (
              <div className="v1a-float" style={{ animationDelay: `${t.delay}s` }}>
                <div className="v1a-tile v1a-tile-agent">
                  <span className="v1a-tag">
                    <span className="v1a-tag-dot" />
                    {t.label}
                  </span>
                </div>
              </div>
            ) : (
              <div className="v1a-tile" />
            )}
          </div>
        ))}

        {/* glow sits under the hero, over the field */}
        <div className="v1a-you-glow" />
        <div className="v1a-cell" style={cellStyle(YOU.row, YOU.col, YOU.size)}>
          <div className="v1a-tile v1a-tile-you">
            <span className="v1a-tag v1a-tag-you">You</span>
          </div>
        </div>
      </div>
    </div>
  );
}
