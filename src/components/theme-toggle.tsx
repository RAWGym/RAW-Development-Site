"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";
import { THEME_KEY as KEY } from "./theme-script";


export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark" as Theme);

  const apply = (next: Theme) => {
    const root = document.documentElement;
    if (next === "light") root.dataset.theme = "light";
    else delete root.dataset.theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#f3f1ec" : "#0b0b0c");
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    window.dispatchEvent(new CustomEvent("raw:theme", { detail: next }));
  };

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return apply(next);
    // Круг раскрывается из центра кнопки до самого дальнего угла экрана
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const max = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const s = document.documentElement.style;
    s.setProperty("--vt-x", `${x}px`);
    s.setProperty("--vt-y", `${y}px`);
    s.setProperty("--vt-r", `${max}px`);
    doc.startViewTransition(() => apply(next));
  };

  const light = theme === "light";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Включить тёмную тему" : "Включить светлую тему"}
      title={light ? "Тёмная тема" : "Светлая тема"}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-strong text-muted transition-colors duration-300 hover:border-fg hover:text-fg ${className}`}
    >
      {/* Пиксельные солнце и луна, как и логотип */}
      <svg viewBox="0 0 9 9" className="h-4 w-4" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
        {light ? (
          // луна
          <path d="M3 1h3v1H3zM2 2h1v1H2zM1 3h1v3H1zM2 6h1v1H2zM3 7h3v1H3zM6 6h1v1H6zM5 5h1v1H5zM4 3h1v2H4zM5 2h1v1H5z" />
        ) : (
          // солнце
          <path d="M4 0h1v1H4zM4 8h1v1H4zM0 4h1v1H0zM8 4h1v1H8zM1 1h1v1H1zM7 1h1v1H7zM1 7h1v1H1zM7 7h1v1H7zM3 2h3v1H3zM2 3h5v3H2zM3 6h3v1H3z" />
        )}
      </svg>
    </button>
  );
}

const readTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const subscribe = (cb: () => void) => {
  window.addEventListener("raw:theme", cb);
  return () => window.removeEventListener("raw:theme", cb);
};
