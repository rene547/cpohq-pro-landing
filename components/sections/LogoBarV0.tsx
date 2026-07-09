"use client";

import { useEffect, useRef, useState } from "react";
import { logoBar } from "@/lib/content";

/* v0 logo bar: boxed grid ported from cpohq-site v2-redesign (v3-credgrid) --
   grayscale cells, per-logo radial brand glow on hover, one-shot color sweep
   when the grid crosses the 55% viewport line. Instead of a marquee, each row
   does a single quick one-cell shift every few seconds (top right, bottom
   left) and then rests, so it doesn't fight the animated hero. */

const VISIBLE = 8;
const STEP_MS = 3000;
const ACCENT = "#336CF0";

/* [name, file, brand color] -- strongest names front-loaded so the first
   visible window reads as the A-team. Unknown brand colors fall back to
   CPOHQ blue (hover still reveals the logo's true colors). */
const ROW_A: [string, string, string][] = [
  ["OpenAI", "OpenAI.svg", "#111111"],
  ["Anthropic", "Anthropic.svg", "#D97757"],
  ["Figma", "Figma.svg", "#A259FF"],
  ["Notion", "Notion.svg", "#111111"],
  ["Discord", "Discord.svg", "#5865F2"],
  ["Duolingo", "Duolingo.svg", "#58CC02"],
  ["McDonald's", "McDonald_s.svg", "#FFC72C"],
  ["Golden State Warriors", "Golden State Warriors.svg", "#1D428A"],
  ["Scale", "Scale.svg", "#111111"],
  ["Brex", "Brex.svg", "#F46A35"],
  ["Datadog", "Datadog.svg", "#632CA6"],
  ["Atlassian", "Atlassian.svg", "#0052CC"],
  ["Databricks", "Databricks.svg", "#FF3621"],
  ["GitHub", "GitHub.svg", "#24292F"],
  ["Zoom", "Zoom.svg", "#0B5CFF"],
  ["Cloudflare", "Cloudflare.svg", "#F6821F"],
  ["Airtable", "Airtable.svg", "#FCB400"],
  ["Asana", "Asana.svg", "#F06A6A"],
  ["Box", "Box.svg", "#0061D5"],
  ["Lyft", "Lyft.svg", "#FF00BF"],
  ["Glassdoor", "Glassdoor.svg", "#0CAA41"],
  ["Flipkart", "Flipkart.svg", "#2874F0"],
  ["Hulu", "Hulu.svg", "#1CE783"],
  ["Miro", "Miro.svg", "#FFD02F"],
  ["OpenTable", "OpenTable.svg", "#DA3743"],
  ["Riot Games", "Riot Games.svg", "#EB0029"],
  ["Segment", "Segment (with Twilio).svg", "#52BD94"],
  ["NASCAR", "NASCAR.svg", "#E4002B"],
  ["Chobani", "Chobani.svg", "#1A4731"],
  ["Condé Nast", "Condé Nast.svg", "#111111"],
  ["Allbirds", "Allbirds.svg", "#212121"],
];

