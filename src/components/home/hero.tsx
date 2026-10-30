"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ScrambleWord } from "@/components/scramble-word";
import { AudienceSwitch, useAudience } from "@/components/audience";
import { site } from "@/content/site";

const WORDS = {
  business: ["сайты", "приложения", "Telegram-ботов", "Mini Apps", "CRM", "банки"],
  personal: ["трекеры", "плееры", "игры", "прошивки ТВ", "своё", "мечты"],
};

const LEAD = {
  business:
    "Сайты, приложения, Telegram-боты и CRM для бизнеса. От идеи и аналитики до запуска и поддержки, с понятными сроками и продуктом, в котором каждый пиксель на своём месте.",
  personal:
    "Свой музыкальный плеер, трекер привычек, игра или прошивка для телевизора. Делаем продукты под вашу жизнь так же тщательно, как для банков.",
};

export function Hero() {
  const { audience } = useAudience();
  const spot = useRef<HTMLDivElement>(null);

  // Подсветка сетки вокруг курсора.
  useEffect(() => {
    const el = spot.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section
      data-section="hero"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-32 md:pb-20"
      style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter-r)" }}
    >
      <div ref={spot} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgb(237 235 231 / 0.22) 1px, transparent 1px), linear-gradient(90deg, rgb(237 235 231 / 0.22) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(260px circle at var(--mx, -500px) var(--my, -500px), black, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(260px circle at var(--mx, -500px) var(--my, -500px), black, transparent 70%)",
          }}
        />
        {/* Разметка размеров, как в Figma */}
        <div className="absolute right-[var(--gutter-r)] top-32 hidden flex-col items-end gap-2 font-mono text-[10px] text-faint md:flex">
          <span>W 1440 · H auto</span>
          <span>grid 12 × 64</span>
          <span>radius 0 / 999</span>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1440px]">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <span className="label">[00] — Студия разработки · {site.city}</span>
          <AudienceSwitch />
        </div>

        <h1 className="font-display text-[clamp(26px,6.2vw,120px)] font-semibold uppercase leading-[0.95] tracking-[-0.01em] [font-variation-settings:'wdth'_100] md:[font-variation-settings:'wdth'_120]">
          {audience === "business" ? "Разрабатываем" : "Сделаем вам"}
          <br />
          <ScrambleWord key={audience} words={WORDS[audience]} />
        </h1>

        <div className="mt-12 grid gap-8 md:grid-cols-12 md:items-end">
          <p className="max-w-[48ch] text-lg leading-relaxed text-muted md:col-span-6">{LEAD[audience]}</p>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:col-start-8 md:justify-end">
            <Link
              href="/start"
              className="rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-bg transition-transform duration-200 hover:scale-[1.03]"
            >
              Обсудить проект
            </Link>
            <Link
              href="#work"
              data-cursor="Смотреть"
              className="rounded-full border border-line-strong px-6 py-3.5 text-sm transition-colors duration-200 hover:border-fg"
            >
              Смотреть кейсы
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
