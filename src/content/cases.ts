// Кейсы студии. Цифры с пометкой stub: true — заглушки, заменить реальными.

export type CaseStudy = {
  slug: string;
  title: string;
  kind: string;
  year: string;
  audience: "business" | "personal";
  summary: string;
  stack: string[];
  metric: { value: string; label: string; stub?: boolean };
  // Цвета обложки-заглушки, пока нет скриншотов
  cover: { from: string; to: string; ink: string };
  url?: string;
};

export const featuredCases: CaseStudy[] = [
  {
    slug: "yurta-bank",
    title: "YURTA Bank",
    kind: "Мобильный банк · iOS · Android · Web",
    year: "2025",
    audience: "business",
    summary: "Банковское приложение, где любая операция занимает 2–3 нажатия: переводы по номеру и QR, аналитика расходов, копилки, вход по Face ID.",
    stack: ["SwiftUI", "Jetpack Compose", "Next.js"],
    metric: { value: "8 с", label: "на перевод вместо 40", stub: true },
    cover: { from: "#1b2a24", to: "#0c1210", ink: "#d8f0e4" },
  },
  {
    slug: "concerts-kz",
    title: "concerts.kz",
    kind: "Афиша и продажа билетов · Web",
    year: "2025",
    audience: "business",
    summary: "Афиша концертов с интерактивной схемой зала, очередью на старте продаж, оплатой Kaspi и билетами в Apple / Google Wallet.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
    metric: { value: "10 000+", label: "покупателей одновременно", stub: true },
    cover: { from: "#2a1620", to: "#110a0e", ink: "#f4d6e2" },
    url: "https://concerts.kz",
  },
  {
    slug: "raw-management",
    title: "RAW Management",
    kind: "Управление бизнесом · iOS · Android · Web",
    year: "2026",
    audience: "business",
    summary: "Наш собственный продукт: задачи, клиенты, финансы и команда в одном приложении с синхронизацией в реальном времени.",
    stack: ["React Native", "Supabase", "Realtime"],
    metric: { value: "6 ч", label: "экономии в неделю на команду", stub: true },
    cover: { from: "#22222a", to: "#0d0d11", ink: "#e4e4f2" },
  },
  {
    slug: "pomogaybo",
    title: "Помогайбо",
    kind: "Telegram Mini App + бот",
    year: "2025",
    audience: "business",
    summary: "Оплата зарубежных сервисов для пользователей из России прямо в Telegram: каталог подписок, оплата в один тап, статус заказа в реальном времени.",
    stack: ["Telegram Mini Apps", "React", "Node.js"],
    metric: { value: "< 2 мин", label: "от выбора до активации", stub: true },
    cover: { from: "#132433", to: "#0a1118", ink: "#d4e8f7" },
  },
  {
    slug: "slotly",
    title: "Slotly",
    kind: "Telegram-бот записи и оплаты",
    year: "2026",
    audience: "business",
    summary: "Бот и Mini App для сети барбершопов: запись за 30 секунд, предоплата, напоминания, лист ожидания и статистика для владельца.",
    stack: ["aiogram 3", "React", "PostgreSQL"],
    metric: { value: "18% → 4%", label: "неявок за 2 месяца", stub: true },
    cover: { from: "#2b2414", to: "#120f08", ink: "#f2e6c8" },
  },
];
