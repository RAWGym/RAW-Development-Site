"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { setScrollLocked } from "./smooth-scroll";
import { nav, site } from "@/content/site";
import { PALETTE_EVENT } from "./command-palette";

// Шапка: на старте — полная строка, при прокрутке сжимается в стеклянную капсулу.
// Под пунктами меню ездит подсветка, кнопка прокручивает текст при наведении.
export function Header() {
  const [compact, setCompact] = useState(false);
  const pathname = usePathname();
  // Меню открыто только на той странице, где его открыли: переход закрывает его сам.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setScrollLocked(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenAt(null);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      setScrollLocked(false);
    };
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 z-50 flex justify-center"
      style={{
        top: "calc(env(safe-area-inset-top, 0px) + 12px)",
        paddingLeft: "var(--gutter)",
        paddingRight: "var(--gutter-r)",
      }}
    >
      <div
        className={[
          "relative flex w-full items-center justify-between gap-6 border transition-[max-width,padding,background-color,border-color,border-radius] duration-700 ease-[var(--ease-out)]",
          compact && !open
            ? "max-w-[940px] rounded-full border-line-strong bg-[var(--glass)] py-2 pl-5 pr-2 shadow-[0_10px_40px_-12px_rgb(0_0_0/0.7)] backdrop-blur-xl"
            : "max-w-[1440px] rounded-none border-transparent bg-transparent px-0 py-3",
        ].join(" ")}
      >
        <Link href="/" aria-label="RAW Development — на главную" className="group flex shrink-0 items-center gap-3">
          <Logo className={`h-auto text-fg transition-[width] duration-700 ease-[var(--ease-out)] ${compact ? "w-[52px]" : "w-[68px]"}`} />
          <span
            className={`hidden font-mono text-[10px] uppercase leading-[1.15] tracking-[0.14em] text-muted transition-opacity duration-500 lg:block ${compact ? "opacity-0" : "opacity-100"}`}
            aria-hidden="true"
          >
            Development
            <br />
            <span className="text-faint">Studio · {site.city}</span>
          </span>
        </Link>

        <NavPills pathname={pathname} />

        <div className="flex items-center gap-2">
          <span
            className={`hidden items-center gap-2 font-mono text-[10px] text-muted transition-opacity duration-500 xl:flex ${compact ? "pointer-events-none w-0 opacity-0" : "opacity-100"}`}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#5fd38d] opacity-70" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#5fd38d]" />
            </span>
            {site.status}
          </span>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(PALETTE_EVENT))}
            className="hidden h-9 items-center gap-1 rounded-full border border-line-strong px-3 font-mono text-[11px] text-muted transition-colors hover:border-fg hover:text-fg md:inline-flex"
            aria-label="Быстрый переход (⌘K)"
          >
            <span className="font-sans">⌘</span>K
          </button>
          <RollButton href="/start" className="hidden sm:inline-flex">
            Обсудить проект
          </RollButton>
          <button
            type="button"
            className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-bg/40 backdrop-blur md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpenAt(open ? null : pathname)}
          >
            <span className="relative block h-2.5 w-4">
              <span className={`absolute left-0 h-px w-4 bg-fg transition-all duration-300 ${open ? "top-1 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-4 bg-fg transition-all duration-300 ${open ? "top-1 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </div>

      <MobileMenu open={open} pathname={pathname} />
    </header>
  );
}

function NavPills({ pathname }: { pathname: string }) {
  const list = useRef<HTMLUListElement>(null);
  const pill = useRef<HTMLSpanElement>(null);

  // Подсветка переезжает под пункт, на который навели, и возвращается к активному.
  const moveTo = (el: HTMLElement | null) => {
    const p = pill.current;
    const l = list.current;
    if (!p || !l) return;
    if (!el) {
      p.style.opacity = "0";
      return;
    }
    const a = el.getBoundingClientRect();
    const b = l.getBoundingClientRect();
    p.style.opacity = "1";
    p.style.width = `${a.width}px`;
    p.style.transform = `translateX(${a.left - b.left}px)`;
  };

  const toActive = () => moveTo(list.current?.querySelector<HTMLElement>("[data-active='true']") ?? null);

  useEffect(() => {
    toActive();
    window.addEventListener("resize", toActive);
    return () => window.removeEventListener("resize", toActive);
  });

  return (
    <nav aria-label="Основная навигация" className="hidden md:block">
      <ul ref={list} className="relative flex items-center" onPointerLeave={toActive}>
        <span
          ref={pill}
          className="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-fg/[0.08] opacity-0 ring-1 ring-inset ring-fg/10 transition-[transform,width,opacity] duration-500 ease-[var(--ease-out)]"
          aria-hidden="true"
        />
        {nav.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                data-active={active}
                aria-current={active ? "page" : undefined}
                onPointerEnter={(e) => moveTo(e.currentTarget)}
                onFocus={(e) => moveTo(e.currentTarget)}
                className={`relative block whitespace-nowrap rounded-full px-4 py-2 text-[13px] tracking-wide transition-colors duration-200 hover:text-fg ${active ? "text-fg" : "text-muted"}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// Кнопка, у которой текст при наведении уезжает вверх, а снизу приезжает такой же.
export function RollButton({ href, children, className = "" }: { href: string; children: string; className?: string }) {
  return (
    <Link
      href={href}
      className={`group relative shrink-0 items-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-fg py-2 pl-4 pr-2 text-[13px] font-medium text-bg ${className}`}
    >
      <span className="relative block h-[1.3em] overflow-hidden leading-[1.3em]">
        <span className="block transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-full">{children}</span>
        <span className="absolute inset-x-0 top-full block transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-full" aria-hidden="true">
          {children}
        </span>
      </span>
      <span className="grid h-6 w-6 place-items-center rounded-full bg-bg text-[11px] text-fg transition-transform duration-500 ease-[var(--ease-out)] group-hover:-rotate-45">
        →
      </span>
    </Link>
  );
}

function MobileMenu({ open, pathname }: { open: boolean; pathname: string }) {
  return (
    <div
      id="mobile-menu"
      className={`fixed inset-0 -z-10 flex flex-col justify-between bg-bg/95 backdrop-blur-xl transition-[clip-path] duration-700 ease-[var(--ease-out)] md:hidden ${open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"}`}
      style={{
        paddingLeft: "var(--gutter)",
        paddingRight: "var(--gutter-r)",
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 96px)",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 56px)",
      }}
      aria-hidden={!open}
      inert={!open}
      data-lenis-prevent
    >
      <ul className="flex flex-col">
        {[{ href: "/", label: "Главная" }, ...nav].map((item, i) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.href} className="overflow-hidden border-b border-line">
              <Link
                href={item.href}
                className={`flex items-baseline gap-4 py-4 font-display text-[clamp(30px,9vw,44px)] uppercase leading-none transition-[transform,opacity] duration-700 ease-[var(--ease-out)] [font-variation-settings:'wdth'_115] ${open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} ${active ? "text-fg" : "text-muted"}`}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              >
                <span className="label w-8">0{i}</span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div
        className={`flex flex-col gap-5 transition-opacity duration-700 ${open ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: open ? "420ms" : "0ms" }}
      >
        <RollButton href="/start" className="inline-flex self-start">
          Обсудить проект
        </RollButton>
        <a href={site.contacts.whatsapp.href} className="font-mono text-[12px] text-muted">
          WhatsApp · {site.contacts.whatsapp.label}
        </a>
      </div>
    </div>
  );
}
