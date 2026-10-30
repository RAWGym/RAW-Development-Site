"use client";

import { useRef, useState } from "react";
import { sectionPad } from "@/components/reveal";
import { site } from "@/content/site";

const KINDS = ["Сайт", "Приложение", "Telegram-бот", "Игра", "Для себя", "Другое"];
const BUDGETS = ["до 500 тыс ₸", "0,5–2 млн ₸", "2–5 млн ₸", "больше 5 млн ₸", "Пока не знаю"];
const TERMS = ["Срочно", "1–2 месяца", "Не горит"];

// Финальный призыв: магнитная кнопка и мини-бриф из трёх вопросов.
// Заявки пока не отправляются на сервер: бриф открывает WhatsApp с готовым текстом.
export function FinalCta() {
  const [kind, setKind] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [term, setTerm] = useState<string | null>(null);

  const text = [
    "Здравствуйте! Хочу обсудить проект.",
    kind && `Что делаем: ${kind}`,
    budget && `Бюджет: ${budget}`,
    term && `Срок: ${term}`,
  ]
    .filter(Boolean)
    .join("\n");
  const href = `${site.contacts.whatsapp.href}?text=${encodeURIComponent(text)}`;

  return (
    <section data-section="start" className="py-24 md:py-40" style={sectionPad}>
      <div className="mx-auto max-w-[1440px]">
        <span className="label">[07] — Старт</span>
        <h2 className="mt-6 font-display text-[clamp(40px,9vw,168px)] font-semibold uppercase leading-[0.9] [font-variation-settings:'wdth'_110] md:[font-variation-settings:'wdth'_125]">
          Есть идея?
          <br />
          <span className="text-muted">Давайте</span> соберём
        </h2>

        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <div className="space-y-8 md:col-span-7">
            <Choice label="01 · Что делаем" options={KINDS} value={kind} onChange={setKind} />
            <Choice label="02 · Бюджет" options={BUDGETS} value={budget} onChange={setBudget} />
            <Choice label="03 · Срок" options={TERMS} value={term} onChange={setTerm} />
          </div>
          <div className="flex items-end md:col-span-4 md:col-start-9 md:justify-end">
            <Magnetic href={href}>Написать в WhatsApp</Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}

function Choice({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="label mb-3">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => onChange(o)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${value === o ? "border-fg bg-fg text-bg" : "border-line-strong text-fg/85 hover:border-fg"}`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Magnetic({ href, children }: { href: string; children: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      onPointerMove={move}
      onPointerLeave={leave}
      className="grid h-44 w-44 place-items-center rounded-full bg-fg p-6 text-center text-[15px] font-medium leading-tight text-bg transition-transform duration-500 ease-[var(--ease-out)] md:h-56 md:w-56"
    >
      {children} →
    </a>
  );
}
