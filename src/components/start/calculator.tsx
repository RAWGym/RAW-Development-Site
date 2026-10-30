"use client";

import { LeadForm } from "@/components/lead/lead-form";
import { useEffect, useRef, useState } from "react";
import { DESIGN, FEATURES, KINDS, PACE, PLATFORMS, estimate, fmt, type Answers } from "@/content/estimate";

const STORE = "raw-estimate";
const INITIAL: Answers = { kinds: [], platform: "both", features: [], design: "custom", pace: "normal" };

// Калькулятор: ответы сразу пересчитывают вилку цены и сроков.
// Бриф уходит вместе с заявкой через форму (см. /api/lead).
export function Calculator() {
  const [a, setA] = useState<Answers>(INITIAL);
  const [note, setNote] = useState("");
  const loaded = useRef(false);

  // Черновик ответов остаётся в браузере, если человек ушёл и вернулся.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) {
        const saved = JSON.parse(raw) as Answers;
        setTimeout(() => setA({ ...INITIAL, ...saved }), 0);
      }
    } catch {}
    loaded.current = true;
  }, []);
  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(STORE, JSON.stringify(a));
    } catch {}
  }, [a]);

  const toggle = (key: "kinds" | "features", id: string) =>
    setA((s) => ({ ...s, [key]: s[key].includes(id) ? s[key].filter((x) => x !== id) : [...s[key], id] }));

  const est = estimate(a);
  const hasApp = a.kinds.includes("app");

  const brief = [
    `Что: ${KINDS.filter((k) => a.kinds.includes(k.id)).map((k) => k.label).join(", ") || "—"}`,
    hasApp && `Платформы: ${PLATFORMS.find((p) => p.id === a.platform)?.label}`,
    a.features.length > 0 && `Функции: ${FEATURES.filter((f) => a.features.includes(f.id)).map((f) => f.label).join(", ")}`,
    `Дизайн: ${DESIGN.find((d) => d.id === a.design)?.label}`,
    `Темп: ${PACE.find((p) => p.id === a.pace)?.label}`,
    est && `Оценка с сайта: ${fmt(est.min)} – ${fmt(est.max)}, ${est.weeks[0]}–${est.weeks[1]} нед.`,
    note && `Комментарий: ${note}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="space-y-12 lg:col-span-7">
        <Step n="01" title="Что делаем" hint="Можно выбрать несколько">
          <div className="flex flex-wrap gap-2">
            {KINDS.map((k) => (
              <Chip key={k.id} on={a.kinds.includes(k.id)} onClick={() => toggle("kinds", k.id)}>
                {k.label}
              </Chip>
            ))}
          </div>
        </Step>

        <div className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out)]" style={{ gridTemplateRows: hasApp ? "1fr" : "0fr" }}>
          <div className="min-h-0 overflow-hidden" inert={!hasApp}>
            <Step n="01.1" title="Платформы">
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => (
                  <Chip key={p.id} on={a.platform === p.id} onClick={() => setA((s) => ({ ...s, platform: p.id }))}>
                    {p.label}
                  </Chip>
                ))}
              </div>
            </Step>
          </div>
        </div>

        <Step n="02" title="Что должно уметь">
          <div className="grid gap-2 sm:grid-cols-2">
            {FEATURES.map((f) => {
              const on = a.features.includes(f.id);
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle("features", f.id)}
                  className={`flex items-center justify-between gap-4 rounded-2xl border px-4 py-4 text-left transition-colors duration-300 ${on ? "border-accent bg-accent-soft" : "border-line hover:border-line-strong"}`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`grid h-5 w-5 place-items-center rounded-md border text-[11px] transition-colors ${on ? "border-accent bg-accent text-bg" : "border-line-strong"}`}>{on ? "✓" : ""}</span>
                    {f.label}
                  </span>
                  <span className="font-mono text-[11px] text-muted">+{Math.round(f.price / 1000)}к</span>
                </button>
              );
            })}
          </div>
        </Step>

        <Step n="03" title="Дизайн">
          <div className="grid gap-2 sm:grid-cols-3">
            {DESIGN.map((d) => (
              <button
                key={d.id}
                type="button"
                aria-pressed={a.design === d.id}
                onClick={() => setA((s) => ({ ...s, design: d.id }))}
                className={`rounded-2xl border p-4 text-left transition-colors duration-300 ${a.design === d.id ? "border-accent bg-accent-soft" : "border-line hover:border-line-strong"}`}
              >
                <span className="block">{d.label}</span>
                <span className="mt-1 block text-sm text-muted">{d.hint}</span>
              </button>
            ))}
          </div>
        </Step>

        <Step n="04" title="Сроки">
          <div className="flex flex-wrap gap-2">
            {PACE.map((p) => (
              <Chip key={p.id} on={a.pace === p.id} onClick={() => setA((s) => ({ ...s, pace: p.id }))}>
                {p.label}
                {p.k > 1 && <span className="ml-2 font-mono text-[10px] opacity-60">+30%</span>}
              </Chip>
            ))}
          </div>
        </Step>

        <Step n="05" title="Идея в двух словах" hint="Необязательно">
          <div className="grid gap-3">
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Идея в одной строке"
              className="rounded-2xl border border-line bg-transparent px-4 py-4 outline-none transition-colors placeholder:text-faint focus:border-accent"
            />
          </div>
        </Step>
      </div>

      <aside id="estimate" className="scroll-mt-24 lg:col-span-5">
        <div className="sticky top-28 rounded-[28px] border border-line-strong bg-bg-raised p-6 md:p-8">
          <span className="label">Предварительная оценка</span>
          <div className="mt-6 min-h-[132px]">
            {est ? (
              <>
                <div className="font-display text-[clamp(30px,3.4vw,52px)] font-semibold leading-[1.02] tabular-nums [font-variation-settings:'wdth'_105]">
                  <Ticker value={est.min} />
                  <span className="block text-muted">
                    – <Ticker value={est.max} />
                  </span>
                </div>
                <div className="mt-4 font-mono text-[12px] text-muted">
                  срок {est.weeks[0]}–{est.weeks[1]} недель
                </div>
              </>
            ) : (
              <p className="text-muted">Выберите, что делаем, и здесь появится вилка цены и сроков.</p>
            )}
          </div>

          <Bars est={est} />

          <div className={`mt-8 border-t border-line pt-6 transition-opacity duration-500 ${est ? "opacity-100" : "opacity-60"}`}>
            <span className="label mb-1 block">Получить точную смету</span>
            <LeadForm compact details={brief} source="Калькулятор" submitLabel="Отправить бриф" />
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-faint">
            Это ориентир, а не договор. Точную смету с этапами пришлём после короткого созвона.
          </p>
          <button type="button" onClick={() => setA(INITIAL)} className="mt-4 font-mono text-[11px] text-muted underline-offset-4 hover:text-fg hover:underline">
            сбросить ответы
          </button>
        </div>
      </aside>

      {/* На телефоне оценка всегда видна внизу экрана */}
      <a
        href="#estimate"
        className={`fixed inset-x-4 z-40 flex items-center justify-between gap-4 rounded-full border border-line-strong bg-[var(--glass)] py-2 pl-5 pr-2 backdrop-blur-xl transition-[transform,opacity] duration-500 ease-[var(--ease-out)] lg:hidden ${est ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
      >
        <span className="min-w-0">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">оценка</span>
          <span className="block truncate text-[15px] tabular-nums">{est ? `${fmt(est.min)} – ${fmt(est.max)}` : ""}</span>
        </span>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-fg text-bg">↓</span>
      </a>
    </div>
  );
}

