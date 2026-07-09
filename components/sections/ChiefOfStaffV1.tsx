import { chiefOfStaff } from "@/lib/content-v1";
import Reveal from "@/components/Reveal";
import SlackDemoV1 from "@/components/SlackDemoV1";

/* v1 chief of staff: written content on the left (headline, lead, the three
   points as a list), and on the right the animated Slack scene, a live
   conversation between a CPO and the chief of staff (replaced the earlier
   stack of black ASCII product-mock cards, 2026-07-09). */

export default function ChiefOfStaffV1() {
  return (
    <section id={chiefOfStaff.id} className="scroll-mt-16 bg-soft border-y border-line">
      <div className="mx-auto max-w-[1200px] px-6 py-28 grid md:grid-cols-[5fr_7fr] gap-14 items-center">
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight">
            {chiefOfStaff.headline}
          </h2>
          <p className="mt-5 text-lg text-muted max-w-md">{chiefOfStaff.sub}</p>
          <ul className="mt-10 space-y-6">
            {chiefOfStaff.points.map((p) => (
              <li key={p.title} className="border-l-2 border-accent/30 pl-4">
                <h3 className="font-medium text-lg tracking-tight">{p.title}</h3>
                <p className="mt-1 text-muted leading-relaxed max-w-sm">{p.line}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <SlackDemoV1 />
        </Reveal>
      </div>
    </section>
  );
}
