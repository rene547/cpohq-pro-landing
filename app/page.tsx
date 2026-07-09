import Image from "next/image";
import Link from "next/link";
import { variants } from "@/lib/variants";

/* Internal index: V0 is the frozen baseline, V1 is the working fork. */
export default function Home() {
  return (
    <div className="theme-v0 page flex-1 flex items-center justify-center px-6 py-20">
      <main className="w-full max-w-2xl">
        <Image
          src="/brand/cpohqlogo-horizontal-black.png"
          alt="CPOHQ"
          width={160}
          height={32}
          className="h-7 w-auto"
          priority
        />
        <h1 className="font-display text-3xl mt-8 tracking-tight">
          Landing page versions.
        </h1>
        <p className="mt-2 text-muted">
          V0 is locked as approved. Client feedback lands on V1.
        </p>
        <ul className="mt-10 space-y-3">
          {variants.map((v) => (
            <li key={v.id}>
              <Link
                href={`/${v.id}`}
                className="group flex items-baseline justify-between gap-6 rounded-brand border border-line bg-card px-6 py-5 hover:-translate-y-0.5 hover:shadow-lg transition focus-visible:outline-2 focus-visible:outline-accent"
              >
                <span>
                  <span className="font-display text-xl">{v.name}</span>
                  <span className="block mt-1 text-sm text-muted">{v.note}</span>
                </span>
                <span className="text-sm font-medium text-muted group-hover:text-accent transition shrink-0">
                  {v.id.toUpperCase()} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
