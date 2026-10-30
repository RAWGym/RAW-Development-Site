"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CaseStudy } from "@/content/cases";

gsap.registerPlugin(ScrollTrigger);

// Экраны продукта: три устройства с ключевыми функциями. Плывут с разной скоростью при прокрутке.
// Пока нет настоящих скриншотов — схематичные интерфейсы в цветах кейса.
export function CaseScreens({ c }: { c: CaseStudy }) {
  const root = useRef<HTMLDivElement>(null);
  const isPhone = !c.platforms.some((p) => /^(Web|Mobile web|Smart TV|Android TV|macOS)$/.test(p)) || c.platforms.includes("iOS");
  const screens = c.features.slice(0, 3);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((d) => {
        const sp = Number(d.dataset.speed);
        gsap.fromTo(d, { y: 80 * sp }, { y: -80 * sp, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const tint = { from: c.cover.from, to: c.cover.to, ink: c.cover.ink };

  return (
    <div
      ref={root}
      className="relative overflow-hidden rounded-[28px] border border-line px-4 py-16 md:px-10 md:py-24"
      style={{ background: `radial-gradient(90% 80% at 50% 0%, ${tint.from}, var(--bg) 75%)` }}
    >
      <div data-lenis-prevent-touch className={`mx-auto max-w-[1200px] items-center gap-6 ${isPhone ? "-mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-auto sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0" : "grid grid-cols-1 md:grid-cols-[1.4fr_1fr]"}`}>
        {isPhone
          ? screens.map((s, i) => (
              <div key={s.title} data-speed={[0.6, -0.3, 0.9][i]} className="w-[68vw] max-w-[280px] shrink-0 snap-center sm:mx-auto sm:w-full">
                <Phone title={s.title} text={s.text} ink={tint.ink} variant={i} />
              </div>
            ))
          : (
            <>
              <div data-speed="0.4">
                <Browser title={screens[0]?.title ?? c.title} ink={tint.ink} url={c.url?.replace("https://", "") ?? `${c.slug}.app`} />
              </div>
              <div className="grid gap-6" data-speed="-0.4">
                {screens.slice(1).map((s, i) => (
                  <Card key={s.title} title={s.title} text={s.text} ink={tint.ink} variant={i} />
                ))}
              </div>
            </>
          )}
      </div>
    </div>
  );
}

function Phone({ title, text, ink, variant }: { title: string; text: string; ink: string; variant: number }) {
  return (
    <div className="rounded-[36px] border p-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]" style={{ borderColor: `${ink}33`, background: "#0e0e10" }}>
      <div className="relative aspect-[9/19] overflow-hidden rounded-[28px] p-4" style={{ background: `linear-gradient(180deg, ${ink}12, transparent 60%)` }}>
        <div className="mx-auto mb-5 h-5 w-24 rounded-full bg-black" />
        <div className="font-mono text-[9px] uppercase tracking-widest" style={{ color: `${ink}99` }}>
          0{variant + 1}
        </div>
        <div className="mt-1 text-[15px] font-medium leading-tight" style={{ color: ink }}>
          {title}
        </div>
        <Skeleton ink={ink} variant={variant} />
        <div className="mt-4 space-y-2">
          {[88, 64, 76].map((w, k) => (
            <div key={k} className="h-2 rounded" style={{ width: `${w}%`, background: `${ink}${k === 0 ? "26" : "14"}` }} />
          ))}
        </div>
        <div className="absolute inset-x-4 bottom-[86px] flex justify-around rounded-2xl py-2.5" style={{ background: `${ink}0d` }}>
          {[0, 1, 2, 3].map((k) => (
            <span key={k} className="h-4 w-4 rounded-md" style={{ background: k === variant ? ink : `${ink}30` }} />
          ))}
        </div>
        <p className="absolute inset-x-4 bottom-4 text-[11px] leading-snug" style={{ color: `${ink}aa` }}>
          {text}
        </p>
      </div>
    </div>
  );
}

function Skeleton({ ink, variant }: { ink: string; variant: number }) {
  if (variant === 0)
    return (
      <div className="mt-5 space-y-2">
        <div className="h-24 rounded-2xl" style={{ background: `linear-gradient(135deg, ${ink}40, ${ink}10)` }} />
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((k) => (
            <div key={k} className="aspect-square rounded-xl" style={{ background: `${ink}${k === 0 ? "30" : "14"}` }} />
          ))}
        </div>
      </div>
    );
  if (variant === 1)
    return (
      <div className="mt-5 space-y-2">
        {[70, 52, 84, 40].map((w, k) => (
          <div key={k} className="flex items-center gap-2 rounded-xl p-2" style={{ background: `${ink}10` }}>
            <span className="h-7 w-7 shrink-0 rounded-lg" style={{ background: `${ink}${k === 0 ? "60" : "22"}` }} />
            <span className="h-2 rounded" style={{ width: `${w}%`, background: `${ink}30` }} />
          </div>
        ))}
      </div>
    );
  return (
    <div className="mt-5">
      <div className="flex h-28 items-end gap-1.5 rounded-2xl p-3" style={{ background: `${ink}10` }}>
        {[40, 65, 50, 85, 60, 95, 75].map((h, k) => (
          <span key={k} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: k === 5 ? ink : `${ink}40` }} />
        ))}
      </div>
      <div className="mt-3 h-10 rounded-full" style={{ background: ink }} />
    </div>
  );
}

function Browser({ title, ink, url }: { title: string; ink: string; url: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]" style={{ borderColor: `${ink}33`, background: "#0e0e10" }}>
      <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: `${ink}1f` }}>
        {[0, 1, 2].map((k) => (
          <span key={k} className="h-2.5 w-2.5 rounded-full" style={{ background: `${ink}30` }} />
        ))}
        <span className="ml-3 flex-1 truncate rounded-md px-3 py-1 font-mono text-[10px]" style={{ background: `${ink}10`, color: `${ink}99` }}>
          {url}
        </span>
      </div>
      <div className="p-6">
        <div className="text-xl font-medium" style={{ color: ink }}>
          {title}
        </div>
        <div className="mt-2 h-2 w-1/2 rounded" style={{ background: `${ink}25` }} />
        <div className="mt-6 grid grid-cols-12 gap-1">
          {Array.from({ length: 72 }).map((_, i) => (
            <span key={i} className="aspect-square rounded-[3px]" style={{ background: [9, 10, 23, 37, 50, 51].includes(i) ? ink : `${ink}18` }} />
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          <span className="h-9 flex-1 rounded-full" style={{ background: ink }} />
          <span className="h-9 w-24 rounded-full border" style={{ borderColor: `${ink}40` }} />
        </div>
      </div>
    </div>
  );
}

function Card({ title, text, ink, variant }: { title: string; text: string; ink: string; variant: number }) {
  return (
    <div className="rounded-2xl border p-5 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)]" style={{ borderColor: `${ink}33`, background: "#0e0e10" }}>
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-medium" style={{ color: ink }}>
          {title}
        </span>
        <span className="font-mono text-[10px]" style={{ color: `${ink}80` }}>
          0{variant + 2}
        </span>
      </div>
      <p className="mt-2 text-[13px] leading-snug" style={{ color: `${ink}aa` }}>
        {text}
      </p>
      <div className="mt-4 flex h-12 items-end gap-1">
        {[30, 55, 45, 70, 50, 85, 65, 90].map((h, k) => (
          <span key={k} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: k === 7 - variant * 2 ? ink : `${ink}30` }} />
        ))}
      </div>
    </div>
  );
}
