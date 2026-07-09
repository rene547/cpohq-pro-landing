import { footer, security } from "@/lib/content-v1";

/* v1 footer, forked from Footer.tsx per client feedback 2026-07-09: inverted
   to black, the Bond wordmark goes solid white (same size and weight as the
   v0 outline), and the Follow (LinkedIn/X) column is dropped for now. */

export default function FooterV1() {
  return (
    <footer className="overflow-hidden bg-[#0b0d12] text-white">
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-8">
        <div className="flex flex-wrap gap-x-14 gap-y-8 justify-between">
          <div className="text-sm text-white/55 space-y-3">
            <p>{footer.line}</p>
            <div className="flex gap-2 flex-wrap">
              {security.badges.map((b) => (
                <span
                  key={b}
                  className="text-[9px] font-semibold tracking-wide text-white/55 border border-white/15 rounded-full px-2.5 py-1"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
          <FooterCol title="Navigate" links={footer.nav} />
          <FooterCol title="Legal" links={footer.legal} />
        </div>
      </div>

      {/* Bond move: the wordmark as monument. Solid white, full width. */}
      <div className="mx-auto max-w-6xl px-6 pb-6" aria-hidden>
        <svg viewBox="0 0 377 68" className="w-full h-auto text-white" fill="currentColor">
          <path d="M0 29.5545C0 9.54964 10.8219 0 36.0729 0C59.0283 0 70.998 8.0678 71.8998 26.2615H50.0921C49.2723 20.8281 45.0911 18.1114 36.0729 18.1114C23.4474 18.1114 21.3158 23.4625 21.3158 29.5545C21.3158 35.7288 23.5294 41.1622 36.0729 41.1622C45.0911 41.1622 49.2723 38.3632 50.0921 32.8475H71.8998C70.998 51.1235 59.1103 59.2736 36.0729 59.2736C10.8219 59.2736 0 49.6416 0 29.5545Z" />
          <path d="M119.488 0.823244C132.524 0.823244 141.46 10.0436 141.46 22.8862C141.46 35.7288 132.524 44.9492 119.488 44.9492H95.7129V58.4504H74.3971V0.823244H119.488ZM115.389 26.8378C117.521 26.8378 120.144 26.8378 120.144 22.8862C120.144 18.9346 117.521 18.9346 115.389 18.9346H95.7129V26.8378H115.389Z" />
          <path d="M179.144 59.2736C153.893 59.2736 143.071 49.6416 143.071 29.5545C143.071 9.54964 153.893 0 179.144 0C204.313 0 215.217 9.63196 215.217 29.5545C215.217 49.5593 204.313 59.2736 179.144 59.2736ZM179.144 41.1622C191.688 41.1622 193.901 35.6465 193.901 29.5545C193.901 23.5448 191.77 18.1114 179.144 18.1114C166.519 18.1114 164.387 23.4625 164.387 29.5545C164.387 35.7288 166.601 41.1622 179.144 41.1622Z" />
          <path d="M272.638 0.823244H293.954V58.4504H272.638V38.6925H239.024V58.4504H217.709V0.823244H239.024V20.5811H272.638V0.823244Z" />
          <path d="M377 52.8523L361.915 68L350.601 56.6392C345.518 58.368 339.205 59.2736 331.663 59.2736C306.412 59.2736 295.59 49.6416 295.59 29.5545C295.59 9.54964 306.412 0 331.663 0C356.832 0 367.736 9.63196 367.736 29.5545C367.736 34.1647 367.162 38.1985 365.932 41.7385L377 52.8523ZM331.663 41.1622C344.206 41.1622 346.42 35.6465 346.42 29.5545C346.42 23.5448 344.288 18.1114 331.663 18.1114C319.037 18.1114 316.906 23.4625 316.906 29.5545C316.906 35.7288 319.119 41.1622 331.663 41.1622Z" />
        </svg>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title}>
      <p className="text-sm font-medium text-white">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-sm text-white/55 hover:text-white focus-visible:outline-2 focus-visible:outline-accent rounded"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
