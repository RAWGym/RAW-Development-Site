"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

function almatyTime() {
  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: site.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());
}

// Строка статуса внизу экрана, как в IDE: текущая секция, время в Алматы, FPS.
export function StatusBar() {
  const [time, setTime] = useState<string | null>(null);
  const [fps, setFps] = useState<number | null>(null);
  const [section, setSection] = useState("index");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const first = window.setTimeout(() => setTime(almatyTime()), 0);
    const id = window.setInterval(() => setTime(almatyTime()), 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  useEffect(() => {
    let frames = 0;
    let last = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      frames++;
      if (now - last >= 1000) {
        setFps(Math.round((frames * 1000) / (now - last)));
        frames = 0;
        last = now;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      const sections = document.querySelectorAll<HTMLElement>("[data-section]");
      let current = "index";
      sections.forEach((s) => {
        if (s.getBoundingClientRect().top < window.innerHeight * 0.5) current = s.dataset.section ?? current;
      });
      setSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden md:block"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-hidden="true"
    >
      <div className="h-px bg-line">
        <div className="h-px origin-left bg-accent" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <div
        className="flex items-center justify-between bg-bg/80 py-1.5 font-mono text-[10px] tracking-wider text-muted backdrop-blur-md"
        style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter-r)" }}
      >
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
            raw-development
          </span>
          <span>~/{section}</span>
          <span className="hidden lg:inline">{site.status}</span>
        </div>
        <div className="flex items-center gap-5 tabular-nums">
          <span>{Math.round(progress * 100).toString().padStart(3, "0")}%</span>
          <span>{fps ?? "--"} fps</span>
          <span>
            {site.city} {time ?? "--:--:--"}
          </span>
          <span className="hidden lg:inline">UTF-8</span>
          <span className="hidden lg:inline">G — сетка</span>
        </div>
      </div>
    </div>
  );
}
