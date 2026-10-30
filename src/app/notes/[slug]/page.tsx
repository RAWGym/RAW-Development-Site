import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/pages/cta-band";
import { RiseLines } from "@/components/rise-lines";
import { ReadProgress } from "@/components/pages/read-progress";
import { getCase } from "@/content/cases";
import { fmtDate, getNote, notes } from "@/content/notes";

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const n = getNote((await params).slug);
  if (!n) return {};
  return { title: n.title, description: n.lead, openGraph: { type: "article", publishedTime: n.date } };
}

const pad = { paddingLeft: "var(--gutter)", paddingRight: "var(--gutter-r)" } as const;

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = getNote(slug);
  if (!n) notFound();
  const c = n.caseSlug ? getCase(n.caseSlug) : undefined;
  const others = notes.filter((x) => x.slug !== n.slug).slice(0, 2);

  return (
    <article data-section="notes">
      <ReadProgress />
      <header className="pb-10 pt-32 md:pb-14 md:pt-40" style={pad}>
        <div className="mx-auto max-w-[920px]">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Link href="/notes" className="label transition-colors hover:text-fg">
              ← Все заметки
            </Link>
            <span className="label text-faint">/</span>
            <span className="label">
              {fmtDate(n.date)} · {n.minutes} мин
            </span>
          </div>
          <h1 className="font-display text-[clamp(32px,5.6vw,84px)] font-semibold uppercase leading-[0.95] [overflow-wrap:anywhere] [font-variation-settings:'wdth'_100] md:[font-variation-settings:'wdth'_112]">
            <RiseLines>{n.title}</RiseLines>
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-muted md:text-2xl md:leading-snug">{n.lead}</p>
        </div>
      </header>

      <div className="pb-16 md:pb-24" style={pad}>
        <div className="mx-auto max-w-[720px] border-t border-line pt-10 text-[17px] leading-[1.7] md:text-[18px]">
          {n.body.map((b, i) => {
            if (b.t === "h")
              return (
                <h2 key={i} className="mb-4 mt-12 font-display text-2xl uppercase leading-tight [font-variation-settings:'wdth'_112] md:text-3xl">
                  {b.text}
                </h2>
              );
            if (b.t === "list")
              return (
                <ul key={i} className="my-6 space-y-3">
                  {b.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              );
            if (b.t === "quote")
              return (
                <blockquote key={i} className="my-10 border-l-2 border-accent pl-6 font-display text-xl leading-snug [font-variation-settings:'wdth'_105] md:text-2xl">
                  {b.text}
                </blockquote>
              );
            return (
              <p key={i} className="my-5 text-fg/90">
                {b.text}
              </p>
            );
          })}

          {c && (
            <Link href={`/work/${c.slug}`} className="group mt-14 flex items-center justify-between gap-6 rounded-[24px] border border-line-strong p-6 transition-colors hover:border-accent">
              <span>
                <span className="label block">Кейс</span>
                <span className="mt-2 block font-display text-2xl uppercase [font-variation-settings:'wdth'_112]">{c.title}</span>
                <span className="block text-sm text-muted">{c.kind}</span>
              </span>
              <span className="text-2xl text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">→</span>
            </Link>
          )}
        </div>
      </div>

      <section className="border-t border-line py-14 md:py-20" style={pad}>
        <div className="mx-auto max-w-[1440px]">
          <h2 className="label mb-8 block">Ещё заметки</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {others.map((o) => (
              <Link key={o.slug} href={`/notes/${o.slug}`} className="group rounded-[24px] border border-line p-6 transition-colors hover:border-fg md:p-8">
                <span className="font-mono text-[11px] text-faint">
                  {fmtDate(o.date)} · {o.minutes} мин
                </span>
                <span className="mt-4 block font-display text-2xl uppercase leading-tight transition-colors [font-variation-settings:'wdth'_110] group-hover:text-accent">{o.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Обсудим вашу задачу?" />
    </article>
  );
}
