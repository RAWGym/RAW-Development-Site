"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featuredCases, type CaseStudy } from "@/content/cases";
import { SectionHead, sectionPad } from "@/components/reveal";
import { CaseCover } from "@/components/case-cover";

gsap.registerPlugin(ScrollTrigger);

// Избранные кейсы: на десктопе — горизонтальный скролл с закреплением секции.
export function Work() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current;
      const sec = section.current;
      if (!el || !sec) return;
      const distance = () => el.scrollWidth - window.innerWidth + 64;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} id="work" data-section="work" className="overflow-hidden py-24 md:flex md:min-h-screen md:flex-col md:justify-center md:pb-10 md:pt-28">
      <div className="mx-auto w-full max-w-[1440px]" style={sectionPad}>
        <SectionHead
          index="02"
          label="Кейсы"
          title="Избранные проекты"
          aside={
            <Link href="/work" className="label border-b border-line-strong pb-1 transition-colors hover:text-fg">
              Все кейсы →
            </Link>
          }
        />
      </div>
      <div
        ref={track}
        className="flex flex-col gap-6 md:w-max md:flex-row md:gap-8"
        style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter-r)" }}
      >
        {featuredCases.map((c, i) => (
          <CaseCard key={c.slug} c={c} index={i} />
        ))}
        <Link
          href="/work"
          className="hidden w-[38vw] max-w-[520px] shrink-0 flex-col justify-between rounded-[28px] border border-line p-8 transition-colors hover:border-fg md:flex"
        >
          <span className="label">[→]</span>
          <span className="font-display text-5xl uppercase leading-none [font-variation-settings:'wdth'_120]">
            Ещё
            <br />
            проекты
          </span>
          <span className="text-muted">Трекер привычек, игра, плеер, киноплеер, прошивка ТВ и коммерческие проекты</span>
        </Link>
      </div>
    </section>
  );
}

function CaseCard({ c, index }: { c: CaseStudy; index: number }) {
  return (
    <Link
      href={`/work/${c.slug}`}
      data-cursor="Смотреть"
      className="group relative block w-full shrink-0 md:w-[min(56vw,calc((100svh-330px)*1.6))] md:max-w-[880px]"
    >
      <div data-tilt className="relative aspect-[16/10] overflow-hidden rounded-[28px] border border-line">
        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.04]">
          <CaseCover c={c} />
        </div>
        <div className="absolute left-5 top-5 flex gap-2">
          <span className="rounded-full bg-bg/70 px-3 py-1 font-mono text-[10px] backdrop-blur">0{index + 1}</span>
          <span className="rounded-full bg-bg/70 px-3 py-1 font-mono text-[10px] backdrop-blur">{c.year}</span>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
        <div className="min-w-0">
          <h3 className="font-display text-2xl uppercase [font-variation-settings:'wdth'_120] md:text-3xl">{c.title}</h3>
          <p className="mt-1 text-sm text-muted">{c.kind}</p>
        </div>
        <div className="md:text-right">
          <div className="font-display text-2xl [font-variation-settings:'wdth'_110]">{c.metric.value}</div>
          <div className="font-mono text-[10px] text-muted">{c.metric.label}</div>
        </div>
      </div>
    </Link>
  );
}
