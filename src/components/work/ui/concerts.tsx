import type { ReactNode } from "react";
import { FakeQr, Icon, StatusBar } from "./kit";

// concerts.kz, сайт, админка и приложение тикетора. Вёрстка как в продакшене,
// события, имена и почты выдуманные.
const C = {
  bg: "#0d0d0d",
  card: "#161616",
  card2: "#1c1c1c",
  line: "#2a2a2a",
  red: "#ff4d4d",
  text: "#f2f2f2",
  muted: "#9a9a9a",
  faint: "#666",
  green: "#3ddc84",
};
const wide = { fontFamily: "var(--ff-display)", fontVariationSettings: "'wdth' 120", fontWeight: 800, textTransform: "uppercase" } as const;

function Logo({ size = 22 }: { size?: number }) {
  return (
    <span className="flex items-baseline font-semibold tracking-[-0.03em]" style={{ fontSize: size, color: C.text }}>
      c<span style={{ color: C.red }}>o</span>ncerts
      <span className="ml-[2px] text-[0.4em] font-normal" style={{ color: C.muted }}>
        prod.
      </span>
    </span>
  );
}

// Выдуманная афиша
export function Poster({ className = "", small = false }: { className?: string; small?: boolean }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: "radial-gradient(90% 70% at 50% 35%, #2fd1c4 0%, #1b5f8f 35%, #1b1640 70%, #0d0a1c 100%)" }}>
      <div className="absolute inset-x-0 top-[34%] mx-auto h-[46%] w-[46%] rounded-t-full" style={{ background: "linear-gradient(180deg,#0c0a18,#05040b)" }} />
      <div className="absolute inset-x-0 top-[6%] text-center leading-[0.9] text-[#f5f0a0]" style={{ ...wide, fontSize: small ? 9 : 28 }}>
        Полярная
        <br />
        ночь
      </div>
      {!small && (
        <>
          <div className="absolute left-[7%] top-[30%] text-[13px] font-bold text-[#f5f0a0]">12.12</div>
          <div className="absolute right-[7%] top-[30%] text-[13px] font-bold text-[#f5f0a0]">21.00</div>
          <div className="absolute inset-x-0 bottom-[16%] text-center text-[8px] tracking-[0.3em] text-white/80">ГЛАВНЫЙ ХЕДЛАЙНЕР</div>
        </>
      )}
      <div className="absolute inset-x-0 bottom-[5%] text-center text-[#f5f0a0]" style={{ ...wide, fontSize: small ? 8 : 26 }}>
        Aurora
      </div>
    </div>
  );
}

