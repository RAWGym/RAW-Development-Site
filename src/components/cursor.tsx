"use client";

import { useEffect, useRef } from "react";

// Курсор-перекрестие с координатами X/Y. Только для мыши, только без reduced-motion.
// Над элементами с data-cursor="Текст" превращается в круг с подписью.
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const coords = useRef<HTMLSpanElement>(null);
  const bubble = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced || !root.current) return;

    document.documentElement.classList.add("has-cursor");
    root.current.style.display = "block";

    let x = -100;
    let y = -100;
    let cx = x;
    let cy = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (coords.current) coords.current.textContent = `X ${String(Math.round(x)).padStart(4, "0")}  Y ${String(Math.round(y)).padStart(4, "0")}`;
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      if (bubble.current) {
        if (el) {
          bubble.current.textContent = el.dataset.cursor ?? "";
          bubble.current.dataset.on = "true";
        } else {
          bubble.current.dataset.on = "false";
        }
      }
    };
    const loop = () => {
      cx += (x - cx) * 0.35;
      cy += (y - cy) * 0.35;
      if (root.current) root.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div
      ref={root}
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden mix-blend-difference"
      aria-hidden="true"
    >
      <div className="absolute -left-3 top-0 h-px w-6 bg-white" />
      <div className="absolute -top-3 left-0 h-6 w-px bg-white" />
      <span ref={coords} className="absolute left-3 top-3 whitespace-pre font-mono text-[9px] text-white/70" />
      <div
        ref={bubble}
        data-on="false"
        className="absolute left-0 top-0 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 scale-0 place-items-center rounded-full bg-white font-mono text-[10px] uppercase tracking-widest text-black transition-transform duration-300 ease-[var(--ease-out)] data-[on=true]:scale-100"
      />
    </div>
  );
}
