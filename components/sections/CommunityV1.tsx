import { community } from "@/lib/content-v1";
import Reveal from "@/components/Reveal";
import AsciiField from "@/components/AsciiField";

/* v0 community: narrative left, staggered glass artifact cards right,
   floating over pastel blur blobs and the hero's faint ASCII texture
   (no beam), per Rene's annotated mock. */

type Artifact = {
  title: string;
  line: string;
  badge: string;
  badgeTone: "purple" | "blue";
  icon: React.ReactNode;
  badgeIcon: React.ReactNode;
  offset: string;
};

const iconStroke = { stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };

const ARTIFACTS: Artifact[] = [
  {
    title: "Confidential conversations",
    line: "Zero-leak spaces to ask what you can't ask anywhere else.",
    badge: "Members only",
    badgeTone: "purple",
    offset: "md:mr-16",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
        <rect x="5" y="10" width="12" height="8.5" rx="2" {...iconStroke} />
        <path d="M7.5 10V7.5a3.5 3.5 0 017 0V10M11 13.5v2" {...iconStroke} />
      </svg>
    ),
    badgeIcon: (
      <svg width="13" height="13" viewBox="0 0 13 13" aria-hidden>
        <circle cx="4.6" cy="4.6" r="2" {...iconStroke} strokeWidth="1.2" />
        <path d="M1.5 11c.4-2 1.6-3 3.1-3s2.7 1 3.1 3M8.6 5.4a1.9 1.9 0 100-3.4M9.4 8.2c1.2.2 2 1.1 2.3 2.6" {...iconStroke} strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    title: "Benchmark: AI adoption",
    line: "Comp, org design, and AI adoption data straight from peers.",
    badge: "2,400 data points",
    badgeTone: "blue",
    offset: "md:ml-10 md:mr-6",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
        <path d="M6 17.5v-4M11 17.5v-8M16 17.5V4.5" {...iconStroke} strokeWidth="2.2" />
      </svg>
    ),
    badgeIcon: (
      <svg width="13" height="13" viewBox="0 0 13 13" aria-hidden>
        <circle cx="6.5" cy="6.5" r="1.4" fill="currentColor" />
        <circle cx="6.5" cy="1.8" r="1" fill="currentColor" opacity=".7" />
        <circle cx="6.5" cy="11.2" r="1" fill="currentColor" opacity=".7" />
        <circle cx="1.8" cy="6.5" r="1" fill="currentColor" opacity=".7" />
        <circle cx="11.2" cy="6.5" r="1" fill="currentColor" opacity=".7" />
      </svg>
    ),
  },
  {
    title: "Playbook: AI-native org",
    line: "The strategies top people leaders are actually running.",
    badge: "Proprietary",
    badgeTone: "purple",
    offset: "md:ml-20",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
        <path d="M11 5.5C9.5 4.2 7.5 3.8 4.5 4v13c3-.2 5 .2 6.5 1.5 1.5-1.3 3.5-1.7 6.5-1.5V4c-3-.2-5 .2-6.5 1.5zM11 5.5V18" {...iconStroke} />
      </svg>
    ),
    badgeIcon: (
      <svg width="13" height="13" viewBox="0 0 13 13" aria-hidden>
        <path d="M6.5 1.5l1.2 3.3 3.3 1.2-3.3 1.2-1.2 3.3-1.2-3.3-3.3-1.2 3.3-1.2z" fill="currentColor" />
        <circle cx="10.8" cy="10.8" r="1" fill="currentColor" opacity=".7" />
      </svg>
    ),
  },
];

const tones = {
  purple: "bg-[#f3efff] text-[#6d28d9]",
  blue: "bg-[#e8f1ff] text-[#2563eb]",
};

export default function CommunityV1() {
  return (
    <section id={community.id} className="relative scroll-mt-16 overflow-hidden">
      <AsciiField className="absolute inset-0 h-full w-full" baseAlpha={0.09} />
      <div className="relative mx-auto max-w-[1200px] px-6 py-28 grid md:grid-cols-[5fr_7fr] gap-14 items-center">
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight">
            {community.headline}
          </h2>
          <p className="mt-4 text-lg text-muted max-w-md">{community.sub}</p>
        </Reveal>

        <div className="relative">
          {/* pastel atmosphere behind the stack */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <span className="absolute -top-10 right-0 w-64 h-64 rounded-full bg-[#f8c8ec]/40 blur-3xl" />
            <span className="absolute top-1/3 -right-6 w-56 h-56 rounded-full bg-[#bcd6ff]/50 blur-3xl" />
            <span className="absolute -bottom-12 right-16 w-64 h-64 rounded-full bg-[#f3c9f0]/40 blur-3xl" />
          </div>

          <Reveal staggerChildren={0.14} className="relative flex flex-col gap-6">
            {ARTIFACTS.map((a) => (
              <div
                key={a.title}
                data-reveal-item
                className={`${a.offset} rounded-[22px] bg-white/80 backdrop-blur border border-white/70 shadow-[0_2px_6px_rgba(23,32,64,0.04),0_18px_44px_rgba(23,32,64,0.08)] p-6 md:p-7`}
              >
                <div className="flex items-start gap-5">
                  <span className="shrink-0 flex size-14 items-center justify-center rounded-full bg-[#f1edff] text-[#6d5ef8] shadow-[inset_0_0_0_1px_rgba(109,94,248,0.08)]">
                    {a.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-semibold tracking-tight">{a.title}</h3>
                    <p className="mt-1 text-muted leading-relaxed max-w-[34ch]">{a.line}</p>
                    <div className="mt-3 flex justify-end">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium ${tones[a.badgeTone]}`}>
                        {a.badgeIcon}
                        {a.badge}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
