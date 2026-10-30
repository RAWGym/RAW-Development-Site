"use client";

import { useEffect, useRef, useState } from "react";

// true, пока элемент на экране: виджеты не тратят процессор, когда их не видно.
function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

/* ---------- Сайты: мини-браузер, в котором листается лендинг ---------- */
export function BrowserWidget() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line-strong bg-bg">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-fg/20" />
        <span className="h-2 w-2 rounded-full bg-fg/20" />
        <span className="h-2 w-2 rounded-full bg-fg/20" />
        <span className="ml-2 flex-1 truncate rounded-md bg-fg/5 px-2 py-0.5 font-mono text-[9px] text-muted">
          https://your-brand.kz
        </span>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div className="animate-[browse_9s_var(--ease-out)_infinite_alternate] space-y-3 p-3">
          <div className="h-24 rounded-md bg-gradient-to-br from-fg/25 to-fg/5" />
          <div className="h-2 w-2/3 rounded bg-fg/30" />
          <div className="h-2 w-1/2 rounded bg-fg/15" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-12 rounded bg-fg/10" />
            <div className="h-12 rounded bg-fg/10" />
            <div className="h-12 rounded bg-fg/10" />
          </div>
          <div className="h-2 w-3/4 rounded bg-fg/15" />
          <div className="h-20 rounded-md bg-fg/10" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-16 rounded bg-fg/10" />
            <div className="h-16 rounded bg-fg/10" />
          </div>
          <div className="mx-auto h-6 w-24 rounded-full bg-fg/40" />
        </div>
      </div>
    </div>
  );
}

