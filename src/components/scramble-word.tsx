"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЭЮЯ<>/{}[]#*01";

// Слово меняется эффектом «расшифровки»: случайные символы → нужное слово.
export function ScrambleWord({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [text, setText] = useState(words[0]);
  const index = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;

    const scrambleTo = (target: string) => {
      const from = text.length;
      const len = Math.max(from, target.length);
      const start = performance.now();
      const duration = 700;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const revealed = Math.floor(t * len);
        let out = "";
        for (let i = 0; i < len; i++) {
          if (i < revealed) out += target[i] ?? "";
          else if (i < target.length) out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setText(out);
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const id = window.setInterval(() => {
      index.current = (index.current + 1) % words.length;
      scrambleTo(words[index.current]);
    }, interval);

    return () => {
      window.clearInterval(id);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words, interval]);

  return (
    <span className="inline-block whitespace-nowrap" aria-live="off">
      <span className="text-muted">[</span>
      {text}
      <span className="text-muted">]</span>
    </span>
  );
}
