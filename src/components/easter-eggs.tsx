"use client";

import { useEffect, useRef, useState } from "react";
import { PIXELS, LOGO_GRID } from "./logo";

const KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];

// Пасхалки: приветствие в консоли для тех, кто заглянул в код,
// и код Konami (↑↑↓↓←→←→BA), который осыпает экран пикселями «RAW».
export function EasterEggs() {
  const [rain, setRain] = useState(0);
  const buf = useRef<string[]>([]);

  useEffect(() => {
    console.log(
      "%cRAW%c\nЗаглянули в консоль? Значит, вы наш человек.\nДелаем сайты, приложения и ботов до пикселя. Напишите: wa.me/77066569389\nПодсказка: ↑↑↓↓←→←→BA, клавиша G, ⌘K",
      "font: 900 42px monospace; letter-spacing: 6px;",
      "font: 12px monospace; color: #8a8885;",
    );
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      const k = e.key.toLowerCase() === "и" ? "b" : e.key.toLowerCase() === "ф" ? "a" : e.key.toLowerCase();
      buf.current = [...buf.current, k].slice(-KONAMI.length);
      if (buf.current.join() === KONAMI.join()) {
        buf.current = [];
        setRain((r) => r + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!rain) return null;
  return <PixelRain key={rain} onDone={() => setRain(0)} />;
}

function PixelRain({ onDone }: { onDone: () => void }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    c.width = window.innerWidth * dpr;
    c.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    const W = window.innerWidth;
    const H = window.innerHeight;
    const cell = Math.min(W / (LOGO_GRID.cols + 4), 48);
    const ox = (W - LOGO_GRID.cols * cell) / 2;
    const oy = (H - LOGO_GRID.rows * cell) / 2;
    // Пиксели падают сверху и собираются в «RAW», потом рассыпаются вниз.
    const parts = PIXELS.map((p) => ({
      tx: ox + p.x * cell,
      ty: oy + p.y * cell,
      x: ox + p.x * cell,
      y: -Math.random() * H - cell,
      vy: 0,
      delay: Math.random() * 500,
    }));
    const t0 = performance.now();
    let raf = 0;
    const frame = (t: number) => {
      const el = t - t0;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(11,11,12,0.55)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#edebe7";
      let alive = false;
      parts.forEach((p) => {
        if (el < p.delay) return;
        if (el < 1900) {
          p.y += (p.ty - p.y) * 0.12;
        } else {
          p.vy += 0.9;
          p.y += p.vy;
        }
        if (p.y < H + cell) alive = true;
        ctx.fillRect(p.x + 2, p.y + 2, cell - 4, cell - 4);
      });
      if (el < 2000 || alive) raf = requestAnimationFrame(frame);
      else onDone();
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return <canvas ref={canvas} className="pointer-events-none fixed inset-0 z-[90] h-full w-full" aria-hidden="true" />;
}
