import type { ReactNode } from "react";
import { Fit } from "./kit";
import { PomogayboCatalog, PomogayboHome, PomogayboProfile } from "./pomogaybo";
import { RawFinance, RawTasks, RawToday } from "./raw-management";
import { BizAccounting, BizCashier, BizHome, YurtaCard, YurtaCards, YurtaHome } from "./yurta";
import { ConcertsAdmin, ConcertsSite, TicketerConcerts, TicketerProfile, TicketerScanner } from "./concerts";

// Нарисованные кодом интерфейсы кейсов: обложка, экраны телефона и десктопа.
export const PHONE = { w: 390, h: 824 };

type Desk = { node: ReactNode; url: string; w: number; h: number; title: string };
type PhoneScreen = { node: ReactNode; title: string };
export type CaseUi = {
  cover: { kind: "phone"; node: ReactNode } | { kind: "browser"; desk: Desk };
  desktop?: Desk[];
  phones?: PhoneScreen[];
  phonesLabel?: { title: string; text: string };
  // Дополнительные ряды экранов со своим заголовком
  more?: { label: { title: string; text: string }; phones: PhoneScreen[] }[];
  // Какие три экрана показать веером на обложке (по умолчанию, phones)
  coverPhones?: PhoneScreen[];
};

const site: Desk = { node: <ConcertsSite />, url: "concerts.kz", w: 1280, h: 720, title: "Афиша concerts.kz" };

export const caseUi: Record<string, CaseUi> = {
  "yurta-bank": {
    cover: { kind: "phone", node: <YurtaHome /> },
    coverPhones: [
      { node: <YurtaHome />, title: "Главная" },
      { node: <YurtaCards />, title: "Карты" },
      { node: <BizHome />, title: "YURTA Business" },
    ],
    phonesLabel: { title: "YURTA Bank", text: "Личный банк: счёт и карты, переводы и платежи, бонусы YURTA Points." },
    phones: [
      { node: <YurtaHome />, title: "Главная" },
      { node: <YurtaCards />, title: "Каталог карт" },
      { node: <YurtaCard />, title: "Карта и лимиты" },
    ],
    more: [
      {
        label: { title: "YURTA Business", text: "Отдельное приложение для ИП: бизнес-счёт, касса с QR, бухгалтерия с налогами и взносами в одно касание." },
        phones: [
          { node: <BizHome />, title: "Бизнес-счёт" },
          { node: <BizCashier />, title: "Касса и QR" },
          { node: <BizAccounting />, title: "Бухгалтерия" },
        ],
      },
    ],
  },
  pomogaybo: {
    cover: { kind: "phone", node: <PomogayboHome /> },
    phones: [
      { node: <PomogayboHome />, title: "Главная" },
      { node: <PomogayboCatalog />, title: "Каталог сервисов" },
      { node: <PomogayboProfile />, title: "Профиль и рефералы" },
    ],
  },
  "raw-management": {
    cover: { kind: "phone", node: <RawToday /> },
    phones: [
      { node: <RawToday />, title: "Сегодня" },
      { node: <RawTasks />, title: "Задачи" },
      { node: <RawFinance />, title: "Финансы" },
    ],
  },
  "concerts-kz": {
    cover: { kind: "browser", desk: site },
    desktop: [site, { node: <ConcertsAdmin />, url: "concerts.kz/admin/scanners", w: 1280, h: 800, title: "Админка: тикеторы и входы" }],
    phonesLabel: {
      title: "Приложение для тикеторов",
      text: "Сканер билетов на входе: Android и iPhone, назначение на концерт из админки, счётчики проходов и отказов в реальном времени.",
    },
    phones: [
      { node: <TicketerConcerts />, title: "Мои концерты" },
      { node: <TicketerScanner />, title: "Сканер" },
      { node: <TicketerProfile />, title: "Настройки сканера" },
    ],
  },
};

export function PhoneFrame({ children, ink = "#ffffff", className = "" }: { children: ReactNode; ink?: string; className?: string }) {
  return (
    <div className={`rounded-[15%/7%] border p-[3.2%] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] ${className}`} style={{ borderColor: `${ink}33`, background: "#0e0e10" }}>
      <div className="overflow-hidden rounded-[12%/5.6%]">
        <Fit w={PHONE.w} h={PHONE.h}>
          {children}
        </Fit>
      </div>
    </div>
  );
}

export function BrowserFrame({ desk, ink = "#ffffff", className = "" }: { desk: Desk; ink?: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] ${className}`} style={{ borderColor: `${ink}33`, background: "#0e0e10" }}>
      <div className="flex items-center gap-1.5 border-b px-3 py-2" style={{ borderColor: `${ink}1f` }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} className="h-2 w-2 rounded-full" style={{ background: c, opacity: 0.7 }} />
        ))}
        <span className="ml-2 flex-1 truncate rounded-md px-2 py-0.5 font-mono text-[10px]" style={{ background: `${ink}10`, color: `${ink}99` }}>
          {desk.url}
        </span>
      </div>
      <Fit w={desk.w} h={desk.h}>
        {desk.node}
      </Fit>
    </div>
  );
}
