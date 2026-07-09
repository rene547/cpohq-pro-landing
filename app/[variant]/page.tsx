import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Landing from "@/components/Landing";
import { getVariant, variants } from "@/lib/variants";

export function generateStaticParams() {
  return variants.map((v) => ({ variant: v.id }));
}

/* v1 carries its own meta description; v0 keeps the layout default. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ variant: string }>;
}): Promise<Metadata> {
  const { variant } = await params;
  if (variant !== "v1") return {};
  return {
    description:
      "CPOHQ is the #1 platform for 3,000+ Chief People Officers and their HR teams: a private CPO community, an AI Chief of Staff, and AI agents for the people function.",
  };
}

export default async function VariantPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant } = await params;
  const config = getVariant(variant);
  if (!config) notFound();
  return <Landing variant={config} />;
}
