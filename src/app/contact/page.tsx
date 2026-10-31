import type { Metadata } from "next";
import { PageHero, pagePad } from "@/components/pages/page-hero";
import { FinalCta } from "@/components/home/final-cta";
import { LocalTime } from "@/components/pages/local-time";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Контакты",
  description: `Связаться с RAW Development: WhatsApp ${site.contacts.whatsapp.label}. ${site.city}.`,
};

export default function ContactPage() {
  const { whatsapp } = site.contacts;
  return (
    <div data-section="contact">
      <PageHero
        label="[Контакты]"
        title={
          <>
            Напишите
            <br />
            нам
          </>
        }
        lead="Отвечаем в течение часа в рабочее время. Можно коротко: что хотите сделать и к какому сроку."
      />

      <section className="pb-4" style={pagePad}>
        <div className="mx-auto grid max-w-[1440px] gap-4 md:grid-cols-3">
          <a
            href={whatsapp.href}
            target="_blank"
            rel="noreferrer"
            className="group flex min-h-[260px] flex-col justify-between rounded-[28px] bg-fg p-7 text-bg [container-type:inline-size] md:col-span-2 md:p-10"
          >
            <span className="font-mono text-[11px] uppercase tracking-widest opacity-60">WhatsApp</span>
            <span className="flex flex-wrap items-end justify-between gap-x-6 gap-y-5">
              {/* Номер всегда в одну строку: размер считается от ширины карточки */}
              <span className="whitespace-nowrap font-display text-[clamp(20px,8.2cqw,76px)] md:text-[min(6.6cqw,64px)] font-semibold leading-none [font-variation-settings:'wdth'_110]">{whatsapp.label}</span>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-bg text-xl text-fg transition-transform duration-500 ease-[var(--ease-out)] group-hover:-rotate-45">→</span>
            </span>
          </a>
          <div className="flex min-h-[260px] flex-col justify-between rounded-[28px] border border-line p-7">
            <span className="label">{site.city} · сейчас</span>
            <div>
              <LocalTime />
              <p className="mt-3 text-sm text-muted">Пн–Пт 10:00–19:00. В выходные отвечаем на срочное.</p>
            </div>
          </div>
        </div>
      </section>

      <FinalCta label="[Заявка]" />
    </div>
  );
}
