import type { ReactNode } from "react";
import { Icon, StatusBar } from "./kit";

// RAW Management, наш продукт. Интерфейс как в приложении, данные выдуманные.
const C = {
  bg: "#0c0c18",
  card: "#171730",
  line: "#272748",
  text: "#f1f0fb",
  muted: "#9897b8",
  faint: "#6b6a8c",
  red: "#ff5a6a",
  green: "#49e0a0",
  grad: "linear-gradient(120deg,#45b7f5 0%,#7f78f2 45%,#d966c2 100%)",
  gradSoft: "linear-gradient(125deg,#8095f7 0%,#b37ce6 55%,#e57bb6 100%)",
};
const wide = { fontFamily: "var(--ff-display)", fontVariationSettings: "'wdth' 120", fontWeight: 700 } as const;

function Shell({ tab, children }: { tab: number; children: ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: `radial-gradient(120% 50% at 50% 0%, #23214a, ${C.bg} 70%)`, color: C.text }}>
      <StatusBar />
      <div className="flex items-center justify-between px-[20px] pb-[6px] pt-[6px]" style={{ color: C.muted }}>
        <Icon n="search" size={21} />
        <span className="text-[26px] tracking-[-0.02em]" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: C.text }}>
          RAW
        </span>
        <Icon n="gear" size={21} />
      </div>
      <div className="px-[16px]">{children}</div>
      <TabBar active={tab} />
    </div>
  );
}

function TabBar({ active }: { active: number }) {
  const items = [
    ["home", "Сегодня"],
    ["okCircle", "Задачи"],
    ["chat", "Чат"],
    ["calendar", "Календарь"],
    ["users", "Контакты"],
    ["wallet", "Финансы"],
  ];
  return (
    <>
      <span className="absolute bottom-[104px] right-[18px] grid h-[56px] w-[56px] place-items-center rounded-full text-white shadow-[0_10px_30px_-6px_#9b6cf0]" style={{ background: C.grad }}>
        <Icon n="plus" size={26} stroke={2.4} />
      </span>
      <div className="absolute inset-x-[10px] bottom-[22px] flex rounded-[24px] border p-[5px]" style={{ background: "rgba(20,20,40,.94)", borderColor: C.line }}>
        {items.map(([ic, t], i) => (
          <div
            key={t}
            className="relative flex flex-1 flex-col items-center gap-[4px] rounded-[18px] py-[8px] text-[9.5px]"
            style={i === active ? { background: "#25254a", color: C.text, boxShadow: `inset 0 0 0 1px #3a3a6a` } : { color: C.muted }}
          >
            <Icon n={ic} size={19} />
            {t}
            {i === 1 && <span className="absolute right-[12px] top-[3px] grid h-[15px] min-w-[15px] place-items-center rounded-full px-[3px] text-[9px] font-semibold text-white" style={{ background: C.red }}>2</span>}
          </div>
        ))}
      </div>
    </>
  );
}

function Chip({ children, tone }: { children: ReactNode; tone?: "red" | "amber" }) {
  const st = tone === "red" ? { color: C.red, background: "#3a1a26" } : tone === "amber" ? { color: "#ffc560", background: "#3a2e1a" } : { color: C.muted, background: "#20203c" };
  return (
    <span className="flex items-center gap-[5px] rounded-[8px] px-[8px] py-[4px] text-[12px]" style={st}>
      {children}
    </span>
  );
}

function Task({ t, when, extra, hot = true }: { t: string; when: string; extra?: string; hot?: boolean }) {
  return (
    <div className="flex gap-[12px] rounded-[16px] border p-[14px]" style={{ background: C.card, borderColor: C.line, borderLeft: hot ? `3px solid ${C.red}` : undefined }}>
      <span className="mt-[2px] h-[20px] w-[20px] shrink-0 rounded-[6px] border-[1.5px]" style={{ borderColor: C.faint }} />
      <div>
        <div className="text-[15.5px] font-medium">{t}</div>
        <div className="mt-[8px] flex flex-wrap gap-[6px]">
          <Chip>💼 Работа</Chip>
          <Chip tone={hot ? "red" : undefined}>
            <Icon n="clock" size={12} /> {when}
          </Chip>
          {extra && <Chip tone="amber">⚡ {extra}</Chip>}
          <Chip>
            <Icon n="user" size={12} /> Мне
          </Chip>
        </div>
      </div>
    </div>
  );
}

