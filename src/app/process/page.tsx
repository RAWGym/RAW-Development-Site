import type { Metadata } from "next";
import { PageHero, pagePad } from "@/components/pages/page-hero";
import { Process } from "@/components/home/process";
import { Pedantry } from "@/components/home/pedantry";
import { CtaBand } from "@/components/pages/cta-band";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Процесс",
  description: "Как мы работаем: бриф, аналитика, дизайн, разработка спринтами с демо каждую неделю, тесты, запуск и поддержка.",
};

const RITUALS = [
  { k: "Пн", t: "План недели", d: "Согласуем, что войдёт в спринт, и фиксируем в трекере." },
  { k: "Ежедневно", t: "Отчёт в чате", d: "Короткий апдейт: что сделано, что дальше, что мешает." },
  { k: "Пт", t: "Демо", d: "Показываем работающий результат на тестовом адресе или в TestFlight." },
  { k: "24/7", t: "Доступ ко всему", d: "Figma, репозиторий, трекер и тестовая версия открыты вам с первого дня." },
];

const PROMISES = [
  { v: "0 ₸", t: "доплат без согласования", d: "Если объём растёт, сначала обсуждаем и только потом меняем смету." },
  { v: "30 дней", t: "гарантии после запуска", d: "Исправляем найденные ошибки бесплатно." },
  { v: "100%", t: "кода и прав — ваши", d: "Передаём репозиторий, доступы, документацию и исходники дизайна." },
  { v: "NDA", t: "по запросу", d: "Подписываем соглашение о неразглашении до брифа." },
];

export default function ProcessPage() {
  return (
    <div data-section="process">
      <PageHero
        label="[Процесс] — 6 этапов"
        title={
          <>
            Без сюрпризов
            <br />
            и тишины
          </>
        }
        lead="Вы всегда знаете, что происходит с проектом: каждую неделю видите живой результат, а смета не меняется без вашего согласия."
      />

      <section className="border-t border-line py-16 md:py-24" style={pagePad} data-section="ритм">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="label mb-12 block">[Ритм работы]</h2>
          <div className="grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {RITUALS.map((r, i) => (
              <Reveal key={r.t} delay={i * 0.06} className="flex min-h-[220px] flex-col justify-between bg-bg p-7">
                <span className="font-mono text-[12px] text-muted">{r.k}</span>
                <div>
                  <h3 className="font-display text-2xl uppercase [font-variation-settings:'wdth'_115]">{r.t}</h3>
                  <p className="mt-2 text-muted">{r.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Process />

      <section className="border-t border-line py-16 md:py-24" style={pagePad} data-section="гарантии">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="label mb-12 block">[Гарантии]</h2>
          <div className="grid gap-12 md:grid-cols-4">
            {PROMISES.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.06} className={i > 0 ? "md:border-l md:border-line md:pl-8" : ""}>
                <div className="font-display text-[clamp(40px,4.4vw,72px)] font-semibold leading-none [font-variation-settings:'wdth'_115]">{p.v}</div>
                <div className="label mt-4">{p.t}</div>
                <p className="mt-3 text-sm text-muted">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Pedantry />
      <CtaBand title="Начнём с брифа?" />
    </div>
  );
}
