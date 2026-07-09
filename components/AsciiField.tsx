"use client";

import { useEffect, useRef } from "react";

/* Faint drifting ASCII texture -- the hero scene's dither field without the
   beam. Characters shimmer and swap very slowly; pauses offscreen; static
   under prefers-reduced-motion. */

const GLYPHS = "@8$z=+*#";

export default function AsciiField({
  className = "",
  color = "23, 20, 14",
  baseAlpha = 0.1,
  cell = 16,
}: {
  className?: string;
  /* "r, g, b" of the glyph color */
  color?: string;
  baseAlpha?: number;
  cell?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    type Cell = { g: number; phase: number; speed: number; a: number };
    let cells: Cell[] = [];
    let cols = 0, rows = 0;

    let seed = 41;
    const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

    function layout() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas!.clientWidth, h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      seed = 41;
      cells = [];
      for (let i = 0; i < cols * rows; i++) {
        cells.push({
          g: Math.floor(rand() * GLYPHS.length),
          phase: rand() * Math.PI * 2,
          speed: 0.25 + rand() * 0.5,
          a: (0.35 + rand() * 0.65) * baseAlpha * (rand() > 0.72 ? 1 : 0.45),
        });
      }
    }

    function draw(t: number) {
      const w = canvas!.clientWidth, h = canvas!.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.font = `${Math.round(cell * 0.62)}px ui-monospace, Menlo, monospace`;
      ctx.textBaseline = "top";
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cl = cells[r * cols + c];
          const wave = reduced ? 0.75 : 0.5 + 0.5 * Math.sin(t * cl.speed + cl.phase);
          const glyph = GLYPHS[(cl.g + Math.floor(reduced ? 0 : t * 0.12 + cl.phase)) % GLYPHS.length];
          ctx.fillStyle = `rgba(${color}, ${(cl.a * wave).toFixed(3)})`;
          ctx.fillText(glyph, c * cell + 2, r * cell + 2);
        }
      }
    }

    layout();
    draw(0);

    let vis = true, raf = 0, last = 0;
    const io = new IntersectionObserver((e) => { vis = e[0].isIntersecting; }, { threshold: 0 });
    io.observe(canvas);
    const ro = new ResizeObserver(() => { layout(); draw(last); });
    ro.observe(canvas);

    if (!reduced) {
      const loop = (ms: number) => {
        raf = requestAnimationFrame(loop);
        const t = ms / 1000;
        if (!vis || t - last < 0.1) return; // ~10fps is plenty for a shimmer
        last = t;
        draw(t);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [color, baseAlpha, cell]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
