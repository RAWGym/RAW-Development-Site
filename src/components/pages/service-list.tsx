"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { services } from "@/content/services";
import { getCase } from "@/content/cases";
import {
  BeforeAfterWidget,
  BrowserWidget,
  ChatWidget,
  FlowWidget,
  GameWidget,
  PhoneWidget,
  TvWidget,
} from "@/components/widgets/service-widgets";

const WIDGETS: Record<string, () => ReactNode> = {
  web: () => <BrowserWidget />,
  apps: () => <PhoneWidget />,
  bots: () => <ChatWidget />,
  games: () => <GameWidget />,
  media: () => <TvWidget />,
  design: () => <BeforeAfterWidget />,
  crm: () => <FlowWidget />,
};

// Список услуг-аккордеон: строка раскрывается в подробности с живым виджетом.
export function ServiceList() {
  const [open, setOpen] = useState<string | null>("web");

  return (
    <div className="border-t border-line">
      {services.map((s, i) => {
        const isOpen = open === s.id;
        return (
          <div key={s.id} id={s.id} className="scroll-mt-28 border-b border-line">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`svc-${s.id}`}
              onClick={() => setOpen(isOpen ? null : s.id)}
              className="group grid w-full grid-cols-[32px_1fr_auto] items-center gap-4 py-6 text-left md:grid-cols-[64px_1fr_200px_160px_48px] md:gap-6 md:py-8"
            >
              <span className="font-mono text-[11px] text-faint">{String(i + 1).padStart(2, "0")}</span>
              <span
                className={`min-w-0 font-display text-[clamp(22px,3.6vw,52px)] uppercase leading-none [overflow-wrap:anywhere] transition-[transform,color] duration-500 ease-[var(--ease-out)] [font-variation-settings:'wdth'_115] group-hover:translate-x-2 ${isOpen ? "text-fg" : "text-fg/80"}`}
              >
                {s.title}
              </span>
              <span className="hidden font-mono text-[12px] text-muted md:block">{s.price}</span>
              <span className="hidden font-mono text-[12px] text-muted md:block">{s.time}</span>
              <span
                className={`grid h-10 w-10 place-items-center justify-self-end rounded-full border border-line-strong text-lg transition-all duration-500 ease-[var(--ease-out)] ${isOpen ? "rotate-45 bg-fg text-bg" : ""}`}
                aria-hidden="true"
              >
                +
              </span>
            </button>

            <div
              id={`svc-${s.id}`}
              className="grid transition-[grid-template-rows] duration-700 ease-[var(--ease-out)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="min-h-0 overflow-hidden" inert={!isOpen}>
                <div className="grid gap-10 pb-12 md:grid-cols-12 md:gap-8 md:pl-[88px]">
                  <div className="md:col-span-6">
                    <p className="text-lg md:text-xl">{s.short}</p>
                    <p className="mt-4 text-muted">{s.forWhom}</p>
                    <div className="mt-6 flex gap-6 font-mono text-[12px] md:hidden">
                      <span>{s.price}</span>
                      <span className="text-muted">{s.time}</span>
                    </div>
                    <span className="label mb-4 mt-10 block">Что входит</span>
                    <ul className="grid gap-x-6 sm:grid-cols-2">
                      {s.includes.map((x) => (
                        <li key={x} className="flex items-start gap-3 border-b border-line py-3 text-[15px]">
                          <span className="mt-[3px] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-fg text-[9px] text-bg">✓</span>
                          {x}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-2">
                      {s.stack.map((t) => (
                        <span key={t} className="rounded-full border border-line-strong px-3 py-1.5 font-mono text-[11px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-5 md:col-start-8">
                    <div className="h-[260px] rounded-[24px] border border-line bg-bg-raised p-4">{isOpen && WIDGETS[s.id]()}</div>
                    <span className="label mb-3 mt-8 block">Похожие кейсы</span>
                    <div className="flex flex-wrap gap-2">
                      {s.cases.map((slug) => {
                        const c = getCase(slug);
                        return c ? (
                          <Link
                            key={slug}
                            href={`/work/${slug}`}
                            className="rounded-full border border-line-strong px-4 py-2 text-[13px] transition-colors hover:bg-fg hover:text-bg"
                          >
                            {c.title} ↗
                          </Link>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
