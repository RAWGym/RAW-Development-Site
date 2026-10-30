"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
};

// Появление блока при прокрутке. Контент виден и без JS: анимация
// стартует из видимого состояния только если пользователь не просил меньше движения.
export function Reveal({ children, as: Tag = "div", className, delay = 0, y = 32 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.from(el, {
      y,
      opacity: 0,
      duration: 0.9,
      delay,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

// Заголовок секции: [01] — Название, и крупная строка под ним.
export function SectionHead({ index, label, title, aside }: { index: string; label: string; title: ReactNode; aside?: ReactNode }) {
  return (
    <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <span className="label mb-5 block">
          [{index}] — {label}
        </span>
        <Reveal
          as="h2"
          className="font-display text-[clamp(30px,4.6vw,76px)] font-semibold uppercase leading-[0.98] [font-variation-settings:'wdth'_110] md:[font-variation-settings:'wdth'_118]"
        >
          {title}
        </Reveal>
      </div>
      {aside && <div className="text-muted md:col-span-4 md:text-right">{aside}</div>}
    </div>
  );
}

export const sectionPad = {
  paddingLeft: "var(--gutter)",
  paddingRight: "var(--gutter-r)",
} as const;
