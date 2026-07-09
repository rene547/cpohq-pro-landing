"use client";

import { talkToUs } from "@/lib/content";
import Reveal from "@/components/Reveal";

export default function TalkToUs({ onJoin }: { onJoin: () => void }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <div className="rounded-brand border border-line bg-card px-8 py-16 text-center shadow-sm">
          <h2 className="font-display text-3xl md:text-5xl tracking-tight max-w-2xl mx-auto">
            {talkToUs.headline}
          </h2>
          <p className="mt-4 text-muted">{talkToUs.sub}</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onJoin}
              className="rounded-brand bg-accent text-accent-ink px-7 py-3 font-medium hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {talkToUs.primary}
            </button>
            {talkToUs.secondary.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-sm font-medium underline underline-offset-4 decoration-line hover:decoration-ink focus-visible:outline-2 focus-visible:outline-accent rounded"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
