"use client";

import { useState } from "react";
import { sectionPad } from "@/components/reveal";
import { LeadForm } from "@/components/lead/lead-form";

const KINDS = ["Сайт", "Приложение", "Telegram-бот", "Игра", "Для себя", "Другое"];
const BUDGETS = ["до 300 тыс ₸", "0,3–1 млн ₸", "1–3 млн ₸", "больше 3 млн ₸", "Пока не знаю"];
const TERMS = ["Срочно", "1–2 месяца", "Не горит"];

// Финальный призыв: три быстрых вопроса и форма заявки.
export function FinalCta({ label = "[07] — Старт" }: { label?: string }) {
  const [kind, setKind] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [term, setTerm] = useState<string | null>(null);

  const details = [kind && `Что делаем: ${kind}`, budget && `Бюджет: ${budget}`, term && `Срок: ${term}`].filter(Boolean).join("\n");

  return (
    <section data-section="start" className="py-20 md:py-28" style={sectionPad}>
      <div className="mx-auto max-w-[1440px]">
        <span className="label">{label}</span>
        <h2 className="mt-5 font-display text-[clamp(40px,8.4vw,156px)] font-semibold uppercase leading-[0.9] [font-variation-settings:'wdth'_110] md:[font-variation-settings:'wdth'_125]">
          Есть идея?
          <br />
          <span className="text-muted">Давайте</span> соберём
        </h2>

        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-7 lg:col-span-5">
            <Choice label="01 · Что делаем" options={KINDS} value={kind} onChange={setKind} />
            <Choice label="02 · Бюджет" options={BUDGETS} value={budget} onChange={setBudget} />
            <Choice label="03 · Срок" options={TERMS} value={term} onChange={setTerm} />
          </div>
          <div className="rounded-[28px] border border-line bg-bg-raised/60 p-6 md:p-9 lg:col-span-6 lg:col-start-7">
            <span className="label mb-2 block">04 · Контакты</span>
            <LeadForm details={details} source="Главная / Контакты" />
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
            onClick={() => onChange(value === o ? "" : o)}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${value === o ? "border-accent bg-accent text-bg" : "border-line-strong text-fg/85 hover:border-fg"}`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
