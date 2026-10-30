"use client";

import { useEffect, useRef } from "react";

const CELL = 32;

// Пиксельное поле за первым экраном: курсор «рисует» клетки, они плавно гаснут.
// На телефоне клетки сами вспыхивают в случайных местах. Цикл спит, когда гореть нечему.
export function PixelField() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    let cols = 0;
    let rows = 0;
    let heat = new Float32Array(0);
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let last: { x: number; y: number } | null = null;

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = c.getBoundingClientRect();
      c.width = r.width * dpr;
      c.height = r.height * dpr;
      cols = Math.ceil(r.width / CELL);
      rows = Math.ceil(r.height / CELL);
      heat = new Float32Array(cols * rows);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);

    const light = (cx: number, cy: number, v = 1) => {
      if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return;
      const i = cy * cols + cx;
      heat[i] = Math.max(heat[i], v);
    };

    const frame = () => {
      raf = 0;
      const rgb = getComputedStyle(document.documentElement).getPropertyValue("--fg-rgb").trim().replace(/\s+/g, ",") || "237,235,231";
      ctx.clearRect(0, 0, c.width, c.height);
      let alive = false;
      const s = CELL * dpr;
      for (let i = 0; i < heat.length; i++) {
        const h = heat[i];
        if (h < 0.01) continue;
        alive = true;
        ctx.fillStyle = `rgba(${rgb},${h * 0.22})`;
        const x = (i % cols) * s;
        const y = Math.floor(i / cols) * s;
        ctx.fillRect(x + dpr, y + dpr, s - dpr, s - dpr);
        heat[i] = h * 0.93;
      }
      if (alive && visible) raf = requestAnimationFrame(frame);
    };
    const wake = () => {
      if (!raf && visible) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / CELL;
      const y = (e.clientY - r.top) / CELL;
      if (y < 0 || y > rows) return;
      // Заполняем клетки по линии между прошлым и текущим положением, чтобы след был сплошным.
      const from = last ?? { x, y };
      const steps = Math.max(1, Math.ceil(Math.hypot(x - from.x, y - from.y)));
      for (let k = 0; k <= steps; k++) {
        const px = Math.floor(from.x + ((x - from.x) * k) / steps);
        const py = Math.floor(from.y + ((y - from.y) * k) / steps);
        light(px, py, 1);
        light(px + 1, py, 0.35);
        light(px - 1, py, 0.35);
        light(px, py + 1, 0.35);
        light(px, py - 1, 0.35);
      }
      last = { x, y };
      wake();
    };
    const onLeave = () => (last = null);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) wake();
    });
    io.observe(c);

    let twinkle = 0;
    if (!reduced) {
      if (fine) {
        window.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("pointerleave", onLeave);
      }
      // Тихое мерцание: редкие клетки вспыхивают сами
      twinkle = window.setInterval(() => {
        if (!visible) return;
        for (let k = 0; k < (fine ? 1 : 3); k++) light(Math.floor(Math.random() * cols), Math.floor(Math.random() * rows), 0.6 + Math.random() * 0.4);
        wake();
      }, fine ? 260 : 180);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(twinkle);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvas}
      className="absolute inset-0 h-full w-full"
      style={{ maskImage: "radial-gradient(ellipse at 50% 45%, black 35%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse at 50% 45%, black 35%, transparent 80%)" }}
      aria-hidden="true"
    />
  );
}
