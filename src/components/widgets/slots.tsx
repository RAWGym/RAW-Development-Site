import Link from "next/link";
import { site } from "@/content/site";

// Свободные слоты на месяц. Цифры меняются в src/content/site.ts → slots.
export function Slots({ className = "", lang = "ru" }: { className?: string; lang?: "ru" | "en" }) {
  const { month, monthEn, total, free } = site.slots;
  const isEn = lang === "en";
  const taken = total - free;
  return (
    <Link
      href={isEn ? "/en#contact" : "/start"}
      data-cursor={isEn ? "Book" : "Занять"}
      className={`group inline-flex items-center gap-4 rounded-2xl border border-line-strong bg-[var(--glass)] py-3 pl-4 pr-5 backdrop-blur-md transition-colors duration-300 hover:border-accent ${className}`}
    >
      <span className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-5 w-5 rounded-[3px] ${i < taken ? "bg-fg/25" : "slot-free border border-accent bg-accent-soft"}`}
          />
        ))}
      </span>
      <span className="leading-tight">
        <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">{isEn ? `Slots for ${monthEn}` : `Слоты на ${month}`}</span>
        <span className="block text-sm">
          {free > 0 ? (
            <>
              {isEn ? "Open" : "Свободно"} <span className="text-accent">{free}</span> {isEn ? "of" : "из"} {total}
            </>
          ) : isEn ? (
            "Fully booked, next month is open"
          ) : (
            "Всё занято, запишем на следующий"
          )}
        </span>
      </span>
      <span className="ml-1 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">→</span>
    </Link>
  );
}
