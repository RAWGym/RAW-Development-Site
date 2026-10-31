"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Рисованный экран в фиксированном размере (как настоящий телефон или ноутбук),
// который ужимается под ширину контейнера. Так макет выглядит одинаково на любом экране.
export function Fit({ w, h, children, className = "" }: { w: number; h: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setS(e.contentRect.width / w));
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ aspectRatio: `${w} / ${h}` }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 origin-top-left select-none"
        style={{ width: w, height: h, transform: `scale(${s})`, visibility: s ? "visible" : "hidden" }}
      >
        {children}
      </div>
    </div>
  );
}

const paths: Record<string, ReactNode> = {
  home: <path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z" />,
  grid: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 12h16M12 4v16" />
    </>
  ),
  list: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1-4 4-6 8-6s7 2 8 6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.8-3.5 3.3-5.5 6.5-5.5s5.7 2 6.5 5.5M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c1.8.8 3 2.6 3.5 5.2" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
    </>
  ),
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M3 10h18M7 3h10" />
    </>
  ),
  check: <path d="M5 12l4.5 4.5L19 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  bell: <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4" />,
  gift: (
    <>
      <rect x="3.5" y="8" width="17" height="4" rx="1" />
      <path d="M5 12v8h14v-8M12 8v12M12 8c-2-4-6-4-6-1.5S9 8 12 8c3 0 6-1 6-1.5S14 4 12 8" />
    </>
  ),
  x: <path d="M6 6l12 12M18 6 6 18" />,
  dots: <path d="M6 12h.01M12 12h.01M18 12h.01" strokeWidth="3" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevR: <path d="M9 6l6 6-6 6" />,
  chevL: <path d="M15 6l-6 6 6 6" />,
  bolt: <path d="M13 3 5 13h6l-1 8 8-10h-6z" />,
  shield: <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />,
  okCircle: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  history: (
    <>
      <path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.5" />
      <path d="M4 4v4.5h4.5M12 8v4l3 2" />
    </>
  ),
  scan: <path d="M4 9V6a2 2 0 0 1 2-2h3M15 4h3a2 2 0 0 1 2 2v3M20 15v3a2 2 0 0 1-2 2h-3M9 20H6a2 2 0 0 1-2-2v-3M8 12h8" />,
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
    </>
  ),
  share: (
    <>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6" />
    </>
  ),
  refresh: <path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5" />,
  camera: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <circle cx="12" cy="13.5" r="3.5" />
      <path d="M8 7l1.5-3h5L16 7" />
    </>
  ),
  film: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
    </>
  ),
  cart: <path d="M5 7h14l-1 12H6zM9 7a3 3 0 0 1 6 0" />,
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z" />,
  pin: <path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />,
  ticket: <path d="M3 8a2 2 0 0 0 0 4v0a2 2 0 0 1 0 4v2h18v-2a2 2 0 0 1 0-4 2 2 0 0 0 0-4V6H3zM14 6v12" />,
  sliders: <path d="M4 7h10M18 7h2M4 17h4M12 17h8M16 5v4M10 15v4" />,
};

export function Icon({ n, size = 20, stroke = 1.8, className = "", style }: { n: keyof typeof paths | string; size?: number; stroke?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      {paths[n]}
    </svg>
  );
}

// Строка статуса iPhone
export function StatusBar({ color = "#fff", time = "9:41" }: { color?: string; time?: string }) {
  return (
    <div className="flex h-[50px] items-center justify-between px-[30px] pt-1 text-[16px] font-semibold" style={{ color, fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>
      <span>{time}</span>
      <span className="flex items-center gap-[6px]">
        <span className="flex items-end gap-[2px]">
          {[5, 7, 9, 11].map((hh) => (
            <span key={hh} className="w-[3px] rounded-[1px]" style={{ height: hh, background: color }} />
          ))}
        </span>
        <span className="text-[13px]">4G</span>
        <span className="relative h-[12px] w-[24px] rounded-[3.5px] border" style={{ borderColor: `${color}88` }}>
          <span className="absolute inset-[1.5px] right-[6px] rounded-[1.5px]" style={{ background: color }} />
        </span>
      </span>
    </div>
  );
}

// Детерминированный «QR-код» для макетов: не ведёт никуда
export function FakeQr({ size = 96, seed = 7 }: { size?: number; seed?: number }) {
  const n = 21;
  const cells: boolean[] = [];
  let x = seed * 9301 + 49297;
  for (let i = 0; i < n * n; i++) {
    x = (x * 9301 + 49297) % 233280;
    cells.push(x / 233280 > 0.52);
  }
  const finder = (r: number, c: number) => {
    for (const [fr, fc] of [
      [0, 0],
      [0, n - 7],
      [n - 7, 0],
    ]) {
      if (r >= fr && r < fr + 7 && c >= fc && c < fc + 7) {
        const rr = r - fr;
        const cc = c - fc;
        return rr === 0 || rr === 6 || cc === 0 || cc === 6 || (rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4) ? 1 : 0;
      }
    }
    return -1;
  };
  const u = size / n;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="#fff" />
      {cells.map((on, i) => {
        const r = Math.floor(i / n);
        const c = i % n;
        const f = finder(r, c);
        const fill = f === -1 ? on : f === 1;
        return fill ? <rect key={i} x={c * u} y={r * u} width={u + 0.2} height={u + 0.2} fill="#111" /> : null;
      })}
    </svg>
  );
}
