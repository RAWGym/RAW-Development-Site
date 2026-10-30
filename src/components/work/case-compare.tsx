"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import type { CaseStudy } from "@/content/cases";
import { getCaseMedia } from "@/content/case-media";
import { CaseCover } from "@/components/case-cover";

// Слайдер «до / после». Пока нет настоящих скриншотов (public/cases/<slug>/before|after),
// слева показываем вайрфрейм, справа — готовую обложку: путь от схемы к продукту.
export function CaseCompare({ c }: { c: CaseStudy }) {
  const media = getCaseMedia(c.slug);
  const real = Boolean(media.before && media.after);
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef(false);

  const move = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  const before: ReactNode = real ? (
    <Image src={media.before!} alt={`${c.title} — до`} fill sizes="(min-width: 1440px) 1400px, 100vw" className="object-cover" />
  ) : (
    <Wireframe c={c} />
  );
  const after: ReactNode = real ? (
    <Image src={media.after!} alt={`${c.title} — после`} fill sizes="(min-width: 1440px) 1400px, 100vw" className="object-cover" />
  ) : (
    <CaseCover c={{ ...c, title: "" }} />
  );

  return (
    <div>
      <div
        ref={box}
        className="relative aspect-[4/3] touch-pan-y select-none overflow-hidden rounded-[28px] border border-line sm:aspect-[16/10] md:aspect-[16/8]"
        onPointerDown={(e) => {
          drag.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          move(e.clientX);
        }}
        onPointerMove={(e) => drag.current && move(e.clientX)}
        onPointerUp={() => (drag.current = false)}
        onPointerCancel={() => (drag.current = false)}
        data-cursor="Тянуть"
      >
        <div className="absolute inset-0">{after}</div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {before}
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-px bg-accent" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent font-mono text-[13px] text-bg shadow-[0_10px_30px_-10px_var(--accent)]">
            ⟷
          </span>
        </div>
        <span className="label absolute left-4 top-4 rounded-full bg-bg/70 px-3 py-1.5 backdrop-blur">{real ? "До" : "Вайрфрейм"}</span>
        <span className="label absolute right-4 top-4 rounded-full bg-bg/70 px-3 py-1.5 backdrop-blur">{real ? "После" : "Готово"}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Сравнить до и после"
        className="sr-only"
      />
    </div>
  );
}

// Схема интерфейса: сетка, блоки-плейсхолдеры с крестами, подписи размеров
function Wireframe({ c }: { c: CaseStudy }) {
  const blocks = [
    { x: 6, y: 10, w: 40, h: 14, t: "H1 / заголовок" },
    { x: 6, y: 30, w: 30, h: 5, t: "" },
    { x: 6, y: 40, w: 18, h: 8, t: "CTA" },
    { x: 54, y: 10, w: 40, h: 56, t: "экран продукта" },
    { x: 6, y: 72, w: 26, h: 18, t: "карточка" },
    { x: 37, y: 72, w: 26, h: 18, t: "карточка" },
    { x: 68, y: 72, w: 26, h: 18, t: "карточка" },
  ];
  return (
    <div className="absolute inset-0 bg-[#0d0f12]">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "linear-gradient(rgb(120 160 220 / 0.09) 1px, transparent 1px), linear-gradient(90deg, rgb(120 160 220 / 0.09) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {blocks.map((b, i) => (
          <g key={i} stroke="rgb(150 180 230 / 0.45)" strokeWidth="0.15" fill="rgb(150 180 230 / 0.04)" vectorEffect="non-scaling-stroke">
            <rect x={b.x} y={b.y} width={b.w} height={b.h} vectorEffect="non-scaling-stroke" strokeDasharray={i === 3 ? "0" : "1 0.6"} />
            {b.h > 6 && (
              <>
                <line x1={b.x} y1={b.y} x2={b.x + b.w} y2={b.y + b.h} vectorEffect="non-scaling-stroke" opacity="0.5" />
                <line x1={b.x + b.w} y1={b.y} x2={b.x} y2={b.y + b.h} vectorEffect="non-scaling-stroke" opacity="0.5" />
              </>
            )}
          </g>
        ))}
      </svg>
      {blocks.map(
        (b, i) =>
          b.t && (
            <span
              key={i}
              className="absolute font-mono text-[9px] uppercase tracking-wider text-[rgb(150_180_230/0.8)] md:text-[10px]"
              style={{ left: `${b.x + 1}%`, top: `${b.y + 1.5}%` }}
            >
              {b.t}
            </span>
          ),
      )}
      <span className="absolute bottom-3 left-[6%] font-mono text-[9px] text-[rgb(150_180_230/0.6)] md:text-[10px]">{c.slug}.fig · v0.1</span>
    </div>
  );
}
