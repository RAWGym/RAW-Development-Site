"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const CELL = 56;

type LenisLike = { scrollTo: (y: number, o: object) => void; stop: () => void; start: () => void };

function resetScroll() {
  const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
  if (lenis) {
    // stop/start гасит накопленную инерцию
    lenis.stop();
    lenis.scrollTo(0, { immediate: true, force: true });
    lenis.start();
  }
  window.scrollTo(0, 0);
}
const COVER_MS = 380;
const REVEAL_MS = 520;

// Переход между страницами: экран закрывается пикселями в случайном порядке,
// подменяется страница, и пиксели так же рассыпаются, открывая новую.
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const canvas = useRef<HTMLCanvasElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const state = useRef<{ phase: "idle" | "cover" | "wait" | "reveal"; order: number[]; cols: number; rows: number; raf: number; target: string }>({
    phase: "idle",
    order: [],
    cols: 0,
    rows: 0,
    raf: 0,
    target: "",
  });

  // Отрисовка доли закрытых клеток (0…1)
  const paint = (k: number) => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const s = state.current;
    const css = getComputedStyle(document.documentElement);
    const fg = css.getPropertyValue("--fg").trim() || "#edebe7";
    const bg = css.getPropertyValue("--bg").trim() || "#0b0b0c";
    ctx.clearRect(0, 0, c.width, c.height);
    const n = Math.floor(s.order.length * k);
    const dpr = c.width / window.innerWidth;
    const size = CELL * dpr;
    for (let i = 0; i < n; i++) {
      const idx = s.order[i];
      const x = (idx % s.cols) * size;
      const y = Math.floor(idx / s.cols) * size;
      // Последние закрашенные клетки вспыхивают светлым, остальные, цвет фона.
      ctx.fillStyle = i > n - s.cols * 0.6 && k < 1 ? fg : bg;
      ctx.fillRect(x, y, size + 1, size + 1);
    }
  };

  const setup = () => {
    const c = canvas.current;
    if (!c) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    c.width = window.innerWidth * dpr;
    c.height = window.innerHeight * dpr;
    const s = state.current;
    s.cols = Math.ceil(window.innerWidth / CELL);
    s.rows = Math.ceil(window.innerHeight / CELL);
    s.order = Array.from({ length: s.cols * s.rows }, (_, i) => i);
    // Перемешиваем, но с уклоном сверху вниз, так выглядит как «загрузка».
    s.order.sort((a, b) => Math.floor(a / s.cols) - Math.floor(b / s.cols) + (Math.random() - 0.5) * s.rows * 1.4);
  };

  const run = (ms: number, from: number, to: number, done: () => void) => {
    const s = state.current;
    const t0 = performance.now();
    cancelAnimationFrame(s.raf);
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      paint(from + (to - from) * e);
      if (k < 1) s.raf = requestAnimationFrame(step);
      else done();
    };
    s.raf = requestAnimationFrame(step);
  };

  // Перехватываем клики по внутренним ссылкам
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      const url = new URL(href, location.href);
      if (url.pathname === location.pathname) return; // якоря и та же страница, без перехода
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const s = state.current;
      if (s.phase !== "idle") {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      s.phase = "cover";
      s.target = url.pathname;
      setup();
      const c = canvas.current;
      if (c) c.style.visibility = "visible";
      if (label.current) {
        label.current.textContent = `~${url.pathname === "/" ? "/home" : url.pathname}`;
        label.current.style.opacity = "0";
      }
      run(COVER_MS, 0, 1, () => {
        s.phase = "wait";
        if (label.current) label.current.style.opacity = "1";
        router.push(url.pathname + url.search + url.hash);
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // Функции внутри работают только с ref-ами, поэтому пересоздавать обработчик не нужно.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // Кнопки «назад/вперёд» сохраняют позицию, остальные переходы всегда начинаются сверху
  const fromHistory = useRef(false);
  useEffect(() => {
    const onPop = () => (fromHistory.current = true);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (fromHistory.current) {
      fromHistory.current = false;
      return;
    }
    if (location.hash) return;
    resetScroll();
    // Инерция тачпада или пальца может докрутить страницу после сброса, повторяем на следующих кадрах
    const r = requestAnimationFrame(resetScroll);
    const t = setTimeout(resetScroll, 120);
    return () => {
      cancelAnimationFrame(r);
      clearTimeout(t);
    };
  }, [pathname]);

  // Новая страница пришла, открываем её
  useEffect(() => {
    const s = state.current;
    if (s.phase !== "wait" && s.phase !== "cover") return;
    const reveal = () => {
      s.phase = "reveal";
      if (label.current) label.current.style.opacity = "0";
      // Раскрываем в обратном порядке, чтобы первыми исчезали последние клетки
      s.order.reverse();
      run(REVEAL_MS, 1, 0, () => {
        s.order.reverse();
        s.phase = "idle";
        if (canvas.current) canvas.current.style.visibility = "hidden";
      });
    };
    // Если обложка ещё не закрылась целиком, дожидаемся
    if (s.phase === "cover") {
      const id = setInterval(() => {
        if (state.current.phase === "wait") {
          clearInterval(id);
          reveal();
        }
      }, 16);
      return () => clearInterval(id);
    }
    const t = setTimeout(reveal, 60);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <canvas ref={canvas} className="pointer-events-none fixed inset-0 z-[85] h-full w-full" style={{ visibility: "hidden" }} aria-hidden="true" />
      <div
        ref={label}
        className="pointer-events-none fixed left-1/2 top-1/2 z-[86] -translate-x-1/2 -translate-y-1/2 font-mono text-[12px] tracking-widest text-muted transition-opacity duration-200"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
    </>
  );
}
