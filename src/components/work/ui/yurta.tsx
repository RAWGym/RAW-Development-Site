import type { ReactNode } from "react";
import { Icon, StatusBar } from "./kit";

// YURTA Bank и YURTA Business. Вёрстка как в приложении, имена, номера и суммы выдуманные.
const C = {
  bg: "#fbfaf8",
  green: "#233a30",
  green2: "#2d4a3d",
  sand: "#d9c7a8",
  beige: "#f1ebe5",
  grey: "#efefef",
  text: "#1f1f1f",
  muted: "#8a8782",
  line: "#e3e0dc",
  red: "#a8322a",
};
const sans = { fontFamily: "var(--ff-text), system-ui, sans-serif" } as const;

// Логотип: купол юрты из дуг
export function YurtaMark({ size = 34, color = C.green }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 50 31" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round">
      <path d="M3 29C3 15 13 4 25 4s22 11 22 25" />
      <path d="M12 29c0-11 6-20 13-20s13 9 13 20" />
      <path d="M20 29c0-8 2-15 5-15s5 7 5 15" />
      <path d="M19 4l6-3 6 3" />
    </svg>
  );
}

function Logo({ dark = false, sub }: { dark?: boolean; sub?: string }) {
  const col = dark ? "#fff" : C.green;
  return (
    <span className="flex items-center gap-[8px]">
      <YurtaMark size={40} color={col} />
      <span className="text-[22px] font-semibold tracking-[0.12em]" style={{ color: col }}>
        YURTA
      </span>
      {sub && (
        <span className="ml-[6px] border-l pl-[10px] text-[12px] font-semibold tracking-[0.3em]" style={{ color: "#b8956a", borderColor: "#b8956a" }}>
          {sub}
        </span>
      )}
    </span>
  );
}

// Горы рисуем векторно: небо, три хребта и, если нужно, юрта
export function Mountains({ tone = "warm", yurt = false, className = "" }: { tone?: "warm" | "dusk" | "grey"; yurt?: boolean; className?: string }) {
  const sky = tone === "warm" ? ["#d9a679", "#8f7a6a"] : tone === "dusk" ? ["#59645c", "#2a332e"] : ["#cfcac4", "#8d8984"];
  const ridges = tone === "warm" ? ["#a99787", "#6f6157", "#3e3a33"] : tone === "dusk" ? ["#6f7a72", "#47524b", "#26302a"] : ["#bdb7b0", "#8f8984", "#5f5a55"];
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className={`absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <linearGradient id={`sky-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} />
          <stop offset="1" stopColor={sky[1]} />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill={`url(#sky-${tone})`} />
      <path d="M0 120 L60 70 L95 95 L150 40 L190 80 L230 55 L290 100 L340 60 L400 90 V200 H0Z" fill={ridges[0]} />
      <path d="M150 40 L165 58 L158 56 L150 64 L142 55 L136 58Z M340 60 L352 74 L344 72 L338 78 L332 70Z" fill="#f4efe9" opacity=".8" />
      <path d="M0 150 L70 110 L120 135 L190 100 L250 140 L320 115 L400 140 V200 H0Z" fill={ridges[1]} />
      <path d="M0 175 L90 155 L180 170 L260 158 L400 172 V200 H0Z" fill={ridges[2]} />
      {yurt && (
        <g transform="translate(290 128)">
          <path d="M0 44 V22 L40 6 L80 22 V44Z" fill="#ece3d6" />
          <path d="M0 22 L40 6 L80 22" fill="none" stroke="#c9b9a2" strokeWidth="2" />
          <rect x="33" y="26" width="14" height="18" fill="#6b5640" />
        </g>
      )}
    </svg>
  );
}

