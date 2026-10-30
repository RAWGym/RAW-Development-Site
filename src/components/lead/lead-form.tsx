"use client";

import { useId, useState } from "react";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "done" | "error";

// Форма заявки. details — то, что человек уже выбрал выше (тип проекта, бюджет, смета),
// оно уходит вместе с заявкой и подставляется в запасную ссылку на WhatsApp.
export function LeadForm({
  details = "",
  source,
  compact = false,
  submitLabel = "Отправить заявку",
}: {
  details?: string;
  source: string;
  compact?: boolean;
  submitLabel?: string;
}) {
  const id = useId();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState(false);

  const nameOk = name.trim().length >= 2;
  const contactOk = contact.replace(/[^\d@a-zA-Z]/g, "").length >= 5;
  const valid = nameOk && contactOk;

  const waText = ["Здравствуйте! Хочу обсудить проект.", name && `Меня зовут ${name}.`, details, message].filter(Boolean).join("\n");
  const waHref = `${site.contacts.whatsapp.href}?text=${encodeURIComponent(waText)}`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid || status === "sending") return;
    setStatus("sending");
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, contact, message, details, source, company }),
      });
      setStatus(r.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="lead-done flex flex-col items-start gap-5 rounded-[24px] border border-accent/40 bg-accent/[0.06] p-6 md:p-8" role="status">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-bg">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" className="lead-check" />
          </svg>
        </span>
        <div>
          <p className="font-display text-2xl font-semibold leading-tight [font-variation-settings:'wdth'_115] md:text-3xl">Заявка у нас</p>
          <p className="mt-2 max-w-[40ch] text-muted">Ответим в течение часа в рабочее время. Если срочно — напишите в WhatsApp.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={waHref} target="_blank" rel="noreferrer" className="rounded-full border border-line-strong px-4 py-2.5 text-sm transition-colors hover:border-fg">
            Написать в WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setMessage("");
              setTouched(false);
            }}
            className="rounded-full px-4 py-2.5 text-sm text-muted transition-colors hover:text-fg"
          >
            Отправить ещё одну
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5" aria-describedby={`${id}-note`}>
      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field
          id={`${id}-name`}
          label="Как вас зовут"
          value={name}
          onChange={setName}
          autoComplete="name"
          error={touched && !nameOk ? "Напишите имя" : ""}
        />
        <Field
          id={`${id}-contact`}
          label="Телефон или @telegram"
          value={contact}
          onChange={(v) => setContact(formatContact(v))}
          autoComplete="tel"
          inputMode={/^[@a-zA-Z]/.test(contact) ? "text" : "tel"}
          error={touched && !contactOk ? "Нужен номер или ник, чтобы ответить" : ""}
        />
      </div>
      {!compact && <Field id={`${id}-msg`} label="Пара слов о задаче — по желанию" value={message} onChange={setMessage} multiline />}

      {/* Ловушка для ботов: люди это поле не видят */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Компания
          <input tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={status === "sending"}
          data-magnetic="0.15"
          className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-fg pl-6 pr-2 font-medium text-bg transition-[background-color,opacity] duration-300 hover:bg-accent disabled:opacity-70"
        >
          <span>{status === "sending" ? "Отправляем…" : submitLabel}</span>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-bg text-fg transition-transform duration-500 ease-[var(--ease-out)] group-hover:-rotate-45">
            {status === "sending" ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-fg/30 border-t-fg" /> : "→"}
          </span>
        </button>
        <a href={waHref} target="_blank" rel="noreferrer" className="text-sm text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg">
          или сразу в WhatsApp
        </a>
      </div>

      <p id={`${id}-note`} className="font-mono text-[11px] leading-relaxed text-faint" role={status === "error" ? "alert" : undefined}>
        {status === "error" ? (
          <span className="text-accent">Не получилось отправить. Попробуйте ещё раз или напишите в WhatsApp — там ответим быстрее.</span>
        ) : (
          <>
            Отправляя форму, вы соглашаетесь с{" "}
            <a href="/privacy" className="underline underline-offset-2 hover:text-fg">
              политикой конфиденциальности
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}

// Номер приводим к виду +7 777 123 45 67, ник Telegram оставляем как есть
function formatContact(v: string) {
  if (/^[@a-zA-Z]/.test(v)) return v.replace(/\s/g, "");
  let d = v.replace(/\D/g, "");
  if (!d) return v.startsWith("+") ? "+" : "";
  if (d[0] === "8") d = "7" + d.slice(1);
  if (d[0] !== "7") return "+" + d.slice(0, 15);
  d = d.slice(0, 11);
  const parts = [d.slice(0, 1), d.slice(1, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)].filter(Boolean);
  return "+" + parts.join(" ");
}

function Field({
  id,
  label,
  value,
  onChange,
  error = "",
  multiline = false,
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  multiline?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "tel";
}) {
  const cls =
    "peer w-full resize-none border-0 border-b bg-transparent px-0 pb-3 pt-6 text-[17px] text-fg outline-none transition-colors placeholder:text-transparent focus:border-accent " +
    (error ? "border-accent" : "border-line-strong hover:border-muted");
  return (
    <div className="relative">
      {multiline ? (
        <textarea id={id} rows={3} placeholder={label} value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      ) : (
        <input
          id={id}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className={cls}
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-6 origin-left text-[17px] text-muted transition-all duration-300 ease-[var(--ease-out)] peer-focus:top-0 peer-focus:scale-75 peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-75"
      >
        {label}
      </label>
      {error && (
        <span id={`${id}-err`} className="mt-2 block font-mono text-[11px] text-accent">
          {error}
        </span>
      )}
    </div>
  );
}
