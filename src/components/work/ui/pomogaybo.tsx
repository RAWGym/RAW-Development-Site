import type { ReactNode } from "react";
import { Icon, StatusBar } from "./kit";

// Помогайбо.рф — Telegram Mini App. Экраны нарисованы по продакшену, тексты настоящие.
const C = {
  bg: "#0f0d0c",
  bar: "#1b1a19",
  card: "#1c1916",
  line: "#2c2622",
  copper: "#e8935f",
  copperDeep: "#c9784a",
  text: "#f3ece6",
  muted: "#a39a92",
  faint: "#6f6760",
};

function Shell({ tab, children }: { tab: number; children: ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: C.bg, color: C.text }}>
      <div style={{ background: C.bar }}>
        <StatusBar />
        <div className="flex items-center justify-between px-[16px] pb-[12px] pt-[4px]">
          <span className="grid h-[38px] w-[38px] place-items-center rounded-full" style={{ background: "#3a3836", color: "#d9d4cf" }}>
            <Icon n="x" size={18} stroke={2.2} />
          </span>
          <div className="text-center leading-tight">
            <div className="text-[17px] font-semibold">помогайбо.рф</div>
            <div className="text-[12px]" style={{ color: C.muted }}>
              мини-приложение
            </div>
          </div>
          <span className="grid h-[38px] w-[38px] place-items-center rounded-full" style={{ background: "#3a3836", color: "#d9d4cf" }}>
            <Icon n="dots" size={18} />
          </span>
        </div>
      </div>
      {children}
      <TabBar active={tab} />
    </div>
  );
}

function TabBar({ active }: { active: number }) {
  const items = [
    ["home", "Главная"],
    ["grid", "Сервисы"],
    ["list", "Подписки"],
    ["user", "Профиль"],
  ];
  return (
    <div className="absolute inset-x-[14px] bottom-[22px] flex rounded-[26px] border p-[5px]" style={{ background: "rgba(28,25,22,.92)", borderColor: C.line, backdropFilter: "blur(10px)" }}>
      {items.map(([ic, t], i) => (
        <div
          key={t}
          className="flex flex-1 flex-col items-center gap-[3px] rounded-[21px] py-[8px] text-[11px]"
          style={i === active ? { background: "#4a2d1d", color: C.copper, boxShadow: `inset 0 0 0 1px ${C.copperDeep}55` } : { color: C.muted }}
        >
          <Icon n={ic} size={20} />
          {t}
        </div>
      ))}
    </div>
  );
}

function Logo({ name }: { name: string }) {
  if (name === "Capture One")
    return (
      <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-[12px] bg-white">
        <span className="h-[24px] w-[24px] rounded-full border-[3px] border-black">
          <span className="m-[4px] block h-[10px] w-[10px] rounded-full border-[2.5px] border-black" />
        </span>
      </span>
    );
  if (name === "Figma")
    return (
      <span className="grid h-[44px] w-[44px] shrink-0 grid-cols-2 gap-0 rounded-[12px] bg-[#1e1e1e] p-[11px]">
        {["#f24e1e", "#ff7262", "#a259ff", "#1abcfe", "#0acf83"].slice(0, 4).map((c, i) => (
          <span key={i} className={i === 3 ? "rounded-full" : i === 0 ? "rounded-l-full" : i === 1 ? "rounded-r-full" : "rounded-l-full"} style={{ background: c }} />
        ))}
      </span>
    );
  return (
    <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-[12px]" style={{ background: name === "Creative Cloud" ? "#2b1414" : "#1d1210" }}>
      <svg width="26" height="24" viewBox="0 0 26 24">
        <path d="M9.6 0H0v24zM16.4 0H26v24zM13 8.8 19 24h-4l-1.8-4.6H8.8z" fill="#fa0f00" />
      </svg>
    </span>
  );
}

