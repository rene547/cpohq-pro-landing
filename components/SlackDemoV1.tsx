"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Animated Slack scene for the v1 chief-of-staff section, ported from the
 *  cpohq-site /v2 hero (HeroSlackDemo). Self-playing loop:
 *   1. a CPO types a question into the composer (centered in the empty card)
 *   2. on send, the composer slides out and the message lands at the top
 *   3. Chief of Staff appears below it, "thinks" (name shimmer), then answers
 *   4. the question scrolls up and out; the data tiles + reactions render
 *   5. a CPO reply types in at the bottom; the thread scrolls up, then resets
 *  Port changes vs the source: the loop is gated on useInView because this
 *  section sits below the fold, and the blues are remapped to this site's
 *  accent. Motion drives every move (AnimatePresence + layout). */

const QUESTION = "@Chief of Staff what's the median Series C equity refresh, and how do we compare?";
const REPLY = "Amazing, thank you 🙏";
/* TODO(client): figures illustrative, confirm real benchmark data before
   publishing (the visible "Illustrative" label stays until then). */
const KPIS = [
  { k: "Peer median", v: "0.18%" },
  { k: "You", v: "0.14%" },
  { k: "Percentile", v: "Bottom 25%" },
];
const EASE = [0.16, 1, 0.3, 1] as const;
const LAYOUT = { type: "spring", stiffness: 300, damping: 34 } as const;

type Phase =
  | "composeQ" | "sentQ" | "thinking" | "answer" | "data"
  | "reactions" | "replyTyping" | "replySent" | "reset";

const I = {
  plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
  smile: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>,
  mic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><line x1="12" y1="18" x2="12" y2="21" /></svg>,
  send: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></svg>,
};

function CpoAvatar() {
  return (
    <span className="v2-slk-av mem" aria-hidden>
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-8 2.5-8 5.5V22h16v-2.5c0-3-3.6-5.5-8-5.5Z" /></svg>
    </span>
  );
}
function BotAvatar() {
  return <span className="v2-slk-av bot" aria-hidden><img src="/cpohq-mark.png" alt="" /></span>;
}

