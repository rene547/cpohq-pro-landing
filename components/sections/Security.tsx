import { security } from "@/lib/content";
import Reveal from "@/components/Reveal";

export default function Security() {
  return (
    <section className="bg-soft border-y border-line">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-center max-w-2xl mx-auto">
            {security.headline}
          </h2>
        </Reveal>
        <Reveal staggerChildren={0.1} className="mt-12 grid gap-10 md:grid-cols-3">
          {security.points.map((p) => (
            <div key={p.title} data-reveal-item className="text-center max-w-xs mx-auto">
              <h3 className="font-medium">{p.title}</h3>
              <p className="text-muted mt-2 leading-relaxed">{p.line}</p>
            </div>
          ))}
        </Reveal>
        <Reveal className="mt-12 flex justify-center gap-4 flex-wrap">
          {security.badges.map((b) => (
            <span
              key={b}
              className="w-20 h-20 rounded-full border border-line bg-card flex items-center justify-center text-center text-[9px] font-semibold tracking-wide text-muted px-2"
            >
              {b}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
