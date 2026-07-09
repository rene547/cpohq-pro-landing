"use client";

import Image from "next/image";
import { useState } from "react";
import { hero, chiefOfStaff } from "@/lib/content";
import type { Variant } from "@/lib/variants";
import Reveal from "@/components/Reveal";

type HeroProps = {
  variant: Variant;
  onJoin: (email: string) => void;
};

export default function Hero({ variant, onJoin }: HeroProps) {
  const [email, setEmail] = useState("");
  const headline = variant.altHeadline ? hero.headlineAlt : hero.headline;
  const splitLayout = variant.heroArt === "photo" || variant.heroArt === "ui";

  return (
    <section className="relative overflow-hidden">
      {variant.heroArt === "dotgrid" && (
        <div className="absolute inset-0 dotgrid opacity-60" aria-hidden />
      )}
      {(variant.heroArt === "dotgrid" ||
        variant.heroArt === "gradient" ||
        variant.heroArt === "ui") && (
        <div className="absolute inset-0 aura" aria-hidden />
      )}

      <nav className="relative mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
        <Image
          src="/brand/cpohqlogo-horizontal-black.png"
          alt="CPOHQ"
          width={120}
          height={24}
          className="h-5 w-auto"
          priority
        />
        <button
          onClick={() => onJoin("")}
          className="rounded-brand border border-line bg-card px-4 py-2 text-sm font-medium hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-accent"
        >
          Join
        </button>
      </nav>

      <div
        className={`relative mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28 ${
          splitLayout ? "grid md:grid-cols-[7fr_5fr] gap-12 items-center" : ""
        }`}
      >
        <Reveal>
          <div className={splitLayout ? "" : "max-w-3xl"}>
            <h1 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight">
              {headline}
            </h1>
            <p className="mt-5 text-lg text-muted max-w-xl">{hero.sub}</p>

            <form
              className="mt-8 flex max-w-md gap-2"
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
                className="modal-field flex-1"
              />
              <button
                type="submit"
                className="rounded-brand bg-accent text-accent-ink px-6 py-3 font-medium hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {hero.cta}
              </button>
            </form>
            <p className="mt-3 text-sm text-muted">{hero.microcopy}</p>
          </div>
        </Reveal>

        {variant.heroArt === "photo" && (
          <Reveal delay={0.15} className="hidden md:block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-brand">
              <Image
                src="/photos/summit-panel.jpg"
                alt="CPOHQ members at Summit II"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        )}

        {variant.heroArt === "ui" && (
          <Reveal delay={0.15} className="hidden md:block">
            <MiniBrief />
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* Compact morning-brief mock reused as hero art in the product-forward variant */
function MiniBrief() {
  return (
    <div className="float-slow rounded-brand bg-card border border-line shadow-xl p-6">
      <p className="font-display text-xl">{chiefOfStaff.mock.greeting}</p>
      <p className="mt-1 text-sm text-muted">{chiefOfStaff.mock.subline}</p>
      <ul className="mt-4 space-y-2">
        {chiefOfStaff.mock.todos.map((t) => (
          <li
            key={t.label}
            className="flex items-center justify-between gap-3 rounded-[calc(var(--radius)*0.6)] bg-soft px-3 py-2.5"
          >
            <span className="text-sm">{t.label}</span>
            <span className="shrink-0 text-[10px] font-semibold rounded-full bg-accent/10 text-accent px-2 py-0.5">
              {t.tag}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
