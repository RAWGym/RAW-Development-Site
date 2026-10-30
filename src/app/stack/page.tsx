import type { Metadata } from "next";
import { PageHero, pagePad } from "@/components/pages/page-hero";
import { CtaBand } from "@/components/pages/cta-band";
import { Reveal } from "@/components/reveal";
import { StackMap } from "@/components/pages/stack-map";
import { principles } from "@/content/stack";

export const metadata: Metadata = {
  title: "Стек",
  description: "Технологии RAW Development: Next.js, SwiftUI, Kotlin, React Native, Node.js, PostgreSQL, Telegram Mini Apps и другие — и в каких проектах мы их применяли.",
};

export default function StackPage() {
  return (
    <div data-section="stack">
      <PageHero
        label="[Стек] — инструменты под задачу"
        title={
          <>
            Чем
            <br />
            собираем
          </>
        }
        lead="Наведите или нажмите на технологию — справа появятся проекты, где она работает. Стек выбираем под задачу, а не под моду."
      />

      <section className="pb-16 md:pb-24" style={pagePad}>
        <div className="mx-auto max-w-[1440px]">
          <StackMap />
        </div>
      </section>

      <section className="border-t border-line py-16 md:py-24" style={pagePad}>
        <div className="mx-auto max-w-[1440px]">
          <h2 className="label mb-10 block">[Принципы]</h2>
          <div className="grid gap-px overflow-hidden rounded-[28px] border border-line bg-line md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08} className="flex flex-col gap-4 bg-bg p-6 md:p-9">
                <span className="font-mono text-[11px] text-accent">0{i + 1}</span>
                <h3 className="font-display text-2xl uppercase leading-tight [font-variation-settings:'wdth'_115]">{p.t}</h3>
                <p className="text-muted">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