export function ConcertsSite() {
  const days = [
    ["31", "СБ"],
    ["1", "ВС"],
    ["2", "ПН"],
    ["3", "ВТ"],
    ["4", "СР"],
    ["5", "ЧТ"],
    ["6", "ПТ"],
    ["7", "СБ"],
    ["8", "ВС"],
    ["9", "ПН"],
    ["10", "ВТ"],
    ["11", "СР"],
    ["12", "ЧТ"],
    ["13", "ПТ"],
    ["14", "СБ"],
    ["15", "ВС"],
  ];
  return (
    <div className="h-full w-full overflow-hidden" style={{ background: C.bg, color: C.text }}>
      <div className="flex items-center gap-[18px] border-b px-[120px] py-[12px]" style={{ borderColor: C.line }}>
        <Logo />
        <span className="flex items-center gap-[6px] rounded-full px-[16px] py-[7px] text-[12px] font-bold" style={{ background: C.red }}>
          <Icon n="ticket" size={14} /> АФИША
        </span>
        <span className="flex items-center gap-[6px] text-[13px] font-semibold">
          <span style={{ color: C.red }}>
            <Icon n="pin" size={14} />
          </span>
          Все города
        </span>
        <span className="flex flex-1 items-center gap-[8px] rounded-full border px-[14px] py-[8px] text-[12px]" style={{ borderColor: C.line, background: C.card, color: C.faint }}>
          <Icon n="search" size={14} /> Поиск событий, артистов, площадок
        </span>
        <span className="flex gap-[4px] text-[11px] font-bold" style={{ color: C.muted }}>
          <span className="rounded-[6px] px-[7px] py-[4px] text-white" style={{ background: C.line }}>
            RU
          </span>
          <span className="px-[7px] py-[4px]">KZ</span>
          <span className="px-[7px] py-[4px]">EN</span>
        </span>
        <span className="flex flex-col items-center text-[10px]" style={{ color: C.muted }}>
          <Icon n="ticket" size={15} />
          Мои билеты
        </span>
        <span className="grid h-[30px] w-[30px] place-items-center rounded-full text-[12px] font-bold" style={{ background: C.red }}>
          Д
        </span>
      </div>
      <div className="flex gap-[22px] border-b px-[120px] py-[10px] text-[12.5px]" style={{ borderColor: C.line }}>
        {["Концерты", "Фестивали", "Stand Up", "Шоу", "Open Air"].map((t) => (
          <span key={t} className="font-semibold">
            {t}
          </span>
        ))}
        <span className="w-px" style={{ background: C.line }} />
        {["Фотоотчёты", "Новости", "О компании", "Партнёрам", "Контакты"].map((t) => (
          <span key={t} style={{ color: C.muted }}>
            {t}
          </span>
        ))}
      </div>
      <div className="px-[120px] pt-[22px]">
        <div className="flex items-center justify-between overflow-hidden rounded-[22px] border p-[28px]" style={{ borderColor: C.line, background: "linear-gradient(90deg,#141414 30%,#152230 75%,#1e1a2e)" }}>
          <div>
            <span className="rounded-full px-[10px] py-[4px] text-[11px] font-bold" style={{ background: C.red }}>
              СКОРО
            </span>
            <div className="mt-[12px] text-[12px] font-bold tracking-wider" style={{ color: C.red }}>
              12 ДЕКАБРЯ / 21:00
            </div>
            <div className="mt-[6px] whitespace-nowrap text-[52px] leading-none" style={wide}>
              Полярная ночь
            </div>
            <div className="mt-[14px] text-[14px]">Aurora. Большой зимний концерт</div>
            <div className="mt-[6px] text-[12.5px]" style={{ color: C.muted }}>
              Алматы · Sound Hall
            </div>
            <div className="mt-[20px] flex gap-[10px] text-[12px] font-bold">
              <span className="rounded-[10px] px-[18px] py-[12px]" style={{ background: C.red }}>
                КУПИТЬ БИЛЕТ
              </span>
              <span className="rounded-[10px] border px-[18px] py-[12px]" style={{ borderColor: "#444" }}>
                ПОДРОБНЕЕ
              </span>
            </div>
          </div>
          <Poster className="h-[290px] w-[232px] shrink-0 rounded-[14px]" />
        </div>
        <div className="mt-[18px] flex items-center gap-[4px] rounded-[18px] border px-[12px] py-[12px]" style={{ borderColor: C.line, background: C.card }}>
          {days.map(([d, w], i) => (
            <div key={i} className="flex flex-1 flex-col items-center rounded-[10px] py-[6px]" style={i === 0 ? { background: "#2a1414" } : undefined}>
              <span className="text-[18px] font-bold" style={{ color: i === 0 ? C.red : w === "СБ" || w === "ВС" ? "#e0884a" : C.text }}>
                {d}
              </span>
              <span className="text-[9px]" style={{ color: C.faint }}>
                {w}
              </span>
            </div>
          ))}
          <span className="ml-[6px] grid h-[40px] w-[40px] place-items-center rounded-full border" style={{ borderColor: C.line }}>
            <Icon n="calendar" size={16} />
          </span>
        </div>
      </div>
      <div className="mt-[22px] flex gap-[22px] whitespace-nowrap border-y py-[12px] text-[15px] tracking-[0.12em]" style={{ borderColor: C.line, ...wide, fontWeight: 700 }}>
        {["Узбекистан", "Испания", "Нидерланды", "Германия", "Казахстан", "Россия", "Кыргызстан", "Узбекистан"].map((t, i) => (
          <span key={i} className="flex items-center gap-[22px]">
            {t} <span style={{ color: C.red }}>+</span>
          </span>
        ))}
      </div>
      <div className="flex items-end justify-between px-[120px] pt-[30px]">
        <span className="text-[28px]" style={wide}>
          Ближайшие события
        </span>
        <span className="text-[11px] font-bold">СМОТРЕТЬ ВСЕ →</span>
      </div>
    </div>
  );
}

