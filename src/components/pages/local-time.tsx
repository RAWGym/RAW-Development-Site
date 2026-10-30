"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

// Время в Алматы и статус «на связи / не в сети».
export function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const t0 = setTimeout(() => setNow(new Date()), 0);
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => {
      clearTimeout(t0);
      clearInterval(id);
    };
  }, []);

  const parts = now
    ? new Intl.DateTimeFormat("ru-RU", { timeZone: site.timeZone, hour: "2-digit", minute: "2-digit", second: "2-digit", weekday: "short", hour12: false }).formatToParts(now)
    : [];
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "--";
  const hour = Number(get("hour"));
  const wd = get("weekday");
  const online = now ? !["сб", "вс"].includes(wd) && hour >= 10 && hour < 19 : false;

  return (
    <div>
      <div className="font-display text-[clamp(36px,3.6vw,56px)] font-semibold tabular-nums leading-none [font-variation-settings:'wdth'_110]">
        {get("hour")}:{get("minute")}
        <span className="text-muted">:{get("second")}</span>
      </div>
      <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-muted">
        <span className={`h-1.5 w-1.5 rounded-full ${online ? "bg-[#5fd38d]" : "bg-faint"}`} />
        {now ? (online ? "На связи" : "Сейчас не в сети, ответим утром") : "…"}
      </div>
    </div>
  );
}
