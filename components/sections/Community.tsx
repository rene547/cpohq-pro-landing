import { community } from "@/lib/content";
import Reveal from "@/components/Reveal";

/* Pylon-style split: narrative left, artifact stack right. */
export default function Community() {
  return (
    <section id={community.id} className="mx-auto max-w-6xl px-6 py-24 scroll-mt-16">
      <div className="grid md:grid-cols-2 gap-14 items-center">
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight">
            {community.headline}
          </h2>
          <p className="mt-4 text-lg text-muted max-w-md">{community.sub}</p>
          <ul className="mt-9 space-y-6">
            {community.points.map((p) => (
              <li key={p.title} className="max-w-md">
                <h3 className="font-medium">{p.title}</h3>
                <p className="text-muted mt-1">{p.line}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative h-[420px]" aria-hidden>
            <ArtifactCard
              className="absolute top-0 left-[8%] w-[70%] -rotate-2"
              title="Confidential conversation"
              lines={[82, 64, 74]}
              chip="Members only"
            />
            <ArtifactCard
              className="absolute top-[30%] right-0 w-[70%] rotate-1"
              title="Benchmark: AI adoption"
              lines={[58, 88, 40]}
              chip="2,400 data points"
            />
            <ArtifactCard
              className="absolute bottom-0 left-0 w-[70%] rotate-[1.5deg]"
              title="Playbook: AI-native org"
              lines={[76, 52, 66]}
              chip="Proprietary"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ArtifactCard({
  className,
  title,
  lines,
  chip,
}: {
  className: string;
  title: string;
  lines: number[];
  chip: string;
}) {
  return (
    <div className={`${className} rounded-brand bg-card border border-line shadow-lg p-5`}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">{title}</p>
        <span className="shrink-0 text-[10px] font-semibold rounded-full bg-soft border border-line text-muted px-2 py-0.5">
          {chip}
        </span>
      </div>
      <div className="mt-4 space-y-2.5">
        {lines.map((w, i) => (
          <div key={i} className="h-2 rounded-full bg-soft" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}
