export type VariantId = "v0" | "v1" | "v2" | "v3" | "v4" | "v5";

export type Variant = {
  id: VariantId;
  name: string;
  note: string;
  /* class applied to the page root: sets font vars + theme vars (see globals.css) */
  themeClass: string;
  /* display typography: which font family class headlines use */
  display: "serif" | "sans";
  /* whether the AI Chief of Staff section flips to a dark band */
  darkCos: boolean;
  /* hero background artwork style */
  heroArt: "dotgrid" | "gradient" | "photo" | "ui" | "minimal";
  /* logo bar: marquee rows or static grid */
  logoMarquee: boolean;
  /* use the alternate short headline */
  altHeadline: boolean;
};

export const variants: Variant[] = [
  {
    id: "v0",
    name: "Working Direction",
    note: "The one we build out. V2 base, Stripe hero anatomy, refined piece by piece.",
    themeClass: "theme-v0",
    display: "sans",
    darkCos: true,
    heroArt: "gradient",
    logoMarquee: true,
    altHeadline: false,
  },
  {
    id: "v1",
    name: "Operating Paper",
    note: "Warm paper, ink, cobalt. Serif display, Bond grammar.",
    themeClass: "theme-v1",
    display: "serif",
    darkCos: true,
    heroArt: "dotgrid",
    logoMarquee: true,
    altHeadline: false,
  },
  {
    id: "v2",
    name: "Infrastructure White",
    note: "Pure white, grotesk-led, color lives in artwork. Closest to Stripe.",
    themeClass: "theme-v2",
    display: "sans",
    darkCos: true,
    heroArt: "gradient",
    logoMarquee: true,
    altHeadline: false,
  },
  {
    id: "v3",
    name: "V0 · Ink Nav",
    note: "The locked v0 with an inverted near-black navbar and dark footer band.",
    themeClass: "theme-v0",
    display: "sans",
    darkCos: true,
    heroArt: "gradient",
    logoMarquee: true,
    altHeadline: false,
  },
  {
    id: "v4",
    name: "V0 · Full Color",
    note: "The locked v0 with the logo wall always in full brand color.",
    themeClass: "theme-v0",
    display: "sans",
    darkCos: true,
    heroArt: "gradient",
    logoMarquee: true,
    altHeadline: false,
  },
  {
    id: "v5",
    name: "V0 · Mirrored",
    note: "The locked v0 with the hero scene mirrored so the beam sweeps from the left.",
    themeClass: "theme-v0",
    display: "sans",
    darkCos: true,
    heroArt: "gradient",
    logoMarquee: true,
    altHeadline: false,
  },
];

export function getVariant(id: string): Variant | undefined {
  return variants.find((v) => v.id === id);
}