function Step({ n, title, hint, children }: { n: string; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-5 flex items-baseline gap-4">
        <span className="font-mono text-[11px] text-faint">{n}</span>
        <h2 className="font-display text-2xl uppercase [font-variation-settings:'wdth'_115] md:text-3xl">{title}</h2>
        {hint && <span className="text-sm text-muted">{hint}</span>}
      </div>
      {children}
    </section>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`rounded-full border px-4 py-2.5 text-[14px] transition-colors duration-300 ${on ? "border-accent bg-accent text-bg" : "border-line-strong text-fg/80 hover:border-fg hover:text-fg"}`}
    >
      {children}
    </button>
  );
}

// Число плавно «докручивается» до нового значения.
function Ticker({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const cur = useRef(value);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const from = cur.current;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 600);
      const e = 1 - Math.pow(1 - k, 3);
      const v = Math.round((from + (value - from) * e) / 1000) * 1000;
      el.textContent = fmt(v);
      if (k < 1) raf = requestAnimationFrame(step);
      else cur.current = value;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span ref={ref}>{fmt(value)}</span>;
}

// Шкала: где проект находится среди типичных бюджетов.
function Bars({ est }: { est: ReturnType<typeof estimate> }) {
  const max = 12_000_000;
  const pos = est ? Math.min(1, Math.sqrt(((est.min + est.max) / 2) / max)) : 0;
  return (
    <div className="mt-8" aria-hidden="true">
      <div className="flex h-12 items-end gap-[3px]">
        {Array.from({ length: 40 }).map((_, i) => {
          const on = est && i / 40 <= pos;
          return (
            <span
              key={i}
              className="flex-1 rounded-sm transition-[background-color,height] duration-500"
              style={{ height: `${25 + Math.round(70 * Math.pow(i / 40, 0.6))}%`, background: on ? "var(--fg)" : "var(--line-strong)", transitionDelay: `${i * 8}ms` }}
            />
          );
        })}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] text-faint">
        <span>бот</span>
        <span>сайт</span>
        <span>приложение</span>
        <span>банк</span>
      </div>
    </div>
  );
}
