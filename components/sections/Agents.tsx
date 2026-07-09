import { agents } from "@/lib/content";
import Reveal from "@/components/Reveal";

/* Constellation lives here (Joseph: liked it, but not in the hero). */
export default function Agents() {
  return (
    <section id={agents.id} className="mx-auto max-w-6xl px-6 py-24 scroll-mt-16">
      <div className="grid md:grid-cols-2 gap-14 items-center">
        <Reveal className="order-2 md:order-1">
          <Constellation />
        </Reveal>

        <Reveal delay={0.1} className="order-1 md:order-2">
          <h2 className="font-display text-3xl md:text-5xl tracking-tight">
            {agents.headline}
          </h2>
          <p className="mt-4 text-lg text-muted max-w-md">{agents.sub}</p>
          <ul className="mt-9 space-y-6">
            {agents.points.map((p) => (
              <li key={p.title} className="max-w-md">
                <h3 className="font-medium">{p.title}</h3>
                <p className="text-muted mt-1">{p.line}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

const nodes = [
  { x: 200, y: 200, r: 30, label: "You" },
  { x: 78, y: 84, r: 17, label: "Comp" },
  { x: 210, y: 52, r: 15, label: "Org" },
  { x: 330, y: 96, r: 18, label: "Talent" },
  { x: 46, y: 236, r: 15, label: "Rec" },
  { x: 128, y: 330, r: 17, label: "Eng" },
  { x: 268, y: 340, r: 16, label: "L&D" },
  { x: 356, y: 250, r: 17, label: "Data" },
];

function Constellation() {
  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label="A network of AI agents connected to one people leader"
      className="w-full max-w-md mx-auto"
    >
      {nodes.slice(1).map((n, i) => (
        <line
          key={i}
          x1={nodes[0].x}
          y1={nodes[0].y}
          x2={n.x}
          y2={n.y}
          stroke="var(--accent)"
          strokeOpacity="0.35"
          strokeWidth="1"
          className="constellation-line"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={n.label} className={i % 2 ? "float-slow" : undefined}>
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="var(--card)"
            stroke={i === 0 ? "var(--accent)" : "var(--line)"}
            strokeWidth={i === 0 ? 1.5 : 1}
          />
          <text
            x={n.x}
            y={n.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill={i === 0 ? "var(--accent)" : "var(--muted)"}
            fontSize={i === 0 ? 13 : 10}
            fontWeight={i === 0 ? 600 : 500}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
