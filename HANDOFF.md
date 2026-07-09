# HANDOFF — CPOHQ Landing

Branch: `main`. Remote: https://github.com/rene547/cpohq-pro-landing (public).
Deploys are NOT wired to GitHub -- they go from a local checkout via Vercel CLI.
Latest commit: see `git log`. Production: https://cpohq-landing.vercel.app (Vercel project `cpohq-landing`).

## Build & run

```bash
npm install
npm run dev            # local dev
npm run build          # must pass before deploying
vercel deploy --prod --yes   # deploy (Vercel CLI, already linked)
```

## Structure — the one rule

- **`/v0` is the approved, frozen baseline. Do not edit anything it renders.**
- **`/v1` is the working fork. All client feedback lands here.**
- V1 has its own copies of everything that may change:
  - Sections: `components/sections/*V1.tsx` (Hero, LogoBar, HighlightCards, LoveWall, Community, ChiefOfStaff, TalkToUs)
  - Copy: `lib/content-v1.ts`
  - Theme tokens: `.theme-v1` in `app/globals.css`
- Still **shared** between v0 and v1 (fork into a V1 copy BEFORE editing if feedback touches them): `Agents.tsx`, `Security.tsx`, `components/AsciiField.tsx`, `components/Strands.tsx`, `components/ShellNavbar.tsx`, `components/Reveal.tsx`, `JoinModal.tsx`, and the `v0-*` / `cos-*` / `avatar-orb` CSS blocks in `globals.css`. (`Footer.tsx` was forked to `FooterV1.tsx` 2026-07-09.)

## What's done

Full v0 page approved and frozen: Stripe-anatomy hero with Unicorn Studio scene (blue hue-tint), hive-shell frosted navbar (1200px content, logo +20%), boxed logo grid with stepped shift + hover brand glow + one-shot sweep (ported from cpohq-site v2-redesign), three highlight cards (portrait sphere / open Strands / Outpace avatar orbs), flush-bottom masonry love wall, community glass cards over faint ASCII field, Bond-style chief-of-staff rows with black ASCII cards, Agents constellation, security, shader-backed CTA, outlined-wordmark footer.

## V1 feedback applied so far (2026-07-09)

- Logo grid: logos fixed in their real brand colors, no hover glow, no color sweep (`v1-logofixed` in globals.css; stepped shift kept).
- Investor top bar above the navbar: "Backed by the world's best investors." with two angel pfps + EQT and Menlo Ventures logos (`components/TopBarV1.tsx`, assets in `public/investors/`). Sticky with the nav (Landing wraps both; ShellNavbar goes `static` via className, still unforked), collapses once the hero (`[data-hero]` on HeroV1) scrolls out of view. Firm logos hide below `sm`. Second angel headshot is unidentified (client-supplied screenshot) -- alt left decorative.

## What's next

1. Apply incoming client feedback to `/v1` only (fork shared pieces on first touch).
2. Replace remaining placeholders when Lucas delivers: curated 50 logos, Elevate testimonial clips + real durations/captions (love wall photos have play affordances staged). Love wall quotes are now REAL (8 vetted testimonials in content-v1.ts, 2026-07-09 sheet); investor logos + angel headshots landed in the top bar.
3. Verify factual claims before any public launch: SOC 2 / ISO 27001 status, "2,400 data points" badge, "#1 platform" and "3,000+" figures, "$55 million" raised (top bar).

## Known constraints / decisions not to revisit

- Light mode only. No all-caps mono eyebrows, no italic serif accent words, no em dashes in copy (Joseph's AI-slop blacklist).
- Motion doctrine: few animations, slow at idle, react on hover; `prefers-reduced-motion` respected everywhere.
- Join CTA = email field → modal (mirrors the cpohq.com application form; wire the real endpoint at launch).
- Outpace orb seeds (`k76760`, `cpo26093`, `cpo18614`) were palette-scanned, not gallery numbers — gallery numbering past 30 is session-random.

## Key files

- `components/Landing.tsx` — v0/v1 assembly + the fork rule in a comment
- `lib/content-v1.ts` — all v1 copy (edit here, not content.ts)
- `app/globals.css` — theme tokens + all bespoke CSS
- `lib/variants.ts` — the two variants
- `components/sections/*V1.tsx` — the working surface
