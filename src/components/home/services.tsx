"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal, SectionHead, sectionPad } from "@/components/reveal";
import {
  BeforeAfterWidget,
  BrowserWidget,
  ChatWidget,
  FlowWidget,
  GameWidget,
  PhoneWidget,
  TvWidget,
} from "@/components/widgets/service-widgets";

type Tile = {
  id: string;
  title: string;
  text: string;
  price: string;
  widget: ReactNode;
  span: string;
  h: string;
};

// Цены «от» — заглушки, см. src/content/site.ts и план сайта.
const TILES: Tile[] = [
  { id: "web", title: "Сайты", text: "Лендинги, корпоративные сайты, магазины и веб-сервисы.", price: "от 180 000 ₸", widget: <BrowserWidget />, span: "md:col-span-7", h: "h-[260px]" },
  { id: "apps", title: "Приложения", text: "iOS и Android: нативно или кроссплатформенно.", price: "от 1 800 000 ₸", widget: <PhoneWidget />, span: "md:col-span-5", h: "h-[260px]" },
  { id: "bots", title: "Telegram-боты и Mini Apps", text: "Запись, оплата, каталоги, рассылки и AI-ответы.", price: "от 100 000 ₸", widget: <ChatWidget />, span: "md:col-span-4", h: "h-[300px]" },
  { id: "games", title: "Игры", text: "Казуальные и аркадные игры для мобильных и веба.", price: "от 1 100 000 ₸", widget: <GameWidget />, span: "md:col-span-4", h: "h-[300px]" },
  { id: "tv", title: "Медиа и ТВ", text: "Плееры, медиатеки и прошивки для Android TV.", price: "от 700 000 ₸", widget: <TvWidget />, span: "md:col-span-4", h: "h-[300px]" },
  { id: "design", title: "Дизайн UI/UX", text: "От вайрфрейма до дизайн-системы. Потяните ползунок.", price: "от 150 000 ₸", widget: <BeforeAfterWidget />, span: "md:col-span-5", h: "h-[220px]" },
  { id: "crm", title: "Автоматизация и CRM", text: "Связываем сайт, бота, CRM, склад и 1С в одну систему.", price: "по задаче", widget: <FlowWidget />, span: "md:col-span-7", h: "h-[220px]" },
];

export function Services() {
  return (
    <section id="services" data-section="services" className="py-16 md:py-24" style={sectionPad} onPointerMove={trackSpotlight}>
      <div className="mx-auto max-w-[1440px]">
        <SectionHead
          index="01"
          label="Услуги"
          title={
            <>
              Всё, что работает
              <br />
              на экране
            </>
          }
          aside={<p className="max-w-[36ch] md:ml-auto">Каждая плитка — живой пример. Нажимайте, играйте, двигайте.</p>}
        />

        <div className="grid gap-4 md:grid-cols-12">
          {TILES.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 0.06} className={`group relative flex flex-col overflow-hidden rounded-[24px] border border-line bg-bg-raised p-4 md:p-5 ${t.span}`}>
              <SpotlightBorder />
              <div className={`relative ${t.h}`}>{t.widget}</div>
              <div className="relative mt-5 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-display text-xl uppercase [font-variation-settings:'wdth'_115]">{t.title}</h3>
                  <p className="mt-1 text-sm text-muted">{t.text}</p>
                </div>
                <span className="shrink-0 font-mono text-[11px] text-muted">{t.price}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <Link href="/services" className="label border-b border-line-strong pb-1 transition-colors hover:text-fg">
            Все услуги и сроки →
          </Link>
        </div>
      </div>
    </section>
  );
}

// Свечение карточки за курсором (координаты пишет onPointerMove секции).
function SpotlightBorder() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background: "radial-gradient(400px circle at var(--sx, 50%) var(--sy, 50%), rgb(237 235 231 / 0.07), transparent 60%)",
        boxShadow: "inset 0 0 0 1px rgb(237 235 231 / 0.14)",
      }}
    />
  );
}

export function trackSpotlight(e: React.PointerEvent<HTMLElement>) {
  const card = (e.target as HTMLElement).closest<HTMLElement>(".group");
  if (!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty("--sx", `${e.clientX - r.left}px`);
  card.style.setProperty("--sy", `${e.clientY - r.top}px`);
}
