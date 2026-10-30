"use client";

import { useEffect, useRef } from "react";

const ITEMS = [
  "Swift",
  "Kotlin",
  "React",
  "Next.js",
  "Telegram Bot API",
  "Mini Apps",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Android TV",
  "Unity",
  "Figma",
  "Supabase",
  "WebGL",
];

// Бесконечная лента технологий. Скорость зависит от скорости скролла,
// при скролле вверх лента едет в обратную сторону.
export function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = 0;
    let dir = 1;
    let boost = 0;
    let lastY = window.scrollY;
    let raf = 0;

    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (dy !== 0) dir = dy > 0 ? 1 : -1;
      boost = Math.min(18, Math.abs(dy) * 0.4);
    };

    // Ширину ленты меряем только при изменении размеров, а не в каждом кадре:
    // чтение scrollWidth в цикле заставляет браузер пересчитывать раскладку.
    let half = el.scrollWidth / 2;
    const ro = new ResizeObserver(() => (half = el.scrollWidth / 2));
    ro.observe(el);
    // Вне экрана лента не анимируется.
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf && !reduced) raf = requestAnimationFrame(loop);
    });
    io.observe(el);

    const loop = () => {
      if (!visible) {
        raf = 0;
        return;
      }
      x -= (0.6 + boost) * dir;
      boost *= 0.92;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      el.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };

    if (!reduced) {
      window.addEventListener("scroll", onScroll, { passive: true });
      raf = requestAnimationFrame(loop);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const row = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden border-y border-line py-5" aria-label="Технологии, с которыми мы работаем">
      <div ref={track} className="flex w-max will-change-transform">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 pr-8 font-display text-[clamp(22px,3vw,44px)] uppercase text-fg/90 [font-variation-settings:'wdth'_130]"
            aria-hidden={i >= ITEMS.length}
          >
            {item}
            <span className="inline-block h-2 w-2 rotate-45 bg-fg/40" />
          </span>
        ))}
      </div>
    </div>
  );
}
