import type { CaseStudy } from "@/content/cases";

// Обложка-заглушка кейса, пока нет реальных скриншотов: цветной фон,
// крупное название и схематичный интерфейс в духе продукта.
export function CaseCover({ c }: { c: CaseStudy }) {
  return (
    <div
      className="relative h-full w-full"
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
      <Mock slug={c.slug} ink={c.cover.ink} />
      <div className="absolute bottom-5 left-5 right-5">
        <div className="font-display text-[clamp(26px,3.6vw,56px)] font-semibold uppercase leading-none [font-variation-settings:'wdth'_130]">
          {c.title}
        </div>
      </div>
    </div>
  );
}

function Mock({ slug, ink }: { slug: string; ink: string }) {
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
  if (slug === "pomogaybo" || slug === "slotly") {
    // телефон с чатом / Mini App
    return (
      <div className="absolute right-[10%] top-[10%] w-[26%] rounded-[22px] border p-2" style={card}>
        <div className="space-y-2 rounded-[16px] p-2" style={{ background: `${ink}0d` }}>
          {slug === "pomogaybo"
            ? ["ChatGPT Plus", "Spotify", "Netflix", "YouTube"].map((t) => (
                <div key={t} className="flex items-center justify-between rounded-lg px-2 py-2 text-[10px]" style={{ background: `${ink}14` }}>
                  {t}
                  <span className="rounded-full px-2 py-0.5 text-[8px]" style={{ background: ink, color: "#000" }}>
                    Купить
                  </span>
                </div>
              ))
            : ["11:00", "14:30", "18:00"].map((t, i) => (
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
