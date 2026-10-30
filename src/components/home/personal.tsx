"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode, type PointerEvent as RPointerEvent } from "react";
import { SectionHead, sectionPad } from "@/components/reveal";

// «Сделано для себя»: рабочий стол из виджетов в стиле iOS. На десктопе их можно перетаскивать.
export function Personal() {
  return (
    <section id="personal" data-section="personal" className="py-16 md:py-24" style={sectionPad}>
      <div className="mx-auto max-w-[1440px]">
        <SectionHead
          index="03"
          label="Для себя"
          title={
            <>
              Продукты под
              <br />
              вашу жизнь
            </>
          }
          aside={
            <p className="max-w-[38ch] md:ml-auto">
              Есть идея для себя? Сделаем её настоящим продуктом. Виджеты можно перетаскивать.
            </p>
          }
        />

        <div className="relative grid gap-4 rounded-[32px] border border-line bg-[radial-gradient(120%_120%_at_20%_0%,var(--bg-raised),var(--bg)_60%)] p-4 sm:grid-cols-2 md:block md:h-[620px] md:p-0">
          <Draggable x={4} y={8} w={300}>
            <HabitWidget />
          </Draggable>
          <Draggable x={30} y={6} w={340}>
            <MusicWidget />
          </Draggable>
          <Draggable x={62} y={10} w={320}>
            <MovieWidget />
          </Draggable>
          <Draggable x={8} y={56} w={280}>
            <TvFirmwareWidget />
          </Draggable>
          <Draggable x={38} y={58} w={300}>
            <GameScoreWidget />
          </Draggable>
          <Draggable x={68} y={60} w={290}>
            <Link
              href="/start"
              className="flex h-full min-h-[150px] flex-col justify-between rounded-[26px] border border-dashed border-line-strong p-5 transition-colors hover:border-fg"
            >
              <span className="label">+ Новый виджет</span>
              <span className="font-display text-2xl uppercase leading-none [font-variation-settings:'wdth'_120]">
                Предложить
                <br />
                свою идею
              </span>
            </Link>
          </Draggable>
          <div className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] text-faint md:block">
            умный дом · личный бюджет · семейный календарь · бот-ассистент · скрипты
          </div>
        </div>
      </div>
    </section>
  );
}

function Draggable({ x, y, w, children }: { x: number; y: number; w: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ dx: 0, dy: 0 });
  const start = useRef<{ px: number; py: number; dx: number; dy: number } | null>(null);
  const [drag, setDrag] = useState(false);

  const down = (e: RPointerEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    if ((e.target as HTMLElement).closest("button, a, input")) return;
    start.current = { px: e.clientX, py: e.clientY, dx: pos.dx, dy: pos.dy };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDrag(true);
  };
  const move = (e: RPointerEvent<HTMLDivElement>) => {
    if (!start.current) return;
    setPos({ dx: start.current.dx + e.clientX - start.current.px, dy: start.current.dy + e.clientY - start.current.py });
  };
  const up = () => {
    start.current = null;
    setDrag(false);
  };

  return (
    <div
      ref={ref}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      className={`min-w-0 md:absolute md:left-[var(--x)] md:top-[var(--y)] ${drag ? "z-20 cursor-grabbing" : "z-10 md:cursor-grab"}`}
      style={
        {
          "--x": `${x}%`,
          "--y": `${y}%`,
          "--w": `${w}px`,
          transform: `translate3d(${pos.dx}px, ${pos.dy}px, 0) ${drag ? "scale(1.03) rotate(-1deg)" : ""}`,
          transition: drag ? "none" : "transform .5s var(--ease-out)",
        } as React.CSSProperties
      }
    >
      <div className="md:w-[var(--w)]">{children}</div>
    </div>
  );
}

const panel = "rounded-[26px] border border-line-strong bg-bg-raised/80 p-5 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgb(0_0_0/0.8)]";

