export type VariantId = "v0" | "v1";

export type Variant = {
  id: VariantId;
  name: string;
  note: string;
  /* class applied to the page root: sets font vars + theme vars (see globals.css) */
  themeClass: string;
};

export const variants: Variant[] = [
  {
    id: "v0",
    name: "V0 · Locked",
    note: "The approved baseline. Frozen; do not edit.",
    themeClass: "theme-v0",
  },
  {
    id: "v1",
    name: "V1 · Working",
    note: "Fork of V0. All client feedback lands here.",
    themeClass: "theme-v1",
  },
];

export function getVariant(id: string): Variant | undefined {
  return variants.find((v) => v.id === id);
}
