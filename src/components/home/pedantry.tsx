"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHead, sectionPad } from "@/components/reveal";

const CHECKS = [
  { t: "Пиксель-перфект", d: "Сетка 8 px, вёрстка совпадает с макетом до пикселя." },
  { t: "Скорость", d: "Загрузка быстрее 2 секунд, 60 кадров в анимациях." },
  { t: "Доступность", d: "Контраст, клавиатура и экранные дикторы по WCAG 2.2." },
  { t: "Тесты", d: "Автотесты на критичные сценарии, проверка на реальных устройствах." },
  { t: "Код-ревью", d: "Каждое изменение смотрят двое. Никакого «потом поправим»." },
  { t: "Безопасность", d: "Шифрование, защита данных и платёжных сценариев." },
];

const SCORES = [
  { k: "Скорость", v: 100 },
  { k: "Доступность", v: 100 },
  { k: "Практики", v: 100 },
  { k: "SEO", v: 100 },
];

// Педантичность в деталях: пункты отмечаются галочками по ходу скролла.
export function Pedantry() {
  return (
    <section data-section="quality" className="py-16 md:py-24" style={sectionPad}>
      <div className="mx-auto max-w-[1440px]">
        <SectionHead index="05" label="Стандарты" title={<>Педантичность<br />в деталях</>} />
        <div className="grid gap-12 md:grid-cols-12">
          <ul className="divide-y divide-line border-y border-line md:col-span-7">
            {CHECKS.map((c) => (
              <CheckRow key={c.t} {...c} />
            ))}
          </ul>
          <div className="md:col-span-4 md:col-start-9">
            <div className="rounded-[28px] border border-line bg-bg-raised p-6 md:sticky md:top-28">
              <span className="label">Lighthouse · этот сайт</span>
              <div className="mt-6 grid grid-cols-2 gap-6">
                {SCORES.map((s) => (
                  <Gauge key={s.k} {...s} />
                ))}
              </div>
              <p className="mt-6 font-mono text-[10px] text-faint">Цель для продакшена. Проверим при запуске.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function useSeen<T extends HTMLElement>(threshold = 0.6) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

function CheckRow({ t, d }: { t: string; d: string }) {
  const [ref, seen] = useSeen<HTMLLIElement>();
  return (
    <li ref={ref} className="flex items-start gap-5 py-6">
      <span
        className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-md border transition-colors duration-500 ${seen ? "border-accent bg-accent text-bg" : "border-line-strong text-transparent"}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
          <path
            d="M3 8.5l3 3 7-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="16"
            strokeDashoffset={seen ? 0 : 16}
            style={{ transition: "stroke-dashoffset .5s .2s var(--ease-out)" }}
          />
        </svg>
      </span>
      <div>
        <h3 className="font-display text-xl uppercase [font-variation-settings:'wdth'_115]">{t}</h3>
        <p className="mt-1 text-muted">{d}</p>
      </div>
    </li>
  );
}

function Gauge({ k, v }: { k: string; v: number }) {
  const [ref, seen] = useSeen<HTMLDivElement>(0.5);
  const c = 2 * Math.PI * 26;
  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative h-20 w-20">
        <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
          <circle cx="32" cy="32" r="26" fill="none" stroke="var(--line-strong)" strokeWidth="4" />
          <circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            stroke="var(--fg)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={seen ? c * (1 - v / 100) : c}
            style={{ transition: "stroke-dashoffset 1.4s var(--ease-out)" }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-xl [font-variation-settings:'wdth'_110]">{v}</span>
      </div>
      <span className="font-mono text-[10px] text-muted">{k}</span>
    </div>
  );
}