export function RawToday() {
  return (
    <Shell tab={0}>
      <div className="relative mt-[6px] overflow-hidden rounded-[24px] p-[22px]" style={{ background: C.gradSoft }}>
        <span className="absolute -right-[40px] -top-[50px] h-[160px] w-[160px] rounded-full bg-white/10" />
        <span className="absolute -bottom-[60px] right-[30px] h-[120px] w-[120px] rounded-full bg-white/10" />
        <div className="relative text-[26px] leading-[1.1]" style={wide}>
          Добрый день,
          <br />
          Алия 👋
        </div>
        <div className="relative mt-[10px] text-[14px] leading-snug text-white/85">Суббота, 31 октября · просрочено: 2, давай разгребём 💪</div>
        <span className="relative mt-[14px] inline-flex items-center gap-[6px] rounded-[12px] bg-white/20 px-[14px] py-[8px] text-[13px] font-semibold">
          <Icon n="bell" size={15} /> Напоминание
        </span>
      </div>
      <div className="mt-[12px] grid grid-cols-2 gap-[10px]">
        {[
          ["📋", "12", "Открытых задач", C.text, false],
          ["⏰", "2", "Просрочено", C.red, false],
          ["🎯", "3", "Дедлайна сегодня", C.text, false],
          ["🏆", "17", "Готово за неделю", "#fff", true],
        ].map(([e, v, l, col, g]) => (
          <div key={l as string} className="rounded-[18px] border p-[16px]" style={g ? { background: C.gradSoft, borderColor: "transparent" } : { background: C.card, borderColor: C.line }}>
            <div className="text-[20px]">{e}</div>
            <div className="mt-[6px] text-[30px] leading-none" style={{ ...wide, color: col as string }}>
              {v}
            </div>
            <div className="mt-[6px] text-[13px]" style={{ color: g ? "#fff" : C.muted }}>
              {l}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[20px] flex items-center justify-between">
        <span className="text-[17px]" style={wide}>
          Фокус на сегодня
        </span>
        <span className="text-[13px] font-semibold" style={{ color: "#8f9cff" }}>
          Все задачи
        </span>
      </div>
      <div className="mt-[10px]">
        <Task t="Согласовать макеты с клиентом" when="31 окт., 14:00" />
      </div>
    </Shell>
  );
}

export function RawTasks() {
  return (
    <Shell tab={1}>
      <div className="mt-[4px] text-[26px]" style={wide}>
        Задачи 📋
      </div>
      <div className="text-[14px]" style={{ color: C.muted }}>
        12 открытых
      </div>
      <div className="mt-[14px] flex gap-[4px] whitespace-nowrap rounded-[16px] p-[4px] text-[12.5px]" style={{ background: "#141428" }}>
        {["👑 Руководитель", "💼 Менеджер", "Все"].map((t, i) => (
          <span key={t} className="flex-1 rounded-[12px] py-[9px] text-center font-semibold" style={i === 0 ? { background: C.card, boxShadow: `inset 0 0 0 1px ${C.line}` } : { color: C.muted }}>
            {t}
          </span>
        ))}
      </div>
      <div className="mt-[12px] flex gap-[8px] text-[14px]">
        <span className="flex flex-1 items-center gap-[8px] rounded-[14px] border px-[12px] py-[11px]" style={{ background: C.card, borderColor: C.line, color: C.faint }}>
          <Icon n="search" size={17} /> Поиск
        </span>
        <span className="flex items-center gap-[6px] rounded-[14px] border px-[14px] py-[11px] font-semibold" style={{ background: C.card, borderColor: C.line }}>
          <Icon n="sliders" size={17} /> Фильтры
        </span>
      </div>
      <div className="mt-[16px] flex items-center gap-[10px]">
        <span className="grid h-[32px] w-[32px] place-items-center rounded-[10px] text-[14px] font-bold" style={{ background: C.red }}>
          А
        </span>
        <span className="flex-1 text-[17px] font-semibold">Алия (вы)</span>
        <span className="rounded-[8px] px-[8px] py-[4px] text-[10px] font-bold tracking-wider" style={{ background: "#2a2650", color: "#c9b8ff" }}>
          👑 РУКОВОДИТЕЛЬ
        </span>
      </div>
      <div className="mt-[12px] flex items-center gap-[8px] text-[14px]">
        🔥 <b>Горящие</b>
        <span className="grid h-[20px] w-[20px] place-items-center rounded-full text-[11px]" style={{ background: "#3a1a26", color: C.red }}>
          3
        </span>
        <span className="truncate text-[12.5px]" style={{ color: C.muted }}>
          просрочено, на сегодня или скоро
        </span>
      </div>
      <div className="mt-[10px] space-y-[10px]">
        <Task t="Подготовить смету для кофейни" when="30 окт., 11:15" />
        <Task t="Созвон с подрядчиком по сайту" when="Вчера, 18:10" extra="Высокий" />
        <Task t="Обновить портфолио" when="Сегодня, 13:00" />
      </div>
    </Shell>
  );
}

export function RawFinance() {
  const ops = [
    ["28 ОКТ.", "Figma", "Подписки", "−6 200 ₸"],
    ["27 ОКТ.", "Хостинг", "Сервисы", "−3 900 ₸"],
    ["", "Такси", "Транспорт", "−2 100 ₸"],
  ];
  return (
    <Shell tab={5}>
      <div className="mt-[4px] text-[26px]" style={wide}>
        Финансы 💸
      </div>
      <div className="mt-[12px] flex items-center justify-between">
        <span className="grid h-[34px] w-[34px] place-items-center rounded-[10px]" style={{ background: C.card }}>
          <Icon n="chevL" size={17} />
        </span>
        <span className="text-[18px]" style={wide}>
          Октябрь 2026
        </span>
        <span className="grid h-[34px] w-[34px] place-items-center rounded-[10px]" style={{ background: C.card }}>
          <Icon n="chevR" size={17} />
        </span>
      </div>
      <div className="mt-[12px] flex gap-[4px] rounded-[16px] p-[4px] text-[10.5px]" style={{ background: "#141428" }}>
        {[
          ["🧾", "Операции"],
          ["📅", "Планы"],
          ["🤝", "Долги"],
          ["🔁", "Подписки"],
          ["👛", "Зарплата"],
        ].map(([e, t], i) => (
          <span key={t} className="flex flex-1 flex-col items-center gap-[2px] rounded-[12px] py-[7px] font-semibold" style={i === 0 ? { background: C.card, boxShadow: `inset 0 0 0 1px ${C.line}` } : { color: C.muted }}>
            <span className="text-[16px]">{e}</span>
            {t}
          </span>
        ))}
      </div>
      <div className="mt-[14px] grid grid-cols-2 gap-[10px]">
        {[
          ["✨", "248 300 ₸", "Баланс месяца", "#fff", true],
          ["💰", "412 000 ₸", "Доходы", C.green, false],
          ["💸", "163 700 ₸", "Траты", C.red, false],
          ["🏦", "90 000 ₸", "Долг по кредитам", C.text, false],
        ].map(([e, v, l, col, g]) => (
          <div key={l as string} className="rounded-[18px] border p-[14px]" style={g ? { background: C.grad, borderColor: "transparent" } : { background: C.card, borderColor: C.line }}>
            <div className="text-[18px]">{e}</div>
            <div className="mt-[6px] whitespace-nowrap text-[19px] leading-none" style={{ ...wide, color: col as string }}>
              {v}
            </div>
            <div className="mt-[6px] text-[12.5px]" style={{ color: g ? "#fff" : C.muted }}>
              {l}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[8px]">
        {ops.map(([d, t, cat, sum], i) => (
          <div key={t}>
            {d && (
              <div className="mb-[6px] mt-[12px] text-[11px] font-bold tracking-[0.12em]" style={{ color: C.muted }}>
                {d}
              </div>
            )}
            <div className={`flex items-center gap-[12px] rounded-[16px] border p-[12px] ${i === 2 ? "mt-[8px]" : ""}`} style={{ background: C.card, borderColor: C.line }}>
              <span className="grid h-[38px] w-[38px] place-items-center rounded-[12px]" style={{ background: "#24244a", color: "#8f9cff" }}>
                <Icon n="refresh" size={18} />
              </span>
              <div className="flex-1">
                <div className="text-[15px] font-semibold">{t}</div>
                <div className="text-[12.5px]" style={{ color: C.muted }}>
                  {cat}
                </div>
              </div>
              <span className="text-[15px] font-bold" style={{ color: C.red }}>
                {sum}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}
