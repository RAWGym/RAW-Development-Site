"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Обложка кейса: раскрывается из скруглённой маски и слегка плывёт при прокрутке.
export function ParallaxCover({ children }: { children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(box.current, { clipPath: "inset(6% 6% 6% 6% round 40px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.4, ease: "expo.out" });
      gsap.fromTo(
        inner.current,
        { yPercent: -6 },
        { yPercent: 6, ease: "none", scrollTrigger: { trigger: box.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={box} className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line sm:aspect-[16/9]">
      <div ref={inner} className="absolute -inset-y-[8%] inset-x-0">
        {children}
      </div>
    </div>
  );
}