/* ---------- Приложения: телефон, нажатие переключает экраны ---------- */
const SCREENS = [
  { title: "Баланс", body: "1 284 500 ₸", bars: [40, 70, 55, 90, 65, 80] },
  { title: "Задачи", body: "12 открыто", bars: [20, 35, 60, 45, 70, 85] },
  { title: "Привычки", body: "21 день подряд", bars: [90, 80, 95, 85, 100, 92] },
];
export function PhoneWidget() {
  const [i, setI] = useState(0);
  const s = SCREENS[i];
  return (
    <button
      type="button"
      onClick={() => setI((v) => (v + 1) % SCREENS.length)}
      className="mx-auto flex h-full max-h-[320px] w-[150px] flex-col rounded-[26px] border border-line-strong bg-bg p-2 text-left"
      aria-label="Переключить экран приложения"
      data-cursor="Тап"
    >
      <div className="mx-auto mb-2 h-3 w-12 rounded-full bg-fg/15" />
      <div key={i} className="flex flex-1 animate-[screenIn_.5s_var(--ease-out)] flex-col gap-2 rounded-[18px] bg-bg-raised p-3">
        <span className="font-mono text-[9px] uppercase text-muted">{s.title}</span>
        <span className="font-display text-lg leading-none [font-variation-settings:'wdth'_110]">{s.body}</span>
        <div className="mt-auto flex h-16 items-end gap-1">
          {s.bars.map((h, k) => (
            <span key={k} className="flex-1 rounded-sm bg-fg/70" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      <div className="mt-2 flex justify-center gap-1">
        {SCREENS.map((_, k) => (
          <span key={k} className={`h-1 w-4 rounded-full ${k === i ? "bg-fg" : "bg-fg/20"}`} />
        ))}
      </div>
    </button>
  );
}

/* ---------- Telegram-бот: живой чат с кнопками ---------- */
type Msg = { from: "bot" | "me"; text: string };
const SCRIPT: Record<string, string> = {
  "Записаться": "Свободно завтра: 11:00, 14:30, 18:00. Выберите время 👇",
  "14:30": "Готово! Записал вас на завтра в 14:30. Напомню за 2 часа.",
  "Цены": "Стрижка — 6 000 ₸, борода — 4 000 ₸, комплекс — 9 000 ₸.",
};
export function ChatWidget() {
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: "Привет! Я Slotly. Чем помочь?" }]);
  const [typing, setTyping] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const options = msgs.some((m) => m.text === "Записаться") ? ["14:30", "Цены"] : ["Записаться", "Цены"];

  const send = (t: string) => {
    if (typing) return;
    setMsgs((m) => [...m, { from: "me", text: t }]);
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot" as const, text: SCRIPT[t] }].slice(-6));
    }, 900);
  };

  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line-strong bg-bg">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-fg text-[10px] font-semibold text-bg">S</span>
        <div className="leading-tight">
          <div className="text-[12px]">Slotly</div>
          <div className="font-mono text-[9px] text-muted">{typing ? "печатает…" : "бот"}</div>
        </div>
      </div>
      <div ref={box} className="flex flex-1 flex-col gap-2 overflow-y-auto p-3 text-[12px]" data-lenis-prevent>
        {msgs.map((m, k) => (
          <div
            key={k}
            className={`max-w-[85%] animate-[screenIn_.35s_var(--ease-out)] rounded-2xl px-3 py-2 ${m.from === "bot" ? "self-start rounded-bl-sm bg-bg-raised" : "self-end rounded-br-sm bg-fg text-bg"}`}
          >
            {m.text}
          </div>
        ))}
        {typing && (
          <div className="flex gap-1 self-start rounded-2xl bg-bg-raised px-3 py-3">
            {[0, 1, 2].map((d) => (
              <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${d * 120}ms` }} />
            ))}
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-1.5 border-t border-line p-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => send(o)}
            className="rounded-lg border border-line-strong py-1.5 text-[11px] transition-colors hover:bg-fg hover:text-bg"
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Игры: мини-арканоид, играет сам, мышью можно перехватить ---------- */
export function GameWidget() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);

    const cols = 8;
    const rows = 4;
    let bricks = Array.from({ length: cols * rows }, () => true);
    let bx = w / 2;
    let by = h * 0.7;
    let vx = 2.2;
    let vy = -2.2;
    let px = w / 2;
    let manual: number | null = null;
    let raf = 0;
    let visible = true;

    const onMove = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      manual = e.clientX - r.left;
    };
    const onLeave = () => (manual = null);
    c.addEventListener("pointermove", onMove);
    c.addEventListener("pointerleave", onLeave);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(c);

    const fg = getComputedStyle(document.documentElement).getPropertyValue("--fg").trim() || "#edebe7";
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible || w === 0) return;
      const pw = Math.max(40, w * 0.22);
      const target = manual ?? bx;
      px += (target - px) * 0.12;
      bx += vx;
      by += vy;
      if (bx < 4 || bx > w - 4) vx *= -1;
      if (by < 4) vy *= -1;
      if (by > h - 14 && Math.abs(bx - px) < pw / 2 && vy > 0) {
        vy *= -1;
        vx += (bx - px) * 0.04;
        vx = Math.max(-3.5, Math.min(3.5, vx));
      }
      if (by > h + 10) {
        bx = w / 2;
        by = h * 0.6;
        vy = -2.2;
      }
      const bw = (w - 16) / cols;
      const bh = 10;
      bricks.forEach((alive, k) => {
        if (!alive) return;
        const x = 8 + (k % cols) * bw;
        const y = 10 + Math.floor(k / cols) * (bh + 4);
        if (bx > x && bx < x + bw - 3 && by > y && by < y + bh) {
          bricks[k] = false;
          vy *= -1;
        }
      });
      if (bricks.every((b) => !b)) bricks = bricks.map(() => true);

      ctx.clearRect(0, 0, w, h);
      bricks.forEach((alive, k) => {
        if (!alive) return;
        const x = 8 + (k % cols) * bw;
        const y = 10 + Math.floor(k / cols) * (bh + 4);
        ctx.globalAlpha = 0.25 + (Math.floor(k / cols) / rows) * 0.6;
        ctx.fillStyle = fg;
        ctx.fillRect(x, y, bw - 3, bh);
      });
      ctx.globalAlpha = 1;
      ctx.fillRect(px - pw / 2, h - 10, pw, 4);
      ctx.beginPath();
      ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
      ctx.fill();
    };
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      c.removeEventListener("pointermove", onMove);
      c.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return (
    <canvas
      ref={canvas}
      className="h-full w-full rounded-xl border border-line-strong bg-bg"
      aria-label="Мини-игра: ведите мышью, чтобы управлять платформой"
      data-cursor="Играть"
    />
  );
}

/* ---------- Медиа и ТВ: экран телевизора и прошивка ---------- */
export function TvWidget() {
  const [p, setP] = useState(0);
  const [ref, inView] = useInView<HTMLDivElement>();
  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setP((v) => (v >= 100 ? 0 : v + 2)), 120);
    return () => window.clearInterval(id);
  }, [inView]);
  const done = p >= 100;
  return (
    <div ref={ref} className="flex h-full flex-col items-center justify-center gap-3">
      <div className="relative aspect-video w-full max-w-[260px] overflow-hidden rounded-lg border-4 border-fg/15 bg-bg">
        <div className="absolute inset-0 grid place-items-center">
          {done ? (
            <div className="grid w-4/5 grid-cols-3 gap-1.5">
              {["Кино", "Музыка", "YouTube", "ТВ", "Игры", "Ещё"].map((t) => (
                <span key={t} className="rounded bg-fg/10 py-2 text-center font-mono text-[8px] text-fg/80">
                  {t}
                </span>
              ))}
            </div>
          ) : (
            <div className="w-3/5">
              <div className="mb-2 text-center font-mono text-[9px] text-muted">RAW OS · прошивка {p}%</div>
              <div className="h-1 overflow-hidden rounded bg-fg/10">
                <div className="h-full bg-fg" style={{ width: `${p}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-1.5 w-16 rounded-full bg-fg/15" />
    </div>
  );
}

/* ---------- Дизайн: слайдер «до / после» ---------- */
export function BeforeAfterWidget() {
  const [x, setX] = useState(55);
  return (
    <div className="relative h-full select-none overflow-hidden rounded-xl border border-line-strong bg-bg">
      {/* после */}
      <div className="absolute inset-0 space-y-2 p-4">
        <div className="h-16 rounded-lg bg-gradient-to-br from-fg/40 to-fg/10" />
        <div className="h-2.5 w-3/4 rounded bg-fg/60" />
        <div className="h-2 w-1/2 rounded bg-fg/30" />
        <div className="flex gap-2 pt-2">
          <span className="h-6 w-20 rounded-full bg-fg" />
          <span className="h-6 w-16 rounded-full border border-fg/40" />
        </div>
      </div>
      {/* до: вайрфрейм */}
      <div className="absolute inset-0 space-y-2 bg-bg p-4" style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}>
        <div className="grid h-16 place-items-center rounded-lg border border-dashed border-fg/30 font-mono text-[9px] text-muted">
          image
        </div>
        <div className="h-2.5 w-3/4 rounded border border-dashed border-fg/30" />
        <div className="h-2 w-1/2 rounded border border-dashed border-fg/20" />
        <div className="flex gap-2 pt-2">
          <span className="h-6 w-20 rounded-full border border-dashed border-fg/30" />
          <span className="h-6 w-16 rounded-full border border-dashed border-fg/20" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-px bg-fg" style={{ left: `${x}%` }}>
        <span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg px-2 py-1 font-mono text-[9px] text-bg">
          ⇆
        </span>
      </div>
      <input
        type="range"
        min={5}
        max={95}
        value={x}
        onChange={(e) => setX(Number(e.target.value))}
        aria-label="Сравнить вайрфрейм и готовый дизайн"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

/* ---------- Автоматизация и CRM: схема, по которой бегут данные ---------- */
export function FlowWidget() {
  const nodes = [
    { x: 30, y: 40, t: "Сайт" },
    { x: 30, y: 110, t: "Бот" },
    { x: 150, y: 75, t: "CRM" },
    { x: 270, y: 40, t: "Склад" },
    { x: 270, y: 110, t: "1С" },
  ];
  const edges = [
    "M58 40 C 100 40, 100 75, 122 75",
    "M58 110 C 100 110, 100 75, 122 75",
    "M178 75 C 210 75, 220 40, 242 40",
    "M178 75 C 210 75, 220 110, 242 110",
  ];
  return (
    <svg viewBox="0 0 300 150" className="h-full w-full" role="img" aria-label="Схема интеграций: сайт и бот передают данные в CRM, CRM — в склад и 1С">
      {edges.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="var(--line-strong)" strokeWidth="1" />
          <circle r="2.5" fill="var(--fg)">
            <animateMotion dur={`${2 + i * 0.4}s`} repeatCount="indefinite" path={d} />
          </circle>
        </g>
      ))}
      {nodes.map((n) => (
        <g key={n.t}>
          <rect x={n.x - 28} y={n.y - 12} width="56" height="24" rx="12" fill="var(--bg)" stroke="var(--line-strong)" />
          <text x={n.x} y={n.y + 3.5} textAnchor="middle" fontSize="10" fill="var(--fg)" fontFamily="var(--ff-code)">
            {n.t}
          </text>
        </g>
      ))}
    </svg>
  );
}
