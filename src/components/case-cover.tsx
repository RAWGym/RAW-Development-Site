import Image from "next/image";
import type { CaseStudy } from "@/content/cases";
import { getCaseMedia } from "@/content/case-media";
import { BrowserFrame, PhoneFrame, caseUi } from "@/components/work/ui";

// Обложка-заглушка кейса, пока нет реальных скриншотов: цветной фон,
// крупное название и схематичный интерфейс в духе продукта.
// captioned: под карточкой уже есть подпись с названием. Для нарисованных интерфейсов
// тогда не дублируем название внутри обложки и даём экранам всё место.
export function CaseCover({ c: raw, sizes = "(min-width: 768px) 60vw, 100vw", captioned = false }: { c: CaseStudy; sizes?: string; captioned?: boolean }) {
  const c = captioned && caseUi[raw.slug] ? { ...raw, title: "" } : raw;
  const { cover } = getCaseMedia(c.slug);
  if (cover)
    return (
      <div className="relative h-full w-full" style={{ background: c.cover.to }}>
        <Image src={cover} alt={`${c.title} — интерфейс`} fill sizes={sizes} className="object-cover" />
        {c.title && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-16">
            <div className="font-display text-[clamp(26px,3.6vw,56px)] font-semibold uppercase leading-none text-white [font-variation-settings:'wdth'_130]">{c.title}</div>
          </div>
        )}
      </div>
    );
  return (
    <div
      className="relative h-full w-full [container-type:size]"
      style={{
        background: `radial-gradient(120% 90% at 85% 10%, ${c.cover.from}, ${c.cover.to} 70%)`,
        color: c.cover.ink,
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(${c.cover.ink}14 1px, transparent 1px), linear-gradient(90deg, ${c.cover.ink}14 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />
      {/* Макет интерфейса не должен залезать на название: снизу он плавно растворяется */}
      <div
        className="absolute inset-0"
        style={{ maskImage: fade(Boolean(c.title)), WebkitMaskImage: fade(Boolean(c.title)) }}
      >
        <Mock slug={c.slug} ink={c.cover.ink} titled={Boolean(c.title)} />
      </div>
      <div className="absolute bottom-5 left-5 right-5">
        <div className="font-display text-[clamp(26px,3.6vw,56px)] font-semibold uppercase leading-none [font-variation-settings:'wdth'_130]">
          {c.title}
        </div>
      </div>
    </div>
  );
}

function Mock({ slug, ink, titled }: { slug: string; ink: string; titled: boolean }) {
  const ui = caseUi[slug];
  // Три экрана веером. Размер считается от высоты и ширины обложки, чтобы телефоны
  // не вылезали за край ни в широкой карточке, ни в узкой мобильной.
  if (ui?.cover.kind === "phone" && ui.phones) {
    const [a, b, c] = ui.phones;
    const w = titled ? "w-[min(19cqw,33cqh)]" : "w-[min(33cqw,40cqh)]";
    return (
      <div className={`absolute flex items-start ${titled ? "right-[5cqw] top-[7cqh]" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-[48%]"}`}>
        <div className={`${w} mt-[9cqh] -mr-[3cqw] -rotate-[7deg] opacity-80`}>
          <PhoneFrame ink={ink}>{b.node}</PhoneFrame>
        </div>
        <div className={`${w} relative z-10`}>
          <PhoneFrame ink={ink}>{a.node}</PhoneFrame>
        </div>
        <div className={`${w} mt-[9cqh] -ml-[3cqw] rotate-[7deg] opacity-80`}>
          <PhoneFrame ink={ink}>{c.node}</PhoneFrame>
        </div>
      </div>
    );
  }
  if (ui?.cover.kind === "browser")
    return (
      <div className={`absolute ${titled ? "right-[4cqw] top-[7cqh] w-[min(64cqw,100cqh)]" : "left-1/2 top-1/2 w-[min(80cqw,120cqh)] -translate-x-[54%] -translate-y-[56%]"}`}>
        <BrowserFrame desk={ui.cover.desk} ink={ink} />
        {ui.phones && (
          <div className="absolute -bottom-[14cqh] -right-[6cqw] w-[min(17cqw,28cqh)] rotate-[5deg]">
            <PhoneFrame ink={ink}>{ui.phones[1].node}</PhoneFrame>
          </div>
        )}
      </div>
    );
  const card = { borderColor: `${ink}33`, background: `${ink}0d` };
  if (slug === "concerts-kz") {
    // схема зала
    return (
      <div className="absolute right-[8%] top-[14%] w-[44%]">
        <div className="mx-auto mb-3 h-2 w-2/3 rounded-full" style={{ background: `${ink}66` }} />
        <div className="grid grid-cols-12 gap-1">
          {Array.from({ length: 96 }).map((_, i) => (
            <span
              key={i}
              className="aspect-square rounded-[2px]"
              style={{ background: [13, 14, 27, 40, 41, 66, 70].includes(i) ? ink : `${ink}26` }}
            />
          ))}
        </div>
      </div>
    );
  }
  if (slug === "slotly") {
    // телефон с записью в Mini App
    return (
      <div className="absolute right-[10%] top-[10%] w-[26%] rounded-[22px] border p-2" style={card}>
        <div className="space-y-2 rounded-[16px] p-2" style={{ background: `${ink}0d` }}>
          {["11:00", "14:30", "18:00"].map((t, i) => (
                <div
                  key={t}
                  className="rounded-lg px-2 py-2 text-center text-[11px]"
                  style={i === 1 ? { background: ink, color: "#000" } : { background: `${ink}14` }}
                >
                  {t}
                </div>
              ))}
        </div>
      </div>
    );
  }
  if (slug === "raw-management") {
    // канбан
    return (
      <div className="absolute right-[6%] top-[12%] grid w-[52%] grid-cols-3 gap-2">
        {[3, 2, 4].map((n, col) => (
          <div key={col} className="space-y-1.5 rounded-lg border p-1.5" style={card}>
            {Array.from({ length: n }).map((_, k) => (
              <div key={k} className="h-6 rounded" style={{ background: `${ink}${k === 0 ? "40" : "1a"}` }} />
            ))}
          </div>
        ))}
      </div>
    );
  }
  if (slug === "habit-tracker") {
    return (
      <div className="absolute right-[8%] top-[14%] flex w-[46%] justify-between">
        {[0.9, 0.55, 0.75].map((p, i) => (
          <svg key={i} viewBox="0 0 44 44" className="w-[30%] -rotate-90">
            <circle cx="22" cy="22" r="18" fill="none" stroke={`${ink}26`} strokeWidth="5" />
            <circle cx="22" cy="22" r="18" fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" strokeDasharray={113} strokeDashoffset={113 * (1 - p)} />
          </svg>
        ))}
      </div>
    );
  }
  if (slug === "game") {
    return (
      <div className="absolute right-[8%] top-[12%] w-[44%]">
        <div className="grid grid-cols-8 gap-1">
          {Array.from({ length: 32 }).map((_, i) => (
            <span key={i} className="h-3 rounded-[2px]" style={{ background: [3, 9, 14, 20, 27].includes(i) ? "transparent" : `${ink}${i < 8 ? "cc" : i < 16 ? "80" : "40"}` }} />
          ))}
        </div>
        <span className="mx-auto mt-10 block h-3 w-3 rounded-full" style={{ background: ink }} />
        <span className="mx-auto mt-6 block h-2 w-1/4 rounded-full" style={{ background: ink }} />
      </div>
    );
  }
  if (slug === "music-player") {
    return (
      <div className="absolute right-[8%] top-[12%] w-[42%]">
        <div className="mx-auto aspect-square w-1/2 rounded-full border-[10px]" style={{ borderColor: `${ink}33`, background: `radial-gradient(circle, ${ink} 0 8%, ${ink}1a 9% 100%)` }} />
        <div className="mt-5 flex h-10 items-end gap-[3px]">
          {Array.from({ length: 28 }).map((_, i) => (
            <span key={i} className="flex-1 rounded-sm" style={{ height: `${20 + ((i * 37) % 75)}%`, background: `${ink}99` }} />
          ))}
        </div>
      </div>
    );
  }
  if (slug === "movie-player") {
    return (
      <div className="absolute right-[6%] top-[14%] flex w-[52%] gap-2">
        {[1, 0.7, 0.5, 0.35].map((o, i) => (
          <div key={i} className="aspect-[2/3] flex-1 rounded-md border" style={{ borderColor: `${ink}33`, background: `linear-gradient(180deg, ${ink}${Math.round(o * 60).toString(16).padStart(2, "0")}, transparent)` }} />
        ))}
      </div>
    );
  }
  if (slug === "tv-firmware") {
    return (
      <div className="absolute right-[8%] top-[12%] w-[46%]">
        <div className="aspect-video rounded-lg border-2 p-2" style={{ borderColor: `${ink}66` }}>
          <div className="grid h-full grid-cols-4 gap-1.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="rounded" style={{ background: i === 1 ? ink : `${ink}26` }} />
            ))}
          </div>
        </div>
        <div className="mx-auto mt-1 h-1.5 w-1/4 rounded-b" style={{ background: `${ink}66` }} />
      </div>
    );
  }
  // банк: карта и баланс
  return (
    <div className="absolute right-[8%] top-[12%] w-[40%]">
      <div className="aspect-[1.6] -rotate-6 rounded-2xl border p-4" style={{ ...card, background: `linear-gradient(135deg, ${ink}33, ${ink}0a)` }}>
        <div className="font-mono text-[10px] opacity-70">YURTA</div>
        <div className="mt-6 font-mono text-[11px] tracking-[0.2em]">•••• 4821</div>
      </div>
      <div className="mt-4 rounded-xl border p-3" style={card}>
        <div className="font-mono text-[9px] opacity-60">Баланс</div>
        <div className="text-lg">1 284 500 ₸</div>
      </div>
    </div>
  );
}

const fade = (titled: boolean) => (titled ? "linear-gradient(180deg, black 55%, transparent 80%)" : "linear-gradient(180deg, black 72%, transparent 97%)");
