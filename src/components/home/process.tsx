"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHead, sectionPad } from "@/components/reveal";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { t: "Бриф", d: "Созвон, цели, ограничения, бюджет.", time: "1–2 дня", out: "Понимание задачи и оценка" },
  { t: "Аналитика", d: "Конкуренты, сценарии пользователей, структура.", time: "3–5 дней", out: "ТЗ и карта экранов" },
  { t: "Дизайн", d: "Вайрфреймы, дизайн-система, прототип.", time: "1–3 недели", out: "Макеты в Figma" },
  { t: "Разработка", d: "Код по спринтам, демо каждую неделю.", time: "2–12 недель", out: "Рабочий продукт на тестовом адресе" },
  { t: "Тесты", d: "Устройства, нагрузка, скорость, безопасность.", time: "3–7 дней", out: "Отчёт и исправления" },
  { t: "Запуск и поддержка", d: "Публикация, аналитика, развитие.", time: "постоянно", out: "Продукт в сторах и в сети" },
];

// Процесс: вертикальная линия прорисовывается по ходу скролла, шаги зажигаются.
export function Process() {
  const root = useRef<HTMLElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = root.current;
    if (!sec || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".steps", start: "top 70%", end: "bottom 60%", scrub: true } },
      );
      gsap.utils.toArray<HTMLElement>(".step").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.86 },
          { opacity: 1, duration: 0.4, scrollTrigger: { trigger: el, start: "top 65%", toggleActions: "play none none reverse" } },
        );
      });
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="process" data-section="process" className="py-24 md:py-36" style={sectionPad}>
      <div className="mx-auto max-w-[1440px]">
        <SectionHead
          index="04"
          label="Процесс"
          title={
            <>
              Шесть шагов
              <br />
              без сюрпризов
            </>
          }
          aside={<p className="max-w-[36ch] md:ml-auto">На каждом шаге понятно, сколько он займёт и что вы получите на выходе.</p>}
        />

        <div className="steps relative md:ml-[33.33%]">
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-line" aria-hidden="true" />
          <div ref={line} className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-fg" aria-hidden="true" />
          <ol className="space-y-12">
            {STEPS.map((s, i) => (
              <li key={s.t} className="step relative grid gap-3 pl-12 md:grid-cols-[1fr_auto] md:gap-8">
                <span className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border border-fg bg-bg" aria-hidden="true" />
                <div>
                  <span className="label">0{i + 1}</span>
                  <h3 className="mt-2 font-display text-3xl uppercase [font-variation-settings:'wdth'_120]">{s.t}</h3>
                  <p className="mt-2 max-w-[48ch] text-muted">{s.d}</p>
                </div>
                <div className="flex flex-col gap-1 md:items-end md:text-right">
                  <span className="font-mono text-[12px] text-fg">{s.time}</span>
                  <span className="text-sm text-muted">→ {s.out}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
