"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { nav } from "@/content/site";

// Шапка: на старте — полная строка, при скролле вниз сжимается
// в плавающую стеклянную капсулу по центру.
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
          "flex items-center justify-between gap-6 border transition-all duration-700 ease-[var(--ease-out)]",
          compact
            ? "w-full max-w-[720px] rounded-full border-line-strong bg-[var(--glass)] py-2 pl-5 pr-2 backdrop-blur-xl"
            : "w-full max-w-[1440px] rounded-none border-transparent bg-transparent px-1 py-3",
        ].join(" ")}
      >
        <Link href="/" aria-label="RAW Development — на главную" className="shrink-0">
          <Logo
            className={`h-auto text-fg transition-all duration-700 ease-[var(--ease-out)] ${compact ? "w-[64px]" : "w-[88px]"}`}
          />
        </Link>

        <nav aria-label="Основная навигация" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative rounded-full px-3 py-2 text-[13px] tracking-wide transition-colors duration-200 hover:text-fg ${active ? "text-fg" : "text-muted"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/start"
            className="group relative hidden overflow-hidden rounded-full bg-fg px-4 py-2 text-[13px] font-medium text-bg sm:inline-flex"
          >
            <span className="relative z-10">Обсудить проект</span>
          </Link>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-strong md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpenAt(open ? null : pathname)}
          >
            <span className="relative block h-2.5 w-4">
              <span
                className={`absolute left-0 h-px w-4 bg-fg transition-transform duration-300 ${open ? "top-1 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-px w-4 bg-fg transition-transform duration-300 ${open ? "top-1 -rotate-45" : "top-2.5"}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-0 -z-10 border-b border-line bg-bg/95 pb-8 pt-24 backdrop-blur-xl md:hidden"
          style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter-r)" }}
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-baseline gap-4 border-b border-line py-4 font-display text-3xl"
                  style={{ fontVariationSettings: "'wdth' 125" }}
                >
                  <span className="label">[0{i + 1}]</span>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-6">
              <Link href="/start" className="inline-flex rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg">
                Обсудить проект
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
