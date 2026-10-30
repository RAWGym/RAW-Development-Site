"use client";

import Link from "next/link";
import { useState } from "react";
import { allCases } from "@/content/cases";
import { stack } from "@/content/stack";

// Карта технологий: выбранная технология подсвечивает проекты, где она используется.
export function StackMap() {
  const [active, setActive] = useState<string | null>(null);
  const used = (name: string) => allCases.filter((c) => c.stack.includes(name));
  const cases = active ? used(active) : [];

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="space-y-4 lg:col-span-8">
        {stack.map((g, gi) => (
          <div key={g.id} className="rounded-[24px] border border-line p-5 md:p-7">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h2 className="font-display text-xl uppercase [font-variation-settings:'wdth'_115] md:text-2xl">
                <span className="mr-3 font-mono text-[11px] text-faint">0{gi + 1}</span>
                {g.title}
              </h2>
              <p className="max-w-[46ch] text-sm text-muted">{g.text}</p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((t) => {
                const n = used(t.name).length;
                const on = active === t.name;
                return (
                  <li key={t.name}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onPointerEnter={(e) => e.pointerType === "mouse" && setActive(t.name)}
                      onFocus={() => setActive(t.name)}
                      onClick={() => setActive(on ? null : t.name)}
                      className={`group flex min-h-11 items-center gap-2.5 rounded-full border py-2 pl-4 pr-3 text-left transition-colors duration-200 ${on ? "border-accent bg-accent-soft" : "border-line-strong hover:border-fg"}`}
                    >
                      <span className="font-mono text-[13px]">{t.name}</span>
                      <span className="text-[12px] text-muted">{t.tag}</span>
                      {n > 0 && (
                        <span className={`grid h-5 min-w-5 place-items-center rounded-full px-1 font-mono text-[10px] ${on ? "bg-accent text-bg" : "bg-fg/10 text-muted"}`}>{n}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <aside className="lg:col-span-4" aria-live="polite">
        <div className="rounded-[24px] border border-line-strong bg-bg-raised p-6 lg:sticky lg:top-28">
          <span className="label">{active ? `Где работает ${active}` : "Проекты на этом стеке"}</span>
          {active ? (
            cases.length ? (
              <ul className="mt-5 divide-y divide-line">
                {cases.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/work/${c.slug}`} className="group flex items-center justify-between gap-4 py-3">
                      <span>
                        <span className="block font-display text-lg uppercase [font-variation-settings:'wdth'_110]">{c.title}</span>
                        <span className="block text-[13px] text-muted">{c.kind}</span>
                      </span>
                      <span className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-muted">Используем в работе, публичного кейса пока нет.</p>
            )
          ) : (
            <p className="mt-5 text-muted">
              {stack.reduce((s, g) => s + g.items.length, 0)} технологий в {stack.length} направлениях. Выберите любую слева.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
