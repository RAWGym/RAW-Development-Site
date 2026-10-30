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
            className="group flex min-h-[260px] flex-col justify-between rounded-[28px] bg-fg p-7 text-bg md:col-span-2 md:p-10"
          >
            <span className="font-mono text-[11px] uppercase tracking-widest opacity-60">WhatsApp</span>
            <span className="flex items-end justify-between gap-6">
              <span className="font-display text-[clamp(28px,4.6vw,72px)] font-semibold leading-none [font-variation-settings:'wdth'_110]">{whatsapp.label}</span>
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