export default function SlackDemoV1() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "-15% 0px" });
  const [phase, setPhase] = useState<Phase>("composeQ");
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const wait = (ms: number) => new Promise<void>((res) => { const t = setTimeout(() => { timers.delete(t); res(); }, ms); timers.add(t); });
    const typeInto = async (text: string, per: number) => {
      for (let i = 1; i <= text.length; i++) { if (cancelled) return; setTyped(text.slice(0, i)); await wait(per + (i % 4 === 0 ? 38 : 0)); }
    };
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    async function run() {
      await wait(reduce ? 0 : 450); // first await before any setState
      if (cancelled) return;
      if (reduce) { setPhase("reactions"); return; }
      while (!cancelled) {
        setPhase("composeQ"); setTyped(""); await wait(500);
        await typeInto(QUESTION, 26); await wait(560); if (cancelled) break;
        setPhase("sentQ"); setTyped(""); await wait(800);
        setPhase("thinking"); await wait(1850);
        setPhase("answer"); await wait(1700);
        setPhase("data"); await wait(2050);
        setPhase("reactions"); await wait(2350);
        setPhase("replyTyping"); setTyped(""); await wait(350);
        await typeInto(REPLY, 38); await wait(150); if (cancelled) break;
        setPhase("replySent"); await wait(1450);
        setPhase("reset"); await wait(700);
      }
    }
    run();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [inView]);

  const showComposer = phase === "composeQ";
  const showQ = phase === "sentQ" || phase === "thinking" || phase === "answer";
  const showBot = ["thinking", "answer", "data", "reactions", "replyTyping", "replySent"].includes(phase);
  const showReply = phase === "replyTyping" || phase === "replySent";
  const botAnswer = ["answer", "data", "reactions", "replyTyping", "replySent"].includes(phase);
  const botData = ["data", "reactions", "replyTyping", "replySent"].includes(phase);
  const botReactions = ["reactions", "replyTyping", "replySent"].includes(phase);

  // composer centers in the empty card; reply phases bottom-anchor (thread scrolls up); else top-fill
  const justify = phase === "composeQ" ? "center" : showReply ? "flex-end" : "flex-start";
  const msgT = { duration: 0.5, ease: EASE, layout: LAYOUT };

  return (
    <div className="v2-slk" ref={rootRef}>
      <div className="v2-slk-head">
        <span className="v2-slk-hash">#</span>
        <span className="v2-slk-ch">people-leadership</span>
        <span className="v2-slk-lock" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
        </span>
        <span className="v2-slk-ws">CPOHQ · Slack</span>
      </div>

      <div className="v2-slk-stage" style={{ justifyContent: justify }}>
        <AnimatePresence mode="popLayout">
          {showQ && (
            <motion.div className="v2-slk-msg" key="q" layout initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={msgT}>
              <CpoAvatar />
              <div className="v2-slk-mc">
                <div className="v2-slk-meta-row"><span className="v2-slk-name">CPO</span><span className="v2-slk-time">9:42 AM</span></div>
                <div className="v2-slk-text"><span className="v2-slk-mention">@Chief of Staff</span> what&apos;s the median Series&nbsp;C equity refresh, and how do we compare?</div>
              </div>
            </motion.div>
          )}

          {showBot && (
            <motion.div className="v2-slk-msg bot" key="bot" layout initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={msgT}>
              <BotAvatar />
              <div className="v2-slk-mc">
                <div className="v2-slk-meta-row">
                  <span className={`v2-slk-name${phase === "thinking" ? " shine" : ""}`}>Chief of Staff</span>
                  <span className="v2-slk-app">APP</span>
                  <span className="v2-slk-time">9:42 AM</span>
                </div>

                {phase === "thinking" ? (
                  <div className="v2-slk-dots" aria-label="Chief of Staff is thinking"><i /><i /><i /></div>
                ) : botAnswer ? (
                  <>
                    <motion.div className="v2-slk-text" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                      Median across verified Series&nbsp;C CPOs (last 90 days) is <b>0.18%</b> fully diluted. You&apos;re at <b>0.14%</b>, bottom quartile.
                    </motion.div>

                    <AnimatePresence>
                      {botData && (
                        <motion.div className="v2-slk-stats" key="stats" layout initial="hidden" animate="show" exit={{ opacity: 0 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}>
                          {KPIS.map((s) => (
                            <motion.div className="v2-slk-kpi" key={s.k} variants={{ hidden: { opacity: 0, y: 12, scale: 0.94 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } } }}>
                              <div className="k">{s.k}</div><div className="v">{s.v}</div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {botReactions && (
                        <motion.div className="v2-slk-foot" key="foot" layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}>
                          <div className="v2-slk-react">
                            <span className="r"><span className="e">📈</span>4</span>
                            <span className="r"><span className="e">🙌</span>2</span>
                            <span className="r add" aria-hidden>+</span>
                          </div>
                          <span className="v2-slk-src">Illustrative</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : null}
              </div>
            </motion.div>
          )}

          {showReply && (
            <motion.div className="v2-slk-msg" key="reply" layout initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={msgT}>
              <CpoAvatar />
              <div className="v2-slk-mc">
                <div className="v2-slk-meta-row"><span className="v2-slk-name">CPO</span><span className="v2-slk-time">9:43 AM</span></div>
                <div className="v2-slk-text">
                  {phase === "replyTyping" ? (<>{typed}<span className="v2-slk-caret" /></>) : REPLY}
                </div>
              </div>
            </motion.div>
          )}

          {showComposer && (
            <motion.div className="v2-slk-composer2" key="composer" layout initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 70 }} transition={{ ...LAYOUT, opacity: { duration: 0.25 } }}>
              <div className="v2-slk-cinput">
                {typed ? <span className="t">{typed}</span> : <span className="ph">Message #people-leadership</span>}
                <span className="v2-slk-caret" />
              </div>
              <div className="v2-slk-crow">
                <span className="ci">{I.plus}</span>
                <span className="ci aa">Aa</span>
                <span className="ci">{I.smile}</span>
                <span className="ci at">@</span>
                <span className="ci">{I.mic}</span>
                <span className="v2-slk-send">{I.send}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