function CardArt({ label, digits, name, dark = false, className = "" }: { label: string; digits?: string; name?: string; dark?: boolean; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[16px] ${className}`}>
      <Mountains tone={dark ? "dusk" : "grey"} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/25" />
      <div className="absolute left-[12px] top-[10px] flex flex-col items-center text-white">
        <YurtaMark size={26} color="#fff" />
        <span className="text-[8px] font-semibold tracking-[0.15em]">YURTA</span>
      </div>
      <span className="absolute right-[12px] top-[12px] text-[11px] font-semibold text-white">{label}</span>
      <span className="absolute left-[14px] top-[44%] h-[18%] w-[16%] rounded-[4px]" style={{ background: "linear-gradient(135deg,#e6d29e,#c9b47c)" }} />
      {digits && <span className="absolute bottom-[26%] left-[14px] text-[13px] font-semibold tracking-[0.1em] text-white">•••• {digits}</span>}
      {name && <span className="absolute bottom-[12%] left-[14px] text-[8.5px] font-medium tracking-[0.1em] text-white/90">{name}</span>}
      <span className="absolute bottom-[10%] right-[12px] flex">
        <span className="h-[18px] w-[18px] rounded-full bg-[#eb3b2f]" />
        <span className="-ml-[7px] h-[18px] w-[18px] rounded-full bg-[#f39a2b]/95" />
      </span>
    </div>
  );
}

function Compass() {
  return (
    <svg className="pointer-events-none absolute -right-[70px] -top-[60px]" width="240" height="240" viewBox="0 0 240 240" fill="none" stroke="#000" strokeOpacity=".06">
      <circle cx="120" cy="120" r="118" />
      <circle cx="120" cy="120" r="70" />
      {[0, 30, 60, 90, 120, 150].map((a) => (
        <line key={a} x1="120" y1="2" x2="120" y2="238" transform={`rotate(${a} 120 120)`} />
      ))}
    </svg>
  );
}

function Screen({ children, tabs }: { children: ReactNode; tabs?: ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ ...sans, background: C.bg, color: C.text }}>
      <Compass />
      <StatusBar color="#111" />
      <div className="relative px-[16px]">{children}</div>
      {tabs}
    </div>
  );
}

function BankTabs({ active }: { active: number }) {
  return (
    <div className="absolute inset-x-[16px] bottom-[22px] flex rounded-[30px] p-[6px] shadow-[0_10px_30px_-12px_rgba(0,0,0,.25)]" style={{ background: "rgba(240,240,240,.95)" }}>
      {[
        ["home", "Главная"],
        ["grid", "QR"],
        ["wallet", "Платежи"],
        ["user", "Профиль"],
      ].map(([ic, t], i) => (
        <span key={t} className="flex flex-1 flex-col items-center gap-[3px] rounded-[24px] py-[8px] text-[11px]" style={i === active ? { background: "#dcdcdc", color: "#555" } : { color: C.text }}>
          <Icon n={ic} size={22} stroke={2} />
          {t}
        </span>
      ))}
    </div>
  );
}

function BizTabs({ active }: { active: number }) {
  return (
    <div className="absolute inset-x-[14px] bottom-[22px] flex rounded-[30px] p-[6px]" style={{ background: C.green }}>
      {[
        ["home", "Главная"],
        ["cart", "Продажи"],
        ["grid", "QR"],
        ["list", "Бухгалтерия"],
        ["sliders", "Ещё"],
      ].map(([ic, t], i) => (
        <span key={t} className="flex flex-1 flex-col items-center gap-[3px] rounded-[24px] py-[8px] text-[10.5px]" style={i === active ? { background: C.sand, color: C.green, fontWeight: 600 } : { color: "#c9d3cd" }}>
          <Icon n={ic} size={21} />
          {t}
        </span>
      ))}
    </div>
  );
}

const Tile = ({ ic, t }: { ic: string; t: string }) => (
  <div className="flex flex-col items-center gap-[8px] rounded-[18px] py-[12px] text-[12px]" style={{ background: C.beige }}>
    <span className="grid h-[42px] w-[42px] place-items-center rounded-full bg-white">
      <Icon n={ic} size={20} stroke={2} />
    </span>
    {t}
  </div>
);

export function YurtaHome() {
  return (
    <Screen tabs={<BankTabs active={0} />}>
      <div className="pb-[12px] pt-[8px]">
        <Logo />
      </div>
      <div className="relative h-[130px] overflow-hidden rounded-[22px]">
        <Mountains tone="warm" yurt />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 to-transparent" />
        <div className="absolute left-[16px] top-[14px] flex items-center gap-[4px] text-[13px] text-white/90">
          Основной счёт <Icon n="chevR" size={13} />
        </div>
        <div className="absolute bottom-[18px] left-[16px] text-[32px] font-bold text-white">248 350,00 ₸</div>
      </div>
      <div className="mt-[12px] grid grid-cols-5 gap-[6px] text-[10.5px]">
        {[
          ["arrow", "Перевод"],
          ["wallet", "Платежи"],
          ["scan", "QR"],
          ["share", "За рубеж"],
          ["plus", "Кредит"],
        ].map(([ic, t]) => (
          <div key={t} className="flex flex-col items-center gap-[6px] rounded-[18px] py-[10px]" style={{ background: C.beige }}>
            <span className="grid h-[36px] w-[36px] place-items-center rounded-full bg-white">
              <Icon n={ic} size={18} stroke={2.2} />
            </span>
            {t}
          </div>
        ))}
      </div>
      <div className="mt-[10px] flex gap-[8px]">
        <div className="flex flex-[1.4] items-center gap-[10px] rounded-[18px] p-[10px]" style={{ background: C.green }}>
          <CardArt label="" className="h-[34px] w-[54px] shrink-0 !rounded-[6px]" />
          <div className="text-white">
            <div className="text-[13px] font-semibold tracking-[0.08em]">YURTA TRAVEL</div>
            <div className="text-[10px] text-white/70">*4821 · Активна</div>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center rounded-[18px] px-[12px]" style={{ background: C.grey }}>
          <span className="text-[10px]" style={{ color: C.muted }}>
            YURTA Points
          </span>
          <span className="text-[20px] font-semibold">1 240</span>
        </div>
      </div>
      <div className="mt-[10px] flex items-center gap-[12px] rounded-[22px] p-[14px] text-white" style={{ background: C.green }}>
        <span className="grid h-[44px] w-[44px] place-items-center rounded-[14px] bg-white/10">
          <Icon n="list" size={20} />
        </span>
        <div className="flex-1">
          <div className="text-[12px] text-[#d9c7a8]">Бизнес · ИП Nomad Studio</div>
          <div className="text-[20px] font-semibold">1 240 000,00 ₸</div>
          <div className="text-[11.5px] text-white/70">Сегодня 3 продажи</div>
        </div>
        <span className="rounded-full px-[14px] py-[8px] text-[13px] font-semibold" style={{ background: C.sand, color: C.green }}>
          Открыть
        </span>
      </div>
      <div className="relative mt-[10px] h-[120px] overflow-hidden rounded-[22px] p-[14px]" style={{ background: C.beige }}>
        <Mountains tone="grey" className="opacity-25" />
        <div className="relative flex items-center gap-[6px] text-[13px] font-semibold">
          <YurtaMark size={22} /> Points
        </div>
        <div className="relative mt-[4px] text-[19px] font-bold">2% баллами за QR</div>
        <div className="relative text-[12px]" style={{ color: C.muted }}>
          Платите по QR и копите YURTA Points
        </div>
      </div>
      <div className="mt-[14px] text-[16px] font-semibold">Популярное в YURTA</div>
      <div className="mt-[8px] grid grid-cols-2 gap-[8px]">
        {[
          ["cart", "YURTA Market", "Рассрочка 0-0-24"],
          ["share", "YURTA Travel", "Билеты и отели"],
          ["wallet", "YURTA Cards", "Дебетовые и премиум"],
          ["shield", "YURTA ID", "Документы и штрафы"],
        ].map(([ic, t, d]) => (
          <div key={t} className="flex items-center gap-[8px] rounded-[16px] p-[10px]" style={{ background: "linear-gradient(135deg,#d8d0c6,#b9ada0)" }}>
            <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[10px] text-white" style={{ background: C.green }}>
              <Icon n={ic} size={17} />
            </span>
            <span className="leading-tight">
              <span className="block text-[12.5px] font-semibold">{t}</span>
              <span className="block text-[10px]" style={{ color: "#5d564f" }}>
                {d}
              </span>
            </span>
          </div>
        ))}
      </div>
    </Screen>
  );
}

export function YurtaCards() {
  const perks = (d: boolean, items: [string, string][]) => (
    <div className="mt-[8px] grid grid-cols-3 gap-[2px] text-center text-[9px] leading-tight" style={{ color: d ? "#cfcfcf" : C.muted }}>
      {items.map(([ic, t]) => (
        <span key={t} className="flex flex-col items-center gap-[3px]">
          <Icon n={ic} size={16} />
          {t}
        </span>
      ))}
    </div>
  );
  return (
    <Screen>
      <div className="absolute inset-x-0 top-0 h-[200px] opacity-40">
        <Mountains tone="grey" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f3eee9]" />
      </div>
      <div className="relative" style={{ background: "transparent" }}>
        <div className="flex items-start justify-between pt-[8px]">
          <div>
            <div className="text-[34px] font-bold leading-none">Карты</div>
            <div className="mt-[6px] text-[13px]" style={{ color: C.muted }}>
              Выберите карту под свои задачи
            </div>
          </div>
          <span className="flex items-center gap-[6px] rounded-[16px] bg-white px-[12px] py-[9px] text-[13px] font-semibold shadow-sm">
            <Icon n="wallet" size={16} /> Мои карты
          </span>
        </div>
        <div className="relative mt-[16px] h-[150px] overflow-hidden rounded-[22px] p-[16px] text-white" style={{ background: "#141414" }}>
          <div className="absolute inset-y-0 right-0 w-[55%]">
            <Mountains tone="warm" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414] to-transparent" />
          </div>
          <div className="relative text-[12px] text-white/80">👑 YURTA Plus</div>
          <div className="relative mt-[6px] w-[70%] text-[17px] font-bold leading-tight">Больше возможностей с премиальными картами</div>
          <span className="relative mt-[10px] inline-flex items-center gap-[4px] rounded-full bg-white px-[14px] py-[6px] text-[12px] font-semibold text-black">
            Подробнее <Icon n="chevR" size={13} />
          </span>
        </div>
        <div className="mt-[12px] flex rounded-[20px] p-[4px] text-[13px]" style={{ background: "#e8e1da" }}>
          {["Все карты", "Дебетовые", "Премиальные"].map((t, i) => (
            <span key={t} className="flex-1 rounded-[16px] py-[8px] text-center" style={i === 0 ? { background: "#262626", color: "#fff" } : { color: C.muted }}>
              {t}
            </span>
          ))}
        </div>
        <div className="mt-[14px] text-[20px] font-bold">Дебетовые карты</div>
        <div className="mt-[10px] grid grid-cols-2 gap-[10px]">
          {[
            { t: "YURTA Standard", d: "Для повседневных задач", dark: false, perks: [["arrow", "Кэшбэк до 3%"], ["wallet", "Бесплатно"], ["okCircle", "Apple Pay"]] as [string, string][] },
            { t: "YURTA Travel", d: "Для жизни без границ", dark: true, perks: [["share", "Travel-кэшбэк"], ["refresh", "Курсы валют"], ["bolt", "eSIM"]] as [string, string][] },
          ].map((c) => (
            <div key={c.t} className="rounded-[20px] p-[12px]" style={c.dark ? { background: "#262626", color: "#fff" } : { background: "#ece6df" }}>
              <div className="text-[15px] font-bold">{c.t}</div>
              <div className="text-[11px]" style={{ color: c.dark ? "#bdbdbd" : C.muted }}>
                {c.d}
              </div>
              <CardArt label={c.t.split(" ")[1]} dark={c.dark} className="mt-[10px] aspect-[1.6]" />
              {perks(c.dark, c.perks)}
              <div className="mt-[10px] rounded-full py-[8px] text-center text-[12px] font-semibold" style={c.dark ? { background: "#fff", color: "#111" } : { background: "#262626", color: "#fff" }}>
                {c.dark ? "Уже есть ✓" : "Открыть карту"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}

export function YurtaCard() {
  const limits = [
    ["cart", "Покупки в день", "1 000 000 ₸"],
    ["wallet", "Снятие наличных", "500 000 ₸"],
    ["share", "Онлайн-покупки", "500 000 ₸"],
  ];
  return (
    <Screen>
      <div className="flex items-center pt-[6px]">
        <span className="grid h-[40px] w-[40px] place-items-center rounded-[12px]" style={{ background: C.grey }}>
          <Icon n="chevL" size={20} />
        </span>
        <span className="flex-1 pr-[40px] text-center text-[18px] font-semibold">YURTA Travel</span>
      </div>
      <CardArt label="YURTA Travel" digits="4821" name="AIDANA SERIKOVA" dark className="mt-[14px] aspect-[1.6] shadow-[0_20px_40px_-20px_rgba(0,0,0,.6)]" />
      <div className="mt-[8px] text-center text-[11.5px]" style={{ color: C.muted }}>
        Нажмите на карту, чтобы увидеть реквизиты
      </div>
      <div className="mt-[12px] grid grid-cols-4 gap-[6px] text-[10.5px]">
        {[
          ["search", "Реквизиты"],
          ["wallet", "Оплата"],
          ["sliders", "Лимиты"],
          ["shield", "Блокировать"],
        ].map(([ic, t], i) => (
          <span key={t} className="flex flex-col items-center gap-[5px] rounded-[16px] py-[10px]" style={{ background: C.beige, color: i === 3 ? C.red : C.text }}>
            <Icon n={ic} size={19} />
            {t}
          </span>
        ))}
      </div>
      <div className="mt-[14px] text-center text-[12px]" style={{ color: C.muted }}>
        Дебетовая карта · Доступно
      </div>
      <div className="text-center text-[28px] font-bold">248 350,00 ₸</div>
      <div className="mt-[12px] rounded-[22px] p-[14px]" style={{ background: C.grey }}>
        <div className="text-[16px] font-semibold">Лимиты</div>
        {limits.map(([ic, t, v]) => (
          <div key={t} className="mt-[12px] flex items-center gap-[12px] text-[14px]">
            <span className="grid h-[34px] w-[34px] place-items-center rounded-[10px] bg-white">
              <Icon n={ic} size={17} />
            </span>
            <span className="flex-1">{t}</span>
            <span className="text-[13px]">{v}</span>
            <Icon n="chevR" size={15} />
          </div>
        ))}
      </div>
    </Screen>
  );
}

// ,,, YURTA Business ,,,

export function BizHome() {
  return (
    <Screen tabs={<BizTabs active={0} />}>
      <div className="flex items-center justify-between pb-[12px] pt-[6px]">
        <Logo sub="BUSINESS" />
        <span className="grid h-[44px] w-[44px] place-items-center rounded-full text-[16px] font-semibold" style={{ background: C.green, color: C.sand }}>
          N
        </span>
      </div>
      <div className="relative h-[160px] overflow-hidden rounded-[22px] p-[16px] text-white">
        <Mountains tone="dusk" yurt />
        <div className="absolute inset-0 bg-[#233a30]/45" />
        <div className="relative flex items-center gap-[8px] text-[13px]">
          <span className="rounded-[8px] px-[8px] py-[2px] text-[11px] font-semibold" style={{ background: C.sand, color: C.green }}>
            ИП
          </span>
          ИП Nomad Studio
        </div>
        <div className="relative mt-[8px] text-[12px] text-white/75">Бизнес-счёт</div>
        <div className="relative text-[30px] font-bold leading-tight">1 240 000,00 ₸</div>
        <div className="relative mt-[8px] flex justify-between rounded-[12px] bg-white/15 px-[12px] py-[7px] text-[12px]">
          KZ12 9983 4410 2207 5531 <Icon n="copy" size={14} />
        </div>
      </div>
      <div className="mt-[12px] grid grid-cols-4 gap-[6px]">
        <Tile ic="scan" t="Принять по QR" />
        <Tile ic="list" t="Счёт" />
        <Tile ic="arrow" t="Перевести" />
        <Tile ic="copy" t="Выписка" />
      </div>
      <div className="mt-[10px] flex items-center gap-[12px] rounded-[20px] p-[12px] text-white" style={{ background: C.green }}>
        <span className="flex flex-col items-center">
          <YurtaMark size={34} color="#fff" />
          <span className="text-[8px] tracking-[0.15em]">YURTA</span>
        </span>
        <div className="flex-1">
          <div className="text-[15px] font-semibold">Личный счёт YURTA</div>
          <div className="text-[11.5px] text-white/70">248 350,00 ₸ · перевести между счетами</div>
        </div>
        <Icon n="refresh" size={18} />
      </div>
      <div className="mt-[14px] text-[19px] font-semibold">Сервисы для бизнеса</div>
      <div className="mt-[8px] grid grid-cols-4 gap-[6px] text-[12px] font-semibold text-white">
        {[
          ["wallet", "Кредиты"],
          ["arrow", "Депозиты"],
          ["share", "Поездки"],
          ["ticket", "Карты"],
        ].map(([ic, t]) => (
          <span key={t} className="flex flex-col items-center gap-[6px] rounded-[16px] py-[14px]" style={{ background: C.green }}>
            <span style={{ color: C.sand }}>
              <Icon n={ic} size={20} />
            </span>
            {t}
          </span>
        ))}
      </div>
    </Screen>
  );
}

export function BizCashier() {
  return (
    <Screen tabs={<BizTabs active={2} />}>
      <div className="flex items-center justify-between pt-[8px]">
        <span className="text-[28px] font-bold">Касса</span>
        <span className="flex items-center gap-[6px] rounded-full px-[12px] py-[7px] text-[13px]" style={{ background: C.grey }}>
          <span className="h-[8px] w-[8px] rounded-full" style={{ background: "#3f8f5f" }} /> Смена открыта
        </span>
      </div>
      <div className="mt-[12px] flex gap-[8px] text-[14px]">
        <span className="rounded-full px-[16px] py-[8px] text-white" style={{ background: "#262626" }}>
          QR на сумму
        </span>
        <span className="rounded-full px-[16px] py-[8px]" style={{ background: C.grey }}>
          QR магазина
        </span>
      </div>
      <div className="mt-[18px] text-center text-[44px] font-bold leading-none">12 500 ₸</div>
      <div className="mt-[6px] text-center text-[13px]" style={{ color: C.muted }}>
        Кофе и десерт · стол 4
      </div>
      <div className="mt-[16px] grid grid-cols-3 gap-[8px] text-[24px]">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "⌫"].map((k) => (
          <span key={k} className="rounded-[16px] py-[12px] text-center" style={{ background: C.grey }}>
            {k}
          </span>
        ))}
      </div>
      <div className="mt-[10px] flex items-center justify-center gap-[8px] rounded-full py-[14px] text-[16px] font-semibold text-white" style={{ background: C.green }}>
        <Icon n="scan" size={18} /> Показать QR покупателю
      </div>
    </Screen>
  );
}

export function BizAccounting() {
  return (
    <Screen tabs={<BizTabs active={3} />}>
      <div className="pt-[8px] text-[28px] font-bold leading-none">Бухгалтерия</div>
      <div className="mt-[4px] text-[14px]" style={{ color: C.muted }}>
        Упрощённая декларация
      </div>
      <div className="mt-[12px] rounded-[22px] p-[16px] text-white" style={{ background: C.green }}>
        <div className="text-[12.5px] text-white/75">Доход за 2 полугодие 2026</div>
        <div className="text-[32px] font-bold leading-tight">4 860 000 ₸</div>
        <div className="mt-[10px] flex border-t border-white/15 pt-[10px]">
          <div className="flex-1 border-r border-white/15">
            <div className="text-[12px] text-white/70">Налог за полугодие</div>
            <div className="text-[20px] font-bold" style={{ color: C.sand }}>
              145 800 ₸
            </div>
          </div>
          <div className="flex-1 pl-[14px]">
            <div className="text-[12px] text-white/70">К оплате</div>
            <div className="text-[20px] font-bold">167 475 ₸</div>
          </div>
        </div>
      </div>
      <div className="mt-[10px] rounded-[22px] p-[14px]" style={{ background: C.beige }}>
        <div className="flex items-center gap-[10px]">
          <span className="grid h-[40px] w-[40px] place-items-center rounded-full bg-white" style={{ color: C.green }}>
            <Icon n="clock" size={20} />
          </span>
          <div className="flex-1">
            <div className="text-[11.5px]" style={{ color: C.muted }}>
              до 25 ноября, осталось 25 дней
            </div>
            <div className="text-[15px] font-semibold">Взносы за себя</div>
          </div>
          <span className="text-[16px] font-bold">21 675 ₸</span>
        </div>
        <div className="mt-[10px] flex items-center justify-center gap-[6px] rounded-full py-[12px] text-[14.5px] text-white" style={{ background: "#262626" }}>
          <Icon n="bolt" size={16} /> Оплатить в одно касание
        </div>
      </div>
      <div className="mt-[14px] text-[18px] font-semibold">Календарь</div>
      {[
        ["25", "ноя", "Взносы за себя", "21 675 ₸"],
        ["15", "фев", "Декларация 910", "145 800 ₸"],
      ].map(([d, m, t, v]) => (
        <div key={t} className="mt-[8px] flex items-center gap-[12px] rounded-[18px] p-[10px]" style={{ background: C.grey }}>
          <span className="flex h-[46px] w-[46px] flex-col items-center justify-center rounded-[12px] border-[1.5px] leading-none" style={{ borderColor: "#c4a47c", color: "#a8865c" }}>
            <b className="text-[16px]">{d}</b>
            <span className="text-[10px]">{m}</span>
          </span>
          <span className="flex-1 text-[14.5px] font-medium">{t}</span>
          <span className="text-[14px] font-semibold">{v}</span>
        </div>
      ))}
    </Screen>
  );
}
