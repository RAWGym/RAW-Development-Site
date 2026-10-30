"use client";

import { useEffect } from "react";

// Кнопки с data-magnetic слегка тянутся за курсором и пружинят обратно.
// Один обработчик на весь сайт, без обёрток вокруг каждой кнопки.
export function Magnetic() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let active: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (active && active !== el) release(active);
      active = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const k = Number(el.dataset.magnetic) || 0.25;
      el.style.transition = "transform .2s var(--ease-out)";
      el.style.transform = `translate3d(${dx * k}px, ${dy * k}px, 0)`;
    };
    const release = (el: HTMLElement) => {
      el.style.transition = "transform .7s cubic-bezier(.2,1.6,.4,1)";
      el.style.transform = "";
    };
    const onOut = (e: PointerEvent) => {
      if (active && !active.contains(e.relatedTarget as Node | null)) {
        release(active);
        active = null;
      }
    };
    // Карточки с data-tilt наклоняются за курсором, по ним скользит блик.
    let tilted: HTMLElement | null = null;
    const onTilt = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (tilted && tilted !== el) untilt(tilted);
      tilted = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.transition = "transform .25s var(--ease-out)";
      el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * 6}deg) rotateY(${(px - 0.5) * 8}deg)`;
      el.style.setProperty("--gx", `${px * 100}%`);
      el.style.setProperty("--gy", `${py * 100}%`);
      el.dataset.tiltOn = "true";
    };
    const untilt = (el: HTMLElement) => {
      el.style.transition = "transform .8s var(--ease-out)";
      el.style.transform = "";
      el.dataset.tiltOn = "false";
    };
    const onTiltOut = (e: PointerEvent) => {
      if (tilted && !tilted.contains(e.relatedTarget as Node | null)) {
        untilt(tilted);
        tilted = null;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    window.addEventListener("pointermove", onTilt, { passive: true });
    window.addEventListener("pointerout", onTiltOut, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("pointermove", onTilt);
      window.removeEventListener("pointerout", onTiltOut);
    };
  }, []);
  return null;
}
