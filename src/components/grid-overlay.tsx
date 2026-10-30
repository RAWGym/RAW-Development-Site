"use client";

import { useEffect, useState } from "react";

// Пасхалка: клавиша G показывает 12-колоночную сетку вёрстки.
export function GridOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "g" || e.key === "G" || e.key === "п" || e.key === "П") setVisible((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[55]"
      style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter-r)" }}
      aria-hidden="true"
    >
      <div className="mx-auto grid h-full max-w-[1440px] grid-cols-4 gap-4 md:grid-cols-12 md:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`h-full border-x border-[rgb(255_80_80/0.35)] bg-[rgb(255_80_80/0.05)] ${i >= 4 ? "hidden md:block" : ""}`}
          >
            <span className="block pt-24 text-center font-mono text-[9px] text-[rgb(255_120_120/0.8)]">{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
