"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const W = 28;
const H = 18;
type P = { x: number; y: number };

// Цифры 3×5 для заставки «404».
const DIGITS: Record<string, string[]> = {
  "4": ["101", "101", "111", "001", "001"],
  "0": ["111", "101", "101", "101", "111"],
};

function splash(): P[] {
  const out: P[] = [];
  const word = "404";
  const scale = 2;
  const totalW = (word.length * 3 + (word.length - 1)) * scale;
  const ox = Math.floor((W - totalW) / 2);
  const oy = Math.floor((H - 5 * scale) / 2);
  word.split("").forEach((d, i) =>
    DIGITS[d].forEach((row, y) =>
      row.split("").forEach((b, x) => {
        if (b !== "1") return;
        for (let sx = 0; sx < scale; sx++)
          for (let sy = 0; sy < scale; sy++) out.push({ x: ox + (i * 4 + x) * scale + sx, y: oy + y * scale + sy });
      }),
    ),
  );
  return out;
}

const SPLASH = splash();

// Змейка на пиксельной сетке. Рисуем в canvas, состояние держим в ref, чтобы не перерисовывать React на каждом шаге.
export function PixelSnake() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const state = useRef({ snake: [] as P[], dir: { x: 1, y: 0 }, next: { x: 1, y: 0 }, food: { x: 0, y: 0 }, alive: false });
  const [phase, setPhase] = useState<"idle" | "play" | "over">("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  const draw = useCallback((mode: "idle" | "play" | "over") => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const css = getComputedStyle(document.documentElement);
    const fg = css.getPropertyValue("--fg").trim() || "#edebe7";
    const line = css.getPropertyValue("--line-strong").trim() || "#333";
    const cell = c.width / W;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = line;
    for (let x = 0; x < W; x++) for (let y = 0; y < H; y++) ctx.fillRect(x * cell + cell / 2 - 1, y * cell + cell / 2 - 1, 2, 2);
    const px = (p: P, a = 1) => {
      ctx.globalAlpha = a;
      ctx.fillStyle = fg;
      ctx.fillRect(p.x * cell + 1.5, p.y * cell + 1.5, cell - 3, cell - 3);
      ctx.globalAlpha = 1;
    };
    if (mode === "idle") {
      SPLASH.forEach((p) => px(p));
      return;
    }
    const s = state.current;
    s.snake.forEach((p, i) => px(p, mode === "over" ? 0.35 : Math.max(0.35, 1 - i * 0.03)));
    px(s.food, 1);
    ctx.strokeStyle = fg;
    ctx.lineWidth = 1;
    ctx.strokeRect(s.food.x * cell + 0.5, s.food.y * cell + 0.5, cell - 1, cell - 1);
  }, []);

  const placeFood = () => {
    const s = state.current;
    let f: P;
    do f = { x: Math.floor(Math.random() * W), y: Math.floor(Math.random() * H) };
    while (s.snake.some((p) => p.x === f.x && p.y === f.y));
    s.food = f;
  };

  const start = useCallback(() => {
    const s = state.current;
    s.snake = [{ x: 8, y: 9 }, { x: 7, y: 9 }, { x: 6, y: 9 }];
    s.dir = { x: 1, y: 0 };
    s.next = { x: 1, y: 0 };
    s.alive = true;
    placeFood();
    setScore(0);
    setPhase("play");
  }, []);

  // Чёткий canvas на ретина-экранах
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const fit = () => {
      const r = c.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = Math.round(r.width * dpr);
      c.height = Math.round((r.width * H) / W * dpr);
      draw(phase);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [draw, phase]);

  useEffect(() => {
    if (phase !== "play") return;
    const id = setInterval(() => {
      const s = state.current;
      s.dir = s.next;
      const head = { x: (s.snake[0].x + s.dir.x + W) % W, y: (s.snake[0].y + s.dir.y + H) % H };
      if (s.snake.some((p) => p.x === head.x && p.y === head.y)) {
        s.alive = false;
        setPhase("over");
        setBest((b) => Math.max(b, s.snake.length - 3));
        return;
      }
      s.snake.unshift(head);
      if (head.x === s.food.x && head.y === s.food.y) {
        setScore(s.snake.length - 3);
        placeFood();
      } else s.snake.pop();
      draw("play");
    }, 95);
    return () => clearInterval(id);
  }, [phase, draw]);

  const turn = useCallback((x: number, y: number) => {
    const s = state.current;
    if (s.dir.x === -x && s.dir.y === -y) return;
    s.next = { x, y };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const map: Record<string, [number, number]> = {
        arrowup: [0, -1], w: [0, -1], ц: [0, -1],
        arrowdown: [0, 1], s: [0, 1], ы: [0, 1],
        arrowleft: [-1, 0], a: [-1, 0], ф: [-1, 0],
        arrowright: [1, 0], d: [1, 0], в: [1, 0],
      };
      if (map[k]) {
        e.preventDefault();
        if (phase !== "play") start();
        turn(...map[k]);
      } else if (k === " " || k === "enter") {
        if (phase !== "play") {
          e.preventDefault();
          start();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, start, turn]);

  // Свайпы
  const touch = useRef<P | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const t0 = touch.current;
    if (!t0) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - t0.x;
    const dy = t.clientY - t0.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) {
      if (phase !== "play") start();
      return;
    }
    if (phase !== "play") start();
    if (Math.abs(dx) > Math.abs(dy)) turn(Math.sign(dx), 0);
    else turn(0, Math.sign(dy));
  };

  return (
    <div className="rounded-[28px] border border-line bg-bg-raised p-3 md:p-5">
      <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-muted">
        <span>snake.exe</span>
        <span className="tabular-nums">
          счёт {String(score).padStart(3, "0")} · рекорд {String(best).padStart(3, "0")}
        </span>
      </div>
      <div className="relative touch-none select-none" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <canvas ref={canvas} className="block w-full" style={{ aspectRatio: `${W} / ${H}` }} aria-label="Игра змейка" role="img" />
        {phase !== "play" && (
          <button
            type="button"
            onClick={start}
            className="absolute inset-x-0 bottom-3 mx-auto w-max rounded-full bg-fg px-4 py-2 font-mono text-[11px] text-bg"
          >
            {phase === "over" ? "Ещё раз · пробел" : "Играть · пробел или тап"}
          </button>
        )}
      </div>
    </div>
  );
}
