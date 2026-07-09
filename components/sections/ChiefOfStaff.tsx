"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { chiefOfStaff } from "@/lib/content";
import type { Variant } from "@/lib/variants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* The Bond steal: narrated scroll on the left, pinned morning-brief on the right. */
export default function ChiefOfStaff({ variant }: { variant: Variant }) {
  const ref = useRef<HTMLElement>(null);
  const dark = variant.darkCos;

  useGSAP(
    () => {
      const points = gsap.utils.toArray<HTMLElement>("[data-cos-point]");
      points.forEach((point) => {
        gsap.fromTo(
          point,
          { opacity: 0.5 },
          {
            opacity: 1,
            duration: 0.3,
            scrollTrigger: {
              trigger: point,
              start: "top 65%",
              end: "bottom 35%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <section
      id={chiefOfStaff.id}
      ref={ref}
      className={`scroll-mt-16 ${dark ? "bg-dark text-dark-ink" : "bg-soft border-y border-line"}`}
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl md:text-5xl tracking-tight">
            {chiefOfStaff.headline}
          </h2>
          <p className={`mt-4 text-lg ${dark ? "text-dark-muted" : "text-muted"}`}>
            {chiefOfStaff.sub}
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-14">
          <div>
            {chiefOfStaff.points.map((p) => (
              <div
                key={p.title}
                data-cos-point
                className="md:min-h-[45vh] flex flex-col justify-center py-10 md:py-0"
              >
                <h3 className="font-display text-2xl">{p.title}</h3>
                <p className={`mt-3 max-w-sm leading-relaxed ${dark ? "text-dark-muted" : "text-muted"}`}>
                  {p.line}
                </p>
              </div>
            ))}
          </div>

          <div className="hidden md:block">
            <div className="sticky top-28">
              <BriefCard dark={dark} />
            </div>
          </div>

          <div className="md:hidden">
            <BriefCard dark={dark} />
          </div>
        </div>
      </div>
    </section>
  );
}

function BriefCard({ dark }: { dark: boolean }) {
  const { mock } = chiefOfStaff;
  return (
    <div
      className={`rounded-brand p-7 shadow-2xl ${
        dark ? "bg-white/[0.04] border border-white/10" : "bg-card border border-line"
      }`}
    >
      <p className="font-display text-2xl">{mock.greeting}</p>
      <p className={`mt-1 text-sm ${dark ? "text-dark-muted" : "text-muted"}`}>{mock.subline}</p>
      <ul className="mt-6 space-y-3">
        {mock.todos.map((t) => (
          <li
            key={t.label}
            className={`flex items-center justify-between gap-4 rounded-[calc(var(--radius)*0.6)] px-4 py-3 ${
              dark ? "bg-white/[0.05]" : "bg-soft"
            }`}
          >
            <span className="flex items-center gap-3 text-sm">
              <span
                className={`w-4 h-4 rounded border ${dark ? "border-white/25" : "border-line"}`}
                aria-hidden
              />
              {t.label}
            </span>
            <span className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-semibold rounded-full bg-accent/15 text-accent px-2 py-0.5">
                {t.tag}
              </span>
              <span className={`text-[10px] ${dark ? "text-dark-muted" : "text-muted"}`}>
                {t.source}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <p className={`mt-5 text-xs ${dark ? "text-dark-muted" : "text-muted"}`}>
        Built for you every morning, from your Slack, email, and meetings.
      </p>
    </div>
  );
}