export function PomogayboHome() {
  return (
    <Shell tab={0}>
      <div className="px-[16px] pt-[14px]">
        <div className="flex items-center justify-between">
          <span className="grid h-[42px] w-[42px] place-items-center rounded-[12px]" style={{ background: C.card, border: `1px solid ${C.line}` }}>
            <span className="grid h-[24px] w-[24px] place-items-center rounded-full border-[2.5px]" style={{ borderColor: C.text }}>
              <span className="h-[9px] w-[9px] rounded-full border-[2px]" style={{ borderColor: C.text }} />
            </span>
          </span>
          <span style={{ color: C.muted }}>
            <Icon n="bell" size={22} />
          </span>
        </div>

        <div className="-mr-[16px] mt-[14px] flex gap-[10px] overflow-hidden">
          {[
            ["gift", "Подарок", "Spotify на 3 месяца к заказу от 4 990 ₽"],
            ["sparkle", "Скидки", "15% на всё за второго друга"],
          ].map(([ic, k, t]) => (
            <div key={k} className="w-[290px] shrink-0 rounded-[16px] p-[14px]" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              <div className="flex items-center gap-[6px] text-[12px]" style={{ color: C.muted }}>
                <Icon n={ic} size={14} /> {k}
              </div>
              <div className="mt-[6px] text-[15px] font-medium leading-snug">{t}</div>
            </div>
          ))}
        </div>
        <div className="mt-[10px] flex justify-center gap-[5px]">
          <span className="h-[4px] w-[16px] rounded-full" style={{ background: C.copper }} />
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-[4px] w-[4px] rounded-full" style={{ background: C.faint }} />
          ))}
        </div>

        <div className="mt-[16px] rounded-[22px] p-[22px]" style={{ background: "linear-gradient(160deg,#3b2b21,#211914 70%)", border: `1px solid #4a372a` }}>
          <div className="text-[25px] font-medium leading-[1.15]">
            Подписки без танцев
            <br />с картами
          </div>
          <p className="mt-[12px] text-[14px] leading-[1.55]" style={{ color: "#cdbfb3" }}>
            Photoshop, Claude, Notion и ещё десяток сервисов. Оплатим, оформим и установим — вам останется пользоваться.
          </p>
          <div className="mt-[18px] flex items-center justify-center gap-[8px] rounded-[14px] py-[14px] text-[15px] font-semibold" style={{ background: C.copper, color: "#2a170c" }}>
            Смотреть каталог <Icon n="arrow" size={17} stroke={2.2} />
          </div>
          <div className="mt-[16px] space-y-[10px] text-[13.5px]" style={{ color: "#cdbfb3" }}>
            {[
              ["bolt", "Оформляем за 15 минут"],
              ["shield", "Оплата после согласования"],
              ["okCircle", "Установка входит в стоимость"],
            ].map(([ic, t]) => (
              <div key={t} className="flex items-center gap-[10px]">
                <span style={{ color: C.copper }}>
                  <Icon n={ic} size={17} />
                </span>
                {t}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[22px] flex items-center justify-between">
          <span className="text-[19px] font-medium">Популярное</span>
          <span className="flex items-center gap-[4px] text-[14px]" style={{ color: C.copper }}>
            Каталог <Icon n="arrow" size={15} />
          </span>
        </div>
        <div className="mt-[12px] flex gap-[10px]">
          {["Adobe Photography", "Creative Cloud", "Figma"].map((n) => (
            <div key={n} className="flex w-[118px] shrink-0 flex-col items-center gap-[8px] rounded-[16px] px-[8px] py-[14px] text-center text-[12.5px]" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              <Logo name={n} />
              {n}
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

export function PomogayboCatalog() {
  const items = [
    { n: "Adobe Photography", d: "Photoshop и Lightroom для съёмки и обработки", p: "от 16 000 ₽", hit: true },
    { n: "Capture One", d: "Профессиональный RAW-конвертер", p: "от 2 500 ₽" },
    { n: "Figma", d: "Дизайн интерфейсов и совместная работа", p: "от 3 500 ₽" },
  ];
  return (
    <Shell tab={1}>
      <div className="flex items-start justify-between px-[16px] pb-[12px] pt-[14px]" style={{ background: C.bar }}>
        <div>
          <div className="text-[22px] font-medium">Сервисы</div>
          <div className="text-[13px]" style={{ color: C.muted }}>
            26 подписок с установкой
          </div>
        </div>
        <span className="mt-[6px]" style={{ color: C.muted }}>
          <Icon n="cart" size={22} />
        </span>
      </div>
      <div className="px-[16px] pt-[12px]">
        <div className="flex items-center gap-[12px] rounded-[18px] p-[16px]" style={{ background: "linear-gradient(160deg,#4a3426,#2a1f18)", border: `1px solid #5a412f` }}>
          <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-[12px]" style={{ background: C.copper, color: "#2a170c" }}>
            <Icon n="sparkle" size={22} />
          </span>
          <div className="flex-1">
            <div className="text-[15.5px] font-medium">Индивидуальный запрос</div>
            <div className="text-[13px] leading-snug" style={{ color: "#cdbfb3" }}>
              Не нашли нужный сервис? Подберём и оформим
            </div>
          </div>
          <Icon n="plus" size={20} />
        </div>
        <div className="mt-[10px] flex items-center gap-[12px] rounded-[16px] px-[16px] py-[13px] text-[13.5px]" style={{ background: C.card, border: `1px solid ${C.line}` }}>
          <span style={{ color: C.copper }}>
            <Icon n="gift" size={18} />
          </span>
          <span>
            Приглашайте друзей — скидка на каталог <span style={{ color: C.copper }}>до 25%</span>
          </span>
        </div>
        <div className="mt-[14px] flex items-center gap-[10px] rounded-[14px] px-[14px] py-[13px] text-[15px]" style={{ background: C.card, border: `1px solid ${C.line}`, color: C.faint }}>
          <Icon n="search" size={18} /> Найти сервис
        </div>
        <div className="mt-[12px] flex gap-[8px] text-[14px]">
          <span className="rounded-full px-[16px] py-[9px] font-medium" style={{ background: C.copper, color: "#2a170c" }}>
            Все
          </span>
          {[
            ["camera", "Фотографам"],
            ["film", "Видеографам"],
          ].map(([ic, t]) => (
            <span key={t} className="flex items-center gap-[6px] rounded-full px-[14px] py-[9px]" style={{ border: `1px solid ${C.line}` }}>
              <Icon n={ic} size={15} /> {t}
            </span>
          ))}
        </div>
        <div className="mt-[14px] space-y-[10px]">
          {items.map((it) => (
            <div key={it.n} className="flex gap-[12px] rounded-[18px] p-[14px]" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              <Logo name={it.n} />
              <div className="flex-1">
                <div className="flex items-center gap-[8px] text-[15.5px] font-medium">
                  {it.n}
                  {it.hit && (
                    <span className="rounded-full px-[8px] py-[1px] text-[11px]" style={{ background: "#4a2d1d", color: C.copper }}>
                      Хит
                    </span>
                  )}
                </div>
                <div className="mt-[3px] text-[13px] leading-snug" style={{ color: C.muted }}>
                  {it.d}
                </div>
                <div className="mt-[8px] text-[14px]">
                  <span style={{ color: C.muted }}>от </span>
                  {it.p.replace("от ", "")}
                </div>
              </div>
              <span className="grid h-[28px] w-[28px] place-items-center rounded-full" style={{ border: `1px solid ${C.line}`, color: C.muted }}>
                <Icon n="chevR" size={15} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

export function PomogayboProfile() {
  return (
    <Shell tab={3}>
      <div className="px-[16px] pb-[10px] pt-[14px] text-[22px] font-medium" style={{ background: C.bar }}>
        Профиль
      </div>
      <div className="px-[16px] pt-[16px]">
        <div className="flex items-center gap-[14px]">
          <span className="grid h-[58px] w-[58px] place-items-center rounded-full text-[20px] font-semibold" style={{ background: "linear-gradient(135deg,#e8935f,#8a4a2a)", color: "#2a170c" }}>
            АК
          </span>
          <div>
            <div className="text-[19px] font-medium">Анна Ковалёва</div>
            <div className="text-[14px]" style={{ color: C.muted }}>
              @anna_kovaleva
            </div>
          </div>
        </div>
        <div className="mt-[18px] grid grid-cols-3 gap-[8px] text-center">
          {[
            ["3", "Заказов"],
            ["24 500 ₽", "Потрачено"],
            ["1", "Приглашено"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-[16px] py-[14px]" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              <div className="text-[18px] font-medium">{v}</div>
              <div className="mt-[2px] text-[12px]" style={{ color: C.muted }}>
                {l}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[16px] rounded-[22px] p-[16px]" style={{ background: "linear-gradient(160deg,#3b2b21,#211914 80%)", border: `1px solid #4a372a` }}>
          <div className="flex items-center gap-[12px]">
            <span className="grid h-[44px] w-[44px] place-items-center rounded-[12px]" style={{ background: C.copper, color: "#2a170c" }}>
              <Icon n="gift" size={22} />
            </span>
            <div>
              <div className="text-[16px] font-medium">Приглашайте друзей</div>
              <div className="text-[13px]" style={{ color: "#cdbfb3" }}>
                Скидка на весь каталог за приглашённых
              </div>
            </div>
          </div>
          <div className="mt-[14px] grid grid-cols-2 gap-[8px]">
            {[
              ["Приглашено", "1", C.text],
              ["Скидка", "5%", C.copper],
            ].map(([l, v, col]) => (
              <div key={l} className="rounded-[14px] px-[14px] py-[10px]" style={{ background: "rgba(0,0,0,.25)" }}>
                <div className="text-[12px]" style={{ color: C.muted }}>
                  {l}
                </div>
                <div className="text-[22px] font-medium" style={{ color: col }}>
                  {v}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-[10px] h-[6px] overflow-hidden rounded-full" style={{ background: "rgba(0,0,0,.3)" }}>
            <span className="block h-full w-1/2 rounded-full" style={{ background: C.copper }} />
          </div>
          <div className="mt-[8px] text-[12.5px]" style={{ color: C.muted }}>
            Ещё 1 — и скидка станет 10%
          </div>
          <div className="mt-[14px] flex items-center justify-between gap-[8px] whitespace-nowrap rounded-[14px] px-[14px] py-[13px] font-mono text-[11.5px]" style={{ background: "rgba(0,0,0,.25)", border: `1px solid #4a372a` }}>
            t.me/pomogaiborfbot?start=AK7Q2M
            <span style={{ color: C.muted }}>
              <Icon n="copy" size={16} />
            </span>
          </div>
          <div className="mt-[10px] flex items-center justify-center gap-[8px] rounded-[14px] py-[13px] text-[15px] font-medium" style={{ background: "#0f0d0c" }}>
            <Icon n="share" size={17} /> Поделиться ссылкой
          </div>
          <div className="mt-[14px] text-[12.5px]" style={{ color: C.muted }}>
            Вас кто-то пригласил? Введите его код
          </div>
          <div className="mt-[8px] flex gap-[8px]">
            <span className="flex-1 rounded-[14px] px-[14px] py-[13px] font-mono text-[14px] tracking-[0.15em]" style={{ background: "rgba(0,0,0,.25)", color: C.faint }}>
              ABC123
            </span>
            <span className="rounded-[14px] px-[18px] py-[13px] text-[14.5px] font-medium" style={{ background: "#6b3f26", color: "#f0c7a8" }}>
              Применить
            </span>
          </div>
        </div>
      </div>
    </Shell>
  );
}
