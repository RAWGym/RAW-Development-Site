"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { allCases } from "@/content/cases";
import { services } from "@/content/services";
import { nav, site } from "@/content/site";
import { setScrollLocked } from "./smooth-scroll";

type Item = { id: string; group: string; label: string; hint?: string; run: () => void };

export const PALETTE_EVENT = "raw:palette";

// Быстрый переход ⌘K / Ctrl+K: страницы, кейсы, услуги и действия.
export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [copied, setCopied] = useState(false);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => router.push(href);
    return [
      { id: "home", group: "Страницы", label: "Главная", run: go("/") },
      ...nav.map((n) => ({ id: n.href, group: "Страницы", label: n.label, run: go(n.href) })),
      { id: "start", group: "Страницы", label: "Рассчитать проект", hint: "калькулятор", run: go("/start") },
      ...allCases.map((c) => ({ id: c.slug, group: "Кейсы", label: c.title, hint: c.kind, run: go(`/work/${c.slug}`) })),
      ...services.map((s) => ({ id: `svc-${s.id}`, group: "Услуги", label: s.title, hint: s.price, run: go(`/services#${s.id}`) })),
      { id: "wa", group: "Действия", label: "Написать в WhatsApp", hint: site.contacts.whatsapp.label, run: () => window.open(site.contacts.whatsapp.href, "_blank") },
      {
        id: "copy",
        group: "Действия",
        label: "Скопировать номер",
        hint: site.contacts.whatsapp.label,
        run: () => {
          navigator.clipboard?.writeText(site.contacts.whatsapp.label.replace(/\s/g, "")).catch(() => {});
          setCopied(true);
        },
      },
      { id: "grid", group: "Действия", label: "Показать сетку вёрстки", hint: "клавиша G", run: () => window.dispatchEvent(new KeyboardEvent("keydown", { key: "g" })) },
      { id: "snake", group: "Действия", label: "Поиграть в змейку", hint: "404", run: go("/snake") },
    ];
  }, [router]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(s));
  }, [items, q]);

  const show = (v: boolean) => {
    setOpen(v);
    setQ("");
    setSel(0);
    setCopied(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        show(!open);
      } else if (e.key === "Escape" && open) show(false);
    };
    const onOpen = () => show(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(PALETTE_EVENT, onOpen);
    };
  }, [open]);

  useEffect(() => {
    setScrollLocked(open);
    if (open) setTimeout(() => input.current?.focus(), 30);
  }, [open]);

  useEffect(() => {
    list.current?.querySelector(`[data-i="${sel}"]`)?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  const run = (it: Item | undefined) => {
    if (!it) return;
    it.run();
    if (it.id !== "copy") show(false);
  };

  if (!open) return null;

  let lastGroup = "";
  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-bg/60 px-4 pt-[14vh] backdrop-blur-sm" onClick={() => show(false)} data-lenis-prevent>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Быстрый переход"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[620px] animate-[screenIn_.35s_var(--ease-out)_both] overflow-hidden rounded-[22px] border border-line-strong bg-bg-raised shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9)]"
      >
        <div className="flex items-center gap-3 border-b border-line px-5">
          <span className="font-mono text-[12px] text-faint">&gt;</span>
          <input
            ref={input}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setSel(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSel((s) => Math.min(filtered.length - 1, s + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSel((s) => Math.max(0, s - 1));
              } else if (e.key === "Enter") run(filtered[sel]);
            }}
            placeholder="Куда перейти? Кейсы, услуги, контакты…"
            className="h-14 flex-1 bg-transparent text-[16px] outline-none placeholder:text-faint focus-visible:outline-none"
            aria-controls="palette-list"
            aria-activedescendant={filtered[sel] ? `pi-${filtered[sel].id}` : undefined}
          />
          <kbd className="rounded-md border border-line-strong px-1.5 py-0.5 font-mono text-[10px] text-muted">esc</kbd>
        </div>
        <ul ref={list} id="palette-list" role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
          {filtered.length === 0 && <li className="px-3 py-8 text-center text-muted">Ничего не нашлось</li>}
          {filtered.map((it, i) => {
            const head = it.group !== lastGroup;
            lastGroup = it.group;
            return (
              <li key={it.id}>
                {head && <div className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-faint">{it.group}</div>}
                <button
                  type="button"
                  id={`pi-${it.id}`}
                  role="option"
                  aria-selected={i === sel}
                  data-i={i}
                  onMouseMove={() => setSel(i)}
                  onClick={() => run(it)}
                  className={`flex w-full items-center justify-between gap-4 rounded-xl px-3 py-3 text-left transition-colors ${i === sel ? "bg-fg text-bg" : "text-fg/90"}`}
                >
                  <span className="truncate">{it.id === "copy" && copied ? "Скопировано ✓" : it.label}</span>
                  {it.hint && <span className={`shrink-0 truncate font-mono text-[11px] ${i === sel ? "text-bg/60" : "text-muted"}`}>{it.hint}</span>}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex gap-4 border-t border-line px-5 py-3 font-mono text-[10px] text-faint">
          <span>↑↓ выбрать</span>
          <span>↵ открыть</span>
          <span className="ml-auto"><span className="font-sans">⌘</span>K / Ctrl+K</span>
        </div>
      </div>
    </div>
  );
}
