"use client";

import { useEffect, useRef } from "react";
import { LOGO_GRID, PIXELS } from "./logo";

// Большое пиксельное «RAW» в подвале. Пиксели рядом с курсором приподнимаются
// и вспыхивают, остальные спокойно светятся точечной матрицей.
export function FooterLogo() {
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svg.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const rects = Array.from(
      el.querySelectorAll<SVGRectElement>("rect[data-px]"),
    );
    let raf = 0;
    let target: { x: number; y: number } | null = null;

    const paint = () => {
      raf = 0;
      rects.forEach((r, i) => {
        const p = PIXELS[i];
        let k = 0;
        if (target) {
          const d = Math.hypot(p.x + 0.5 - target.x, p.y + 0.5 - target.y);
          k = Math.max(0, 1 - d / 3.2);
        }
        r.style.transform = `translate(0, ${-k * 0.45}px) scale(${1 + k * 0.12})`;
        r.style.opacity = String(target ? 0.7 + k * 0.3 : 1);
      });
    };

    const onMove = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      const x = ((e.clientX - b.left) / b.width) * LOGO_GRID.cols;
      const y = ((e.clientY - b.top) / b.height) * LOGO_GRID.rows;
      target =
        x > -3 && x < LOGO_GRID.cols + 3 && y > -3 && y < LOGO_GRID.rows + 3
          ? { x, y }
          : null;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const f = 0.86;
  const filled = new Set(PIXELS.map((p) => p.y * LOGO_GRID.cols + p.x));
  const inset = (1 - f) / 2;
  return (
    <svg
      ref={svg}
      viewBox={`0 0 ${LOGO_GRID.cols} ${LOGO_GRID.rows}`}
      role="img"
      aria-label="RAW Development"
      className="block w-full overflow-visible text-fg"
    >
      {/* Пустые клетки сетки, чтобы было видно матрицу */}
      <g fill="var(--line)">
        {Array.from({ length: LOGO_GRID.cols * LOGO_GRID.rows }).map((_, i) =>
          filled.has(i) ? null : (
            <rect
              key={i}
              x={(i % LOGO_GRID.cols) + 0.44}
              y={Math.floor(i / LOGO_GRID.cols) + 0.44}
              width={0.12}
              height={0.12}
            />
          ),
        )}
      </g>
      {PIXELS.map((p) => (
        <rect
          key={p.i}
          data-px={p.i}
          x={p.x + inset}
          y={p.y + inset}
          width={f}
          height={f}
          rx={0.06}
          fill="currentColor"
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
            transition: "transform .35s var(--ease-out), opacity .35s",
          }}
        />
      ))}
    </svg>
  );
}
