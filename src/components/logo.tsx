"use client";

import { useRef, useState, type CSSProperties } from "react";
import { LOGO_GRID, PIXELS, pixelNoise as rnd } from "./pixel-font";


type Props = {
  className?: string;
  title?: string;
  // Доля клетки, которую занимает пиксель: 1, сплошные буквы, меньше, точечная матрица.
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
      viewBox={`0 0 ${LOGO_GRID.cols} ${LOGO_GRID.rows}`}
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
