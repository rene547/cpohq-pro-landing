import { notFound } from "next/navigation";
import Landing from "@/components/Landing";
import { getVariant, variants } from "@/lib/variants";

export function generateStaticParams() {
  return variants.map((v) => ({ variant: v.id }));
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
