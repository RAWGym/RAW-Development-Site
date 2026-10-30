"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Logo } from "./logo";

const LINES = [
  "resolving dependencies…",
  "compiling design system…",
  "aligning grid 8px…",
  "checking every pixel…",
  "ok",
];

// Прелоадер показывается один раз за сессию. Решение «показывать или нет»
// принимает inline-скрипт в <head> (класс html.preload), чтобы не было вспышки контента.
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    // Без класса preload оверлей и так скрыт CSS-ом.
    if (!html.classList.contains("preload")) return;

    const state = { n: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        html.classList.remove("preload");
        try {
          sessionStorage.setItem("raw-preloaded", "1");
        } catch {}
        setDone(true);
      },
    });

    tl.to(state, {
      n: 100,
      duration: 1.3,
      ease: "power2.inOut",
      onUpdate: () => {
        const v = Math.round(state.n);
        if (counter.current) counter.current.textContent = String(v).padStart(3, "0");
        setLines(LINES.slice(0, Math.min(LINES.length, Math.floor(v / 20) + 1)));
      },
    })
      .fromTo(
        ".preload-logo rect",
        { opacity: 0 },
        { opacity: 1, duration: 0.01, stagger: { each: 0.012, from: "random" } },
        0.15,
      )
      .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "expo.inOut" }, "+=0.15");

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="preloader fixed inset-0 z-[80] flex-col justify-between bg-bg"
      style={{
        paddingLeft: "var(--gutter)",
        paddingRight: "var(--gutter-r)",
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 24px)",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)",
      }}
      aria-hidden="true"
    >
      <div className="font-mono text-[11px] leading-6 text-muted">
        {lines.map((l, i) => (
          <div key={i}>
            <span className="text-faint">$</span> {l}
          </div>
        ))}
      </div>
      <div className="flex items-end justify-between gap-6">
        <Logo className="preload-logo w-[min(60vw,420px)] text-fg" fill={0.88} glitch={false} />
        <span ref={counter} className="font-mono text-[11px] tabular-nums text-muted">
          000
        </span>
      </div>
    </div>
  );
}
