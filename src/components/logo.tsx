"use client";

import { useRef, useState, type CSSProperties } from "react";

// Пиксельный логотип «RAW»: буквы нарисованы на сетке 5×7, каждая клетка — отдельный
// квадрат, поэтому их можно анимировать по одному.
const GLYPHS: Record<string, string[]> = {
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  W: ["10001", "10001", "10001", "10101", "10101", "10101", "01010"],
};

const WORD = "RAW";
const COLS = WORD.length * 5 + (WORD.length - 1); // 17
const ROWS = 7;

export type Pixel = { x: number; y: number; i: number };

export const PIXELS: Pixel[] = (() => {
  const out: Pixel[] = [];
  WORD.split("").forEach((ch, li) => {
    GLYPHS[ch].forEach((row, y) => {
      row.split("").forEach((bit, x) => {
        if (bit === "1") out.push({ x: li * 6 + x, y, i: out.length });
      });
    });
  });
  return out;
})();

// Псевдослучайное, но стабильное число для каждого пикселя (одинаково на сервере и в браузере).
const rnd = (n: number) => {
  const s = Math.sin(n * 12.9898) * 43758.5453;
  return s - Math.floor(s);
};

type Props = {
  className?: string;
  title?: string;
  // Доля клетки, которую занимает пиксель: 1 — сплошные буквы, меньше — точечная матрица.
  fill?: number;
  // Глитч при наведении
  glitch?: boolean;
  pixelClassName?: string;
};

export function Logo({ className = "", title = "RAW Development", fill = 1, glitch = true, pixelClassName = "" }: Props) {
  const [seed, setSeed] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onEnter = () => {
    if (!glitch || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setSeed((s) => s + 1);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setSeed(0), 260);
  };

  const inset = (1 - fill) / 2;

  return (
    <svg
      viewBox={`0 0 ${COLS} ${ROWS}`}
      role="img"
      aria-label={title}
      className={`overflow-visible ${className}`}
      shapeRendering="crispEdges"
      onPointerEnter={onEnter}
    >
      {PIXELS.map((p) => {
        // Во время глитча часть пикселей сдвигается на клетку по горизонтали.
        const r = seed ? rnd(p.i * 7.1 + seed * 3.3) : 0;
        const dx = seed && r > 0.72 ? (r > 0.86 ? 1 : -1) : 0;
        const style: CSSProperties = {
          transform: `translate(${dx}px, 0)`,
          transition: seed ? "none" : "transform .18s steps(2)",
          opacity: seed && r < 0.08 ? 0 : 1,
        };
        return (
          <rect
            key={p.i}
            data-px={p.i}
            className={pixelClassName}
            x={p.x + inset}
            y={p.y + inset}
            width={fill}
            height={fill}
            fill="currentColor"
            style={style}
          />
        );
      })}
    </svg>
  );
}

export const LOGO_GRID = { cols: COLS, rows: ROWS };
export { rnd as pixelNoise };
