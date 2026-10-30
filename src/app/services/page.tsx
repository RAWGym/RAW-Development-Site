import type { Metadata } from "next";
import { PageHero, pagePad } from "@/components/pages/page-hero";
import { ServiceList } from "@/components/pages/service-list";
import { Faq } from "@/components/pages/faq";
import { CtaBand } from "@/components/pages/cta-band";
import { Reveal } from "@/components/reveal";
import { faq } from "@/content/services";

export const metadata: Metadata = {
  title: "Услуги",
  description: "Сайты, мобильные приложения, Telegram-боты и Mini Apps, игры, плееры и прошивки ТВ, дизайн и автоматизация. Цены и сроки.",
};

const MODELS = [
  { t: "Фиксированный проект", d: "Понятный объём, цена и срок заранее. Оплата по этапам после приёмки.", tag: "Чаще всего" },
  { t: "Выделенная команда", d: "Дизайнер, разработчики и менеджер работают только над вашим продуктом. Помесячно.", tag: "Для больших продуктов" },
  { t: "Поддержка и развитие", d: "Обновления, мониторинг, новые функции и исправления по подписке.", tag: "После запуска" },
];

export default function ServicesPage() {
  return (
    <div data-section="services">
      <PageHero
        label="[Услуги] — 07 направлений"
        title={
          <>
            Делаем
            <br />
            под ключ
          </>
        }
        lead="От идеи и дизайна до релиза и поддержки. Цены указаны «от»: точную оценку с разбивкой по этапам даём после короткого брифа."
      />

      <section className="pb-24 md:pb-36" style={pagePad}>
        <div className="mx-auto max-w-[1440px]">
          <ServiceList />
        </div>
      </section>

      <section className="border-t border-line py-24 md:py-32" style={pagePad} data-section="форматы">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="label mb-12 block">[Форматы работы]</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {MODELS.map((m, i) => (
              <Reveal key={m.t} delay={i * 0.08} className="flex min-h-[260px] flex-col justify-between rounded-[24px] border border-line bg-bg-raised p-7">
                <span className="label">{m.tag}</span>
                <div>
                  <h3 className="font-display text-2xl uppercase [font-variation-settings:'wdth'_115]">{m.t}</h3>
                  <p className="mt-3 text-muted">{m.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-24 md:py-32" style={pagePad} data-section="вопросы">
        <div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="label mb-6 block">[FAQ]</h2>
            <h2 className="font-display text-[clamp(30px,4vw,64px)] font-semibold uppercase leading-[0.95] [font-variation-settings:'wdth'_115]">Частые вопросы</h2>
          </div>
          <div className="md:col-span-8">
            <Faq items={faq} />
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
