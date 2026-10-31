import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allCases, getCase } from "@/content/cases";
import { CaseCover } from "@/components/case-cover";
import { fitTitle } from "@/lib/fit-title";
import { Reveal } from "@/components/reveal";
import { RiseLines } from "@/components/rise-lines";
import { CaseScreens } from "@/components/work/case-screens";
import { CaseCompare } from "@/components/work/case-compare";
import { ParallaxCover } from "@/components/work/parallax-cover";

export function generateStaticParams() {
  return allCases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCase((await params).slug);
  if (!c) return {};
  return { title: c.title, description: c.summary };
}

const pad = { paddingLeft: "var(--gutter)", paddingRight: "var(--gutter-r)" } as const;

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const idx = allCases.indexOf(c);
  const next = allCases[(idx + 1) % allCases.length];

  const meta = [
    { k: "Год", v: c.year },
    { k: "Срок", v: c.duration },
    { k: "Платформы", v: c.platforms.join(", ") },
    { k: "Что делали", v: c.role.join(", ") },
  ];

  return (
    <article data-section={c.slug}>
      {/* Шапка кейса */}
      <header className="pb-10 pt-32 md:pb-14 md:pt-40" style={pad}>
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Link href="/work" className="label transition-colors hover:text-fg">
              ← Все кейсы
            </Link>
            <span className="label text-faint">/</span>
            <span className="label">{c.audience === "business" ? "Для бизнеса" : "Для себя"}</span>
          </div>
          <h1 className="font-display font-semibold uppercase leading-[0.88] [font-variation-settings:'wdth'_100] md:[font-variation-settings:'wdth'_115]" style={{ fontSize: fitTitle(c.title, 160, 34) }}>
            <RiseLines>{c.title}</RiseLines>
          </h1>
          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <p className="text-lg leading-relaxed md:col-span-6 md:text-2xl md:leading-snug">{c.summary}</p>
            <div className="md:col-span-5 md:col-start-8">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6">
              {meta.map((m) => (
                <div key={m.k} className="border-t border-line pt-3">
                  <dt className="label mb-2">{m.k}</dt>
                  <dd className="text-sm">{m.v}</dd>
                </div>
              ))}
            </dl>
              {c.url && (
                <div className="mt-6">
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm transition-colors hover:bg-fg hover:text-bg"
                  >
                    Открыть {c.url.replace("https://", "")} ↗
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Обложка */}
      <div style={pad}>
        <div className="mx-auto max-w-[1440px]">
          <ParallaxCover>
            <CaseCover c={{ ...c, title: "" }} />
          </ParallaxCover>
        </div>
      </div>

      {/* Задача и решение */}
      <section className="py-16 md:py-24" style={pad} data-section="задача">
        <div className="mx-auto grid max-w-[1440px] gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <h2 className="label mb-6 block">[01] — Задача</h2>
            <p className="text-lg leading-relaxed text-muted md:text-xl">{c.challenge}</p>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
            <h2 className="label mb-6 block">[02] — Решение</h2>
            <p className="text-lg leading-relaxed md:text-xl">{c.solution}</p>
          </Reveal>
        </div>
      </section>

      {/* Возможности */}
      <section className="border-t border-line py-16 md:py-24" style={pad} data-section="возможности">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="label mb-10 block">[03] — Что внутри</h2>
          <div className="grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2">
            {c.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06} className="flex flex-col justify-between gap-6 bg-bg p-6 md:min-h-[220px] md:gap-10 md:p-10">
                <span className="font-mono text-[11px] text-faint">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-2xl uppercase [font-variation-settings:'wdth'_115] md:text-3xl">{f.title}</h3>
                  <p className="mt-3 max-w-[44ch] text-muted">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Экраны */}
      <section className="border-t border-line py-16 md:py-24" style={pad} data-section="экраны">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="label mb-10 block">[03.1] — Экраны</h2>
          <CaseScreens c={c} />
        </div>
      </section>

      {/* До / после */}
      <section className="border-t border-line py-16 md:py-24" style={pad} data-section="до-после">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="label block">[03.2] — От схемы к продукту</h2>
            <span className="font-mono text-[11px] text-faint">потяните разделитель</span>
          </div>
          <CaseCompare c={c} />
        </div>
      </section>

      {/* Результаты */}
      <section className="border-t border-line py-16 md:py-24" style={pad} data-section="результат">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="label mb-10 block">[04] — Результат</h2>
          <div className="grid gap-12 md:grid-cols-3">
            {c.results.map((r, i) => (
              <Reveal key={r.label} delay={i * 0.08} className={i > 0 ? "md:border-l md:border-line md:pl-8" : ""}>
                <div className="whitespace-nowrap font-display text-[clamp(40px,5vw,88px)] font-semibold leading-none [font-variation-settings:'wdth'_105]">{r.value}</div>
                <div className="label mt-4">{r.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Стек и детали */}
      <section className="border-t border-line py-16 md:py-24" style={pad} data-section="стек">
        <div className="mx-auto grid max-w-[1440px] gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="label mb-8 block">[05] — Стек</h2>
            <ul className="flex flex-wrap gap-2">
              {c.stack.map((s) => (
                <li key={s} className="rounded-full border border-line-strong px-4 py-2 font-mono text-[12px]">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <h2 className="label mb-8 block">[06] — Детали, о которых не просили</h2>
            <ul className="divide-y divide-line border-y border-line">
              {c.details.map((d) => (
                <li key={d} className="flex items-center gap-4 py-4">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-[10px] text-bg">✓</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Следующий кейс */}
      <Link
        href={`/work/${next.slug}`}
        data-cursor="Дальше"
        className="group relative block overflow-hidden border-t border-line py-16 md:py-28"
        style={pad}
      >
        <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" aria-hidden="true">
          <CaseCover c={{ ...next, title: "" }} />
          <div className="absolute inset-0 bg-bg/60" />
        </div>
        <div className="relative mx-auto max-w-[1440px]">
          <span className="label mb-6 block">Следующий кейс →</span>
          <span style={{ fontSize: fitTitle(next.title, 150, 32) }} className="block font-display font-semibold uppercase leading-[0.9] transition-transform duration-700 ease-[var(--ease-out)] [font-variation-settings:'wdth'_120] group-hover:translate-x-4">
            {next.title}
          </span>
          <span className="mt-4 block text-muted">{next.kind}</span>
        </div>
      </Link>
    </article>
  );
}