const ROW_B: [string, string, string][] = [
  ["Twitch", "Twitch.svg", "#9146FF"],
  ["Calendly", "Calendly.svg", "#006BFF"],
  ["Confluent", "Confluent.svg", "#173361"],
  ["Eventbrite", "Eventbrite.svg", "#F05537"],
  ["Credit Karma", "Credit Karma.svg", "#008600"],
  ["Vercel", "Vercel.svg", "#111111"],
  ["Webflow", "Webflow.svg", "#4353FF"],
  ["Squarespace", "Squarespace.svg", "#111111"],
  ["Zapier", "Zapier.svg", "#FF4F00"],
  ["LaunchDarkly", "LaunchDarkly.svg", "#405BFF"],
  ["dbt Labs", "Dbt Labs.svg", "#FF694A"],
  ["Fivetran", "Fivetran.svg", ACCENT],
  ["Retool", "Retool.svg", ACCENT],
  ["Vanta", "Vanta.svg", "#111111"],
  ["Tailscale", "Tailscale.svg", "#111111"],
  ["Sweetgreen", "Sweetgreen.svg", "#00473C"],
  ["Liquid Death", "Liquid Death.svg", "#111111"],
  ["The North Face", "The North Face.svg", "#111111"],
  ["Warby Parker", "Warby Parker.svg", ACCENT],
  ["Allbirds", "Blue Bottle Coffee.svg", "#1F5AA6"],
  ["Peloton", "Peloton.svg", "#E01719"],
  ["MasterClass", "MasterClass.svg", "#E21836"],
  ["Oura", "Oura.svg", "#111111"],
  ["Hinge", "Hinge.svg", "#111111"],
  ["Square", "Square (Block).svg", "#111111"],
  ["WeWork", "WeWork.svg", "#111111"],
  ["Faire", "Faire.svg", "#111111"],
  ["Ibotta", "Ibotta.svg", ACCENT],
  ["Neuralink", "Neuralink.svg", "#111111"],
  ["Hudson River Trading", "Hudson River Trading.svg", ACCENT],
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function SteppedRow({
  items,
  reverse,
  tick,
  sweepBase,
}: {
  items: [string, string, string][];
  reverse: boolean;
  tick: number;
  sweepBase: number;
}) {
  const n = items.length;
  /* track holds two copies; shift is measured in cells */
  const [shift, setShift] = useState(reverse ? n : 0);
  const [anim, setAnim] = useState(true);
  const lastTick = useRef(tick);

  useEffect(() => {
    if (tick === lastTick.current) return;
    lastTick.current = tick;
    setAnim(true);
    setShift((s) => s + (reverse ? -1 : 1));
  }, [tick, reverse]);

  const onEnd = () => {
    if (!reverse && shift >= n) {
      setAnim(false);
      setShift(shift - n);
    } else if (reverse && shift <= 0) {
      setAnim(false);
      setShift(shift + n);
    }
  };

  const unit = 100 / (n * 2);
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        onTransitionEnd={onEnd}
        className="v0-logotrack grid grid-flow-col"
        style={{
          width: `${((n * 2) / VISIBLE) * 100}%`,
          gridAutoColumns: `${unit}%`,
          transform: `translateX(-${shift * unit}%)`,
          transition: anim ? "transform 0.65s cubic-bezier(0.22, 0.61, 0.2, 1)" : "none",
        }}
      >
        {doubled.map(([name, file, color], i) => (
          <div
            key={`${name}-${i}`}
            className="v0-logocell"
            style={
              {
                "--logo": color,
                "--d": `${(sweepBase + (i % VISIBLE) * 0.13).toFixed(2)}s`,
              } as React.CSSProperties
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/logos/${file}`} alt={i < n ? name : ""} aria-hidden={i >= n} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LogoBarV0({ colored = false }: { colored?: boolean }) {
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  /* one quick shift every few seconds, resting in between */
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setTick((t) => t + 1), STEP_MS);
    return () => clearInterval(id);
  }, [reduced]);

  /* one-shot color sweep when the grid crosses the 55% viewport line
     (ported from cpohq-site ScrollReveal) */
  useEffect(() => {
    const el = gridRef.current;
    if (!el || colored) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("swept");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -45% 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [colored]);

  return (
    <section className="py-14">
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="text-center text-sm text-muted mb-8">{logoBar.line}</p>
        <div
          ref={gridRef}
          className={`v0-logogrid ${colored ? "v0-colored" : ""} rounded-2xl border border-line overflow-hidden divide-y divide-line`}
        >
          <SteppedRow items={ROW_A} reverse tick={tick} sweepBase={0.35} />
          <SteppedRow items={ROW_B} reverse={false} tick={tick} sweepBase={0.55} />
        </div>
      </div>
    </section>
  );
}
