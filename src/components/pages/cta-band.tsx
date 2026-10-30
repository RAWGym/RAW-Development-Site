import { RollButton } from "@/components/header";
import { site } from "@/content/site";

// Короткий призыв в конце внутренних страниц.
export function CtaBand({ title = "Обсудим ваш проект?" }: { title?: string }) {
  return (
    <section className="border-t border-line py-16 md:py-24" style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter-r)" }}>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-[16ch] font-display text-[clamp(32px,5vw,84px)] font-semibold uppercase leading-[0.95] [font-variation-settings:'wdth'_115]">
          {title}
        </h2>
        <div className="flex flex-col items-start gap-4">
          <RollButton href="/start" className="inline-flex">
            Рассчитать проект
          </RollButton>
          <a href={site.contacts.whatsapp.href} target="_blank" rel="noreferrer" className="font-mono text-[12px] text-muted transition-colors hover:text-fg">
            или напишите в WhatsApp · {site.contacts.whatsapp.label}
          </a>
        </div>
      </div>
    </section>
  );
}
