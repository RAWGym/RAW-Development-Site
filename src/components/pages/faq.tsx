"use client";

import { useState } from "react";

// Вопросы и ответы: один раскрытый пункт за раз.
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className="border-b border-line">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg md:text-xl"
            >
              {it.q}
              <span className={`font-mono text-sm text-muted transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`} aria-hidden="true">
                +
              </span>
            </button>
            <div className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out)]" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
              <p className="min-h-0 max-w-[68ch] overflow-hidden text-muted" inert={!isOpen}>
                <span className="block pb-6">{it.a}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
