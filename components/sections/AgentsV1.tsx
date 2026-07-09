import { agents } from "@/lib/content-v1";
import Reveal from "@/components/Reveal";

/* v1 fork of Agents.tsx. Copy is frozen (client: do not change wording);
   this is a visual uplift only. The diagram is an isometric tile field:
   a receding plane of frosted tiles, one glowing brand-blue "You" tile at
   the center, and seven raised agent tiles around it. Labels stand upright
   over their tiles. Tiles wake and lift under the cursor; the whole plane
   leans up slightly on hover. Slow at idle, reacts on hover; reduced-motion
   goes still. All motion is CSS -- this stays a server component. */

const GRID = 7;
const CENTER = 3;

/* [row, col, label] -- a loose ring around the center tile */
const AGENT_POS: [number, number, string][] = [
  [1, 2, "Comp"],
  [1, 4, "Org"],
  [2, 5, "Talent"],
  [4, 5, "Rec"],
  [5, 3, "Eng"],
  [4, 1, "L&D"],
  [2, 1, "Data"],
];

const TILES = Array.from({ length: GRID * GRID }, (_, i) => {
  const row = Math.floor(i / GRID);
  const col = i % GRID;
  const agentIdx = AGENT_POS.findIndex(([r, c]) => r === row && c === col);
  const isYou = row === CENTER && col === CENTER;
  const dist = Math.hypot(row - CENTER, col - CENTER);
  return {
    key: `${row}-${col}`,
    label: agentIdx >= 0 ? AGENT_POS[agentIdx][2] : null,
    isYou,
    /* empty tiles fade toward the edges of the field */
    fade: isYou || agentIdx >= 0 ? 1 : +Math.max(0.4, 1 - dist * 0.13).toFixed(2),
    /* de-synced idle pulse so the agent dots never blink in lockstep */
    delay: agentIdx >= 0 ? +(-(agentIdx * 1.3)).toFixed(1) : 0,
  };
});

export default function AgentsV1() {
  return (
    <section
      id={agents.id}
      className="v1a relative overflow-hidden mx-auto max-w-6xl px-6 py-28 scroll-mt-16"
    >
      <div className="v1a-aura aura" aria-hidden />
      <div className="relative grid md:grid-cols-2 gap-14 items-center">
        <Reveal className="order-2 md:order-1">
          <IsoGrid />
        </Reveal>

        <Reveal delay={0.1} staggerChildren={0.09} className="order-1 md:order-2">
          <h2
            data-reveal-item
            className="font-display text-3xl md:text-5xl tracking-tight text-balance"
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
      </div>
    </section>
  );
}

function IsoGrid() {
  return (
    <div
      className="v1a-iso-scene"
      role="img"
      aria-label="A grid of tiles: seven AI agents arranged around one people leader"
    >
      <div className="v1a-iso-plane" aria-hidden>
        {TILES.map((t) => (
          <div
            key={t.key}
            className={
              "v1a-tile" +
              (t.isYou ? " v1a-tile-you" : t.label ? " v1a-tile-agent" : "")
            }
            style={{ "--fade": t.fade } as React.CSSProperties}
          >
            {t.label ? (
              <span className="v1a-tag">
                <span
                  className="v1a-tag-dot"
                  style={{ animationDelay: `${t.delay}s` }}
                />
                {t.label}
              </span>
            ) : null}
          </div>
        ))}
      </div>
      {/* screen-space overlay: keeps the label clear of 3D plane sorting */}
      <span className="v1a-tag-you" aria-hidden>
        You
      </span>
    </div>
  );
}