function HabitWidget() {
  const [done, setDone] = useState([true, false, true]);
  const habits = ["Спорт", "Чтение", "Вода"];
  return (
    <div className={panel}>
      <div className="mb-4 flex items-center justify-between">
        <span className="label">Трекер привычек</span>
        <span className="font-mono text-[10px] text-muted">21 день</span>
      </div>
      <div className="flex justify-between">
        {habits.map((h, i) => {
          const p = done[i] ? 1 : 0.35;
          return (
            <button
              key={h}
              type="button"
              onClick={() => setDone((d) => d.map((v, k) => (k === i ? !v : v)))}
              className="flex flex-col items-center gap-2"
              aria-pressed={done[i]}
              aria-label={`${h}: ${done[i] ? "выполнено" : "не выполнено"}`}
            >
              <svg viewBox="0 0 44 44" className="h-16 w-16 -rotate-90">
                <circle cx="22" cy="22" r="18" fill="none" stroke="var(--line-strong)" strokeWidth="5" />
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  fill="none"
                  stroke="var(--fg)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={113}
                  strokeDashoffset={113 * (1 - p)}
                  style={{ transition: "stroke-dashoffset .6s var(--ease-out)" }}
                />
              </svg>
              <span className="text-[12px] text-muted">{h}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MusicWidget() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={panel}>
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-fg/40 to-fg/5 font-display text-xl [font-variation-settings:'wdth'_130]">
          R
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[14px]">Night Drive</div>
          <div className="truncate text-[12px] text-muted">RAW Player · lossless</div>
        </div>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-fg text-bg"
          aria-label={playing ? "Пауза" : "Играть"}
        >
          {playing ? "❚❚" : "▶"}
        </button>
      </div>
      <div className="mt-4 flex h-10 items-end gap-[3px]" aria-hidden="true">
        {Array.from({ length: 36 }).map((_, i) => (
          <span
            key={i}
            className="flex-1 origin-bottom rounded-sm bg-fg/70"
            style={{
              height: `${20 + ((i * 37) % 70)}%`,
              animation: playing ? `eq ${0.6 + ((i * 13) % 7) / 10}s ease-in-out ${i * 0.03}s infinite alternate` : "none",
              opacity: playing ? 1 : 0.35,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function MovieWidget() {
  const posters = [
    { t: "Дюна", c: "from-[#5c4326] to-[#1e160c]" },
    { t: "Интерстеллар", c: "from-[#26394f] to-[#0b1118]" },
    { t: "Бегущий", c: "from-[#4f2639] to-[#180b11]" },
    { t: "Солярис", c: "from-[#2f4a3c] to-[#0c1510]" },
  ];
  return (
    <div className={panel}>
      <div className="mb-3 flex items-center justify-between">
        <span className="label">Киноплеер</span>
        <span className="font-mono text-[10px] text-muted">Продолжить</span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1" data-lenis-prevent>
        {posters.map((p) => (
          <div
            key={p.t}
            className={`group/p relative aspect-[2/3] w-[86px] shrink-0 overflow-hidden rounded-lg bg-gradient-to-b ${p.c} transition-transform duration-500 hover:-translate-y-1 hover:scale-[1.04]`}
          >
            <span className="absolute bottom-2 left-2 right-2 text-[10px] leading-tight">{p.t}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 h-1 rounded bg-fg/10">
        <div className="h-full w-[62%] rounded bg-fg" />
      </div>
    </div>
  );
}

function TvFirmwareWidget() {
  return (
    <div className={panel}>
      <span className="label">Прошивка ТВ</span>
      <div className="mt-3 font-display text-3xl uppercase [font-variation-settings:'wdth'_130]">RAW OS</div>
      <ul className="mt-3 space-y-1 font-mono text-[11px] text-muted">
        <li>✓ без рекламы</li>
        <li>✓ загрузка 6 с</li>
        <li>✓ свои приложения</li>
      </ul>
    </div>
  );
}

function GameScoreWidget() {
  const [score, setScore] = useState(1280);
  return (
    <div className={panel}>
      <div className="flex items-center justify-between">
        <span className="label">Игра</span>
        <span className="font-mono text-[10px] text-muted">рекорд</span>
      </div>
      <div className="mt-2 font-display text-4xl tabular-nums [font-variation-settings:'wdth'_120]">{score.toLocaleString("ru-RU")}</div>
      <button
        type="button"
        onClick={() => setScore((s) => s + 10 + Math.floor(Math.random() * 90))}
        className="mt-3 w-full rounded-full border border-line-strong py-2 text-[12px] transition-colors hover:bg-fg hover:text-bg"
      >
        Тап, чтобы набрать очки
      </button>
    </div>
  );
}
