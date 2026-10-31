"use client";

import { SectionHead, sectionPad } from "@/components/reveal";

// TODO: отзывы-заглушки. До публичного запуска заменить настоящими или убрать секцию.
const REVIEWS = [
  { who: "Владелец барбершопа", city: "Алматы", time: "14:02", text: "Сделали бота за две недели, записи теперь идут сами. Всё чётко по срокам." },
  { who: "Основатель стартапа", city: "Астана", time: "10:47", text: "Придираются к каждому пикселю, в хорошем смысле. Приложение выглядит дороже, чем стоило." },
  { who: "Организатор концертов", city: "Алматы", time: "21:15", text: "Сайт выдержал старт продаж, ни одного падения. Схема зала — огонь." },
  { who: "Частный клиент", city: "Шымкент", time: "18:30", text: "Сделали мне свой плеер без рекламы. Пользуюсь каждый день." },
];

// Отзывы в виде сообщений Telegram, лента прокручивается свайпом.
export function Testimonials() {
  return (
    <section data-section="reviews" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1440px]" style={sectionPad}>
        <SectionHead index="06" label="Отзывы" title="Что говорят клиенты" />
      </div>
      <div className="mx-auto max-w-[1440px]" style={sectionPad}>
      <div
        className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0"
        style={{ scrollPaddingLeft: "var(--gutter)" }}
        data-lenis-prevent-horizontal
      >
        {REVIEWS.map((r) => (
          <figure key={r.who} className="flex w-[min(86vw,420px)] shrink-0 snap-start flex-col rounded-[28px] border border-line bg-bg-raised p-5 lg:w-auto">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft text-[15px] font-medium text-accent">
                {r.who.slice(0, 1)}
              </span>
              <div>
                <div className="text-[14px]">{r.who}</div>
                <div className="font-mono text-[10px] text-muted">{r.city} · в сети</div>
              </div>
            </div>
            <blockquote className="relative mt-5 flex-1 rounded-2xl rounded-tl-sm bg-bg px-4 py-3 text-[15px] leading-relaxed">
              {r.text}
              <span className="ml-3 inline-block translate-y-1 font-mono text-[10px] text-muted">{r.time} ✓✓</span>
            </blockquote>
          </figure>
        ))}
      </div>
      </div>
    </section>
  );
}
