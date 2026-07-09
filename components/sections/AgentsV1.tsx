import { agents } from "@/lib/content-v1";
import Reveal from "@/components/Reveal";

/* v1 fork of Agents.tsx. Copy is frozen (client: do not change wording);
   this is a visual uplift only -- the flat constellation became a bespoke
   agent-swarm: a gradient "You" hub, faint orbit rings, animated tethers,
   and frosted agent chips that settle and light their tether on hover.
   Motion stays slow at idle and reacts on hover; reduced-motion goes still. */

const HUB = { x: 50, y: 50 };
const RADIUS = 36;
/* labels mirror the v0 constellation nodes, order preserved */
const LABELS = ["Comp", "Org", "Talent", "Rec", "Eng", "L&D", "Data"];

const NODES = LABELS.map((label, i) => {
  const angle = (-90 + i * (360 / LABELS.length)) * (Math.PI / 180);
  return {
    label,
    x: +(HUB.x + RADIUS * Math.cos(angle)).toFixed(2),
    y: +(HUB.y + RADIUS * Math.sin(angle)).toFixed(2),
    /* de-synced idle float so the swarm never pulses in lockstep */
    delay: +(-(i * 0.9)).toFixed(2),
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
          <Swarm />
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

function Swarm() {
  return (
    <div className="v1a-swarm">
      <svg
        viewBox="0 0 100 100"
        role="img"
        aria-label="A swarm of AI agents connected to one people leader"
        className="v1a-svg"
      >
        <defs>
          <radialGradient id="v1a-hub" cx="42%" cy="36%" r="72%">
            <stop offset="0%" stopColor="#6f97ff" />
            <stop offset="55%" stopColor="#336cf0" />
            <stop offset="100%" stopColor="#1f47b8" />
          </radialGradient>
          <filter id="v1a-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* faint orbit rings */}
        <circle className="v1a-ring" cx="50" cy="50" r="24" />
        <circle className="v1a-ring v1a-ring-spin" cx="50" cy="50" r={RADIUS} />

        {/* tethers, drawn under the chips */}
        {NODES.map((n) => (
          <line
            key={`l-${n.label}`}
            className="v1a-tether"
            x1={HUB.x}
            y1={HUB.y}
            x2={n.x}
            y2={n.y}
          />
        ))}

        {/* central hub */}
        <g className="v1a-hub" filter="url(#v1a-glow)">
          <circle cx={HUB.x} cy={HUB.y} r="11" fill="url(#v1a-hub)" />
          <circle
            cx={HUB.x}
            cy={HUB.y}
            r="11"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.35"
            strokeWidth="0.5"
          />
          <text
            x={HUB.x}
            y={HUB.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#ffffff"
            fontSize="5"
            fontWeight={600}
          >
            You
          </text>
        </g>

        {/* agent chips */}
        {NODES.map((n) => (
          <g key={`n-${n.label}`} className="v1a-node">
            <line
              className="v1a-tether v1a-tether-live"
              x1={HUB.x}
              y1={HUB.y}
              x2={n.x}
              y2={n.y}
            />
            <g
              className="v1a-float"
              style={{ animationDelay: `${n.delay}s` }}
            >
              <g className="v1a-chip">
                <rect
                  x={n.x - 9.5}
                  y={n.y - 4.6}
                  width="19"
                  height="9.2"
                  rx="4.6"
                  className="v1a-chip-box"
                />
                <circle
                  className="v1a-chip-dot"
                  cx={n.x - 5.4}
                  cy={n.y}
                  r="1.5"
                />
                <text
                  x={n.x + 1.4}
                  y={n.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="v1a-chip-label"
                  fontSize="4"
                  fontWeight={500}
                >
                  {n.label}
                </text>
              </g>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
