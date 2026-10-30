import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, pagePad } from "@/components/pages/page-hero";
import { CtaBand } from "@/components/pages/cta-band";
import { Reveal } from "@/components/reveal";
import { fmtDate, notes } from "@/content/notes";

export const metadata: Metadata = {
  title: "Заметки",
  description: "Как мы делали сайты, приложения и Telegram-ботов: решения, цифры и цены без воды.",
};

export default function NotesPage() {
  return (
    <div data-section="notes">
      <PageHero
        label="[Заметки] — как мы делали"
        title={
          <>
            Заметки
            <br />
            из работы
          </>
        }
        lead="Коротко о решениях, которые сработали: нагрузка, оплаты, Telegram, цены. Без воды и без кода, понятно и не разработчику."
      />

      <section className="pb-16 md:pb-24" style={pagePad}>
        <ul className="mx-auto max-w-[1440px] border-t border-line">
          {notes.map((n, i) => (
            <li key={n.slug} className="border-b border-line">
              <Reveal delay={i * 0.06}>
                <Link href={`/notes/${n.slug}`} className="group grid gap-4 py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10">
                  <span className="font-mono text-[11px] text-faint md:col-span-2">
                    {fmtDate(n.date)} · {n.minutes} мин
                  </span>
                  <span className="md:col-span-7">
                    <span className="block font-display text-[clamp(24px,3vw,44px)] uppercase leading-[1.02] transition-colors duration-300 [font-variation-settings:'wdth'_110] group-hover:text-accent">
                      {n.title}
                    </span>
                    <span className="mt-3 block max-w-[62ch] text-muted">{n.lead}</span>
                  </span>
                  <span className="flex flex-wrap items-center gap-2 md:col-span-3 md:justify-end">
                    {n.tags.map((t) => (
                      <span key={t} className="rounded-full border border-line-strong px-3 py-1 font-mono text-[11px] text-muted">
                        {t}
                      </span>
                    ))}
                    <span className="ml-2 text-xl text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">→</span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title="Есть похожая задача?" />
    </div>
  );
}
