"use client";

import { useState } from "react";
import { hero } from "@/lib/content";
import Reveal from "@/components/Reveal";

/* v0 hero: Stripe anatomy under the hive-shell navbar (rendered by Landing).
   Two-tone headline with "AI superpowers" carrying the gradient. */
export default function HeroV0({ onJoin }: { onJoin: (email: string) => void }) {
  const [email, setEmail] = useState("");

  return (
    <section className="relative overflow-hidden">
      <div className="ribbon-wrap" aria-hidden>
        <div className="ribbon ribbon-3" />
        <div className="ribbon ribbon-1" />
        <div className="ribbon ribbon-2" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-32 md:pt-32 md:pb-40">
        <Reveal>
          <h1 className="max-w-3xl font-display text-4xl md:text-[3.4rem] leading-[1.08] tracking-tight">
            The #1 platform giving 3,000+ Chief People Officers{" "}
            <span className="text-muted">(&amp; now their HR teams)</span>{" "}
            <span className="text-super">AI superpowers.</span>
          </h1>
          <p className="mt-6 text-lg text-muted max-w-xl">{hero.sub}</p>

          <form
            className="mt-9 flex max-w-md gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              onJoin(email);
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={hero.emailPlaceholder}
              aria-label={hero.emailPlaceholder}
              className="modal-field flex-1 bg-white/85 backdrop-blur"
            />
            <button
              type="submit"
              className="rounded-full bg-accent text-accent-ink px-6 py-3 font-medium hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {hero.cta}
            </button>
          </form>
          <p className="mt-3 text-sm text-muted">{hero.microcopy}</p>
        </Reveal>
      </div>
    </section>
  );
}
