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

## V1 state as of 2026-07-09 EOD (deployed at merge commit 16f76e8)

All client feedback rounds from 2026-07-09 are applied to /v1, pushed to main, and live:

- **Top bar** (`components/TopBarV1.tsx`): brand blue (#336cf0), persists for the whole page (collapse-after-hero was removed on a client call). Five investor pfps in order (Adam Grant, Gokul Rajaram, Pamela Thomas-Graham, Kelli Dragovich, Marty Reaume), copy "$55 million from the world's top investors (Adam Grant, Accel, +100 more).", white logos Accel / EQT / Menlo (white SVG variants in `public/investors/`).
- **Nav** (v1 branch in Landing.tsx): CPOHQ Community link, no secondary CTA, primary "Join 3,000+ CPOs".
- **Hero**: copy-doc headline/subhead/microcopy; v1-only meta description via `generateMetadata` in `app/[variant]/page.tsx`.
- **Logo grid** (`LogoBarV1`): fixed real brand colors, no glow/sweep; serves tight-cropped SVGs from `public/logos/v1/` with area-normalized heights (`lib/logo-aspects.json`); NASCAR letters black in its v1 copy. Regenerate crops with the pipeline pattern in commit 3dfad42 when Lucas's curated 50 logos land.
- **Nav cards** (`HighlightCardsV1`): plain-text titles "CPOHQ Community / CPOHQ AI Chief of Staff / CPOHQ Team of AI agents" + client bodies (wordmark-lockup test was shipped and reverted same day; trimmed wordmark asset kept at `public/brand/cpohq-wordmark-trim.png`). Card 3 shows the dashboards render + two Strands glass orbs. Card clicks smooth-scroll to sections. Portrait sphere retries failed Unsplash loads 3x.
- **Love wall** (`LoveWallV1`): "Loved by 1,000s..." headline, 8 real attributed quotes with real headshots (`public/photos/people/`; Tricia Elias = black initials circle), featured quote card in brand blue, clip thumbnails with play/duration/caption, two hover-to-play muted videos (`public/videos/`), aura washes, scrub-driven column drift.
- **Community section** (`CommunityV1`): 3D icons (lock / bar chart / open book) in `public/icons/3d/`.
- **Chief of staff** (`ChiefOfStaffV1`): restructured to Community grammar -- text left, staggered dark mock cards right.
- **Footer**: forked to `FooterV1.tsx` -- all black, solid white wordmark, no Follow column.
- **Apply form modal** (`JoinModalV1.tsx`, merged via PR #2): 3-step application form, near-black, fixed 512x760 panel, opens from nav CTA / hero (email prefills) / TalkToUs. **Submit only console.logs the payload -- wiring is the next task (below).**

## NEXT TASK: wire the apply form to HubSpot

The form UI is done and live; submission goes nowhere yet.

- The submit point is `handleSubmit` in `components/JoinModalV1.tsx` -- the line `console.log("CPOHQ application payload", form)` is the exact spot the real call replaces.
- Payload shape (`FormState`): `firstName, lastName, workEmail, personalEmail, linkedinUrl` (step 1), `activeCpo` (bool), `professionalLevel`, `reportingLevels` (step 2), `hris[]`, `ats[]` (step 3). Field keys were designed to mirror the live cpohq.com application form 1:1 (see the applyForm block in `lib/content-v1.ts` -- "Do not rename keys").
- Option lists (professionalLevels, reportingLevelOptions, hrisOptions, atsOptions) live in `lib/content-v1.ts` under `applyForm`.
- HubSpot specifics still needed from Joseph/Lucas: portal ID, form GUID (or private-app token if using the CRM API instead of the Forms API), and the mapping from our field keys to HubSpot internal property names. The Forms API submit endpoint (no auth needed) is `https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}`.
- Client-side POST to the Forms API is the simple path; a Next route handler (`app/api/apply/route.ts`) proxying it keeps IDs out of the bundle and lets us add validation/spam checks -- preferred.
- Add error UI for a failed submit (there is none; only the success state exists).
- Test checklist after wiring: hero prefill still lands in payload, all 10 fields arrive in HubSpot, double-submit guarded, success state unchanged, /v0 modal untouched.

## Housekeeping / open items

1. `origin/section/join-form` branch still exists (PR #2 merged; deletion pending Rene's say-so). The designer's worktree lives at `~/projects/cpohq-landing-worktrees/join-form`. A stray test server from that session may still be on port 3779.
2. Known visual bug (out of scope of PR #2, fix on main): the hero WebGL scene loses its blue hue-tint (goes grey) whenever a backdrop-filter is active above it, e.g. while the apply modal is open -- `mix-blend-mode: hue` on `.unicorn-tint` breaks under the backdrop layer.
3. Replace remaining placeholders when Lucas delivers: curated 50 logos, Elevate testimonial clips + real durations/captions. Love wall quotes/headshots are already real. Portrait-sphere faces in card 1 are still Unsplash placeholders (external dependency; consider self-hosting real member photos).
4. Verify factual claims before any public launch: SOC 2 / ISO 27001 status, "2,400 data points" badge, "#1 platform" / "3,000+" figures, "$55 million" raised (top bar), "30,000 confidential discussions" (nav card), Regina Ross testimonial permission (came from an email screenshot in #wins, not a public post).

## Working agreements (multi-person)

- Branch per section (`section/<name>`), PRs even between two people, Rene merges after joint review, production deploys only via Rene's Vercel CLI (never wired to GitHub pushes).
- In shared files (`app/globals.css`, `lib/content-v1.ts`) touch only your section's block; append new CSS at the end under a commented header.

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
