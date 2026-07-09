"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /* when set, animates children marked with data-reveal-item instead of the wrapper */
  staggerChildren?: number;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  staggerChildren,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const targets = staggerChildren
        ? gsap.utils.toArray<HTMLElement>("[data-reveal-item]", ref.current)
        : [ref.current];
      if (!targets.length || !ref.current) return;

      const tween = gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          delay,
          stagger: staggerChildren ?? 0,
          paused: true,
        }
      );

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 85%",
        once: true,
        onEnter: () => tween.play(),
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
