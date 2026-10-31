import type { Metadata } from "next";
import Link from "next/link";
import { CaseCover } from "@/components/case-cover";
import { HtmlLang } from "@/components/en/html-lang";
import { LeadForm } from "@/components/lead/lead-form";
import { Reveal } from "@/components/reveal";
import { RiseLines } from "@/components/rise-lines";
import { Slots } from "@/components/widgets/slots";
import { featuredCases } from "@/content/cases";
import { en } from "@/content/en";
import { siteUrl } from "@/content/site";

export const metadata: Metadata = {
  title: "RAW Development — software studio in Almaty",
  description: "Websites, mobile apps, Telegram bots and Mini Apps for businesses. Software development studio in Almaty, Kazakhstan.",
  alternates: { canonical: `${siteUrl}/en`, languages: { ru: siteUrl, en: `${siteUrl}/en` } },
  openGraph: { locale: "en_US" },
};

const pad = { paddingLeft: "var(--gutter)", paddingRight: "var(--gutter-r)" } as const;

export default function EnglishPage() {
  return (
    <div data-section="en" lang="en">
      <HtmlLang lang="en" />

      {/* Hero */}
      <section className="relative flex min-h-[92svh] flex-col justify-end pb-14 pt-32 md:pb-20" style={pad}>
        <div className="mx-auto mb-auto w-full max-w-[1440px] pb-10 pt-2 md:pt-6">
          <Slots lang="en" />
        </div>
        <div className="mx-auto w-full max-w-[1440px]">
          <span className="label mb-8 block">{en.hero.label}</span>
          <h1 className="font-display text-[clamp(38px,8.4vw,150px)] font-semibold uppercase leading-[0.9] [font-variation-settings:'wdth'_95] md:[font-variation-settings:'wdth'_118]">
            <RiseLines>
              <>
                {en.hero.title[0]}
                <br />
                <span className="text-muted">{en.hero.title[1]}</span>
              </>
            </RiseLines>
          </h1>
          <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
            <p className="max-w-[52ch] text-lg leading-relaxed text-muted md:col-span-6">{en.hero.lead}</p>
            <div className="flex flex-wrap gap-3 md:col-span-5 md:col-start-8 md:justify-end">
              <Link href="/en#contact" data-magnetic="0.3" className="rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-bg transition-colors duration-300 hover:bg-accent">
                {en.cta}
              </Link>
              <Link href="/en#work" data-magnetic="0.3" className="rounded-full border border-line-strong px-6 py-3.5 text-sm transition-colors hover:border-fg">
                See our work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-line py-12 md:py-16" style={pad}>
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-10 md:grid-cols-4">
          {en.stats.map((s, i) => (
            <div key={s.l} className={i > 0 ? "md:border-l md:border-line md:pl-8" : ""}>
              <div className="font-display text-[clamp(40px,5vw,84px)] font-semibold leading-none [font-variation-settings:'wdth'_110]">{s.v}</div>
              <div className="label mt-3">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24 py-16 md:py-24" style={pad}>
        <div className="mx-auto max-w-[1440px]">
          <span className="label">[01] — Services</span>
          <h2 className="mb-10 mt-5 font-display text-[clamp(32px,5.4vw,96px)] font-semibold uppercase leading-[0.92] [font-variation-settings:'wdth'_115]">Everything on a screen</h2>
          <div className="grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {en.services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05} className="flex min-h-[200px] flex-col justify-between gap-8 bg-bg p-6 md:p-8">
                <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-2xl uppercase leading-tight [font-variation-settings:'wdth'_112]">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.text}</p>
                  <p className="mt-4 font-mono text-[12px] text-accent">{s.price}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="scroll-mt-24 border-t border-line py-16 md:py-24" style={pad}>
        <div className="mx-auto max-w-[1440px]">
          <span className="label">[02] — Selected work</span>
          <h2 className="mb-10 mt-5 font-display text-[clamp(32px,5.4vw,96px)] font-semibold uppercase leading-[0.92] [font-variation-settings:'wdth'_115]">Products we built</h2>
          <div className="grid gap-x-6 gap-y-12 md:grid-cols-2">
            {featuredCases.map((c, i) => {
              const t = en.cases[c.slug];
              return (
                <Reveal key={c.slug} delay={(i % 2) * 0.08}>
                  <Link href={`/work/${c.slug}`} hrefLang="ru" className="group block" data-cursor="Open">
                    <div data-tilt className="relative aspect-[16/11] overflow-hidden rounded-[24px] border border-line">
                      <CaseCover c={c} captioned sizes="(min-width: 768px) 45vw, 100vw" />
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-6">
                      <div>
                        <h3 className="font-display text-2xl uppercase [font-variation-settings:'wdth'_115]">{c.title}</h3>
                        <p className="mt-1 text-sm text-muted">{t?.kind ?? c.kind}</p>
                        <p className="mt-3 max-w-[52ch] text-fg/85">{t?.summary}</p>
                      </div>
                      <span className="mt-1 shrink-0 font-mono text-[11px] text-faint">{c.year}</span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-10 font-mono text-[11px] text-faint">Full case studies are in Russian for now.</p>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="scroll-mt-24 border-t border-line py-16 md:py-24" style={pad}>
        <div className="mx-auto max-w-[1440px]">
          <span className="label">[03] — Process</span>
          <h2 className="mb-10 mt-5 font-display text-[clamp(32px,5.4vw,96px)] font-semibold uppercase leading-[0.92] [font-variation-settings:'wdth'_115]">Six steps, no surprises</h2>
          <ol className="grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {en.process.map((p, i) => (
              <li key={p.t} className="flex flex-col gap-3 bg-bg p-6 md:p-8">
                <span className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-accent">0{i + 1}</span>
                  <span className="text-faint">{p.time}</span>
                </span>
                <h3 className="font-display text-xl uppercase [font-variation-settings:'wdth'_112] md:text-2xl">{p.t}</h3>
                <p className="text-muted">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24 border-t border-line py-16 md:py-24" style={pad}>
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <span className="label">{en.contact.label}</span>
            <h2 className="mt-5 font-display text-[clamp(40px,6.4vw,120px)] font-semibold uppercase leading-[0.9] [font-variation-settings:'wdth'_115]">
              {en.contact.title[0]}
              <br />
              <span className="text-muted">{en.contact.title[1]}</span>
            </h2>
            <p className="mt-6 max-w-[44ch] text-muted">{en.contact.lead}</p>
          </div>
          <div className="rounded-[28px] border border-line bg-bg-raised/60 p-6 md:p-9 lg:col-span-6 lg:col-start-7">
            <LeadForm lang="en" source="English page" />
          </div>
        </div>
      </section>
    </div>
  );
}
