"use client";

import UnicornScene from "unicornstudio-react/next";
import { talkToUs } from "@/lib/content-v1";
import Reveal from "@/components/Reveal";

/* v0 closing CTA: the hero's Unicorn scene (same blue tint) runs behind the
   card, softened with a white wash so the type stays first. */
export default function TalkToUsV1({ onJoin }: { onJoin: () => void }) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] border border-line px-8 py-20 text-center shadow-sm">
          <div className="absolute inset-0" aria-hidden>
            <UnicornScene
              projectId="nJ0w2R0GbPeCwizm5cWx"
              width="100%"
              height="100%"
              scale={1}
              dpi={1.5}
              sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.6/dist/unicornStudio.umd.js"
              ariaLabel=""
              altText=""
            />
            <div className="unicorn-tint" />
            <div className="absolute inset-0 bg-white/55" />
          </div>

          <div className="relative">
            <h2 className="font-display text-3xl md:text-5xl tracking-tight max-w-2xl mx-auto">
              {talkToUs.headline}
            </h2>
            <p className="mt-4 text-muted">{talkToUs.sub}</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onJoin}
                className="rounded-full bg-accent text-accent-ink px-7 py-3 font-medium hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
        </div>
      </Reveal>
    </section>
  );
}