function Side() {
  const groups: [string, string[]][] = [
    ["Админка", ["Обзор", "На подтверждение"]],
    ["Афиша", ["События", "Площадки"]],
    ["Продажи", ["Финансы", "Заказы", "Возвраты", "Заявки"]],
    ["Вход на концерт", ["Проходы", "Пригласительные", "Тикеторы и входы", "Журнал входа"]],
    ["Контент", ["Новости", "Фотоотчёты", "Партнёры"]],
    ["Управление", ["Сотрудники", "Настройки сайта"]],
  ];
  return (
    <div className="w-[190px] shrink-0 border-r px-[14px] py-[22px]" style={{ borderColor: C.line, background: "#0a0a0a" }}>
      <div className="px-[8px]">
        <Logo size={18} />
      </div>
      {groups.map(([g, items]) => (
        <div key={g} className="mt-[16px]">
          <div className="px-[8px] text-[9px] uppercase tracking-[0.15em]" style={{ color: C.faint }}>
            {g}
          </div>
          {items.map((t) => (
            <div key={t} className="mt-[3px] rounded-[8px] px-[8px] py-[6px] text-[12.5px]" style={t === "Тикеторы и входы" ? { background: "#2a1212", color: C.red } : undefined}>
              {t}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function ConcertsAdmin() {
  const accounts = [
    ["Дана Ахметова", "dana@concerts.kz", true, "Сегодня, 20:41"],
    ["Ержан Сапаров", "erzhan@concerts.kz", true, "Сегодня, 20:38"],
    ["Ольга Ким", "olga@concerts.kz", false, "29 окт., 23:10"],
  ] as const;
  return (
    <div className="flex h-full w-full overflow-hidden" style={{ background: C.bg, color: C.text }}>
      <Side />
      <div className="flex-1 px-[30px] py-[26px]">
        <div className="flex items-center justify-between">
          <span className="text-[24px]" style={wide}>
            Тикеторы и входы
          </span>
          <span className="rounded-[8px] border px-[12px] py-[7px] text-[12px]" style={{ borderColor: C.line, background: C.card }}>
            Полярная ночь · 12 дек. 2026 г., 21:00 ▾
          </span>
        </div>
        <div className="mt-[20px] grid grid-cols-2 gap-[16px]">
          <div className="rounded-[14px] border p-[18px]" style={{ borderColor: C.line, background: C.card }}>
            <div className="flex justify-between text-[12.5px]">
              <b style={wide}>Входы концерта</b>
              <span className="text-[11px]" style={{ color: C.red }}>
                Взять входы площадки
              </span>
            </div>
            <div className="mt-[12px] flex flex-wrap gap-[8px] text-[12px]">
              {["Главный вход", "VIP", "Танцпартер", "Служебный"].map((t) => (
                <span key={t} className="rounded-full border px-[12px] py-[6px]" style={{ borderColor: C.line }}>
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-[14px] flex gap-[8px]">
              <span className="flex-1 rounded-[8px] border px-[10px] py-[9px] text-[11.5px]" style={{ borderColor: C.line, color: C.faint, background: C.card2 }}>
                Новый вход, например «Балкон»
              </span>
              <span className="rounded-[8px] border px-[14px] py-[9px] text-[11px] font-bold" style={{ borderColor: "#444" }}>
                ДОБАВИТЬ
              </span>
            </div>
          </div>
          <div className="rounded-[14px] border p-[18px]" style={{ borderColor: C.line, background: C.card }}>
            <b className="text-[12.5px]" style={wide}>
              Тикеторы на концерте
            </b>
            {[
              ["Дана Ахметова", "Главный вход"],
              ["Ержан Сапаров", "VIP"],
            ].map(([n, g]) => (
              <div key={n} className="mt-[10px] flex items-center justify-between rounded-[8px] border px-[10px] py-[8px] text-[12.5px]" style={{ borderColor: C.line }}>
                {n}
                <span className="flex items-center gap-[10px]">
                  <span className="rounded-[6px] px-[8px] py-[3px] text-[11px]" style={{ background: C.card2 }}>
                    {g} ▾
                  </span>
                  <span className="text-[11px]" style={{ color: C.muted }}>
                    Снять
                  </span>
                </span>
              </div>
            ))}
            <div className="mt-[12px] flex justify-end">
              <span className="rounded-[8px] px-[14px] py-[8px] text-[11px] font-bold" style={{ background: C.red }}>
                НАЗНАЧИТЬ
              </span>
            </div>
          </div>
        </div>
        <div className="mt-[16px] grid grid-cols-2 gap-[16px]">
          {[
            ["Android", "Тикетор наводит камеру на QR, скачивает приложение и ставит его. Обновляется само при запуске.", "Скачать сканер", 3],
            ["iPhone", "Тикетор открывает ссылку в Safari и добавляет «Сканер» на экран «Домой». Работает на весь экран.", "Скопировать ссылку", 11],
          ].map(([t, d, l, s]) => (
            <div key={t as string} className="flex gap-[14px] rounded-[14px] border p-[14px]" style={{ borderColor: C.line, background: C.card }}>
              <span className="shrink-0 rounded-[8px] bg-white p-[6px]">
                <FakeQr size={78} seed={s as number} />
              </span>
              <div>
                <b className="text-[13px]" style={wide}>
                  {t}
                </b>
                <p className="mt-[6px] text-[11.5px] leading-snug" style={{ color: C.muted }}>
                  {d}
                </p>
                <div className="mt-[6px] text-[11.5px]" style={{ color: C.red }}>
                  {l}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[22px] flex items-center justify-between">
          <span className="text-[16px]" style={wide}>
            Аккаунты тикеторов
          </span>
          <span className="rounded-[10px] px-[14px] py-[9px] text-[11px] font-bold" style={{ background: C.red }}>
            + ТИКЕТОР
          </span>
        </div>
        <div className="mt-[12px] overflow-hidden rounded-[12px] border text-[12px]" style={{ borderColor: C.line }}>
          <div className="grid grid-cols-[1.3fr_1.3fr_.8fr_1fr] px-[14px] py-[9px] text-[9.5px] uppercase tracking-[0.15em]" style={{ background: C.card, color: C.faint }}>
            <span>Тикетор</span>
            <span>Логин</span>
            <span>Статус</span>
            <span>Последний вход</span>
          </div>
          {accounts.map(([n, e, on, last]) => (
            <div key={n} className="grid grid-cols-[1.3fr_1.3fr_.8fr_1fr] items-center border-t px-[14px] py-[10px]" style={{ borderColor: C.line }}>
              <span className="font-semibold">{n}</span>
              <span className="font-mono text-[11px]" style={{ color: C.muted }}>
                {e}
              </span>
              <span>
                <span className="rounded-full px-[8px] py-[2px] text-[9.5px] font-bold" style={on ? { background: "#0f2e20", color: C.green } : { background: C.card2, color: C.faint }}>
                  {on ? "АКТИВЕН" : "ОТКЛЮЧЁН"}
                </span>
              </span>
              <span>{last}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ,,, Приложение тикетора ,,,

function AppShell({ tab, children }: { tab: number; children: ReactNode }) {
  const items: [string, string][] = [
    ["calendar", "Концерты"],
    ["history", "История"],
    ["scan", "Сканер"],
    ["bell", "Уведомления"],
    ["user", "Профиль"],
  ];
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: C.bg, color: C.text }}>
      <StatusBar />
      <div className="px-[20px] pt-[18px]">{children}</div>
      <div className="absolute inset-x-0 bottom-0 flex border-t px-[6px] pb-[30px] pt-[10px]" style={{ borderColor: C.line, background: C.bg }}>
        {items.map(([ic, t], i) => (
          <div key={t} className="relative flex flex-1 flex-col items-center gap-[5px] text-[11px]" style={{ color: i === tab ? C.text : C.faint }}>
            {i === 2 ? (
              <>
                <span className="-mt-[34px] grid h-[60px] w-[60px] place-items-center rounded-full border-[5px] text-white shadow-[0_0_30px_-4px_#ff4d4d]" style={{ background: C.red, borderColor: C.bg }}>
                  <Icon n="scan" size={26} stroke={2.2} />
                </span>
                <span className="flex items-center gap-[4px]" style={{ color: tab === 2 ? C.text : C.muted }}>
                  <span className="h-[6px] w-[6px] rounded-full" style={{ background: C.green }} />
                  {t}
                </span>
              </>
            ) : (
              <>
                {i === tab && <span className="absolute -top-[10px] h-[2px] w-[28px] rounded-full" style={{ background: C.red }} />}
                <Icon n={ic} size={22} />
                {t}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Online() {
  return (
    <span className="flex items-center gap-[6px] text-[13px]" style={{ color: C.muted }}>
      <span className="h-[8px] w-[8px] rounded-full" style={{ background: C.green }} /> Онлайн
    </span>
  );
}

export function TicketerConcerts() {
  const list = [
    { t: "Полярная ночь", d: "Сб, 12 декабря · 21:00 · Sound Hall", done: 1240, all: 3000 },
    { t: "Джаз на крыше", d: "Вс, 20 декабря · 19:00 · Terrace", done: 0, all: 450 },
  ];
  return (
    <AppShell tab={0}>
      <div className="flex items-center justify-between">
        <span className="text-[12px] tracking-[0.18em]" style={{ ...wide, color: C.red, fontWeight: 700 }}>
          Добрый вечер, Дана
        </span>
        <Online />
      </div>
      <div className="mt-[6px] whitespace-nowrap text-[26px] leading-none" style={wide}>
        Мои концерты
      </div>
      <div className="mt-[18px] space-y-[10px]">
        {list.map((e, i) => (
          <div key={e.t} className="flex gap-[14px] rounded-[18px] border p-[12px]" style={{ borderColor: C.line, background: C.card, opacity: i ? 0.75 : 1 }}>
            {i === 0 ? (
              <Poster small className="h-[72px] w-[72px] shrink-0 rounded-[10px]" />
            ) : (
              <span className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-[10px] text-[10px]" style={{ ...wide, background: "linear-gradient(135deg,#3a2a12,#120d06)", color: "#f0c060" }}>
                Jazz
              </span>
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate text-[16px]" style={wide}>
                {e.t}
              </div>
              <div className="mt-[3px] text-[12.5px]" style={{ color: C.muted }}>
                {e.d}
              </div>
              <div className="mt-[10px] h-[4px] overflow-hidden rounded-full" style={{ background: C.line }}>
                <span className="block h-full rounded-full" style={{ width: `${(e.done / e.all) * 100}%`, background: C.green }} />
              </div>
              <div className="mt-[6px] text-[12px]" style={{ color: C.muted }}>
                {e.done.toLocaleString("ru-RU")} из {e.all.toLocaleString("ru-RU")} прошли
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[18px] rounded-[18px] border p-[16px]" style={{ borderColor: C.line, background: C.card }}>
        <div className="flex items-center gap-[10px]">
          <span className="rounded-full px-[10px] py-[4px] text-[10px] font-bold tracking-wider" style={{ background: "#3a1515", color: C.red }}>
            НАЗНАЧЕНИЕ
          </span>
          <span className="text-[12px]" style={{ color: C.faint }}>
            2 дн назад
          </span>
        </div>
        <div className="mt-[10px] text-[15px] font-semibold">Вас назначили на «Полярную ночь»</div>
        <div className="mt-[4px] text-[13px]" style={{ color: C.muted }}>
          Главный вход · Sound Hall
        </div>
        <div className="mt-[10px] flex items-center gap-[4px] text-[13.5px] font-semibold" style={{ color: C.red }}>
          Открыть сканер <Icon n="chevR" size={15} />
        </div>
      </div>
    </AppShell>
  );
}

export function TicketerScanner() {
  return (
    <AppShell tab={2}>
      <div className="flex items-center gap-[10px]">
        <span style={{ color: C.muted }}>
          <Icon n="chevL" size={22} />
        </span>
        <div className="flex-1">
          <div className="whitespace-nowrap text-[18px] leading-none" style={wide}>
            Полярная ночь
          </div>
          <div className="mt-[4px] text-[12.5px]" style={{ color: C.muted }}>
            Главный вход · Дана Ахметова
          </div>
        </div>
        <Online />
      </div>
      <div className="relative mt-[14px] h-[410px] overflow-hidden rounded-[24px]" style={{ background: "radial-gradient(80% 60% at 50% 50%, #1a1a1a, #000)" }}>
        {/* Билет в кадре */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] rounded-[10px] bg-white p-[8px] opacity-90">
          <FakeQr size={130} seed={23} />
        </div>
        {[
          "left-[50px] top-[80px] border-l-[4px] border-t-[4px] rounded-tl-[18px]",
          "right-[50px] top-[80px] border-r-[4px] border-t-[4px] rounded-tr-[18px]",
          "left-[50px] bottom-[80px] border-l-[4px] border-b-[4px] rounded-bl-[18px]",
          "right-[50px] bottom-[80px] border-r-[4px] border-b-[4px] rounded-br-[18px]",
        ].map((c) => (
          <span key={c} className={`absolute h-[46px] w-[46px] ${c}`} style={{ borderColor: C.red }} />
        ))}
        <span className="absolute inset-x-[60px] top-[52%] h-[2px] rounded-full" style={{ background: C.red, boxShadow: `0 0 16px ${C.red}` }} />
        <div className="absolute inset-x-[16px] bottom-[16px] flex items-center gap-[10px] rounded-[14px] px-[14px] py-[10px]" style={{ background: "rgba(16,60,38,.92)", color: "#bff5d6" }}>
          <Icon n="okCircle" size={22} />
          <div className="leading-tight">
            <div className="text-[14px] font-bold" style={{ color: "#fff" }}>
              Проходите
            </div>
            <div className="text-[11.5px]">Танцпартер · билет №48213</div>
          </div>
        </div>
      </div>
      <div className="mt-[12px] grid grid-cols-3 gap-[8px] text-center">
        {[
          ["1 240", "ПРОШЛИ", C.text],
          ["1 760", "ЖДЁМ", C.text],
          ["12", "ОТКАЗОВ", C.red],
        ].map(([v, l, col]) => (
          <div key={l} className="rounded-[14px] py-[10px]" style={{ background: C.card2 }}>
            <div className="text-[20px] leading-none" style={{ ...wide, color: col }}>
              {v}
            </div>
            <div className="mt-[5px] text-[10.5px] tracking-[0.15em]" style={{ color: C.faint }}>
              {l}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[8px] grid grid-cols-[1.3fr_.9fr_1.3fr] gap-[8px] text-center text-[13px]" style={wide}>
        {["Ввести код", "Свет", "История"].map((t) => (
          <span key={t} className="rounded-[14px] border py-[14px]" style={{ borderColor: "#3a3a3a" }}>
            {t}
          </span>
        ))}
      </div>
    </AppShell>
  );
}

function Toggle() {
  return (
    <span className="relative h-[30px] w-[52px] shrink-0 rounded-full" style={{ background: C.red }}>
      <span className="absolute right-[3px] top-[3px] h-[24px] w-[24px] rounded-full bg-white" />
    </span>
  );
}

export function TicketerProfile() {
  return (
    <AppShell tab={4}>
      <div className="text-[27px] leading-none" style={wide}>
        Профиль
      </div>
      <div className="mt-[16px] flex items-center gap-[14px] rounded-[18px] border p-[16px]" style={{ borderColor: C.line, background: C.card }}>
        <span className="grid h-[56px] w-[56px] place-items-center rounded-full text-[18px]" style={{ ...wide, background: "linear-gradient(135deg,#ff6a5a,#c43a3a)" }}>
          ДА
        </span>
        <div>
          <div className="text-[17px] font-semibold">Дана Ахметова</div>
          <div className="text-[13px]" style={{ color: C.muted }}>
            Логин: dana@concerts.kz
          </div>
          <div className="text-[11.5px]" style={{ color: C.faint }}>
            Тикетор · концертов: 14
          </div>
        </div>
      </div>
      <div className="mb-[8px] mt-[18px] px-[4px] text-[12px] tracking-[0.18em]" style={{ ...wide, color: C.muted, fontWeight: 700 }}>
        Сканирование
      </div>
      <div className="overflow-hidden rounded-[18px] border" style={{ borderColor: C.line, background: C.card }}>
        {[
          ["Звук", "Короткий сигнал на каждый результат"],
          ["Вибрация", "Разная для «проходите» и отказа"],
        ].map(([t, d]) => (
          <div key={t} className="flex items-center justify-between border-b px-[16px] py-[12px]" style={{ borderColor: C.line }}>
            <div>
              <div className="text-[15px]">{t}</div>
              <div className="text-[12px]" style={{ color: C.faint }}>
                {d}
              </div>
            </div>
            <Toggle />
          </div>
        ))}
        <div className="border-b px-[16px] py-[12px]" style={{ borderColor: C.line }}>
          <div className="text-[15px]">Зелёный экран «Проходите»</div>
          <div className="mt-[8px] grid grid-cols-4 gap-[4px] rounded-[12px] p-[4px] text-center text-[13px]" style={{ background: C.bg }}>
            {["2 сек", "3 сек", "5 сек", "Вручную"].map((t, i) => (
              <span key={t} className="rounded-[9px] py-[7px]" style={i === 1 ? { background: "#2c2c2c", fontWeight: 600 } : { color: C.muted }}>
                {t}
              </span>
            ))}
          </div>
          <div className="mt-[6px] text-[11.5px]" style={{ color: C.faint }}>
            Отказ всегда закрывается только кнопкой.
          </div>
        </div>
        <div className="flex items-center justify-between px-[16px] py-[12px]">
          <div>
            <div className="text-[15px]">Не выключать экран</div>
            <div className="text-[12px]" style={{ color: C.faint }}>
              Пока открыт сканер
            </div>
          </div>
          <Toggle />
        </div>
      </div>
    </AppShell>
  );
}
