"use client";

import Image from "next/image";
import { useState } from "react";
import { hero } from "@/lib/content";
import Reveal from "@/components/Reveal";

/* v0 hero: Stripe anatomy. Logo left, section links center, two pill CTAs
   right, stat line, two-tone headline, gradient ribbon sweeping the right. */

const navLinks = [
  { label: "Community", href: "#community" },
  { label: "AI Chief of Staff", href: "#chief-of-staff" },
  { label: "AI Agents", href: "#agents" },
  { label: "Careers", href: "#" },
];

const statLine = { label: "Chief People Officers inside:", value: "3,000+" };

const headline = {
  lead: "The #1 platform giving Chief People Officers AI superpowers.",
  tone: "A private community, an AI chief of staff, and a swarm of agents, from your first hire to your ten-thousandth.",
};

export default function HeroV0({ onJoin }: { onJoin: (email: string) => void }) {
  const [email, setEmail] = useState("");

  return (
    <section className="relative overflow-hidden">
      <div className="ribbon-wrap" aria-hidden>
        <div className="ribbon ribbon-3" />
        <div className="ribbon ribbon-1" />
        <div className="ribbon ribbon-2" />
      </div>

      <nav className="relative z-10 mx-auto max-w-6xl px-6 py-4 flex items-center gap-8">
        <a href="#" className="shrink-0" aria-label="CPOHQ home">
          <Image
            src="/brand/cpohqlogo-horizontal-black.png"
            alt="CPOHQ"
            width={120}
            height={24}
            className="h-5 w-auto"
            priority
          />
        </a>
        <div className="hidden md:flex flex-1 items-center justify-center gap-7">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-ink/80 hover:text-ink transition focus-visible:outline-2 focus-visible:outline-accent rounded"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="ml-auto md:ml-0 flex items-center gap-3 shrink-0">
          <a
            href="#"
            className="hidden sm:inline-flex rounded-full bg-white/80 backdrop-blur border border-line px-4 py-2 text-sm font-medium hover:border-ink/25 transition focus-visible:outline-2 focus-visible:outline-accent"
          >
            Talk to us
          </a>
          <button
            onClick={() => onJoin("")}
            className="rounded-full bg-accent text-accent-ink px-4 py-2 text-sm font-medium hover:opacity-90 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Join CPOHQ
          </button>
        </div>
      </nav>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-32 md:pt-32 md:pb-40">
        <Reveal>
          <p className="text-sm text-muted">
            {statLine.label}{" "}
            <span className="font-semibold text-accent">{statLine.value}</span>
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl md:text-[3.4rem] leading-[1.08] tracking-tight">
            {headline.lead}{" "}
            <span style={{ color: "var(--headline-tone)" }}>{headline.tone}</span>
          </h1>

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
