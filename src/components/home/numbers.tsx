"use client";

import { useEffect, useRef, useState } from "react";
import { sectionPad } from "@/components/reveal";
import { site } from "@/content/site";

// Цифры студии. Каждая цифра прокручивается, как на механическом табло.
const STATS = [
  { value: `${site.yearsOfExperience}+`, label: "лет в разработке" },
  { value: `${site.stats.projects}+`, label: "проектов запущено" },
  { value: "98", label: "средний Lighthouse" },
  { value: "100%", label: "сдано в срок" },
];

export function Numbers() {
  return (
    <section data-section="numbers" className="border-y border-line py-16 md:py-24" style={sectionPad}>
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-12 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} className={`flex flex-col gap-3 ${i > 0 ? "md:border-l md:border-line md:pl-8" : ""}`}>
            <Flip value={s.value} />
            <span className="label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Flip({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex font-display text-[clamp(44px,5vw,96px)] font-semibold leading-none tabular-nums [font-variation-settings:'wdth'_105]"
    >
      <span className="sr-only">{value}</span>
      {value.split("").map((ch, i) => {
        const digit = /\d/.test(ch) ? Number(ch) : null;
        if (digit === null) return <span key={i} className="shrink-0 leading-[1.12em]" aria-hidden="true">{ch}</span>;
        return (
          <span key={i} className="relative inline-block h-[1.12em] shrink-0 overflow-hidden" aria-hidden="true">
            {/* Невидимая цифра задаёт ширину ячейки */}
            <span className="invisible block h-[1.12em] leading-[1.12em]">{ch}</span>
            <span
              className="absolute inset-x-0 top-0 flex flex-col items-center"
              style={{
                transform: on ? `translateY(-${digit * 1.12}em)` : "translateY(0)",
                transition: `transform 1.6s cubic-bezier(.22,1,.36,1) ${i * 0.12}s`,
              }}
            >
              {Array.from({ length: 10 }).map((_, n) => (
                <span key={n} className="block h-[1.12em] leading-[1.12em]">
                  {n}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </div>
  );
}
