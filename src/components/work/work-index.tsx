"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { allCases, type CaseStudy } from "@/content/cases";
import { CaseCover } from "@/components/case-cover";

type Filter = "all" | "business" | "personal";
type View = "grid" | "list";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "business", label: "Для бизнеса" },
  { id: "personal", label: "Для себя" },
];

// Список кейсов: фильтр по аудитории и два вида — плитка и таблица с превью у курсора.
export function WorkIndex() {
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>("grid");
  const list = allCases.filter((c) => filter === "all" || c.audience === filter);

  return (
    <div className="mt-14 md:mt-20">
      <div className="sticky top-[calc(env(safe-area-inset-top)+76px)] z-30 -mx-2 mb-10 flex flex-wrap items-center justify-between gap-3 rounded-full px-2 py-2 md:static">
        <div role="tablist" aria-label="Фильтр кейсов" className="flex gap-1 rounded-full border border-line-strong bg-bg/80 p-1 backdrop-blur">
          {FILTERS.map((f) => {
            const count = allCases.filter((c) => f.id === "all" || c.audience === f.id).length;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-4 py-2 text-[13px] transition-colors duration-300 ${filter === f.id ? "bg-fg text-bg" : "text-muted hover:text-fg"}`}
              >
                {f.label}
                <sup className="ml-1 font-mono text-[9px] opacity-60">{count}</sup>
              </button>
            );
          })}
        </div>
        <div className="hidden gap-1 rounded-full border border-line-strong p-1 md:flex" aria-label="Вид">
          {(["grid", "list"] as View[]).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`rounded-full px-4 py-2 font-mono text-[11px] uppercase transition-colors ${view === v ? "bg-fg text-bg" : "text-muted hover:text-fg"}`}
            >
              {v === "grid" ? "Плитка" : "Список"}
            </button>
          ))}
        </div>
      </div>

      {view === "grid" ? (
        <div key={filter} className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {list.map((c, i) => (
            <GridCard key={c.slug} c={c} i={i} />
          ))}
        </div>
      ) : (
        <ListView key={filter} list={list} />
      )}
    </div>
  );
}

function GridCard({ c, i }: { c: CaseStudy; i: number }) {
  // Вторая колонка смещена вниз, чтобы сетка дышала.
  return (
    <Link
      href={`/work/${c.slug}`}
      data-cursor="Смотреть"
      className={`group block animate-[screenIn_.7s_var(--ease-out)_both] ${i % 2 === 1 ? "md:translate-y-24" : ""}`}
      style={{ animationDelay: `${i * 60}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-line">
        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.04]">
          <CaseCover c={c} />
        </div>
        <span className="absolute left-5 top-5 rounded-full bg-bg/70 px-3 py-1 font-mono text-[10px] backdrop-blur">
          {c.audience === "business" ? "Бизнес" : "Для себя"} · {c.year}
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h2 className="font-display text-2xl uppercase [font-variation-settings:'wdth'_120] md:text-3xl">{c.title}</h2>
          <p className="mt-1 text-sm text-muted">{c.kind}</p>
        </div>
        <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover:rotate-[-45deg] group-hover:bg-fg group-hover:text-bg">
          →
        </span>
      </div>
    </Link>
  );
}

function ListView({ list }: { list: CaseStudy[] }) {
  const preview = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<CaseStudy | null>(null);

  const move = (e: React.PointerEvent) => {
    const el = preview.current;
    if (el) el.style.transform = `translate3d(${e.clientX + 24}px, ${e.clientY - 120}px, 0)`;
  };

  return (
    <div onPointerMove={move} onPointerLeave={() => setHover(null)} className="border-t border-line">
      <div className="grid grid-cols-[48px_1fr_1fr_160px_64px] gap-6 border-b border-line py-3 font-mono text-[10px] uppercase text-faint">
        <span>#</span>
        <span>Проект</span>
        <span>Тип</span>
        <span>Стек</span>
        <span className="text-right">Год</span>
      </div>
      {list.map((c, i) => (
        <Link
          key={c.slug}
          href={`/work/${c.slug}`}
          onPointerEnter={() => setHover(c)}
          className="group grid grid-cols-[48px_1fr_1fr_160px_64px] items-center gap-6 border-b border-line py-6 transition-colors hover:bg-fg/[0.03]"
        >
          <span className="font-mono text-[11px] text-faint">{String(i + 1).padStart(2, "0")}</span>
          <span className="font-display text-3xl uppercase transition-transform duration-500 ease-[var(--ease-out)] [font-variation-settings:'wdth'_120] group-hover:translate-x-3">
            {c.title}
          </span>
          <span className="text-sm text-muted">{c.kind}</span>
          <span className="truncate font-mono text-[11px] text-muted">{c.stack.slice(0, 2).join(" · ")}</span>
          <span className="text-right font-mono text-[11px]">{c.year}</span>
        </Link>
      ))}
      <div
        ref={preview}
        className="pointer-events-none fixed left-0 top-0 z-40 aspect-[4/3] w-[320px] overflow-hidden rounded-2xl border border-line-strong transition-opacity duration-300"
        style={{ opacity: hover ? 1 : 0 }}
        aria-hidden="true"
      >
        {hover && <CaseCover c={hover} />}
      </div>
    </div>
  );
}
