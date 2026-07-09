import { highlights } from "@/lib/content";
import Reveal from "@/components/Reveal";

const glyphs: Record<string, React.ReactNode> = {
  community: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="8" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="15" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  "chief-of-staff": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M4 11h9M4 6h14M4 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="15.5" r="2.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  agents: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="11" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="5" cy="15" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="15" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.8 6.8L6 13m6.2-6.2L16 13M7 15h8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
};

export default function Highlights() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal staggerChildren={0.12} className="grid gap-4 md:grid-cols-3">
        {highlights.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            data-reveal-item
            className="group rounded-brand border border-line bg-card p-7 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-accent"
          >
            <span className="text-accent">{glyphs[h.id]}</span>
            <h2 className="font-display text-xl mt-4">{h.title}</h2>
            <p className="mt-2 text-muted leading-relaxed">{h.line}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink/70 group-hover:text-accent transition">
              See how
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M2 6h8m0 0L6.5 2.5M10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        ))}
      </Reveal>
    </section>
  );
}
